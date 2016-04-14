'use strict';
var fs = require('fs');
var path = require('path');
var less = require('less');
var args = process.argv;

var dealDir = args[2] || __dirname;


getFileFormDir(dealDir);


function getFileFormDir(_file) {
    if (path.basename(_file) == 'node_modules') {
        return;
    }
    if (fs.statSync(_file).isDirectory()) {
        addWatch(_file);
        let dirContents = fs.readdirSync(_file);
        dirContents.forEach(function(content) {
            getFileFormDir(path.join(_file, content));
        });
    } else if (path.extname(_file) === '.less') {
        less2css(_file);
    }
}



/**
 * 监控file 不递归，递归由上层实现
 * @param  {any} file
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
    const lessContent = fs.readFileSync(file, 'utf8');
    less.render(lessContent, function(e, css) {
        if (e) {
            console.error(file);
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