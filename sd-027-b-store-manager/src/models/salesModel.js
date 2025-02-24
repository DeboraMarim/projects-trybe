const db = require('./connection');

const creatSale = async (data) => {
  const [{ insertId }] = await db.execute(
    'INSERT INTO sales (date) VALUE (NOW())',
  );

  data.forEach(async (sale) => {
    await db.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
      [insertId, sale.productId, sale.quantity],
    );
  });
  return insertId;
};

const getAllSales = async () => {
  const [sales] = await db.execute(
    `SELECT allProduct.sale_id AS saleId, date,
      allProduct.product_id AS productId, allProduct.quantity
    FROM StoreManager.sales AS allSales, StoreManager.sales_products AS allProduct
    WHERE allSales.id = allProduct.sale_id
    GROUP BY allProduct.sale_id, allSales.date, allProduct.product_id, allProduct.quantity
    ORDER BY allProduct.sale_id, allProduct.product_id;`,
    [],
  );
  return sales;
};

const getSalesByID = async (data) => {
  const [sale] = await db.execute(
    `SELECT date, product_id AS productId, quantity
      FROM StoreManager.sales AS allSales, StoreManager.sales_products AS salesProduct
      WHERE id = (?) AND allSales.id = salesProduct.sale_id;`,
    [data],
  );
  return sale;
};

module.exports = { creatSale, getSalesByID, getAllSales };