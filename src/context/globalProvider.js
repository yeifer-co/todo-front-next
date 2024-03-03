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

    const [tasks, setTasks] = useState([]);

    const theme = themes[selectedTheme];

    const allTasks = async () => {
        setIsLoading(true);

        try {
            const res = await axios.get("/api/task");

            console.log(res.data);
            
            setTasks(res.data.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            const res = await axios.delete(`/api/task/${id}`);
            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.error);
            }
        
            allTasks();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
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
                deleteTask,
                isLoading,
                completedTasks,
                incompleteTasks,
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
