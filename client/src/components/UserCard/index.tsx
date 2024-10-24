import { User } from "@/state/api";
import React from "react";
import Paragrapher from "../Paragrapher";
import Image from "next/image";

type Props = {
  user: User;
};

const ProjectCard = ({ user }: Props) => {
  return (
    <div className="mb-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
      {user.profilePictureUrl && (
        <div className="flex flex-wrap">
          <Image
            src={`/${user.profilePictureUrl}`}
            alt={user.username}
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
      )}
      <Paragrapher title="UserName" value={user.username} />
      <Paragrapher title="E-mail" value={user.email} />
    </div>
  );
};

export default ProjectCard;
