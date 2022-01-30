const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 3002;


app.use(cors());
app.use(bodyParser.urlencoded({limit: '200mb', extended: true, parameterLimit: 1000000}));
app.use(bodyParser.json({limit: '200mb'}));
const http = require('http');

const httpsServer = http.createServer(app);

// loggg all incoming request
app.use((req, res, next)=>{
	// console.log("appbody=====>>",req)
	next();
});


var MONGODB_URL =  'mongodb://localhost/blogs'
mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {
		// if (process.env.NODE_ENV !== "test") {
		console.log('Connected to %s', MONGODB_URL);
		console.log('App is running ... \n');
		console.log('Press CTRL + C to stop the process. \n');
		// }
	})
	.catch((err) => {
		console.error('App starting error:', err.message);
		process.exit(1);
	});
const db = mongoose.connection;

app.use(express.static(path.join(__dirname, '/dist')));
// loggg all incoming request

require('./router')(app);

const jsn = {'Status': 'Your Server Is Started Now'};
app.get('/*', (req, res) => {
	res.send(jsn);
});

httpsServer.listen(port, function() {
	console.log('Server started Port', port);
});
