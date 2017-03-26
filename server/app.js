const express		= require('express');
const app			= express();
const bodyParser	= require('body-parser');
const morgan		= require('morgan');
const mongoose		= require('mongoose');
const apiRoutes		= express.Router();

const jwt			= require('jsonwebtoken');
const config		= require('./config');
const User			= require('./models/user');

var port = process.env.PORT || 8080; 
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

apiRoutes.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
   	res.header('Access-Control-Allow-Credentials', true);
 	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Content-length, Accept, x-access-token');
 	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	next();
});

app.get('/', (req, res) => {
	res.send('Server Running');
});

apiRoutes.post('/authenticate', (req, res) => {
	const { name, password } = req.body;
	User.findOne({ 
		name,
		password 
	}, (err, user) => {
		if (err) throw err;

		if (!user) {
			res.json({
				success: false,
				message: 'Authentication failed. User not found.'
			});
		} else if (user) {
				if (user.password !== password) {
					res.json({
						success: false, 
						message: 'Authentication failed. Wrong password.'
					});
				} else {
					const token = jwt.sign(user, app.get('superSecret'));

					res.json({
						success: true,
						message: 'Enjoy your token!',
						token
					});
				}
		}
	});
});


apiRoutes.use((req, res, next) => {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (req.path === '/authenticate' || req.path === '/users/create') {
		next();
	} else if (token) {
		jwt.verify(token, app.get('superSecret'), (err, decoded) => {
			if (err) {
				return res.json({success: false, message: 'Failed to authenticate token.'});
			} else {
				req.decoded = decoded;
				next();
			}

		});
	} else {
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});
	}
});


apiRoutes.post('/users/create', (req, res) => {
	const { name, password } = req.body;

	if (name === "" || password === "") {
		res.json({success: false, message: 'Please provide a username and password'});
	} else {
		User.findOne({ 
			name,
			password 
		}, (err, user) => {
			if (err) throw err;

			if (user) {
				res.json({
					success: false,
					message: 'User already exists in database.'
				});
			} else {
				const user = new User({ name, password });
				const token = jwt.sign(user, app.get('superSecret'));
				user.save((err, doc) => {
					if (err) throw err;

					res.json({ success: true, user: doc, token });
				});
			}
		}); 
	}
});

apiRoutes.get('/', (req, res) => {
	res.json({message: 'Welcome to the coolest API on earth!'});
});

app.use('/api', apiRoutes);

app.listen(9999, () => {
	console.log('Listening on port 9999')
});

