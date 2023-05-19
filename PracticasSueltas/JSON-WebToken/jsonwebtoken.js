const jwt = require('jsonwebtoken');

// Definir la clave secreta para firmar y verificar los JWT
const secretKey = 'mi_clave_secreta';
const tokenExpiration = '2m';

// Objeto de ejemplo para codificar en el JWT
const user = {
    id: 1,
    username: 'ejemplo',
    role: 'admin'
};

// Generar el JWT
//const token = jwt.sign(user, secretKey); //Sin expitacion.

const token = jwt.sign(user, secretKey, { expiresIn: tokenExpiration }); // con expiracion.

console.log('Token generado:', token);

// Verificar el JWT
jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
        console.log('Error al verificar el token:', err.message);
    } else {
        console.log('Token verificado:', decoded);
    }
});