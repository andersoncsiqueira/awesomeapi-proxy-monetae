import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors({
  origin: '*', // Libera geral (ideal só para testes; veja abaixo versão segura)
}));

app.get('/moeda', async (req, res) => {
  const { base = 'USD', target = 'BRL' } = req.query;

  try {
    const response = await axios.get(`https://economia.awesomeapi.com.br/json/last/${base}-${target}`, {
      headers: {
        'x-api-key': 'a0bf8b0dc814d2132d172eccac431afed3c0c6fa11a6cf1d7b592c71034479ce'
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao consultar a API' });
  }
});

const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
