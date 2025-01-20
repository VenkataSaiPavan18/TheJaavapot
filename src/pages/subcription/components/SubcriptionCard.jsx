import React, { useState, useEffect } from "react";
import { useDispatchCart, useCart } from "../../../store/ContextReducer";
import { useNavigate } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Button, IconButton, Box, TextField } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import newcardbg01 from "../../../assets/home/newcardbg01.png";
import newcardbg02 from "../../../assets/home/newcardbg02.png";
import "../../newHome/components/CardStyles.css";
import { myColors } from "../../../contants/Colors";

export default function SubcriptionCard({ foodItem }) {
    const nav = useNavigate();
    const dispatch = useDispatchCart();
    const data = useCart();
    const [qty, setQty] = useState(1);
    const [hover, setHover] = useState(false);
    console.log('foodItem', foodItem);


    const handleAddToCart = async () => {
        const finalPrice = qty * parseInt(foodItem.actualPrice || 0);

        if (foodItem.maincategory === "ReadyToEat") {
            toast.error("We currently serve Hyderabad only for ReadyToEat items.");
        } else {
            let food = data.find((item) => item.id === foodItem._id);
            if (food) {
                await dispatch({
                    type: "UPDATE",
                    id: foodItem._id,
                    price: finalPrice,
                    qty,
                });
            } else {
                await dispatch({
                    type: "ADD",
                    id: foodItem._id,
                    name: foodItem.itemname,
                    price: finalPrice,
                    qty,
                    img: foodItem.imagepath,
                    maincategory: foodItem.maincategory,
                });
            }
            toast.success(`${foodItem.itemname} added to cart.`);
        }
    };

    const handleIncrement = () => setQty(qty + 1);
    const handleDecrement = () => qty > 1 && setQty(qty - 1);

    return (
        <Card
            className={`custom-card ${hover ? "hover" : ""}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            sx={{
                backgroundImage: `url(${hover ? newcardbg02 : newcardbg01})`,
                transition: "background-image 0.3s",
                borderRadius: "20px",
                boxShadow: hover ? "0px 8px 15px rgba(0, 0, 0, 0.2)" : "none",
            }}
        >
            <CardMedia
                component="img"
                image={foodItem.imagepath}
                alt={foodItem.itemname}
                sx={{ height: "200px", objectFit: "cover", borderRadius: "10px" }}
            />
            <CardContent sx={{ padding: "10px" }}>
                <Typography
                    variant="h6"
                    sx={{ fontSize: "18px", fontWeight: "bold", marginBottom: "5px" }}
                >
                    {foodItem.itemname}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{
                    color: myColors.primaryOrange, fontFamily: 'sans-serif', fontWeight: '500', fontSize: '20px', whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>
                    {foodItem.description}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "10px",
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        ₹{qty * parseInt(foodItem.price || 0)}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                            onClick={handleDecrement}
                            sx={{ color: "white", backgroundColor: "#FD7E4B", "&:hover": { backgroundColor: "#e06d42" } }}
                        >
                            <RemoveIcon />
                        </IconButton>
                        <TextField
                            value={qty}
                            inputProps={{ readOnly: true }}
                            sx={{
                                width: "40px",
                                textAlign: "center",
                                border: "none",
                                fontSize: "16px",
                                fontWeight: "bold",
                            }}
                        />
                        <IconButton
                            onClick={handleIncrement}
                            sx={{ color: "white", backgroundColor: "#FD7E4B", "&:hover": { backgroundColor: "#e06d42" } }}
                        >
                            <AddIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Button
                    onClick={handleAddToCart}
                    fullWidth
                    sx={{
                        marginTop: "10px",
                        backgroundColor: "#FD7E4B",
                        color: "white",
                        "&:hover": { backgroundColor: "#e06d42" },
                    }}
                >
                    ADD TO CART
                </Button>
            </CardContent>
        </Card>
    );
}



