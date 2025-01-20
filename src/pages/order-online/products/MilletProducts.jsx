import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../components/homepagenew/Whatsnew.css";
import { ApiPath } from "../../../config/index.js";
import { styled } from "@mui/system";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import Card from "../../newHome/components/Card.jsx";
import { Helmet } from "react-helmet";

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
  fontSize: "36px",
  fontWeight: "bold",
  color: "#FD7E4B",
  textAlign: "center",
  marginBottom: "20px",
  marginTop: "20px",
  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
});

const TabButton = styled("button")(({ active }) => ({
  backgroundColor: active ? "#FD7E4B" : "white",
  color: active ? "#fff" : "#333",
  border: "none",
  padding: "10px 20px",
  margin: "0 5px",
  borderRadius: '10px',
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: active ? "bold" : "normal",
  "&:hover": {
    backgroundColor: active ? "#e06d43" : "#e6e6e6",
  },
}));

const MilletProductsWrapper = styled("div")({
  textAlign: "center",
  marginTop: "0px",
  fontFamily: "Arial,sans-serif",
  // backgroundColor: "#FDF0DD",
  color: "#333",
  padding: "50px 0",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const MilletProducts = () => {
  const [foodData, setFoodData] = useState([]);
  const [filteredFoodData, setFilteredFoodData] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [userCity, setUserCity] = useState('');
  const nav = useNavigate();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [myCity, setMyCity] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${ApiPath}jaavapotmenu/api/products`);
        const data = await response.json();
        const readyToCookData = data.filter(
          (item) => item.maincategory === "ReadyToCook"
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

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setFilteredFoodData(
      foodData.filter((item) =>
        item.itemname.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  // useEffect(() => {
  //   fetchUserLocation();
  // }, []);

  // const fetchUserLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
  //           .then(response => response.json())
  //           .then(data => {
  //             const userLocation = data.city;
  //             setUserCity(userLocation);
  //           })
  //           .catch(error => {
  //             console.error('Error fetching location:', error);
  //             toast.error('Failed to fetch location');
  //           });
  //       },
  //       (error) => {
  //         console.error('Error getting user location:', error);
  //         toast.error('Failed to get user location');
  //       }
  //     );
  //   } else {
  //     console.error('Geolocation is not supported by this browser');
  //     toast.error('Geolocation is not supported by this browser');
  //   }
  // };

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

  return (
    <MilletProductsWrapper>
       <Helmet>
        <title>ORDER NOW</title>
        <meta
          name="description"
          content="Whether you're looking for a quick meal solution or a healthy snack, Thejaavapot has got you covered. Order Us  in embracing the rich flavors and health benefits of millets with our easy-to-prepare culinary creations!
Categories: Soups , porridges and Beverages."
        />
        <meta
          name="keywords"
          content="ORDER NOW,tjp,TheJaavapot, millets, porridges,malakpet,hyderabad,telengana"
        />
      </Helmet>
      <Heading>Products: Look Into Our Healthy and Tasty Menu</Heading>
      <div className="d-flex justify-content-center m-3">
      {/* <Button onClick={handleOpenModal} style={{fontWeight:"bold"}}>Change Location</Button>
      <LocationModal open={isLocationModalOpen} onClose={handleCloseModal} /> */}
    </div>
      {/* <LocationModal open={isLocationModalOpen} onClose={handleCloseModal} /> */}
      <div className="d-flex justify-content-center m-3">
        <input
          className="form-control me-2 w-75 bg-white text-dark "
          type="search"
          placeholder="Type your favorite Superfood...."
          aria-label="Search"
          value={search}
          onChange={handleSearch}
          style={{boxShadow:"0px 2px 3px 1px #fd7e14",fontWeight:"bold",fontSize:"14px"}}
        />
      </div>

      <div className="d-flex justify-content-center m-3">
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
      </div>

      <div className="container d-flex flex-wrap justify-content-center">
        {filteredFoodData.map((item) => (
          <div key={item._id}>
            <Card foodItem={item} userCity={myCity} />
          </div>
        ))}
      </div>
      
    </MilletProductsWrapper>
  );
};

export default MilletProducts;
