import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FieldButton from "../CommonComponent/FieldButton";
import OutlineButton from "../CommonComponent/OutlineButton";


const editdialog = ({ open, onClose, variant, onSave }) => {
    const [editedVariant, setEditedVariant] = useState({
        variantname: "",
        variantprice: "",
        variantstock: "",
    });

    useEffect(() => {
        if (variant) {
            setEditedVariant(variant);
        }
    }, [variant]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedVariant((prevVariant) => ({
            ...prevVariant,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onSave(editedVariant);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Variant</DialogTitle>
            <DialogContent>
                <TextField
                    name="variantname"
                    placeholder="Variantname"
                    value={editedVariant.variantname}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    name="variantprice"
                    placeholder="Variantprice"
                    value={editedVariant.variantprice}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{marginTop: "2%"}}
                />
                <TextField
                    name="variantstock"
                    placeholder="Variantstock"
                    value={editedVariant.variantstock}
                    onChange={handleInputChange}
                    fullWidth
                    sx={{marginTop: "2%"}}
                />
            </DialogContent>
            <DialogActions>
                <OutlineButton onClick={onClose} title={"Cancel"}/>
                <FieldButton  title={"Save"}/>
            </DialogActions>
        </Dialog>
    );
};

export default editdialog