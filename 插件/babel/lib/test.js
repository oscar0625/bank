"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Person =
/*#__PURE__*/
function () {
  //实例属性的新写法
  function Person(header, footer) {
    _classCallCheck(this, Person);

    this.body = '身体';
    this.header = header;
    this.footer = footer;
  }

  _createClass(Person, [{
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