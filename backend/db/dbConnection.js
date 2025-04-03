const DATABASE = process.env.DB_URL;
const mongoose = require("mongoose");


const dbConn = () =>{
    mongoose
        .connect(DATABASE)
        .then((conn) => {
            console.log(`Database connected on ${conn.connection.host}`);
        }).catch((err) => {
            console.log(`Error: ${err.message}`);
            process.exit(1); // 1 means exit with failure
        });
}
module.exports = dbConn;