import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from "@mui/system";
import "../../../components/homepagenew/Whatsnew.css";
import { ApiPath } from '../../../config/index.js';
import Card from '../../newHome/components/Card.jsx';
import 'react-toastify/dist/ReactToastify.css';

const Heading = styled("h1")({
  fontFamily: "Arial, sans-serif",
  fontSize: "36px",
  fontWeight: "bold",
  color: "#FD7E4B",
  textAlign: "center",
  marginBottom: "20px",
  marginTop: "20px",
  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
});

const Notice = styled("p")({
  fontFamily: "Arial, sans-serif",
  fontSize: "16px",
  fontWeight: "bold",
  color: "#FD7E4B",
  textAlign: "center",
  marginBottom: "20px",
});


const TabButton = styled("button")(({ active }) => ({
  backgroundColor: active ? "#FD7E4B" : "rgba(247, 91, 7, 0.7)",
  color: active ? "#fff" : "#fff",
  border: "none",
  padding: "10px 20px",
  margin: "10px",
  borderRadius: '10px',
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: active ? "bold" : "normal",
  letterSpacing: "0.2px",
  boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    backgroundColor: active ? "#e06d43" : "#e6e6e6",
  },
}));

const OnlineOrderMenuWrapper = styled("div")({
  textAlign: 'center',
  fontFamily: "Arial,sans-serif",
  // backgroundImage: `url(${bgImage})`,
  // backgroundColor: "#FDF0DD",
  color: "#333",
  padding: "50px 0",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const NewOnlineordermenu = () => {
  const [foodData, setFoodData] = useState([]);
  const [filteredFoodData, setFilteredFoodData] = useState([]);
  const [search, setSearch] = useState('');
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
        const readyToEatData = data.filter(item => item.maincategory === "ReadyToEat");
        setFoodData(readyToEatData);

        const uniqueCategories = [...new Set(readyToEatData.map(item => item.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredFoodData(foodData);
  }, [foodData]);

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

  const filterByCategory = (category) => {
    if (category === "All") {
      setFilteredFoodData(foodData);
    } else {
      setFilteredFoodData(foodData.filter(item => item.category === category));
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setFilteredFoodData(foodData.filter((item) =>
      item.itemname.toLowerCase().includes(e.target.value.toLowerCase())
    ));
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
      console.log('city', city);
    };
    fetchSelectedCity();
  }, []);

  return (
    <OnlineOrderMenuWrapper>
      {/* <ToastContainer /> */}
      <Heading>Look Into Our Healthy and Tasty Menu</Heading>
      <Notice>Currently, we are only serving Ready to Eat foods for the Hyderabad location.</Notice>
      {/* <div>
      <Button onClick={handleOpenModal}>Open Cities</Button>
      <LocationModal open={isLocationModalOpen} onClose={handleCloseModal} />
    </div> */}
      <div className="d-flex justify-content-center m-3">
        <input
          className="form-control me-2 w-75 bg-white text-dark"
          type="search"
          placeholder="Type your favorite Superfood.. "
          aria-label="Search"
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="d-flex justify-content-center flex-wrap" style={{ marginTop: '20px' }}>
      {/* <ToggleNav
          navLabels={["Healthy Soups", "Healthy Porridges","Immunity Boosters", "All"]} // Your dynamic category labels
          handleMainCategoryChange={filterByCategory}
        /> */}
        {categories.map((category) => (
          <TabButton
            key={category}
            active={filteredFoodData.some(item => item.category === category)}
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
    </OnlineOrderMenuWrapper>
  );
};

export default NewOnlineordermenu;

