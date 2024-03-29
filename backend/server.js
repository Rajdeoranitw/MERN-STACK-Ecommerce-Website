const app = require("./app");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");

// hnadleing uncought exception
process.on("uncaughtException", err => {
    console.log(`Error" ${err.message}`);
    console.log(`Shutting down due to  uncought exception`);

    process.exit(1);
})

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
}


// connecting to database
mongoose.connect(process.env.DB_URI).then((data) => {
    console.log(`mongodb connected with server: ${data.connection.host}`)
    app.listen(process.env.PORT, () => {
        console.log(`server is working on http://localhost:${process.env.PORT}`);
    });
}).catch(error => console.log(error));


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// unhandled promise rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down due to unhandles promise rejection`);
    server.close(() => {
        process.exit(1);
    })
})

