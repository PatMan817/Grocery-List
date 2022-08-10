import { prisma, PrismaClient } from "@prisma/client";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextAuth]";
export default async function search(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session && req.method === "POST") {
    const prisma = new PrismaClient()
    try {
      const listitem = await prisma.listItem.upsert({
        where: {
          userId_productId: {
            userId: session.user.id,
            productId: req.body.clickedItem
          }
        },
        update: {

        },
        create: {
          productId: req.body.clickedItem,
          userId: session.user.id,
          imageType: req.body.imagetype,
          quantity: 1
        }
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
