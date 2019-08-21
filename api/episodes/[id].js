const fetch = require('node-fetch');
const Parser = require('rss-parser');

module.exports = (req, res) => {
    fetch(`https://itunes.apple.com/lookup?id=${req.query.id}&entity=podcast`)
        .then(response => response.json())
        .then(response => {
            (async () => {
            try {
                const parser = new Parser({
                    customFields: {
                        feed: ['otherTitle', 'extendedDescription'],
                        item: [
                            ['description', 'description'],
                            ['itunes:duration', 'duration'],
                            ['itunes:image', 'image']
                        ]
                    }
                })
                const feed = await parser.parseURL(response.results[0].feedUrl);

                let episodes = feed.items.map(item => {
                    const episodesObj = {
                        title: item.title,
                        description: item.description,
                        pubDate: item.pubDate,
                        // link: item.link,
                        enclosure: item.enclosure,
                        duration: item.duration,
                        image: item.image
                    }
                    episodesObj.mainDescription = feed.description;
                    episodesObj.website = feed.link;
                    return episodesObj;
                })

                res.json(episodes);
            }
            catch (err) {
                console.log('error', err);
            }
        })();
    })
    .catch(err => console.log('error', err));
}