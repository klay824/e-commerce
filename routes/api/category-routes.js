const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const allCatData = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product }],
    });
    res.status(200).json(allCatData);
  } catch (err) {
    res.status(500).json(err);
  }  
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try{ 
    const oneCatData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product }],
    });
    if (!oneCatData) {
      res.status(404).json({ message: 'No categories found with that id!'});
      return;
    }
    res.status(200).json(oneCatData);
  } catch (err) {
    res.status(500).json(err);
  }  
});

  // create a new category
router.post('/', async (req, res) => {
  try {
    const newCat = await Category.create(req.body);
    res.status(200).json(newCat);
  } catch (err) {
    res.status(400).json(err);
  }
});

  // update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateCat = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateCat[0]) {
      res.json(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(updateCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const catData = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!catData) {
      res.status(404).json({ message: 'No category with that id!' });
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
