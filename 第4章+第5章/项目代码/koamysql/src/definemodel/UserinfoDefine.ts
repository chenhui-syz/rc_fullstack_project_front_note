import { DataTypes } from 'sequelize'
import { Model } from 'sequelize-typescript'
import test from '../dao/test'
import { sequelize } from '../dao/BaseDaoDefine'
export class UserModel extends Model<UserModel> {
  userid!: number
  username!: string
  psw!: string
  address!: string
  valid!: number

  static createUserModel() {
    console.log('创建模型')
    console.log(test)
    const usermodel = sequelize.define(
      'userinfo',
      {
        userid: {
          type: DataTypes.INTEGER, //表示属性的数据类型
          field: 'userid', //属性对应的列名,若不定义field则表中的列名(userid)就是属性名
          primaryKey: true, //表示主键
          autoIncrement: true, //表示主键自增
        },
        username: {
          type: DataTypes.STRING(30),
          field: 'username',
          allowNull: false, //表示当前列是否允许为空，false表示该列不能为空
          //unique:true    //表示该列的值必须唯一
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
        freezeTableName: true, //true表示使用给定的表名，false表示模型名后加s作为表名
        timestamps: false, //true表示给模型加上时间戳属性(createAt、updateAt),false表示不带时间戳属性
      }
    )
    usermodel.sync({ force: true })
    return usermodel
  }
}

export default UserModel.createUserModel()
