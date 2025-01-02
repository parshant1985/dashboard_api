const express = require('express');
const cors = require('cors');

const app = express();

// Allow all origins (not recommended for production)
app.use(cors());

// OR configure specific origins
const corsOptions = {
  origin: ['https://dashboard-api-jet.vercel.app/', 'https://dashboard-api-jet.vercel.app/'], // Allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
const User =  require('./models/user.model');
require('dotenv').config();
require('./db');
const PORT = process.env.PORT || 8080;
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('First api running new deploy');
});
app.get('/ping', (req, res) => {
    res.send('<=PONG=>');
});
app.get('/country', (req, res) => {
    res.send('<=INDIA=>');
});
app.get('/api/users', async (req, res)=> {
    try {
     const users =  await User.find({})
     res.status(200).json(users)
    }
    catch(error) {
        res.status(500).json({error: error.message})
    }
});

app.get('/ping', (req, res) => {
    res.send('PONG')
});
// /products
app.use('/products', productRoutes);
// /users
app.use('/users', userRoutes);
app.get('/api/users', async (req, res)=> {
    try {
     const users =  await User.find({})
     res.status(200).json(users)
    }
    catch(error) {
        res.status(500).json({error: error.message})
    }
});
app.listen(3000, () => {
    console.log('Server is listenin on PORT :' + PORT);
})
