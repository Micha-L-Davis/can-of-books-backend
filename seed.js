'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL);

const Book = require('./models/book');

async function seed() {
  await Book.create({
    title: 'The Growth Mindset',
    email: 'ryan@codefellows.com',
    description: 'Dweck coined the terms fixed mindset and growth mindset to describe the underlying beliefs people have about learning and intelligence. When students believe they can get smarter, they understand that effort makes them stronger. Therefore they put in extra time and effort, and that leads to higher achievement.'
  });

  await Book.create({
    title: 'Hyperion',
    email: 'cameroncodefellows@gmail.com',
    description: 'On the eve of Armageddon, with the entire galaxy at war, seven pilgrims set forth on a final voyage to Hyperion seeking the answers to the unsolved riddles of their lives.'
  });

  await Book.create({
    title: 'The Queen of Attolia',
    email: 'sheyna@codefellows.com',
    description: 'When Eugenides finds his small mountain country at war with Attolia, he must steal a man, he must steal a queen, he must steal peace. But his greatest triumph—and his greatest loss—comes in capturing something that the Queen of Attolia thought she had sacrificed long ago.'
  });

  await Book.create({
    title: 'The Disposessed',
    email: 'm.leigh.davis@gmail.com',
    description: 'The Dispossessed tells the story of its protagonist Shevek’s journey from his home on a desolate, isolated moon to the abundant planet around which his society revolves. Shevek is an Odinian physicist from the planet of Urras, a socialist planet without a central government that follows the teachings of the revolutionary Odo.'
  });

  await Book.create({
    title: 'The Master and Margarita',
    email: 'Lmurphy@gmx.com',
    description: 'Russian fiction concerning a visit by the devil to the officially atheistic Soviet Union.  Combines supernatural elements with satirical dark comedy and Christian philosophy, defying categorization within a single genre.'
  });

  mongoose.disconnect();
}

seed();
