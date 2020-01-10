class Person {
    //实例属性的新写法
    body = '身体';

    constructor(header, footer) {
        this.header = header;
        this.footer = footer;
    }

    eat() {
        return '吃东西'
    }

    //取值函数（getter）和存值函数（setter
    get prop() {
        return 'getter';
    }
    set prop(value) {
        console.log('setter: ' + value);
    }

    //静态属性 
    static category = '人';
    //静态方法
    static breathe() {
        return '呼吸';
    }
}

let bad = true;
let dead = true;