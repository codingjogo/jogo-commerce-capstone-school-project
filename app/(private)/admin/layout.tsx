import React from "react";
import AdminNavbar from "./components/AdminNavbar";

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<>
			<div className="flex">
				<AdminNavbar />
				<main>{children}</main>
			</div>
		</>
	);
};

export default RootLayout;
