require('dotenv').config();  // Importa dotenv

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Connessione al database
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connesso al database'))
.catch((error) => console.error('Errore di connessione al database:', error));

// Rotte (esempio)
app.get('/', (req, res) => {
  res.send('Benvenuto su TaxiRentNcc Server!');
});

// Avvio del server
app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
