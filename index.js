const mongoose = require('mongoose');
const app = require("./app");
const port = process.env.PORT || 3000;
const urlMongoAtlas = "mongodb+srv://admin:p7Cx4JSEe3WZeB4@cluster0.qmwhh.mongodb.net/test";

mongoose.connect(urlMongoAtlas, 
    { useNewUrlParser: true, 
      useunifiedtopology: true }, 
    (err, res) => {
    try {
        if (err) 
            throw err;
        else {
            console.log("Conectado correctamente a Mongo Atlas");

            //Abrimos el servidor Express si se ha podido conectar a Mongo
            app.listen(port, () => {
                console.log("Servidor funcionando ok en "+port);
            });
        }
    } catch (err) {
        console.log(err);
    }
});

