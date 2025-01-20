// src/App.js
import React from 'react';
// import ProductCard from './ProductCard';
import NewCard from './NewCard';
import img01 from '../../../../assets/home/products/product01.png'
import img02 from '../../../../assets/home/products/product02.png'
import img03 from '../../../../assets/home/products/product03.png'
import img04 from '../../../../assets/home/products/product04.png'
import img05 from '../../../../assets/home/products/product05.png'

const product = {
  name: 'Sample Product',
  description: 'This is a sample product description.',
  price: '29.99',
  images: [
    img01,
    img02,
    img03,img04,img05,
  ]
};

const CardContainer = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <NewCard product={product} />
    </div>
  );
};

export default CardContainer;
