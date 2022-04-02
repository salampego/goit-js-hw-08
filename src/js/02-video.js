import throttle from 'lodash.throttle';
const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo.Player(iframe);

player.on('timeupdate', throttle(currentTime, 1000));

function currentTime(e) {
  localStorage.setItem('videoplayer-current-time', e.seconds);
}

player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
