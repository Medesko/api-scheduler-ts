import * as express from 'express';
import * as compression from 'compression';  // compresses requests
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as errorHandler from 'errorhandler';
import * as lusca from 'lusca';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import expressValidator = require('express-validator');

/**
 * ---------------------------------- Controllers (route handlers).
 */
const api = require('auto-loader').load(__dirname + '/api');
/**
 * ---------------------------------- Load environment variables from .env file.
 */
dotenv.config({path: '.env.dev'});
/**
 * ---------------------------------- Create Express server.
 */
const app = express();
/**
 * ---------------------------------- Connect to MongoDB.
 */
let mongodbUri: string = 'mongodb://';
if (process.env.DB_USER !== null && process.env.DB_PASS) {
    mongodbUri += process.env.DB_USER + ':' + process.env.DB_PASS + '@';
}
mongodbUri += process.env.DB_SERVERS + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME;
const options: any = {
    useMongoClient: true,
};
(<any>mongoose).Promise = global.Promise;
mongoose.set('debug', true);
mongoose.connect(mongodbUri, options).then(() => {
    console.log(('mongo connected at mongodb://localhost:%d/%s'), process.env.DB_PORT, process.env.DB_NAME);
}).catch((err: any) => console.error(err));
/**
 * ---------------------------------- Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use(express.static(path.join(__dirname, 'public'), {maxAge: 31557600000}));

/**
 * ---------------------------------- Express router.
 */
const router = express.Router();
// options for cors midddleware
const corsOptions: cors.CorsOptions = {
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    preflightContinue: false
};
// use cors middleware
router.use(cors(corsOptions));
// enable pre-flight
router.options('*', cors(corsOptions));
/**
 * ---------------------------------- api routing.
 */

router.route('/*')
.get(function (req, res) {
    res.status(401).json({message: 'Authorization has been denied'});
});
 /**
  * ---------------------------------- api version
  */
app.use('/1', router);
/**
 * ---------------------------------- Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * ---------------------------------- Start Express server.
 */
app.listen(app.get('port'), () => {
    console.log(('api is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
});

module.exports = app;