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

    const [tasks, setTasks] = useState([]);

    const theme = themes[selectedTheme];

    const openModal = () => {
        setModal(true);
    };
    
    const closeModal = () => {
        setModal(false);
    };

    const allTasks = async () => {
        setIsLoading(true);

        try {
            const res = await axios.get("/api/task");

            const sorted = res.data.data.sort((a, b) => {
                return (
                    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
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
