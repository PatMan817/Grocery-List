import { PrismaClient } from "@prisma/client";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextAuth]";
export default async function search(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session && req.method === "DELETE") {
    const prisma = new PrismaClient()
    try {
      const deletedItem = await prisma.listItem.delete({
        where: {
          id: req.body
        }
      })
      await prisma.$disconnect()
      res.send(deletedItem);
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
