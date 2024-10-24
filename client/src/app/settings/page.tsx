import Header from "@/components/Header";
import React from "react";

type Props = {
  text: string;
};

const Settings = (props: Props) => {
  const userSettings = {
    username: "johndoe",
    email: "john.doe@example.com",
    teamName: "Development Team",
    roleName: "Developer",
  };
  return (
    <div className="p-8">
      <Header name="Settings" />
      <div className="space-y-4">
        <Input label="Username" description={userSettings.username} />
        <Input label="Email" description={userSettings.email} />
        <Input label="Team Name" description={userSettings.teamName} />
        <Input label="Role Name" description={userSettings.roleName} />
      </div>
    </div>
  );
};

const Input = ({
  label,
  description,
}: {
  label: string;
  description: string;
}) => {
  return (
    <div>
      <label className="block text-sm font-medium dark:text-white">
        {label}
      </label>
      <div className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm dark:text-white">
        {description}
      </div>
    </div>
  );
};

export default Settings;
