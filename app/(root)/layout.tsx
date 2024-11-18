import React from "react";
import RootNavbar from "./components/RootNavbar";

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<>
			<RootNavbar />
			<main>{children}</main>
		</>
	);
};

export default RootLayout;
