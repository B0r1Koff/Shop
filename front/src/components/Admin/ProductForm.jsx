import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './ProductForm.css'
import { getAllCategories } from '../../http/categoriesAPI';
import { createProduct, getAllProducts } from '../../http/productAPI';
import { createCharacteristic } from '../../http/characteristicAPI';

const ProductForm = ({setShowProductForm}) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productCharacteristics, setProductCharacteristics] = useState([]);
  const [productPhoto, setProductPhoto] = useState();
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    setTimeout(() => {
       getAllProducts().then(function(val){
        setProducts(val.data)
    })
    }, 10)  
}, [])

  useEffect(() => {
    setTimeout(() => {
       getAllCategories().then(function(val){setCategories(val.data)
     })
    }, 10)  
  }, [])

  const handleAddCharacteristic = () => {
    setProductCharacteristics([...productCharacteristics, { name: '', value: '' }]);
  };

  const handleCharacteristicChange = (index, field, value) => {
    const updatedCharacteristics = [...productCharacteristics];
    updatedCharacteristics[index][field] = value;
    setProductCharacteristics(updatedCharacteristics);
  };

  const handleAddPhoto = (event) => {
    setProductPhoto(event.target.files[0]);
  };

  const handleDeleteCharacteristic = (index) => {
    let items = []
    productCharacteristics.map((item, i) => {
      if(index !== i){
        items.push(item)
      }
    })
    setProductCharacteristics(items)
  }

  const findMaxProductId = () => {
    let max = 0;
    products.map(item => {
      if(item.id > max){
        max = item.id
      }
    })
    return max
  }

  const findCategoryId = () => {
    let id = 0;
    categories.map(item => {
      if(item.name === productCategory){
        id = item.id
      }
    })
    return id
  }

  const handleAddProduct = async() => {
    let prId = findMaxProductId()
    let catId = findCategoryId()
    console.log(prId);
    const formData = new FormData()
    formData.append("image", productPhoto)
    formData.append("name", productName)
    formData.append("price", productPrice)
    formData.append("discount", 0)
    formData.append("categoryId", catId)
    const responce = await createProduct(formData)
    if(productCharacteristics.length !== 0){
      productCharacteristics.map(item => {
        setTimeout(() => {
          const responce2 = createCharacteristic(item.name, item.value, responce.data.id)
       }, 300)
      })
    }
    console.log('Added product:', { productName, productPrice, productCategory, productCharacteristics, productPhoto });
    setProductName('');
    setProductPrice('');
    setProductCategory('');
    setProductCharacteristics([]);
    setShowProductForm(false)
  };

  const options = categories.map(category => {
    return <option key={category.id}>{category.name}</option>
  });

  return (
    <motion.div className="product-form">
      <input
        type="text"
        placeholder="Введите название"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Введите цену"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
      />
      <select
        value={productCategory}
        onChange={(e) => setProductCategory(e.target.value)}
      >
        {options}
      </select>

      <div>
        <h3>Характеристики</h3>
        <button onClick={handleAddCharacteristic}>Добавить характеристику</button>
        <ul>
          {productCharacteristics.map((char, index) => (
            <li key={index}>
              <input
                type="text"
                placeholder={index}
                value={char.name}
                onChange={(e) => handleCharacteristicChange(index, 'name', e.target.value)}
              />
              <input
                type="text"
                placeholder="Введите значение"
                value={char.value}
                onChange={(e) => handleCharacteristicChange(index, 'value', e.target.value)}
              />
              <button onClick={e => {handleDeleteCharacteristic(index)}}>Удалить</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Картинка</h3>
        <input type="file" accept="image/*" onChange={handleAddPhoto} />
      </div>

      <button onClick={handleAddProduct}>Сохранить</button>
    </motion.div>
  );
};

export default ProductForm;
