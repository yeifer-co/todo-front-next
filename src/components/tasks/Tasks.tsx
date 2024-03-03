"use client";
import React from "react";
import styled from "styled-components";
import { useGlobalState } from "../../context/globalProvider";
import TaskItem from "../taskItem/TaskItem";
import { plus } from "../../utils/Icons";
import CreateContent from "../modals/CreateContent";
import Modal from "../modals/Modal";

interface Props {
    title: string;
    tasks: any[];
}

function Tasks({ title, tasks }: Props) {

    const { theme, isLoading, openModal, modal } = useGlobalState();

    return (
        <TasksStyled theme={theme}>
            {modal && <Modal content={<CreateContent />} />}
            <h1>{title}</h1>
            {!isLoading ? (
                <div className="tasks grid">
                    {tasks.map((task) => (
                        <TaskItem key={task.id}
                            id={task.id}
                            name={task.name}
                            description={task.description}
                            author={task.author}
                            completed={task.isComplete} 
                        />
                    ))}
                    <button className="create-task" onClick={openModal}>
                        {plus}
                        Add New Task
                    </button>
                </div>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <span className="loader"></span>
                </div>
            )}
        </TasksStyled>
    );
}

const TasksStyled = styled.main`
    padding: 2rem;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.colorBg2};
    border: 2px solid ${(props) => props.theme.borderColor2};
    border-radius: 1rem;

    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 0.5rem;
    }

    .tasks {
        margin: 2rem 0;
    }

    > h1 {
        font-size: clamp(1.5rem, 2vw, 2rem);
        font-weight: 800;
        position: relative;

        &::after {
            content: "";
            position: absolute;
            bottom: -0.5rem;
            left: 0;
            width: 3rem;
            height: 0.2rem;
            background-color: ${(props) => props.theme.colorPrimaryGreen};
            border-radius: 0.5rem;
        }
    }

    .create-task {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;

        height: 16rem;
        color: ${(props) => props.theme.colorGrey2};
        font-weight: 600;
        cursor: pointer;
        border-radius: 1rem;
        border: 3px dashed ${(props) => props.theme.colorGrey5};
        transition: all 0.3s ease;

        i {
            font-size: 1.5rem;
            margin-right: 0.2rem;
        }

        &:hover {
            background-color: ${(props) => props.theme.colorGrey5};
            color: ${(props) => props.theme.colorGrey0};
        }
    }

`;

export default Tasks