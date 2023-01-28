const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Branch extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        /*  static associate({ Organization, User}) {
             this.hasMany(Organization, { foreignKey: 'orgId', as: 'organizations' });
             this.hasMany(User, { foreignKey: 'userId', as: 'users' });
         }
  */
        toJSON() {
            return { ...this.get(), id: undefined }
        }
    }
    Branch.init(
        {
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
                validate: {
                    notNull: { msg: 'Branch must have a name' },
                    notEmpty: { msg: 'Name must not be empty' },
                },
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Branch must have a description' },
                    notEmpty: { msg: 'description must not be empty' },
                },
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
                validate: {
                    notNull: { msg: 'Branch must have a email' },
                    notEmpty: { msg: 'email must not be empty' },
                    isEmail: { msg: 'Must be a valid email address' },
                },
            },
            mobile: {
                type: DataTypes.BIGINT(11),
                allowNull: false,
                unique: true,
                validate: {
                    notNull: { msg: 'Branch must have a mobile' },
                    notEmpty: { msg: 'mobile must not be empty' }
                },
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Branch must have a address' },
                    notEmpty: { msg: 'address must not be empty' }
                },
            },
            phone: {
                type: DataTypes.BIGINT(20),
                allowNull: true
            },
            status: {
                type: DataTypes.ENUM('0', '1'),
                defaultValue: '0',
            },
            orgId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            branchId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            createdBy: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            updatedBy: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            sequelize,
            tableName: 'branch',
            modelName: 'Branch',
        }
    )
    return Branch
}