### Funny
make button that says YC backend instead of YC backed.
email favorite open sourcr startups with website as cred and learn more about them and their openness to contribution.


### Goal
To surface good open source issues open to new contributors. Getting professional SWE experience is tough and building full personal projects end-to-end is a huge time commitment. 

Opensourced aims to solve these issues by finding high-quality professional issues for users to tackle. Professional experience without working for a SaaS company or building your own startup.

Better industry aligned version of LeetCode?



///

Let's develop the /issues feature:

On app load, the backend /issues endpoint will fetch issues live from all stored YC startup repos using concurrent GitHub API calls, aggregate the results into a single JSON payload, and return it to the frontend. The frontend will handle all sorting, filtering, and searching client-side without further API requests. Repos will be stored in a database and refreshed periodically, but issues will always be fetched live to ensure up-to-date data. 

OPTIONAL FURTHER IMPROVEMENTS NOT NOW: Short-term caching (30–60s) may be used to reduce latency during high traffic, and async HTTP clients will be used to parallelize issue fetching efficiently.