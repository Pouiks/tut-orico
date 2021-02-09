require('dotenv').config();

const express = require('express');
const router = require('./router');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
// const userMW = require('./middleware/userMW');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const app = express();


app.use(bodyParser.urlencoded({
	extended: true,
}));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
// app.use(multer({dest:'./public/image'}).any());
const PORT = process.env.PORT || 8080;
app.use(cors('*'));
// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
// 	res.header('Access-Control-Allow-Headers', ('Access-Control-Allow-Headers', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-access-token', '*'));;
// 	res.header('Access-Control-Allow-Credentials', true);
// 	res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
// 	next();
	// app.options('*', (req, res) => {
	// 	// XHR methods autorisées :
	// 	res.send();
	// });
// });
// app.use(session({
// 	secret: "tutoricoapotheose",
// 	cookie: { 
// 		secure: false, 
// 		maxAge: 1000 * 60 * 60 * 24,
// 		httpOnly: false,
// 	}, 
// 	saveUninitialized: false, 
// 	resave: false
// }));
// app.use(userMW);
app.use(router);

app.listen(PORT, () => {
console.log(`Server listening on PORT... ${PORT}`);
});