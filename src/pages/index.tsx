"use client"
import React from "react";
import type { NextPage } from 'next'
import Tasks from "../components/tasks/Tasks";
import { useGlobalState } from "../context/globalProvider";

const IndexPage: NextPage = () => {

  const { tasks } = useGlobalState();

  return <Tasks title="All Task" tasks={tasks} />;
}

export default IndexPage
