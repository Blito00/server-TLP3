const express = require('express');
const cors = require('cors')
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors())

const users = [
    { email: 'prueba@prueba.com', password: '123456', nombre: 'Cosme' },
    { email: 'prueba2@prueba.com', password: '123456', nombre: 'Fulanito' },
];

app.get('/', (req, res) => {
    res.json(users);
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({ error: false, data: user });
    } else {
        res.status(404).json({ error: 'Email o contraseña incorrectos' });
    }
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    const userExists = users.some(u => u.email === email);

    if (!name) {
        res.status(400).json({ error: 'Ingrese un nombre' });
    } else if (!email) {
        res.status(400).json({ error: 'Ingrese una dirección de email' });
    } else if (!password) {
        res.status(400).json({ error: 'Ingrese una contraseña' });
    } else if (userExists) {
        res.status(400).json({ error: 'El email ya existe' });
    } else {
        users.push({ email, password, nombre: name });
        res.status(201).json({ error: false, message: 'Usuario registrado exitosamente' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});