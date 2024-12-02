import { clerkClient } from "@clerk/nextjs/server";

export async function DELETE(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get("id");

		if (!userId) {
			return Response.json(
				{
					error: "User ID is required",
				},
				{
					status: 400,
				}
			);
		}

		const client = await clerkClient();
		await client.users.deleteUser(userId);
		return new Response(null, {
			status: 302,
			headers: { Location: "/sign-in" },
		});
	} catch (error) {
		console.log(error);
		return Response.json({ error: "Error deleting user" });
	}
}
