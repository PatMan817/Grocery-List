import { PrismaClient } from "@prisma/client";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
export default async function getListItems(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session && req.method === "GET") {
    const prisma = new PrismaClient()
    try {
      const listitems = await prisma.listItem.findMany({
        where: {
          userId: session.user.id
        }
      })
      await prisma.$disconnect()
      res.send(listitems);
    } catch (error) {
      console.error(error)
      await prisma.$disconnect()
      res.status(500).send(`Error getting data ${error}`)
      process.exit(1)
    }
  } else {
    res.send({
      error: "You must be sign in to view the protected content on this page.",
    });
  }
}
