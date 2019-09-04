/**
 * 判断一个点是否在多边形内的算法:
    有这样一个算法,假设现在有一个点和一个多边形,这个多边形可以是凸多边形也可以是凹多边形.找到这个点,然后从这个点水平往左画一条射线,方向指向左边,然后你找一下这条射线和多边形的各条边是否相交,统计一下相交的次数,如果相交偶数次,说明点在多边形外面,如果相交奇数次,说明点在多边形内.具体可以多画画试试
 */
(function (name, factory) {
    var hasDefine = typeof define === 'function',
        hasExports = typeof moudle !== 'undefined' && moudle.exports;
    if (hasDefine) {
        define(factory)
    } else if (hasExports) {
        moudle.exports = factory();
    } else {
        window[name] = factory();
    }
})('isInPolygon', function () {
    //计算向量叉乘 
    var crossMul = function (v1, v2) {

        return v1.x * v2.y - v1.y * v2.x;

    };

    //javascript判断两条线段是否相交  
    var isCross = function (p1, p2, p3, p4) {

        var v1, v2, v3, v;

        v1 = {
            x: p1.x - p3.x,
            y: p1.y - p3.y
        };

        v2 = {
            x: p2.x - p3.x,
            y: p2.y - p3.y
        };

        v3 = {
            x: p4.x - p3.x,
            y: p4.y - p3.y
        };

        v = crossMul(v1, v3) * crossMul(v2, v3);

        v1 = {
            x: p3.x - p1.x,
            y: p3.y - p1.y
        };

        v2 = {
            x: p4.x - p1.x,
            y: p4.y - p1.y
        };

        v3 = {
            x: p2.x - p1.x,
            y: p2.y - p1.y
        };

        return (v <= 0 && crossMul(v1, v3) * crossMul(v2, v3) <= 0) ? true : false;

    };

    //判断点是否在多边形内 
    var isInPolygon = function (point, polygon) {

        var p1, p2, p3, p4, count = 0;

        p1 = point;

        p2 = {
            x: -100,
            y: point.y
        };

        //对每条边都和射线作对比  

        for (var i = 0; i < polygon.length - 1; i++) {

            p3 = polygon[i];

            p4 = polygon[i + 1];

            if (isCross(p1, p2, p3, p4) == true) {
                count++;
            }

        }

        p3 = polygon[polygon.length - 1];

        p4 = polygon[0];

        if (isCross(p1, p2, p3, p4) == true) {

            count++;

        }

        // console.log(count)

        return (count % 2 == 0) ? false : true;

    }

    return isInPolygon;
});
// isInPolygon({
//         x: 2,
//         y: 1
//     },

//     [{
//             x: 1,
//             y: 1
//         },
//         {
//             x: 2,
//             y: 1
//         },
//         {
//             x: 2,
//             y: 2
//         },
//         {
//             x: 1,
//             y: 2
//         },
//     ]
// )