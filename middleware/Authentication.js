const jwt = require('jsonwebtoken');

// Verify the JWT token
async function verifyToken(token) {
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null; // Token is invalid
  }
}

const authenticate = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  console.log(authorizationHeader);
  // console.log(req.headers);
  if (authorizationHeader) {
    // Extract the token from the "Bearer TOKEN" format
    const token = authorizationHeader.split(' ')[1];
    // Verify the token
    const decodedToken = await verifyToken(token);
    if (decodedToken) {
      // Token is valid
      req.body.user_id = decodedToken.userId; // Assuming the ID is stored in `id` in the token payload
      next();
    } else {
      return res.status(403).end();
    }
  } else {
    return res.status(403).end();
  }
}

module.exports = {
  authenticate
}
