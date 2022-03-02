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
    console.log(books);
    response.status(200).send(books);
  }
  catch (error) {
    console.log(error.message);
    response.status(500).send(error.message);
  }
});

app.post('/books', async (request, response) => {
  try {
    //console.log(request);
    const newBook = await Book.create(request.body);
    response.send(newBook);
  }
  catch (error) {
    console.error(error);
    response.status(500).send('Error creating book');
  }
});

app.delete('/books/:id', async (request, response) => {
  const _id = request.params.id;
  const email = request.query.email;
  try{
    const foundBook = await Book.find({_id, email});
    console.log(_id, email);
    if (!foundBook) {
      response.send('Book not found');
    }
    else {
      await Book.findByIdAndDelete({_id: request.params.id});
      response.status(200).send('Success!');
    }
  }
  catch (error){
    console.error(error);
    response.status(404).send('Unable to delete book');
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
