var achColor = '#ffc917',
    demColor = '#00ffec',
    main = {
        postAjax: function (url, data, callback) {
            $.ajax({
                type: 'post',
                url: url,
                data: data,
                dataType: 'json',
                success: function (res) {
                    callback(res)
                }
            })
        },
        
        //地图
        getMapData: function () {
            var self=this,
            dataObj = {
                num: 0
            };
            this.postAjax('/Handler/StatisticData.ashx?t=achList', {}, function (res) {
                dataObj.achList = res.data;
                dataObj.num++;
                self.map(dataObj);
            })

            this.postAjax('/Handler/StatisticData.ashx?t=demList', {}, function (res) {
                dataObj.demList = res.data;
                dataObj.num++;
                self.map(dataObj);
            })

            this.postAjax('/Handler/StatisticData.ashx?t=highTechCompany&count=3000', {}, function (res) {
                dataObj.highTech = res.data;
                dataObj.num++;
                self.map(dataObj);
            })

            this.postAjax('/Handler/StatisticData.ashx?t=haidianMilitaryCompanyList', {}, function (res) {
                dataObj.haidianMilitaryCompanyList = res.data;
                dataObj.num++;
                self.map(dataObj);
            })

            this.postAjax('/Handler/StatisticData.ashx?t=mackerSpaceList', {}, function (res) {
                dataObj.mackerSpaceList = res.data;
                dataObj.num++;
                self.map(dataObj);
            })

            this.postAjax('/Handler/StatisticData.ashx?t=coord', {}, function (res) {
                dataObj.coord= {
                    data:res.data,
                    demdata:res.demdata,
                };
                dataObj.num++;
                self.map(dataObj);
            });

        },
        map: function (dataObj) {
            // console.log(dataObj)
            if(dataObj.num != 6)return;
            var ydjcg = [],
                wdjcg = [],
                ydjxq = [],
                wdjxq = [],
                cgdj, xqdj, effectScatter = [],
                effectScatter1 = [],
                company = [],
                companyWo = [],
                bjcompany = [],
                bjcg = [],
                bjxq = [],
                makerSpace = [],
                militaryCompany = [];
            //获取成果
            $.each(dataObj.achList, function () {
                this.value = [this.Long, this.Lat];
                if (this.Status == "未对接") {
                    wdjcg.push(this);
                } else {
                    ydjcg.push(this);
                }
                if (116 <= this.Long && this.Long <= 116.8 && this.Lat >= 39.6 && this.Lat <= 40.8) {
                    bjcg.push(this);
                }
            });
            //获取需求
            $.each(dataObj.demList, function () {
                this.value = [this.Long, this.Lat];
                if (this.Status == "未对接") {
                    wdjxq.push(this);
                } else {
                    ydjxq.push(this);
                }
                if (116 <= this.Long && this.Long <= 116.8 && this.Lat >= 39.6 && this.Lat <= 40.8) {
                    bjxq.push(this);
                }
            });
            //获取公司
            $.each(dataObj.highTech, function () {
                this.value = [this.Long, this.Lat];
                company.push(this);
                if (this.Name == '创客天下（北京）科技发展有限公司') {
                    this.Type = '创客天下';
                    companyWo.push(this);
                } else if (116 <= this.Long && this.Long <= 116.8 && this.Lat >= 39.6 && this.Lat <= 40.8) {
                    bjcompany.push(this);
                }
            });
            //获取海淀军民融合企业列表
            $.each(dataObj.haidianMilitaryCompanyList, function () {
                this.value = [this.Long, this.Lat];
                this.Type = '海淀军工';
                militaryCompany.push(this);
            });
            //获取众创空间
            $.each(dataObj.mackerSpaceList, function () {
                this.value = [this.Long, this.Lat];
                this.Type = '众创空间';
                makerSpace.push(this);
            });
            //获取连线
            cgdj = dataObj.coord.data;
            xqdj = dataObj.coord.demdata;
            $.each(dataObj.coord.data, function () {
                effectScatter.push($.extend({
                    value: [this.coords[1][0], this.coords[1][1]],
                }, this.ach))
            });
            $.each(dataObj.coord.demdata, function () {
                effectScatter1.push($.extend({
                    value: [this.coords[1][0], this.coords[1][1]],
                }, this.demand))
            });
            this.createMap(ydjcg, wdjcg, ydjxq, wdjxq, cgdj, xqdj, effectScatter, effectScatter1, company, bjcg, bjxq, companyWo, bjcompany, makerSpace, militaryCompany);
        },
        createMap: function (ydjcg, wdjcg, ydjxq, wdjxq, cgdj, xqdj, effectScatter, effectScatter1, company, bjcg, bjxq, companyWo, bjcompany, makerSpace, militaryCompany) {
            var self = this,
                dom = document.getElementById("map"),
                myChart = echarts.init(dom),
                size = 10,
                //配置项
                current = '全国',
                stateOption = {
                    backgroundColor: 'transparent', //整体背景
                    color: ['#d22e2e'],
                    tooltip: { //提示框组件。 hover导航框
                        trigger: 'item',
                        formatter: function (res) { //导航框内容  可以写标签哦！！！
                            //                        console.log(res)
                            if (res.seriesName == "公司") {
                                return '<div style="padding:0 10px;"><p >公司名称：' + res.data.Name + '</p><p >公司地点：' + res.data.Park + '</p><p >隶属领域：' + res.data.TechField + '</p></div>'
                            }
                            if (res.data.Type == "需求") {
                                return '<div style="padding:0 10px;"><p >需求名称：' + res.data.Title + '</p><p>所属单位：' + res.data.CompanyName + '</p><p>发布时间：' + res.data.PublishTime + '</p><p>隶属领域：' + res.data.FieldName + '</p></div>'
                            }
                        }
                    },
                    legend: {
                        right: 10,
                        bottom: 0,
                        textStyle: {
                            color: '#fff'
                        },
                        data: [{
                            name: '科技成果',
                            icon: 'roundRect'
                        }, {
                            name: '企业需求',
                            icon: 'roundRect'
                        }, {
                            name: '众创空间',
                            icon: 'roundRect'
                        }],
                        selected: {
                            '科技成果': true,
                            '企业需求': true,
                            '众创空间': true
                        }
                    },
                    geo: {
                        map: 'china', //中国地图
                        label: { //控制省份名
                            normal: { //正常模式
                                show: false
                            },
                            emphasis: { //hover模式
                                show: false
                            }
                        },
                        roam: true, //是否开启平移和缩放
                        zoom: 1.2,
                        aspectScale: 0.75,
                        itemStyle: { //控制省份区域（省份块）
                            normal: {
                                areaColor: 'rgba(0,255,236,0.1)',
                                borderColor: 'rgba(118,237,236,0.8)'
                            },
                            emphasis: {
                                areaColor: 'rgba(0,255,236,0.1)'
                            }
                        }
                    },
                    series: [{
                            name: '科技成果', //已对接成果
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: ydjcg,
                            symbolSize: size,
                            label: { //每个点的信息
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: false,
                                    textStyle: {
                                        color: '#9ba0aa',
                                        fontFamily: '微软雅黑'
                                    }
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            zlevel: 10,
                            itemStyle: {
                                normal: {
                                    color: achColor //圆点颜色
                                }
                            }
                        },
                        {
                            name: '科技成果', //未对接成果
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: wdjcg,
                            symbolSize: size,
                            label: { //每个点的信息
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: false,
                                    textStyle: {
                                        color: '#9ba0aa',
                                        fontFamily: '微软雅黑'
                                    }
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            zlevel: 10,

                            itemStyle: {
                                normal: {
                                    color: '#daaf20' //圆点颜色
                                }
                            }
                        },
                        {
                            name: '企业需求', //已对接需求
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: ydjxq,
                            symbolSize: size,
                            label: { //每个点的信息
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: false,
                                    textStyle: {
                                        color: '#9ba0aa',
                                        fontFamily: '微软雅黑'
                                    }
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            zlevel: 10,

                            itemStyle: {
                                normal: {
                                    color: demColor //圆点颜色
                                }
                            }
                        },
                        {
                            name: '企业需求', //未对接需求
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: wdjxq,
                            symbolSize: size,
                            label: { //每个点的信息
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: false,
                                    textStyle: {
                                        color: '#9ba0aa',
                                        fontFamily: '微软雅黑'
                                    }
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            zlevel: 10,
                            itemStyle: {
                                normal: {
                                    color: '#8CFFD1' //圆点颜色
                                }
                            }
                        },
                        //成果
                        {
                            name: '科技成果', //成功对接
                            type: 'lines', //用于带有起点和终点信息的线数据的绘制，主要用于地图上的航线，路线的可视化。
                            zlevel: 9,
                            tooltip: { //提示框组件。 hover导航框
                                trigger: 'item',
                                formatter: '{b}',
                            },
                            effect: { //线的运行特效
                                show: true,
                                period: 4, //运行时间
                                symbol: 'triangle', //头的形状
                                symbolSize: 3, //头的大小
                                trailLength: 0.3, //特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
                                color: achColor,
                            },

                            lineStyle: {
                                normal: {
                                    color: achColor,
                                    width: 0.5,
                                    shadowBlur: 20,
                                    shadowColor: 'rgba(255,201,23,0.8)',
                                    curveness: 0.2
                                }
                            },
                            data: cgdj
                        },
                        {
                            name: '科技成果', //终点
                            type: 'effectScatter',
                            coordinateSystem: 'geo',

                            data: effectScatter,
                            symbolSize: size,
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke',
                                scale: 4,
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: achColor,
                                    shadowBlur: 10,
                                    shadowColor: '#333'
                                }
                            },
                            zlevel: 100
                        },
                        //需求
                        {
                            name: '企业需求', //成功对接
                            type: 'lines', //用于带有起点和终点信息的线数据的绘制，主要用于地图上的航线，路线的可视化。
                            zlevel: 8,
                            tooltip: { //提示框组件。 hover导航框
                                trigger: 'item',
                                formatter: '{b}',
                            },
                            effect: { //线的运行特效
                                show: true,
                                period: 4, //运行时间
                                symbol: 'triangle', //头的形状
                                symbolSize: 3, //头的大小
                                trailLength: 0.3, //特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
                                color: demColor,
                            },

                            lineStyle: {
                                normal: {
                                    color: demColor,
                                    width: 0.5,
                                    shadowBlur: 20,
                                    shadowColor: 'rgba(0,255,236,0.8)',
                                    curveness: 0.2
                                }
                            },
                            data: xqdj
                        },
                        {
                            name: '企业需求', //终点
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            data: effectScatter1,
                            symbolSize: size,
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke',
                                scale: 4,
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: demColor,
                                    shadowBlur: 10,
                                    shadowColor: '#333'
                                }
                            },
                            zlevel: 100
                        },
                        //众创空间
                        {
                            name: '众创空间',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: makerSpace,
                            symbol: 'image:///web/images/makerSpace.png',
                            symbolSize: 20,
                            label: { //每个点的信息
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: false,
                                    textStyle: {
                                        color: '#9ba0aa',
                                        fontFamily: '微软雅黑'
                                    }
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            zlevel: 5
                        }
                    ]
                },
                BJOption = {
                    backgroundColor: 'transparent', //整体背景
                    tooltip: { //提示框组件。 hover导航框
                        trigger: 'item',
                        formatter: function (res) { //导航框内容  可以写标签哦！！！
                            //                        console.log(res)
                            if (res.seriesName == "公司") {
                                return '<div style="padding:0 10px;"><p >公司名称：' + res.data.Name + '</p><p >公司地点：' + res.data.Park + '</p><p >隶属领域：' + res.data.TechField + '</p></div>'
                            }
                            if (res.data.Type == "需求") {
                                return '<div style="padding:0 10px;"><p >需求名称：' + res.data.Title + '</p><p>所属单位：' + res.data.CompanyName + '</p><p>发布时间：' + res.data.PublishTime + '</p><p>隶属领域：' + res.data.FieldName + '</p></div>'
                            }
                        }
                    },
                    geo: {
                        map: 'beijing', //中国地图
                        label: { //控制省份名
                            normal: { //正常模式
                                show: false
                            },
                            emphasis: { //hover模式
                                show: false
                            }
                        },
                        center: ["116.32947027683258", "40.053040592969246"],
                        roam: true, //是否开启平移和缩放
                        zoom: 2,
                        itemStyle: { //控制省份区域（省份块）
                            normal: {
                                areaColor: 'rgba(0,255,236,0.1)',
                                borderColor: 'rgba(118,237,236,0.8)',
                            },
                            emphasis: {
                                areaColor: 'rgba(0,255,236,0.1)'
                            }
                        }
                    },
                    series: [{
                            name: '公司',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: companyWo,
                            symbol: 'image:///web/images/xiaohongqi.png',
                            symbolSize: 40,
                            symbolOffset: [0, -10],
                            label: { //每个点的信息
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: false,
                                    textStyle: {
                                        color: '#9ba0aa',
                                        fontFamily: '微软雅黑'
                                    }
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            zlevel: 1000,
                            itemStyle: {
                                normal: {
                                    color: 'rgba(194,53,49,1)' //圆点颜色
                                }
                            }
                        },
                        {
                            name: '公司',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: bjcompany,
                            symbol: 'pin',
                            symbolSize: 20,
                            label: { //每个点的信息
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: false,
                                    textStyle: {
                                        color: '#9ba0aa',
                                        fontFamily: '微软雅黑'
                                    }
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            zlevel: 1,
                            itemStyle: {
                                normal: {
                                    color: 'rgba(194,53,49,0.7)' //圆点颜色
                                }
                            }
                        },
                        {
                            name: '成果',
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            data: bjcg,
                            symbolSize: size,
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke',
                                scale: 3
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: achColor,
                                    shadowBlur: 2,
                                    shadowColor: '#333'
                                }
                            },
                            zlevel: 100
                        },
                        {
                            name: '需求',
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            data: bjxq,
                            symbolSize: size,
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke',
                                scale: 3,
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: demColor,
                                    shadowBlur: 2,
                                    shadowColor: '#333'
                                }
                            },
                            zlevel: 99
                        },
                        //海淀军工企业
                        {
                            name: '海淀军工',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: militaryCompany,
                            symbol: 'image:///web/images/militaryCompany.png',
                            symbolSize: 20,
                            label: { //每个点的信息
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: false,
                                    textStyle: {
                                        color: '#9ba0aa',
                                        fontFamily: '微软雅黑'
                                    }
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            zlevel: 5
                        }
                    ]
                },
                HDOption = {
                    backgroundColor: 'transparent', //整体背景
                    tooltip: { //提示框组件。 hover导航框
                        trigger: 'item',
                        formatter: function (res) { //导航框内容  可以写标签哦！！！
                            //                        console.log(res)
                            if (res.seriesName == "公司") {
                                return '<div style="padding:0 10px;"><p >公司名称：' + res.data.Name + '</p><p >公司地点：' + res.data.Park + '</p><p >隶属领域：' + res.data.TechField + '</p></div>'
                            }
                            if (res.data.Type == "需求") {
                                return '<div style="padding:0 10px;"><p >需求名称：' + res.data.Title + '</p><p>所属单位：' + res.data.CompanyName + '</p><p>发布时间：' + res.data.PublishTime + '</p><p>隶属领域：' + res.data.FieldName + '</p></div>'
                            }
                        }
                    },
                    geo: {
                        map: 'beijing', //中国地图
                        label: { //控制省份名
                            normal: { //正常模式
                                show: false
                            },
                            emphasis: { //hover模式
                                show: false
                            }
                        },
                        roam: true, //是否开启平移和缩放
                        center: ["116.32947027683258", "40.053040592969246"],
                        zoom: 5,
                        itemStyle: { //控制省份区域（省份块）
                            normal: {
                                areaColor: 'transparent',
                                borderColor: 'rgba(118,237,236,0.8)',
                            },
                            emphasis: {
                                areaColor: 'transparent'
                            }
                        },
                        regions: [{ //海淀
                            name: '海淀区',
                            itemStyle: {
                                normal: {
                                    areaColor: 'rgba(0,255,236,0.1)'
                                },
                                emphasis: {
                                    areaColor: 'rgba(0,255,236,0.1)'
                                }
                            }
                        }]
                    },
                    series: [{
                            name: '公司',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: companyWo,
                            symbol: 'image:///web/images/xiaohongqi.png',
                            symbolSize: 40,
                            symbolOffset: [0, -10],
                            label: { //每个点的信息
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: false,
                                    textStyle: {
                                        color: '#9ba0aa',
                                        fontFamily: '微软雅黑'
                                    }
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            zlevel: 1000,
                            itemStyle: {
                                normal: {
                                    color: 'rgba(194,53,49,1)' //圆点颜色
                                }
                            }
                        },
                        {
                            name: '公司',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: bjcompany,
                            symbol: 'pin',
                            symbolSize: 20,
                            label: { //每个点的信息
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: false,
                                    textStyle: {
                                        color: '#9ba0aa',
                                        fontFamily: '微软雅黑'
                                    }
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            zlevel: 1,
                            itemStyle: {
                                normal: {
                                    color: 'rgba(194,53,49,0.7)' //圆点颜色
                                }
                            }
                        },
                        {
                            name: '成果',
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            data: bjcg,
                            symbolSize: size,
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke',
                                scale: 3
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: achColor,
                                    shadowBlur: 2,
                                    shadowColor: '#333'
                                }
                            },
                            zlevel: 100
                        },
                        {
                            name: '需求',
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            data: bjxq,
                            symbolSize: size,
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke',
                                scale: 3,
                            },
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: demColor,
                                    shadowBlur: 2,
                                    shadowColor: '#333'
                                }
                            },
                            zlevel: 99
                        },
                        //海淀军工企业
                        {
                            name: '海淀军工',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: militaryCompany,
                            symbol: 'image:///web/images/militaryCompany.png',
                            symbolSize: 20,
                            label: { //每个点的信息
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: false,
                                    textStyle: {
                                        color: '#9ba0aa',
                                        fontFamily: '微软雅黑'
                                    }
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            zlevel: 5
                        }
                    ]
                },
                timer = null;

            //实例化
            function createInstance(option) {
                myChart.dispose(); //原本销毁
                myChart = echarts.init(dom); //初始化
                myChart.setOption(option, true); //创建
                //绑定事件
                myChart.on('click', function (e) {
                    click(e)
                });
            }
            //点击事件
            function click(e) {
                var data = e.data,
                    str = '';
                //console.log(data);
                if (data && data.Type == "成果") {
                    $('#cartogram').show('explode', {}, 500);
                    self.createCartogram.running(data)
                } else if (data && data.Type == "众创空间") {
                    var rank = (data.Rank == '国家备案众创空间' || data.Rank == '国家级众创空间') ? '国家级' : '',
                        Fields = '',
                        ServiceItem = '',
                        height, target = $('#makerSpace');
                    $.each(data.Fields.split(','), function () {
                        Fields += '<span>' + this + '</span>';
                    });
                    $.each(data.ServiceItem.split(','), function () {
                        ServiceItem += '<span>' + this + '</span>';
                    });
                    str += '<div><section class="title clearfix"><i>' + rank + '</i><b title="' + data.SpaceName + '">' + data.SpaceName + '</b></section><section class="clearfix"><i>所属地区：</i><b>' + data.Province + '——' + data.City + '</b></section><section class="clearfix"><i>所属地区：</i><b>' + data.Address + '</b></section><section class="clearfix"><i>入住条件：</i><b class="clearfix">' + Fields + '</b></section><section class="clearfix"><i>空间费用：</i><b>' + data.SpaceCharge + '</b></section><section class="clearfix"><i>服务内容：</i><b class="clearfix">' + ServiceItem + '</b></section></div>';
                    target.html(str).show('explode', {}, 500);
                } else if (data && data.Type == "创客天下") {
                    $('#tenants').fadeIn();
                } else if (data && data.Type == "海淀军工") {
                    str += '<div><div class="title">' + data.Name + '</div> <ul class="clearfix"><li><i>注册地：</i><b>' + data.Province + data.City + '</b></li> <li><i>成立时间：</i><b>' + data.FoundingTime + '</b></li> <li><i>单位性质：</i><b>' + data.CompanyNature + '</b></li><li><i>注册资金（万元）：</i><b>' + data.RegisteredCapital + '</b></li><li><i>是否上市：</i><b>' + (data.IsQuotedCompany ? "已上市" : "未上市") + '</b></li> <li><i>融资进度：</i><b>' + data.FinancingProgress + '</b></li> <li><i>有无资金需求：</i><b>' + (data.HasFinancingRequirements ? "有融资需求" : "无融资需求") + '</b></li> <li><i>年度主营业务收入（万元）：</i><b>' + data.AnnualMainOperatingIncome + '</b></li> <li><i>年度军品业务收入（万元）：</i><b>' + data.AnnualMilitaryBusinessIncome + '</b></li> <li><i>年度研发投入（万元）：</i><b>' + data.AnnualRDInput + '</b></li> <li><i>年度军品研发投入（万元）：</i><b>' + data.AnnualMilitaryRDInput + '</b></li> </ul><div/>'
                    $('#militaryCompany').html(str).show('explode', {}, 500);
                }
            }
            //tab
            function tabInstance() {
                if (current == "全国") {
                    createInstance(stateOption);
                } else if (current == "北京市") {
                    createInstance(BJOption);
                } else if (current == "海淀区") {
                    createInstance(HDOption);
                }
            }
            $('#resize').on('click', function () {
                tabInstance();
            });
            $('#tab>div').on('click', function () {
                if ($(this).html() == current) return;
                $(this).addClass('active').siblings().removeClass('active');
                current = $(this).html();
                tabInstance();
            });
            //初始化创建全国
            createInstance(stateOption);

            //添加涟漪效果成果
            function addEffectAch(data) {
                var obj = {
                        name: '新成果',
                        type: 'effectScatter',
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'fill',
                            scale: 4,
                            scale: 5,
                        },
                        coordinateSystem: 'geo',
                        data: data,
                        symbolSize: size,
                        label: { //每个点的信息
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: false,
                                textStyle: {
                                    color: '#9ba0aa',
                                    fontFamily: '微软雅黑'
                                }
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#daaf20' //圆点颜色
                            }
                        },
                        zlevel: 1000000
                    },
                    option = null;
                //更新数据
                stateOption.series.push(obj);
                BJOption.series.push(obj);
                HDOption.series.push(obj);

                //根据current渲染视图
                if (current == '全国') {
                    option = stateOption;
                } else if (current == "北京市") {
                    option = BJOption;
                } else if (current == "海淀区") {
                    option = HDOption;
                }
                myChart.setOption(option, false);
            }
            //移除涟漪效果成果变为本来的成果
            function removeEffectAch(data) {
                var obj1 = {
                        name: '科技成果',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: data,
                        symbolSize: size,
                        label: { //每个点的信息
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: false,
                                textStyle: {
                                    color: '#9ba0aa',
                                    fontFamily: '微软雅黑'
                                }
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#daaf20' //圆点颜色
                            }
                        },
                        zlevel: 10
                    },
                    obj2 = {
                        name: '成果',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: data,
                        symbolSize: size,
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke',
                            scale: 3
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: achColor,
                                shadowBlur: 2,
                                shadowColor: '#333'
                            }
                        },
                        zlevel: 100
                    }
                option = null;
                //更新数据
                stateOption.series.pop();
                stateOption.series.push(obj1);
                BJOption.series.pop();
                BJOption.series.push(obj2);
                HDOption.series.pop();
                HDOption.series.push(obj2);

                //渲染视图
                if (current == '全国') {
                    option = stateOption;
                } else if (current == "北京市") {
                    option = BJOption;
                } else if (current == "海淀区") {
                    option = HDOption;
                }
                myChart.setOption(option, false);
            }

            //存放新成果id数组
            var newAchIdArr = [];

            function getNewAch() {
                main.postAjax('/Handler/StatisticData.ashx?t=mocEarthDialog', {}, function (res) {
                    // console.log(res)
                    if (newAchIdArr.length != res.length) {
                        //关闭定时
                        clearInterval(timer);

                        //新成果数组
                        var data = [],
                            num = 0;
                        $.each(res, function () {
                            //如果newAchIdArr没有此Id
                            if (newAchIdArr.indexOf(this.Id) == -1) {
                                newAchIdArr.push(this.Id);
                                num++;
                                this.value = [this.Long, this.Lat];
                                data.push(this);
                            }
                        });

                        //更新数字
                        self.reaTimeData.updateAchCount(num);
                        //弹出的新成果框
                        self.reaTimeData.newAchDialog(data[0]);

                        //添加新成果
                        addEffectAch(data);
                        //20s后移除
                        setTimeout(function () {
                            removeEffectAch(data);
                            //重启定时
                            timer = setInterval(function () {
                                getNewAch()
                            }, 5000);
                        }, 20000);
                    }
                })
            }
            //定时获取实时数据
            timer = setInterval(function () {
                // getNewAch()
            }, 5000);
        },
        //实时数据
        reaTimeData: {
            //更新数字
            updateAchCount: function (num) {
                var target = $('#aside .achCount em'),
                    b = target.find('b'),
                    count = num + (b.html() * 1);
                target.append('<b class="new">' + count + '</b>');

                var progress = 0,
                    animate = function () {
                        var timer = window.requestAnimationFrame(animate);

                        //dosomething
                        progress += 0.5;
                        b.css({
                            top: -progress
                        });
                        b.next().css({
                            top: 20 - progress
                        });

                        if (progress >= 20) {
                            window.cancelAnimationFrame(timer);
                            target.html('<b>' + count + '</b>');
                        }
                    };
                animate();
            },
            //弹出的新成果框
            top: $('#newAchDialog').find('.top'),
            bottom: $('#newAchDialog').find('.bottom'),
            onlySetTimeOut: null,
            newAchDialog: function (data) {
                var self = this;
                this.top.html('<h1>新增科技成果</h1><p class="oneLine">[<span>' + data.UserName + '</span>]刚刚发布了</p> <p class="twoLine">[' + data.Title + ']</p>').prop('achData', data)
                    .animate({
                        'right': 10
                    }, 1000).siblings().hide();

                //避免互相影响 先清除    
                clearTimeout(this.onlySetTimeOut);
                this.onlySetTimeOut = setTimeout(function () {
                    self.top.animate({
                        'right': -360
                    }, 1000, function () {
                        self.bottom.show()
                    })
                }, 8000)
            },
            //新成果成果框事件
            achDialog: function () {
                var self = this;
                this.top.on('click', function () {
                    var data = $(this).prop('achData');
                    $('#cartogram').show('explode', {}, 500);
                    main.createCartogram.running(data)
                })
                this.bottom.on('click', function () {
                    self.top.animate({
                        'right': 10
                    }, 1000).siblings().hide();
                    self.onlySetTimeOut = setTimeout(function () {
                        self.top.animate({
                            'right': -360
                        }, 1000, function () {
                            self.bottom.show()
                        })
                    }, 8000)
                })
            }
        },
        //弹出的指数统计图
        createCartogram: {
            //趋势指数
            exponent: function (field) {
                var obj = {
                    '能源与节能': {
                        count: 35,
                        data: [{
                                name: '产业化程度',
                                value: 8,
                                max: 10
                            },
                            {
                                name: '发展程度',
                                value: 8,
                                max: 10
                            },
                            {
                                name: '产业化速度',
                                value: 5,
                                max: 10
                            },
                            {
                                name: '技术复杂度',
                                value: 6,
                                max: 10
                            },
                            {
                                name: '新兴程度',
                                value: 8,
                                max: 10
                            }
                        ]
                    },
                    '生物技术': {
                        count: 37,
                        data: [{
                                name: '产业化程度',
                                value: 6,
                                max: 10
                            },
                            {
                                name: '发展程度',
                                value: 9,
                                max: 10
                            },
                            {
                                name: '产业化速度',
                                value: 5,
                                max: 10
                            },
                            {
                                name: '技术复杂度',
                                value: 8,
                                max: 10
                            },
                            {
                                name: '新兴程度',
                                value: 9,
                                max: 10
                            }
                        ]
                    },
                    '先进制造与自动化': {
                        count: 32,
                        data: [{
                                name: '产业化程度',
                                value: 9,
                                max: 10
                            },
                            {
                                name: '发展程度',
                                value: 7,
                                max: 10
                            },
                            {
                                name: '产业化速度',
                                value: 6,
                                max: 10
                            },
                            {
                                name: '技术复杂度',
                                value: 6,
                                max: 10
                            },
                            {
                                name: '新兴程度',
                                value: 4,
                                max: 10
                            }
                        ]
                    },
                    '电子信息': {
                        count: 36,
                        data: [{
                                name: '产业化程度',
                                value: 9,
                                max: 10
                            },
                            {
                                name: '发展程度',
                                value: 8,
                                max: 10
                            },
                            {
                                name: '产业化速度',
                                value: 7,
                                max: 10
                            },
                            {
                                name: '技术复杂度',
                                value: 7,
                                max: 10
                            },
                            {
                                name: '新兴程度',
                                value: 5,
                                max: 10
                            }
                        ]
                    },
                    '海洋': {
                        count: 28,
                        data: [{
                                name: '产业化程度',
                                value: 7,
                                max: 10
                            },
                            {
                                name: '发展程度',
                                value: 6,
                                max: 10
                            },
                            {
                                name: '产业化速度',
                                value: 4,
                                max: 10
                            },
                            {
                                name: '技术复杂度',
                                value: 5,
                                max: 10
                            },
                            {
                                name: '新兴程度',
                                value: 6,
                                max: 10
                            }
                        ]
                    },

                    '环境保护': {
                        count: 27,
                        data: [{
                                name: '产业化程度',
                                value: 5,
                                max: 10
                            },
                            {
                                name: '发展程度',
                                value: 6,
                                max: 10
                            },
                            {
                                name: '产业化速度',
                                value: 6,
                                max: 10
                            },
                            {
                                name: '技术复杂度',
                                value: 4,
                                max: 10
                            },
                            {
                                name: '新兴程度',
                                value: 6,
                                max: 10
                            }
                        ]
                    },


                    '太空': {
                        count: 41,
                        data: [{
                                name: '产业化程度',
                                value: 9,
                                max: 10
                            },
                            {
                                name: '发展程度',
                                value: 8,
                                max: 10
                            },
                            {
                                name: '产业化速度',
                                value: 7,
                                max: 10
                            },
                            {
                                name: '技术复杂度',
                                value: 8,
                                max: 10
                            },
                            {
                                name: '新兴程度',
                                value: 9,
                                max: 10
                            }
                        ]
                    },

                    '材料': {
                        count: 34,
                        data: [{
                                name: '产业化程度',
                                value: 8,
                                max: 10
                            },
                            {
                                name: '发展程度',
                                value: 7,
                                max: 10
                            },
                            {
                                name: '产业化速度',
                                value: 5,
                                max: 10
                            },
                            {
                                name: '技术复杂度',
                                value: 6,
                                max: 10
                            },
                            {
                                name: '新兴程度',
                                value: 8,
                                max: 10
                            }
                        ]
                    },

                    '网络空间': {
                        count: 35,
                        data: [{
                                name: '产业化程度',
                                value: 7,
                                max: 10
                            },
                            {
                                name: '发展程度',
                                value: 8,
                                max: 10
                            },
                            {
                                name: '产业化速度',
                                value: 6,
                                max: 10
                            },
                            {
                                name: '技术复杂度',
                                value: 7,
                                max: 10
                            },
                            {
                                name: '新兴程度',
                                value: 7,
                                max: 10
                            }
                        ]
                    }
                };
                return obj[field] || {
                    count: 24,
                    data: [{
                            name: '产业化程度',
                            value: 5,
                            max: 10
                        },
                        {
                            name: '发展程度',
                            value: 6,
                            max: 10
                        },
                        {
                            name: '产业化速度',
                            value: 3,
                            max: 10
                        },
                        {
                            name: '技术复杂度',
                            value: 4,
                            max: 10
                        },
                        {
                            name: '新兴程度',
                            value: 6,
                            max: 10
                        }
                    ]
                }
            },
            //技术评分
            grade: function (id) {
                var seed = id;

                function seedRandom(min, max) {
                    seed = (seed * 9301 + 49297) % 233280;
                    var rnd = seed / 233280.0;
                    return Math.floor(rnd * (max - min + 1)) + min;
                }
                var r1 = seedRandom(10, 20),
                    r2 = seedRandom(10, 20),
                    r3 = seedRandom(4, 10);
                if (r3 == 4) {
                    r3 = 1;
                }
                return {
                    count: r1 + r2 + r3,
                    data: [{
                            name: '成果独创性',
                            value: r1
                        },
                        {
                            name: '专利保护范围',
                            value: r3
                        },
                        {
                            name: '成果技术复杂度',
                            value: r2
                        }
                    ]
                }
            },

            leftChart: null,
            left: function (exponentData) {
                var dom = document.getElementById("cartogram_left"),
                    myChart = echarts.init(dom),
                    option = null,
                    data = exponentData.data,
                    res = {
                        name: '行业成果转化趋势指数',
                        value: []
                    },
                    i, leng;
                for (i = 0, leng = data.length; i < leng; i++) {
                    res.value.push(data[i].value)
                }
                option = {
                    backgroundColor: 'rgba(2,47,91,0.7)',
                    tooltip: {
                        trigger: 'item'
                    },
                    radar: { //雷达图使用 radar 组件作为其坐标系
                        indicator: data,
                        name: { //雷达图每个指示器名称的配置项。
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        splitLine: { //坐标轴在 grid 区域中的分隔线样式。
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                        splitArea: { //不显示区域
                            show: false
                        },
                        axisLine: { //刻度线样式
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                        shape: 'circle', //雷达图绘制类型  支持 'polygon' 和 'circle'
                        center: ['50%', '55%'],
                        radius: '70%',
                        startAngle: 90

                    },
                    series: [{
                        name: '雷达',
                        type: 'radar',
                        symbol: 'circle', //标记的图形。
                        itemStyle: { //折线拐点标记的样式。
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#186bd0'
                                }, {
                                    offset: 1,
                                    color: '#24b9b5'
                                }]),

                            }
                        },
                        lineStyle: { //线条样式。
                            normal: {
                                type: 'dotted',
                                width: 1,
                                opacity: 1
                            }
                        },
                        areaStyle: { //区域填充样式。
                            normal: {
                                opacity: 1
                            }
                        },
                        data: [res]
                    }]
                };

                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                    this.leftChart = myChart;
                }

            },
            rightChart: null,
            right: function (gradeData) {
                var dom = document.getElementById("cartogram_right"),
                    myChart = echarts.init(dom),
                    option = null,
                    data = gradeData.data,
                    res = [],
                    i, leng;
                for (i = 0, leng = data.length; i < leng; i++) {
                    res.push(data[i].name)
                }
                option = {
                    backgroundColor: 'rgba(2,47,91,0.7)',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: 5,
                        right: 15,
                        bottom: 5,
                        top: 5,
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        max: 20,
                        boundaryGap: [0, 0.01],
                        axisLine: { //坐标轴轴线相关设置。
                            lineStyle: {
                                color: '#cccccc' //坐标轴颜色
                            }
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    yAxis: {
                        type: 'category',
                        data: res,
                        axisLine: { //坐标轴轴线相关设置。
                            lineStyle: {
                                color: '#cccccc' //坐标轴颜色
                            }
                        },
                        axisTick: {
                            show: false
                        }, //坐标轴刻度相关设置。
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    series: [{
                            name: '评分',
                            type: 'bar',
                            data: data,
                            barWidth: 15,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                        offset: 0,
                                        color: '#186bd0'
                                    }, {
                                        offset: 1,
                                        color: '#24b9b5'
                                    }]),
                                    barBorderRadius: 10
                                }
                            }
                        }

                    ],
                    animation: true
                };

                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                    this.rightChart = myChart;
                }
            },
            running: function (data) {
                var exponentData = this.exponent(data.FieldName.trim()),
                    gradeData = this.grade(+data.Id),
                    count = exponentData.count + gradeData.count,
                    level;
                if (count <= 20) {
                    level = "Ⅰ"
                } else if (count <= 40) {
                    level = "Ⅱ"
                } else if (count <= 60) {
                    level = "Ⅲ"
                } else if (count <= 80) {
                    level = 'Ⅳ'
                } else {
                    level = 'Ⅴ'
                }
                $('#cartogram .title').html('科技成果智能评级：' + level + '级，' + count + '分')
                $('#cartogram_top').html('<ul><li class="clearfix"><span>成果名称：</span><p>' + data.Title + '</p></li><li class="clearfix"><span>所属单位：</span><p>' + data.CompanyName + '</p></li><li class="clearfix"><span>发布时间：</span><p>' + data.PublishTime + '</p></li></ul><ul><li class="clearfix"><span>先进程度：</span><p>' + data.AdvancedDegree + '</p></li><li class="clearfix"><span>隶属领域：</span><p>' + data.FieldName + '</p></li></ul>')
                this.left(exponentData);
                this.right(gradeData);
            },
            init: function () {
                var self = this;
                $('#cartogram').on('click', function () {
                    $(this).hide('explode', {}, 500);
                    self.leftChart.dispose();
                    self.rightChart.dispose();
                    $('#cartogram .title').html('');
                    $('#cartogram_top').html('');
                })
            }
        },
        //弹出的众创空间
        makerSpace: function () {
            $('#makerSpace').on('click', function () {
                $this = $(this);
                $this.hide('explode', {}, 500, function () {
                    $this.html('')
                });
            })
        },
        //弹出的军工企业图
        militaryCompany: function () {
            $('#militaryCompany').on('click', function () {
                $this = $(this);
                $this.hide('explode', {}, 500, function () {
                    $this.html('')
                });
            })
        },

        //成果/需求地域分布图
        cqxxdy: function (callback) {
            var self = this;
            var legend = [];
            var series = [];
            this.postAjax('/Handler/StatisticData.ashx?t=province', {}, function (res) {
                var myData = res.data,
                    num1 = 0,
                    num2 = 0,
                    num3 = 0,
                    AchCount = 0,
                    DemCount = 0;
                $.each(myData, function (i) {
                    AchCount = AchCount + this.AchievementNum;
                    DemCount = DemCount + this.DemandNum;
                    if (i < 4) {
                        legend.push(this.Province);
                        series.push({
                            value: this.Total,
                            name: this.Province,
                            AchievementNum: this.AchievementNum,
                            DemandNum: this.DemandNum
                        })

                    } else {
                        num1 += parseInt(this.Total);
                        num2 += parseInt(this.AchievementNum);
                        num3 += parseInt(this.DemandNum);

                    }
                })
                legend.push('其他');
                series.push({
                    value: num1,
                    name: '其他',
                    AchievementNum: num2,
                    DemandNum: num3
                });
                callback()
                self.createCqxxdy(legend, series, AchCount, DemCount);
            })
        },
        createCqxxdy: function (legend, series, AchCount, DemCount) {
            var dom = document.getElementById("cqxxdy");
            var option = null;
            var myChart = echarts.init(dom);
            option = {
                backgroundColor: 'transparent', //整体背景
                tooltip: {
                    trigger: 'item',
                    formatter: function (e) {
                        var m1 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + achColor + '"></span>';
                        var m2 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + demColor + '"></span>';
                        return '<div  ><p>' + e.name + '</p><p>' + m1 + '成果数量：' + e.data.AchievementNum + '&ensp;(' + Math.floor(e.data.AchievementNum / AchCount * 1000) / 10 + '%)</p><p>' + m2 + '需求数量：' + e.data.DemandNum + '&ensp;(' + Math.floor(e.data.DemandNum / DemCount * 1000) / 10 + '%)</p></div>'
                    }
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    y: 'bottom',
                    textStyle: {
                        color: '#fff'
                    },
                    data: legend
                },
                color: [
                    '#88f9fe',
                    '#3e93e1',
                    '#0f70ca',
                    '#134ba2',
                    '#0d3877'
                ],
                series: [{
                    name: '地域分布',
                    type: 'pie',
                    radius: ['50%', '80%'],
                    avoidLabelOverlap: false,
                    center: ['60%', '50%'],
                    label: {
                        normal: {
                            show: true,
                            formatter: '{d}%',
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },

                    data: series
                }]
            };
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
        },
        //成果/需求领域分布图
        cqxxly: function (callback) {
            var self = this,
                xAxis = [],
                AchYAxis = [],
                DemYAxis = [],
                AchCount = 0,
                DemCount = 0,
                miliLegend = [],
                miliSeries = [];
            this.postAjax('/Handler/StatisticData.ashx?t=achField', {}, function (res) {
                //                console.log(res)
                var num2 = 0,
                    num3 = 0,
                    num4 = 0;
                $.each(res.achData, function (i) {
                    AchCount = AchCount + this.total;
                    if (i < 4) {
                        xAxis.push(this.fieldName);
                        AchYAxis.push(this.total);
                    } else {
                        num2 += Number(this.total)
                    }
                });
                $.each(res.demData, function (i) {
                    DemCount = DemCount + this.total;
                    if (i < 4) {
                        DemYAxis.push(this.total);
                    } else {
                        num3 += Number(this.total);
                    }
                });
                $.each(res.miliData, function (i) {
                    if (i < 4) {
                        miliLegend.push(this.fieldName);
                        miliSeries.push({
                            value: this.total,
                            name: this.fieldName
                        });
                    } else {
                        num4 += Number(this.total);
                    }
                });
                xAxis.push('其他');
                AchYAxis.push(num2);
                DemYAxis.push(num3);
                self.createCqxxly(xAxis, AchYAxis, DemYAxis, AchCount, DemCount);

                miliLegend.push('其他');
                miliSeries.push({
                    value: num4,
                    name: '其他'
                });
                callback()
                self.createJfxxly(miliLegend, miliSeries);
            })
        },
        createCqxxly: function (xAxis, AchYAxis, DemYAxis, AchCount, DemCount) {
            var myChart = echarts.init(document.getElementById("cqxxly"));
            option = null;
            option = {
                backgroundColor: 'transparent', //整体背景
                tooltip: {
                    trigger: 'axis',
                    formatter: function (e) {
                        //console.log(e)
                        var str = '<div ><p>' + e[0].name + '</p>';
                        $.each(e, function () {
                            var c = this.seriesName == '成果' ? AchCount : DemCount;
                            str += '<p>' + this.marker + this.seriesName + '数量：' + this.value + '&ensp;(' + Math.floor(this.value / c * 1000) / 10 + '%)</p>'
                        });
                        str += '</div>'
                        return str
                    },
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: [{ //必须与series一一对应
                        name: '成果'

                    }, {
                        name: '需求'
                    }],
                    orient: 'vertical',
                    top: 'bottom',
                    left: 0,
                    textStyle: {
                        color: '#fff'
                    }
                },
                grid: {
                    left: 20,
                    right: 25,
                    bottom: 10,
                    top: 10,
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    axisLine: { //坐标轴轴线相关设置。
                        lineStyle: {
                            color: '#cccccc' //坐标轴颜色
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                yAxis: {
                    type: 'category',
                    data: xAxis.reverse(),
                    axisLine: { //坐标轴轴线相关设置。
                        lineStyle: {
                            color: '#cccccc' //坐标轴颜色
                        }
                    },
                    axisTick: {
                        show: false
                    }, //坐标轴刻度相关设置。
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                series: [{
                        name: '成果',
                        type: 'bar',
                        data: AchYAxis.reverse(),
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                fontSize: 10
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: achColor
                            }
                        }
                    },
                    {
                        name: '需求',
                        type: 'bar',
                        data: DemYAxis.reverse(),
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                fontSize: 10
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: demColor
                            }
                        }
                    }
                ],
                animation: true
            };

            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
        },
        //军方需求领域分布图
        createJfxxly: function (miliLegend, miliSeries) {
            var dom = document.getElementById("jfxxly");
            var option = null;
            var myChart = echarts.init(dom);
            option = {
                backgroundColor: 'transparent', //整体背景
                tooltip: {
                    trigger: 'item',
                    formatter: function (e) {
                        var m1 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + e.color + '"></span>';
                        return '<div  ><p>' + e.name + '</p><p>' + m1 + '军方需求数量：' + e.data.value + '&ensp;(' + e.percent + '%)</p></div>';
                    }
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    y: 'bottom',
                    textStyle: {
                        color: '#fff'
                    },
                    data: miliLegend
                },
                color: [
                    '#f0882f',
                    '#f15928',
                    '#ffdf04',
                    '#a43313',
                    '#faa828'
                ].reverse(),
                series: [{
                    name: '地域分布',
                    type: 'pie',
                    radius: '80%',
                    center: ['60%', '55%'],
                    position: 'center',
                    label: {
                        normal: {
                            show: true,
                            formatter: '{d}%',
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    data: miliSeries,
                    animationType: 'scale',
                    animationEasing: 'elasticOut'
                }]
            };
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
        },

        fn: function (arr) {
            var arr1 = [],
                arr2 = [],
                num = 0,
                count = 0;
            for (var i = 0; i < arr.length; i++) {
                count += arr[i].value;
                if (i < 4) {
                    arr1.push(arr[i].name);
                    arr2.push({
                        name: arr[i].name,
                        value: arr[i].value
                    });
                } else {
                    num += arr[i].value
                }
            }
            arr1.push('其他');
            arr2.push({
                name: '其他',
                value: num
            });
            return [arr1, arr2, count]
        },
        //实验室领域分布图
        sysly: function () {
            var arr = [{
                        name: '软件互联网通信',
                        value: 52
                    },
                    {
                        name: '生物医药',
                        value: 36
                    },
                    {
                        name: '节能环保',
                        value: 33
                    },
                    {
                        name: '新材料',
                        value: 30
                    },
                    {
                        name: '电子信息',
                        value: 22
                    },
                    {
                        name: '现代农业',
                        value: 14
                    },
                    {
                        name: '集成电路',
                        value: 4
                    },
                    {
                        name: '先进制造',
                        value: 8
                    }
                ],
                fnArr = this.fn(arr),
                arr1 = fnArr[0],
                arr2 = fnArr[1],
                count = fnArr[2];
            var myChart = echarts.init(document.getElementById("sysly"));
            option = null;
            option = {
                backgroundColor: 'transparent', //整体背景
                tooltip: {
                    trigger: 'axis',
                    formatter: function (e) {
                        var marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background:linear-gradient(' + e[0].color.colorStops[0].color + ',' + e[0].color.colorStops[1].color + ');"></span>';
                        return '<div ><p>' + e[0].name + '</p><p>' + marker + '实验室数量：' + e[0].value + '&ensp;(' + Math.floor(e[0].value / count * 1000) / 10 + '%)</p>' + '</div>'
                    },
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: 5,
                    right: 25,
                    bottom: 5,
                    top: 5,
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    axisLine: { //坐标轴轴线相关设置。
                        lineStyle: {
                            color: '#cccccc' //坐标轴颜色
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                yAxis: {
                    type: 'category',
                    data: arr1.reverse(),
                    axisLine: { //坐标轴轴线相关设置。
                        lineStyle: {
                            color: '#cccccc' //坐标轴颜色
                        }
                    },
                    axisTick: {
                        show: false
                    }, //坐标轴刻度相关设置。
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                series: [{
                    name: '实验室',
                    type: 'bar',
                    data: arr2.reverse(),
                    barWidth: 15,
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            color: '#fff'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: '#186bd0'
                            }, {
                                offset: 1,
                                color: '#24b9b5'
                            }]),
                        }
                    }
                }],
                animation: true
            };
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
        },
        //海淀区军民融合鹍鹏指数
        roc: function () {
            var data = [ //雷达图的指示器
                    {
                        name: '景气度指数',
                        max: 5.0,
                        value: 4.7
                    },
                    {
                        name: '资本活跃度指数',
                        max: 5.0,
                        value: 1.2
                    },
                    {
                        name: '资质完备度指数',
                        max: 5.0,
                        value: 3.1
                    },
                    {
                        name: '研发投入度指数',
                        max: 5.0,
                        value: 4.5
                    },
                    {
                        name: '参与度指数',
                        max: 5.0,
                        value: 4.2
                    },
                ],
                dom = document.getElementById("roc"),
                myChart = echarts.init(dom),
                option = null,
                res = {
                    name: '海淀区军民融合鹍鹏指数',
                    value: []
                },
                i, leng;
            for (i = 0, leng = data.length; i < leng; i++) {
                res.value.push(data[i].value)
            }
            option = {
                backgroundColor: 'rgba(2,47,91,0.7)',
                tooltip: {
                    trigger: 'item'
                },
                radar: { //雷达图使用 radar 组件作为其坐标系
                    indicator: data,
                    name: { //雷达图每个指示器名称的配置项。
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    splitLine: { //坐标轴在 grid 区域中的分隔线样式。
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    splitArea: { //不显示区域
                        show: false
                    },
                    axisLine: { //刻度线样式
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    shape: 'circle', //雷达图绘制类型  支持 'polygon' 和 'circle'
                    center: ['50%', '55%'],
                    radius: '70%',
                    startAngle: 90
                },
                series: [{
                    name: '雷达',
                    type: 'radar',
                    symbol: 'circle', //标记的图形。
                    itemStyle: { //折线拐点标记的样式。
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#186bd0'
                            }, {
                                offset: 1,
                                color: '#24b9b5'
                            }]),
                        }
                    },
                    lineStyle: { //线条样式。
                        normal: {
                            type: 'dotted',
                            width: 1,
                            opacity: 1
                        }
                    },
                    areaStyle: { //区域填充样式。
                        normal: {
                            opacity: 1
                        }
                    },
                    data: [res]
                }]
            };

            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }

        },



        //国防科工知识产权转化领域
        nationalDefenseTechnology: function () {
            var arr = [{
                        name: '电子信息技术',
                        value: 119
                    },
                    {
                        name: '高端装备',
                        value: 107
                    },
                    {
                        name: '智能制造',
                        value: 87
                    },
                    {
                        name: '新能源与环保',
                        value: 63
                    },
                    {
                        name: '新材料',
                        value: 57
                    },
                    {
                        name: '应急救援及公共安全',
                        value: 52
                    }
                ],
                fnArr = this.fn(arr),
                arr1 = fnArr[0],
                arr2 = fnArr[1],
                count = fnArr[2];
            var dom = document.getElementById("nationalDefenseTechnology");
            var option = null;
            var myChart = echarts.init(dom);
            option = {
                backgroundColor: 'transparent', //整体背景
                tooltip: {
                    trigger: 'item',
                    formatter: function (e) {
                        var marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background:' + e.color + ';"></span>';
                        return '<div  ><p>' + e.name + '</p><p>' + marker + '转化数量：' + e.data.value + '&ensp;(' + e.percent + '%)</p></div>';
                    }
                },
                color: [
                    '#26a65b',
                    '#86e2d5',
                    '#26c281',
                    '#049372',
                    '#1e824c'
                ],
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    y: 'bottom',
                    textStyle: {
                        color: '#fff'
                    },
                    data: arr1
                },
                series: [{
                    name: '领域分布',
                    type: 'pie',
                    radius: '70%',
                    center: ['65%', '50%'],
                    position: 'center',
                    roseType: 'radius',
                    label: {
                        normal: {
                            show: true,
                            formatter: '{d}%',
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    data: arr2,
                    animationType: 'scale',
                    animationEasing: 'elasticOut'
                }]
            };
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
        },
        //国防解密专利领域
        nationalDefenseDecode: function () {
            function fn(arr) {
                var arr1 = [],
                    arr2 = [],
                    num1 = 0,
                    num2 = 0,
                    count = 0;
                for (var i = 0; i < arr.length; i++) {
                    count += arr[i].real;
                    if (i < 4) {
                        arr1.push(arr[i].name);
                        arr2.push({
                            name: arr[i].name,
                            value: arr[i].value,
                            real: arr[i].real
                        });
                    } else {
                        num1 += arr[i].value;
                        num2 += arr[i].real;
                    }
                }
                arr1.push('其他');
                arr2.push({
                    name: '其他',
                    value: num1,
                    real: num2
                });
                return [arr1, arr2, count]
            };
            var arr = [{
                        name: '先进制造与自动化',
                        value: Math.log(1631),
                        real: 1631
                    },
                    {
                        name: '信息技术',
                        value: Math.log(548),
                        real: 548
                    },
                    {
                        name: '新材料',
                        value: Math.log(143),
                        real: 143
                    },
                    {
                        name: '生物与现代农业',
                        value: Math.log(59),
                        real: 59
                    },
                    {
                        name: '其他',
                        value: Math.log(71),
                        real: 71
                    },
                ],
                fnArr = fn(arr),
                arr1 = fnArr[0],
                arr2 = fnArr[1],
                count = fnArr[2];
            var dom = document.getElementById("nationalDefenseDecode");
            var option = null;
            var myChart = echarts.init(dom);
            option = {
                backgroundColor: 'transparent', //整体背景
                tooltip: {
                    trigger: 'item',
                    formatter: function (e) {
                        //                          var marker='<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background:linear-gradient('+e.color.colorStops[0].color+','+e.color.colorStops[1].color+');"></span>';
                        var marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background:' + e.color + ';"></span>';
                        return '<div  ><p>' + e.name + '</p><p>' + marker + '解密数量：' + e.data.real + '&ensp;(' + Math.floor(e.data.real / count * 1000) / 10 + '%)</p></div>';
                    }
                },
                //                  color:[
                //                     new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: '#941458'},{offset: 1, color: '#e570a9'}]),
                //                     new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: '#6423cf'},{offset: 1, color: '#8386f3'}]),
                //                     new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: '#005998'},{offset: 1, color: '#62b8e9'}]),
                //                     new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: '#367201'},{offset: 1, color: '#89dd79'}]),
                //                     new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: '#d14d10'},{offset: 1, color: '#f4c125'}]),
                //                  ],
                color: [
                    '#D91E18',
                    '#C0392B',
                    '#D24D57',
                    '#E74C3C',
                    '#EC644B'
                ],
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    y: 'bottom',
                    textStyle: {
                        color: '#fff'
                    },
                    data: arr1
                },
                series: [{
                    name: '领域分布',
                    type: 'pie',
                    radius: ['20%', '70%'],
                    center: ['62%', '50%'],
                    position: 'center',
                    roseType: 'area',
                    label: {
                        normal: {
                            show: true,
                            formatter: function (e) {
                                return Math.floor(e.data.real / count * 1000) / 10 + '%';
                            },
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    data: arr2,
                    animationType: 'scale',
                    animationEasing: 'elasticOut'
                }]
            };
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
        },

        //根据数据生成list长度条
        listLong: function () {
            $('#aside aside ul').html('<li class="clearfix"><i>国家高新企业</i><em><b>23389</b></em><span><u></u></span></li> <li class="clearfix achCount"><i>科技成果总量</i><em><b>22261</b></em><span><u></u></span></li> <li class="clearfix"><i>企业需求总量</i><em><b>12244</b></em><span><u></u></span></li> <li class="clearfix se"><i>国防解密专利</i><em><b>3046</b></em><span><u></u></span></li> <li class="clearfix se"><i>国防脱密专利</i><em><b>4038</b></em><span><u></u></span></li> <li class="clearfix se"><i>国防科工知识产权转化信息</i><em><b>1300</b></em><span><u></u></span></li> <li class="clearfix se"><i>开放实验室(军工)</i><em><b>199</b><del>(121)</del></em><span><u></u></span></li> <li class="clearfix se"><i>军用技术转民用推广项目</i><em><b>945</b></em><span><u></u></span></li>');
            var arr = [];
            $('#aside aside b').each(function () {
                arr.push(this.innerHTML)
            });
            var max = Math.log(Math.max.apply(Math, arr));
            arr.map(function (b, i) {
                $('#aside aside u').eq(i).css({
                    width: Math.log(b) / max * 100 + '%'
                })
            })
        },

        //弹出的轮播
        dialog: function () {
            var zt1 = true,
                zt2 = true;
            $('#more').on('click', function () {
                $('#dialog').show('clip', {}, 500, function () {
                    if (zt1) {
                        zt1 = false;
                        var swiper = new Swiper($(this).find('.swiper-container'), {
                            /*base*/
                            speed: 500, //滑动速度
                            effect: 'coverflow',
                            loop: true, //开启无缝模式
                            prevButton: '.swiper-button-prev', //设置点击后退
                            nextButton: '.swiper-button-next', //设置点击前进
                            /*禁止拖动*/
                            preventIntercationOnTransition: true,

                            autoHeight: true, //自动高度,wrapper和container会随着当前slide的高度而发生变化。有些场景下不合理
                            observer: true, //当swiper的样式或者修改swiper的子元素时 自动更新swiper,
                            onSlideChangeStart: function () {
                                $('audio')[0].play();
                            }
                        });
                    }
                })
            });
            $('#dialog>i').on('click', function () {
                $('#dialog').hide('clip', {}, 500)
            });

            $('#star').on('click', function () {
                $('#dialog1').show('clip', {}, 500, function () {
                    if (zt2) {
                        zt2 = false;
                        var swiper = new Swiper($(this).find('.swiper-container'), {
                            /*base*/
                            speed: 500, //滑动速度
                            effect: 'coverflow',
                            loop: true, //开启无缝模式
                            prevButton: '.swiper-button-prev', //设置点击后退
                            nextButton: '.swiper-button-next', //设置点击前进
                            /*禁止拖动*/
                            preventIntercationOnTransition: true,

                            autoHeight: true, //自动高度,wrapper和container会随着当前slide的高度而发生变化。有些场景下不合理
                            observer: true, //当swiper的样式或者修改swiper的子元素时 自动更新swiper,

                        });
                    }
                })
            });
            $('#dialog1>i').on('click', function () {
                $('#dialog1').hide('clip', {}, 500)
            })
        },

        //弹出入驻企业
        tenants: {
            ele: $('#tenants'),
            data: null,
            getData: function () {
                var self = this;
                main.postAjax('/Handler/StatisticData.ashx?t=xisanqiBaseCompany&count=0', {}, function (res) {
                    //                    console.log(res);
                    self.data = res.data;
                    var str = '';
                    $.each(res.data, function (i) {
                        str += '<li data-id=' + i + '><span>' + this.Name + '</span></li>';
                    });
                    self.ele.find('ul').html(str);
                })
            },
            bind: function () {
                var self = this;
                $.fn.extend({
                    animateCss: function (animationName, callback) {
                        var animationEnd = (function (el) {
                            var animations = {
                                animation: 'animationend',
                                OAnimation: 'oAnimationEnd',
                                MozAnimation: 'mozAnimationEnd',
                                WebkitAnimation: 'webkitAnimationEnd'
                            };

                            for (var t in animations) {
                                if (el.style[t] !== undefined) {
                                    return animations[t];
                                }
                            }
                        })(document.createElement('div'));

                        this.addClass('animated ' + animationName).one(animationEnd, function () {
                            $(this).removeClass('animated ' + animationName);

                            if (typeof callback === 'function') callback();
                        });

                        return this;
                    }
                });
                this.ele.on('dblclick', function () {
                    $(this).fadeOut();
                });
                this.ele.on('click', 'li', function () {
                    var id = this.attributes['data-id'].value,
                        data = self.data[id];
                    str = '<h1>' + data.Name + '</h1><section class="clearfix"><i style="background-image:url(/web/images/tenants1.png)" >企业简介</i><b>' + data.CompanyProfile + '</b></section><section class="clearfix"><i style="background-image:url(/web/images/tenants2.png)" >技术和产品介绍</i><b>' + data.TechAndProductInfo + '</b></section><section class="clearfix"><i style="background-image:url(/web/images/tenants3.png)" >军方应用</i><b>' + data.MilitaryApplication + '</b></section>';
                    self.ele.find('.default').html(str).show('clip', {}, 500);
                }).on('mouseenter', 'li', function () {
                    $(this).animateCss('animated pulse')
                });
                this.ele.find('.default').on('click', function () {
                    $(this).hide('clip', {}, 500);
                });
            },
            init: function () {
                this.getData();
                this.bind();
            }
        },

        bin: function () {
            //获取北京地图
            $.get('/web/script/echarts/beijing.json', function (geoJson) {
                echarts.registerMap('beijing', geoJson);
            });

            var self = this;
            //成果/需求
            this.cqxxdy(function () {
                //海淀区军民融合鹍鹏指数
                self.roc();
                //海淀企业参军收入/投入占比
                //self.haiDianCompany();
                //国防科工知识产权转化领域
                self.nationalDefenseTechnology();
                //国防解密专利领域
                self.nationalDefenseDecode();
                //根据数据生成list长度条
                self.listLong();
            });
            this.cqxxly(function () {
                //实验室
                self.sysly();
            });

            //地图
            this.getMapData();

            //实时数据
            this.reaTimeData.achDialog();
            //弹出的指数统计图
            this.createCartogram.init();
            //弹出的众创空间
            this.makerSpace();
            //弹出的军工企业图
            this.militaryCompany();

            //弹出的轮播
            this.dialog();

            //弹出入驻企业
            this.tenants.init();

            //进网站
            $('#web').on('click', function () {
                location.href = 'http://www.zgcjm.org/?name=oscar';
            })

            //返回
            $('#ret').on('click', function () {
                location.href = 'http://aishow.ckzone.cn/spriteJm.html';
            })
        },


        //海淀企业参军收入/投入占比
        haiDianCompany: function () {
            var self = this;
            this.postAjax('/Handler/StatisticData.ashx?t=haidianMilitaryCompanyStatistic', {}, function (res) {
                //                console.log(res);
                var putIntoArr1 = [],
                    putIntoArr2 = [],
                    putIntoCount = 0,
                    incomeArr1 = [],
                    incomeArr2 = [],
                    incomeCount = 0;
                $.each(res.IncomeStat, function () {
                    putIntoCount += this.count;
                    putIntoArr1.push((this.start == 0 ? 0 : this.start * 100 + "%") + '~' + this.end * 100 + "%");
                    putIntoArr2.push({
                        name: (this.start == 0 ? 0 : this.start * 100 + "%") + '~' + this.end * 100 + "%",
                        value: this.count,
                    });
                });
                $.each(res.RDInputStat, function () {
                    incomeCount += this.count;
                    incomeArr1.push((this.start == 0 ? 0 : this.start * 100 + "%") + '~' + this.end * 100 + "%");
                    incomeArr2.push({
                        name: (this.start == 0 ? 0 : this.start * 100 + "%") + '~' + this.end * 100 + "%",
                        value: this.count,
                    });
                });
                //投入
                self.putInto(putIntoArr1, putIntoArr2, putIntoCount);
                //收入
                self.income(incomeArr1, incomeArr2, incomeCount);
            });
        },
        putInto: function (arr1, arr2, count) {
            var myChart = echarts.init(document.getElementById("putInto"));
            option = null;
            option = {
                backgroundColor: 'transparent', //整体背景
                tooltip: {
                    trigger: 'axis',
                    formatter: function (e) {
                        //                            console.log(e)
                        var marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background:linear-gradient(' + e[0].color.colorStops[0].color + ',' + e[0].color.colorStops[1].color + ');"></span>';
                        return '<div ><p>' + e[0].name + '</p><p>' + marker + '企业数量：' + e[0].value + '&ensp;(' + Math.floor(e[0].value / count * 1000) / 10 + '%)</p>' + '</div>';
                        //                            return '<div ><p>' + e[0].name+ '</p><p>'+marker+'企业数量：' + e[0].value + '&ensp;('+ e[0].data.percent*100+'%)</p>'+'</div>'
                    },
                    axisPointer: {
                        type: 'shadow'
                    },
                    position: 'right'
                },
                color: [
                    new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#005998'
                    }, {
                        offset: 1,
                        color: '#62b8e9'
                    }])
                ],
                polar: { //极坐标系 必须有
                    center: ['50%', '50%'],
                    radius: '70%'
                },
                angleAxis: {
                    type: 'category', //极坐标系角度轴 必须有
                    startAngle: 90,
                    data: arr1,
                    axisLine: { //坐标轴轴线相关设置。
                        lineStyle: {
                            color: '#cccccc' //坐标轴颜色
                        }
                    },
                    axisTick: {
                        show: false
                    }, //坐标轴刻度相关设置。
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                radiusAxis: { //极坐标系径向轴 必须有
                    axisLine: { //坐标轴轴线相关设置。
                        lineStyle: {
                            color: '#cccccc' //坐标轴颜色
                        }
                    },
                    axisTick: {
                        show: false
                    }, //坐标轴刻度相关设置。
                    axisLabel: {
                        show: true,
                        margin: 0,
                        textStyle: {
                            color: '#fff',
                            fontSize: 8
                        }
                    }
                },
                series: [{
                    name: '领域转化量',
                    type: 'bar',
                    data: arr2,
                    center: ['50%', '50%'],
                    coordinateSystem: 'polar' //采取极坐标方法 必须有
                }]

            };
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
        },
        income: function (arr1, arr2, count) {
            var myChart = echarts.init(document.getElementById("income"));
            option = null;
            option = {
                backgroundColor: 'transparent', //整体背景
                tooltip: {
                    trigger: 'axis',
                    formatter: function (e) {
                        var marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background:linear-gradient(' + e[0].color.colorStops[0].color + ',' + e[0].color.colorStops[1].color + ');"></span>';
                        return '<div ><p>' + e[0].name + '</p><p>' + marker + '企业数量：' + e[0].value + '&ensp;(' + Math.floor(e[0].value / count * 1000) / 10 + '%)</p>' + '</div>';
                        //                             return '<div ><p>' + e[0].name+ '</p><p>'+marker+'企业数量：' + e[0].value + '&ensp;('+ e[0].data.percent*100+'%)</p>'+'</div>';
                    },
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: 25,
                    right: 25,
                    bottom: 10,
                    top: 10,
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    axisLine: { //坐标轴轴线相关设置。
                        lineStyle: {
                            color: '#cccccc' //坐标轴颜色
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                yAxis: {
                    type: 'category',
                    data: arr1,
                    axisLine: { //坐标轴轴线相关设置。
                        lineStyle: {
                            color: '#cccccc' //坐标轴颜色
                        }
                    },
                    axisTick: {
                        show: false
                    }, //坐标轴刻度相关设置。
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                series: [{
                    name: '实验室',
                    type: 'bar',
                    data: arr2,
                    barWidth: 15,
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            color: '#fff'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: '#6c91f9'
                            }, {
                                offset: 1,
                                color: '#1ecabe'
                            }]),
                        }
                    }
                }],
                animation: true
            };
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
        },
    };
// main.bin();