const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(express.json());

connectDB(process.env.MONGO_URI); // use your mongo uri for storing data or testig apis 

app.listen(process.env.PORT, () => console.log(`Server running`));

