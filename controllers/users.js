const User = require("../models/users");
const bcryptjs = require("bcryptjs");
const jwt = require("../services/jwt");

//Función para insertar un usuario
async function register(req, res) {

    const user = new User();
    const { name, lastname, email, password } = req.body; //Lo que enviamos por POST

    try {
        if (!password) throw { msg: "Debes introducir una contraseña" };

        //Comprobar que el email esté ya registrado en la BBDD
        const foundEmail = await User.findOne({ email: email});
        if (foundEmail) throw { msg: "Email ya registrado"} ;
        
        const salt = await bcryptjs.genSalt(10);

        user.name = name; //campos del Json puesto en insomnia
        user.lastname = lastname;
        user.email = email;
        user.password = await bcryptjs.hashSync(password, salt);

        //Insertar en MongoDB
        const userStore = await user.save();        

        if (!userStore) {
            res.status(400).send({ msg: "Usuario no guardado correctamente, datos erróneos"});
        } else {
            res.status(200).send({ user: userStore});
        }

    } catch(error) {
        res.status(500).send(error)
    }
    
}

async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email});
        if (!user) throw { msg: "Email o contraseña incorrectos"} ;

        //Vuelve a generar el hash con el password recibido en el request. 
        //Si coincide con el que ya hay en BBDD (user.password) entonces ok
        const passwordSuccess = await bcryptjs.compare(password, user.password);

        if (!passwordSuccess) throw { msg: "Email o contraseña incorrectos"};

        res.status(200).send( { token: jwt.createToken(user, "12h") });
        
    } catch(error) {
        res.status(500).send(error)
    }


}



module.exports = {
    register,
    login,
}
