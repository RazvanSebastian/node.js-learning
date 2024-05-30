import express from 'express';
import usersRouter from './routes/users.js';
import middlewareRouter from './routes/middleware.js';
import errorsHandlingRouter from './routes/errors-handling.js';

const app = express();
const port = 80;

app.get('/', (req, res) => res.send('Hello World!'));

app.use(express.static('src/public'));
app.use('/user', usersRouter);
app.use('/middleware', middlewareRouter);
app.use('/errors', errorsHandlingRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
