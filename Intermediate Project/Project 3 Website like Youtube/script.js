const menuIcon = document.querySelector('.menu');
const sidebar = document.querySelector('.sidebar');
const shortCut = document.querySelector('.shortcut');
const container = document.querySelector('.container');
const profilePicture = document.querySelector('.profile');
const profileMenu = document.querySelector('.profile-menu');
menuIcon.onclick = function () {
	sidebar.classList.toggle('small-sidebar');
	container.classList.toggle('large-container');
};

profilePicture.addEventListener('click', function () {
	profileMenu.classList.toggle('show-hide');
});

const apiKey = 'AIzaSyBna9QEpIYLVBflUlrEb9ibACp7YCzJMv4';
const videoContainer = document.querySelector('.list-container');
const banner = document.querySelector('.banner');

const video_http = 'https://www.googleapis.com/youtube/v3/videos?';
const channel_http = 'https://www.googleapis.com/youtube/v3/channels?';

fetch(
	video_http +
		new URLSearchParams({
			key: apiKey,
			part: 'snippet',
			chart: 'mostPopular',
			maxResults: 40,
			regionCode: 'IN',
		})
)
	.then((res) => res.json())
	.then((data) => {
		data.items.forEach((item) => {
			getChannelIcon(item);
		});
	})
	.catch((err) => console.log(err));

const getChannelIcon = (video_data) => {
	fetch(
		channel_http +
			new URLSearchParams({
				key: apiKey,
				part: 'snippet',
				id: video_data.snippet.channelId,
			})
	)
		.then((res) => res.json())
		.then((data) => {
			video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
			makeVideoCard(video_data);
		});
};

const makeVideoCard = (data) => {
	videoContainer.innerHTML += ` <div class="vid-list" onclick="location.href ='https://youtube.com/watch?v=${data.id}'">
    <img class="thumbnail" src="${data.snippet.thumbnails.maxres.url}" alt="">
    <div class="flex-div content">
        <img src="${data.channelThumbnail}" alt="">
        <div class="vid-info">
            <a href="" class="title">${data.snippet.title}</a>
            <p class="channel-name">${data.snippet.channelTitle}</p>
        </div>
    </div>
</div>`;
};

// Search logi

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');

let searchLink = 'https://www.youtube.com/results?search_query=';

searchBtn.addEventListener('click', () => {
	if (searchInput.value.length) {
		location.href = searchLink + searchInput.value;
	}
});
