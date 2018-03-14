<style>
  .app_son ul{
    padding: 0 50px;
  }
  label{
    display: block;
  }
</style>
<template>
  <div class="app_son">

    <label for=""><input type="checkbox" :checked="checkObj.all" @click="clickAll">全部</label>

    <!--第一级-->
    <div style="padding-left:20px" v-for="(firstItem,firstIndex) in checkObj.first">
      <label for=""><input type="checkbox" :checked="firstItem.isChecked" @click="clickFirst(firstIndex)"><span @click="secondShow(firstIndex)">{{firstItem.content}}</span></label>

      <!--第二级-->
      <div style="padding-left:20px" v-for="(secondItem,secondIndex) in checkObj.second[firstIndex]" v-show="firstItem.isShow">
        <label for=""><input type="checkbox" :checked="secondItem.isChecked" @click="clickSecond(firstIndex,secondIndex)"><span @click="thirdShow(firstIndex,secondIndex)">{{secondItem.content}}</span></label>

        <!--第三级-->
        <div style="padding-left:20px" v-for="(thirdItem,thirdIndex) in checkObj.third[firstIndex][secondIndex]"  v-show="secondItem.isShow">
          <label for=""><input type="checkbox" :checked="thirdItem.isChecked" @click="clickThird(firstIndex,secondIndex,thirdIndex)"><span>{{thirdItem.content}}</span></label>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
  export default{
    data(){
      return{
        checkObj:{
          all:false,
          //第一级别,
          first:[
            {content:'衣服', isChecked:false,isShow:false},
            {content:'裤子', isChecked:false,isShow:false},
            {content:'鞋子', isChecked:false,isShow:false}
          ],

          //第二级别
          second:[
            [
              {content:'上衣', isChecked:false,isShow:false},
              {content:'下衣', isChecked:false,isShow:false},
            ],
            [
              {content:'上裤', isChecked:false,isShow:false},
              {content:'下裤', isChecked:false,isShow:false},
            ],
            [
              {content:'上鞋', isChecked:false,isShow:false},
              {content:'下鞋', isChecked:false,isShow:false},
            ],
          ],
          //第三级别
          third:[
            [
              [
                {content:'上衣1', isChecked:false},
                {content:'上衣2', isChecked:false},
                {content:'上衣3', isChecked:false},
                {content:'上衣4', isChecked:false},
              ],

              [
                {content:'下衣1', isChecked:false},
                {content:'下衣2', isChecked:false},
                {content:'下衣3', isChecked:false},
                {content:'下衣4', isChecked:false},
              ]
            ],
            [
              [
                {content:'上裤1', isChecked:false},
                {content:'上裤2', isChecked:false},
                {content:'上裤3', isChecked:false},
                {content:'上裤4', isChecked:false},
              ],

              [
                {content:'下裤1', isChecked:false},
                {content:'下裤2', isChecked:false},
                {content:'下裤3', isChecked:false},
                {content:'下裤4', isChecked:false},
              ]
            ],
            [
              [
                {content:'上鞋1', isChecked:false},
                {content:'上鞋2', isChecked:false},
                {content:'上鞋3', isChecked:false},
                {content:'上鞋4', isChecked:false},
              ],

              [
                {content:'下鞋1', isChecked:false},
                {content:'下鞋2', isChecked:false},
                {content:'下鞋3', isChecked:false},
                {content:'下鞋4', isChecked:false},
              ]
            ],

          ]

        }
      }
    },

    methods:{

      clickAll() {
        /*自己(全部)*/
        var past=this.checkObj.all;
        this.checkObj.all=!past;

        /*下一级别(第一级)*/
//        for(let i=0;i<this.checkObj.first.length;i++){
//          this.checkObj.first[i].isChecked=this.checkObj.all
//        }
        this.subordinate(this.checkObj.first,this.checkObj.all);

        /*下下一级别(第二级)*/
//        for(let i=0;i<this.checkObj.second.length;i++){
//          for(let j=0;j<this.checkObj.second[i].length;j++){
//            this.checkObj.second[i][j].isChecked=this.checkObj.all
//          }
//        }
        this.subordinate(this.checkObj.second,this.checkObj.all);


        /*下下一级别(第三级)*/
//        for(let i=0;i<this.checkObj.third.length;i++){
//          for(let j=0;j<this.checkObj.third[i].length;j++){
//            for(let k=0;k<this.checkObj.third[i][j].length;k++){
//              this.checkObj.third[i][j][k].isChecked=this.checkObj.all
//            }
//          }
//        }
        this.subordinate(this.checkObj.third,this.checkObj.all);

      },
      clickFirst(firstIndex){
        /*自己(第一级)*/
        var past=this.checkObj.first[firstIndex].isChecked;
        this.checkObj.first[firstIndex].isChecked=!past;

        /*上一级(全部)*/
        this.checkObj.all=this.checkObj.first.filter(function (x) {
            return x.isChecked
          }).length==this.checkObj.first.length;

        /*下一级别(第二级)*/
//        for(let i=0;i<this.checkObj.second[firstIndex].length;i++){
//          this.checkObj.second[firstIndex][i].isChecked=this.checkObj.first[firstIndex].isChecked
//        }
        this.subordinate(this.checkObj.second[firstIndex],this.checkObj.first[firstIndex].isChecked);
        /*下一级别(第三级)*/
//        for(let i=0;i<this.checkObj.third[firstIndex].length;i++){
//          for(let j=0;j<this.checkObj.third[firstIndex][i].length;j++){
//            this.checkObj.third[firstIndex][i][j].isChecked=this.checkObj.first[firstIndex].isChecked
//          }
//        }
        this.subordinate(this.checkObj.third[firstIndex],this.checkObj.first[firstIndex].isChecked)
      },
      clickSecond(firstIndex,secondIndex) {
        /*自己(第二级)*/
        var past=this.checkObj.second[firstIndex][secondIndex].isChecked;
        this.checkObj.second[firstIndex][secondIndex].isChecked=!past;

        /*上一级(第一级)*/
        this.checkObj.first[firstIndex].isChecked=this.checkObj.second[firstIndex].filter(function (x) {
            return x.isChecked
          }).length==this.checkObj.second[firstIndex].length;

        /*上上一级(全部)*/
        this.checkObj.all=this.checkObj.first.filter(function (x) {
            return x.isChecked
          }).length==this.checkObj.first.length;

        /*下一级别(第三级)*/
//        for(let i=0;i<this.checkObj.third[firstIndex][secondIndex].length;i++){
//          this.checkObj.third[firstIndex][secondIndex][i].isChecked=this.checkObj.second[firstIndex][secondIndex].isChecked
//        }
        this.subordinate(this.checkObj.third[firstIndex][secondIndex],this.checkObj.second[firstIndex][secondIndex].isChecked)
      },
      clickThird(firstIndex,secondIndex,thirdIndex){
        /*自己(第三级)*/
        var past=this.checkObj.third[firstIndex][secondIndex][thirdIndex].isChecked;
        this.checkObj.third[firstIndex][secondIndex][thirdIndex].isChecked=!past;

        /*上一级(第二级)*/
        this.checkObj.second[firstIndex][secondIndex].isChecked=this.checkObj.third[firstIndex][secondIndex].filter(function (x) {
            return x.isChecked
          }).length==this.checkObj.third[firstIndex][secondIndex].length;

        /*上上一级(第一级)*/
        this.checkObj.first[firstIndex].isChecked=this.checkObj.second[firstIndex].filter(function (x) {
            return x.isChecked
          }).length==this.checkObj.second[firstIndex].length;

        /*上上上一级(全部)*/
        this.checkObj.all=this.checkObj.first.filter(function (x) {
            return x.isChecked
          }).length==this.checkObj.first.length;
      },
      //显示第二级别
      secondShow(firstIndex){
        this.checkObj.first[firstIndex].isShow=!this.checkObj.first[firstIndex].isShow;
      },
      //显示第二级别
      thirdShow(firstIndex,secondIndex){
        this.checkObj.second[firstIndex][secondIndex].isShow=!this.checkObj.second[firstIndex][secondIndex].isShow;
      },
      //下级(优化函数)
      subordinate(target,value){
        for(var i=0;i<target.length;i++){
          if(Array.isArray(target[i])){
            this.subordinate(target[i],value);
          }else {
            target[i].isChecked=value;
          }
        }
      },
    }
  }


</script>


