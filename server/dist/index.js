"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
require('dotenv').config();
const database_connect = require('../src/Database/connection');
const app = express();
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is started at port ${port}`);
});
//# sourceMappingURL=index.js.map