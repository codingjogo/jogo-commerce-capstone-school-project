export {};

declare global {
	interface CustomJwtSessionClaims {
		metadata: {
			onboardingComplete?: boolean;
		};
		first_name: string;
			last_name: string;
	}
}
