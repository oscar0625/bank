/**
 * example http://mockjs.com/examples.html#DPD
 * 1.数据模板定义规范 
 * 数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值 'name|rule': value
 * 2.数据占位符定义规范
 *  @cparagraph (min, max)  @csentence (min, max) @ctitle (min, max) @cword (min, max) 语句（从长到端）
 *  @cfirst @clast @cname 姓名
 *  @date 日期 @time 时间 @datetime 日期+时间 @now 当前日期时间
 *  @image ('200x100') 图片地址 @dataImage ('200x100') 图片base64
 *  @province @city @county 地区
 *  @color @rgb @rgba颜色 
 *  @range (0,10) [0,1,2,3,4,5,6,7,8,9]
 *  @guid  @id 全局唯一标识符id
 *  @boolean 布尔值
 *  @ip @email
 */
define(['mock', 'jq'], function (Mock) {
    // 使用 Mock
    var data = Mock.mock({
        //属性值是数字
        'number2|1-100': 0, //1-100随机
        'number3|1-100.1': 0, //1-100随机 小数点保留1位
        'number4|1-100.1-2': 0, //1-100随机 小数点保留1-2位

        //属性值是字符串
        'content|1-5': '@ctitle',

        //属性值是布尔型
        'bool': '@boolean', //随机生成一个布尔值
        //属性值是数组
        'type|1': [0, 1, 2, 3], //从数组中随机选取1个
        'list|1-10': [ //将数组重复1-10次
            {
                'id|+1': 0, //属性值自动加1
                'bool': '@boolean',
                'content1|1-3': /[\u4E00-\u9FA5]/,
                'content2|1-3': '这是一段测试数据',
                'content3|1-3': '@cparagraph',
            }
        ]
    })
    console.log(data);
})