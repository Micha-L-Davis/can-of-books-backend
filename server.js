'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);
const Book = require('./models/book');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.get('/test', (request, response) => {

  response.send('test request received');

});

app.get('/books', async (request, response) => {
  try {
    // console.log(request);
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

app.post('/books', async (request, response) => {
  try {
    console.log(request);
    const newBook = await Book.create(request.query);
    response.send(newBook);
  }
  catch (error) {
    console.error(error);
    response.status(500).send('Error creating book');
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
