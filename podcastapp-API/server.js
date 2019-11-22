const express = require('express');
const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
// const knex = require('knex');
const fetch = require('node-fetch');
const unirest = require('unirest');
// const util = require('util');
const Parser = require('rss-parser');
// const db = knex({
//   client: 'pg',
//   connection: {
//     host : '127.0.0.1',
//     // connectionString : process.env.DATABASE_URL,
//     // ssl: true,
//     user : 'nawst',
//     password : '',
//     database : 'podcast'
//   }
// });

const popular = require('./controllers/Content/popular');
const searchPodcasts = require('./controllers/Content/searchPodcasts');
const curatedLists = require('./controllers/Content/curatedLists');
const genresMenu = require('./controllers/Content/genresMenu');
const episodes = require('./controllers/Content/episodes');

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/popular', (req, res) => popular.Popular(req, res));

app.get('/searchPodcasts/:term', (req, res) => searchPodcasts.SearchPodcasts(req, res));

app.post('/listOfCuratedLists', (req, res) => curatedLists.ListOfCuratedLists(req, res));
app.get(`/podcastsInCuratedList/:id`, (req, res) => curatedLists.PodcastsInCuratedList(req, res));

app.get('/genresMenu', (req, res) => genresMenu.GenresMenu(req, res));

app.get('/episodes/:id', (req, res) => episodes.Episodes(req, res));



app.listen(process.env.PORT || 5001, () => console.log(`app is running on port ${process.env.PORT || 5001}`));
