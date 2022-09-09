import { Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'


@Table({
  tableName: 'userinfo',
})
export default class UserinfoModel extends Model<UserinfoModel> {
  @Column({
    type:DataTypes.INTEGER,
    field:"userid",
    primaryKey: true,
    autoIncrement: true,
  })
  userid!: number
  @Column({
    type:DataTypes.STRING(30),
    field:"username",
    allowNull:false
  })
  public username!: string
  @Column({
    type:DataTypes.STRING(20),
    field:"psw",
    allowNull:false
  })
  psw!: string
  @Column({
     type:DataTypes.STRING(20),
     field:"address",
     allowNull:false
  })
  address!: string
  @Column({
     type:DataTypes.TINYINT,
     field:"valid",
     allowNull:false
  })
  valid!: number

  token!: string
}
