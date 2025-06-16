"use client";
// React
import React from 'react'
// Prisma model
import { Category } from '@/generated/prisma';
// Form handling utilities
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
interface CategoryDetailsProps {
  data?: Category;
}



const CategoryDetails = ({ data }: CategoryDetailsProps ) => {
  return (
    <div>category-details</div>
  )
}


export default CategoryDetails