const express = require('express');
const connectDB = require('./config/db');
const app = express();

//connect db
connectDB();

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

// Define static folder for uploads
app.use(express.static('uploads'));

// Define routes
app.use('/api/users', require('./route/api/users'));
app.use('/api/auth', require('./route/api/auth'));
app.use('/api/profile', require('./route/api/profile'));
app.use('/api/posts', require('./route/api/posts'));
app.use('/api/resetpassword', require('./route/api/resetpassword'));
app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
