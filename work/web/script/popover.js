define(['dialog'],function (dialog) {
    return {
        //弹出框
        message:function (content) {
            dialog({title: '提示信息', content:content, width:300, height:50,skin:'artdialogCenter'}).showModal()
        }
    }
});
