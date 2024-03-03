"use client"
import React from "react";
import type { NextPage } from 'next'
import { useGlobalState } from "../context/globalProvider";
import Tasks from "../components/tasks/Tasks";

const CompletedPage: NextPage = () => {
  const { completedTasks } = useGlobalState();

  return <Tasks title="Completed Tasks" tasks={completedTasks} />;
}

export default CompletedPage
