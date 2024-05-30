import express from 'express';
import fs from 'fs';

const router = express.Router();

router.get('/:imageName', (req, res, next) => {
  fs.readFile(`src/public/images/${req.params.imageName}.png`, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.writeHead(200, { 'Content-Type': 'image/png' });
      res.end(data);
    }
  });
});

router.use((err, req, res, next) => {
  const errMsg = err.message || 'Something went wrong';
  const errorsStatus = err.status || 500;
  res
    .status(500)
    .json({
      success: false,
      message: errMsg,
      status: errorsStatus,
      stack: err.stack,
    })
    .send('Something broke!');
});

export default router;
