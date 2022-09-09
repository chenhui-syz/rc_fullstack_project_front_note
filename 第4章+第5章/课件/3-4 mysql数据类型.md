# 3-4 mysql数据类型

mysql8开始做了一个改进，中文和英文字母都是占用一个字节，mysql8之前一个中文是2个字节

**字符类型：**

主要有 char、varchar、text

char ( 固定长度）1-255 字节，手机号码定义成char(11)

varchar (可变长） 1-255 字节，varchar(30)的实际储存长度是可伸缩的，最多占用30个字节

text ( 大文本） 65535 字节

**整数类型：**一个字节最大能够达到127，比如说年龄，设置成tinyint就可以了。 int是最常用的

 tinyint（1个字节）、smallint（占2个字节）、mediumint（占3个字节）、

int（占4个字节）、bigint（占8个字节）

**浮动类型：**

float（占4个字节）丶double（占8个字节）

**日期/时间类型：**

主要是 DATE（占3个字节）、DATETIME（占8个字节）  两种类型
