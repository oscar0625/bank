function CreateRippleCanvas(cvs,content){
    this.cvs=cvs;
    this.content=content;
    this.initR=10;
    this.x=128;
    this.y=98;
    this.color='rgba(255,102,0,';

    this.ballR=this.initR;

    this.linR=[this.initR,this.initR+6,this.initR+14,this.initR+20];
    this.linO=[1,0.7,0.3,0];
    this.changelinR=2;
    this.changelinO=0.1;
    this._init();

}
CreateRippleCanvas.prototype={
    _init:function () {
        //文字
        this.cvs.beginPath();
        this.cvs.save();
        this.cvs.shadowOffsetX = 0;    //阴影往左边偏，横向位移量
        this.cvs.shadowOffsetY = 0;   //阴影往左边偏，纵向位移量
        this.cvs.shadowColor = "#05f8fc"; //阴影颜色
        this.cvs.shadowBlur = 5; //阴影的模糊范围
        this.cvs.font='28px/28px Microsoft Yahei';
        this.cvs.fillStyle='#FFFFFF';
        var num=this.cvs.measureText(this.content).width/2;
        this.cvs.fillText(this.content,this.x-num,40);
        this.cvs.restore();
    },
    draw: function () {
        //圆球
        this.cvs.beginPath();
        this.cvs.save();
        this.cvs.arc(this.x,this.y,this.ballR,0,2*Math.PI);
        this.cvs.shadowBlur = 30; //阴影的模糊范围
        this.cvs.shadowColor = this.color + '1)'; //阴影颜色
        this.cvs.fillStyle=this.color+'1)';
        this.cvs.fill();
        this.cvs.restore();

        //圆线
        for (var i = 0, len = this.linR.length; i < len; i++) {
            this.cvs.beginPath();
            this.cvs.arc(this.x, this.y, this.linR[i], 0, 2 * Math.PI);
            this.cvs.lineWidth = 3;
            this.cvs.strokeStyle = this.color + this.linO[i] + ')';
            this.cvs.stroke();
        }

        return this
    },
    change: function () {
        for(var i=0,len=this.linR.length;i<len;i++){
            if(this.linO[i]>0){
                this.linR[i]+=this.changelinR;
                this.linO[i]-=this.changelinO;
            }else{
                this.linR[i]=this.initR;
                this.linO[i]=1;

            }
        }
        return this
    }

};
/*
 * 本示例教程:http://blog.mastermaps.com/2013/09/creating-webgl-earth-with-threejs.html
 * */
var container = document.getElementById('container'), stats;
var camera, scene, renderer;
var group;
var sphere, clouds;
//精灵部分 + 旋转轮播部分
var rank,           //数据
    step = 0,       //绘制精灵的涟漪
    column,         //该纵队每个精灵的位置参数
    spriteArr = [],   //装有所有精灵的数组 20个
    angle = 0,        //旋转角度
    lastTime = 0;
var state = {
    turnRight: true,
    turnLeft: false,
    slideRight: false,
    slideLeft: false
}, lastState = {
    turnRight: true,
    turnLeft: false,
    slideRight: false,
    slideLeft: false
};
var speed = 0.1;

//点击事件部分
var position = {
    downX: undefined,
    upX: undefined
};

init();
animate();

function init() {
    if (!Detector.webgl) {
        Detector.addGetWebGLMessage(container);
        return;
    }
    //1.相机
    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;
    camera.position.y = 2;

    //2.渲染器
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);    //设置长, 宽

    //3.场景
    scene = new THREE.Scene();
    scene.background = new THREE.TextureLoader().load('images/bg.jpg');  //设置场景背景颜色

    //给场景加灯光灯光
    scene.add(new THREE.AmbientLight(0x333333));	//环境光 作用于整个场景 这光不能用来投射阴影，因为它没有方向。
    var light = new THREE.PointLight(0xffffff, 1.5, 1000);//平行光 常见的用例是模拟日光
    light.position.set(1.5, 3, 3);						//设置光源的位置(x,y,z)
    scene.add(light);

    //创建组放进场景。它的目的是使对象组的语法更清晰。
    group = new THREE.Group();
    group.position.set(0, 0, 0);  //将组的三维坐标系的原点 放在场景(0,0,0)的位置  //默认(0,0,0)
    scene.add(group);

    // 创建earth
    // 创建大陆网格Mesh
    function createSphere(radius, segments) {
        var texture = new THREE.TextureLoader();  	//用来加载纹理图的类
        return new THREE.Mesh(
            //创建几何体-->球体	 	//params:半径、水平片段数、垂直片段数(片段数越大，球体越精细，要求性能高)。
            new THREE.SphereGeometry(radius, segments, segments),
            //选择材料 MeshPhongMaterial 来绘制地图
            new THREE.MeshLambertMaterial({
                map: texture.load('images/ai_earth.png'),     //普通的贴图纹理
            })
        );
    }

    sphere = createSphere(0.92, 64);
    sphere.position.set(0, 0, 0);
    group.add(sphere);
    //创建遮罩层 网格Mesh
    function createClouds(radius, segments) {
        return new THREE.Mesh(
            new THREE.SphereGeometry(radius, segments, segments),
            //ShaderMaterial最高级最复杂的材质 可以通过它创建其他所有的材质
            new THREE.ShaderMaterial(
                {
                    uniforms: {
                        "c": {type: "f", value: 1.0},
                        "p": {type: "f", value: 1.4},
                        glowColor: {type: "c", value: new THREE.Color(0x96d5f9)},
                        viewVector: {type: "v3", value: camera.position}
                    },
                    vertexShader: 'uniform vec3 viewVector;uniform float c;uniform float p;varying float intensity;void main() {vec3 vNormal = normalize( normalMatrix * normal );vec3 vNormel = normalize( normalMatrix * viewVector );intensity = pow( c - dot(vNormal, vNormel), p );gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}',
                    fragmentShader: 'uniform vec3 glowColor;varying float intensity;void main() {vec3 glow = glowColor * intensity;gl_FragColor = vec4( glow, 1.0 );}',
                    side: THREE.FrontSide,
                    blending: THREE.AdditiveBlending,
                    transparent: true, //透明
                    opacity: 0.1,        //透明的程度
                })
        )
    }

    clouds = createClouds(0.94, 64);
    clouds.position.set(0, 0, 0);
    scene.add(clouds);

    //创建精灵
    var radius = 1.06;
    rank = [  //content:'有内容为上面的矩阵没内容为下面的图片', id:'点击矩阵的id或者是图片的路径',regY:'在Y轴的位置',radius:所占空间球的半径
        {
            group: null,
            data: [
                {content: '政府补贴', id: 1, regY: 0, radius: radius},
                {content: '高端人才培养', id: 1, regY: 18, radius: radius},
                {content: '机制创新', id: 1, regY: 36, radius: radius},
                {content: '产业峰会', id: 1, regY: 54, radius: radius},
                {content: '', id: 'z1.png', regY: -18, radius: 1.06}
            ]
        },
        {
            group: null,
            data: [
                {content: '创业孵化服务', id: 2, regY: 0, radius: radius},
                {content: '企业培训', id: 2, regY: 18, radius: radius},
                {content: '投融资对接', id: 2, regY: 36, radius: radius},
                {content: '产品推荐', id: 2, regY: 54, radius: radius},
                {content: '', id: 'z2.png', regY: -18, radius: 1.06}
            ],
        }, {
            group: null,
            data: [
                {content: '高校“双创”基地', id: 3, regY: 0, radius: radius},
                {content: '本、硕专业共建', id: 3, regY: 18, radius: radius},
                {content: 'AI联合实验室', id: 3, regY: 36, radius: radius},
                {content: '人工智能“大讲堂”', id: 3, regY: 54, radius: radius},
                {content: '', id: 'z3.png', regY: -18, radius: 1.06}

            ],
        },
        {
            group: null,
            data: [
                {content: 'AI产业基金', id: 4, regY: 0, radius: radius},
                {content: 'AI精英人才助学计划', id: 4, regY: 18, radius: radius},
                {content: '成果转化种子基金', id: 4, regY: 36, radius: radius},
                {content: '项目路演示', id: 4, regY: 54, radius: radius},
                {content: '', id: 'z4.png', regY: -18, radius: 1.06}

            ]
        },
        {
            group: null,
            data: [
                {content: '创业辅导', id: 5, regY: 0, radius: radius},
                {content: '京津翼人才服务港', id: 5, regY: 18, radius: radius},
                {content: '专利运营', id: 5, regY: 36, radius: radius},
                {content: '前沿技术分享', id: 5, regY: 54, radius: radius},
                {content: '', id: 'z5.png', regY: -18, radius: 1.06}

            ]
        }
    ];
    column = [
        [60, 30],    //1纵
        [30, 60],    //2纵
        [0, 90],   //3纵
        [-30, 120],  //4纵
        [-60, 150],  //5纵
        [-90, 180],  //6纵
        [-120, 210],  //7纵
        [-150, 240],  //8纵
        [-180, 270],  //9纵
        [-210, 300],  //10纵
        [-240, 330],  //11纵
        [-270, 360],  //12纵
    ];

    //初始创建5纵
    //一纵
    nth(rank[0], column[0], 'init');
    //二纵
    nth(rank[1], column[1], 'init');
    //三纵
    nth(rank[2], column[2], 'init');
    //四纵
    nth(rank[3], column[3], 'init');
    //五纵
    nth(rank[4], column[4], 'init');

    //左面的4个
    scene.add(leftVertical(
        [
            {src: 'h4.png', regY: 45, radius: 1.25, scale: 0.2},
            {src: 'h3.png', regY: 26, radius: 1.32, scale: 0.21},
            {src: 'h2.png', regY: 8, radius: 1.35, scale: 0.22},
            {src: 'h1.png', regY: -10, radius: 1.4, scale: 0.23}
        ]
    ));

    //4放入元素
    // stats = new Stats();
    // container.appendChild(stats.dom);
    container.appendChild(renderer.domElement);			   // 将渲染器插入到container内

    //相机一直正对场景(球)去看  否则相机的目光是平行的
    camera.lookAt(scene.position);

    //5其他事件
    document.querySelector('#container').addEventListener('click', onMouseDown, false);
    //停止自动旋转
    document.querySelector('#container').addEventListener('mousedown', function (e) {
        position.downX = e.clientX;
        lastState = state;
        state = {turnRight: false, turnLeft: false, slideRight: false, slideLeft: false};
    }, false);
    document.querySelector('#container').addEventListener('mouseup', function (e) {
        position.upX = e.clientX;
        if (lastState.turnRight || lastState.slideRight) {
            state = {turnRight: true, turnLeft: false, slideRight: false, slideLeft: false};
        } else {
            state = {turnRight: false, turnLeft: true, slideRight: false, slideLeft: false};
        }

    }, false);
    //改变视口大小
    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function animate() {
    render();
    drawRipple();
    // stats.update();
    window.requestAnimationFrame(animate);
}

function render() {
//        if(lastTime==0){
//            lastTime=new Date();
//        }else {
//            var currentTime=new Date();
//            var difference=currentTime.getTime()-lastTime;
//            console.log(difference);
//            angle += difference/100.0;
//            console.log(angle);
//            group.rotation.y = angle / 60;//* Math.PI / 180;
//            lastTime=currentTime;
//        }

    if (state.turnRight) {
        //自动向右旋转
        turnRight(0.1);
    } else if (state.turnLeft) {
        //自动向左旋转
        turnLeft(0.1);
    } else if (state.slideRight) {
        //向右旋转 最后回到turnRight状态
        turnRight(speed);
        speed -= 0.05;
        if (speed <= 0.1) {
            state = {turnRight: true, turnLeft: false, slideRight: false, slideLeft: false};
        }
    } else if (state.slideLeft) {
        //向左旋转 最后回到turnLeft状态
        turnLeft(speed);
        speed -= 0.05;
        if (speed <= 0.1) {
            state = {turnRight: false, turnLeft: true, slideRight: false, slideLeft: false};
        }
    }

    //渲染
    renderer.render(scene, camera);
}

//鼠标DragAndSlide事件 DragAndSlide
new DragAndSlide({
    ele: document.querySelector('#container'),
    dragRight: function () {
        //向右旋转
        turnRight(1)
    },
    dragLeft: function () {
        turnLeft(1)
    },
    slideRight: function (params) {
        //写在下面 因为要比上面的mouseup事件晚点执行
        speed = params;
        state = {turnRight: false, turnLeft: false, slideRight: true, slideLeft: false};
    },
    slideLeft: function (params) {
        //写在下面 因为要比上面的mouseup事件晚点执行
        speed = params;
        state = {turnRight: false, turnLeft: false, slideRight: false, slideLeft: true};
    }
});
//向右旋转
function turnRight(speed) {
    angle += speed;
    group.rotation.y = angle * Math.PI / 180;
    rightLoop();
}
//向左旋转
function turnLeft(speed) {
    angle -= speed;
    group.rotation.y = angle * Math.PI / 180;
    leftLoop();
}
//向左转的轮播方式
function rightLoop() {
    var coordinate = spriteArr[spriteArr.length - 1][0].sprite.getWorldPosition();//获取20个精灵中 最右纵队 赤道位置的精灵 的世界坐标
    var x = Math.abs(coordinate.x);
    var z = Math.abs(coordinate.z);
    //轮播的时机 (设定可视范围为150度 左右各15度) 当小于15度时触发临界
    if (Math.atan(z / x) < 15 * Math.PI / 180) {
        //变化的方式right
        //改变rank数组的排序 将最后一个放到第一个
        rank.unshift(rank.pop());
        //将那个纵向删除
        group.remove(rank[0].group);

        //改变column数组的排序 将最后一个放到第一个
        column.unshift(column.pop());

        //还采用刚才那个数据，但是nth 纵向的方式改变了,然后加入
        nth(rank[0], column[0], 'right');
        rightLoop();
    } else {
        return
    }
}
//向右转的轮播方式
function leftLoop() {
    var coordinate = spriteArr[0][0].sprite.getWorldPosition(); //获取20个精灵中 最左纵队 赤道位置的精灵 的世界坐标
    var x = Math.abs(coordinate.x);
    var z = Math.abs(coordinate.z);
    //轮播的时机 (设定可视范围为150度 左右各15度) 当小于15度时触发临界
    if (Math.atan(z / x) < 15 * Math.PI / 180) {
        var last = rank.length - 1;
        //变化的方式left
        //改变rank数组的排序 将第一个放到最后一个
        rank.push(rank.shift());
        //将那个纵向删除
        group.remove(rank[last].group);

        //改变column数组的排序 将第一个放到最后一个
        column.push(column.shift());

        //还采用刚才那个数据，但是nth 纵向的方式改变了,然后加入
        nth(rank[last], column[last], 'left');
        leftLoop();
    } else {
        return
    }
}


//更新精灵的纹理canvas的涟漪效果
function drawRipple() {
    //更新精灵的纹理canvas的效果
    if (step % 10 == 0) {
        for (var i = 0, leng = spriteArr.length; i < leng; i++) {
            for (var j = 0, len = spriteArr[i].length; j < len; j++) {
                spriteArr[i][j].ins.cvs.clearRect(0, 50, 500, 500);
                spriteArr[i][j].ins.change().draw();
                spriteArr[i][j].texture.needsUpdate = true;  //canvas变化时 更新纹理


            }
        }
    }
    step++;
}

//创建精灵
function createSpriteShape(content, id, arr, spriteArrSon) {
    var sprite, texture;
    //是圆点的情况
    if (content) {
        //创建canvas涟漪效果
        var canvas = document.createElement("canvas");
        canvas.width = 256;
        canvas.height = 128;
        var cvs = canvas.getContext('2d');
        var ins = new CreateRippleCanvas(cvs, content);

        //创建精灵  是一个始终朝向相机的平面，通常使用部分透明的纹理。
        texture = new THREE.Texture(canvas);  //创建canvas纹理
        sprite = new THREE.Sprite(new THREE.SpriteMaterial({map: texture, transparent: true})); //创建精灵
        //设置精灵的参数
        sprite.pageID = id;
        sprite.scale.set(0.3, 0.15, 0.3);  //x y z
//        setInterval(function () {
//            cvs.clearRect(0,0,500,500);
//            ins.change().draw();
//            texture.needsUpdate = true;           //canvas变化时 更新纹理
//        },100);
        spriteArrSon.push({
            ins: ins,
            texture: texture,
            sprite: sprite
        });
    }
    //是下面导航的情况
    else {
        //创建精灵  是一个始终朝向相机的平面，通常使用部分透明的纹理。
        texture = new THREE.TextureLoader().load("images/" + id);  //创建canvas纹理
        sprite = new THREE.Sprite(new THREE.SpriteMaterial({map: texture, transparent: true})); //创建精灵
        sprite.scale.set(0.2, 0.2, 0.2);

    }
    sprite.position.set(arr[0], arr[1], arr[2]);
    return sprite;
}
//创建一个精灵,给每个精灵设定位置
function main(obj, spriteArrSon) { // obj.regY  0 18 36 54
    return createSpriteShape(obj.content, obj.id, [
        -Math.sin(obj.regX * Math.PI / 180) * Math.sqrt(Math.pow(obj.radius, 2) - Math.pow(Math.sin(obj.regY * Math.PI / 180) * obj.radius, 2)),
        Math.sin(obj.regY * Math.PI / 180) * obj.radius,
        Math.sin(obj.regZ * Math.PI / 180) * Math.sqrt(Math.pow(obj.radius, 2) - Math.pow(Math.sin(obj.regY * Math.PI / 180) * obj.radius, 2))
    ], spriteArrSon)
}
//为了满足轮播效果 按纵向创建精灵
//创建N纵
function nth(rank, column, params) { //rank中的对应一项 column中的对应一项 参数
    rank.group = new THREE.Group();
    var spriteArrSon = [];
    for (var i = 0, len = rank.data.length; i < len; i++) {
        rank.group.add(main({
            content: rank.data[i].content,
            id: rank.data[i].id,
            regX: column[0],
            regY: rank.data[i].regY,
            regZ: column[1],
            radius: rank.data[i].radius
        }, spriteArrSon));
    }
    //储存精灵 添加到spriteArr数组  添加方式由params决定 init/right/right
    if (params == 'right') {
        spriteArr.pop();
        spriteArr.unshift(spriteArrSon)
    }
    else if (params == 'left') {
        spriteArr.shift();
        spriteArr.push(spriteArrSon)
    }
    else if (params == 'init') {
        spriteArr.push(spriteArrSon)
    }
    group.add(rank.group);
}
//创建左边单独那纵
function leftVertical(arr) {
    var leftGroup = new THREE.Group();
    for (var i = 0, len = arr.length; i < len; i++) {
        //创建精灵  是一个始终朝向相机的平面，通常使用部分透明的纹理。
        var texture = new THREE.TextureLoader().load("images/" + arr[i].src);  //创建canvas纹理
        var sprite = new THREE.Sprite(new THREE.SpriteMaterial({map: texture, transparent: true})); //创建精灵
        sprite.scale.set(arr[i].scale, arr[i].scale, arr[i].scale);
        sprite.position.set(-Math.sqrt(Math.pow(arr[i].radius, 2) - Math.pow(Math.sin(arr[i].regY * Math.PI / 180) * arr[i].radius, 2)), Math.sin(arr[i].regY * Math.PI / 180) * arr[i].radius, 0);
        leftGroup.add(sprite)
    }
    return leftGroup
}

//点击精灵
function onMouseDown() {

    if (position.downX && position.upX && Math.abs(position.upX - position.downX) < 10) {
        event.preventDefault();

        //2d向量
        var mouse = new THREE.Vector2();

        //将鼠标点击位置的屏幕坐标转成threejs中的标准坐标
        mouse.set(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1);

        //Raycasting用于鼠标拾取（计算出鼠标移过的三维空间中的对象）等等。
        var raycaster = new THREE.Raycaster();

        //从相机发射一条射线，经过鼠标点击位置
        raycaster.setFromCamera(mouse, camera);

        //计算相机射线到的对象，可能有多个对象，因此返回的是一个数组，按离相机远近排列
        // 参数是必须是装有对象的数组  可以是group.children/scene.children  也可以自己是自己创建的数组 里面装有对象
        var list = [];
        for (var i = 0, leng = spriteArr.length; i < leng; i++) {
            for (var j = 0, len = spriteArr[i].length; j < len; j++) {
                list.push(spriteArr[i][j].sprite)
            }
        }
        var intersects = raycaster.intersectObjects(list);

        if (intersects.length > 0) {
            //选择第一个
            var id = intersects[0].object.pageID;
            // 运行特效
            $('#content').width(window.innerWidth * 0.8).height(window.innerHeight * 0.9).show('explode', {}, 500);
        }
    }
}
$('#content h1 a').click(function () {
    $("#content").hide('explode', {}, 500);
});


//    /*以下是废弃代码 保留为了会议思考过程*/
//    //创建一纵
//    function first(index) {
//        rank[index].group=new THREE.Group();
//        for (var i=0,len=rank[index].data.length;i<len;i++){
//            rank[index].group.add(main({
//                content:rank[index].data[i].content, id:rank[index].data[i].id, regX:54, regY:rank[index].data[i].regY, regZ:36,
//            }));
//        }
//        group.add(rank[index].group);
//    }
//    //创建二纵
//    function second(index) {
//        rank[index].group=new THREE.Group();
//        for (var i=0,len=rank[index].data.length;i<len;i++){
//            rank[index].group.add(main({
//                content:rank[index].data[i].content, id:rank[index].data[i].id, regX:18, regY:rank[index].data[i].regY, regZ:72,
//            }));
//        }
//        group.add(rank[index].group);
//    }
//    //创建三纵
//    function third(index) {
//        rank[index].group=new THREE.Group();
//        for (var i=0,len=rank[index].data.length;i<len;i++){
//            rank[index].group.add(main({
//                content:rank[index].data[i].content, id:rank[index].data[i].id, regX:-18, regY:rank[index].data[i].regY, regZ:108,
//            }));
//        }
//        group.add(rank[index].group);
//    }
//    //创建四纵
//    function fourth(index) {
//        rank[index].group=new THREE.Group();
//        for (var i=0,len=rank[index].data.length;i<len;i++){
//            rank[index].group.add(main({
//                content:rank[index].data[i].content, id:rank[index].data[i].id, regX:-54, regY:rank[index].data[i].regY, regZ:144,
//            }));
//        }
//        group.add(rank[index].group);
//    }
//進入全屏 //此方法不可以在異步任務中執行，否則火狐無法全屏


//非threeJS部分
var rests = {
    postAjax: function (url, data, callback) {
        $.ajax({
            url: url,
            type: 'post',
            data: data,
            success: function (res) {
                callback(res)
            }

        })
    },
    ctrl: $('#control img'),
    video: {
        launchFullscreen: function (element) {
            if (element.requestFullscreen) {

                element.requestFullscreen();

            }
            else if (element.mozRequestFullScreen) {

                element.mozRequestFullScreen();

            }
            else if (element.msRequestFullscreen) {

                element.msRequestFullscreen();

            }
            else if (element.oRequestFullscreen) {

                element.oRequestFullscreen();

            }
            else if (element.webkitRequestFullscreen) {

                element.webkitRequestFullScreen();

            }
            else {

                var docHtml = document.documentElement;

                var docBody = document.body;

                var videobox = element;

                var cssText = 'width:100%;height:100%;overflow:hidden;';

                docHtml.style.cssText = cssText;

                docBody.style.cssText = cssText;

                videobox.style.cssText = cssText + ';' + 'margin:0px;padding:0px;';

                document.IsFullScreen = true;

            }

        },
        exitFullscreen: function (element) {

            if (document.exitFullscreen) {

                document.exitFullscreen();


            }
            else if (document.msExitFullscreen) {

                document.msExitFullscreen();

            }
            else if (document.mozCancelFullScreen) {

                document.mozCancelFullScreen();

            }
            else if (document.oRequestFullscreen) {

                document.oCancelFullScreen();


            }
            else if (document.webkitExitFullscreen) {

                document.webkitExitFullscreen();

            }
            else {

                var docHtml = document.documentElement;

                var docBody = document.body;

                var videobox = element;

                docHtml.style.cssText = "";

                docBody.style.cssText = "";

                videobox.style.cssText = "";

                document.IsFullScreen = false;

            }

        },
        index: 0,
        srcArr: [],
        media: document.querySelector('#video video'),
        getData: function () {
            var self = this;
            rests.postAjax('http://aishow.ckzone.cn/home/DirectoryFiles?type=video', {}, function (res) {
                var arr = res.split(',');
                self.srcArr = arr;
                $('#video video').attr('src', arr[0])
            })
        },
        nextVideo: function () {
            var self = this;
            self.media.addEventListener('ended', function () {
                var prevIndex = self.index;
                var currentIndex = prevIndex == self.srcArr.length - 1 ? 0 : prevIndex + 1;
                self.index = currentIndex;
                self.media.src = self.srcArr[currentIndex];
                self.media.play();
            });
        },
        reload: function () {
            var self = this;
            $('#video img:nth-child(3)').click(function () {
                self.index = 0;
                $('#video video').attr('src', self.srcArr[0]).on('canplay', function () {
                    self.media.play();
                });
            })
        },
        hide: function () {
            var self = this;
            $('#video img:nth-child(2)').click(function () {
                self.media.pause();
                self.exitFullscreen(self.media)
                $("#video").hide('scale');
            })
        },
        show: function () {
            var self = this;
            rests.ctrl.eq(0).click(function () {
                //出现动画
                $("#video").show('scale');
                self.launchFullscreen(self.media)
                self.media.play();
            });
        },
        init: function () {
            this.getData();
            this.nextVideo();
            this.show();
            this.hide();
            this.reload()
        }
    },
    photo: {
        getData: function () {
            var self = this;
            rests.postAjax('http://aishow.ckzone.cn/home/DirectoryFiles?type=image', {}, function (res) {
                var arr = res.split(',');
                var str = '';
                $.each(arr, function (i, b) {
                    str += '<div class="swiper-slide"><img src="' + b + '"/></div>'
                });
                $('.swiper-wrapper').html(str);
            })
        },
        hide: function () {
            var self = this;
            $('#photo>img').click(function () {
                self.swiper.stopAutoplay();
                $("#photo").hide('scale', {}, 500);
            })
        },
        show: function () {
            var self = this;
            rests.ctrl.eq(1).click(function () {
                $("#photo").show('scale', {}, 500, function () {
                    if (self.swiper == null) {
                        self.swiper = new Swiper('.swiper-container', {
                            /*base*/
                            speed: 500,//滑动速度
                            autoplay: 5000,//是否自动滑动及间隔时间,
                            autoplayDisableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay。如果设置为false 不禁止，
                            effect: 'fade',
                            observer: true,  //当swiper的样式或者修改swiper的子元素时 自动更新swiper
                            observeParents: true, //当swiper的父元素变化时,例如window.resize自动更新swiper
                        });
                    }
                    self.swiper.startAutoplay();
                });
            });
        },
        swiper: null,
        init: function () {
            this.getData();
            this.show();
            this.hide();
        }
    },
    bin: function () {
        this.video.init();
        this.photo.init();
        //刷新页面
        $('.reset img').on('click', function () {
            location.reload();
        })
    }
};
rests.bin();
