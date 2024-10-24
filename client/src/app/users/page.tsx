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
import { useGetUsersQuery } from "@/state/api";
import Button from "@/components/Button";
import { Plus } from "lucide-react";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import Image from "next/image";

const columns: GridColDef[] = [
  {
    field: "userId",
    headerName: "ID",
    width: 100,
  },
  {
    field: "username",
    headerName: "Username",
    width: 150,
  },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 100,
    renderCell: (params) => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-9 w-9">
          <Image
            src={`/${params.value}`}
            alt={params.row.username}
            width={100}
            height={50}
            className="h-full rounded-full object-cover"
          />
        </div>
      </div>
    ),
  },
  {
    field: "teamId",
    headerName: "Team ID",
    width: 200,
  },
];

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

const Users = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data: users, isLoading, isError } = useGetUsersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error occurred while fetching users</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header
        name="Users"
        buttonComponent={
          <Button
            icon={<Plus size={18} />}
            text="Add New User"
            onClick={() => {}}
          />
        }
      />
      <DataGrid
        rows={users || []}
        columns={columns}
        className={dataGridClassNames}
        sx={dataGridSxStyles(isDarkMode)}
        getRowId={(row) => row.userId}
        pagination
        slots={{
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
};

export default Users;
