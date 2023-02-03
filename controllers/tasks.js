const { restart } = require("nodemon");
const Task = require("../models/tasks");

//Función para insertar tarea en MongoDB
async function createTask(req, res) {
    const task = new Task();
    const params = req.body; //Lo que enviamos por POST

    task.title = params.title; //campos del Json puesto en insomnia
    task.description = params.description; 

    try {
        //Insertar en MongoDB
        const taskStore = await task.save();

        if (!taskStore) {
            res.status(400).send({ msg: "Tarea no guardada correctamente"});
        } else {
            res.status(200).send({ task: taskStore});
        }

    } catch(error) {
        res.status(500).send(error)
    }



}

//Función para sacar todas las tareas
async function getTasks(req, res) {
    
    try {
        const tasks = await Task.find({ completed: false }).sort({ created_at: -1});

        if (!tasks) {
            res.status(400).send("Error al obtener tareas de Mongo");
        } else {
            res.status(200).send(tasks);
        }

    } catch(error) {
        res.status(500).send(error);
    }
}

//Función para sacar una tarea por id
async function getTask(req, res) {
    const idTask = req.params.id;

    try {
        const task = await Task.findById(idTask);

        if(!task) {
            res.status(400).send({ msg: "No se ha encontrado esa tarea"});
        } else {
            res.status(200).send(task);
        }
        
    } catch(error) {
        res.status(500).send(error);
    }
   
}

//Función para eliminar una tarea por id
async function deleteTask(req, res) {
    const idTask = req.params.id;

    try {
        //const task = await Task.deleteOne({ _id: idTask });
        const task = await Task.findByIdAndDelete(idTask);

        if(!task) {
            res.status(400).send({ msg: "No se ha encontrado esa tarea para borrar"});
        } else {
            res.status(200).send({ msg: "Tarea borrada",
                                    task: task });
        }
        
    } catch(error) {
        res.status(500).send(error);
    }
   
}

//Modificar una tarea
async function updateTask(req, res) {
    //Sacar el id de la url del endpoint
    const idTask = req.params.id;

    //Sacar los cambios de la tarea en el body de la request
    const bodyJson = req.body;

    try {
        const task = await Task.findByIdAndUpdate(idTask, bodyJson);

        if(!task) {
            res.status(400).send({ msg: "No se ha encontrado esa tarea para modificar"});
        } else {
            res.status(200).send({ msg: "Tarea modificada",
                                    task: task });
        }
        
    } catch(error) {
        res.status(500).send(error);
    }

}




module.exports = {
    createTask, getTasks, getTask, deleteTask, updateTask
}