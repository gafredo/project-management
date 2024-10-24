import Header from "@/components/Header";
import { Task, useGetTasksQuery } from "@/state/api";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
import Button from "../Button";
import TaskCard from "@/components/TaskCard";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const ListView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred while fetching tasks</div>;

  return (
    <div className="px-4 pb-8 md:px-6">
      <div className="pt-5">
        <Header
          name="List"
          buttonComponent={
            <Button
              text="Add Task"
              onClick={() => setIsModalNewTaskOpen(true)}
              icon={<Plus size={18} />}
            />
          }
          isSmallText
        />
      </div>
      <div className="lg: grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {tasks?.map((task: Task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
};

export default ListView;
