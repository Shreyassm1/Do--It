import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasksSlice";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./TaskInput.css";

const TaskManager = () => {
  const [task, setTask] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(null);
  const [error, setError] = useState("");
  const [urgent, setUrgent] = useState(false);

  const dispatch = useDispatch();

  const handleAddTask = (e) => {
    e.preventDefault();

    //If date selected is older than today
    if (!date || date < Date.now()) {
      setError("Please select a valid due date for this task.");
      return;
    }

    if (task.trim()) {
      dispatch(
        addTask({
          id: Date.now(),
          text: task,
          date,
          completed: false,
          isImportant: false,
          urgent,
        })
      );
      setTask("");
      setDate(null);
      setUrgent(false);
      setError("");
    }
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // const handleRepeatTask = () => {}; Repeat task functionality TBD.

  const closeCalendar = () => {
    setShowCalendar(false);
  };

  const toggleUrgency = () => {
    setUrgent(!urgent);
  };

  return (
    <div className="main-input">
      <div className="task-manager-container">
        <form className="task-form" onSubmit={handleAddTask}>
          <div className="input-box">
            <input
              type="text"
              placeholder="Add Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className="submit-task-box">
            <div className="icon-box">
              <div className="due-date">
                <div className="due-date-icon" onClick={toggleCalendar}>
                  <FontAwesomeIcon icon={faCalendarAlt} size="lg" />
                </div>
              </div>
              {/* <div className="repeat-task">
                <div className="repeat-task-icon" onClick={handleRepeatTask}>
                  <FontAwesomeIcon icon={faRepeat} size="lg" />
                </div>
              </div> */}
              <div className="exclamation-icon">
                <div
                  className={`exclamation-icon-box ${urgent ? "urgent" : ""}`}
                  onClick={toggleUrgency}
                >
                  <FontAwesomeIcon icon={faExclamationCircle} size="lg" />
                </div>
              </div>
            </div>
            <button type="submit" className="add-task-btn">
              Add Task
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}
        </form>

        {showCalendar && (
          <div className="calendar-popup" onClick={closeCalendar}>
            <div
              className="calendar-container"
              onClick={(e) => e.stopPropagation()}
            >
              <Calendar onChange={setDate} value={date || new Date()} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
