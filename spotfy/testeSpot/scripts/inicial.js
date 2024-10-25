let currentSongIndex = -1;
const audio = document.getElementById('audio');

// Carrega músicas do localStorage
function loadMusic() {
  const musicList = JSON.parse(localStorage.getItem('musics')) || [];
  const songList = document.getElementById('songList');
  songList.innerHTML = ''; // Limpar a lista de músicas

  musicList.forEach((song, idx) => {
    const songDiv = document.createElement('div');
    songDiv.classList.add('song');
    songDiv.innerHTML = `<h4>${song.title}</h4><p>${song.artist}</p>`;
    songDiv.onclick = () => playSong(idx, musicList);
    songList.appendChild(songDiv);
  });
}

function playSong(index, musicList) {
  const song = musicList[index];
  audio.src = song.src;
  document.getElementById('currentSongTitle').innerText = song.title;
  document.getElementById('currentArtist').innerText = song.artist;
  audio.play();
  currentSongIndex = index;
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function prevSong() {
  if (currentSongIndex > 0) {
    playSong(currentSongIndex - 1);
  }
}

function nextSong() {
  const musicList = JSON.parse(localStorage.getItem('musics')) || [];
  if (currentSongIndex < musicList.length - 1) {
    playSong(currentSongIndex + 1);
  }
}

// Carregar músicas ao abrir a página
loadMusic();
