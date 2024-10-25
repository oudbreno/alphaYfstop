const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Configurar o middleware para analisar o JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para a página de cadastro
app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cadastro.html'));
});

// Endpoint para retornar as músicas
app.get('/api/musicas', (req, res) => {
  fs.readFile('uploads/musicas/musicas.json', (err, data) => {
      if (err) {
          console.error('Erro ao ler o arquivo JSON:', err); // Adicionei o log para facilitar a identificação do erro
          return res.status(500).send('Erro ao ler o arquivo JSON');
      }
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
  });
});


// Endpoint para obter a lista de músicas
app.get('/api/musicas', (req, res) => {
  fs.readFile('musicas/musicas.json', (err, data) => {
      if (err) {
          return res.status(500).send('Erro ao ler o arquivo JSON');
      }
      const musicas = JSON.parse(data);
      res.json(musicas); // Retorna a lista de músicas como JSON
  });
});

// Configurar o armazenamento do multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'musicas/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = Date.now() + '-' + file.fieldname + ext;
        cb(null, filename);
    }
});

const upload = multer({ storage });

// Endpoint para cadastrar músicas
app.post('/api/musicas', upload.fields([{ name: 'arquivo' }, { name: 'imagem' }]), (req, res) => {
    const { nome, artista } = req.body;
    const audioPath = req.files['arquivo'][0].path; // Caminho do arquivo de áudio
    const imagePath = req.files['imagem'][0].path; // Caminho da imagem

    // Cria um objeto para a nova música
    const novaMusica = {
        id: Date.now(),
        title: nome,
        artist: artista,
        src: audioPath,
        image: imagePath
    };

    // Lê o JSON existente
    fs.readFile('musicas/musicas.json', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo JSON');
        }

        let musicas = [];
        if (data.length) {
            musicas = JSON.parse(data);
        }

        // Adiciona a nova música
        musicas.push(novaMusica);

        // Salva o novo JSON
        fs.writeFile('musicas/musicas.json', JSON.stringify(musicas, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Erro ao salvar a música');
            }
            res.status(201).send(novaMusica); // Retorna a nova música
        });
    });
});

// Servir arquivos estáticos
app.use('/uploads', express.static('musicas'));

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
