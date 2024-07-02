import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

interface AuthenticatedRequest<T> extends Request {
  user?: T;
}

export const authenticateToken = (
  req: AuthenticatedRequest<unknown>,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null || token === undefined || token === 'undefined') {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};
