const fetch = require('node-fetch');

module.exports = (req, res) => {
    const url = `https://itunes.apple.com/search?media=podcast&term=${req.query.term}`;

    fetch(url)
        .then(response => response.json())
        .then(data => res.json(data))
        .catch(err => console.log('error', err));
}