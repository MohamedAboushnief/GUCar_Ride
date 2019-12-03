const bcrypt = require('bcryptjs');
async function checkEncryptedEqualVal(nonEncryptedValue, encryptedValue) {
	return bcrypt.compare(nonEncryptedValue, encryptedValue);
}
function EncryptPassword(password) {
	return new Promise(function(resolve, reject) {
		bcrypt.hash(password, 10, function(_err, hash) {
			// Store hash in database
			resolve(hash);
		});
	});
}
module.exports = {
	checkEncryptedEqualVal,
	EncryptPassword
};
