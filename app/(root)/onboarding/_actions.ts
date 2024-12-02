'use server'

import prisma from '@/lib/db'
import { TCreateOnboarding } from '@/lib/schemas/onboardingFormSchemas'
import { auth, clerkClient } from '@clerk/nextjs/server'

export const completeOnboarding = async (values: TCreateOnboarding) => {
  const { userId } = await auth()

  const {publicMetadata: {
    firstName,
    lastName,
    address: {
      houseNumber,
      street,
      barangay,
      municipality,
      province,
      zipCode,
      isDefault
    },
    onboardingComplete
  }} = values;

  if (!userId) {
    return { message: 'No Logged In User' }
  }

  const client = await clerkClient()

  try {

    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: onboardingComplete,
        firstName: firstName,
        lastName: lastName,
				address: {
					houseNumber: houseNumber,
					street: street,
          barangay: barangay,
          municipality: municipality,
          province: province,
          zipCode: zipCode,
					isDefault: isDefault
				}
      },
    })

    const userFromDB = await prisma.customer.findFirst({
      where: { clerk_user_id: userId }
    })

    if (!userFromDB) {
      return { error: 'User not found in DB'}
    }

    const newAddress = await prisma.address.create({
      data: {
        house_number: houseNumber,
        street: street,
        barangay: barangay,
        municipality: municipality,
        province: province,
        zip_code: zipCode,
        is_default: true,
        customer_id: userFromDB.id
      }
    })

    return { message: res.publicMetadata, data: {
      newAddress
    } }
  } catch (err) {
    return { error: 'There was an error updating the user metadata.', err }
  }
}