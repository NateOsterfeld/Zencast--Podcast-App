const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
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

const app = express();
app.use(bodyParser.json());
app.use(cors());



// app.get('/', (req, res) => res.send('it is working!'));


app.get('/popular', (req, res) => {
    const url = 'https://rss.itunes.apple.com/api/v1/us/podcasts/top-podcasts/all/50/explicit.json';
    fetch(url)
        .then(response => response.json())
        .then(result => res.json(result.feed.results))
        .catch(err => console.log('error', err));
})

app.get('/searchPodcasts/:term', (req, res) => {
    const url = `https://itunes.apple.com/search?media=podcast&term=${req.params.term}`;

    fetch(url)
        .then(response => response.json())
        .then(data => res.json(data))
        .catch(err => console.log('error', err));
})

app.post('/curatedListsList', (req, res) => {
    let url = 'https://listen-api.listennotes.com/api/v2/curated_podcasts';

    if (req.body.random) {
        let page = Math.floor(Math.random()*112);
        url = `https://listen-api.listennotes.com/api/v2/curated_podcasts?page=${page}`;
    }

    fetch(url, {
        method: 'get',
        headers: { 'Content-Type': 'application/json',
                   'X-ListenAPI-Key': 'cf69dc6fa0024866ab39bc898eaed9a8' }
    })
        .then(response => response.json())
        .then(response => res.json(response))
        .catch(err => console.log('error', err));
})

app.get(`/podcastsFromCuratedList/:id`, (req, res) => {
    const url = `https://listen-api.listennotes.com/api/v2/curated_podcasts/${req.params.id}`;

    fetch(url, {
        method: 'get',
        headers: { 'Content-Type': 'application/json',
                   'X-ListenAPI-Key': 'cf69dc6fa0024866ab39bc898eaed9a8' }
    }).then(response => response.json())
      .then(response => {
          console.log('check', response);
          res.json(response);
      })
      .catch(err => console.log('error', err));
})


app.get('/genresMenu', (req, res) => {
    const url = 'http://itunes.apple.com/WebObjects/MZStoreServices.woa/ws/genres';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const podcastObj = data['26'].subgenres;
            let majorGenres = [];
            Object.keys(podcastObj).forEach(key => {
                // console.log(podcastObj[key]);
                // console.log(util.inspect(podcastObj[key], false, null, true))
                // console.dir(podcastObj[key], {depth: null})
                majorGenres.push(podcastObj[key]);
            })
            res.json(majorGenres);
        })
        .catch(err => console.log('error', err));
})


app.get('/episodes/:id', (req, res) => {
    fetch(`https://itunes.apple.com/lookup?id=${req.params.id}&entity=podcast`)
        .then(response => response.json())
        .then(response => {
            (async () => {
                const parser = new Parser({
                    customFields: {
                      feed: ['otherTitle', 'extendedDescription'],
                      item: [
                          ['description', 'description'],
                          ['itunes:duration', 'duration'],
                          ['itunes:image', 'image']
                      ] 
                    }
                  });
                const feed = await parser.parseURL(response.results[0].feedUrl);
                
                let episodes = feed.items.map(item => {
                    const episodesObj = {
                        title: item.title,
                        description: item.description,
                        pubDate: item.pubDate,
                        link: item.link,
                        enclosure: item.enclosure,
                        duration: item.duration,
                        image: item.image
                    }
                    episodesObj.mainDescription = feed.description;
                    return episodesObj;
                })
                
                res.json(episodes);
            })();
        }).catch(err => console.log('error', err));
})



app.listen(process.env.PORT || 3000, () => console.log(`app is running on port ${process.env.PORT || 3000}`));
