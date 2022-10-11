const express = require("express");
var axios = require("axios");
var cors = require("cors");
const app = express();
app.use(cors());
const port = 8000;

app.get("/getproducts", (req, res) => {
  var data = JSON.stringify({
    query: `{
      products(first:20) {
        edges{
          node{
            title
            id
            tags
            images(first:1){
              edges{
                node{
                  url
                }
              }
            }
            priceRangeV2{
              minVariantPrice{
                amount
              }
            }
        
          }
        }
      }
    }
    `,
    variables: {},
  });

  var config = {
    method: "post",
    url: "https://training-quy-mv-store.myshopify.com/admin/api/2022-10/graphql.json",
    headers: {
      "X-Shopify-Access-Token": "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",
      "Content-Type": "application/json",
      Cookie:
        "_landing_page=%2Fpassword; _orig_referrer=https%3A%2F%2Ftraining-quy-mv-store.myshopify.com%2F%2Fshopify%2FProduct%2F8108101239024; _shopify_y=69508a70-1344-4bdb-a6bb-84ebdae6b92d; _y=69508a70-1344-4bdb-a6bb-84ebdae6b92d; cart_currency=VND; localization=VN; secure_customer_sig=",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get("/test", (req, res) => {
  res.json("ok");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
