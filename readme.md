### less-aside-css

 将less文件转为同目录并且同名的css文件。递归遍历子文件夹。
 

#### 安装 
 
 `npm install less-aside-css -g`
 
#### 命令行使用 
 
 进入静态文件目录，输入 `l2c`
 
 或者 `l2c {文件夹目录}`

 
#### js文件中调用 & using in js file
 
    var less2css = require('less-aside-css')；
    var path = require('path');
   
    //目前需要一个绝对路径(now it need a absolute path)
    less2css(path.join(__dirname,'./static');
   

----

### less-aside-css

 Change less file into css file in same folder.Recursively.
 
 #### Install
 
 `npm install less-aside-css -g`
 
 #### CLI use
 
 cd static file folder,enter `l2c`
 
 #### Using in js file
 
    var less2css = require('less-aside-css')；
    var path = require('path');
   
    //now it need a absolute path
    less2css(path.join(__dirname,'./static');