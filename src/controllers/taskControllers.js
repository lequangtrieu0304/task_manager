const pool = require('../../config/database');

const getAllTasks = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) return res.send(err);

        console.log('Database connected successfully');
        connection.query('SELECT * FROM tasks', (err, tasks) => {
            if(err) return res.send(err)
            res.json(tasks);
            // console.log(tasks);
        });
    });
}

const getTaskById = (req, res) => {
    const taskId = req.params.id;
    
    pool.getConnection((err, connection) => {
        if(err) return res.send(err);

        console.log('Database connected successfully');
        connection.query('SELECT * FROM tasks WHERE task_id=?', [taskId], (err, result) => {
            if(err) return res.send(err);
             res.json(result);
        })
    })
}

const findTask = (req, res) => {
    const {taskName} = req.body;
    if(!taskName) return res.json({message: 'name is require'});

    pool.getConnection((err, connection) => {
        if(err) return res.send(err);

        console.log('Database connected successfully');

        connection.query('SELECT * FROM tasks WHERE task_name LIKE ?', ['%' + taskName + '%'], (err, result) => {
            if(err) return res.send(err);
            
            res.json(result);
            // console.log(result);
        });
    });
}

const addTask = (req, res) => {
    const {name} = req.body;
    if(!name) return res.json({message: 'name is require!'})

    pool.getConnection((err, connection) => {
        if(err) return res.send(err);

        console.log('Database connected successfully');

        connection.query('INSERT INTO tasks SET task_name=?', [name], (err, result) => {
            if(err) return res.send(err);
            res.json(result)
        });
    })
}

const editTask = (req, res) => {
    const {name, completed} = req.body;
    const taskId = req.params.id
    // if(!name) return res.json({message: 'name is require!'});

    pool.getConnection((err, connection) => {
        if(err) return res.send(err);

        console.log('Database connected successfully');
        connection.query('UPDATE tasks SET task_name =?, task_completed=? WHERE task_id=?', [name, completed, taskId], (err, result) => {
            if(err) return res.send(err);

            res.json(result);
        })
    })
}

const deleteTask = (req, res) => {
    const taskId = req.params.id;

    pool.getConnection((err, connection) => {
        if(err) res.send(err);
        console.log('Database connected successfully');

        connection.query('DELETE FROM tasks WHERE task_id=?', [taskId], (err, result) => {
            if(err) return res.send(err)
            res.json(result);
        })
    })
}

module.exports = {
    getAllTasks,
    addTask,
    editTask,
    getTaskById,
    findTask,
    deleteTask
}