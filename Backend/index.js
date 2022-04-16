const express = require('express')
var cors = require('cors')
const connectToMongo=require('./db');
connectToMongo();
const app=express();

app.use(cors());
app.use(express.json());
const port=5000;

// respond with "hello world" when a GET request is made to the homepage
app.use('/api/auth',require('./Routes/auth'));
app.use('/api/notes',require('./Routes/notes'));

app.listen(port, () => {
    console.log(`iNotebook started successfully on port ${port}`);
  });