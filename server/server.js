import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

// Process application/json
app.use(bodyParser.json({
  extended: true,
}));

// CORS
app.use(cors());

// API Routes
app.use('/memorys', require('./memorys/routes'));
app.use('/writers', require('./writers/routes'));

// Start Server
app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});
