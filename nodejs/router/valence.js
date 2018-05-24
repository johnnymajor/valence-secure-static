/**
 * Valence Router
 */
const express        = require('express'),
      cors           = require('cors'),
      corsWhiteList  = ['yourValenceHostAndPort'],
      corsOptions    = {
          origin : (origin, callback) => {
              if (typeof origin === 'undefined'
                  || corsWhiteList.indexOf(origin) !== -1) {
                  callback(null, true);
              } else {
                  callback(new Error('Not allowed by CORS'));
              }
          },
      },
      router         = express.Router(),
      valenceConnect = require('valence-connect'),
      privatePages   = require(global.__api + 'privatePages');

// Initialize Valence Connect using valence.json
//
valenceConnect.init();

// Allow Cross Origin
//
router.all('*', cors(corsOptions));

/**
 * Check if the request session is authenticated
 * @param {IncomingMessage} req http request
 * @param {ServerResponse} res http response
 * @param {callback} next continue
 */
let valenceCheck = (req, res, next) => {
    valenceConnect.isAuthenticated(req, res)
        .then(() => {
            next();
        });
};

// Always check before proceeding that the session is valid for all Valence requests
//
router.use(valenceCheck);

// Routes
//
router.all('/getHtmlDocument', privatePages);

module.exports = router;
