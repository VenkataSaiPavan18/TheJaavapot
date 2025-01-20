import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card.jsx";
import { ApiPath } from "../../../config/index.js";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/system";
import Aos from "aos";
import ToggleNavIcon from "../../../components/toggleButtons/ToggleNavIcon.jsx";
import ReadyToCook from "../../../assets/components/ReadyToCook.png";
import ReadyToEat from "../../../assets/components/ReadyToEat.png";
import COMBOSnew from "../../../assets/components/Combonew.png";

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

const TabButton = styled("button")(({ active }) => ({
  backgroundColor: active ? "#FD7E4B" : "white",
  color: active ? "#fff" : "#333",
  border: "none",
  padding: "10px 20px",
  margin: "0 5px",
  borderRadius: '10px',
  cursor: "pointer",
  fontSize: "20px",
  fontWeight: active ? "bold" : "normal",
  "&:hover": {
    backgroundColor: active ? "#e06d43" : "#e6e6e6",
  },
}));

const MenuSectionWrapper = styled("div")({
  textAlign: "center",
  marginTop: "0px",
  fontFamily: "Arial,sans-serif",
  // backgroundColor: "#FDF0DD", 
  color: "#333",
  padding: "50px 0", 
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const MenuSection = () => {
  const [foodData, setFoodData] = useState([]);
  const [filteredFoodData, setFilteredFoodData] = useState([]);
  const [mainCategory, setMainCategory] = useState("ReadyToCook");
  const [page, setPage] = useState(1);
  const [userCity, setUserCity] = useState('');
  const itemsPerPage = 6;
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [myCity, setMyCity] = useState('');
  // const navLabels = ["ReadyToCook", "ReadyToEat", "Combos"];
  // const navLabels = [
  //   { label: "Ready To Cook", value: "ReadyToCook" },
  //   { label: "Ready To Eat", value: "ReadyToEat" },
  //   { label: "Combos", value: "Combos" },
  // ];
  const navLabels = [
    { label: "Ready To Cook", value: "ReadyToCook", icon: ReadyToCook },
    { label: "Ready To Eat", value: "ReadyToEat", icon: ReadyToEat },
    { label: "Combos", value: "Combos", icon: COMBOSnew },
  ];

  const nav = useNavigate();

  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${ApiPath}jaavapotmenu/api/products`);
        const data = await response.json();
        setFoodData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterFoodData();
  }, [foodData, mainCategory, page]);

  const filterFoodData = () => {
    let filteredData = foodData;

    if (mainCategory !== "All") {
      filteredData = filteredData.filter(
        (item) => item.maincategory === mainCategory
      );
    }

    setFilteredFoodData(filteredData);
  };

  const handleMainCategoryChange = (category) => {
    setMainCategory(category);
    setPage(1); // Reset to the first page when changing main category
  };

  const handleCloseModal = () => {
    setIsLocationModalOpen(false);
  };
  const handleOpenModal = () => {
    setIsLocationModalOpen(true);
  };

  useEffect(() => {
    const fetchSelectedCity = async () => {
      const city = localStorage.getItem("myCity");
      if (city) {
        setMyCity(city);
      } else {
        setIsLocationModalOpen(true); // Open modal if no city is found
      }
      // console.log('city', city); 
    };
    fetchSelectedCity();
  }, []);

  const handleCityChange = (city) => {
    setMyCity(city); // Ensure this updates the city state
    localStorage.setItem("myCity", city); // Store in localStorage for persistence
  };

  return (
    <MenuSectionWrapper>
    <h2
      data-aos="zoom-in"
      style={{
        color: "#FD7E4B",
        fontFamily: "Arial",
        fontSize: "30px",
        fontWeight: 700,
        lineHeight: "41px",
        paddingBottom: "20px",
        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)"
      }}
    >
      Wanna Prioritize Health? See Our Menu!
    </h2>
    <div>
    </div>
 
    <div className="d-flex justify-content-center m-3">
      <ToggleNavIcon navLabels={navLabels} handleMainCategoryChange={handleMainCategoryChange}/>
      {/* <ToggleNav navLabels={navLabels} handleMainCategoryChange={handleMainCategoryChange}/> */}
    </div>
    <div className="container d-flex flex-wrap justify-content-center">
      {filteredFoodData.map((item) => (
        <div
          key={item._id}
          data-aos="fade-up"
          data-aos-delay={Math.random() * 100} // Slight delay for a staggered effect
        >
          <Card foodItem={item} userCity={myCity} />
        </div>
      ))}
    </div>
  </MenuSectionWrapper>
  );
};

export default MenuSection;
