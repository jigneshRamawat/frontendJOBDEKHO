import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    return next(new Error('Not authorized, access token not provided'));
  }

  try {
    const secret = process.env.ACCESS_TOKEN_SECRET || 'access_token_secret_job_portal_2026_abC';
    const decoded = jwt.verify(token, secret);

    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      res.status(401);
      return next(new Error('Not authorized, user not found'));
    }

    next();
  } catch (error) {
    console.error(`Auth Middleware Error: ${error.message}`);
    res.status(401);
    if (error.name === 'TokenExpiredError') {
      return next(new Error('Access token expired'));
    }
    next(new Error('Not authorized, token validation failed'));
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401);
      return next(new Error('Not authorized, no user found on request'));
    }

    if (!roles.includes(req.user.role)) {
      res.status(403);
      return next(new Error(`Role [${req.user.role}] is not authorized to access this resource`));
    }

    next();
  };
};
