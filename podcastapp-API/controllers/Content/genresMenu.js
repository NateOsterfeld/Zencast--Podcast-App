const fetch = require('node-fetch');

const GenresMenu = (req, res) => {
    const url = 'http://itunes.apple.com/WebObjects/MZStoreServices.woa/ws/genres';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let podcastObj = data['26'].subgenres;
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
}

module.exports = {
    GenresMenu
}