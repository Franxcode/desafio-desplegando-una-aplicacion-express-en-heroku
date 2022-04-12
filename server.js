const express = require('express');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3000;

const { getUsers, insertUser, deleteUser } = require('./models/queries');

// Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

// Middlewares
app.use('/assets', express.static(__dirname + '/public/assets') );
app.use( express.json() );
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/user-create', (req, res) => {
    res.render('createUser');
});

app.get('/users', async (req, res) => {
    const users = await getUsers();
    res.json({users});
});

app.post('/users', async (req, res) => {
    const { username, email, password } = req.body;
    const response = await insertUser(username, email, password);
    if (response.severity) {
        res.status(409).json({response});
        return;
    }
    res.json({ response });
});

app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const response = await deleteUser(id);
    response > 0 ? res.send(`El usuario con ${id} fue eliminado con éxito.`) : res.send('No existe usuario registrado con ese id.');
});

app.get('*', (req, res) => {
    res.status(404).render('404');
});

app.listen(port, () => console.log(`Server initialized at port ${port}.`));