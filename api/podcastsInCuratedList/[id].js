const fetch = require('node-fetch');

module.exports = (req, res) => {
    const url = `https://listen-api.listennotes.com/api/v2/curated_podcasts/${req.query.id}`;

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