require('dotenv').config();

const express = require("express");
const cors = require("cors");
const path = require('path');
const ItemsRouter = require('./routes/ItemsRoutes');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views' ,'home.html'));
})

app.get('/doc', (req, res) => {
    res.sendFile(path.join(__dirname, 'views' ,'doc.html'));
})

//Items router
app.use('/api/items', ItemsRouter.router());

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views' ,'404.html'));
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

