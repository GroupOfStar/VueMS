
## 服务器热加载启动
nodemon app.js

## nodemon.json配置说明
restartable-设置重启模式
ignore-设置忽略文件
verbose-设置日志输出模式，true 详细模式
execMap-设置运行服务的后缀名与对应的命令
{ “js”: “node –harmony” } 表示使用 nodemon 代替 node
watch-监听哪些文件的变化，当变化的时候自动重启
ext-监控指定的后缀文件名

## 记得注稀最后一行的：module.exports = app
这是 4.x 默认的配置，分离了 app 模块,将它注释即可，上线时可以重新改回来