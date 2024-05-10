import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FieldButton from "../../CommonComponent/FieldButton";
import { alpha } from "@material-ui/core";
import { useSelector } from "react-redux";
import useProduct from "../../hooks/useProduct";
import useCategory from "../../hooks/useCategory";
import { useSearchParams } from "react-router-dom";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const General = ({ nextValue,isEdit=false }) => {
  const [searchParams]=useSearchParams()
  const [category, setCategory] = useState([]);
  const [productFor, setProductFor] = useState([]);
  const { addProduct,editProduct } = useProduct();
  const categories = useSelector((state) => state.category.data);
  const relaiton = useSelector((state) => state.relation.data);
  const data=useSelector(state=>state.productDetails)
  // const productDetails=useSelector(state=>state);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    points: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleCatChange = (e) => {
    setCategory(e.target.value);
  };
  const handleProductForChange = (e) => {
    setProductFor(e.target.value);
  };
  const handleNextAndAddProduct = (e) => {
    e.preventDefault()
    if (isEdit) {
      editProduct({productId:searchParams.get("productId"),...formData, category, productFor},nextValue)
    }else{
      addProduct({ ...formData, category, productFor },nextValue);
    }
  };

  useEffect(()=>{
    if (isEdit) {
      console.log(data);
      setFormData(data.data)
      setCategory(data.category)
      setProductFor(data.relation)
    }
  },[data])

  return (
    <Box
      bgcolor={"white"}
      borderRadius={"12px"}
      p={"38px"}
      border={1}
      borderColor={alpha("#000000", 0.2)}
    >
      <Box
        component={"form"}
        method="post"
        onSubmit={handleNextAndAddProduct}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography sx={{ fontSize: "25px", fontWeight: 600 }}>
            Product information
          </Typography>
          <FieldButton title={"next"} type="submit" />
        </Box>
        <Typography
          sx={{
            fontSize: "15px",
            mt: "20px",
            color: "#707888",
          }}
        >
          Name
        </Typography>
        <TextField
          size="small"
          id="outlined-basic"
          placeholder="Product Name"
          variant="outlined"
          maxRows={4}
          sx={{ mt: "2px" }}
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Box sx={{ mt: "15px" }}>
          <Typography
            sx={{
              fontSize: "15px",
              mt: "2px",
              color: "#707888",
            }}
          >
            Description
          </Typography>
          <TextField
            multiline
            rows={4}
            size="small"
            id="outlined-basic"
            placeholder="Product Description"
            variant="outlined"
            sx={{ mt: "2px", width: "100%" }}
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Box>
        <Box sx={{ mt: "10px" }}>
          <Typography
            sx={{
              fontSize: "15px",
              mt: "2px",
              color: "#707888",
            }}
          >
            Points
          </Typography>
          <TextField
            multiline
            rows={4}
            size="small"
            id="outlined-basic"
            placeholder="Bullet Points"
            variant="outlined"
            sx={{ mt: "2px", width: "100%" }}
            name="points"
            value={formData.points}
            onChange={handleChange}
            required
          />
        </Box>
        <Box sx={{ mt: "15px" }} display={"flex"} gap={4}>
          <Box width={"100%"}>
            <Typography
              sx={{
                fontSize: "15px",
                my: "2px",
                color: "#707888",
              }}
            >
              Category
            </Typography>
            <FormControl
              required
              size="small"
              sx={{ mt: "2px", width: "100%" }}
            >
              <Select
                name="category"
                multiple
                value={category}
                onChange={handleCatChange}
              >
                <MenuItem value="" disabled>Select Category</MenuItem>
                {categories?.map((item) => (
                  <MenuItem
                    key={item._id}
                    sx={{ bgcolor: "white" }}
                    value={item._id}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box width={"100%"}>
            <Typography
              sx={{
                fontSize: "15px",
                my: "2px",
                color: "#707888",
              }}
            >
              Product For
            </Typography>
            <FormControl size="small" sx={{ mt: "2px", width: "100%" }}>
              <Select
                name="productFor"
                multiple
                size="small"
                value={productFor}
                onChange={handleProductForChange}
              >
                <MenuItem value="" disabled>Select Product For</MenuItem>
                {relaiton?.map((item) => (
                  <MenuItem
                    key={item._id}
                    sx={{ bgcolor: "white" }}
                    value={item._id}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default General;
