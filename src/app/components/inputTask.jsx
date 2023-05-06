import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

const InputTask = ({ onSendTask }) => {
    const [text, setText] = useState("");

    const handleChangeText = (target) => {
        setText(target.target.value);
    };
    const handleSend = () => {
        onSendTask(text);
        setText("");
    };

    return (
        <>
            <div className="task">
                <div className="task-content">
                    <div className="task-header"></div>
                    <div className="task-body-enter">
                        <p>Введите текст задачи: </p>
                        <textarea
                            name="text"
                            rows="4"
                            value={text}
                            onChange={handleChangeText}
                        ></textarea>
                    </div>
                    <div className="task-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleSend}
                        >
                            Добавить
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

InputTask.propTypes = {
    onSendTask: PropTypes.func
};

export default InputTask;
