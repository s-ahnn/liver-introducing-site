const API_KEY = "AIzaSyA5GAPmJircaLQx3p1uusg4JyvD4jN9NAo";
const cPLAYLIST_ID = "PLmDsMyGoWYao5hZq6ReDUVcDu8li8cj_x&si=n9JLCh0dJbUaSETP";

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

    videos.forEach(item => {
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

cFetchAllVideos().then(cDisplayVideos);