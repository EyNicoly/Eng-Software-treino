const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// Rota de exemplo
app.get('/', (req, res) => {
  res.send('Olá, mundo! Este é o meu primeiro servidor backend em Node.js!');
});

// Outra rota de exemplo para testar POST
app.post('/api/saudacao', (req, res) => {
  const nome = req.body.nome || 'visitante';
  res.json({ mensagem: `Olá, ${nome}!` });
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});