import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
export default async function search(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session && req.method === "GET") {
    try {
      let searchResults = await fetch(
        `https://api.spoonacular.com/food/products/search?query=${req.query.query}`,
        {
          headers: {
            "x-api-key": process.env.API_KEY,
          },
        }
      );
      searchResults = await searchResults.json()
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
