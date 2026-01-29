import React from 'react';
import { categories } from '../data/data.js';
import { motion } from 'framer-motion';

const Category = () => {
  return (
    <div className='max-w-[1640px] mx-auto px-4 py-12'>
      <h1 className='text-orange-600 font-bold text-4xl text-center mb-8'>
        Categories
      </h1>

      {/* Categories Grid */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
        {categories.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            className='bg-gray-100 rounded-xl p-4 flex flex-col items-center justify-center shadow-md hover:shadow-xl cursor-pointer transition-all duration-300'
          >
            <img 
              src={item.image} 
              alt={item.name} 
              className='w-20 h-20 object-cover rounded-full mb-4 hover:scale-110 transition-transform duration-300'
            />
            <h2 className='font-bold text-lg text-center'>{item.name}</h2>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Category;
