import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleImportance, toggleTaskCompletion } from "../features/tasksSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import "./TaskListComplete.css";

const TaskListComplete = () => {
  //This list only needs to display completed task, hence we filter based on isCompleted field
  const tasks = useSelector((state) =>
    Object.values(state.tasks.tasks).filter((task) => task.completed)
  );

  const dispatch = useDispatch();

  const handleImportance = (taskId) => {
    dispatch(toggleImportance(taskId));
  };

  const handleUncheck = (taskId) => {
    dispatch(toggleTaskCompletion(taskId));
  }; //return back to incomplete list when unchecked

  return (
    <div className="main-list">
      <div className="completed-task-list-container">
        <div className="header-text">Tasks Completed</div>
        {tasks.length === 0 ? (
          <p>Get to work!!</p>
        ) : (
          <div className="completed-task-list">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`complete-task-item ${
                  task.urgent ? "urgent-task" : ""
                }`}
              >
                <div className="task-complete-checkbox">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleUncheck(task.id)}
                  />
                </div>
                <div className="completed-task-text">{task.text}</div>
                <div className="task-important">
                  <FontAwesomeIcon
                    icon={task.isImportant ? faStarSolid : faStarRegular}
                    className={
                      task.isImportant ? "star-filled" : "star-outline"
                    }
                    onClick={() => handleImportance(task.id)}
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

export default TaskListComplete;
