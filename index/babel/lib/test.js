"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Person =
/*#__PURE__*/
function () {
  //实例属性的新写法
  function Person(header, footer) {
    (0, _classCallCheck2.default)(this, Person);
    this.body = '身体';
    this.header = header;
    this.footer = footer;
  }

  (0, _createClass2.default)(Person, [{
    key: "eat",
    value: function eat() {
      return '吃东西';
    } //取值函数（getter）和存值函数（setter

  }, {
    key: "prop",
    get: function get() {
      return 'getter';
    },
    set: function set(value) {
      console.log('setter: ' + value);
    } //静态属性 

  }], [{
    key: "breathe",
    //静态方法
    value: function breathe() {
      return '呼吸';
    }
  }]);
  return Person;
}();

Person.category = '人';
var good = true;
var alive = true;