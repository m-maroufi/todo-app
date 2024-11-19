import { useEffect, useContext, createContext, useState } from "react";
import { useAuth } from "./useAuth";
import { getAllTasks } from "../API/api";

const taskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [changeTask, setChangeTask] = useState(false);
  const [isPendingTask, setIsPendingTask] = useState(false);
  const { user } = useAuth();
  const fetchTasks = async () => {
    setIsPendingTask(true);
    const data = await getAllTasks(user.user.id);
    if (data) {
      setTasks(data);
    } else {
      setTasks([]);
    }
    setIsPendingTask(false);
  };
  useEffect(() => {
    if (user.isLoggedIn) {
      fetchTasks();
    }
  }, [user]);
  useEffect(() => {
    const fetcher = async () => {
      if (changeTask) {
        fetchTasks();
      }
    };
    fetcher();
    setChangeTask(false);
  }, [changeTask]);

  return (
    <taskContext.Provider
      value={{
        tasks,
        setTasks,
        isPendingTask,
        setIsPendingTask,
        setChangeTask,
      }}
    >
      {children}
    </taskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(taskContext);
};
