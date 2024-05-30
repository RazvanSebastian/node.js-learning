import cookieParser from 'cookie-parser';
import express from 'express';

const router = express.Router();

const validateCookies = async (req) => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      req.cookies.user === 'Razvan' ? resolve(true) : resolve(false);
    }, 1000);
  });
};

const cookieValidatorMiddleware = async (req, res, next) => {
  const isValid = await validateCookies(req);
  isValid ? next() : next('Cookies are not valid!');
};

router.use('/validate-cookies', cookieParser(), cookieValidatorMiddleware);

router.get('/validate-cookies', (req, res) => {
  res.send('Cookies are valid!');
});

export default router;
