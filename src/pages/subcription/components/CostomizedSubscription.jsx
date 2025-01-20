import React, { useState } from "react";
import "./CustomizeSubscription.css";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";
import { useDispatchCart } from "../../../store/ContextReducer";
import { myColors } from "../../../contants/Colors";

const CustomizedSubscription = () => {
      const dispatch = useDispatchCart();
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [subscriptionDuration, setSubscriptionDuration] = useState("monthly");
    const [maxProducts, setMaxProducts] = useState(5);
    const [comboType, setComboType] = useState(5);

    const productList = [
        { name: "Broccoli Soup", actualPrice: 150, price: 135, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720438246821_brocoli.png" },
        { name: "Moringa Soup", actualPrice: 150, price: 135, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447478395_moringa.png" },
        { name: "Pumpkin Soup", actualPrice: 129, price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447579222_pumpkin.png" },
        { name: "Little Millet Soup", actualPrice: 129, price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447663234_oats.png" },
        { name: "Oats Porridge", actualPrice: 129, price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447663234_oats.png" },
        { name: "Foxtail Millet Porridge", actualPrice: 129, price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447929244_foxmil.png" },
        { name: "Jowar Porridge", actualPrice: 129, price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720448027188_jowar.png" },
        { name: "Bajra Porridge", actualPrice: 129, price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720448109750_bajra.png" },
        { name: "Sattu Beverage", actualPrice: 129, price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1732615762046_Sattu product.png" },
        { name: "Ragi Ambali", actualPrice: 129, price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447814614_ragiAmbali.png" },
        { name: "Ragi Ambali-01", actualPrice: 129, price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447814614_ragiAmbali.png" },
    ];

    const handleProductSelection = (productName) => {
        if (selectedProducts.includes(productName)) {
            setSelectedProducts((prev) => prev.filter((p) => p !== productName));
        } else if (selectedProducts.length < maxProducts) {
            setSelectedProducts((prev) => [...prev, productName]);
        } else {
            toast.warn(`You can only select up to ${maxProducts} products.`);
        }
    };

    const handleDurationChange = (duration) => {
        setSubscriptionDuration(duration);
        setMaxProducts(duration === "monthly" ? 5 : 10);
        setSelectedProducts([]);
    };

    const calculateTotal = () => {
        const selectedItems = productList.filter((product) =>
            selectedProducts.includes(product.name)
        );
        return selectedItems.reduce((total, item) => total + item.price, 0);
    };

    const handleSubscribe = async() => {
           if (!localStorage.getItem("token")) {
              toast.error("Please login to add items to the cart");
              return;
            }
        
            if (selectedProducts.length !== (subscriptionDuration === "monthly" ? 5 : 10)) {
              toast.error(`Please select exactly ${(subscriptionDuration === "monthly" ? 5 : 10)} products!`);
              return;
            }
        
            const comboName = `${selectedProducts.join(", ")} (Sucription-${subscriptionDuration})`;
        
            await dispatch({
              type: "ADD",
              id: `subscription-${subscriptionDuration}-${Date.now()}`,
              name: comboName,
              // description: foodItem.description,
              price: calculateTotal(),
              qty: 1,
              size: "Standard",
              img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1732190538124_3 combo 1.png",
              basicPrice: calculateTotal(),
              maincategory: `Subscription`,
              category: `Subscription-${subscriptionDuration}`,
            });
            toast.success(`${comboName} added to your cart!`);
    };

    return (
        <div className="customized-subscription">
            <p style={{fontFamily: "Arial, sans-serif",
              fontSize: "26px",
              fontWeight: "bold",
              color: myColors.primaryGray,
              textAlign: "center",
              marginBottom: "20px",
              marginTop: "20px",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",}}>Customize Your Subscription</p>

            <div className="subscription-duration">
                <button
                    className={subscriptionDuration === "monthly" ? "active" : ""}
                    onClick={() => handleDurationChange("monthly")}
                >
                    One Month
                </button>
                <button
                    className={subscriptionDuration === "quarterly" ? "active" : ""}
                    onClick={() => handleDurationChange("quarterly")}
                >
                    Quarterly
                </button>
                <button
                    className={subscriptionDuration === "half" ? "active" : ""}
                    onClick={() => handleDurationChange("half")}
                >
                    Half Year
                </button>
                <button
                    className={subscriptionDuration === "annual" ? "active" : ""}
                    onClick={() => handleDurationChange("annual")}
                >
                    Annaul
                </button>
            </div>

            <div className="product-selection">
                <h2>Select Up to {maxProducts} Products</h2>
                <div className="products">
                    {productList.map((product) => (
                        <div
                            key={product.name}
                            className={`product-item ${selectedProducts.includes(product.name) ? "selected" : ""
                                }`}
                            onClick={() => handleProductSelection(product.name)}
                        >
                            <img src={product.img} alt={product.name} />
                            <div className="product-info">
                                <span>{product.name}</span>
                                <div className="d-flex justify-content-center">
                                    <p style={{
                                        fontSize: 14,
                                        textDecorationLine: "line-through",
                                        color: "gray",
                                        marginRight: 8,
                                    }}>₹{product.actualPrice}</p>
                                    <p style={{
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        color: "#FD7E4B",
                                    }}>₹{product.price}</p>
                                </div>
                            </div>
                            {selectedProducts.includes(product.name) && (
                                <FaCheck className="check-icon" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="total-price">
                <p>Total Price: ₹{calculateTotal()}</p>
            </div>

            <div className="subscribe-button">
                <button onClick={handleSubscribe}>Subscribe Now</button>
            </div>
        </div>
    );
};

export default CustomizedSubscription;
