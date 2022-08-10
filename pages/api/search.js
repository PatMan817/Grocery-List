import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextAuth]";
export default async function search(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session && req.method === "GET") {
    try {
      //let searchResults = await fetch(
      //  `https://api.spoonacular.com/food/products/search?query=${req.query.query}`,
      //  {
      //    headers: {
      //      "x-api-key": process.env.API_KEY,
      //    },
      //  }
      //);
      //searchResults = await searchResults.json()
      const searchResults =
      {
        type: 'product',
        products: [
          {
            id: 674753,
            title: 'Milk Candy And Waffer - Obleas Con Cajeta 1.65 lb (Pack of 6)',
            image: 'https://spoonacular.com/productImages/674753-312x231.jpeg',
            imageType: 'jpeg'
          },
          {
            id: 740801,
            title: 'Milk Thistle (Silybum Marianum) Glycerite, Organic Dried Seeds Alcohol-FREE Liquid Extract (Herbal Terra, USA) 32 oz',
            image: 'https://spoonacular.com/productImages/740801-312x231.jpeg',
            imageType: 'jpeg'
          },
          {
            id: 560345,
            title: 'Milk Thistle (Silybum Marianum) Glycerite, Organic Dried Leaves Alcohol-FREE Liquid Extract (Herbal Terra, USA) 4 oz',
            image: 'https://spoonacular.com/productImages/560345-312x231.jpeg',
            imageType: 'jpeg'
          },
          {
            id: 653401,
            title: 'Milk Thistle (Silybum Marianum) Tincture, Organic Dried Leaves Liquid Extract (Herbal Terra, USA) 2x2 oz',
            image: 'https://spoonacular.com/productImages/653401-312x231.jpeg',
            imageType: 'jpeg'
          },
          {
            id: 1225401,
            title: 'Milk Thistle (Silybum Marianum) Glycerite, Organic Dried Seeds Alcohol-FREE Liquid Extract (Herbal Terra, USA) 4 oz',
            image: 'https://spoonacular.com/productImages/1225401-312x231.jpeg',
            imageType: 'jpeg'
          },
          {
            id: 532311,
            title: 'Milk Chocolate Covered Pretzels with Toffee, Salted Pretzels in Smooth Milk Chocolate, Bulk 43 Ounce',
            image: 'https://spoonacular.com/productImages/532311-312x231.jpeg',
            imageType: 'jpeg'
          },
          {
            id: 584837,
            title: 'Milk Thistle (Silybum Marianum) Glycerite, Organic Dried Seeds Alcohol-FREE Liquid Extract (Herbal Terra, USA) 2x2 oz',
            image: 'https://spoonacular.com/productImages/584837-312x231.jpeg',
            imageType: 'jpeg'
          },
          {
            id: 745137,
            title: 'Milk Thistle (Silybum Marianum) Glycerite, Organic Dried Seeds Alcohol-FREE Liquid Extract (Herbal Terra, USA) 4x4 oz',
            image: 'https://spoonacular.com/productImages/745137-312x231.jpeg',
            imageType: 'jpeg'
          },
          {
            id: 654341,
            title: 'Milk Thistle (Silybum Marianum) Glycerite, Organic Dried Leaves Alcohol-FREE Liquid Extract (Herbal Terra, USA) 2x2 oz',
            image: 'https://spoonacular.com/productImages/654341-312x231.jpeg',
            imageType: 'jpeg'
          },
          {
            id: 687673,
            title: 'Milk Thistle (Silybum Marianum) Glycerite, Organic Dried Leaves Alcohol-FREE Liquid Extract (Herbal Terra, USA) 2 oz',
            image: 'https://spoonacular.com/productImages/687673-312x231.jpeg',
            imageType: 'jpeg'
          }
        ],
        offset: 0,
        number: 10,
        totalProducts: 16313,
        processingTimeMs: 120,
        expires: 1660176795701,
        isStale: false
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
