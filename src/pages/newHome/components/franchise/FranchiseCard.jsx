import React from "react";
import { Card, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ index }) => ({
  width: `${576 - index * 100}px`,
  height: `${731 - index * 100}px`,
  flexShrink: 0,
  position: "relative",
  margin: "0 10px",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
  "@media (max-width: 768px)": {
    width: "90%",
  },
}));

const StyledImage = styled("img")({
  borderRadius: "15px",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "opacity 0.3s ease-in-out",
  "&:hover": {
    opacity: 0.8,
  },
});

const NameTypography = styled(Typography)({
  position: "absolute",
  bottom: "10px",
  left: "10px",
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  padding: "10px",
  fontSize: "18px",
  fontWeight: "bold",
  borderRadius: "5px",
  transition: "opacity 0.3s ease-in-out",
  opacity: 0,
  "&:hover": {
    opacity: 1,
  },
});

const FranchiseCard = ({ franchise, index }) => {
  return (
    <StyledCard index={index}>
      <StyledImage src={franchise.image} alt={`Franchise ${index + 1}`} />
      <NameTypography>{franchise.name}</NameTypography>
    </StyledCard>
  );
};

export default FranchiseCard;
