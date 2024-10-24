"use client";

import { useAppSelector } from "@/app/redux";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ModalNewTask from "@/components/ModalNewTask";
import { Priority, Task, useGetTasksByUserQuery } from "@/state/api";
import { List, Plus, Table } from "lucide-react";
import React, { useState } from "react";
import TaskCard from "@/components/TaskCard";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";

type Props = {
  priority: Priority;
};

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
        {params.value}
      </span>
    ),
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 75,
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 130,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 130,
  },
  {
    field: "Due Date",
    headerName: "dueDate",
    width: 130,
  },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value.username || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value.username || "Unassigneed",
  },
];

const ReusablePriorityPage = ({ priority }: Props) => {
  const [view, setView] = useState("list");
  const [isModalTaskOpen, setIsModalTaskOpen] = useState(false);

  const userId = 1;
  const {
    data: tasks,
    isLoading,
    isError: isTasksError,
  } = useGetTasksByUserQuery(userId || 0, {
    skip: userId === null,
  });

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const filteredTasks = tasks?.filter(
    (task: Task) => task.priority === priority,
  );

  if (isTasksError || !tasks) return <div>Error fetching tasks...</div>;

  return (
    <div className="m-5 p-4">
      <ModalNewTask
        isOpen={isModalTaskOpen}
        onClose={() => setIsModalTaskOpen(false)}
      />
      <Header
        name={`${priority} Priority`}
        buttonComponent={
          <Button
            text="Add Task"
            icon={<Plus size={18} />}
            onClick={() => setIsModalTaskOpen(true)}
          />
        }
      />
      <div className="mb-4 flex justify-start">
        <button
          className={`flex items-center gap-3 px-4 py-2 ${view === "list" ? "bg-gray-300" : "bg-white"} rounded-lg`}
          onClick={() => setView("list")}
        >
          <List size={18} />
          List
        </button>
        <button
          className={`flex items-center gap-3 px-4 py-2 ${view === "table" ? "bg-gray-300" : "bg-white"} rounded-lg`}
          onClick={() => setView("table")}
        >
          <Table size={18} />
          Table
        </button>
      </div>
      {isLoading ? (
        <div>Loading tasks...</div>
      ) : view === "list" ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks?.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        view === "table" &&
        filteredTasks && (
          <div className="w-full">
            <DataGrid
              rows={filteredTasks || []}
              columns={columns}
              checkboxSelection
              loading={isLoading}
              getRowClassName={() => "data-grid-row"}
              getCellClassName={() => "data-grid-cell"}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        )
      )}
    </div>
  );
};

export default ReusablePriorityPage;
