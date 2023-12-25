import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './CategoryForm.css';
import { addCategory } from '../../http/categoriesAPI';

const CategoryForm = ({setShowCategoryForm}) => {
  const [categoryName, setCategoryName] = useState('');

  const handleAddCategory = async() => {
    const responce = await addCategory(categoryName)
    setCategoryName('');
    setShowCategoryForm(false)
  };

  return (
    <motion.div className="category-form">
      <input
        type="text"
        placeholder="Введите категорию"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <button onClick={handleAddCategory}>Добавить</button>
    </motion.div>
  );
};

export default CategoryForm;
