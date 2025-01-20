import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  width: 350,
  margin: "20px",
  position: "relative",
  overflow: "visible",
  paddingTop: "25px", // to make space for the offset image
});

const StyledImage = styled("img")({
  borderRadius: "10px",
  width: "100%",
  height: "300px",
  position: "absolute",
  top: "-25px",
  right: "-15px",
  objectFit: "cover",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
});

const AddressTypography = styled(Typography)({
  fontFamily: "Arial, sans-serif",
  fontSize: "18px",
  fontWeight: 500,
  color: "#333",
  marginTop: "10px",
});

const NameTypography = styled(Typography)({
  fontFamily: "Arial, sans-serif",
  fontSize: "22px",
  fontWeight: 700,
  color: "#333",
  marginTop: "310px", // to ensure text appears below the image
});

const OutletCard = ({ outlet }) => {
  return (
    <StyledCard>
      <StyledImage src={outlet.image} alt={`Outlet`} />
      <CardContent>
        <NameTypography>{outlet.name}</NameTypography>
        <AddressTypography>{outlet.address}</AddressTypography>
      </CardContent>
    </StyledCard>
  );
};

export default OutletCard;
