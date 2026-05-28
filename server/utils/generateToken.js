import jwt from 'jsonwebtoken';

export const generateTokens = (res, userId) => {
  const accessSecret = process.env.ACCESS_TOKEN_SECRET || 'access_token_secret_job_portal_2026_abC';
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET || 'refresh_token_secret_job_portal_2026_xYz';

  const accessToken = jwt.sign({ id: userId }, accessSecret, {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign({ id: userId }, refreshSecret, {
    expiresIn: '7d',
  });

  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return { accessToken, refreshToken };
};

export default generateTokens;
