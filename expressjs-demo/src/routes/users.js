import express from 'express';

const router = express.Router();

// Middleware function called before all requests
const userRouterLogger = (req, res, next) => {
  req.requestTime = Date.now();
  console.log(
    `UserRouter - ${req.requestTime} - method ${req.method} - ${req.path}; `
  );
  next();
};

router.use(userRouterLogger);

router.get('/:name', (req, res) => {
  let message = `Hello ${req.params.name}${req.query.isQuestion ? '?' : ''}`;
  message += '<br>';
  message += `Your request was made at ${req.requestTime}`;
  res.send(message);
});

router
  .route('/crud')
  .get((req, res) => res.send('get all users'))
  .post((req, res) => res.send('create a user'))
  .put((req, res) => res.send('update a user'))
  .delete((req, res) => res.send('delete a user'));

export default router;
