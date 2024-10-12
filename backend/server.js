const dotenv = require("dotenv");
const app = require("./app");
const connectDb = require("./config/database");
const path = require("path");
dotenv.config({path  : path.join(__dirname, "./.env")})


connectDb()

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})