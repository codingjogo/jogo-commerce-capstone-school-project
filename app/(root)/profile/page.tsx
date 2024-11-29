import React from "react";
import Addresses from "./components/addresses";
import RecentOrders from "./components/recent-orders";
import YourProfile from "./components/your-profile";
import ToReview from "./components/to-review";

const ProfilePage = () => {
	return (
		<section>
			<div className="container py-8 lg:py-12">
				<h1 className="text-4xl mb-6">Your Profile</h1>

        <div className="grid gap-6">
          {/* Your Profile */}
          <YourProfile />

          {/* Addresses */}
          <Addresses />

          {/* Recent Orders */}
          <RecentOrders />

          {/* To Review */}
          <ToReview />
        </div>
			</div>
		</section>
	);
};

export default ProfilePage;
