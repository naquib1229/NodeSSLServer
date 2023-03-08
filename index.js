const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/geolocationdb')
.then(() => console.log('connected to db'));

const geolocationSchema = new mongoose.Schema({
    date: Date,
    image: String
});

const Geolocation = mongoose.model('Geolocation', geolocationSchema);


const app = express();

app.use(express.static('public'));
app.use(express.json({limit: '50mb'}));



// app.use('/', (req, res, next) => {
//     res.send('Hello from SSL Server')
// });
app.post('/', (req, res) => {
    console.log('latitude: '+ req.body.lat +'longitude: ' + req.body.long);
});

app.get('/api', (req, res) => {
    Geolocation.find({}, (err, data) => {
        res.json(data);
    });
});


app.post('/api', async (req, res) => {
    const data = req.body;
    const timeStamp = Date.now();
    data.timeStamp = timeStamp;
    let geolocation = new Geolocation({date: data.timeStamp, image: data.image});
    geolocation = await geolocation.save();
    res.json(data);
});



const sslServer = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
    },
    app
)

sslServer.listen(3443, () => console.log('Secure server on port 3443'));