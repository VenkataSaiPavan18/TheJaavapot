import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCheckCircle } from "react-icons/fa";
import { BiXCircle } from "react-icons/bi";
import { myColors } from "../../../../contants/Colors";
 
const DifferenceSection = () => {
  const features = [
    // {
    //   title: "Freshness Guarantee",
    //   description:
    //     "Do your food remain fresh with the aroma and flavor of teas remaining intact.",
    // },
    {
      title: "Premium Quality",
      description:
        "Sourced from the best estates ensuring the finest quality in every sip.",
    },
    {
      title: "Health Benefits",
      description: "Packed with antioxidants to promote a healthy lifestyle.",
    },
    {
      title: "Direct Sourcing",
      description:
        "Ethically sourced directly from farmers to ensure fair trade.",
    },
    {
      title: "Eco-Friendly Packaging",
      description: "Sustainable packaging to preserve the environment.",
    },
    {
      title: "Exceptional Taste",
      description:
        "Unparalleled flavor in every bowl for a delightful experience.",
    },
    {
      title: "Value Beyond Price",
      description:
        "Crafted using traditional techniques like solar drying and sourced directly from farms, each product reflects the love of nature and delivers unmatched quality without artificial or hybrid elements.",
    },
  ];
 
  return (
    <Container className="my-3">
      {/* Headings */}
      <Row className="text-center mb-3">
        <Col>
       
          <h5
           style={{
            color: "#FD7E4B",
            fontFamily: "Arial",
            fontSize: "40px",
            fontWeight: 700,
            lineHeight: "41px",
            paddingBottom: "20px",
          }}
          >
            The JaavaPot Connects Health With FOOD
          </h5>
          <p
            style={{
              fontFamily: "Verdana, sans-serif",
              fontSize: "0.9rem",
              color: "#777",
              marginTop: "0.25rem",
            }}
          >
            {/* Not to distributors. Not to resellers. But to Healthy life. */}
          </p>
        </Col>
      </Row>
 
      {/* Table */}
      <div style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid gray",}}>
      <Table bordered style={{ textAlign: "center", borderRadius:"20px"}}>
        <thead>
          <tr>
            <th
              style={{
                width: "60%",
                fontWeight: "700",
                padding: "0.75rem",
                fontFamily: "Arial, sans-serif",
                fontSize: "1rem",
                textAlign: "initial",
              }}
            ></th>
            <th
              style={{
                fontWeight: "700",
                padding: "0.75rem",
                fontFamily: "Arial, sans-serif",
                fontSize: "0.9rem",
                color: myColors.primaryOrange,
              }}
            >
              THE JAAVAPOT
            </th>
            <th
              style={{
                fontWeight: "700",
                padding: "0.75rem",
                fontFamily: "Arial, sans-serif",
                fontSize: "0.9rem",
                color: myColors.thirdGray,
              }}
            >
              OTHER BRANDS
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={index}>
              <td
                style={{
                  verticalAlign: "middle",
                  padding: "0.75rem",
                  fontFamily: "Verdana, sans-serif",
                  fontSize: "0.9rem",
                  lineHeight: "1.2",
                  color: "#333",
                  textAlign: "left",
                }}
              >
                <p
                  style={{
                    marginTop: "0.25rem",
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: myColors.primaryNavy,
                  }}
                >
                  {feature.title}
                </p>
                <p
                  style={{
                    marginTop: "0.25rem",
                    fontSize: "0.8rem",
                    color: "#555",
                  }}
                >
                  {feature.description}
                </p>
              </td>
              <td
                style={{
                  verticalAlign: "middle",
                  padding: "0.75rem",
                  color: "#FD7E4B",
                }}
              >
                <FaCheckCircle size={20} />
              </td>
              <td
                style={{
                  verticalAlign: "middle",
                  padding: "0.75rem",
                  color: "#000",
                }}
              >
                <BiXCircle size={20} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </Container>
  );
};
 
export default DifferenceSection;