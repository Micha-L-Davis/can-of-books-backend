'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);
const Book = require('./models/book');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/test', (request, response) => {

  response.send('test request received');

});

app.get('/books', async (request, response) => {
  try {
    console.log(request);
    const bookQuery = {};
    if (request.query.email) {
      bookQuery.email = request.query.email;
    }

    const books = await Book.find(bookQuery);

    response.status(200).send(books);
  }
  catch (error) {
    console.log(error.message);
    response.status(500).send(error.message);
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
