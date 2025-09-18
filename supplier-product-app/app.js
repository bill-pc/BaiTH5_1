const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const supplierRoutes = require('./routes/supplierRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// Kết nối MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/labcrud')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/suppliers', supplierRoutes);
app.use('/products', productRoutes);

app.get('/', (req, res) => {
    res.render('index');
});
app.listen(3000, () => console.log('Server chạy ở http://localhost:3000'));