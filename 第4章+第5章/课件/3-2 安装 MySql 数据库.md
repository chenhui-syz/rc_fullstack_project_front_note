# 3-2 安装 MySql 数据库

操作系统：win10

**如果之前电脑安装过 mysql 8 以上的版本，无需重装。**

第一步：解压 mysql-8.0.28-winx64 （选择几百MB的那个大的msi包，下载后安装选择仅安装mysql就行了）

第二步：解压根目录下新建 my.ini 文件

第三步：打开 my.ini 文件，修改如下：

![image.png](assets/image-20220430132057-tt2gqrb.png)

第四步: 修改环境变量

首先：找到设置，选择环境变量。

![image.png](assets/image-20220430132334-5j1lwx5.png)

 选择环境变量

![image.png](assets/image-20220430132448-5jx3kpi.png)

 找到Path 

![image.png](assets/image-20220430132614-vog8r0k.png)

添加环境变量 【你的mysql 解压目录下的bin目录】

![image.png](assets/image-20220430132923-61yqqpn.png)

初始化 data 目录

操作：管理员身份进入 cmd ，进入到mysql的安装目录中，输入mysqld --initialize-insecure（生成data文件夹，这个文件夹一定不要手动生成，要依靠这个指令去生成）

![image.png](assets/image-20220430133408-fldsw4y.png)

在 管理员身份的 cmd 中 安装 mysql 服务, 服务名为 mysql 

命令：mysqld --install mysql --defaults-file="G:\mysql8\my.ini"

mysqld --install mysql --defaults-file="D:\mysql\my.ini"

![image.png](assets/image-20220430133621-1ynvikw.png)

查看安装成功的服务

![image.png](assets/image-20220430133846-hh6cvtc.png)


开启 mysql 服务

![image.png](assets/image-20220430140229-w4018sy.png)

