
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();


const uploadRoutes = require('./Routes/routes');
const cookieParser = require('cookie-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from this origin
  credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));


app.use('/', uploadRoutes);

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/student_db", {
  
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
