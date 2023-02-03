//Importar librería para encriptar contraseñas
const bcryptjs = require('bcryptjs');

//Importar modelo
const User = require("../models/user");

//Importar jwt
const jwt = require("../services/jwt");

//Registrar usuarios
async function register(req,res) {
    const { email, password } = req.body;
    const user = new User(req.body); 

    try {
        if (!email) throw { msg: "Email obligatorio" };
        if (!password) throw { msg: "Password obligatorio" };

        //Revisamos si el email ya ha sido registrado
        const foundEmail = await User.findOne({ email: email });
        if (foundEmail) {
            throw { msg: "Email ya registrado" };
        } else {
            const salt = bcryptjs.genSaltSync(10);
            user.password = await bcryptjs.hash(password, salt);

            //Insertar en MongoAtlas
            user.save();

            res.status(200).send(user);
        }

    } catch (error) {
        res.status(500).send(error);
    }
};

async function login(req, res) {
    const { email, password } = req.body;

    try {
        //Comprobar que existe el usuarios
        const user = await User.findOne({ email });
        if (!user) throw { msg: "Error en el email o contraseña" };

        const passwordSuccess = await bcryptjs.compare(password, user.password);
        if (!passwordSuccess) throw { msg: "Error en el email o contraseña" };
        else {
            res.status(200).send({ token: jwt.createToken(user, "12h") });
        }

    } catch (error) {
        res.status(500).send(error);
    }

};

module.exports = {
    register,
    login
}