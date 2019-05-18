const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const fetch = require('node-fetch');
const unirest = require('unirest');
// const util = require('util');
const Parser = require('rss-parser');
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

app.get('/genresMenu', (req, res) => {
    const url = 'http://itunes.apple.com/WebObjects/MZStoreServices.woa/ws/genres';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const podcastObj = data['26'].subgenres;
            let majorGenres = [];
            Object.keys(podcastObj).forEach(key => {
                console.log(podcastObj[key]);
                // console.log(util.inspect(podcastObj[key], false, null, true))
                // console.dir(podcastObj[key], {depth: null})
                majorGenres.push(podcastObj[key]);
            })
            res.json(majorGenres);
        })
})

app.get('genres/:id', (req, res) => {
    console.log(req);

    // const url = `https://itunes.apple.com/search?term=podcast&genreId=${req.params.id}&limit=50`;

    // fetch(url)
    //     .then(response => response.json())
    //     .then(data => console.log);
})

app.get('/episodes/:id', (req, res) => {
    fetch(`https://itunes.apple.com/lookup?id=${req.params.id}&entity=podcast`)
        .then(response => response.json())
        .then(response => {
            console.log('kook', response)
            console.log('kink', response.results[0].feedUrl);
            (async () => {
                // const parser = new Parser();
                let parser = new Parser({
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
                    return episodesObj;
                })
                res.json(episodes);
            })();
        })
})



app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT || 3000}`);
});
