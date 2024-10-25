let currentSongIndex = -1;
const audio = document.getElementById('audio');

// Carrega músicas do servidor
async function loadMusic() {
    const response = await fetch('/api/musicas');
    const musicList = await response.json();
    const songList = document.getElementById('songList');
    songList.innerHTML = ''; // Limpar a lista de músicas

    musicList.forEach((song, idx) => {
        const songDiv = document.createElement('div');
        songDiv.classList.add('song');
        songDiv.innerHTML = `<h4>${song.title}</h4>`;
        songDiv.onclick = () => playSong(idx, musicList);
        songList.appendChild(songDiv);
    });
}
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/musicas'); // Faz uma requisição para obter as músicas
        const musicas = await response.json(); // Converte a resposta em JSON

        const musicListDiv = document.getElementById('musicList'); // Seleciona o elemento para exibir as músicas

        musicas.forEach(musica => {
            // Cria um elemento para cada música
            const musicItem = document.createElement('div');
            musicItem.innerHTML = `
                <h3>${musica.title} - ${musica.artist}</h3>
                <img src="${musica.image}" alt="${musica.title}" style="width: 100px; height: 100px;">
                <audio controls>
                    <source src="/uploads/${musica.src}" type="audio/mpeg">
                    Your browser does not support the audio tag.
                </audio>
            `;
            musicListDiv.appendChild(musicItem); // Adiciona o elemento à lista de músicas
        });
    } catch (error) {
        console.error('Erro ao carregar as músicas:', error);
    }
});

function playSong(index, musicList) {
    const song = musicList[index];
    audio.src = song.src; // Certifique-se de que a URL está correta
    document.getElementById('currentSongTitle').innerText = song.title;
    audio.play();
    currentSongIndex = index;
}

// Carregar músicas ao abrir a página
loadMusic();
