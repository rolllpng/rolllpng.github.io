// Function to initiate Spotify authorization
function authorizeSpotify() {
    const clientId = '42d3994c26fb4a00b16609a33f09bedd';
    const redirectUri = 'https://rolllpng.github.io/spotify/callback';
    const scope = 'user-top-read'; // Adjust scope as needed

    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token`;
}

// Function to fetch user's top artists, songs, and genres
async function fetchTopData(accessToken) {
    try {
        const [artists, songs, genres] = await Promise.all([
            fetchTopArtists(accessToken),
            fetchTopSongs(accessToken),
            fetchTopGenres(accessToken)
        ]);

        // Display the fetched data
        displayData('Top Artists:', artists, 'top-artists');
        displayData('Top Songs:', songs, 'top-songs');
        displayData('Top Genres:', genres, 'top-genres');
    } catch (error) {
        console.error('Error fetching top data:', error);
    }
}

// Function to fetch user's top artists
async function fetchTopArtists(accessToken) {
    const url = 'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5';

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await response.json();
    return data.items.map(artist => artist.name);
}

// Function to fetch user's top songs
async function fetchTopSongs(accessToken) {
    const url = 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5';

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await response.json();
    return data.items.map(track => `${track.name} - ${track.artists[0].name}`);
}

// Function to fetch user's top genres
async function fetchTopGenres(accessToken) {
    const url = 'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5';

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await response.json();
    const genres = data.items.reduce((allGenres, artist) => {
        return allGenres.concat(artist.genres);
    }, []);

    return Array.from(new Set(genres)); // Remove duplicates
}

// Function to display data on the page
function displayData(title, data, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `<h2>${title}</h2><ul>${data.map(item => `<li>${item}</li>`).join('')}</ul>`;
}

// Call the fetchTopData function when the access token is available
window.addEventListener('load', async () => {
    const params = getHashParams();
    const accessToken = params.access_token;

    if (accessToken) {
        // If access token is present, fetch and display top data
        await fetchTopData(accessToken);
    }
});

// Function to extract parameters from the URL hash
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


// ... (existing code)

// Function to fetch user's top songs with album covers
async function fetchTopSongsWithCovers(accessToken) {
    const url = 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5';

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await response.json();
    return data.items.map(track => ({
        name: track.name,
        artists: track.artists.map(artist => artist.name),
        album: {
            name: track.album.name,
            image: track.album.images.length > 0 ? track.album.images[0].url : null
        }
    }));
}

// Function to display data on the page with album covers
function displayDataWithCovers(title, data, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `<h2>${title}</h2><ul>${data.map(item => `
        <li>
            <img src="${item.album.image}" alt="Album Cover" style="width: 50px; height: 50px; margin-right: 10px;">
            <strong>${item.name}</strong> by ${item.artists.join(', ')} (Album: ${item.album.name})
        </li>`).join('')}</ul>`;
}

// Call the fetchTopSongsWithCovers function when the access token is available
window.addEventListener('load', async () => {
    const params = getHashParams();
    const accessToken = params.access_token;

    if (accessToken) {
        const topSongsWithCovers = await fetchTopSongsWithCovers(accessToken);
        displayDataWithCovers('Top Songs:', topSongsWithCovers, 'top-songs');
    }
});

// ... (existing code)
