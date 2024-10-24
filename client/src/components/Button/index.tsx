import React from "react";

type Props = {
  onClick: () => void;
  icon?: React.ReactNode;
  text: string;
};

const Button = ({ icon, text, onClick }: Props) => {
  return (
    <button
      className="flex items-center gap-2 rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
