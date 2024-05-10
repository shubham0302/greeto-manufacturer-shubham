import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, IconButton, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import EditVariantDialog from "./EditVariantDialog";
import { useState } from "react";
import { useEffect } from "react";
import useProduct from "../hooks/useProduct";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useVariant from "../hooks/useVariant";

const MyProductTable = () => {
  const {getProduct}=useProduct()
  const {getVariant}=useVariant()
  const productList =useSelector(state=>state.product.data)
  const variantList=useSelector(state=>state.variant.data)
  const navigate=useNavigate();
  console.log(productList);
  const [openRow, setOpenRow] = React.useState(null);
  const handleClick = (index,id) => {
    setOpenRow((prevIndex) => (prevIndex === index ? null : index));
    getVariant(id);
  };

  const handleDeleteVariant = (itemIndex, variantIndex) => {
    const newData = [...data];
    newData[itemIndex].Variants.splice(variantIndex, 1);
    setData(newData);
  };

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const handleEditVariant = (itemIndex, variantIndex) => {
    setSelectedVariant(data[itemIndex].Variants[variantIndex]);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedVariant(null);
  };

  const handleSaveVariant = (editedVariant) => {
    console.log("Saving edited variant:", editedVariant);
    handleCloseEditDialog();
  };

  useEffect(()=>{
    getProduct()
  },[])
  
  return (
    <Box sx={{ py: 3, px:3 }}>
      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650,tableLayout:"fixed" }} size="small">
          {/* <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Stock</TableCell>
              <TableCell align="center" sx={{width:"10%"}}>Action</TableCell>
            </TableRow>
          </TableHead> */}
          <TableBody>
            {productList.map((item, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell>
                    <IconButton onClick={() => handleClick(index,item._id)}>
                      {openRow === index ? (
                        <KeyboardArrowDownIcon />
                      ) : (
                        <KeyboardArrowRightIcon />
                      )}
                    </IconButton>
                    {item.name}
                  </TableCell>
                  <TableCell align="center">
                    {/* <TextField
                      placeholder={item.Price}
                      type="number"
                      variant="outlined"
                      sx={{
                        width: "200px",
                        "& .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input":
                          { height: "20px" },
                      }}
                      size="small"
                    /> */}
                  </TableCell>
                  <TableCell align="center">
                    {/* <TextField
                      placeholder={item.Stock}
                      variant="outlined"
                      sx={{
                        width: "200px",
                        "& .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input":
                          { height: "20px" },
                      }}
                      size="small"
                    /> */}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={()=>{navigate("/editProduct?productId="+item._id)}}>
                      <ModeEditOutlineIcon />
                    </IconButton>
                    <IconButton>
                      <Delete />
                    </IconButton>
                        </TableCell>
                </TableRow>
                {openRow === index && variantList.length>0?
                  variantList.map((variant, variantIndex) => (
                    <TableRow key={variantIndex}>
                      <TableCell>
                        <Box width={"100%"} height={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                        <img src={variant.image} style={{aspectRatio:"16/9",width:"40%"}}/>
                        </Box>
                      </TableCell>
                      <TableCell align="center">Name: {variant.name}</TableCell>
                      <TableCell align="center">
                        Price: {variant.price}
                      </TableCell>
                      <TableCell align="center">
                        Stock: {variant.stock}
                      </TableCell>
                    </TableRow>
                  )):openRow===index &&
                  <TableRow sx={{width:"100%"}}>
                    <TableCell align="center" colSpan={4} sx={{py:2}}>No Variants Available of this Product!</TableCell>
                  </TableRow>
                }
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>{" "}
      <EditVariantDialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        variant={selectedVariant}
        onSave={handleSaveVariant}
      />
    </Box>
  );
};
export default MyProductTable;
