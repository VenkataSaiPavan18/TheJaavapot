import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Castle, Shield, EmojiEvents } from "@mui/icons-material"; // Valid imports
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import subscriptionPlans from "../../contants/SubscriptionPlan";
import { useDispatchCart, useCart } from "../../store/ContextReducer";
import CustomizedSubscription from "./components/CostomizedSubscription";
import { myColors } from "../../contants/Colors";

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatchCart();
  const cart = useCart();
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [...new Set(subscriptionPlans.map((plan) => plan.category))];
  const icons = [Castle, Shield, EmojiEvents]; // Dynamic icon array

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = async (plan) => {
    const basicPrice = parseInt(plan.actualPrice || 0);
    const discountedPrice = parseInt(plan.discountedPrice || 0);
    await addFoodToCart(plan, discountedPrice, basicPrice);
  };

  const addFoodToCart = async (plan, finalPrice, basicPrice) => {
    const food = cart.find((item) => item.id === plan._id);

    if (food) {
      await dispatch({
        type: "UPDATE",
        id: plan._id,
        price: finalPrice * (food.qty + 1),
        qty: food.qty + 1,
      });
    } else {
      await dispatch({
        type: "ADD",
        id: plan._id,
        name: plan.itemName,
        description: plan.description,
        price: finalPrice,
        qty: 1,
        img: plan.imagePath,
        basicPrice,
        mainCategory: plan.mainCategory,
        category: plan.category,
      });
    }
    toast.success(`Added item ${plan.itemName} to your cart`);
  };

  return (
    <Box p={4}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: "26px",
          fontWeight: "bold",
          color: myColors.primaryOrange,
          textAlign: "center",
          marginBottom: "20px",
          marginTop: "20px",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
        }}
      >
        Subscription Plans
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          fontSize: "18px",
          fontWeight: "600",
          color: myColors.primaryGray,
          textAlign: "center",
          marginBottom: "20px",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
        }}
        gutterBottom
      >
        Choose the best subscription plan tailored to your needs and enjoy the
        goodness of millet-based ready-to-cook products.
      </Typography>

      <ToggleButtonGroup
  value={selectedCategory}
  exclusive
  onChange={(e, newCategory) => handleCategoryClick(newCategory)}
  sx={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "30px",
    // gap: "10px",
  }}
>
  {/* Add "All" Category */}
  <ToggleButton
    value=""
    selected={selectedCategory === ""}
    sx={{
      display: "flex",
      alignItems: "center",
      borderRadius: "20px",
      fontSize: "14px",
      padding: "10px 20px",
      border: `2px solid ${myColors.primaryOrange}`,
      backgroundColor: selectedCategory === "" ? myColors.primaryOrange : "transparent",
      color: selectedCategory === "" ? "#fff" : myColors.primaryOrange,
      animation: selectedCategory !== "" ? "blinking 1.5s infinite" : "none",
      "@keyframes blinking": {
        "0%": { opacity: 1 },
        "50%": { opacity: 0.5 },
        "100%": { opacity: 1 },
      },
      "&:hover": {
        backgroundColor: selectedCategory === "" ? myColors.primaryOrange : "#ffeedb",
      },
    }}
  >
    All
  </ToggleButton>

  {/* Dynamic Categories */}
  {categories.map((category, index) => {
    const Icon = icons[index % icons.length];
    return (
      <ToggleButton
        key={category}
        value={category}
        selected={selectedCategory === category}
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: "20px",
          fontSize: "14px",
          padding: "10px 20px",
          border: `2px solid ${myColors.primaryOrange}`,
          backgroundColor: selectedCategory === category ? myColors.primaryOrange : "transparent",
          color: selectedCategory === category ? "#fff" : myColors.primaryOrange,
          
          animation:
            selectedCategory !== category
              ? "blinking 1.5s infinite"
              : "none",
          "@keyframes blinking": {
            "0%": { opacity: 1 },
            "50%": { opacity: 0.5 },
            "100%": { opacity: 1 },
          },
          "&:hover": {
            backgroundColor: selectedCategory === category ? myColors.primaryOrange : "#ffeedb",
          },
        }}
      >
        <Icon sx={{ marginRight: "8px" }} />
        {category}
      </ToggleButton>
    );
  })}
</ToggleButtonGroup>
      <Grid container spacing={3} sx={{ justifyContent: "center" }}>
  {subscriptionPlans
    .filter((plan) => !selectedCategory || plan.category === selectedCategory)
    .map((plan) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={plan._id}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%", // Responsive width
            maxWidth: "260px", // Constrain width
            height: "360px", // Reduced height
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "12px",
            transition: "transform 0.3s, box-shadow 0.3s",
            overflow: "hidden",
            margin: "0 auto", // Center on mobile
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            },
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={plan.imagePath}
            alt={plan.itemName}
            sx={{
              objectFit: "cover",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
            }}
          />
          <CardContent sx={{ padding: "12px" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "16px" }}>
              {plan.itemName}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              paragraph
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: 2,
                fontSize: "14px",
              }}
            >
              {plan.description}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontSize: "18px", fontWeight: "700", color: myColors.primaryOrange }}
            >
              ₹{plan.discountedPrice}{" "}
              <Typography
                component="span"
                sx={{
                  fontSize: "12px",
                  fontWeight: "500",
                  color: myColors.primaryGray,
                  textDecoration: "line-through",
                  marginLeft: "8px",
                }}
              >
                ₹{plan.actualPrice}
              </Typography>
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ marginTop: "8px", fontSize: "12px" }}
            >
              {plan.duration}
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 1,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddToCart(plan)}
              sx={{
                fontSize: "12px",
                padding: "6px 12px",
                textTransform: "capitalize",
                borderRadius: "16px",
                backgroundColor: myColors.primaryOrange,
                "&:hover": {
                  backgroundColor: "#ff7b42",
                },
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Card>
      </Grid>
    ))}
</Grid>
      <CustomizedSubscription />
    </Box>
  );
};

export default SubscriptionPage;
