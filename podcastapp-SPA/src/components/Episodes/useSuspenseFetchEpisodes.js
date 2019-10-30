import fetch from 'node-fetch';
import LRU from 'lru-cache';

const cache = new LRU(50);

const useSuspenseFetchEpisodes = id => {
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

export default useSuspenseFetchEpisodes;

// Notes on Usage:
/*
sets key to episode id
if the key is cached then it will also have a 'value.status' of 'resolved' in which case the data is returned immediately
if not, set 'value.status' to 'new' and 'value.data' to null
fetch the episodes and assign the pending promise to a variable which will immediately get thrown
this thrown promise will bubble up to our App.js and be caught by Suspense which in case our select fallback is rendered
once it's resolved it will continue back through the promise/.then chain that was skipped before
inside it we will set 'value.status' to 'resolved' and the 'response' containing our data will be assigned to 'value.data'
now we can set the cache containing the episode obj id as 'key' and our new 'value' properties with the data and status 'resolved' as the value
the promise will now get thrown again!
which will get caught by Suspense again, but it will already be resolved so the fallback won't get loaded
so now when the Episodes component goes to load again and we get the id and check the cache we'll see the status of 'resolved'
this will pass the condition to return the data we put in 'value.data' and now it can finally return the episodes
*/
