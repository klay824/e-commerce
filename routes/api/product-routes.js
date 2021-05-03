const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  try {
    const allProductData = await Product.findAll({
      // be sure to include its associated Category and Tag data
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(allProductData);
  } catch (err) {
    res.status(500).json(err);
  }  
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  try {
    const oneProductData = await Product.findByPk(req.params.id, {
      // be sure to include its associated Category and Tag data
      include: [{ model: Category}, { model: Tag }],
    });
    if (!oneProductData) {
      res.status(404).json({ message: 'No products found with that id!'});
      return;
    }
    res.status(200).json(oneProductData);
  } catch (err) {
    res.status(500).json(err);
  }  
});

// create new product
 /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
 
router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create({
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      tagIds: req.body.tagIds,
    });
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});
 

// update product
router.put('/:id', async (req, res) => {
  try {
    const updateProduct = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateProduct[0]) {
      res.status(404).json({ message: 'No product with this id!' });
      return;
    }
    res.status(200).json(updateProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete one product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: { id: req.params.id }
    });
    if (!productData) {
      res.status(404).json({ message: 'No product with this id!' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
