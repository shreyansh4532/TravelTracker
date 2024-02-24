const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URL);

app.listen(8800, () => {
    console.log(`Backend running on port 8800...`);
})