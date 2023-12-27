const clientId = '42d3994c26fb4a00b16609a33f09bedd';
const redirectUri = 'https://rolllpng.github.io/spotify';
const scope = 'user-top-read';
let accessToken;

function authorizeSpotify() {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token`;
}

function getHashParams() {
    const hashParams = {};
    const hash = window.location.hash.substring(1);
    const params = hash.split('&');
    for (const param of params) {
        const [key, value] = param.split('=');
        hashParams[key] = decodeURIComponent(value);
    }
    return hashParams;
}

function fetchTopArtists() {
    const url = 'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5';

    fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const artists = data.items.map(artist => artist.name);
        displayStats('Your Top Artists:', artists);
    })
    .catch(error => console.error('Error fetching top artists:', error));
}

function displayStats(title, data) {
    const statsContainer = document.getElementById('stats-container');
    statsContainer.innerHTML = `<h2>${title}</h2><ul>${data.map(item => `<li>${item}</li>`).join('')}</ul>`;
}

window.addEventListener('load', () => {
    const params = getHashParams();
    accessToken = params.access_token;

    if (accessToken) {
        fetchTopArtists();
    }
});
