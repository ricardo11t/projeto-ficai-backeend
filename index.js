const dotenv = require('dotenv');
const express = require('express');
const usuarioRoutes = require('./routes/userRouter.js');
const PORT = 3000;

dotenv.config();

const app = express();
app.use(express.json());

app.use('/usuarios', usuarioRoutes);

app.listen(PORT, async () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    try {
        console.log('Conexão estabelecida!')
    } catch (err) {
        console.log('Erro ao se conectar com o banco', err)
    }
});