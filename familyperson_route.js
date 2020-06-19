var express = require('express');
const router = express.Router();
const familyperson = require('./models/personrelation');
const person = require('./models/person');
const crud = require('./Crud')(familyperson)
const personcrud = require('./Crud')(person)

router.get('/', crud.findAll);
router.get('/details', async (req, res) => {
    try {
        var list = await familyperson.find()
        .populate('person')
        .populate({
          path: 'children',
          populate: { path: 'children' }
        })
        .exec();
        res.send(list);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.get('/details/:id', async (req, res) => {
  try {
      var list = await familyperson.findById(req.params.id)
      .populate('person')
      .populate({
        path: 'children',
        populate: { path: 'children' }
      })
      .exec();
      res.send(list);
  } catch (error) {
      res.status(500).send(error);
  }
});
router.get('/:id', crud.findById);
router.post('/', async (req, res) => {
  var children = req.body.children;
  // Save new item
  var newItems = children.filter(item => item._id == null);
  if(newItems.length > 0){
    for (let index = 0; index < newItems.length; index++) {
      const element = newItems[index];
      var user = await person.create({name: element.name});
      element._id = user.id;
    }
  }
  // console.log(req.body)
  // console.log(newItemObj)
  if (req.body._id) {
    crud.update(req, res);
  } else {
    crud.save(req, res)
  }
  
});
router.put('/:id', crud.update);
router.delete("/:id", crud.deleteObject);


module.exports = router;