import React, { useState } from 'react';
import '../styles/todolist.css';

const ToDoList = () => {
    const [tasks, setTasks] = useState([
        { content: "przykład", done: false },
    ]);
    const [hideDoneTasks, setHideDoneTasks] = useState(false);
    const [newTaskContent, setNewTaskContent] = useState("");

    const addNewTask = (content) => {
        setTasks([...tasks, { content, done: false }]);
    };

    const removeTask = (index) => {
        setTasks(prev => prev.filter((_, taskIndex) => taskIndex !== index));
    };

    const toggleTaskDone = (index) => {
        setTasks(tasks.map((task, taskIndex) =>
            taskIndex === index ? { ...task, done: !task.done } : task
        ));
    };

    const toggleAllTasksDone = () => {
        setTasks(tasks.map(task => ({ ...task, done: true })));
    };

    const toggleHideDoneTasks = () => {
        setHideDoneTasks(!hideDoneTasks);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (!newTaskContent.trim()) return;
        addNewTask(newTaskContent.trim());
        setNewTaskContent("");
    };

    return (
        <main>
            <h1>Lista zadań</h1>
            <div className="newTask">
                <h2 className="newTask--headerText">Dodaj nowe zadanie</h2>
                <form className="newTask--form" onSubmit={handleFormSubmit}>
                    <input
                        className="newTask--input"
                        placeholder="Co jest do zrobienia?"
                        value={newTaskContent}
                        onChange={(e) => setNewTaskContent(e.target.value)}
                    />
                    <button className="newTask--button">Dodaj zadanie</button>
                </form>
            </div>
            <div className="taskList">
                <div className="taskList__header">
                    <h2 className="taskList__header--text">Lista zadań</h2>
                    {tasks.length > 0 && (
                        <div className="taskList__buttons">
                            <button
                                className="markAllButton"
                                onClick={toggleAllTasksDone}
                                disabled={tasks.every(({ done }) => done)}
                            >
                                Ukończ wszystkie
                            </button>
                            <button
                                className="hideAllDoneButton"
                                onClick={toggleHideDoneTasks}
                            >
                                {hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
                            </button>
                        </div>
                    )}
                </div>
                <ul className="taskList--ul">
                    {tasks
                        .filter(task => !hideDoneTasks || !task.done)
                        .map((task, index) => (
                            <li key={index} className={`taskList--li ${task.done && hideDoneTasks ? "taskList--hiddenItems" : ""}`}>
                                <button
                                    className="taskList--toggle"
                                    onClick={() => toggleTaskDone(index)}
                                >
                                    {task.done ? "✔" : ""}
                                </button>
                                <span className={`taskList--text ${task.done ? "taskList--textDone" : ""}`}>
                                    {task.content}
                                </span>
                                <button
                                    className="taskList--remove"
                                    onClick={() => removeTask(index)}
                                >
                                    🗑️
                                </button>
                            </li>
                        ))}
                </ul>
            </div>
        </main>
    );
};

export default ToDoList;
