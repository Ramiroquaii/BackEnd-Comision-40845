const bcrypt = require('bcrypt');

const plainText = 'Ramiro1234';
const saltRounds = 5;

// bcrypt.hash(plainText, saltRounds, function(err, hash) {
//   // Store the hash in your database or use it as needed
//     console.log(hash);
// });


async function encrypt(plainText) {
    try {
        const hash = await bcrypt.hash(plainText, saltRounds);
        // Store the hash in your database or use it as needed
        //console.log(hash);
        return hash;
    } catch (err) {
        console.error(err);
    }
}



let a = encrypt(plainText);

console.log(a);
