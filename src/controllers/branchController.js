const { Branch, Sequelize } = require('../models');
const excludeFields = ["createdBy", "updatedBy", "createdAt", "updatedAt", "orgId", "userId"];
 
//get all Branches
const getAllBranch = async (req, res) => {
    try {
        let {
            page = process.env.page,
            limit = process.env.limit,
            offset = process.env.offset,
            searchStr,
            sortBy
        } = req.query;

        let where = {};
        if (searchStr) {
            where =
            {
                [Sequelize.Op.or]: {
                    namesQuery: Sequelize.where(Sequelize.fn("concat", Sequelize.col("name"), Sequelize.col("email")),
                        {
                            [Sequelize.Op.like]: `%${searchStr}%`,
                        }
                    ),
                },
                ...where
            }


        }

        let order = [["id", "ASC"]];
        if (sortBy) {
            order = [...order, ...sortBy]
        }

        const query = {
            attributes: { exclude: excludeFields },
            where,
            offset: parseInt(offset),
            limit: parseInt(offset ? limit : offset * limit),
            order
        }
        let result = await Branch.findAndCountAll(query);
        result.page = page;
        result.limit = limit;
        result.offset = offset;
        return res.status(200).send({
            data: result,
            status: 200,
        });
    } catch (err) {
        return res.status(500).send({
            status: 500,
            message: err.message
        });
    }
}

//get single Branch
const getOneBranch = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await Branch.findOne({ where: { id: id }, attributes: { exclude: excludeFields } });
        return res.status(200).send({
            data: result,
            status: 200,
        });
    } catch (err) {
        return res.status(500).send({
            status: 500,
            message: err.message
        });
    }
}

//add Branch
const addBranch = async (req, res) => {
    try {
        let data = {
            name: req.body.name,
            description: req.body.description,
            phone: req.body.phone,
            address: req.body.address,
            mobile: req.body.mobile,
            email: req.body.email,
            status: "1",
            orgId: process.data.orgId,
            branchId: process.data.branchId,
            createdBy: process.data.userId
        };
        const result = await Branch.create(data);
        return res.status(200).send({
            status: 200,
            message: "Branch added successfully",
            data: {
                id: result.id,
                name: result.name,
                description: result.description,
                phone: result.phone,
                address: result.address,
                mobile: result.mobile,
                email: result.email
            }
        });
    } catch (err) {
        return res.status(500).send({
            status: 500,
            message: err.errors.map((errs) => errs.message)
        });
    }
}

//update Branch
const updateBranch = async (req, res) => {
    try {
        let id = req.params.id
        let data = {
            name: req.body.name,
            description: req.body.description,
            phone: req.body.phone,
            address: req.body.address,
            mobile: req.body.mobile,
            email: req.body.email
        };
        const result = await Branch.update(data, { where: { id: id }})
        return res.status(200).send({
            data: result,
            status: 200,
            message: "Update the Branch successfully!"
        });
    } catch (err) {
        return res.status(500).send({
            status: 500,
            message: err.message
        });
    }
}

//delete Branch by id
const deleteBranch = async (req, res) => {
    try {
        let id = req.params.id;
        await Branch.destroy({ where: { id: id } });
        return res.status(200).send({
            message: "Branch is deleted !",
            status: 200,
        });
    } catch (err) {
        return res.status(500).send({
            status: 500,
            message: err.message
        });
    }
}

module.exports = {
    addBranch,
    getAllBranch,
    getOneBranch,
    updateBranch,
    deleteBranch
}