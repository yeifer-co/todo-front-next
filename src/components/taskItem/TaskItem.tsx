"use client";
import React from "react";
import { edit, trash } from "../../utils/Icons";
import styled from "styled-components";
import { useGlobalState } from "../../context/globalProvider";
import CreateContent from "../modals/CreateContent";

interface Props {
    id: string;
    name: string;
    description: string;
    author: string;
    completed: boolean;
}

function TaskItem({ id, name, description, author, completed }: Props) {

    const { theme, deleteTask, updateTask } = useGlobalState();

    return (
        <TaskItemStyled theme={theme}>
            <h1>{name}</h1>
            <p>{description}</p>
            <p className="author"><strong>Author:</strong> {author}</p>
            <div className="task-footer">
                {completed ? (
                    <button
                        className="completed"
                        onClick={() => {
                            const task = {
                                id,
                                isComplete: false,
                            };

                            updateTask(task);
                        }}
                    >
                        Completed
                    </button>
                ) : (
                    <button
                        className="incomplete"
                        onClick={() => {
                            const task = {
                                id,
                                isComplete: true,
                            };
                            updateTask(task);
                        }}
                    >
                        Pending
                    </button>
                )}
                <button className="edit">{edit}</button>
                <button
                    className="delete"
                    onClick={() => deleteTask(id)}
                >{trash}</button>
            </div>
        </TaskItemStyled>
    );
}

const TaskItemStyled = styled.div`
    padding: 1.2rem 1rem;
    border-radius: 1rem;
    background-color: ${(props) => props.theme.borderColor2};
    box-shadow: ${(props) => props.theme.shadow7};
    border: 2px solid ${(props) => props.theme.borderColor2};

    height: 16rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .author {
        margin-top: auto;
    }

    > h1 {
        font-size: 1.5rem;
        font-weight: 600;
    }

    .task-footer {
        display: flex;
        align-items: center;
        gap: 1.2rem;

        button {
            border: none;
            outline: none;
            cursor: pointer;

            i {
                font-size: 1.4rem;
                color: ${(props) => props.theme.colorGrey2};
            }
        }

        .edit {
            margin-left: auto;
        }

        .completed,
        .incomplete {
            display: inline-block;
            padding: 0.4rem 1rem;
            background: ${(props) => props.theme.colorDanger};
            border-radius: 30px;
        }

        .completed {
            background: ${(props) => props.theme.colorGreenDark} !important;
        }
    }
`;

export default TaskItem;