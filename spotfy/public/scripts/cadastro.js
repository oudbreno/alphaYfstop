const form = document.getElementById('musicForm');

form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita o envio do formulário

    const nome = document.getElementById('nome').value;
    const artista = document.getElementById('artista').value;
    const arquivo = document.getElementById('arquivo').files[0];
    const imagem = document.getElementById('imagem').files[0];

    if (arquivo && imagem) {
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('artista', artista);
        formData.append('arquivo', arquivo);
        formData.append('imagem', imagem);

        try {
            // Enviar a nova música para o servidor
            const response = await fetch('/api/musicas', {
                method: 'POST',
                body: formData, // Enviar FormData com arquivo e imagem
            });

            if (!response.ok) {
                throw new Error(`Erro ao cadastrar a música: ${response.statusText}`);
            }

            // Redirecionar para a página inicial após o cadastro
            window.location.href = './inicial.html';
        } catch (error) {
            console.error(error);
            alert('Erro ao cadastrar a música: ' + error.message);
        }
    } else {
        alert('Por favor, selecione os arquivos de áudio e imagem.');
    }
});
