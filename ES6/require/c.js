let c = 'hello FFFFrank';

//私有属性
let obj1 = '3333';

exports.c = c;
exports.d = function () {
    return 'hello IIIIwen';
};
exports.e = {
    name: 'Cabbage',
    getObj1(){
        return obj1;
    }
};