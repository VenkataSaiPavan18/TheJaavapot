import React, { useState } from "react";
import "./CustomizeCombos.css";
import { useDispatchCart } from "../../../../../store/ContextReducer";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";

const CustomizeCombos = () => {
  const dispatch = useDispatchCart();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [comboType, setComboType] = useState(3);

  const productPrices = {
    3: [
      { name: "Broccoli Soup", price: 135, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720438246821_brocoli.png" },
      { name: "Moringa Soup", price: 135, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447478395_moringa.png" },
      { name: "Pumpkin Soup", price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447579222_pumpkin.png" },
      { name: "Little Millet Soup", price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447663234_oats.png" },
      { name: "Oats Porridge", price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447663234_oats.png" },
      { name: "Foxtail Millet Porridge", price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447929244_foxmil.png" },
      { name: "Jowar Porridge", price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720448027188_jowar.png" },
      { name: "Bajra Porridge", price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720448109750_bajra.png" },
      { name: "Sattu Beverage", price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1732615762046_Sattu product.png" },
      { name: "Ragi Ambali", price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447814614_ragiAmbali.png" },
    ],
    5: [
      { name: "Broccoli Soup", price: 124, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720438246821_brocoli.png" },
      { name: "Moringa Soup", price: 124, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447478395_moringa.png" },
      { name: "Pumpkin Soup", price: 107, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447579222_pumpkin.png" },
      { name: "Little Millet Soup", price: 107, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447663234_oats.png" },
      { name: "Oats Porridge", price: 107, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447663234_oats.png" },
      { name: "Foxtail Millet Porridge", price: 107, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447929244_foxmil.png" },
      { name: "Jowar Porridge", price: 107, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720448027188_jowar.png" },
      { name: "Bajra Porridge", price: 107, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720448109750_bajra.png" },
      { name: "Sattu Beverage", price: 107, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1732615762046_Sattu product.png" },
      { name: "Ragi Ambali", price: 107, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447814614_ragiAmbali.png" },
    ],
  };

  const handleProductChange = (productName) => {
    if (selectedProducts.includes(productName)) {
      setSelectedProducts((prev) => prev.filter((p) => p !== productName));
    } else if (selectedProducts.length < comboType) {
      setSelectedProducts((prev) => [...prev, productName]);
    } else {
      toast.warn(`You can only select ${comboType} products for this combo.`);
    }
  };

  const handleComboSelection = (combo) => {
    setComboType(combo);
    setSelectedProducts([]); // Clear selected products when combo type changes
  };

  const calculateTotal = () => {
    if (!comboType) return 0;
    const selectedItems = productPrices[comboType].filter((product) =>
      selectedProducts.includes(product.name)
    );
    return selectedItems.reduce((total, item) => total + (item.price || 0), 0);
  };

  const handleAddToCart = async () => {
    if (!localStorage.getItem("token")) {
      toast.error("Please login to add items to the cart");
      return;
    }

    if (selectedProducts.length !== comboType) {
      toast.error(`Please select exactly ${comboType} products!`);
      return;
    }

    const comboName = `${selectedProducts.join(", ")} (Combo-${comboType})`;

    await dispatch({
      type: "ADD",
      id: `combo-${comboType}-${Date.now()}`,
      name: comboName,
      // description: foodItem.description,
      price: calculateTotal(),
      qty: 1,
      size: "Standard",
      img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1732190538124_3 combo 1.png",
      basicPrice: calculateTotal(),
      maincategory: `Combos`,
      category: `Combo-${comboType}`,
    });

    toast.success(`${comboName} added to your cart!`);
  };

  return (
    <div className="customize-combos">
      <h1>Customize Your Combos</h1>

      <div className="combo-options">
        <button
          className={`combo-button ${comboType === 3 ? "active" : ""}`}
          onClick={() => handleComboSelection(3)}
        >
          3 Combo
        </button>
        <button
          className={`combo-button ${comboType === 5 ? "active" : ""}`}
          onClick={() => handleComboSelection(5)}
        >
          5 Combo
        </button>
      </div>

      {comboType && (
        <div className="product-selection">
          <h2>Select {comboType} Products</h2>
          <div className="products">
            {productPrices[comboType].map((product) => (
              <div
                key={product.name}
                className={`product-item ${
                  selectedProducts.includes(product.name) ? "selected" : ""
                }`}
                onClick={() => handleProductChange(product.name)}
              >
                <img src={product.img} alt={product.name} />
                <div className="product-info">
                  <span  className={`title ${
                  selectedProducts.includes(product.name) ? "selected" : ""
                }`}>{product.name}</span>
                  <p  className={`price ${
                  selectedProducts.includes(product.name) ? "selected" : ""
                }`}>₹{product.price || 0}</p>
                </div>
                {selectedProducts.includes(product.name) && (
                  <FaCheck className="check-icon" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {comboType && (
        <div className="total-price">
          <p style={{ fontSize: '22px', fontFamily: 'Arial', fontWeight: '700', }}>Total Price: ₹{calculateTotal()}</p>
        </div>
      )}

      {comboType && selectedProducts.length === comboType && (
        <div className="add-to-cart">
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      )}
    </div>
  );
};

export default CustomizeCombos;


// import React, { useState } from "react";
// import "./CustomizeCombos.css";
// import { useDispatchCart } from "../../../../../store/ContextReducer";
// import { toast } from "react-toastify";
// import { FaCheck } from "react-icons/fa";
// import { motion } from "framer-motion";

// const CustomizeCombos = () => {
//   const dispatch = useDispatchCart();
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [comboType, setComboType] = useState(3);

//   const productPrices = {
//     3: [
//       { name: "Broccoli Soup", price: 135, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720438246821_brocoli.png" },
//       { name: "Moringa Soup", price: 135, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447478395_moringa.png" },
//       { name: "Pumpkin Soup", price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447579222_pumpkin.png" },
//       { name: "Little Millet Soup", price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447663234_oats.png" },
//       { name: "Oats Porridge", price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447663234_oats.png" },
//       { name: "Foxtail Millet Porridge", price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447929244_foxmil.png" },
//       { name: "Jowar Porridge", price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720448027188_jowar.png" },
//       { name: "Bajra Porridge", price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720448109750_bajra.png" },
//       { name: "Sattu Beverage", price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1732615762046_Sattu product.png" },
//       { name: "Ragi Ambali", price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447814614_ragiAmbali.png" },
//     ],
//     5: [
//       { name: "Broccoli Soup", price: 135, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720438246821_brocoli.png" },
//       { name: "Moringa Soup", price: 135, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447478395_moringa.png" },
//       { name: "Pumpkin Soup", price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447579222_pumpkin.png" },
//       { name: "Little Millet Soup", price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447663234_oats.png" },
//       { name: "Oats Porridge", price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447663234_oats.png" },
//       { name: "Foxtail Millet Porridge", price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447929244_foxmil.png" },
//       { name: "Jowar Porridge", price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720448027188_jowar.png" },
//       { name: "Bajra Porridge", price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720448109750_bajra.png" },
//       { name: "Sattu Beverage", price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1732615762046_Sattu product.png" },
//       { name: "Ragi Ambali", price: 115, img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1720447814614_ragiAmbali.png" },
//     ],
//   };

//   const handleProductChange = (productName) => {
//     if (selectedProducts.includes(productName)) {
//       setSelectedProducts((prev) => prev.filter((p) => p !== productName));
//     } else if (selectedProducts.length < comboType) {
//       setSelectedProducts((prev) => [...prev, productName]);
//     } else {
//       toast.warn(`You can only select ${comboType} products for this combo.`);
//     }
//   };

//   const handleComboSelection = (combo) => {
//     setComboType(combo);
//     setSelectedProducts([]); // Clear selected products when combo type changes
//   };

//   const calculateTotal = () => {
//     if (!comboType) return 0;
//     const selectedItems = productPrices[comboType].filter((product) =>
//       selectedProducts.includes(product.name)
//     );
//     return selectedItems.reduce((total, item) => total + (item.price || 0), 0);
//   };

//   const handleAddToCart = async () => {
//     if (!localStorage.getItem("token")) {
//       toast.error("Please login to add items to the cart");
//       return;
//     }

//     if (selectedProducts.length !== comboType) {
//       toast.error(`Please select exactly ${comboType} products!`);
//       return;
//     }

//     const comboName = `${selectedProducts.join(", ")} (Combo-${comboType})`;

//     await dispatch({
//       type: "ADD",
//       id: `combo-${comboType}-${Date.now()}`,
//       name: comboName,
//       price: calculateTotal(),
//       qty: 1,
//       size: "Standard",
//       img: "https://surveyappanswers.blob.core.windows.net/jaavapotmenuimages/1732190538124_3 combo 1.png",
//       basicPrice: calculateTotal(),
//       maincategory: `Combos`,
//       category: `Combo-${comboType}`,
//     });

//     toast.success(`${comboName} added to your cart!`);
//   };

//   return (
//     <motion.div
//       className="customize-combos"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h1>Customize Your Combos</h1>

//       <div className="combo-options">
//         {[3, 5].map((combo) => (
//           <motion.button
//             key={combo}
//             className={`combo-button ${comboType === combo ? "active" : ""}`}
//             onClick={() => handleComboSelection(combo)}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             {combo} Combo
//           </motion.button>
//         ))}
//       </div>

//       {comboType && (
//         <motion.div
//           className="product-selection"
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h2>Select {comboType} Products</h2>
//           <div className="products">
//             {productPrices[comboType].map((product) => (
//               <motion.div
//                 key={product.name}
//                 className={`product-item ${
//                   selectedProducts.includes(product.name) ? "selected" : ""
//                 }`}
//                 onClick={() => handleProductChange(product.name)}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <img src={product.img} alt={product.name} />
//                 <div className="product-info">
//                   <span>{product.name}</span>
//                   <p>₹{product.price || 0}</p>
//                 </div>
//                 {selectedProducts.includes(product.name) && (
//                   <FaCheck className="check-icon" />
//                 )}
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       )}

//       {comboType && (
//         <motion.div
//           className="total-price"
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h3>Total Price: ₹{calculateTotal()}</h3>
//         </motion.div>
//       )}

     

//       {comboType && selectedProducts.length === comboType && (
//         <div className="add-to-cart">
//           <button onClick={handleAddToCart}>Add to Cart</button>
//         </div>
//       )}
//       {/* <motion.button
//         className="add-to-cart"
//         onClick={handleAddToCart}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//       >
//         Add to Cart
//       </motion.button> */}
//     </motion.div>
//   );
// };

// export default CustomizeCombos;
