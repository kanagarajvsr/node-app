const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        /*  static associate({ Organization,Branch, User }) {
             this.hasMany(Organization, { foreignKey: 'orgId', as: 'organizations' });
             this.hasMany(Branch, { foreignKey: 'branchId', as: 'branch' });
             this.hasMany(User, { foreignKey: 'userId', as: 'users' });
         }
  */
        toJSON() {
            return { ...this.get(), id: undefined }
        }
    }
    Role.init(
        {
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
                validate: {
                    notNull: { msg: 'Role must have a name' },
                    notEmpty: { msg: 'Name must not be empty' },
                },
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Role must have a description' },
                    notEmpty: { msg: 'description must not be empty' },
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
            tableName: 'roles',
            modelName: 'Role',
        }
    )
    return Role
}