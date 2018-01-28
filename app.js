const makesRouter = require('./routes');
const { Page, User } = require('./models');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment 
// instance, which we'll want to use to add Markdown support later. 
let env = nunjucks.configure('views', { noCache: true });
// have res.renderwork with html files 
app.set('view engine', 'html'); // when res.render works with html files, have it use nunjucks to do so app.engine('html', nunjucks.render);
app.engine('html', nunjucks.render);



app.use(morgan('dev')); // what is dev????????????????????????
app.use(makesRouter);


User.sync({ force: true })
    .then(() => {
        Page.sync({ force: true });
    })
    .then(() => {
        app.listen(3001, () => {
            console.log('Server is listening on port 3001');
        });
    })
    .catch(console.error);


app.use(express.static(path.join(__dirname, 'public'))); // What is __dirname???????????