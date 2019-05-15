// app.get('/popular', (req, res) => {
//     const urls = [
//         'https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=0&page=1&region=us&safe_mode=0',
//         'https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=0&page=2&region=us&safe_mode=0'
//     ];

//     Promise.all(urls.map(url =>
//       fetch(url, get)
//         .then(response1 => response1.json())
//         .then(response2 => response2)
//     ))
//     .then(data => res.json([...data[0].podcasts, ...data[1].podcasts]))
//     .catch(err => console.log(err))
// })

// app.get('/profile/:id', (req, res) => {
//     db('users').where('id', req.params.id)
//         .then(user => {
//             if (user.length) {
//                 res.json(user[0]);
//             } else {
//                 res.status(400).json('no user found');
//             }
//         })
//         .catch(err => res.status(400).json('error getting user'));
// })

// app.post('/api/v2/best_podcasts', (req, res) => {
    //     const { genreId, page } = req.body;
    //     const urls = [
    //         'https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=0&page=1&region=us&safe_mode=0',
    //         'https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=0&page=2&region=us&safe_mode=0',
    //       ];
    //     let result = [];
    //     Promise.all(urls.map(url => {
    //         unirest.get(url)
    //         .header('X-ListenAPI-Key', 'cf69dc6fa0024866ab39bc898eaed9a8')
    //     }))
    //     .then(response => {
    //         // console.log(response);
    //         result = response;
    //         console.log('result', result);
    //         res.json(result);
    //     })
    //     .catch(err => res.status(400).json('error', err))
    // })


    // app.get('/test', (req, res) => {
//     unirest.get(`https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=125&page=2&region=fr&safe_mode=1`)
//     .header('X-ListenAPI-Key', 'cf69dc6fa0024866ab39bc898eaed9a8')
//     .then(response => {
//         console.log(response);
//         res.json(response);
//     })
//     .catch(err => res.status(400).json('error', err))
// })

// const get = {
//     method: 'get',
//     headers: { 'Content-Type': 'application/json',
//                'X-ListenAPI-Key': 'cf69dc6fa0024866ab39bc898eaed9a8'
//              }
//     }