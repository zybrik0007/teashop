import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

const  bodyParser = require('body-parser');
const formData = require('express-form-data');
const os = require('os');

const opt = {
  uploadDir: os.tmpdir(),
  autoClean: true
};


import {resolve} from 'dns';
import {Express} from 'express';
import {routerCoupons} from './server/routes/administration/options/coupons.requests.route';
import {routerCategory} from './server/routes/administration/category/category.requests.route';


const server = express();
const distFolder = join(process.cwd(), 'dist/teashop/browser');
const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(formData.parse(opt));

//server.use(upload.array());
//server.use(express.static('public'));

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

server.use(express.static('public'));
server.use('/api/coupons', routerCoupons);
server.use('/api/category', routerCategory);


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
