define(function () {
    (function ($) {
        var ctrl={
            zt:1,
            rests: function () {
                var $this=this;
                $(".aside .btn").on('tap', function () {
                    if($this.zt){
                        $(this).parent().next().removeClass('hide');
                        $this.zt=0;
                    }else{
                        $(this).parent().next().addClass('hide');
                        $this.zt=1;
                    }
                })
            },
            callback: function (data) {
                //console.log(data);
                var html="";
                $.each(data.listening, function () {
                    html+='<li><div class="top clearfix"><img src="'+this.head_pic+'" alt=""/><span>'+this.writer+'</span><a href="">'+this.label+'</a></div><div class="middle"><img src="'+this.img+'" alt=""/><p>'+this.series+'</p><span>12</span></div><div class="bottom clearfix"><img src="images/good.png" alt=""/><em>'+this.like+'</em><img src="images/comment.png"alt=""/><em>'+this.message+'</em></div></li>'
                });
                $('.content ul').append(html);
            },
            init: function () {
                model.getData('http://iwen.wiki/sxtstu/blueberrypai/getListeningInfo.php',this.callback);
                this.rests()
            }
        };
        ctrl.init();
    })(Zepto)
});
