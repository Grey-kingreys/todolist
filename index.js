const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,

}))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// const tasks = [
//     {
//         titre: "Apprendre Node.js",
//         description: "Comprendre les bases de Node.js et comment l'utiliser pour le développement backend.",
//         status: false
//     },
//     {
//         titre: "Créer une API REST",
//         description: "Utiliser Express pour créer une API RESTful simple.",
//         status: true  
//     }
// ];

app.get('/tasks/:id/supprimer', (req, res) => {
    if(req.session.tasks[req.params.id]) {
        req.session.tasks.splice(req.params.id, 1);
    }
    res.redirect('/');

});

app.get('/tasks/:id/status', (req, res) => {
    if(req.session.tasks[req.params.id]) {
        req.session.tasks[req.params.id].status = true;
    }
    res.redirect('/');
    
});

app.post('/tasks', (req, res) => {
    if(req.body.titre && req.body.description) {
        req.session.tasks.push({
            titre: req.body.titre,
            description: req.body.description,
            status: false
        });
    }
    res.redirect('/');
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    if(!req.session.tasks) {
        req.session.tasks = [];
    }
    res.render('todolist', { tasks: req.session.tasks });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});