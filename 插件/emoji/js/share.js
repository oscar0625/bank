function replaceReg(reg, str) {
    return str.replace(reg, function (m) {
        return '<a target="_blank" href="' + m + '">' + m + '</a>';
    })
}

var url_reg = /http:\/\/[\w-]*(\.[\w\/-]*)+/ig;

var emotions = {
    '[爱你]': 'images/biaoqing/d_aini.png',
    '[奥特曼]': 'images/biaoqing/d_aoteman.png',
    '[拜拜]': 'images/biaoqing/d_baibai.png',
    '[悲伤]': 'images/biaoqing/d_beishang.png',
    '[鄙视]': 'images/biaoqing/d_bishi.png',
    '[闭嘴]': 'images/biaoqing/d_bizui.png',
    '[馋嘴]': 'images/biaoqing/d_chanzui.png',
    '[吃惊]': 'images/biaoqing/d_chijing.png',
    '[打哈气]': 'images/biaoqing/d_dahaqi.png',
    '[顶]': 'images/biaoqing/d_ding.png',
    '[doge]': 'images/biaoqing/d_doge.png',
    '[防毒面具]': 'images/biaoqing/d_fangdumianju.png',
    '[肥皂]': 'images/biaoqing/d_feizao.png',
    '[感冒]': 'images/biaoqing/d_ganmao.png',
    '[鼓掌]': 'images/biaoqing/d_guzhang.png',
    '[哈哈]': 'images/biaoqing/d_haha.png',
    '[害羞]': 'images/biaoqing/d_haixiu.png',
    '[汗]': 'images/biaoqing/d_han.png',
    '[呵呵]': 'images/biaoqing/d_hehe.png',
    '[黑线]': 'images/biaoqing/d_heixian.png',
    '[哼]': 'images/biaoqing/d_heng.png',
    '[花心]': 'images/biaoqing/d_huaxin.png',
    '[挤眼]': 'images/biaoqing/d_jiyan.png',
    '[可爱]': 'images/biaoqing/d_keai.png',
    '[可怜]': 'images/biaoqing/d_kelian.png',
    '[酷]': 'images/biaoqing/d_ku.png',
    '[困]': 'images/biaoqing/d_kun.png',
    '[懒得理你]': 'images/biaoqing/d_landelini.png',
    '[泪]': 'images/biaoqing/d_lei.png',
    '[喵喵]': 'images/biaoqing/d_miao.png',
    '[男孩儿]': 'images/biaoqing/d_nanhaier.png',
    '[怒]': 'images/biaoqing/d_nu.png',
    '[怒骂]': 'images/biaoqing/d_numa.png',
    '[女孩儿]': 'images/biaoqing/d_nvhaier.png',
    '[钱]': 'images/biaoqing/d_qian.png',
    '[亲亲]': 'images/biaoqing/d_qinqin.png',
    '[生病]': 'images/biaoqing/d_shengbing.png',
    '[草泥马]': 'images/biaoqing/d_shenshou.png',
    '[失望]': 'images/biaoqing/d_shiwang.png',
    '[衰]': 'images/biaoqing/d_shuai.png',
    '[睡觉]': 'images/biaoqing/d_shuijiao.png',
    '[思考]': 'images/biaoqing/d_sikao.png',
    '[太开心]': 'images/biaoqing/d_taikaixin.png',
    '[偷笑]': 'images/biaoqing/d_touxiao.png',
    '[带着微博去旅行]': 'images/biaoqing/d_travel.png',
    '[吐]': 'images/biaoqing/d_tu.png',
    '[兔子]': 'images/biaoqing/d_tuzi.png',
    '[挖鼻屎]': 'images/biaoqing/d_wabishi.png',
    '[委屈]': 'images/biaoqing/d_weiqu.png',
    '[笑哭]': 'images/biaoqing/d_xiaoku.png',
    '[熊猫]': 'images/biaoqing/d_xiongmao.png',
    '[嘻嘻]': 'images/biaoqing/d_xixi.png',
    '[嘘]': 'images/biaoqing/d_xu.png',
    '[阴险]': 'images/biaoqing/d_yinxian.png',
    '[疑问]': 'images/biaoqing/d_yiwen.png',
    '[右哼哼]': 'images/biaoqing/d_youhengheng.png',
    '[晕]': 'images/biaoqing/d_yun.png',
    '[抓狂]': 'images/biaoqing/d_zhuakuang.png',
    '[猪头]': 'images/biaoqing/d_zhutou.png',
    '[左哼哼]': 'images/biaoqing/d_zuohengheng.png',
    '[给力]': 'images/biaoqing/f_geili.png',
    '[互粉]': 'images/biaoqing/f_hufen.png',
    '[囧]': 'images/biaoqing/f_jiong.png',
    '[萌]': 'images/biaoqing/f_meng.png',
    '[神马]': 'images/biaoqing/f_shenma.png',
    '[威武]': 'images/biaoqing/f_v5.png',
    '[喜]': 'images/biaoqing/f_xi.png',
    '[不要]': 'images/biaoqing/h_buyao.png',
    '[good]': 'images/biaoqing/h_good.png',
    '[哈哈]': 'images/biaoqing/h_haha.png',
    '[来]': 'images/biaoqing/h_lai.png',
    '[ok]': 'images/biaoqing/h_ok.png',
    '[弱]': 'images/biaoqing/h_ruo.png',
    '[握手]': 'images/biaoqing/h_woshou.png',
    '[耶]': 'images/biaoqing/h_ye.png',
    '[赞]': 'images/biaoqing/h_zan.png',
    '[作揖]': 'images/biaoqing/h_zuoyi.png',
    '[伤心]': 'images/biaoqing/l_shangxin.png',
    '[心]': 'images/biaoqing/l_xin.png',
    '[蛋糕]': 'images/biaoqing/o_dangao.png',
    '[飞机]': 'images/biaoqing/o_feiji.png',
    '[干杯]': 'images/biaoqing/o_ganbei.png',
    '[话筒]': 'images/biaoqing/o_huatong.png',
    '[蜡烛]': 'images/biaoqing/o_lazhu.png',
    '[礼物]': 'images/biaoqing/o_liwu.png',
    '[绿丝带]': 'images/biaoqing/o_lvsidai.png',
    '[围脖]': 'images/biaoqing/o_weibo.png',
    '[音乐]': 'images/biaoqing/o_yinyue.png',
    '[照相机]': 'images/biaoqing/o_zhaoxiangji.png',
    '[钟]': 'images/biaoqing/o_zhong.png',
    '[浮云]': 'images/biaoqing/w_fuyun.png',
    '[沙尘暴]': 'images/biaoqing/w_shachenbao.png',
    '[太阳]': 'images/biaoqing/w_taiyang.png',
    '[微风]': 'images/biaoqing/w_weifeng.png',
    '[鲜花]': 'images/biaoqing/w_xianhua.png',
    '[下雨]': 'images/biaoqing/w_xiayu.png',
    '[月亮]': 'images/biaoqing/w_yueliang.png'
};

function has(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}
var reg_bq = /\[.+?\]/g;
function replaceBq(reg, str) {
    return str.replace(reg, function (a, b) {
        return has(emotions, a) ? '<img src=\"' + emotions[a] + '\" class=\"emoji\">' : a;
    });
}
/*主函数*/
function shareicon() {
    $(".text").each(function () {
        var p = $(this);
        var text = replaceReg(url_reg, p.html());
        text = replaceBq(reg_bq, text);
        p.html(text);
        // console.log(p.html());
    });
}





