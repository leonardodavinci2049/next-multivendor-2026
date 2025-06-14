import { tbl_user } from "@/generated/prisma";
import cnxDataBase from "@/lib/dbConnection";
import { clerkClient } from "@clerk/nextjs/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(` event type of ${eventType}`);
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );
    console.log("Webhook payload:", evt.data);

    // When user is created or updated
    if (evt.type === "user.created" || evt.type === "user.updated") {
      // Parse the incoming event data
      const data = evt.data;

      // Create a user object with relevant properties
      const user: Partial<tbl_user> = {
        id: data.id,
        name: `${data.first_name} ${data.last_name}`,
        email: data.email_addresses[0].email_address,
        picture: data.image_url,
      };

      console.log("xxxxxxxxx  processando xxxxxxxxxx");

      // If user data is invalid, exit the function
      if (!user) return;

      // Upsert user in the database (update if exists, create if not)
      const dbUser = await cnxDataBase.tbl_user.upsert({
        where: {
          email: user.email,
        },
        update: user,
        create: {
          id: user.id!,
          name: user.name!,
          email: user.email!,
          picture: user.picture!,
          role: user.role || "USER", // Default role to "USER" if not provided
        },
      });

      // Update user's metadata in Clerk with the role information
      const client = await clerkClient();
      await client.users.updateUserMetadata(data.id, {
        privateMetadata: {
          role: dbUser.role || "USER", // Default role to "USER" if not present in dbUser
        },
      });
    }
    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
