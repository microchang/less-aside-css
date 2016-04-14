### less-aside-css

 将less文件转为同目录并且同名的css文件。
 
#### 安装
 
 `npm install less-aside-css -g`
 
#### 命令行使用
 
 进入静态文件目录，输入 `l2c`
 
 或者 `l2c {文件夹目录}`
 
#### js文件中调用
 
    var less2css = require('less-aside-css')；
    var path = require('path');
   
    //目前需要一个绝对路径
    less2css(path.join(__dirname,'./static');
   