# 3-32 sequelize 多表关联局限性—sequelize 返回结果和前端显示要求相差太远

**第一步：完成级联查询【二级分类表和三级分类表级联查询】**

```js
// 建立二级分类表模型和三级分类模型的关联
thirdCtgyModel.belongsTo(secondCtgyModel, { as: 'thirdctgy', foreignKey: 'secctgyid', targetKey: 'secondctgyid' })
secondCtgyModel.hasMany(thirdCtgyModel, { as: 'secctgy', foreignKey: 'secctgyid' })

// 查询
async function findSecondCtgys() {
  let result = await secondCtgyModel.findAll({
    raw: true, //   raw: true,  这个属性表示让底层开启原生查询。
    include: [
      {
        model: thirdCtgyModel,
        as: 'secctgy',
      },
    ],
  })
  console.log('result:', result)
}
```

**第二步：级联查询结果**

这是通过 sequelize 查询出来的二级三级分类数据片段。

![image.png](assets/image-20220515130344-rxjoi3x.png)


![image.png](assets/image-20220515130421-2jnsnhf.png)

##### 实际前端需要的级联数据格式：

```js
const result=[
  {
    secondctgyid: 1,
    secctgyname: '0-2岁',
    firstctgyId: 1,
    thirdctgys:[
      {
        thirdctgyid: 6,
        thirdctgyname: '入园准备',
        secctgyid: 1
      },
      {
        thirdctgyid: 5,
        thirdctgyname: '艺术课堂',
        secctgyid: 1
      },
      {
        thirdctgyid: 4,
        thirdctgyname: '纸板书',
        secctgyid: 1
      },
    ]
  }]
```
