import { PrismaClient } from "@prisma/client";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
export default async function addToDB(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session && req.method === "PUT") {
    const prisma = new PrismaClient()
    try {
      const listitem = await prisma.listItem.update({
        where: {
          userId_productId: {
            userId: session.user.id,
            productId: req.body.productId
          }
        },
        data: { quantity: {increment: (req.body.direction === 'increment' ? 1 : -1)}}
      })
      await prisma.$disconnect()
      res.send(listitem);
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
