define(function(){var s;s=Zepto,{zt:1,rests:function(){var i=this;s(".aside .btn").on("tap",function(){i.zt?(s(this).parent().next().removeClass("hide"),i.zt=0):(s(this).parent().next().addClass("hide"),i.zt=1)})},callback:function(i){var t="";s.each(i.listening,function(){t+='<li><div class="top clearfix"><img src="'+this.head_pic+'" alt=""/><span>'+this.writer+'</span><a href="">'+this.label+'</a></div><div class="middle"><img src="'+this.img+'" alt=""/><p>'+this.series+'</p><span>12</span></div><div class="bottom clearfix"><img src="images/good.png" alt=""/><em>'+this.like+'</em><img src="images/comment.png"alt=""/><em>'+this.message+"</em></div></li>"}),s(".content ul").append(t)},init:function(){model.getData("http://iwen.wiki/sxtstu/blueberrypai/getListeningInfo.php",this.callback),this.rests()}}.init()});
//# sourceMappingURL=listening.js.map