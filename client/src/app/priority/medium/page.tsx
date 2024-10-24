import React from "react";
import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/state/api";

const UrgentePage = () => {
  return <ReusablePriorityPage priority={Priority.Medium} />;
};

export default UrgentePage;
