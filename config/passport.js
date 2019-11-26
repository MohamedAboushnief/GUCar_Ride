const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/users');
const tokenKey = require('./keys_development').secretOrKey;

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = tokenKey;

module.exports = (passport) => {
	passport.use(
		new JwtStrategy(opts, async (jwt_payload, done) => {
			console.log(jwt_payload);
			const currentUser = await User.findByPk(jwt_payload.user_id);
			if (currentUser) return done(null, currentUser);
			return done(null, false);
		})
	);
};
