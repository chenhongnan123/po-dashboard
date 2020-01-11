<template>
  <div class="home">
    <header>
      <img src="../assets/shopworx.png"/>
      <h2>Finishing Center Process Parameter</h2>
      <!-- <img src="../assets/customerLogo.png"/> -->
      <span>
        <el-select v-model="duringTime" placeholder="显示范围" @change="handleDuringTime">
          <el-option
            v-for="item in duringTimeOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span class="time-going nowrap-one">{{dateTime}}</span>
      </span>
    </header>
    
    <el-carousel height="100%" :autoplay="false" arrow="always">
      <el-carousel-item>
        <div class="item-container">
          <div>
              <Charts :chartsData='chartsData1'/>
          </div>
          <div>
              <Charts :chartsData='chartsData2'/>
          </div>
          <div>
              <Charts :chartsData='chartsData5'/>
          </div>
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="item-container">
          <div>
              <Charts :chartsData='chartsData3'/>
          </div>
          <div>
              <Charts :chartsData='chartsData4'/>
          </div>
          <div>
              <Charts :chartsData='chartsData6'/>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import Charts from "./Charts"
import { setInterval } from 'timers';
import socketioclient from 'socket.io-client';

const namespace = 'analyzer';
const eventName = 'analyzer_fcstation';

export default {
  name: 'Home',
  data(){
    return {
      dateTime:null,
      duringTime:null,
      intervalTime:.5,
      duringTimeOptions:[
        {name:10,id:10},
        {name:30,id:30},
        {name:60,id:60},
        {name:120,id:120},
        {name:240,id:240},
      ],
      chartsData1:{
        dataList:[],
        xAxis:[],
        type:null,
        title:"",
        isHiddenLegend:false,
        title:"OP201 压力 Pressure",
        ylName:"压力(Bar)",
        lMax:10,
        lMin:0,
      },
      chartsData2:{
        dataList:[],
        xAxis:[],
        type:null,
        title:"OP201 温度 Temperature - 电流 Current",
        ylName:"温度(℃)",
        yrName:"电流(A)",
        lMax:350,
        lMin:100,
        rMax:5,
        rMin:0,
      },
      chartsData3:{
        dataList:[],
        xAxis:[],
        type:null,
        title:"",
        isHiddenLegend:false,
        title:"OP203 压力 Pressure",
        ylName:"压力(Bar)",
        lMax:10,
        lMin:0,
      },
      chartsData4:{
        dataList:[],
        xAxis:[],
        type:null,
        title:"OP203 温度 Temperature - 电流 Current",
        ylName:"温度(℃)",
        yrName:"电流(A)",
        lMax:350,
        lMin:100,
        rMax:5,
        rMin:0,
      },
      chartsData5:{
        dataList:[],
        xAxis:[],
        type:null,
        title:"",
        lMax:100,
        lMin:0,
        gridTop:5,
        itemGap:1,

      },
      chartsData6:{
        dataList:[],
        xAxis:[],
        type:null,
        title:"",
        lMax:100,
        lMin:0,
        gridTop:5,
        itemGap:1,
      },
      data1:{
        xData:[],
        xStoreData:[],
        yData:[
          {data:[],storeData:[]},
          {data:[],storeData:[]},
          {data:[],storeData:[]},
          {data:[],storeData:[]},
          {data:[],storeData:[]},
          {data:[],storeData:[]},
        ]
      },
      data2:{
        xData:[],
        xStoreData:[],
        yData:[{data:[],storeData:[]},{data:[],storeData:[]},{data:[],storeData:[]}]
      },
      data3:{
        xData:[],
        xStoreData:[],
        yData:[
          {data:[],storeData:[]},
          {data:[],storeData:[]},
          {data:[],storeData:[]},
          {data:[],storeData:[]},
          {data:[],storeData:[]},
          {data:[],storeData:[]},
        ]
      },
      data4:{
        xData:[],
        xStoreData:[],
        yData:[{data:[],storeData:[]},{data:[],storeData:[]},{data:[],storeData:[]}]
      },
      data5:{
        xData:[],
        xStoreData:[],
        yData:[
          {data:[],storeData:[]},
          {data:[],storeData:[]},
          {data:[],storeData:[]},
          {data:[],storeData:[]},
          {data:[],storeData:[]},
          {data:[],storeData:[]},
          {data:[],storeData:[]},
        ]
      },
      data6:{
        xData:[],
        xStoreData:[],
        yData:[
          {data:[],storeData:[]},
          {data:[],storeData:[]},
          {data:[],storeData:[]},
          {data:[],storeData:[]},
          {data:[],storeData:[]},
          {data:[],storeData:[]},
          {data:[],storeData:[]},
        ]
      },
      paramList1:[
        'Op201CompCoolFwdPressAct',
        'Op201CompHeatFwdPressAct',
        'Op201CompJunctFwdPressAct',
        'Op201CompMatchFwdPressAct',
        'Op201TankHeatFwdPressAct',
        'Op201TankMatchFwdPressAct',

        'Op201CompCoolBwdPressAct',
        'Op201CompHeatBwdPressAct',
        'Op201CompJunctBwdPressAct',
        'Op201CompMatchBwdPressAct',
        'Op201TankHeatBwdPressAct',
        'Op201TankMatchBwdPressAct',
        ],
      paramNumList1:['76','70','74','66','72','68',  '61','59','60','58', '64','63',],
      paramList2:['Op201CompTempActCP','Op201TankTempActCP','P201M-curent',],
      paramNumList2:['45','47','297',],
      paramList3:[
        'Op203CompCoolFwdPressAct',
        'Op203CompHeatFwdPressAct',
        'Op203CompJunctFwdPressAct',
        'Op203CompMatchFwdPressAct',
        'Op203TankHeatFwdPressAct',
        'Op203TankMatchFwdPressAct',

        'Op203CompCoolBwdPressAct',
        'Op203CompHeatBwdPressAct',
        'Op203CompJunctBwdPressAct',
        'Op203CompMatchBwdPressAct',
        'Op203TankHeatBwdPressAct',
        'Op203TankMatchBwdPressAct',
        ],
      paramNumList3:['231','225','229','221','227','223',  '216','214','215','213','219','218',],
      paramList4:['Op203CompTempActCP','Op203TankTempActCP','P203M-Curent',],
      paramNumList4:['253','255','298',],
      paramList5:['P201M PID','Gripper Match','Gripper Heat','Gripper Junction','Gripper Cool','Hotplate Match','Hotplate Heat',],
      paramNumList5:['292','91','95','99','103','107','111'],
      paramList6:['P203M PID','Gripper Match','Gripper Heat','Gripper Junction','Gripper Cool','Hotplate Match','Hotplate Heat',],
      paramNumList6:['294','257','261','265','269','273','277'],
      differenceName201:['Op201CompCool','Op201CompHeat','Op201CompJunct','Op201CompMatch','Op201TankHeat','Op201TankMatch'],
      differenceName203:['Op203CompCool','Op203CompHeat','Op203CompJunct','Op203CompMatch','Op203TankHeat','Op203TankMatch'],

    }
  },
  mounted(){
    // this.initSocket();
    this.init();
    setInterval(()=>{
      this.dateTime = this.getDateTime();
    },1000);
  },
  components:{
    Charts
  },
  methods:{
    init(){
      let ws = new WebSocket("ws://localhost:8181");
      let timeout = null;
      this.socketData = null;
      ws.onopen = function() {
        console.log("client：打开连接");
      };
      
      ws.onmessage = (e) => {
        if(e.data){
          const data = JSON.parse(e.data);
          // console.log(count)
          if(data.fcstation2){
            this.socketData = data.fcstation2;
          }
        }
      };
      timeout = setInterval(()=>{
          this.handleSocketData(this.socketData,1,this.paramList1,this.paramNumList1);
          this.handleSocketData(this.socketData,2,this.paramList2,this.paramNumList2);
          this.handleSocketData(this.socketData,3,this.paramList3,this.paramNumList3);
          this.handleSocketData(this.socketData,4,this.paramList4,this.paramNumList4);
          this.handleSocketData(this.socketData,5,this.paramList5,this.paramNumList5);
          this.handleSocketData(this.socketData,6,this.paramList6,this.paramNumList6);
      },this.intervalTime*1000);
    },
    initSocket() {
      let timeout = null;
      this.socketData = null;
      const socket = socketioclient.connect(`http://192.168.8.108:10192/${namespace}`);
      socket.on('connect', () => {
        console.log('connected to socket!!!');
      });
      socket.on(eventName, (resp) => {
        console.log(resp)
        if(resp){
          const data = resp;
          if(data.fcstation2){
            this.socketData = data.fcstation2;
          }
        }
      });
      timeout = setInterval(()=>{
          this.handleSocketData(this.socketData,1,this.paramList1,this.paramNumList1);
          this.handleSocketData(this.socketData,2,this.paramList2,this.paramNumList2);
          this.handleSocketData(this.socketData,3,this.paramList3,this.paramNumList3);
          this.handleSocketData(this.socketData,4,this.paramList4,this.paramNumList4);
          this.handleSocketData(this.socketData,5,this.paramList5,this.paramNumList5);
          this.handleSocketData(this.socketData,6,this.paramList6,this.paramNumList6);
      },this.intervalTime*1000);
    },
    handleSocketData(list,type,paramList,paramNumList,isHandle){
      // this['data'+type].xData.push(this.getDateTime(list.timestamp).substr(11,this.getDateTime(list.timestamp).length));
      // this['data'+type].xStoreData.push(this.getDateTime(list.timestamp).substr(11,this.getDateTime(list.timestamp).length));
      const duringTime = this.duringTime || 10;
      const count = duringTime/this.intervalTime + 1;
      // this['data'+type].xData = [];
      // this['data'+type].xStoreData = [];
      // for(let i=0;i<=duringTime;i=i+this.intervalTime){
      //   this['data'+type].xData.push(i);
      //   // this['data'+type].xStoreData.push(i);
      // }
      // this['data'+type].xData.reverse();
      this['data'+type].yData.forEach((val,key)=>{
        val["type"] = "line";
        val["smooth"] = true;
        val["itemStyle"] = {opacity:0};
        if(key == 0){
          val["itemStyle"]["color"] = "blue";
        }else if(key === 1){
          val["itemStyle"]["color"] = "yellow";
        }else if(key === 2){
          val["itemStyle"]["color"] = "green";
        }else if(key === 3){
          val["itemStyle"]["color"] = "white";
        }else if(key === 4){
          val["itemStyle"]["color"] = "red";
        }else if(key === 5){
          val["itemStyle"]["color"] = "orange";
        }
        // val["itemStyle"] = {opacity:0};
        if(type === 1 || type === 3){
          let difference = list[paramNumList[key]] - list[paramNumList[key+6]];
          val.data.unshift(difference.toFixed(2));
          val.storeData.unshift(difference.toFixed(2));
          if(type === 1)
            val.name = this.differenceName201[key];
          else
            val.name = this.differenceName203[key];
        }else{
          let yValue = list[paramNumList[key]];
          if(type === 2 || type === 4){
            if(key === 2){
              val["yAxisIndex"] = 1;
            }
          }
          if(type === 5 || type === 6){
            if(key > 0){
              val["type"] = "bar";
              val["itemStyle"] = {opacity:1};
              if(key === 1){
                yValue*=20;
                val["itemStyle"]["color"] = "blue";
              }else if(key === 2){
                yValue*=40;
                val["itemStyle"]["color"] = "yellow";
              }else if(key === 3){
                yValue*=60;
                val["itemStyle"]["color"] = "green";
              }else if(key === 4){
                yValue*=80;
                val["itemStyle"]["color"] = "white";
              }else if(key === 5){
                yValue*=30;
                val["itemStyle"]["color"] = "red";
              }else if(key === 6){
                yValue*=60;
                val["itemStyle"]["color"] = "orange";
              }
            }
            
          }
          val.data.unshift(parseInt(yValue).toFixed(2));
          val.storeData.unshift(parseInt(yValue).toFixed(2));
          val.name = paramList[key];
          
        };
        
        if(isHandle){
          if(count <= val.data.length){
            // val.data = val.data.slice(val.data.length - count,val.data.length);
            val.data = val.data.slice(0,count);
          }else{
            // let index = val.storeData.length-count > 0 ? val.storeData.length-count :0;
            // val.data = val.storeData.slice(index,val.storeData.length);
            val.data = val.storeData.slice(0,count);
          }
        }
        if(val.data.length > count){
          val.data.pop();
        };
        if(val.storeData.length > 481){
          val.storeData.pop();
        }
      });
      this['data'+type].xData.unshift(this.getDateTime(list.timestamp).substr(14,list.timestamp.length));
      this['data'+type].xStoreData.unshift(this.getDateTime(list.timestamp).substr(14,list.timestamp.length));
      if(this['data'+type].xData.length > count){
        this['data'+type].xData.pop();
      }
      if(this['data'+type].xStoreData.length > 481){
        this['data'+type].xStoreData.pop();
      }
      if(isHandle){
        if(count <= this['data'+type].xData.length){
          this['data'+type].xData = this['data'+type].xData.slice(0,count);
          // this['data'+type].xData = this['data'+type].xData.slice(this['data'+type].xData.length - count,this['data'+type].xData.length);
        }else{
          // let index = this['data'+type].xStoreData.length-count > 0 ? this['data'+type].xStoreData.length-count : 0;
          // this['data'+type].xData = this['data'+type].xStoreData.slice(index,this['data'+type].xStoreData.length);
          this['data'+type].xData = this['data'+type].xStoreData.slice(0,count);
        }
      }
      this.setOption(this['data'+type].xData,this['data'+type].yData,type,this['data'+type].xStoreData);
    },
    setOption(xData,yData,type,xStoreData){
      this['chartsData'+type].xAxis = [
          {
              type: 'category',
              boundaryGap: true,
              data:xData,
              storeData:xStoreData,
              axisLabel:{
                // interval:xData.length > 50 ? "auto" : 0,
                rotate:xData.length > 30 ? 40 : 0,
                fontSize:xData.length > 50 ? 10 : 12,
              },
              axisLine:{
                lineStyle:{
                  color:'#fff'
                }
              },
          }
      ];
      this['chartsData'+type].dataList = yData;
      this['chartsData'+type].type = type;
    },
    handleDuringTime(time){
      console.log(this.duringTime)
      this.handleSocketData(this.socketData,1,this.paramList1,this.paramNumList1,1);
      this.handleSocketData(this.socketData,2,this.paramList2,this.paramNumList2,1);
      this.handleSocketData(this.socketData,3,this.paramList3,this.paramNumList3,1);
      this.handleSocketData(this.socketData,4,this.paramList4,this.paramNumList4,1);
      this.handleSocketData(this.socketData,5,this.paramList5,this.paramNumList5,1);
      this.handleSocketData(this.socketData,6,this.paramList6,this.paramNumList6,1);
    },
    getDateTime(dateNum){
      let dateObj = new Date(dateNum||new Date().getTime());
      return this.addZero(dateObj.getFullYear())+"-"+this.addZero((dateObj.getMonth()+1))+"-"+this.addZero(dateObj.getDate())+" "+this.addZero(dateObj.getHours())+":"+this.addZero(dateObj.getMinutes())+":"+this.addZero(dateObj.getSeconds());
    },
    addZero(num){
      return num.toString().length == 1 ? "0" + num : num;
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .home{
    height: 100%;
    background: #13253C;
    padding-top: 48px;
    box-sizing: border-box;
    
  }
  header{
    position: fixed;
    width: 100%;
    height: 48px;
    background: #f5f5f5;
    top: 0;
    font-size: 24px;
    line-height: 48px;
    font-weight: 500;
    color: rgba(0, 0, 0,.7);
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
    h2{
      font-weight: 500;
      font-size: 30px;
    }
    >span{
      // width: 40%;
      .el-select{
        vertical-align: middle;
        margin-right: 5px;
        width: 120px;
      }
      span{
        vertical-align: middle;
      }
      
    }
    input::-webkit-input-placeholder{
      color: rgba(0, 0, 0, 0.7);
    }
    .time-going{
      font-size: 17px;
    }
    img{
      // width: 20%;
      height: 40px;
    }
  }
  .el-carousel{
    height: 100%;
  }
  .el-carousel-item{
    height: 100%;
  }
  .item-container{
    height: 100%;
    >div{
      height: 40%;
      background: #283B52;
      overflow: hidden;
      >div{
        // margin-top: 5%;
      }
    }
    >div:nth-child(3){
      height: 15%;
    }
    >div:nth-child(2),div:nth-child(3){
      margin-top: 1%;
    }
  }
</style>
