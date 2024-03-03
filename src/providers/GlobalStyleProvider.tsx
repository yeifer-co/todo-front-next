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
    padding: 2.5rem;
    display: flex;
    gap: 2.5rem;
    height: 100%;

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
    }
`;

export default GlobalStyleProvider;