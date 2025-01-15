import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTask,
  toggleImportance, //by importance here we mean to refer to the "favourite - star" feature
  toggleTaskCompletion,
  toggleUrgency,
} from "../features/tasksSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faTrash,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons"; //improve fa usage
import "./TaskListIncomplete.css";
import { format } from "date-fns";

const TaskListIncomplete = () => {
  const tasks = useSelector((state) =>
    Object.values(state.tasks.tasks).filter(
      (task) => task.text && task.text.trim() !== "" && !task.completed
    )
  );

  const dispatch = useDispatch();

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleImportance = (taskId) => {
    dispatch(toggleImportance(taskId));
  };

  const handleComplete = (taskId) => {
    dispatch(toggleTaskCompletion(taskId));
  };

  const handleUrgency = (taskId) => {
    dispatch(toggleUrgency(taskId));
  };

  const formatDate = (date) => {
    return date ? format(new Date(date), "MMM dd, yyyy") : "No due date";
  }; //use a prettier version of date

  return (
    <div className="main-list">
      <div className="incomplete-task-list-container">
        <div className="header-text">Tasks Left</div>
        {tasks.length === 0 ? (
          <p>Desolated and empty.</p>
        ) : (
          <div className="incomplete-task-list">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`incomplete-task-item ${
                  task.urgent ? "urgent-task" : ""
                }`}
              >
                <div className="task-complete-checkbox">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleComplete(task.id)}
                  />
                </div>
                <div className="task-text">{task.text}</div>
                <div className="task-due-date">
                  Due: {formatDate(task.date)}
                </div>
                <div className="task-important">
                  <FontAwesomeIcon
                    icon={task.isImportant ? faStarSolid : faStarRegular}
                    className={
                      task.isImportant ? "star-filled" : "star-outline"
                    }
                    onClick={() => handleImportance(task.id)}
                  />
                </div>
                <div className="task-urgency">
                  {task.urgent && (
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      className="urgent-icon"
                      onClick={() => handleUrgency(task.id)}
                    />
                  )}
                </div>
                <div className="task-delete">
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="delete-icon"
                    onClick={() => handleDelete(task.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskListIncomplete;
