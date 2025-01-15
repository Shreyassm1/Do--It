import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasksSlice";
import { persistStore, persistReducer } from "redux-persist"; //so that state remains even after page reloads
import storage from "redux-persist/lib/storage"; //local

const persistConfig = {
  key: "root",
  storage,
};

const persistedTasksReducer = persistReducer(persistConfig, tasksReducer);

const store = configureStore({
  reducer: {
    tasks: persistedTasksReducer,
  },
});

export const persistor = persistStore(store);

export default store;
