import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CategoryForm from './CategoryForm';
import ProductForm from './ProductForm';
import './AdminPanel.css'; 

const AdminPanel = () => {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);

  return (
    <div className="admin-panel">
      <button onClick={() => setShowCategoryForm(!showCategoryForm)}>{showCategoryForm ? "Отмена" : "Добавить категорию"}</button>
      <AnimatePresence>
        {showCategoryForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 200, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <CategoryForm setShowCategoryForm={setShowCategoryForm} />
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={() => setShowProductForm(!showProductForm)}>{showProductForm ? "Отмена" : "Добавить товар"}</button>
      <AnimatePresence>
        {showProductForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 300, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <ProductForm setShowProductForm={setShowProductForm}/>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;
