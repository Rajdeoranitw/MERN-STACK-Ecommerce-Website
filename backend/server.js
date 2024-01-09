const app = require("./app");
const connectDataBase = require("./config/database");
const cloudinary = require("cloudinary");

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
connectDataBase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const server = app.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`);
})



// unhandled promise rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down due to unhandles promise rejection`);
    server.close(() => {
        process.exit(1);
    })
})

