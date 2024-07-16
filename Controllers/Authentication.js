const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const axios = require('axios')

let alphabet = ['A11', 'B12', 'C13', 'D14', 'E15', 'F16', 'G17', 'H18', 'I19', 'J110', 'K111', 'L112', 'M113', 'N114', 'O115', 'P116', 'Q117', 'R118', 'S119', 'T120', 'U121', 'V122', 'W123', 'X127', 'Y126', 'Z118']


const prisma = new PrismaClient();
const saltRounds = 10;
const jwtSecret = 'your_jwt_secret_key';

const registerUser = async (req, res) => {
  try {
    const { email, PhoneNumber, password,FirstName,LastName,profile } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const user = await prisma.login.create({
      data: {
        email:email,
        PhoneNumber: PhoneNumber.toString(),
        Password: hashedPassword,
        FirstName:FirstName,
        LastName:LastName,
        profile:profile
      },
    });

    res.json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
  try {
    console.log(req.body)
    const { email, PhoneNumber, password } = req.body;
    console.log(req.body)
    console.log(email,PhoneNumber,password)
    if(!(password && PhoneNumber && email)){
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const user = await prisma.login.findFirst({
      where: {
        OR: [{ email:email }, { PhoneNumber: PhoneNumber.toString()}],
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.Password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret);

    res.status(200).json({ message: 'Login successful', "apikey":token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const generate_decorder = (phoneNumber) => {
  let letters = [];
  for (const digit of phoneNumber) {
      if (!isNaN(digit)) {
          const index = parseInt(digit);
          if (index >= 0 && index <= 9) {
              letters.unshift(alphabet[index]); // Unshift to insert at the beginning and preserve order
          } else {
              letters.push("Invalid Digit");
          }
      } else {
          letters.push(digit);
      }
  }
  return letters.reverse().join("");
}

function generateOTP(key) {
  const hmac = crypto.createHmac('sha256', key);
  const otp = hmac.digest('hex').slice(0, 10);
  
  // Convert the OTP to contain only numeric characters
  const numericOTP = otp.replace(/\D/g, '').slice(0, 4);

  // Pad the OTP with zeros if its length is less than six digits
  const paddedOTP = numericOTP.padStart(4, '0');

  return paddedOTP;
}

function verifyOTP(key, enteredOTP) {
  const generatedOTP = generateOTP(key);
  return generatedOTP === enteredOTP;
}

const generate = async (req, res) => {
  try {
      console.log("generate")
      const { PhoneNumber } = req.body
      console.log("generate")
      console.log(req.body)
      let phone = PhoneNumber

      if (phone.length < 8 || phone.length > 10) {
          console.log("Issues")
          return res.status(400).json({ message: "Check phone number and try again", "head": "Wrong Phone number" })
      }
      const exists = await prisma.Login.findFirst({
          where: {
              "PhoneNumber": phone
          }
      })
      console.log(exists)
      if (exists !== null) {
       return res.status(404).end()
      }
      phone = phone.slice(-9)
      let decorder = generate_decorder(phone)
      const currentDate = new Date();

      const currentDateString = currentDate.toString();
      decorder = decorder + currentDateString
      const token = generateOTP(decorder);;
      phone = "256" + phone
      const message = `FindIt app otp token:${token}, use this code to verify your identity`
      let contextx = {
          "msisdn": [phone],
          "message": message,
          "username": "douglas",
          "password": "NtWpD@6n&V7mTR"
      }
      console.log(contextx)
      const response = await axios.post("https://mysms.trueafrican.com/v1/api/esme/send", contextx)
      if (response.data.code == 200) {
      return res.status(200).json({ "message": "OTP message succefully sent", "head": "Success", "decorder": decorder })
     }
  } catch (err) {
      console.log(err.message)
      return res.status(500).send({ "message": "Something went wrong", "head": "success" })
  }
}

const verify = async (req, res) => {
  try {
      const { PhoneNumber, token,decorder,firstname,lastname,address,password } = req.body;


      let phone = PhoneNumber
      console.log(req.body)
      phone = phone.slice(-9)
      const verification = verifyOTP(decorder, token)
      if (verification) {
        const hashedPassword = await bcrypt.hash(password, 10);
          const user = await prisma.Login.create({
              data: {
                  "PhoneNumber": PhoneNumber,
                  "FirstName": firstname,
                  "LastName": lastname,
                  "Password":hashedPassword,
                  "profile":"https://img.icons8.com/ios-glyphs/30/user--v1.png"
              }
          })
          return res.status(200).json({ "message": "OTP code successfully verified", "head": "Success" })
      } else {
          return res.status(400).json({ "message": "The provided OTP code is wrong", "head": "OTP not correct" })
      }
  } catch (err) {
      console.log(err.message)
      return res.status(500).send({ "message": "Something went wrong", "head": "Failure" })
  }
}

const getUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, jwtSecret);
    const userId = decodedToken.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        PhoneNumber:true,
        created:true,
        FirstName:true,
        LastName:true,
        profile:true,
        shop:true
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = { registerUser, loginUser,generate,verify,getUser };
