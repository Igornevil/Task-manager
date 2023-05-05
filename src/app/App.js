import React from "react";
import { useState, useEffect } from "react";
import Task from "./components/task";
import InputTask from "./components/inputTask";
import tasksService from "./services/tasks.service";

function App() {
    const [tasks, setTasks] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalTask, setTotalTask] = useState("");

    useEffect(() => {
        // const temp = async () => {
        const temp = async () => {
            try {
                const data = await tasksService.fetchAll(currentPage);
                setTasks(data.data);
                setTotalTask(data.total);
            } catch (error) {
                console.log("error", error);
            }
        };
        temp();
    }, []);

    console.log("tasks: ", tasks);

    function handleImportant(target) {
        console.log(target.target.id);
        const item = tasks.find((el) => el.id === Number(target.target.id));
        console.log(Date.parse(item.created_at));

        if (item) {
            item.important = !item.important;

            if (item.important) {
                item.priority += 2;
                tasksService.important(Number(target.target.id));
            } else {
                item.priority -= 2;

                tasksService.notImportant(Number(target.target.id));
            }
        }

        setTasks((prevState) => {
            const mass = prevState.filter(
                (el) => el.id !== Number(target.target.id)
            );
            mass.push(item);
            mass.sort(
                (a, b) => Date.parse(a.created_at) - Date.parse(b.created_at)
            );
            mass.sort((a, b) => b.priority - a.priority);

            return mass;
        });
    }
    function handleUrgent(target) {
        console.log(target.target.id);
        const item = tasks.find((el) => el.id === Number(target.target.id));

        if (item) {
            item.urgent = !item.urgent;

            if (item.urgent) {
                item.priority += 1;
                tasksService.urgent(Number(target.target.id));
            } else {
                item.priority -= 1;

                tasksService.notUrgent(Number(target.target.id));
            }
        }
        setTasks((prevState) => {
            const mass = prevState.filter(
                (el) => el.id !== Number(target.target.id)
            );
            mass.push(item);
            mass.sort(
                (a, b) => Date.parse(a.created_at) - Date.parse(b.created_at)
            );
            mass.sort((a, b) => b.priority - a.priority);

            return mass;
        });
    }
    function handleDelete(id) {
        tasksService.deleteTask(id);
    }
    function handleRestore(id) {
        tasksService.restoreTask(id);
    }
    function handleComplete(id) {
        tasksService.completeTask(id);
    }
    function handleNotComplete(id) {
        tasksService.notCompleteTask(id);
    }
    async function handleSendTask(payload) {
        const temp = await tasksService.sendTask(payload);
        console.log(temp);

        if (temp) {
            setTasks((prevState) => {
                const mass = [...prevState];
                mass.push(temp);
                mass.sort(
                    (a, b) =>
                        Date.parse(a.created_at) - Date.parse(b.created_at)
                );
                mass.sort((a, b) => b.priority - a.priority);

                return mass;
            });
        }
    }
    async function handleGetTask() {
        console.log(currentPage);

        try {
            setCurrentPage((prevState) => prevState + 1);

            const data = await tasksService.fetchAll(currentPage + 1);
            if (data) {
                setTasks((prevState) => {
                    const temp = [...prevState, ...data.data]
                        .sort(
                            (a, b) =>
                                Date.parse(a.created_at) -
                                Date.parse(b.created_at)
                        )
                        .sort((a, b) => b.priority - a.priority);
                    return temp;
                });
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    if (!tasks) {
        return (
            <>
                <div className="App">
                    <div className="container">
                        <h1>Task manager</h1>
                        <p>Loading...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="App">
                <div className="container">
                    <h1>Task manager</h1>
                    <InputTask onSendTask={handleSendTask} />
                    {tasks?.map((el) => (
                        <Task
                            key={el.id}
                            id={el.id}
                            description={el.description}
                            taskImportant={el.important}
                            taskUrgent={el.urgent}
                            createAt={el.created_at}
                            onImportant={handleImportant}
                            onUrgent={handleUrgent}
                            onDelete={handleDelete}
                            onRestore={handleRestore}
                            onComplete={handleComplete}
                            onNotComplete={handleNotComplete}
                        />
                    ))}
                    {tasks.length < totalTask && (
                        <div className="footer">
                            <button
                                type="button"
                                className="btn btn-info btn-download"
                                onClick={handleGetTask}
                            >
                                Загрузить еще
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default App;
