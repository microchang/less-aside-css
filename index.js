'use strict';
var fs = require('fs');
var path = require('path');
var less = require('less');

function executeDir(_file) {

    if (path.basename(_file) === 'node_modules' || path.basename(_file) === '.git') {
        return;
    }
    if (fs.statSync(_file).isDirectory()) {
        addWatch(_file);
        let dirContents = fs.readdirSync(_file);
        dirContents.forEach(function(content) {
            executeDir(path.join(_file, content));
        });
    } else if (path.extname(_file) === '.less') {
        less2css(_file);
    }
}



/**
 * 监控file 不递归，递归由上层实现
 * @param  {string} file
 */
function addWatch(file) {
    if (!fs.statSync(file).isDirectory()) {
        return;
    }
    fs.watch(file, function(event, childFile) {
        //需要提炼成一个函数
        if (event !== 'change' || path.extname(childFile) !== '.less') {
            return;
        }
        let filePath = path.join(path.dirname(file), path.basename(file), childFile);
        less2css(filePath);

    });
}

/**
 * 将less文件转为css文件
 * @param  {string} file
 */
function less2css(file) {
    let lessContent = fs.readFileSync(file, 'utf8');
    lessContent = lessContent.replace(/@import\s*"/g, "@import \"" + path.dirname(file) + path.sep);
    less.render(lessContent, function(e, css) {
        if (e) {
            console.error('err file name:', file);
            throw e;
        }
        const fileName = path.join(path.dirname(file), path.basename(file, '.less') + '.css');
        fs.writeFileSync(fileName, css.css);
    });
}

process.on('uncaughtException', (err) => {
    console.error(err);
});


console.log('all less files has changed into css files at some dir.');
console.log('watching files changes...');

module.exports = function l2c(dir) {

    if (typeof dir !== 'string') {
        return;
    }

    executeDir(dir);

    // if (dir[0] === path.sep) {
    //     return executeDir(dir);
    // }

    //啊哈……一个坑……但是怎么填呢？
    // var dirPath = path.join(process.cwd(), dir);
    // executeDir(dirPath);
};