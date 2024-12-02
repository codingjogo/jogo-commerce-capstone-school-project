import { z } from "zod";

export const onboardingSchema = z.object({
  publicMetadata: z.object({
    onboardingComplete: z.boolean(),
    firstName: z.string().min(1, 'required first name'),
    lastName: z.string().min(1, 'required last name'),
    address: z.object({
      houseNumber: z.string().min(1, 'required house number'),
      street: z.string().min(1, 'required street'),
      barangay: z.string().min(1, 'required barangay'),
      municipality: z.string().min(1, 'required municipality'),
      province: z.string().min(1, 'required province'),
      zipCode: z.string().min(1, 'required zip code'),
      isDefault: z.boolean(),
    })
  })
})

export type TCreateOnboarding = z.infer<typeof onboardingSchema>;