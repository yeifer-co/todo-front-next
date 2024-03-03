"use client";
import React from "react";
import styled from "styled-components";

interface Props {
    children: React.ReactNode;
}

function GlobalStyleProvider({ children }: Props) {
    return <GlobalStyled>{children}</GlobalStyled>;
}

const GlobalStyled = styled.div`
    background-color: red;
    padding: 2.5rem;
    display: flex;
    gap: 2.5rem;
    height: 100%;
`;

export default GlobalStyleProvider;