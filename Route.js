var express = require('express');
const router = express.Router();
const person = require('./models/person');
const crud = require('./Crud')(person)

router.get('/', crud.findAll);
router.get('/:id', crud.findById);
router.get('/name/:name', crud.findByName);
router.post('/', crud.save);
router.put('/:id', crud.update);
router.delete("/:id", crud.deleteObject);

router.get('/getparent/child', async (request, response) => {
    try {
        var where = request.query
        var list = await person.find(where).exec();
        response.send(list);
    } catch (error) {
        response.status(500).send(error);
    }
});
router.get('/hierarchy', async (req, res) => {
  const where = req.query 
  try {
      var list = await person.find().populate('FamilyPerson.children').exec();
      // var hierarchycalData = hierarchy(list, 'name', 'parent_name');
      res.send(list);
  } catch (error) {
      res.status(500).send(error);
  }
});

function hierarchy(arr, nameKey, parentKey) {
    var tree = [],
        mappedArr = {},
        arrElem,
        mappedElem;

    // First map the nodes of the array to an object -> create a hash table.
    for(var i = 0, len = arr.length; i < len; i++) {
      arrElem = arr[i];
      mappedArr[arrElem[nameKey]] = arrElem;
      mappedArr[arrElem[nameKey]]['children'] = [];
    }
      console.log(mappedArr)

    for (var id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
        // If the element is not at the root level, add it to its parent array of children.
        if (mappedElem.parent_name) {
              mappedArr[mappedElem[parentKey]]['children'].push(mappedElem);
        }
        // If the element is at the root level, add it to first level elements array.
        else {
          tree.push(mappedElem);
        }
      }
    }
    return tree;
  }


module.exports = router;