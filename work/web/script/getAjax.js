define(['jq'],function () {
    function getAjax(url, data, callback,loading) {
        $.ajax({
            type: 'get',
            url: url,
            data: data,
            dataType: 'json',
            beforeSend:function () {
                if( typeof loading ==='function'){
                    loading()
                }
            },
            success: function (res) {
                callback(res)
            }
        })
    }
    return getAjax
})