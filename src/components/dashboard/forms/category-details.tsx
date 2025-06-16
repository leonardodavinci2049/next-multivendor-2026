"use client";

import { Category } from '@/generated/prisma';
import React from 'react'

interface CategoryDetailsProps {
  data?: Category;
}



const CategoryDetails = ({ data }: CategoryDetailsProps ) => {
  return (
    <div>category-details</div>
  )
}


export default CategoryDetails