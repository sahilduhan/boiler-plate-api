const express = require('express');
require('dotenv').config();

const contactRoute = require('./api/routes/contactRoute');
const userRoute = require('./api/routes/userRoute');
const connectDB = require('./api/config/dbConnection');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})

app.use('/contact',contactRoute);
app.use('/users',userRoute);