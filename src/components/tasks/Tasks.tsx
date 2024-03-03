"use client";
import React from "react";
import styled from "styled-components";
import { useGlobalState } from "../../context/globalProvider";
import CreateContent from "../modals/CreateContent";

function Tasks() {

    const { theme } = useGlobalState();

    return (
        <TasksStyled theme={theme}>
            <CreateContent/>
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
`;

export default Tasks