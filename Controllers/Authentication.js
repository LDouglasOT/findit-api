const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const saltRounds = 10;
const jwtSecret = 'your_jwt_secret_key';

const registerUser = async (req, res) => {
  try {
    const { email, phoneNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const user = await prisma.login.create({
      data: {
        email,
        phoneNumber,
        password: hashedPassword,
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
    const { email, phoneNumber, password } = req.body;
    const user = await prisma.login.findUnique({
      where: {
        OR: [{ email }, { phoneNumber }],
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { registerUser, loginUser };
