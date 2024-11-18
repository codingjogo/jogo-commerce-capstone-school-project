import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return (
		<section className="container flex items-center justify-center min-h-screen">
			<SignIn />
		</section>
	);
}
