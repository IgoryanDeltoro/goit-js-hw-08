import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

const player = new Player(iframe);

player.on('timeupdate', throttle(saveCurrentTimeInLS, 1000));

function saveCurrentTimeInLS(data) {
  localStorage.setItem(LOCALSTORAGE_KEY, data.seconds);
}

player.setCurrentTime(localStorage.getItem(LOCALSTORAGE_KEY));
