/**
 * Created by Administrator on 2017/2/4.
 */
//ֻ����js�ж���ģ��
//����ģ��
define(function (require) {
    //����ָ����ģ�� ���Զ��,require���Լ���ģ�鵫�ǲ��ṩ�ص�����   //��ͬ��seajs.use
    //require��ͬ������ִ�еģ���Ҫ���첽����ģ�����ʹ�� require.async �����м��أ�
    require.async('app', function (exports) {
        //ͨ����һ������exports��ȡappģ�������⿪�ŵĽӿ�
        console.log(exports)
    })
});