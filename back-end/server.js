require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8000;
const passport = require('passport');

// Middleware
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Passport Middleware
app.use(passport.initialize());

// Inporting passport file into server
require('./config/passport')(passport);
const users = require('./routes/api/users');

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Smile, yr bein watched by the backend team'})
});

app.use('/api/users', users);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});

// require('dotenv').config();
// const express = require('express');
// const app = express();
// const cors = require('cors');
// const port = process.env.PORT || 8000;
// const passport = require('passport');
// // middleware
// app.use(cors());
// app.use(express.urlencoded({ extended: false}));
// app.use(express.json());
// // passport middleware
// app.use(passport.initialize());
// // import passport filr into server
// require('./config/passport')(passport);
// const users = require('./routes/api/User')
// app.get('/', (req, res)=> {
//     res.status(200).json({ message: 'Smile you been watch by Backend Team'})
// })
// app.use('/api/users', users)
// app.listen(port, ()=>{
//     console.log(`Server is running on port: ${port}`)
// })