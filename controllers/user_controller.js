const User = require('../models/users');

// register a user
exports.signup = async (req, res) => {
	try {
		console.log(req.body);

		let user = await User.findOne({ email: req.body.email });

		if (user)
			return {
				error: 'Account already exists',
				statusCode: 409
			};

		// Save to postgres database

		User.create({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: req.body.password,
			guc_id: req.body.guc_id,
			age: req.body.age,
			gender: req.body.gender,
			address: req.body.address,
			rating: req.body.rating
		})
			.then((userData) => {
				return {
					message: 'sign up successful',
					userData,
					statusCode: 201
				};
			})
			.catch((err) => {
				return {
					message: 'error signing up',
					statusCode: 400
				};
			});
	} catch (error) {
		console.log(error);

		return { statusCode: 404 };
	}
};
