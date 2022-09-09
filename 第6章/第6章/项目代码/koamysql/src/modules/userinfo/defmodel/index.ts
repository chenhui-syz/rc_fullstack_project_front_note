import { DataTypes } from 'sequelize'
import { sequelize } from '../../BaseDao'
class Userinfo {
  static createModel() {
    const model = sequelize.define(
      'userinfo',
      {
        userid: {
          type: DataTypes.INTEGER,
          field: 'userid',
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING(30),
          field: 'username',
          allowNull: false,
        },
        psw: {
          type: DataTypes.STRING(20),
          field: 'psw',
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(50),
          field: 'address',
          allowNull: true,
        },
        valid: {
          type: DataTypes.TINYINT,
          field: 'valid',
          allowNull: true,
        },
      },
      {
        //freezeTableName: true, // true表示使用给定的表名，false表示模型名后加s作为表名
        timestamps: false, //true表示给模型加上时间戳属性(createAt、updateAt),false表示不带时间戳属性
      }
    )
    //model.sync({force:false})
    return model
  }
}

export const model = Userinfo.createModel()
