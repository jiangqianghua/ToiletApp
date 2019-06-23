var express = require('express');
var router = express.Router();
var fs = require('fs');

var PATH = './public/data/'
/* GET home page. */

// 读取数据
// data/read?type?it
// data/read?type=it.json
//http://127.0.0.1:3000/data/read?type=it
router.get('/read', function(req, res, next) {
var type = req.param('type') || '';
console.log(PATH + type + '.json' )
fs.readFile(PATH + type + '.json' , function(err , data){
        if(err){
            return res.send({
                status: 0,
                info: '读取文件出现异常'
            });
        }
        var COUNT = 50;
        var obj = []
        try{
            obj = JSON.parse(data.toString());
        }catch(e){
            obj = []
        }
        if(obj.length > COUNT){
            obj = obj.slice(0, COUNT);
        }
        return res.send({
            status: 1,
            data: obj
        });
    });
});

// 数据存储
//http://127.0.0.1:3000/data/write?type=it&img=aa&title=title&url=url
router.get('/write', function(req , res, next){
    var type = req.param('type') || '';
    var url = req.param('url') || '';
    var title = req.param('title') || '';
    var img = req.param('img') || '';
    if(!type || !url || !title || !img) {
        return res.send({
            status:0,
            info: '提交信息不全',
        });
    }
    var filePath = PATH + type + '.json';
    // 读取文件
    fs.readFile(filePath, function(err ,data){
        if(err){
            return res.send({
                status: 0,
                info: '读取数据错误'
            });
        }
        var arr = JSON.parse(data.toString());
        var obj = {
            img: img,
            url: url,
            title: title,
            id: guidGenerate(),
            time: new Date()
        };
        arr.splice(0, 0, obj);
        // 写入文件
        var newData = JSON.stringify(arr);
        fs.writeFile(filePath, newData, function(err ,data){
            if(err){
                return res.send({
                    status: 0,
                    info: '保存数据错误'+ err
                });
            }
            return res.send({
                status: 1,
                info: obj
            });
        })
    });
});

//guid
function guidGenerate() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    }).toUpperCase();
}
module.exports = router;
