import React from "react";

type Props = {
  title: string;
  value: string | undefined;
};

const Paragrapher = ({ title, value }: Props) => {
  return (
    <p>
      <strong>{title}:</strong> {value}
    </p>
  );
};

export default Paragrapher;
