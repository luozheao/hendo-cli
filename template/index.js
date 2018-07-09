var _utils = require('../lib/utils.js');

//第一步,拿数据
var options=require('./config.js')
//options结构太深,会不能正常解析
for(var i in options.options){
    if(typeof options.options[i] == 'object'){
        options.options[i]=JSON.stringify(options.options[i]);
    }
}


//第二步,拿模板
var templateVue = _utils.getTemplate('ox-table.create.vue');
var templateJs = _utils.getTemplate('ox-table.create.js');
var templateCss = _utils.getTemplate('ox-table.create.css');

//第三步,编译
var sourceVue = templateVue({
    name:'luojie',
    fileName:'ox-table',
    style:'css'
});


var sourceJs =  templateJs(options);
var sourceCss = templateCss({
    name:'luojie',
    fileName:'ox-table',
    style:'css'
});

//第四步,生成页面

_utils.writeFile('template/ox-table.vue', changeStr(sourceVue));
_utils.writeFile('template/ox-table.js', changeStr(sourceJs));
_utils.writeFile('template/ox-table.css', changeStr(sourceCss));

function changeStr (source) {
    source = source.replace(/&#x27;/gi, '\'')// 以后用更优雅的方式改过来
    source = source.replace(/&quot;/gi, '\"')// 以后用更优雅的方式改过来
    return source;
}