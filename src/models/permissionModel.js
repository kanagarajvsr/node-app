const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Permission extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        /*  static associate({ Organization, Branch, Role, User }) {
             this.hasMany(Organization, { foreignKey: 'orgId', as: 'organizations' });
             this.hasMany(Branch, { foreignKey: 'branchId', as: 'branch' });
             this.hasMany(Role, { foreignKey: 'roleId', as: 'roles' });
             this.hasMany(User, { foreignKey: 'userId', as: 'users' });
         } */

        toJSON() {
            return { ...this.get(), id: undefined }
        }
    }
    Permission.init(
        {
            permission: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
                validate: {
                    notNull: { msg: 'Permission must have a permission name' },
                    notEmpty: { msg: 'Name must not be empty' },
                },
            },
            pagename: {
                type: DataTypes.STRING(100),
                allowNull: false,
                validate: {
                    notNull: { msg: 'Permission must have a pagename' },
                    notEmpty: { msg: 'pagename must not be empty' },
                },
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
            roleId: {
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
            tableName: 'permissions',
            modelName: 'Permission',
        }
    )
    return Permission
}