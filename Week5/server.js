let express = require('express');
let bodyParser = require('body-parser');
let app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
let urlencodedParser = bodyParser.urlencoded({ extended: false});

app.use(express.static('css'));
app.use(express.static('images'));
app.use(express.static('views'));

// List of tasks created so far
let tasks = [];

app.get('/', urlencodedParser, (_, res) => {
    res.render('index.html');
});

app.get('/newTask', (_, res) => {
    res.render('newTask.html');
});

app.post('/newTask', urlencodedParser, (req, res) => {
    let { taskname, taskdue, taskdesc } = req.body;
    tasks.push({
        taskname,
        taskdue,
        taskdesc
    });
    res.send('Task created! <a href="/">Home</a>');
});

app.get('/listTasks', urlencodedParser, (_, res) => {
    res.render('listTasks.html', { tasks });
});

app.listen(8080);