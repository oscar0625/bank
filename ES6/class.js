/*
*
 class 构造函数
     1.有公有 public
     2.静态 static
    class Person {
         constructor() {
         this.name = '小传传';
         this.age = 13;
            setTimeout(()=> {
                console.log(this)  //this还是指向实例的对象
            }, 10)
        }
    }

* */
class person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    // Person.prototype.getName = function(){}
    getName () {
        return this.name;
    }
    testSetTimeout () {
        setTimeout(() => {
            //this谁调用就是谁
            console.log(this.name);
        }, 10)
    }
    static asd () {
        return 1
    }
}
let p = new person('oscar', 18);
// console.log(p.getName());
p.testSetTimeout();
console.log(person.asd());