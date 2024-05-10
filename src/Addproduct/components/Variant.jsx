import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import {
  Add,
  Close,
  Delete,
  SearchOutlined,
} from "@mui/icons-material";
import FieldButton from "../../CommonComponent/FieldButton";
import OutlineButton from "../../CommonComponent/OutlineButton";
import { useSearchParams } from "react-router-dom";
import { postData } from "../../utils/serverHelper";
import useVariant from "../../hooks/useVariant";
import { useSelector } from "react-redux";

const VariantPage = ({ nextValue, isEdit=false }) => {
  const [searchParams]=useSearchParams()
  const {AddBulkVariant,getVariant}=useVariant()
  const Variants=useSelector(state=>state.variant.data);
  const [editVarAdd,setAddVar]=useState(false);
  const [loadingId,setLoadingId]=useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [nextVariantId, setNextVariantId] = useState(2);
  const [variants, setVariants] = useState([
    {
      id: 1,
      variantType: "Color",
      value: "",
      color: "",
      discountType: "percentage",
      price: "",
      maxDiscount: "",
      image: null,
      discount:"",
      stock:"",
      sku:""
    },
  ]);

  const [variantData,setVariantData]=useState({
        name:"",
        variantType:"Color",
        image:null,
        price:"",
        productId:searchParams.get("productId")||"",
        discountType:"percentage",
        discount:"",
        maxDiscount:"",
        stock:"",
        sku:"",
  })

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const defaultImage = "/image/Icon.png";

  const handleAddVariant = () => {
    const newVariant = {
      id: nextVariantId,
      variantType: "Color",
      value: "",
      color: "",
      discountType: "percentage",
      price: "",
      maxDiscount: "",
      image: null,
      discount:"",
      stock:"",
      sku:""
    };
    setVariants([...variants, newVariant]);
    setNextVariantId(nextVariantId + 1);
  };

  const handleVariantChange = (id, event) => {
    const selectedVariant = event.target.value;
    const updatedVariants = variants.map((variant) => {
      if (variant.id === id) {
        return {
          ...variant,
          variantType: selectedVariant,
          discountType: selectedVariant === "Color" ? "Percent" : "Currency",
        };
      }
      return variant;
    });

    setVariants(updatedVariants);
  };

  const handleValueChange = (id, field, value) => {
    const updatedVariants = variants.map((variant) => {
      if (variant.id === id) {
        return { ...variant, [field]: value };
      }
      return variant;
    });
    setVariants(updatedVariants);
  };

  const handleImageUpload = async(event, id) => {
    setLoadingId(id)
    try {
      let form = new FormData();
      form.append("media", event.target.files[0]);
      const data = await postData("/api/upload", form);
      const updatedVariants = variants.map((variant) =>
        variant.id === id ? { ...variant, image: data?.data?.url } : variant
      );
      setVariants(updatedVariants);
      setLoadingId(null)
    } catch (error) {
      setLoadingId(null)
      console.log(error,"image kit error");
    }
  };
  const handleSingleVarImageUpload= async(e)=>{
    setLoadingId(searchParams.get("productId"))
    try {
      let form = new FormData();
      form.append("media", e.target.files[0]);
      const data = await postData("/api/upload", form);
      setVariantData(prev=>({...prev,image:data?.data?.url}));
      setLoadingId(null)
    } catch (error) {
      setLoadingId(null)
      console.log(error,"image kit error");
    }
  }
const handleDeleteImage=(id)=>{
  const updatedVariants = variants.map((variant) =>
    variant.id === id ? { ...variant, image: null } : variant
  );
  setVariants(updatedVariants);
}
  const handleDeleteVariant = (id) => {
    const updatedVariants = variants.filter((variant) => variant.id !== id);
    setVariants(updatedVariants);
  };

  const handleSave = () => {
    let variantsList=variants.map((item)=>{
      return{
        name:item.variantType === "Color"?item.color:item.value,
        variantType:item.variantType,
        image:item.image,
        price:item.price,
        productId:searchParams.get("productId"),
        discountType:item.discountType,
        discount:item.discount,
        maxDiscount:item.maxDiscount,
        stock:item.stock,
        sku:"PRO-001-"+item.variantType +"-" +(item.variantType === "Color"? item.color:item.value),
      }
    })
    let variantBulkData={data:variantsList}
    console.log(variantBulkData,"variants data");
    AddBulkVariant(variantBulkData,nextValue);
  };
  const handleChange=(e)=>{
    setVariantData(prev=>{return {...prev,[e.target.name]:e.target.value}})
  }
  useEffect(()=>{
    if(isEdit){
      getVariant(searchParams.get("productId"))
    }
  },[isEdit])
  return (
    <Box
      bgcolor={"white"}
      height={"80vh"}
      boxShadow={"0px 12px 32px #1E20261A"}
      padding={"30px"}
      borderRadius={"5px"}
      width={"100%"}
    >
      <Box>
        <Typography fontSize={"25px"} fontWeight={600}>
          Product Variant
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingY: "20px",
        }}
      >
        <Box>
          <TextField
            sx={{ width: "550px" }}
            size="small"
            label={
              <Box>
                <SearchOutlined />
                Search
              </Box>
            }
            value={searchTerm}
            onChange={handleSearch}
          />
        </Box>
        <Box>
          <OutlineButton
            onClick={()=>{
              if (isEdit) {
                setAddVar(true)
              }else{
                handleAddVariant()
              }
            }}
            title={"Add Variant"}
            icon={<Add />}
          />
          <FieldButton onClick={handleSave} title={"Save"} />
        </Box>
      </Box>
      <Box
        sx={{ mt: "10px", border: "1px solid lightgray", borderRadius: "5px" }}
      >
        <TableContainer>
          <Table sx={{tableLayout:"fixed"}}>
            <TableHead sx={{ bgcolor: "#EBF1FDE5" }}>
              <TableRow>
                <TableCell align="center">VARIANT</TableCell>
                <TableCell align="center">VALUE</TableCell>
                <TableCell align="center">IMAGE</TableCell>
                <TableCell align="center">PRICE</TableCell>
                <TableCell align="center">DISCOUNT</TableCell>
                <TableCell align="center">MAX DISCOUNT</TableCell>
                <TableCell align="center">STOCK</TableCell>
                {/* <TableCell align="center">SKU</TableCell> */}
                <TableCell align="center" sx={{width:"8%"}}>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                isEdit===true?
                <>edit</>:
                <>
              {variants.map((variant) => (
                <TableRow key={variant?.id}>
                  <TableCell align="center">
                    <Select
                      size="small"
                      value={variant?.variantType}
                      fullWidth
                      onChange={(e) => handleVariantChange(variant?.id, e)}
                    >
                      <MenuItem value="Color">Color</MenuItem>
                      <MenuItem value="Size">Size</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell align="center">
                    {variant?.variantType === "Color" ? (
                      <TextField
                        size="small"
                        placeholder="Color"
                        value={variant?.color}
                        fullWidth
                        onChange={(e) =>
                          handleValueChange(variant?.id, "color", e.target.value)
                        }
                      />
                    ) : (
                      <TextField
                        size="small"
                        placeholder="Size"
                        value={variant?.value}
                        fullWidth
                        onChange={(e) =>
                          handleValueChange(variant?.id, "value", e.target.value)
                        }
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{position:"relative"}}>
                    { variant?.image &&
                      <Close fontSize="small" onClick={()=>{handleDeleteImage(variant?.id)}}  sx={{position:"absolute" ,top:0,right:0,cursor:"pointer"}}/>
                    }
                    {
                      loadingId === variant?.id &&
                      <Box position={"absolute"} top={0} left={0} width={"100%"} height={"100%"} zIndex={10} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <CircularProgress/>
                      </Box>
                    }
                    <label htmlFor={`upload-image-${variant?.id}`}>
                    <input
                      type="file"
                      accept="image/*"
                      id={`upload-image-${variant?.id}`}
                      onChange={(event) =>
                        handleImageUpload(event, variant?.id)
                      }
                      onClick={(e) => (e.target.value = null)}
                      style={{ display: "none" }}
                    />
                      <img
                        src={variant?.image ? variant?.image : defaultImage}
                        alt="image"
                        style={{
                          // objectFit: "contain",
                          width: "100%",
                          cursor: "pointer",
                          aspectRatio: "16/9",
                        }}
                      />
                    </label>
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      type="number"
                      InputProps={{startAdornment:<span style={{paddingRight:"5px"}}>₹</span>}}
                      size="small"
                      fullWidth
                      placeholder="Price"
                      value={variant?.price}
                      onChange={(e) =>
                        handleValueChange(variant?.id, "price", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box display={"flex"}>
                      <TextField
                        size="small"
                        type="number"
                        sx={{".MuiInputBase-root": {fontSize:"14px"}}}
                        value={variant?.discount}
                        onChange={(e) =>
                        handleValueChange(variant?.id, "discount", e.target.value)
                        }
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <Select value={variant?.discountType} disableUnderline onChange={(e)=>handleValueChange(variant?.id,"discountType",e.target.value)} size="small" variant="standard">
                              <MenuItem value="percentage">%</MenuItem>
                              <MenuItem value="rupees">₹</MenuItem>
                            </Select>
                          ),
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center" size="small">
                    <TextField
                      size="small"
                      type="number"
                      fullWidth
                      value={variant?.maxDiscount}
                       onChange={(e) =>
                        handleValueChange(variant?.id, "maxDiscount", e.target.value)
                      }
                      sx={{".MuiInputBase-root": {fontSize:"14px"}}}
                      placeholder="MaxDiscount"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextField size="small" type="number" value={variant?.stock}  placeholder="Stock" onChange={(e) =>
                        handleValueChange(variant?.id, "stock", e.target.value)
                      } />
                  </TableCell>
                  {/* <TableCell align="center" padding="0px" width={"190px"}>
                    {"PRO-001-" +
                      variant.variant +
                      "-" +
                      (variant.variant === "Color"
                        ? variant.color
                        : variant.value)}
                  </TableCell> */}
                  <TableCell align="center"  sx={{width:"8%"}}>
                    <IconButton onClick={() => handleDeleteVariant(variant?.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
                </>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={editVarAdd} fullWidth>
              <DialogTitle sx={{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid",borderColor:alpha("#000",0.2)}}>
                <Typography variant="h5" >Add Variant</Typography>
                <IconButton onClick={()=>setAddVar(false)}><Close/></IconButton>
              </DialogTitle>
              <DialogContent>
                <Box position={"relative"} pt={2} width={"100%"}>
                { variantData.image &&
                      <Close fontSize="small" onClick={()=>{setVariantData(prev=>{return {...prev,"image":null}})}}  sx={{position:"absolute" ,top:0,right:0,cursor:"pointer"}}/>
                    }
                    {
                      loadingId === searchParams.get("productId") &&
                      <Box position={"absolute"} top={0} left={0} width={"100%"} height={"100%"} zIndex={10} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <CircularProgress/>
                      </Box>
                    }
                    <label htmlFor={`upload-image`}>
                    <input
                      type="file"
                      accept="image/*"
                      id={`upload-image`}
                      name="image"
                      onChange={handleSingleVarImageUpload}
                      onClick={(e) => (e.target.value = null)}
                      style={{ display: "none" }}
                    />
                      <img
                        src={variantData?.image ? variantData?.image : defaultImage}
                        alt="image"
                        style={{
                          width: "100%",
                          cursor: "pointer",
                          height:"auto",
                          aspectRatio: "16/9",
                        }}
                      />
                    </label>
                </Box>
                <Box pt={2} display={"flex"} gap={1} width={"100%"}>
                <Box display={"flex"} flexDirection={"column"} width={"100%"}>
                  <Typography>Variant</Typography>
                    <Select
                      size="small"
                      value={variantData.variantType}
                      name="variantType"
                      fullWidth
                      onChange={handleChange}
                    >
                      <MenuItem value="Color">Color</MenuItem>
                      <MenuItem value="Size">Size</MenuItem>
                    </Select>
                </Box>
                <Box display={"flex"} flexDirection={"column"} width={"100%"}>
                  <Typography>Value</Typography>
                      <TextField
                        size="small"
                        placeholder="value"
                        value={variantData?.name}
                        name="name"
                        fullWidth
                        onChange={handleChange}
                      />
                </Box>
                </Box>
                <Box pt={2} display={"flex"} gap={1} width={"100%"}>
                <Box display={"flex"} flexDirection={"column"} width={"100%"}>
                  <Typography>Price</Typography>
                    <TextField
                      type="number"
                      InputProps={{startAdornment:<span style={{paddingRight:"5px"}}>₹</span>}}
                      size="small"
                      fullWidth
                      value={variantData?.price}
                      name="price"
                      onChange={handleChange}
                    />
                </Box>
                <Box display={"flex"} flexDirection={"column"} width={"100%"}>
                  <Typography>Stock</Typography>
                     <TextField size="small" type="number" value={variantData?.stock} name="stock" onChange={handleChange} />
                </Box>
                </Box>
                <Box pt={2} display={"flex"} gap={1} width={"100%"}>
                <Box display={"flex"} flexDirection={"column"} width={"100%"}>
                  <Typography>Discount</Typography>
                    <TextField
                        size="small"
                        type="number"
                        sx={{".MuiInputBase-root": {fontSize:"14px"}}}
                        value={variantData?.discount}
                        name="discount"
                        onChange={handleChange}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <Select value={variantData?.discountType} name="discountType" disableUnderline onChange={handleChange} size="small" variant="standard">
                              <MenuItem value="percentage">%</MenuItem>
                              <MenuItem value="rupees">₹</MenuItem>
                            </Select>
                          )
                        }}
                      />
                </Box>
                <Box display={"flex"} flexDirection={"column"} width={"100%"}>
                  <Typography>Max Discount</Typography>
                      <TextField
                      size="small"
                      type="number"
                      fullWidth
                      value={variantData?.maxDiscount}
                      name="maxDiscount"
                      onChange={handleChange}
                    />
                </Box>
                </Box>
              </DialogContent>
              <DialogActions sx={{borderTop:"1px solid",borderColor:alpha("#000",0.2)}}>
                <Button variant="contained">
                  Add variant
                </Button>
                <Button variant="outlined" onClick={()=>setAddVar(false)}>
                  Cancle
                </Button>
              </DialogActions>
      </Dialog>
    </Box>
  );
};
export default VariantPage;
