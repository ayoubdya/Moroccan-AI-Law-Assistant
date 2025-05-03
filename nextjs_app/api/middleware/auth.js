const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Ensure content-type header
    res.setHeader('Content-Type', 'application/json');
    
    // Get token from header
    const authHeader = req.header('Authorization');
    console.log('Auth header:', authHeader);
    
    if (!authHeader) {
      return res.status(401).json({
        status: 'error',
        message: 'No Authorization header, authorization denied'
      });
    }
    
    const token = authHeader.replace('Bearer ', '');
    console.log('Token received:', token.substring(0, 20) + '...');
    
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No token, authorization denied'
      });
    }
    
    let decoded;
    
    try {
      // First try to verify as a standard JWT
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('JWT verified successfully');
    } catch (jwtError) {
      console.log('JWT verification failed, trying to parse as base64:', jwtError.message);
      
      try {
        // For development/testing: try to decode as base64 if JWT fails
        // This should be removed in production
        const decodedString = Buffer.from(token, 'base64').toString();
        decoded = JSON.parse(decodedString);
        console.log('Using temporary token for development');
      } catch (base64Error) {
        console.error('Base64 parsing failed:', base64Error);
        throw new Error('Invalid token format');
      }
    }
    
    if (!decoded || !decoded.id) {
      throw new Error('Invalid token payload');
    }
    
    // Add user from payload to request
    req.user = decoded;
    console.log('User authenticated:', decoded.id);
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      status: 'error',
      message: 'Token is not valid',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
