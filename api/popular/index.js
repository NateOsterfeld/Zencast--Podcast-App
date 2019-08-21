const fetch = require('node-fetch');

module.exports = (req, res) => {
    const url = 'https://rss.itunes.apple.com/api/v1/us/podcasts/top-podcasts/all/50/explicit.json';
    fetch(url)
        .then(response => response.json())
        .then(result => res.json(result.feed.results))
        .catch(err => console.log('error', err));
}