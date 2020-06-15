



import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import bodyParser from 'body-parser';



import {resolve} from 'dns';
import {Express} from 'express';

import {routerCoupons} from './server/routes/administration/options/coupons.requests.route';
//const routerCoupons = require('./server/routes/administration/coupons.requests.route');

const server = express();
const distFolder = join(process.cwd(), 'dist/teashop/browser');
const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

//server.use(bodyParser.json());
//server.use(bodyParser.urlencoded({ extended: true }));

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)

server.engine('html', ngExpressEngine({
  bootstrap: AppServerModule,
}));

server.set('view engine', 'html');
server.set('views', distFolder);

// Example Express Rest API endpoints
// server.get('/api/**', (req, res) => { });
// Serve static files from /browser
server.get('*.*', express.static(distFolder, {
  maxAge: '1y'
}));

server.use('/api/coupons', routerCoupons);


// All regular routes use the Universal engine

server.get('*', (req, res) => {
  res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
});
const port = process.env.PORT || 4000;

// Start up the Node server
server.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});



export * from './src/main.server';
