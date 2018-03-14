/*
* require�ᶨ������ȫ�ֱ�����
* define����������һ��ģ��
* require===requirejs(һ��ʹ��require�����)�� ��������ģ�飬��ִ�м������Ļص�����
*
* */


/*һ������ģ�����λ��*/

require.config({
    // ���ø�Ŀ¼
    baseUrl:'./js',
    // ���ñ���
    paths:{
        jq:'../script/jquery-1.7.2.min',  //����js��׺
        d1:'define1',
        d4:'define4',
        noAmd:'notAMDMoudle'

    },

    /*����Ϊ�ǻ������� ��Ҫʱ������*/
    //shim
    /*����1������ģ���������ϵ���������ģ�����֮ǰ���Ȱ�deps�����ģ���ȼ�������
      ����2�����طǹ淶��ģ��,��Щ�ⲻ��AMD���ݵģ���ʱ����Ҫָ��shim���Ե�ֵ��shim�������ɡ���Ƭ������������require.js���ط�AMD�淶�Ŀ⡣&&&&&& ����Ҫ
    */
    shim:{
        /*ֻ�������������Ҫ�����κ�ģ��ֵ*/
        d4:['jq'],
        /*������������Ҫ�����κ�ģ��ֵ*/
        noAmd:{
          deps:['jq'],
          exports:'oscar'   // ����Ҫ����notAMDMoudle.js�б���������һ��
        }
    },
    /*Requirejs���س�ʱ�����һ���������������waitSeconds=0*/
    waitSeconds: 0
});


/*��������ģ��*/
//1.���ط���amd�淶��ģ��
require(['d4'],                     //���ص�ģ������������ʽ�����Լ��ض��ģ�� ���ض��ģ��ʱ ����1��Ӧģ��1  ����2��Ӧģ��2
        function (a) {              //�ص�����������ģ��������֮����ִ�У�ִֻ��һ��
            console.log(a);         //�ص������Ĳ������Ǽ��ص�ģ������չ�����Ķ���  �൱��module.exports
        }
    );
//2.����jsonp
// require(["http://example.com/api/data.json?callback=define"],
//     //requireJS��ʹ��JSONP������Ҫ��callback������ֵָ��Ϊ"define"��
//     function (data) {
//         console.log(data);
//     }
// );

// //3.���ز�����amd�淶��ģ��
// require(['noAmd'], function (a) {
//     //��û����shim�����õ� exports  a��ֵΪundefined
//     console.log(a)
// });



/*��������ģ��  ���ֶ��巽ʽ */

/*1 �������*/
// define(
//     /*��ģ��Ҫ���������� ���Ǵ˶���*/
//     {a:1, b:2}
// );

/*2 ���庯��*/
// define(function () {
//     /*��ģ��Ҫ���������� ����return��ֵ ע:ģ�鲻�ط��ض����κ���Ч�ĺ�������ֵ��������ġ�*/
//    return function () {
//        console.log(111)
//    }
// });

/*3 ���� ����������ϵ�Ķ��庯�� ��һ������Ӧ����һ���������������飬���ڶ�������Ӧ����һ�����庯����*/
// define(['d1','d4'], function (a,b) {
//     console.log(a);
//     console.log(b);
//     /*��ģ��Ҫ���������� ����return��ֵ*/
//     return 2
// });

/*4 ����cmd ģ��*/
// define(function(require,exports,module){
//     //����d1ģ�� ����ȡd1���������
//     var a = require('d1');
//     console.log(a);
//
//     /*��ģ��Ҫ���������ݾ���exports �����ֵ�����ʽ*/
//     //a.ֱ���޸�exports�󵼳�
//     exports.abc = 888;
//     //d.ֱ�Ӹ���exports�󵼳�
//     //module.exports = {
//     //    abc:888
//     //}
// });

/*�ġ�����*/
//1.������Ҫ��ǰ����Ľ������
    //a.
    // define(['d1','d4'], function (a,b) {
    //     //d1 d4���� ���ڻص�����ִ��֮ǰ����
    // });
    //b.ͨ��shim ��ǰ��������

    /*ע�⣺
     define(['d1','d4'], function () {});
     require(['d1','d4'], function () {});
     shim:{
         noAmd:{
            deps:['d1','d4'],
         }
     },
     d1 d4 ����������˳���Ⱥ�˳���ǲ�һ����*/


