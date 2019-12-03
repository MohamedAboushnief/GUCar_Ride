const bcryptjs = require('bcryptjs');
async function checkEncryptedEqualVal(nonEncryptedValue, encryptedValue) {
	return bcryptjs.compare(nonEncryptedValue, encryptedValue);
}
function EncryptPassword(password) {
	return new Promise(function(resolve, reject) {
		bcryptjs.hash(password, 10, function(_err, hash) {
			// Store hash in database
			resolve(hash);
		});
	});
}
module.exports = {
	checkEncryptedEqualVal,
	EncryptPassword
};
