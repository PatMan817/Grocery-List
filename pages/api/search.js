import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextAuth]";
export default async function search(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session && req.method === "GET") {
    try {
      //const searchResults = await fetch(
      //  `https://api.spoonacular.com/food/products/search?query=${req.query.query}`,
      //  {
      //    headers: {
      //      "x-api-key": process.env.API_KEY,
      //    },
      //  }
      //);
      const searchResults = {
        products: [
            {
                id: 192386,
                title: "Pizza Buddy: Frozen Pizza Dough, 16 Oz",
                imageType: "jpg"
            },
            {
                id: 27693,
                title: "Uno Pizza",
                imageType: "jpg"
            }
        ],
        totalProducts: 1258,
        type: "product",
        offset: 0,
        number: 2
    }
      res.send(searchResults);
    } catch (error) {
      res.status(500).send(`Error getting data ${error}`)
    }
  } else {
    res.send({
      error: "You must be sign in to view the protected content on this page.",
    });
  }
}
