const { logger } = require('../utils/logger');
const { User, Organization, Branch, sequelize } = require('../models');
const { hash: hashPassword } = require('../utils/password');

(async () => {
    const hashedPassword = hashPassword("superadmin@123");
    const trans = await sequelize.transaction();
    try {
        const organization = await Organization.create({
            "name": "super3",
            "description": "admin",
            "phone": "1234552",
            "address": "Bangalore",
            "mobile": "9900181255",
            "email": "admin2@gmail.com",
            branchId: 1,
            orgId: 1,
            createdBy: 1
        }, { transaction: trans });

        const branch = await Branch.create({
            "name":"super4",
            "description":"admin",
            "phone":"123455",
            "address":"Bangalore",
            "mobile":"9900181815",
            "email":"admin4@gmail.com",
            branchId: 1,
            orgId: 1,
            createdBy: 1
        }, { transaction: trans });

        const user = await User.create({ 
            roleId: 1, 
            branchId: 1, 
            orgId: 1, 
            firstname: "kanagaraj", 
            lastname: "R", 
            username: "superadmin", 
            address: "Bangalore", 
            mobile: "9900181254", 
            gender: "Male", 
            status: 1, 
            master_status: "M", 
            email: "kanagarajvsr@gmail.com", 
            password: hashedPassword, 
            createdBy: 1 
        }, { transaction: trans })

            await trans.commit();
        logger.info("super user tables created successfully");
    } catch (err) {
        logger.error(`super user not create !!! ${err}`);
        await trans.rollback();
    }
})(); 