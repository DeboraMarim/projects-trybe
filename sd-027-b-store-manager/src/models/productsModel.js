const db = require('./connection');

const getAllProducts = async () => {
  const [data] = await db.execute('Select * From StoreManager.products');
  return data;
};
 
const getProductById = async (id) => {
  const [[data]] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
  return data;
};

const createProduct = async (product) => {
  const [{ insertId }] = await db
    .execute('Insert  Into StoreManager.products(name) value(?)', [product]);
  return insertId;
};

const updateProductByID = async (id, nameProduct) => {
  await db.execute(
    `UPDATE 
      StoreManager.products
    SET
      name = '${nameProduct}'
    WHERE
      id = ${id};`,

  );
};

module.exports = { getAllProducts, getProductById, createProduct, updateProductByID };
