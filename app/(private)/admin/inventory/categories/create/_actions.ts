'use server';

import prisma from "@/lib/db";
import { createCategorySchema, TCreateCategory } from "@/lib/schemas/categoryFormSchemas";
import { z } from "zod";


export async function createCategory(data: TCreateCategory) {
  try {
    const validatedValues = createCategorySchema.parse(data)

    const newCategory = await prisma.category.create({
      data: {
        name: validatedValues.name,
        slug: validatedValues.slug,
      },
    })

    return newCategory;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log('ZOD_CREATE_CATEGORY', error.errors)
    }

    console.log('FAILED_CREATE_CATEGORY', error)
  }
}