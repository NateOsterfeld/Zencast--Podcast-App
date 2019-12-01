import LRU from 'lru-cache';
const cache = new LRU(50);

// take payload/id from fetchSTART right away and check if cache exists, if not then cache it
const useSuspenseFetchEpisodes = id => {
    const key = id // set podcastId to key for readability. used for both cache key and fetch request
    const value = cache.get(key) || { status: 'new', data: null } // value = status: 'resolved', data || if undefined.. value =  status: 'new', data: null

    if (value.status === 'resolved') // return data if cache was returned
        return value.data

    const promise = fetch(`/episodes/${id}`) // fetch for episodes/:id and store promise in a variable
        .then(response => response.json())

    promise // promise will begin to resolve, but will first be thrown below
        .then(response => {
            value.status = 'resolved'
            value.data = response
            cache.set(key, value)
        })

    throw promise // throw promise which bubbles up to Suspense until resolving and setting data above, thrown again! but this time loading immediately w/ data
}

export default useSuspenseFetchEpisodes;

