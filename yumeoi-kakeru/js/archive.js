const API_KEY = "AIzaSyA5GAPmJircaLQx3p1uusg4JyvD4jN9NAo";
const CHANNEL_ID = "UCTIE7LM5X15NVugV7Krp9Hw";

async function fetchStreams() {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&type=video&eventType=completed&maxResults=50`;

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

fetchStreams().then(displayStreams);