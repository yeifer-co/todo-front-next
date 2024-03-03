"use client";
import { useGlobalState } from "../../context/globalProvider";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "../button/Button";
import axios from "axios";
import toast from "react-hot-toast";
import { add, plus } from "../../utils/Icons";

function CreateContent() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [completed, setCompleted] = useState(false);

    const { theme, allTasks, closeModal } = useGlobalState();

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

        if (name === "") {
            toast.error("Name is required.");
            return;
        }
    
        try {
            const res = await axios.post("/api/task", task);
        
            if (res.data.success) {
                toast.success(res.data.message);
                allTasks();
                closeModal();
            } else {
                toast.error(res.data.error);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error || "Something went wrong.");
        } 
    };

    return (
        <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
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
                <Button
                    type="submit"
                    name="Create Task"
                    icon={add}
                    padding={"0.8rem 2rem"}
                    borderRad={"0.8rem"}
                    fw={"500"}
                    fs={"1.2rem"}
                    background={theme.colorGreenDark}
                />
            </div>
        </CreateContentStyled>
    );
}

const CreateContentStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  color: ${(props) => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 1.6rem 0;
    font-weight: 500;

    @media screen and (max-width: 450px) {
      margin: 1rem 0;
    }

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }

    input,
    textarea {
      width: 100%;
      padding: 1rem;

      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: 0.5rem;
    }
  }

  .submit-btn button {
    transition: all 0.35s ease-in-out;

    @media screen and (max-width: 500px) {
      font-size: 0.9rem !important;
      padding: 0.6rem 1rem !important;

      i {
        font-size: 1.2rem !important;
        margin-right: 0.5rem !important;
      }
    }

    i {
      color: ${(props) => props.theme.colorGrey0};
    }

    &:hover {
      background: ${(props) => props.theme.colorPrimaryGreen} !important;
      color: ${(props) => props.theme.colorWhite} !important;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
`;

export default CreateContent;