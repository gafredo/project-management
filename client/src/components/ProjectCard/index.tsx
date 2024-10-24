import { Project } from "@/state/api";
import React from "react";
import Paragrapher from "../Paragrapher";
import { format } from "date-fns";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="mb-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
      <Paragrapher title="ID" value={project.id.toString()} />
      <Paragrapher title="Name" value={project.name} />
      <Paragrapher
        title="Description"
        value={project.description || "No description provided"}
      />
      <Paragrapher
        title="Start Date"
        value={
          project.startDate ? format(new Date(project.startDate), "P") : ""
        }
      />
      <Paragrapher
        title="End Date"
        value={project.endDate ? format(new Date(project.endDate), "P") : ""}
      />
    </div>
  );
};

export default ProjectCard;
