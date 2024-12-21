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

// Endpoint para criar uma nova tarefa
app.post('/api/task', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Texto da tarefa é obrigatório' });
    }

    try {
        const result = await client.query(
            'INSERT INTO tasks (task_text, complete) VALUES ($1, FALSE) RETURNING *',
            [text]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar tarefa' });
    }
});

// Endpoint para obter as tarefas
app.get('/api/task/', async (req, res) => {
    const query = 'SELECT * FROM tasks'

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
