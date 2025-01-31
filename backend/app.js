const express = require('express')
const app = express();
const port = process.env.port || 5000;
const mongoose =require("mongoose");
const cors =require("cors");
const path = require("path");

app.use(cors())
require('./models/model')
require('./models/post')
app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/CreatePost"))
app.use(require("./routes/user"))
const uri = 'mongodb://127.0.0.1:27017/edugram';
 // Replace with your connection string

 async function connectDB() {
    try {
        await mongoose.connect(uri, {});
        console.log('Successfully connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    }
}

connectDB();

// serving the frontend
app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", (req, res) => {  
    res.sendFile(path.join(__dirname, "./frontend/build/index.html")),
    function (err){
        res.status(500).send(err)
    }
});
app.listen(port,()=>{
    console.log("server is running on port"+" " +port)
});