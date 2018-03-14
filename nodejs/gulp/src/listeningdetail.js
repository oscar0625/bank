define(function () {
    (function ($) {
        var ctrl={
            callback:function(data){
                console.log(data.commentInfo.comment);
                var str='';
                $.each(data.commentInfo.comment, function () {
                    var arr=this.time.split(/\s+/);
                    var month=arr[0].split('-')[1];
                    var date=arr[0].split('-')[2];
                    var hours=arr[1].split(':')[0];
                    var min=arr[1].split(':')[1];
                    str+='<li><div class="top clearfix"><img src="images/topic_header.png" alt=""/><span>'+this.name+'</span><i><img src="images/time.png" alt=""/><b>'+month+'/'+date+'</b>'+hours+':'+min+'</i></div><div class="middle"><p>'+this.content+'</p></div><div class="bottom clearfix"><div class="clearfix"><img src="images/good.png" alt=""/><em>'+this.like+'</em><img src="images/comment.png" alt=""/><em>'+this.message+'</em></div></div></li>'
                });
                $('.comment .comment_content ul').append(str);
            },
            init: function () {
                model.getData('http://iwen.wiki/sxtstu/blueberrypai/getListeningComment.php',this.callback,{conmment_id:1});
            }
        };
        ctrl.init();
    })(Zepto)
});
