/**
 * 
 * @param {object} obj 
 */
function LineAndBar(obj) {
    this._dom = document.getElementById(obj.ele);
    this._chart = null;
    this._createOption(obj);
}

LineAndBar.prototype._createOption = function (obj) {
    var basicSize = obj.fontSize;
    this._option = {
        backgroundColor: 'transparent',
        color: obj.colors,
        textStyle: {
            fontSize: basicSize,
            color: obj.fontColor || '#fff'
        },
        legend: {
            top: 0.5 * basicSize,
            left: 'center',
            padding: 0,
            itemGap: 2 * basicSize,
            itemWidth: 0.5 * basicSize,
            itemHeight: 0.5 * basicSize,
            selectedMode: false,
            data: obj.dataType.map(function (item) {
                return {
                    name: item.name,
                    icon: 'circle'
                }
            })
        },
        // tooltip: {
        //     trigger: 'axis',
        //     axisPointer: {
        //         type: 'shadow'
        //     },
        //     formatter: function (res) {
        //         // console.log(res);
        //         return '<div style="padding:0 10px;"><p>' + res[0].name + '</p> <p>' + res[0].marker + res[0].seriesName + '：' + res[0].value + '次</p> <p>' + res[1].marker + res[1].seriesName + '：' + res[1].value + '%</p></div>'
        //     }
        // },
        //直角坐标系
        grid: {
            top: 2 * basicSize,
            left: 0.5 * basicSize,
            right: 0.5 * basicSize, //坐标系到右边的距离
            bottom: 0 * basicSize, //坐标系到下边的距离
            containLabel: true //是否包含坐标轴的刻度标签。
        },
        xAxis: {
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: obj.fontColor || '#fff'
                }
            },
            axisLabel: {
                margin: 2 * basicSize,
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            data: category
        },
        yAxis: obj.dataType.map(function (item) {
            var res = {
                type: 'value',
                axisLabel: {

                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            };
            switch (item.showUnitMethod) {
                case 1:
                    Object.assign(res, {
                        name: "单位：(" + item.unit + ")",
                        nameGap: 1 * basicSize,
                        nameTextStyle: [0, 0, 0, 1 * basicSize]
                    })
                    break;
                case 2:
                    res.axisLabel.formatter = '{value}' + item.unit;
                    break;
            }
            return res
        }),
        series: obj.dataType.map(function (item, i) {
            var res = {
                name: item.name,
                yAxisIndex: i,
                type: item.type,
                data: data1
            };
            switch (item.type) {
                case 'bar':
                    Object.assign(res, {
                        barWidth: '40%', //柱条宽度
                        label: {
                            normal: {
                                show: true,
                                position: 'bottom',
                                distance: 0.5 * basicSize
                            }
                        }
                    })
                    break;
                case 'pictorialBar':
                    Object.assign(res, {
                        barWidth: '40%', //柱条宽度
                        symbol: 'rect', //图形类型。
                        symbolSize: ['100%', '30%'], //图形的大小。
                        symbolMargin: '20%', //图形的两边间隔
                        symbolRepeat: true, //指定图形元素是否重复
                        symbolRepeatDirection: 'end', //指定图形元素重复时，绘制的顺序。
                        symbolPosition: 'start', //图形的定位位置。
                        label: {
                            normal: {
                                show: true,
                                position: 'bottom',
                                distance: 0.5 * basicSize
                            }
                        },
                        animationDelay: function (dataIndex, params) {
                            return params.index * 30;
                        }
                    })
                    break;
                case 'line':
                    Object.assign(res, {
                        symbol: 'circle',
                        symbolSize: 0.5 * basicSize,
                        label: { //图形上的文本标签
                            normal: {
                                show: true,
                                formatter: item.unit === '%' ? '{c}%' : '{c}'
                            }
                        },
                        lineStyle: { //线条样式。
                            normal: {
                                width: 0.1 * basicSize
                            }
                        }

                    })
                    break;
            }
        })
    }
}
LineAndBar.prototype._parseData = function () {

}
LineAndBar.prototype.draw = function () {
    //如果已经存在_chart先销毁再实例化
    if (this._chart) {
        this._chart.clear(); //原本销毁
        this._chart.dispose(); //原本销毁
    }
    this._chart = echarts.init(this.dom); //初始化
    this._chart.setOption(this._option, true); //创建
}
asd({
    ele: '#container',
    colors: ['#02dac3', '#fdc26e'],
    dataSource: [],
    //数据的类型
    dataType: [{
            name: '投资案例总量',
            unit: '次',
            showUnitMethod: 1, //单位显示方式 1 在坐标轴上显示 2在值后面显示
            type: 'pictorialBar', //series 的类型
        },
        {
            name: '投资案例增长率',
            unit: '%',
            showUnitMethod: 2, //单位显示方式 1 在坐标轴上显示 2在值后面显示
        }
    ],
    fontSize: 24,
    fontColor: '#fff'
})