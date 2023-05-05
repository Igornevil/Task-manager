import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

const Task = ({
    id,
    description,
    taskImportant,
    taskUrgent,
    onImportant,
    onUrgent,
    onDelete,
    onRestore,
    onComplete,
    onNotComplete,
    createAt
}) => {
    const [isDelete, setIsDelete] = useState(false);
    const [isComplete, setisComplete] = useState(false);

    const handleDelete = () => {
        onDelete(id);
        setIsDelete(true);
    };

    const handleRestore = () => {
        onRestore(id);
        setIsDelete(false);
    };

    const handleComplete = () => {
        onComplete(id);
        setisComplete(true);
    };

    const handleNotComplete = () => {
        onNotComplete(id);
        setisComplete(false);
    };

    if (isDelete) {
        return (
            <>
                <div className="task">
                    <div className="task-content">
                        <div className="task-header"></div>
                        <div className="task-body">
                            {description + " id: " + id}
                            <div className="btn-done">
                                <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={handleRestore}
                                >
                                    Восстановить задачу
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (isComplete) {
        return (
            <>
                <div className="task">
                    <div className="task-content">
                        <div className="task-header"></div>
                        <div className="task-body">
                            {description + " id: " + id}
                            <div className="btn-done">
                                Задача выполнена.
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleNotComplete}
                                >
                                    Отменить?
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="task">
                <div className="task-content">
                    <div className="task-header">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                onChange={onImportant}
                                defaultChecked={taskImportant}
                                name="taskFavorite"
                                id={id}
                            />
                            <label htmlFor="taskFavorite">Важное</label>{" "}
                            <input
                                type="checkbox"
                                onChange={onUrgent}
                                defaultChecked={taskUrgent}
                                name="taskFavorite"
                                id={id}
                            />
                            <label htmlFor="taskFavorite">Срочное</label>
                        </div>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={handleDelete}
                        ></button>
                    </div>
                    <div className="task-body">
                        {description + " id: " + id}
                        <div className="btn-done">
                            <input
                                type="checkbox"
                                name="taskDone"
                                id={id}
                                onChange={handleComplete}
                            />
                        </div>
                    </div>
                    <div className="task-footer">Создано: {createAt}</div>
                </div>
            </div>
        </>
    );
};

Task.propTypes = {
    id: PropTypes.number,
    description: PropTypes.string,
    taskImportnant: PropTypes.bool,
    taskUrgent: PropTypes.bool,
    onImportant: PropTypes.func,
    onUrgent: PropTypes.func,
    onDelete: PropTypes.func,
    onComplete: PropTypes.func,
    onNotComplete: PropTypes.func,
    onRestore: PropTypes.func,
    createAt: PropTypes.string
};

export default Task;
