const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Conexão com o Postgres
const client = new Client({
    user: 'postgres',
    host: 'db',
    database: 'tasksdb',
    password: 'postgres',
    port: 5432,
});

client.connect();

// Endpoint para obter tarefas com base no filtro (completed ou pending)
app.get('/api/task/:filter', async (req, res) => {
    const filter = req.params.filter;
    const query = filter === 'completed'
        ? 'SELECT * FROM tasks WHERE complete = TRUE'
        : filter === 'pending'
            ? 'SELECT * FROM tasks WHERE complete = FALSE'
            : 'SELECT * FROM tasks';

    try {
        const result = await client.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
});

// Endpoint para atualizar a tarefa (completar ou desmarcar)
app.patch('/api/task/:id', async (req, res) => {
    const { id } = req.params;
    const { complete } = req.body;

    try {
        await client.query(
            'UPDATE tasks SET complete = $1 WHERE id = $2',
            [complete, id]
        );
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
});

// Endpoint para deletar uma tarefa
app.delete('/api/task/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await client.query('DELETE FROM tasks WHERE id = $1', [id]);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar tarefa' });
    }
});

// Inicializando a aplicação
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
