    var  oscar = {};      // 很重要，和shim中exports值必须一致
oscar.add = function(num1, num2) {
    return num1 + num2;
};
oscar.max = function() {
    return Math.max.apply(Math, [].slice.call(arguments));
}