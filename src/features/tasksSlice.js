import { createSlice } from "@reduxjs/toolkit";

//manages : Add, Delete, Complete-task, Mark-favourite, Mark-Urgent(on creation only)

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: {},
    // streakCount: 0,
  },
  reducers: {
    addTask: (state, action) => {
      const { id } = action.payload;
      state.tasks[id] = action.payload;
    },
    deleteTask: (state, action) => {
      const { [action.payload]: _, ...remainingTasks } = state.tasks;
      state.tasks = remainingTasks;
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.tasks[action.payload];
      if (task) {
        task.completed = !task.completed;
      }
      // state.streakCount = getStreakCount(state.tasks); // Update streak count
    },
    toggleImportance: (state, action) => {
      const task = state.tasks[action.payload];
      if (task) {
        task.isImportant = !task.isImportant;
      }
    },
    toggleUrgency: (state, action) => {
      const task = state.tasks[action.payload];
      if (task) {
        task.urgent = !task.urgent;
      }
    },
  },
});

// const getStreakCount = (tasks) => {
//   let streak = 0;
//   Object.values(tasks).forEach((task) => {
//     if (task.completed) streak++;
//     else return;
//   });
//   return streak;
// };

export const {
  addTask,
  deleteTask,
  toggleTaskCompletion,
  toggleImportance,
  toggleUrgency,
  // streakCount,
} = tasksSlice.actions;

export default tasksSlice.reducer;
