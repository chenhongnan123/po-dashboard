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
      <el-carousel-item>
        <div class="item-container third-container">
          <div>
              <Charts :chartsData='chartsData7'/>
          </div>
          <div>
              <Charts :chartsData='chartsData8'/>
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
        lMin:-10,
      },
      chartsData2:{
        dataList:[],
        xAxis:[],
        type:null,
        title:"OP201 温度 Temperature - 电流 Current",
        ylName:"温度(℃)",
        yrName:"电流(A)",
        lMax:280,
        lMin:240,
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
        lMin:-10,
      },
      chartsData4:{
        dataList:[],
        xAxis:[],
        type:null,
        title:"OP203 温度 Temperature - 电流 Current",
        ylName:"温度(℃)",
        yrName:"电流(A)",
        lMax:280,
        lMin:230,
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
        tooltip:{
          textStyle:{
            fontSize:10,
            lineHeight:0,
            rich:'auto',
            width:'100%',
          },
          position:(point)=>['60%','-10%'],
          extraCssText:'transform:scaleY(.9)'
        }
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
        tooltip:{
          textStyle:{
            fontSize:10,
            lineHeight:0,
            rich:'auto',
            width:'100%',
          },
          position:(point)=>['60%','-10%'],
          extraCssText:'transform:scaleY(.9)'
        }
      },
      chartsData7:{
        dataList:[],
        xAxis:[],
        type:null,
        title:"",
        isHiddenLegend:false,
        title:"OP201 Open Time",
        // ylName:"压力(Bar)",
        lMax:6,
        lMin:0,
        gridHeight:'65%',
        gridLeft:'7%',
      },
      chartsData8:{
        dataList:[],
        xAxis:[],
        type:null,
        title:"",
        isHiddenLegend:false,
        title:"OP203 Open Time",
        // ylName:"压力(Bar)",
        lMax:6,
        lMin:0,
        gridHeight:'65%',
        gridLeft:'7%',
      },
      data1:{
        xData:[],
        xStoreData:[],
        yData:[
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
      data7:{
        xData:[],
        xStoreData:[],
        yData:[
          {data:[],storeData:[]},
        ]
      },
      data8:{
        xData:[],
        xStoreData:[],
        yData:[
          {data:[],storeData:[]},
        ]
      },
      paramList1:[
        'OP201 Gripper forward pressure',
        'OP201 Mobile Hotplate forward pressure',

        'OP201 Gripper Backward pressure',
        'OP201 Mobile Hotplate Backward pressure',
      ],
      paramNumList1:['528','530','529',531],
      paramList2:['Op201CompTempActCP','Op201TankTempActCP','P201M-curent',],
      paramNumList2:['45','47','297',],
      paramList3:[
        'OP203 Gripper forward pressure',
        'OP203 Mobile Hotplate forward pressure',

        'OP203 Gripper Backward pressure',
        'OP203 Mobile Hotplate Backward pressure',
      ],
      paramNumList3:['536','538','537','539'],
      paramList4:['Op203CompTempActCP','Op203TankTempActCP','P203M-Curent',],
      paramNumList4:['253','255','298',],
      paramList5:['P201M PID','Gripper Match','Gripper Heat','Gripper Junction','Gripper Cool','Hotplate Match','Hotplate Heat',],
      paramNumList5:['292','91','95','99','103','107','111'],
      paramList6:['P203M PID','Gripper Match','Gripper Heat','Gripper Junction','Gripper Cool','Hotplate Match','Hotplate Heat',],
      paramNumList6:['294','257','261','265','269','273','277'],
      paramList7:['op201opentimeactcp'],
      paramNumList7:['90'],
      paramList8:['op203opentimeactcp'],
      paramNumList8:['245'],
      differenceName201:['OP201 Gripper','OP201 Mobile Hotplate'],
      differenceName203:['OP203 Gripper','OP203 Mobile Hotplate'],
    }
  },
  mounted(){
    this.initChartsData();
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
    initChartsData(){
      const colorList = ["blue","yellow","green","white","red","blue","orange"];
      for(let i = 1;i <= 8;i++){
        if(i<=4){
          for(let k = 0;k < this['data'+i].yData.length;k++){
            this['data'+i].yData[k]['type'] = 'line';
            this['data'+i].yData[k]['smooth'] = 'true';
            this['data'+i].yData[k]['itemStyle'] = {
              opacity:0,
              color:colorList[k],
            };
            if(i === 2 || i === 4){
              if(k === 2){
                this['data'+i].yData[k]['yAxisIndex'] = 1;
              }
            }
          }
        }else if(i === 5 || i === 6){
          for(let k = 0;k < this['data'+i].yData.length;k++){
            if(k === 0){
              this['data'+i].yData[k]['type'] = 'line';
              this['data'+i].yData[k]['smooth'] = 'true';
              this['data'+i].yData[k]['itemStyle'] = {
                opacity:0,
                color:colorList[k],
              };
            }else{
              this['data'+i].yData[k]['type'] = 'bar';
              this['data'+i].yData[k]['itemStyle'] = {
                opacity:1,
                color:colorList[k],
              };
            }
          }
        }else{
          for(let k = 0;k < this['data'+i].yData.length;k++){
            this['data'+i].yData[k]['type'] = 'bar';
            this['data'+i].yData[k]['itemStyle'] = {
              opacity:1,
              color:colorList[k],
            };
            this['data'+i].yData[k]['markLine'] = {
              data: [{
                  yAxis: 5
              }],
              lineStyle:{
                color:'yellow'
              },
              label:{
                formatter:'最大值5'
              }
            };
          }
        }
          
      }
    },
    init(){
      let ws = new WebSocket("ws://localhost:8181");
      this.socketData = null;
      let st2tlabel = null;
      ws.onopen = function() {
        console.log("client：打开连接");
      };
      ws.onmessage = (e) => {
        if(e.data){
          const data = JSON.parse(e.data);
          // console.log(data.fcstation2.st2tlabel)
          if(data.fcstation2){
            this.socketData = data.fcstation2;
            if(data.fcstation2['30'] !== st2tlabel){
              st2tlabel = data.fcstation2['30'];
              this.handleSocketData(data.fcstation2,7,this.paramList7,this.paramNumList7);
              this.handleSocketData(data.fcstation2,8,this.paramList7,this.paramNumList8);
            }
          }
        }
      };
      for(let i = 0;i<30;i++){
        this.handleSocketData({'30':'N/A'},7,this.paramList7,this.paramNumList7);
        this.handleSocketData({'30':'N/A'},8,this.paramList7,this.paramNumList8);
      }
      setInterval(()=>{
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
      let st2tlabel = null;
      const socket = socketioclient.connect(`http://192.168.2.10:10192/${namespace}`);
      // const socket = socketioclient.connect(`http://192.168.8.108:10192/${namespace}`);
      socket.on('connect', () => {
        console.log('connected to socket!!!');
      });
      for(let i = 0;i<30;i++){
        this.handleSocketData({'30':'N/A'},7,this.paramList7,this.paramNumList7);
        this.handleSocketData({'30':'N/A'},8,this.paramList7,this.paramNumList8);
      }
      socket.on(eventName, (resp) => {
        console.log(resp)
        if(resp){
          const data = resp;
          if(data.fcstation2){
            this.socketData = data.fcstation2;
            if(data.fcstation2['30'] !== st2tlabel){
              st2tlabel = data.fcstation2['30'];
              this.handleSocketData(data.fcstation2,7,this.paramList7,this.paramNumList7);
              this.handleSocketData(data.fcstation2,8,this.paramList7,this.paramNumList8);
            }
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
      const duringTime = this.duringTime || 10;
      const count = duringTime/this.intervalTime + 1;
      this['data'+type].yData.forEach((val,key)=>{
        if(type === 1 || type === 3){
          // console.log(this.data2.xData)
          // console.log(list.timestamp)
          let difference = list[paramNumList[key]] - list[paramNumList[key+2]];
          val.data.unshift(difference.toFixed(2));
          val.storeData.unshift(difference.toFixed(2));
          if(type === 1)
            val.name = this.differenceName201[key];
          else
            val.name = this.differenceName203[key];
        }else{
          let yValue = list[paramNumList[key]];
          if(type === 5 || type === 6){
            if(key > 0){
              if(key === 1){
                yValue*=20;
              }else if(key === 2){
                yValue*=40;
              }else if(key === 3){
                yValue*=60;
              }else if(key === 4){
                yValue*=80;
              }else if(key === 5){
                yValue*=30;
              }else if(key === 6){
                yValue*=60;
              }
            }
            
          }
          if(type === 7 || type === 8){
            if(!list['30'] || list['30'] === 'N/A'){
              yValue = 0;
              list['30'] = 'N/A'
            }
          }
          val.data.unshift(parseInt(yValue).toFixed(2));
          val.storeData.unshift(parseInt(yValue).toFixed(2));
          val.name = paramList[key];
          
        };
        if(type === 7 || type === 8){
          if(val.data.length > 30){
            val.data.pop();
          };
        }else{
          if(val.data.length > count){
            val.data.pop();
          };
          if(val.storeData.length > 481){
            val.storeData.pop();
          };
          if(isHandle){
            if(count <= val.data.length){
              val.data = val.data.slice(0,count);
            }else{
              val.data = val.storeData.slice(0,count);
            }
          }
        }
      });
      if(type === 7 || type === 8){
        this['data'+type].xData.unshift(list['30']);
        if(this['data'+type].xData.length > 30){
          this['data'+type].xData.pop();
        };
      }else{
        if(type === 1){
          console.log(this.getDateTime(list.timestamp).substr(14,list.timestamp.length));
        }
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
          }else{
            this['data'+type].xData = this['data'+type].xStoreData.slice(0,count);
          }
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
                rotate:xData.length > 30 || type === 7 || type === 8 ? 40 : 0,
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
  .third-container{
    >div{
      height: 49%;
    }
  }
</style>
