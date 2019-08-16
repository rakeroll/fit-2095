let express = require('express');
let router = express.Router();
let db = require('./db');

router.get('/', function(req, res){
   res.send('An implementation of a database, using Express and Node.js.');
});

router.get('/newItem/:name/:quantity/:price', (req, res) => {
    let { params } = req;
    error = db.create(params);
    if (!error) {
        res.send('Added item to database!');
    } else {
        res.send('Error when attempting to add a record into the database.');
    }
});

router.get('/listAllItems', (_, res) => {
    let result = 'DB Records <br>';
    db.read().forEach(record => result = result + JSON.stringify(record) + '<br>');
    res.send(result);
});

router.get('/deleteItem/:id', (req, res) => {
    let { params } = req;
    error = db.deleteItem(params.id);
    if (!error) {
        res.send('Successfully deleted item from the database!');
    } else {
        res.send('Error when attempting to remove a record from the database.');
    }
});

router.get('/totalValue', (_, res) => {
    res.send('Total warehouse value of all items: ' + db.totalValue().toString());
});

//export this router 
module.exports = router;