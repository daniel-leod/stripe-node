const { Router } = require("express");
const stripe = require("stripe")(
  "sk_test_51J8yEqKWyfYi8LBr3O0wJBDuNIFznjpZ8gL4jP9PqQEwitHb3SriLnYsHgphs9C9RSyJZm6NhDt0UiMlPnqlTUKX00yETpXE3J"
);
const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "T-shirt",
            images: [
              "https://www.scnsoft.com/blog-pictures/testing/software-product-testing.png",
            ],
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://example.com/success",
    cancel_url: "https://example.com/cancel",
  });

  res.redirect(303, session.url);
});

module.exports = router;
