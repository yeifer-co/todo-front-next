"use client";
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import toast from "react-hot-toast";

function CreateContent() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [completed, setCompleted] = useState(false);

    const handleChange = (name: string) => (e: any) => {
        switch (name) {
            case "name":
                setName(e.target.value);
                break;
            case "description":
                setDescription(e.target.value);
                break;
            case "author":
                setAuthor(e.target.value);
                break;
            case "completed":
                setCompleted(e.target.checked);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const task = {
            name,
            description,
            author,
            isComplete: completed,
        };
    
        try {
            const res = await axios.post("http://localhost:4000/task", task);

            console.log("CreateTask -> res", res);
        
            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.error);
            }
        
            /*
            if (!res.data.error) {
                allTasks();
                closeModal();
            }
            */
        } catch (error) {
            toast.error("Something went wrong.");
            console.log(error);
        } 
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create a Task</h1>
            <div className="input-control">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="control-name"
                    value={name}
                    name="name"
                    onChange={handleChange("name")}
                    placeholder="e.g, Watch a video from Fireship."
                />
            </div>
            <div className="input-control">
                <label htmlFor="description">Description</label>
                <textarea
                    value={description}
                    onChange={handleChange("description")}
                    name="description"
                    id="control-description"
                    rows={4}
                    placeholder="e.g, Watch a video about Next.js Auth"
                ></textarea>
            </div>
            <div className="input-control">
                <label htmlFor="author">Author</label>
                <input
                    value={author}
                    onChange={handleChange("author")}
                    type="text"
                    name="author"
                    id="control-author"
                />
            </div>
            <div className="input-control toggler">
                <label htmlFor="completed">Toggle Completed</label>
                <input
                    value={completed.toString()}
                    onChange={handleChange("completed")}
                    type="checkbox"
                    name="completed"
                    id="completed"
                />
            </div>

            <div className="submit-btn flex justify-end">
                <button type="submit">
                    <span>Create</span>
                </button>
            </div>
        </form>
    );
}

export default CreateContent;