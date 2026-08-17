const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const app = express();

const IS_DEV = (process.env.IS_DEV === "true");

const PORT = IS_DEV ? 3000 : 443;

app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(PORT, () => {
  console.log(IS_DEV);
  console.log(`Server is running at http://localhost:${PORT}`);
});