import React from "react";
import PersonalInformation from "./personal-information";

const YourProfile = () => {
	return (
		<div className="flex gap-8">
			{/* Avatar */}
			<div>
				<div className="w-40 h-40 rounded-full bg-slate-600"></div>
			</div>

			{/* Personal Information */}
				<PersonalInformation />
		</div>
	);
};

export default YourProfile;
