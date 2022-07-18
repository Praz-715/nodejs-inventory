import express from 'express';
import { database, MONGO_URI } from './utils/db.js';

const app = express();
const port = process.env.PORT || 8181;
// Connect Database
database();

app.use(express.urlencoded({ extended: true }));
app.get('/', function (req, res) {
  res.json({ status: 'OK' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

//Run app, then load http://localhost:3000 in a browser to see the output.
