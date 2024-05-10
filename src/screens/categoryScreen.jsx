import React, { useEffect, useState } from "react";
import CategoryTable from "../categories/CategoryTable";
import Header from "../categories/Header";
import Dialogbox from "../categories/Dialogbox";
import { Box, Button, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import useCategory from "../hooks/useCategory";
import { useSelector } from "react-redux";
import { Delete, Edit } from "@mui/icons-material";

const CategoryScreen = () => {
  const {getCategory}=useCategory()
  const cat=useSelector(state=>state.category.data);
  const [categories, setCategories] = useState([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    status: true,
  });
  const [activeUser, setActiveUser] = useState(false);

  const handleOpenDeleteDialog = (index) => {
    setDeleteIndex(index);
    setDeleteOpen(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditCategory = (index) => {
    const editedCategory = categories[index];
    setFormData(editedCategory);
    setEditIndex(index);
    setOpen(true);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDeleteCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  const handleClose = () => {
    setOpen(false);
    setEditIndex(null);
    setFormData({
      id: null,
      name: "",
      status: true,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseDeleteDialog = () => {
    setDeleteOpen(false);
    setDeleteIndex(null);
  };

  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      handleDeleteCategory(deleteIndex);
      handleCloseDeleteDialog();
    }
  };

  const handleSwitch = () => {
    setActiveUser(!activeUser);
  };

  const handleAddCategory = () => {
    if (formData.name === "") {
      return;
    }
    if (editIndex !== null) {
      const updatedCategories = [...categories];
      updatedCategories[editIndex] = formData;
      setCategories(updatedCategories);
      handleClose();
      return;
    }
    console.log(formData);

    setCategories([...categories, formData]);
    handleClose();
  };
  const filteredCategories = searchTerm
    ? categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : categories;

  const handleRefresh = () => {
    setSearchTerm("");
  };

  const handleSwitchChange = (index) => {
    const updatedData = filteredCategories.filter((item) => {
      if (item === index) {
        item.status = !item.status;
        return true;
      }
      return true;
    });
    setCategories(updatedData);
  };
  useEffect(()=>{
    getCategory()
  },[])
  return (
    <Box>
      <Header
        filteredCategories={filteredCategories}
        searchTerm={searchTerm}
        handleRefresh={handleRefresh}
        open={open}
        handleOpen={handleOpen}
        handleSearch={handleSearch}
        handleSwitch={handleSwitch}
        activeUser={activeUser}
      />
      <Box sx={{paddingX:"20px"}}>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650,tableLayout:"fixed" }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{width:"20%"}}>Sr.No</TableCell>
            <TableCell align="center">Category Name</TableCell>
            <TableCell align="center" sx={{width:"20%"}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ backgroundColor: 'white' }}>
          {cat.map((category, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row" align="center" sx={{width:"20%"}}>
                {index + 1}
              </TableCell>
              <TableCell align="center">{category.name}</TableCell>
              <TableCell align="center" sx={{width:"20%"}} variant="contained">
                <Button>
                  <Edit
                    color="action"
                  />
                </Button>
                <Button>
                  <Delete
                    color="action"
                  />
                </Button>
                <Button>
                  <Switch
                    checked={category.active ? true : false}
                  />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Box>
      <Dialogbox
        handleClose={handleClose}
        formData={formData}
        handleChange={handleChange}
        handleAddCategory={handleAddCategory}
        deleteOpen={deleteOpen}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
        handleConfirmDelete={handleConfirmDelete}
        handleEditCategory={handleEditCategory}
        open={open}
        handleSwitchChange={handleSwitchChange}
      />
    </Box>
  );
};

export default CategoryScreen;
