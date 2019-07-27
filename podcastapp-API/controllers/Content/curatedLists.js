const fetch = require('node-fetch');

const ListOfCuratedLists = (req, res) => {
    let url = 'https://listen-api.listennotes.com/api/v2/curated_podcasts';
    
    if (req.body.random) {
        let page = Math.floor(Math.random() * 112);
        url = `https://listen-api.listennotes.com/api/v2/curated_podcasts?page=${page}`;
    }

    fetch(url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'X-ListenAPI-Key': 'cf69dc6fa0024866ab39bc898eaed9a8'
        }
    })
    .then(response => response.json())
    .then(response => res.json(response))
    .catch(err => console.log('error', err));
}

const PodcastsInCuratedList = (req, res) => {
    const url = `https://listen-api.listennotes.com/api/v2/curated_podcasts/${req.params.id}`;

    fetch(url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'X-ListenAPI-Key': 'cf69dc6fa0024866ab39bc898eaed9a8'
        }
    }).then(response => response.json())
        .then(response => {
            res.json(response);
        })
        .catch(err => console.log('error', err));
}

module.exports = {
    ListOfCuratedLists,
    PodcastsInCuratedList
}