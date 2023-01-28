const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Menu extends Model {
         toJSON() {
            return { ...this.get(), id: undefined }
        }
    }
    Menu.init(
        {
            page: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
                validate: {
                    notNull: { msg: 'Menu must have a name' },
                    notEmpty: { msg: 'Name must not be empty' },
                },
            },
            actions: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Menu must have a actions' },
                    notEmpty: { msg: 'actions must not be empty' },
                },
            },
            status: {
                type: DataTypes.ENUM('0', '1'),
                defaultValue: '0',
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
            tableName: 'menu',
            modelName: 'Menu',
        }
    )
    return Menu
}