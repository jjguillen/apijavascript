const moment = require("moment");
const jwt = require("../services/jwt");

const SECRET_KEY = "askf9345lskjfnvoiijewqpñofjlssnmfñña$%aM";

function ensureAuth(req, res, next) {
    //Obtener la cabecera de una petición
    //Donde mandar el token

    if (!req.headers.authorization) {
        return res
                .status(403)
                .send({ msg: "Token no enviado en la cabecera" });
    } else {
        const token = req.headers.authorization.replace(/['"]+/g, "");

        try {
            //Comprobamos que el token es valido
            const payload = jwt.decodeToken(token, SECRET_KEY);
            //Comprobar la fecha de expiración del token
            if (payload.exp <= moment().unix()) {
                return res.status(400).send({msg: "Token expirado"});
            }  

            req.user = payload;
            next();

        } catch (error) {
            return res.status(400).send({msg: "Token invalido"});

        }
    }
}

module.exports = {
    ensureAuth,
}