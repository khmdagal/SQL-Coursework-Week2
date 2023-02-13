const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "Kdagaal123",
  port: 5432,
});

const productsBySuppliers = `SELECT products.product_name, suppliers.supplier_name, product_availability.unit_price FROM products
JOIN product_availability on product_availability.prod_id=products.id
JOIN suppliers on product_availability.supp_id=suppliers.id
ORDER BY supplier_name`;

app.get("/cyf-ecommerce-api", (req, res) => {
  res.status(200).send(`Wellcom cyf-ecommerce-api
    visit these roots;
/customers
/suppliers
/products
    `);
});

app.get("/cyf-ecommerce-api/customers", (req, res) => {
  pool
    .query("SELECT * FROM customers")
    .then((data) => res.json(data.rows))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

app.get("/cyf-ecommerce-api/suppliers", (req, res) => {
  pool
    .query("SELECT * FROM suppliers")
    .then((data) => res.json(data.rows))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

app.get("/cyf-ecommerce-api/products", (req, res) => {
  pool
    .query("SELECT * FROM products")
    .then((data) => res.json(data.rows))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

app.get("/cyf-ecommerce-api/productsBySuppliers", (req, res) => {
  pool
    .query(`${productsBySuppliers}`)
    .then((data) => res.json(data))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});
app.listen(port, () => {
  console.log(`server is running ${port}`);
});
