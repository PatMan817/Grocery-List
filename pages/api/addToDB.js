import { PrismaClient } from "@prisma/client";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
export default async function addToDB(req, res) {
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
          quantity: {increment: Number(req.body.quantity)}
        },
        create: {
          productId: req.body.clickedItem,
          userId: session.user.id,
          imageType: req.body.imagetype,
          quantity: Number(req.body.quantity),
          title: req.body.title
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
