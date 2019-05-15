const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const fetch = require('node-fetch');
const unirest = require('unirest');
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    // connectionString : process.env.DATABASE_URL,
    // ssl: true,
    user : 'nawst',
    password : '',
    database : 'podcast'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());



app.get('/', (req, res) => res.send('it is working!'));


app.get('/popular', (req, res) => {
    const url = 'https://rss.itunes.apple.com/api/v1/us/podcasts/top-podcasts/all/50/explicit.json';

    fetch(url)
        .then(response => response.json())
        .then(result => res.json(result.feed.results));
})

app.get('/genres', (req, res) => {
    const url = 'http://itunes.apple.com/WebObjects/MZStoreServices.woa/ws/genres';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const podcastObj = data['26'].subgenres;
            let majorGenres = [];
            Object.keys(podcastObj).forEach(key => {
                console.log(podcastObj[key]);
                majorGenres.push(podcastObj[key]);
            })
            res.json(majorGenres);
        })
})


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT || 3000}`);
});
