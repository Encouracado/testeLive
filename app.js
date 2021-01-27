const express = require('express');
const ejs = require('ejs-mate');
const bodyParser = require('body-parser');
const path = require('path');
const jsonDB = require('./config.json');
const formControllers = require('./controllers/formController');


const app = express();
app.engine('ejs', ejs);

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.urlencoded({extend:true}))

const tp = require('tedious-promises')
const dbConfig = (jsonDB)
const Request = require('tedious').Request  
const TYPES = require('tedious').TYPES;
tp.setConnectionConfig(dbConfig);     
 
var _ = require('lodash');
tp.setDefaultColumnRenamer(_.camelCase);
          

 ///// Routes   



app.get('/', function(req, res){
    const textoFinal = ""
    res.render('form.ejs',{textoFinal})
})

app.post('/cadastro',formControllers.formAPI);


app.listen(3000, function(req, res){
    console.log(" Server online at the port 3000");
})


