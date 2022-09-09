# 3-16 日志封装——灵活运用 TS  封装  log4js

**1. 日志级别【依照输出信息重要或错误严重程度来确定的级别**】。

TRACE < DEBUG < INFO < WARN < ERROR < FATAL


**2. 日志逐步配置**

**2.1 appenders：级别输出目的地和输出文件名的格式配置**。

```ts
 log4js.configure({
      appenders: {
        // 输出目的地【追加器输出】配置，供categories 使用。
        console: { type: 'console' },
        // 直接配置文件。
        debug_file: { type: 'file', filename: 'mylog/debug.log' },
	// 按日期当文件名创建文件,执行该代码时生成一个mylog目录下的warn+日期为文件名的文件。
        info_file: { type: 'dateFile', filename: 'mylog/info', pattern: 'yyyy-MM-dd.log', encoding: 'utf-8', alwaysIncludePattern: true },
        warn_file: {
          type: 'dateFile',
          filename: 'mylog/warn',
          pattern: 'yyyy-MM-dd.log',
          encoding: 'utf-8',
          alwaysIncludePattern: true
        },
        error_file: {
          type: 'dateFile',
          filename: 'mylog/err',
          pattern: 'yyyy-MM-dd.log',
          encoding: 'utf-8',
          alwaysIncludePattern: true,
        },
      },
}
```

2.2 `categories`：输出级别和输出目的地配置。

```ts
    log4js.configure({
      categories: {
        default: {
          //  default日志输出配置对象注意两点 1.default 是固定关键字,不能修改，表示debug级别i遏制的配置
          appenders: ['console', 'debug_file'],
          // 日志级别，当输出的日志级别高于这个级别就能输出，低于这个级别就不能输出
          level: LevelInfo.debug,
        },
        info: {
          appenders: ['console', 'info_file'],
          level: LevelInfo.info,
        },
        warn: {
          appenders: ['console', 'warn_file'],
          level: LevelInfo.warn,
        },
      },
    })
```

**3. 给日志实例绑定 log4jsinstance 配置。**

把 2 中配置的 categories 分配给 log4jsinstance 实例。

```ts

  getCategories(level: LevelInfo) {
    this.log4jsInstance = log4js.getLogger(level)
  }
```

**4. 设置各个级别的日志方法。**

```ts
  debug(input: string) {
    this.getCategories(LevelInfo.debug)
    this.log4jsInstance.debug(input)
  }
  info(input: string) {
    this.getCategories(LevelInfo.info)
    this.log4jsInstance.info(input)
  }
  warn(input: string) {
    this.getCategories(LevelInfo.warn)
    this.log4jsInstance.warn(input)
  }
  error(input: string) {
    this.getCategories(LevelInfo.error)
    this.log4jsInstance.error(input)
  }
  fatal(input: string) {
    this.getCategories(LevelInfo.fatal)
    this.log4jsInstance.fatal(input)
  }
```

**5. 在全局异常中测试日志。**
