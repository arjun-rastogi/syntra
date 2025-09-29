import React from "react";
import { Routes, Route } from "react-router-dom";
import Error from "../pages/Error";
import Dashboard from "../dashboard/Dashboard";
import LeadList from "../dashboard/pages/LeadList";
import Panel from "../dashboard/pages/Panel";
import TaskList from "../dashboard/pages/TaskList ";
import TeamList from "../dashboard/pages/TeamList";

const DashRoute = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Panel />} />
          <Route path="lead-list" element={<LeadList />} />
          <Route path="task-list" element={<TaskList />} />
          <Route path="team-list" element={<TeamList />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </>
  );
};

export default DashRoute;
