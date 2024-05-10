import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from '@mui/material/Paper';

const CategoryTable = ({
  filteredCategories,
  handleEditCategory,
  handleOpenDeleteDialog,
  activeUser,
  handleSwitchChange
}) => {


  const filterData = filteredCategories.filter((data) => {
    if (activeUser) {
      return data.status === true;
    } else {
      return true;
    }
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Sr.No</TableCell>
            <TableCell align="center">Category Name</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ backgroundColor: 'white' }}>
          {filterData.map((category, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row" align="left">
                {index + 1}
              </TableCell>
              <TableCell align="center">{category.name}</TableCell>
              <TableCell align="right" variant="contained">
                <Button>
                  <EditIcon
                    color="action"
                    onClick={() => handleEditCategory(index)}
                  />
                </Button>
                <Button>
                  <DeleteIcon
                    color="action"
                    onClick={() => handleOpenDeleteDialog(index)}
                  />
                </Button>
                <Button>
                  <Switch
                    checked={category.status ? true : false}
                    onChange={() => handleSwitchChange(category)}
                  />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoryTable;
