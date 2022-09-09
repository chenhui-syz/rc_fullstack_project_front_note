# 3-23 sequelize 底层连接池实现原理

sequelize  连接池 就是 一个Pool 类的实例。 底层通过 `ConnectionManager` 类的 initPools 方法 来集中管理 Pool 类实例。

```js
class ConnectionManager  {
    if (!config.replication) {
      this.pool = new Pool({
        name: "sequelize",
        create: () => this._connect(config),
        destroy: async (connection) => {
          const result = await this._disconnect(connection);
          debug("connection destroy");
          return result;
        },
        validate: config.pool.validate,
        max: config.pool.max,
        min: config.pool.min,
        acquireTimeoutMillis: config.pool.acquire,
        idleTimeoutMillis: config.pool.idle,
        reapIntervalMillis: config.pool.evict,
        maxUses: config.pool.maxUses
      });
      this.pool = {
      release: (client) => {
        if (client.queryType === "read") {
          this.pool.read.release(client);
        } else {
          this.pool.write.release(client);
        }
      },
      acquire: (queryType, useMaster) => {
        useMaster = useMaster === void 0 ? false : useMaster;
        if (queryType === "SELECT" && !useMaster) {
          return this.pool.read.acquire();
        }
        return this.pool.write.acquire();
      },
      destroy: (connection) => {
        this.pool[connection.queryType].destroy(connection);
        debug("connection destroy");
      },
      destroyAllNow: async () => {
        await Promise.all([
          this.pool.read.destroyAllNow(),
          this.pool.write.destroyAllNow()
        ]);
        debug("all connections destroyed");
      },
      drain: async () => Promise.all([
        this.pool.write.drain(),
        this.pool.read.drain()
      ]),
      read: new Pool({
        name: "sequelize:read",
        create: async () => {
          const nextRead = reads++ % config.replication.read.length;
          const connection = await this._connect(config.replication.read[nextRead]);
          connection.queryType = "read";
          return connection;
        },
        destroy: (connection) => this._disconnect(connection),
        validate: config.pool.validate,
        max: config.pool.max,
        min: config.pool.min,
        acquireTimeoutMillis: config.pool.acquire,
        idleTimeoutMillis: config.pool.idle,
        reapIntervalMillis: config.pool.evict,
        maxUses: config.pool.maxUses
      }),
  
}
```
