import prisma from '@/lib/db'
import React from 'react'
import BagItems from './components/bag-items'

const CheckoutPage = async () => {

  /* I need: 
  - addresses
  - customers' personal information 
  */

  const bagItems = await prisma.bag.findMany({
    where: { customer_id: "6ccc554f-5530-4988-8331-ee08d91123bf"},
    include: {
      product: {
        include: {
          product_variant_color: true
        }
      },
      product_variant_size: true
    }
  })

  const categories = await prisma.category.findMany();

  return (
    <section className="container py-6">
			<h1 className="text-4xl mb-6">Checkout Process</h1>

      <div>
        {/* Bag Items OR BUY NOW ITEM */}
        <BagItems bagItems={bagItems} categories={categories}/>

        {/* Shipping Address */}

        {/* Shipping Method J&T and LBC */}

        {/* Payment Method */}

        {/* Dynamic Image Instruction based on Payment METHOD */}

        {/* Proof of Payment Receipt */}

        {/* Place Order Button  */}
      </div>
    </section>
  )
}

export default CheckoutPage