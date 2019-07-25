define(['mock', 'jq'], function (Mock) {
    //demo
    Mock.mock(/\/47.94.205.149:8005\//, function (options) {
        var data = [];
        switch (options.url) {
            case 'http://47.94.205.149:8005/api/achievement/getmilitaryachi':
                data = Mock.mock({
                    'list|1-10': [ //将数组重复1-10次
                        {
                            'id|+1': 0, //属性值自动加1
                            'bool': '@boolean',
                            'title': '@ctitle',
                            'content': '@cparagraph',
                        }
                    ]
                });
                break;
            case 'http://47.94.205.149:8005/api/achievement/getmilitaryachipercent':
                data = Mock.mock({
                    'list|1-10': [ //将数组重复1-10次
                        {
                            'id|+1': 0, //属性值自动加1
                            'bool': '@boolean',
                            'title': '@ctitle',
                            'content': '@cparagraph',
                        }
                    ]
                });
                break;
            case 'http://47.94.205.149:8005/api/patent/gethdpatenttendency':
                data = Mock.mock({
                    'list|1-10': [ //将数组重复1-10次
                        {
                            'id|+1': 0, //属性值自动加1
                            'bool': '@boolean',
                            'title': '@ctitle',
                            'content': '@cparagraph',
                        }
                    ]
                });
                break;
        }
        return data
    })

    $.ajax({
        type: 'get',
        url: 'http://47.94.205.149:8005/api/achievement/getmilitaryachi',
        dataType: 'json',
        success: function (res) {
            console.log(res);
        }
    })
    $.ajax({
        type: 'get',
        url: 'http://47.94.205.149:8005/api/achievement/getmilitaryachipercent',
        dataType: 'json',
        success: function (res) {
            console.log(res);
        }
    })
    $.ajax({
        type: 'get',
        url: 'http://47.94.205.149:8005/api/patent/gethdpatenttendency',
        dataType: 'json',
        success: function (res) {
            console.log(res);
        }
    })
})