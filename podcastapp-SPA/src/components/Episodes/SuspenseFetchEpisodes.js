import fetch from 'node-fetch';
import Parser from 'rss-parser';
import LRU from 'lru-cache';

const cache = new LRU(50);

const SuspenseFetchEpisodes = id => {
    const key = id;
    const value = cache.get(key) || { status: 'new', data: null };

    if (value.status === 'resolved') {
        return value.data;
    }

    const promise = fetch(`/episodes/${id}`).then(response => response.json());

    promise.then(response => {
        value.status = 'resolved';
        value.data = response;
        cache.set(key, value);
    })

    throw promise;
}

export default SuspenseFetchEpisodes;