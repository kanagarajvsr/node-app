const { sequelize, User, Post } = require('../models')
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken } = require('../utils/token');

exports.signup = async (req, res) => {

    const { roleId,branchId, orgId,firstname, lastname, username, address, mobile, gender, email, password } = req.body;
    const hashedPassword = hashPassword(password.trim());
    try {
        const user = await User.create({ roleId,branchId, orgId, firstname, lastname, username, address, mobile, gender, email, password: hashedPassword,createdBy:1 }) 
        return res.status(201).send({
            status: "success",
            message: "User added successfully"
        });
    } catch (err) {
        return res.status(500).send({
            status: "error",
            message: err.errors.map((errs)=>errs.message)
        });
    }
 
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const data = await User.findOne({ where: { email: email }});
        if (data) {
            if (comparePassword(password.trim(), data.password)) {
                const token = generateToken({
                    username:data.username,
                    mobile:data.mobile,
                    email:data.email,
                    orgId:data.orgId,
                    branchId:data.branchId,
                    roleId:data.roleId,
                    userId:data.id
                 });
 
                return res.status(200).send({
                    status: 'success',
                    data: {
                        token,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        email: data.email
                    }
                });
                return;
            }
           return res.status(401).send({
                status: 'error',
                message: 'Incorrect password'
            }); 
        }else{
            return res.status(401).send({
                status: 'error',
                message: 'Incorrect Email-ID'
            }); 
        } 
    } catch (err) {
        return res.status(500).send({
            status: "error",
            message: err
        });
    }
 
}