
import React from "react";
import { useNavigate } from "react-router-dom"; 
import { Container, Grid, Box, Typography, Button, useMediaQuery, useTheme, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import img01 from "../../../../assets/home/promotional/card02.png";
import img03 from "../../../../assets/home/promotional/cardBg01.png";
import img04 from "../../../../assets/home/promotional/googleReview.png";
import img05 from "../../../../assets/home/promotional/zomatoReview.png";
import mobile from "../../../../assets/home/promotional/mobile.png";
import logo from "../../../../assets/home/promotional/logo.png";

const EmphasizedText = styled(Typography)({
  color: "#FD7E4B",
  fontFamily: "Arial",
  fontSize: "24px",
  fontWeight: 700,
  // lineHeight: "52px",
});

const ExploreMoreButton = styled(Button)({
  borderRadius: "20px",
  border: "1px solid #FD7F4C",
  backgroundColor: "#FFF",
  color: "#FD7E4B",
  padding: "10px 20px",
  textTransform: "none",
  fontFamily: "Arial",
  fontWeight: 700,
  fontSize: "18px",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#e6693b",
    borderColor: "#e6693b",
    color:'#FFF',
  },
  // marginBottom:'30px'
});

const ColoredBar = styled(Box)({
  backgroundColor: "#FD7E4B",
  height: "15px",
  width: "100%",
  marginTop: "30px",
});

const NavigationButton = styled(IconButton)({
  color: "#FD7E4B",
  "&:hover": {
    color: "#e6693b",
  },
});

const PromotionalCardTwo = () => {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  
  const HeaderOne = styled(Typography)({
    color:isMobileOrTablet ? "#FD7E4B" : "#FFF",
    // color: "#FFF",
    fontFamily: "Arial",
    fontSize: "45px",
    fontWeight: 700,
    lineHeight: "60px",
    fontStyle:'normal',
    // marginTop:'30px'
  });

  const HeaderTwo = styled(Typography)({
    color: isMobileOrTablet ? "#FD7E4B" : "#FFF",
    fontFamily: "Arial",
    fontSize: "46px",
    fontWeight: 700,
    lineHeight: "60px",
  });

  const handleOrderNowClick = () => {
    window.location.href = "https://play.google.com/store/apps/details?id=com.mohsin_sangram.TheJaavaPot";
    window.scrollTo(0, 0);
  };

  // const handleOrderNowClick = () => {
  //   navigate("/contact");
  //   window.scrollTo(0, 0);
  // };

  return (
    <div
      style={{
        backgroundImage: isMobileOrTablet ? "none" : `url(${img03})`,
        backgroundColor: isMobileOrTablet ? "#FDF0DD" :"#FDF0DD" ,
        // backgroundImage: `url(${img03})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "5px",
        borderRadius:"80px", 
        marginTop:'250px'
      }}
    >
      <Container>
        <Grid container spacing={10} alignItems="center" marginTop='0px' >
          {isMobileOrTablet ? (
             <>
             <Grid item xs={12} style={{ textAlign: 'center' }}>
               <HeaderOne>We are available in</HeaderOne>
               <HeaderTwo>Ecommerce!</HeaderTwo>
               <ExploreMoreButton variant="outlined"  onClick={handleOrderNowClick} >Visit Our Product</ExploreMoreButton>
             </Grid>
             <Grid item xs={12} style={{ display:"flex",flexDirection:"row", justifyContent:"center",alignItems:"center" }}>
               <img
                 src={mobile}
                 alt="Mobile Image"
                 style={{ width: "200px", height: "auto", objectFit: "contain", margin: "20px 0" }}
               />
             </Grid>
             <Grid item xs={12} style={{ display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center" }}>
               <img
              
                 src={img04}
                 alt="Google Review"
                 style={{ width: "120px", height: "auto", objectFit: "contain", margin: "0 10px" }}
               />
               <img
               
                 src={img05}
                 alt="Zomato Review"
                 style={{ width: "120px", height: "auto", objectFit: "contain", margin: "0 10px" }}
               />
             </Grid>
             <Grid item xs={12} style={{ textAlign: 'center' }}>
               <img
                 src={logo}
                 alt="Logo"
                 style={{ width: "220px", height: "auto", objectFit: "contain", marginTop: '20px' }}
               />
             </Grid>
           </>
            // <>
            //   <Grid item xs={12} md={6}>

            //     <img
            //       src={img01}
            //       alt="About Us"
            //       style={{ width: "100%", height: "auto", objectFit: "contain" }}
            //     />
            //   </Grid>
            //   <Grid item xs={12} md={6} style={{ paddingTop: 0 }}>
            //     <HeaderOne>We are ready to</HeaderOne>
            //     <Box display="flex" alignItems="center">
            //       <HeaderTwo>Distributors Partnership</HeaderTwo>
            //     </Box>
            //     <p
            //       style={{
            //         fontSize: "22px",
            //         width: "120%",
            //         fontFamily: "Arial",
            //         fontWeight: "400",
            //       }}
            //     >
            //       Tiny seeds,{" "}
            //       <EmphasizedText component="span">Big Health</EmphasizedText>{" "}
            //       Elevate
            //       <EmphasizedText component="span"> every meal</EmphasizedText> into
            //       a superfood <br />
            //       sensation. In the symphony of superfoods, let millets play the
            //       lead <br />
            //       role, harmonizing health and taste for a nutrient-packed life.
            //     </p>
            //     <ExploreMoreButton variant="outlined" onClick={handleOrderNowClick}>Contact Us</ExploreMoreButton>
            //     <ColoredBar />
            //   </Grid>
            // </>
          ) : (
            <>
               <Grid item xs={12} md={7} style={{ display: "flex", alignItems: "center", paddingTop: "60px",borderRadius:"30px"  }}>
                <img
                  src={mobile}
                  alt="Mobile Image"
                  style={{ width: "200px", height: "auto", objectFit: "contain",borderRadius:"30px" }}
                />
                <div style={{ marginLeft: theme.spacing(2),borderRadius:"30px"  }}>
                  <HeaderOne>We are available in</HeaderOne>
                  <HeaderTwo>Ecommerce!</HeaderTwo>
                  <ExploreMoreButton variant="outlined" onClick={handleOrderNowClick}>Visit Our Product</ExploreMoreButton>
                </div>
              </Grid>
              <Grid item xs={12} md={5}>
                <div className="d-flex">

              <img
                  src={img04}
                  alt="Mobile Image"
                  style={{ width: "120px", height: "auto", objectFit: "contain",marginRight:'15px' }}
                />
                 <img
                  src={img05}
                  alt="Mobile Image"
                  style={{ width: "120px", height: "auto", objectFit: "contain" }}
                />
                </div>

                <div style={{top:'15px',right:'30px',position:'absolute'}}>

                <img
                  src={logo}
                  alt="About Us"
                  style={{ width: "220px", height: "auto", objectFit: "contain" }}
                />
                </div>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default PromotionalCardTwo;
