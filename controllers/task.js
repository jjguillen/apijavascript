const Task = require("../models/task");

//Crear tarea a partir de json
async function createTask( req, res) {
    const task = new Task();
    const params = req.body;
    task.title = params.title;
    task.description = params.description;

    try {
        //Hay que esperar a que guarde para seguir
        const taskStore = await task.save();

        if (!taskStore)
            res.status(400).send({ msg: "No se ha guardado la tarea" });
        else
            res.status(200).send({ task: taskStore });
    } catch (error) {
        res.status(500).send(error);
    }
    
}

//Obtener todas las tareas
async function getTasks( req, res) {
    try {
        const tasks = await Task.find({ completed: false }).sort({ created_at: -1 });

        if(!tasks)
            res.status(400).send({ msg: "Error al obtener las tareas" });
        else
            res.status(200).send(tasks);

    } catch (error) {
        res.status(500).send(error);
    }
}

//Obtener tarea por id
async function getTask( req, res) {
    const idTask = req.params.id;

    try {
        const task = await Task.findById(idTask);

        if(!task)
            res.status(400).send({ msg: "Error al obtener la tarea" });
        else
            res.status(200).send(task);

    } catch (error) {
        res.status(500).send(error);
    }
}  

//Actualizar tarea por id
async function updateTask( req, res) {
    const idTask = req.params.id;
    const params = req.body;

    try {
        const task = await Task.findByIdAndUpdate(idTask, params);

        if(!task)
            res.status(400).send({ msg: "Error al actualizar la tarea" });
        else
            res.status(200).send({ msg: "Actualización correcta" });

    } catch (error) {
        res.status(500).send(error);
    }
}  

//Eliminar tarea por id
async function deleteTask( req, res) {
    const idTask = req.params.id;

    try {
        const task = await Task.findByIdAndDelete(idTask);
        if(!task)
            res.status(400).send({ msg: "Error al eliminar la tarea" });
        else
            res.status(200).send({ msg: "Eliminación correcta" });

    } catch (error) {
        res.status(500).send(error);
    }
} 

module.exports = {
    createTask, getTasks, getTask, updateTask, deleteTask
}