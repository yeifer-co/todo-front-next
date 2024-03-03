"use client";

import React, { createContext, useState, useContext } from "react";
import themes from "./themes";
import axios from "axios";
import toast from "react-hot-toast";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {

    const [selectedTheme, setSelectedTheme] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);

    const [selectedTask, setSelectedTask] = useState(null);
    const [tasks, setTasks] = useState([]);

    const theme = themes[selectedTheme];

    const openModal = () => {
        setModal(true);
    };
    
    const closeModal = () => {
        setModal(false);
        setSelectedTask(null);
    };

    const allTasks = async () => {
        setIsLoading(true);

        try {
            const res = await axios.get("/api/task");

            const sorted = res.data.data.sort((a, b) => {
                return (
                  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
            });
            
            setTasks(sorted);
            setIsLoading(false);
        } catch (error) {
            console.log(error || "Something went wrong");
        }
    };

    const deleteTask = async (id) => {
        try {
            const res = await axios.delete(`/api/task/${id}`);
            if (res.data.success) {
                toast.success(res.data.message);
            }
        
            allTasks();
        } catch (error) {
            console.log(error);
            toast.error(error || "Something went wrong");
        }
    };

    const getTask = async (id) => {
        return tasks.find((task) => task.id === id);
    }

    const editTask = async (id) => {
        setSelectedTask(await getTask(id));
        openModal();
    }

    const updateTask = async (task) => {
        try {
            // body all task data except id
            const { id, ...body } = task;

            const res = await axios.put(`/api/task/${id}`, body);

            if (res.data.success) {
                toast.success(res.data.message);
            }
        
            allTasks();
        } catch (error) {
            console.log(error);
            toast.error(error || "Something went wrong");
        }
    };

    const completedTasks = tasks.filter((task) => task.isComplete === true);
    const incompleteTasks = tasks.filter((task) => task.isComplete === false);

    React.useEffect(() => {
        allTasks();
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                theme,
                tasks,
                allTasks,
                deleteTask,
                editTask,
                selectedTask,
                isLoading,
                completedTasks,
                incompleteTasks,
                updateTask,
                modal,
                openModal,
                closeModal
            }}
        >
            <GlobalUpdateContext.Provider value={{}}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
}

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
