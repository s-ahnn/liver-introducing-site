const API_KEY = "AIzaSyA5GAPmJircaLQx3p1uusg4JyvD4jN9NAo";
const cPLAYLIST_ID = "PLmDsMyGoWYao5hZq6ReDUVcDu8li8cj_x&si=n9JLCh0dJbUaSETP";
const oPLAYLIST_ID = "PL-_4ze9jVHOGo0LI6ogGYNyOe6LanDa3C";
const CHANNEL_ID = "UCTIE7LM5X15NVugV7Krp9Hw";

async function cFetchAllVideos() {
    let videos = [];
    let nextPageToken = '';
    let page = 1;

    while (true) {
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${cPLAYLIST_ID}&key=${API_KEY}&pageToken=${nextPageToken}`;
        const res = await fetch(url);
        const data = await res.json();

        videos = videos.concat(data.items);
        if (!data.nextPageToken) break;
        nextPageToken = data.nextPageToken;
        page++;
    }
    return videos;
}

function cDisplayVideos(videos) {
    const container = document.getElementById('cover');

    const first = videos.slice(0, 5);

    first.forEach(item => {
        const snippet = item.snippet;
        const title = snippet.title;
        const thumbnail = snippet.thumbnails.medium.url;
        const videoId = snippet.resourceId.videoId;

        const div = document.createElement('div');
        div.className = 'video';

        div.innerHTML = `
          <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
            <img src="${thumbnail}" alt="${title}">
          </a>
          <p>${title}</p>
        `;

        container.appendChild(div);
    });
}

async function oFetchAllVideos() {
    let videos = [];
    let nextPageToken = '';
    let page = 1;

    while (true) {
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${oPLAYLIST_ID}&key=${API_KEY}&pageToken=${nextPageToken}`;
        const res = await fetch(url);
        const data = await res.json();

        videos = videos.concat(data.items);
        if (!data.nextPageToken) break;
        nextPageToken = data.nextPageToken;
        page++;
    }
    return videos;
}

function oDisplayVideos(videos) {
    const container = document.getElementById('original');

    const first = videos.slice(0, 5);

    first.forEach(item => {
        const snippet = item.snippet;
        const title = snippet.title;
        const thumbnail = snippet.thumbnails.medium.url;
        const videoId = snippet.resourceId.videoId;

        const div = document.createElement('div');
        div.className = 'video';

        div.innerHTML = `
          <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
            <img src="${thumbnail}" alt="${title}">
          </a>
          <p>${title}</p>
        `;

        container.appendChild(div);
    });
}

async function fetchStreams() {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&type=video&eventType=completed&maxResults=5`;

    const res = await fetch(url);
    const data = await res.json();
    return data.items;
}

function displayStreams(videos) {
    const container = document.getElementById('archive');

    videos.forEach(item => {
        const snippet = item.snippet;
        const title = snippet.title;
        const thumbnail = snippet.thumbnails.medium.url;
        const videoId = item.id.videoId;

        const div = document.createElement('div');
        div.className = 'video';

        div.innerHTML = `
          <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
            <img src="${thumbnail}" alt="${title}">
          </a>
          <p>${title}</p>
        `;

        container.appendChild(div);
    });
}

cFetchAllVideos().then(cDisplayVideos);
oFetchAllVideos().then(oDisplayVideos);
fetchStreams().then(displayStreams);