import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextAuth]";
export default async function search(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session && req.method === "GET") {
    try {
      //let itemResult = await fetch(
      //  `https://api.spoonacular.com/food/products/${req.query.productId}`,
      //  {
      //    headers: {
      //      "x-api-key": process.env.API_KEY,
      //    },
      //  }
      //);
      //itemResult = await itemResult.json()
      const itemResult = {
        id: 22347,
        title:
          "SNICKERS Minis Size Chocolate Candy Bars Variety Mix 10.5-oz. Bag",
        breadcrumbs: ["bars"],
        imageType: "jpg",
        badges: [
          "msg_free",
          "no_artificial_colors",
          "no_artificial_flavors",
          "no_artificial_ingredients",
          "gluten_free",
        ],
        importantBadges: [
          "no_artificial_flavors",
          "no_artificial_colors",
          "no_artificial_ingredients",
          "gluten_free",
          "msg_free",
        ],
        ingredientCount: 32,
        generatedText: null,
        likes: 0,
        aisle: "Sweet Snacks",
        nutrition: {
          nutrients: [
            {
              name: "Fat",
              amount: 4,
              unit: "g",
              percentOfDailyNeeds: 6.15,
            },
            {
              name: "Protein",
              amount: 10,
              unit: "g",
              percentOfDailyNeeds: 20,
            },
            {
              name: "Calories",
              amount: 200,
              unit: "cal",
              percentOfDailyNeeds: 10,
            },
            {
              name: "Carbohydrates",
              amount: 26,
              unit: "g",
              percentOfDailyNeeds: 9.45,
            },
          ],
          caloricBreakdown: {
            percentProtein: 22.22,
            percentFat: 20,
            percentCarbs: 57.78,
          },
        },
        price: 324.0,
        servings: {
          number: 8,
          size: 4,
          unit: "pieces",
        },
        spoonacularScore: 0.0,
      };
      res.json(itemResult);
    } catch (error) {
      res.status(500).send(`Error getting data ${error}`);
    }
  } else {
    res.send({
      error: "You must be sign in to view the protected content on this page.",
    });
  }
}
