"use client"
import React from "react";
import type { NextPage } from 'next'
import { useGlobalState } from "../context/globalProvider";
import Tasks from "../components/tasks/Tasks";

const IncompletePage: NextPage = () => {
  const { incompleteTasks } = useGlobalState();

  return <Tasks title="Incomplete Tasks" tasks={incompleteTasks} />;
}

export default IncompletePage
