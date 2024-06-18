const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

module.exports = { registerUser, loginUser };
