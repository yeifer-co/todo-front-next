//import path from 'path';
//import dotenv from 'dotenv';
const path = require('path');
const dotenv = require('dotenv');

dotenv.config(
    {
        path: path.resolve(__dirname, '.env')
    }
);

console.log('=========>>>> ENV', process.env);