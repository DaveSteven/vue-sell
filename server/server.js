const express = require('express');

const port = 9091;

const app = express();

const appData = require('./data.json');
const seller = appData.seller;
const goods = appData.goods;
const ratings = appData.ratings;

const apiRoutes = express.Router();

apiRoutes.get('/seller', (req, res) => {
  res.json({
    errno: 0,
    data: seller
  });
});

apiRoutes.get('/goods', (req, res) => {
  res.json({
    errno: 0,
    data: goods
  });
});

apiRoutes.get('/ratings', (req, res) => {
  res.json({
    errno: 0,
    data: ratings
  });
});

app.use('/api', apiRoutes);

app.listen(port, '0.0.0.0', err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listening at http://0.0.0.0:${port}\n`);
});
