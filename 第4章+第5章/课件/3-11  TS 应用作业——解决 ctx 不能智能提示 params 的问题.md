# 3-11 TS 应用——解决 ctx 不能智能提示 params 的问题

3-10 中 我们发现 ctx.params 中没有params自动提示，结合第章讲解的经验来完成自动提示功能

```ts
router.get("/findUserinfo/:username", async (ctx:Context)=>{
       const {username}= ctx.params
       ctx.body=`欢迎! ${username}`
})
```
