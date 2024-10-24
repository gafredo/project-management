import { Task } from "@/state/api";
import Image from "next/image";
import React from "react";
import Paragrapher from "../Paragrapher";
import { format } from "date-fns";

type Props = {
  task: Task;
};

const index = ({ task }: { task: Task }) => {
  return (
    <div className="mb-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
      {task.attachments && task.attachments.length > 0 && (
        <div>
          <strong>Attachments:</strong>
          <div className="flex flex-wrap">
            <Image
              src={`/${task.attachments[0].fileURL}`}
              alt={task.attachments[0].fileName}
              width={400}
              height={200}
              className="h-auto w-full rounded-t-md"
            />
          </div>
        </div>
      )}
      <Paragrapher title="ID" value={task.id.toString()} />
      <Paragrapher title="Title" value={task.title} />
      <Paragrapher
        title="Description"
        value={task.description || "No description provided"}
      />
      <Paragrapher title="Status" value={task.status} />
      <Paragrapher title="Priority" value={task.priority} />
      <Paragrapher title="Tags" value={task.tags || "No tags"} />

      <Paragrapher
        title="Start Date"
        value={task.startDate ? format(new Date(task.startDate), "P") : ""}
      />
      <Paragrapher
        title="Due Date"
        value={task.dueDate ? format(new Date(task.dueDate), "P") : ""}
      />

      <Paragrapher
        title="Author"
        value={task.author ? task.author.username : "Unknown"}
      />
      <Paragrapher
        title="Assignee"
        value={task.assignee ? task.assignee.username : "Unassigned"}
      />
    </div>
  );
};

export default index;
