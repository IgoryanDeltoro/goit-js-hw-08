import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import { load, save } from './storage';

const iframe = document.querySelector('#vimeo-player');
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

const player = new Player(iframe);

player.on('timeupdate', throttle(saveCurrentTimeInLS, 1000));
setCurrentTimeOnPlayer();

function saveCurrentTimeInLS(data) {
  save(LOCALSTORAGE_KEY, data.seconds);
}

function setCurrentTimeOnPlayer() {
  const getTime = load(LOCALSTORAGE_KEY);
  if (getTime !== undefined) player.setCurrentTime(getTime);
}
