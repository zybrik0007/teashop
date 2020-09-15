import { Request, Response, NextFunction } from 'express';
import {environment} from '../../../../src/environments/environment';
const express = require('express');

import {ErrorValidation} from '../../../errors/ErrorValidation';
import {ErrorDB} from '../../../errors/ErrorDB';
import {CategoryValodation} from '../../../validation_route/administration/category/validation.category';
import {CategoryDB} from '../../../requests_database/administration/category/category.database.request';

const validation = new CategoryValodation();
const CategoryReqDB = new CategoryDB();



