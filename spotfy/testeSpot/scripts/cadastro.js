const form = document.getElementById('musicForm');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita o envio do formulário

  const nome = document.getElementById('nome').value;
  const artista = document.getElementById('artista').value;
  const arquivo = document.getElementById('arquivo').files[0];
  const imagem = document.getElementById('imagem').files[0];

  if (arquivo && imagem) {
    const musicData = {
      title: nome,
      artist: artista,
      src: URL.createObjectURL(arquivo), // Usa o URL do arquivo local
      image: URL.createObjectURL(imagem) // Usa o URL da imagem local
    };

    // Salva as músicas no localStorage
    const existingMusic = JSON.parse(localStorage.getItem('musics')) || [];
    existingMusic.push(musicData);
    localStorage.setItem('musics', JSON.stringify(existingMusic));

    // Redireciona para a página inicial
    window.location.href = './inicial.html';
  }
});
