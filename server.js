'use strict';

const dotenv = require('dotenv');
const express = require('express');

dotenv.load();

const PORT = process.env.PORT;
const app = express();

app.use(express.static(`${__dirname}/build`));

app.get('/icon', (req, res) => {
  res.sendFile(`${__dirname}/app/imgs/mrs-logo.png`);
});

app.listen(PORT, () => {
  console.log(`server up: ${PORT}`);
});
