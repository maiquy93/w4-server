const express = require("express");
var axios = require("axios");
var cors = require("cors");
const app = express();
require("dotenv").config();
app.use(cors());
const port = process.env.port || 8000;
const store = process.env.store;
const token = process.env.token;

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
                currencyCode
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
    url: `https://${store}/admin/api/2022-10/graphql.json`,
    headers: {
      "X-Shopify-Access-Token": token,
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

app.get("/getcollections", (req, res) => {
  var axios = require("axios");
  var data = JSON.stringify({
    query: `{
collections(first:15){
  edges{
    node{
      id
      title
      image{
        url
      }
      products(first:5){
        edges{
          node{
            id
            title
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
  }
}
}`,
    variables: {},
  });

  var config = {
    method: "post",
    url: `https://${store}/admin/api/2022-10/graphql.json`,
    headers: {
      "X-Shopify-Access-Token": token,
      "Content-Type": "application/json",
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
