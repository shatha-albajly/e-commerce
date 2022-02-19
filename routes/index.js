var express = require("express");
const axios = require("axios");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/products", async (req, res, next) => {
  try {
    let response = await axios.get("https://dummyjson.com/products");
    res.render("products", {
      title: "Products",
      products: response.data.products,
    });
  } catch (err) {
    console.log(err);
    res.send("we have an error");
  }
});

router.get("/products/categories", async (req, res, next) => {
  try {
    let response = await axios.get(`https://dummyjson.com/products/categories`);
    res.render("categories", {
      title: "Categories",
      categories: response.data,
    });
  } catch (err) {
    console.log(err);
    res.send("we have an error");
  }
});

router.get("/products/category/:category", async (req, res, next) => {
  const category = decodeURIComponent(req.params.category);

  try {
    let response = await axios.get(
      `https://dummyjson.com/products/category/${category}`
    );
    console.log(response.data.products);
    res.render("category", {
      title: "Category",
      category: response.data.products,
    });
  } catch (err) {
    console.log(err);
    res.send("we have an error");
  }
});

router.get("/products/search", async (req, res, next) => {
  try {
    const query = req.query.q;
    console.log(query);
    let response = await axios.get(
      `https://dummyjson.com/products/search?q=${query}`
    );

    res.render("search", {
      title: "Search",

      products: response.data.products,
    });
  } catch (err) {
    console.log(err);
    res.send("we have an error");
  }
});

router.get("/products/:id", async (req, res, next) => {
  try {
    const productId = req.params.id;
    let response = await axios.get(
      `https://dummyjson.com/products/${productId}`
    );
    console.log(response);

    res.render("product", {
      title: "Product",
      product: response.data,
    });
  } catch (err) {
    console.log(err);
    res.send("we have an error");
  }
});
module.exports = router;
