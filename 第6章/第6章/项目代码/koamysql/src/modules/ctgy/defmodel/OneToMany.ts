import { secondCtgyModel } from './secctgymodel'
import { thirdCtgyModel } from './ThirdCtgyModel'

//  ManyToOne
thirdCtgyModel.belongsTo(secondCtgyModel, { foreignKey: 'secctgyId', targetKey: 'secondctgyid' })
// OneToMany
secondCtgyModel.hasMany(thirdCtgyModel, { as: 'thirdctgy', foreignKey: 'secctgyId' })
async function findAllSecThrdCtgys() {
  const result = await secondCtgyModel.findAll({
    raw: true,
    include: [
      {
        model: thirdCtgyModel,
        as: 'thirdctgy',
      },
    ],
  })
  console.log('result:', result)
}
findAllSecThrdCtgys()
// async function findAllSecThrdCtgys2() {
//   const { rows, count } = (await secondCtgyModel.findAndCountAll({
//     raw: true,
//     include: [
//       {
//         model: thirdCtgyModel,
//         as: 'secctgy',
//       },
//     ],
//   })) as any
//   console.log('rows:', rows)
//   console.log('count:', count)
// }
