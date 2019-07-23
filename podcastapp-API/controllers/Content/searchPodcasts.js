const fetch = require('node-fetch');

const SearchPodcasts = (req, res) => {
    const url = `https://itunes.apple.com/search?media=podcast&term=${req.params.term}`;

    fetch(url)
        .then(response => response.json())
        .then(data => res.json(data))
        .catch(err => console.log('error', err));
}

module.exports = {
    SearchPodcasts
}