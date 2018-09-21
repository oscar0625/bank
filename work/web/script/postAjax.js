define(['jq'],function () {
    function postAjax(url, data, callback,loading) {
        $.ajax({
            type: 'post',
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
    return postAjax
})