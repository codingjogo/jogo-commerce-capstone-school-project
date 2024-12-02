export {};

declare global {
	interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean;
			address: {
				house_number: string;
				street: string;
				barangay: string;
				municipality: string;
				province: string;
				zip_code: string;
        is_default: boolean;
			}
    }
  }
}
