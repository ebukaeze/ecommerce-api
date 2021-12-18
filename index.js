const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');

dotenv.config();

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DBConnection: Successfull!")

).catch((err) => {
    console.log(err);
})

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});
