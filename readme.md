## less-aside-css

 将less文件转为同目录并且同名的css文件。递归遍历子文件夹。


#### 安装 
 
 `npm install less-aside-css -g` （命令行使用）
 
 `npm install less-aside-css --save-dev` (js文件中调用)
 
#### 命令行使用 
 
 进入静态文件目录，输入：
  
  `l2c -w`
 
 或者：
 
  `l2c -d={文件夹目录} -w`
  
  *目前接受两个参数 -d指定文件夹目录，-w指定是否监控文件变化*

 
#### js文件中调用 
 
    var less2css = require('less-aside-css')；
    var path = require('path');
   
    var options={
        isWatch:true
    };
    //目前需要一个绝对路径
    less2css(path.join(__dirname,'./static',options);
   
----

## less-aside-css

 Change less file into css file in same folder.Recursively.
 
#### Install
 
 `npm install less-aside-css -g` (CLI use)
 
 `npm install less-aside-css --save-dev` (useing in js file)
#### CLI use
 
 cd static file folder,enter:
 
 `l2c -w`
 
 or:
 
 `l2c -d={folder} -w`
 
 *now we accept two args:**d** for folder,and **w** for watch file changes.*
 
#### Using in js file
 
    var less2css = require('less-aside-css')；
    var path = require('path');
   
    var options={
        isWatch:true
    };
   
    //now it need a absolute path
    less2css(path.join(__dirname,'./static',options);


----

## TODO & NOTICE

less 文件中的 `@import ”xxx.less“` 处，目前只能限定为import文件时使用**双引号**包裹文件名。

----

## License

[MIT](LICENSE.md)