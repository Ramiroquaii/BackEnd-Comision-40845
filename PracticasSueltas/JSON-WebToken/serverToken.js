const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = 'mi_clave_secreta';
const tokenExpiration = '1m'; // '1h' hora, '7d' días, '30m' minutos

// Ruta de inicio de sesión para generar el token
app.post('/login', (req, res) => {
    // Validar las credenciales del usuario y obtener los datos del usuario
    const user = {
        id: 1,
        username: 'ejemplo',
        role: 'admin'
    };

    // Generar el token y enviarlo en la respuesta
    const token = jwt.sign(user, secretKey, { expiresIn: tokenExpiration }); //con expiracion.
    //const token = jwt.sign(user, secretKey);
    res.json({ token });
});

// Ruta protegida que requiere autenticación
app.get('/protegido', (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'No se proporcionó un token' });
    }

    // Verificar el token y procesar la solicitud
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ error: 'Token expirado' });
            } else {
                return res.status(403).json({ error: 'Token inválido' });
            }
        }

        // El token es válido, puedes realizar acciones según los datos del usuario en "decoded"
        res.json({ mensaje: 'Ruta protegida alcanzada', usuario: decoded });
    });
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
