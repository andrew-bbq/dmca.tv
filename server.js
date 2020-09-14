if (process.env.NODE_ENV !== 'production') {
    const result = require('dotenv').config();
    
    if (result.error) {
        throw result.error;
    }
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

// define schema
var Schema = mongoose.Schema;

var StreamerSchema = new Schema({
    TwitchId: String,
    SpotifyId: String
});

// compile model from schema
var StreamerModel = mongoose.model("Streamer", StreamerSchema);

// test create instance of model
var StreamInstance = new StreamerModel({TwitchId: "abcd", SpotifyId: "1234"});
StreamInstance.save(function(err) {
    if (err) return handleError(err);
    //saved
});

console.log(StreamInstance.TwitchId);

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000);