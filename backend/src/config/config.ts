export const config = {
  jwtSecret: process.env.JWT_TOKEN_SECRET || 'defaultSecret',
  jwtExpiresIn: '1h',
};
