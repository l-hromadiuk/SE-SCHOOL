const verify = require('./verifyJWT');
const rp = require('request-promise');
const router = require('express').Router();


router.get('/', verify, (req, res) => {

  const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
    qs: {
      'symbol': 'BTC',
      'convert': 'UAH'
    },
    headers: {
      'X-CMC_PRO_API_KEY': '916418cf-0897-45dd-8133-49cd7433d81f'
    },
    json: true,
    gzip: true
  };

  rp(requestOptions).then(response => {
    var exchange = response.data.BTC.quote;
    res.send(exchange);
  })
    .catch((err) => {
      res.status(400).send(err.message);
    });

});
module.exports = router;

