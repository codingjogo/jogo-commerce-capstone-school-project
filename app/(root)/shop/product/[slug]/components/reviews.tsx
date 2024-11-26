import { Card, CardContent } from "@/components/ui/card";
import { Review } from "@/lib/types";
import { StarIcon } from "lucide-react";
import React from "react";

const Reviews = ({ reviews }: { reviews: Review[] }) => {
	return (
		<Card>
			<CardContent className="p-6">
				<div className="grid lg:grid-cols-2 gap-4">
					{reviews.map((review) => (
						<div key={review.id} className="border-b pb-4">
							<div className="flex items-center space-x-2 mb-2">
								<div className="flex">
									{[1, 2, 3, 4, 5].map((star) => (
										<StarIcon
											key={star}
											className={`w-4 h-4 ${
												star <= review.rating
													? "text-yellow-400"
													: "text-gray-300"
											}`}
										/>
									))}
								</div>
								<span className="font-semibold">
									{review.userName}
								</span>
								<span className="text-sm text-gray-600">
									{review.createdAt}
								</span>
							</div>
							<p>{review.comment}</p>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default Reviews;
