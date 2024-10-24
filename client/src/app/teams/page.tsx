"use client";

import Header from "@/components/Header";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import React from "react";
import { useAppSelector } from "../redux";
import { useGetTeamsQuery } from "@/state/api";
import Button from "@/components/Button";
import { Plus } from "lucide-react";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import Image from "next/image";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "teamName",
    headerName: "Name",
    width: 300,
  },
  {
    field: "projectManagerUsername",
    headerName: "Project Manager",
    width: 300,
  },
  {
    field: "productOwnerUsername",
    headerName: "Product Owner",
    width: 300,
  },
];

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

const Teams = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data: teams, isLoading, isError } = useGetTeamsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error occurred while fetching teams</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header
        name="Teams"
        buttonComponent={
          <Button
            icon={<Plus size={18} />}
            text="Add New Team"
            onClick={() => {}}
          />
        }
      />
      <DataGrid
        rows={teams || []}
        columns={columns}
        className={dataGridClassNames}
        sx={dataGridSxStyles(isDarkMode)}
        getRowId={(row) => {
          console.log(row);
          return row.id;
        }}
        pagination
        slots={{
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
};

export default Teams;
