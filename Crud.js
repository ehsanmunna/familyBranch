const crudFunc = function (Model) {
    async function findAll(request, response) {
        // check have query
        const query = request.query;
        console.log('check query ,', query);
        // check have fields
        const fields = request.query.fields;
        console.log('check fields ,', fields);
        // check have sort
        const sort = request.query.sort;
        console.log('check sort ,', sort);
        try {
            var list = await Model.find().exec();
            response.send(list);
        } catch (error) {
            response.status(500).send(error);
        }
    }
    const findById = async (request, response) => {
        try {
            var meterConf = await Model.findById(request.params.id).exec();
            response.send(meterConf);
        } catch (error) {
            response.status(500).send(error);
        }
    }
    async function Save(req, res) {
        try {
            resp = await Model.create(req.body);
            res.send(resp);
        } catch (error) {
            res.statusCode(500).send(error);
        }
    }

    async function findByName(request, response) {
        try {
            var result = await Model.find({ "name": { $regex: '.*' + request.params.name + '.*' } }).exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    }

    const update = async (request, response) => {
        try {
            var getPreviousValue = await Model.findById(request.params.id)//.exec();
            getPreviousValue.set({ ...getPreviousValue, ...request.body });
            var result = await getPreviousValue.save();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    }
    const deleteObject = async (request, response) => {
        try {
            var result = await Model.deleteOne({ _id: request.params.id }).exec();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    };

    return {
        findAll: findAll,
        findById: findById,
        findByName: findByName,
        save: Save,
        update: update,
        deleteObject: deleteObject
    }
}
module.exports = crudFunc;