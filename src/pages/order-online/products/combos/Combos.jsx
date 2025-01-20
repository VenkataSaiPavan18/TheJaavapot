import React, { useState, useEffect } from "react";
import "../../../../components/homepagenew/Whatsnew.css";
import { ApiPath } from "../../../../config/index.js";
import { styled } from "@mui/system";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";
import Card from "../../../newHome/components/Card.jsx";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { myColors } from "../../../../contants/Colors.js";
import CustomizeCombos from "./components/Costomized.jsx";

const CustomPagination = styled(Pagination)({
  "& .MuiPaginationItem-root": {
    backgroundColor: "#FD7E4B",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#e06d43",
    },
    "&.Mui-selected": {
      backgroundColor: "#FD7E4B",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#e06d43",
      },
    },
  },
});

const Heading = styled(Typography)({
  fontFamily: "Arial, sans-serif",
  fontSize: "26px",
  fontWeight: "bold",
  color: myColors.primaryGray,
  textAlign: "center",
  marginBottom: "20px",
  marginTop: "20px",
  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
});

const TabButton = styled(motion.button)(({ active }) => ({
  backgroundColor: active ? "#FD7E4B" : '#E8E8E8',
  color: active ? "#fff" : "#333",
  border: "none",
  padding: "10px 20px",
  margin: "5px",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: active ? "600" : "normal",
  "&:hover": {
    backgroundColor: active ? "#e06d43" : "#e6e6e6",
  },
}));

const TabContainer = styled("div")(({ isMobile }) => ({
  display: "grid",
  gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr",
  // gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fit, minmax(100px, auto))",
  gap: "10px",
  justifyContent: "center",
  alignItems: "center",
  margin: "10px 100px",
}));

const Combos = () => {
  const [foodData, setFoodData] = useState([]);
  const [filteredFoodData, setFilteredFoodData] = useState([]);
  const [categories, setCategories] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${ApiPath}jaavapotmenu/api/products`);
        const data = await response.json();
        const readyToCookData = data.filter(
          (item) => item.maincategory === "Combos"
        );
        setFoodData(readyToCookData);

        const uniqueCategories = [
          ...new Set(readyToCookData.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredFoodData(foodData);
  }, [foodData]);

  const filterByCategory = (category) => {
    if (category === "All") {
      setFilteredFoodData(foodData);
    } else {
      setFilteredFoodData(
        foodData.filter((item) => item.category === category)
      );
    }
  };

  return (
    <div>
      <Helmet>
        <title>ORDER NOW</title>
      </Helmet>
      <Heading>Products: Look Into Our Healthy and Tasty Menu</Heading>

      {/* Category Buttons */}
      <TabContainer isMobile={isMobile}>
        {categories.map((category) => (
          <TabButton
            key={category}
            active={filteredFoodData.some((item) => item.category === category)}
            onClick={() => filterByCategory(category)}
          >
            {category}
          </TabButton>
        ))}
        <TabButton
          active={filteredFoodData.length === foodData.length}
          onClick={() => filterByCategory("All")}
        >
          All
        </TabButton>
      </TabContainer>

      {/* Product Cards */}
      <div className="container d-flex flex-wrap justify-content-center">
        {filteredFoodData.map((item) => (
          <Card key={item._id} foodItem={item} />
        ))}
      </div>
      <CustomizeCombos/>
    </div>
  );
};

export default Combos;
