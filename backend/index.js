const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const pinRoute = require('./routes/pins');
const userRoute = require('./routes/users');

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("MongoDB connected successfully...")
}).catch(error => console.log(error));

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

app.listen(5000, () => {
    console.log(`Backend running on port 5000...`);
})