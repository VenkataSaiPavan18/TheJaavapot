import React from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import openIcon01 from "../../../assets/home/new-gif-01.gif";
import vission from "../../../assets/home/vission.svg";
import mission from "../../../assets/home/mission.svg";

const VisionText = styled(Typography)({
  color: "#434343",
  fontFamily: "Arial",
  fontSize: "32px",
  fontWeight: 700,
  lineHeight: "50px",
  letterSpacing: "1.6px",
  marginBottom: "16px",
  display: "flex",
  alignItems: "center",
  animation: "fadeIn 2s ease-in-out",
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
  paddingLeft: "50px",
  paddingTop: "10px",
});

const VisionLowerText = styled(Typography)({
  color: "#000",
  fontFamily: "Arial",
  fontSize: "22px",
  fontWeight: 400,
  lineHeight: "32px",
  letterSpacing: "0.66px",
});

const MissionText = styled(Typography)({
  color: "#434343",
  fontFamily: "Arial",
  fontSize: "32px",
  fontWeight: 700,
  lineHeight: "50px",
  letterSpacing: "1.6px",
  marginBottom: "24px",
  display: "flex",
  alignItems: "center",
  animation: "fadeIn 2s ease-in-out",
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
});

const MissionLowerText = styled(Typography)({
  color: "#000",
  fontFamily: "Arial",
  fontSize: "22px",
  fontWeight: 400,
  lineHeight: "32px",
  letterSpacing: "0.66px",
});

const TiltedBorder = styled("div")({
  width: "80px",
  height: "80px",
  transform: "rotate(45deg)",
  border: "2px solid gray",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: "20px",
});

const TiltedBorderMission = styled("div")({
  width: "150px",
  height: "150px",
  transform: "rotate(45deg)",
  border: "2px solid gray",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: "20px",
});

const Heading = styled("h1")({
  fontSize: "48px",
  color: "#FD7E4B",
  fontWeight: "700",
  fontFamily: "Arial",
  fontStyle: "normal",
  lineHeight: "60px",
  position: "relative",
  "&::before, &::after": {
    content: '""',
    position: "absolute",
    bottom: "-8px",
    height: "2px",
    width: "50%",
  },
  "&::before": {
    backgroundColor: "black",
    left: 0,
  },
  "&::after": {
    backgroundColor: "#FD7E4B",
    left: 0,
    bottom: "-14px",
  },
});

const StepContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "28px",
  animation: "fadeIn 2s ease-in-out",
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
});

const AboutUs = () => {
  return (
    <div style={{ 
      backgroundColor: "#FDF0DD", 
      // backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      padding: "0px 0" ,
      paddingTop:'50px'
      }}>
      <Container>
        <Grid container spacing={10} alignItems="center">
          <Grid item xs={12} md={6} className="d-none d-md-block">
            <img
              src="https://surveyappanswers.blob.core.windows.net/jaavapot/bg1.gif"
              alt="About Us"
              style={{ width: "100%", height: "100%", objectFit: "contain" ,borderRadius:"60px",boxShadow:"2px 6px 4px 2px black"}}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Heading>Our Vision & Mission</Heading>
            <VisionText>
              <TiltedBorder style={{ backgroundColor: "black" }}>
                <img
                  src={vission}
                  alt="Vision"
                  style={{
                    width: "46px",
                    transform: "rotate(-45deg)",
                    backgroundColor: "",
                  }}
                />
              </TiltedBorder>
              <div style={{ color: "" }}>
                Vision
                <VisionLowerText>
                  To have the Jaavapot in every kitchen.
                </VisionLowerText>
              </div>
            </VisionText>
            <MissionText>
              <TiltedBorder style={{ backgroundColor: "black" }}>
                <img
                  src={mission}
                  alt="Vision"
                  style={{ width: "46px", transform: "rotate(-45deg)" }}
                />
              </TiltedBorder>
              <div>
                Mission
                <VisionLowerText>
                  To make the next generations <br /> stronger and healthier by{" "}
                  <br /> introducing smart grains <br /> from the early stages
                  of life.
                </VisionLowerText>
              </div>
            </MissionText>
            {/* <MissionText>
              <TiltedBorderMission>
                <img src={mission} alt="Mission" style={{ width: "46px", transform: 'rotate(-45deg)' }} />
              </TiltedBorderMission>
              <div style={{marginLeft:'50px'}}>
                Mission
                <MissionLowerText>
                  To make the next generations stronger and healthier by introducing smart grains from the early stages of life.
                </MissionLowerText>
              </div>
            </MissionText> */}
            <Box display="flex" alignItems="center" justifyContent="center">
              <StepContainer>
                <img src={openIcon01} alt="steps" style={{ width: "100%" }} />
              </StepContainer>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AboutUs;
