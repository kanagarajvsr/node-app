const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /* static associate({ Organization, Branch, Role,User}) {
      this.hasMany(Organization, { foreignKey: 'orgId', as: 'organizations' });
      this.hasMany(Branch, { foreignKey: 'branchId', as: 'branch' });
      this.hasMany(Role, { foreignKey: 'roleId', as: 'roles' });
      this.hasMany(User, { foreignKey: 'userId', as: 'users' });
    } */

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: 'User must have a username' },
          notEmpty: { msg: 'username must not be empty' },
        },
      },
      password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: 'User must have a password' },
          notEmpty: { msg: 'password must not be empty' },
          //is: /^[0-9a-f]{64}$/i
        }
      },
      firstname: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a firstname' },
          notEmpty: { msg: 'firstname must not be empty' },
        },
      },
      lastname: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a lastname' },
          notEmpty: { msg: 'lastname must not be empty' },
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: 'User must have a email' },
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
      gender: {
        type: DataTypes.ENUM('Male', 'Female'),
        allowNull: false,
        validate: {
          notNull: { msg: 'Branch must have a gender' },
          notEmpty: { msg: 'gender must not be empty' }
        }
      },
      status: {
        type: DataTypes.ENUM('0', '1'),
        defaultValue: '0',
      },
      master_status: {
        type: DataTypes.ENUM('M', 'O'),
        defaultValue: 'O',
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
      tableName: 'users',
      modelName: 'User',
    }
  )
  return User
}