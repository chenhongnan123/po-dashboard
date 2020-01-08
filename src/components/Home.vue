<template>
  <div class="home">
    <header>
      <img src="../assets/shopworx.png"/>
      <span>po-dashboard</span>
      <img src="../assets/customerLogo.png"/>
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
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="item-container">
          <div>
              <!-- <div id="myChart1" :style="{width: '100%', height: '80%'}"></div> -->
              <Charts :chartsData='chartsData3'/>
          </div>
          <div>
              <Charts :chartsData='chartsData4'/>
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
      chartsData1:{
        dataList:[],
        xAxis:[],
        type:null,
        title:"",
        isHiddenLegend:true,
        title:"OP201 压力Pressure",
        ylName:"压力(TBD)",
      },
      chartsData2:{
        dataList:[],
        xAxis:[],
        type:null,
        title:"OP201 温度Temperature-电流Current-PID",
        ylName:"温度(℃)",
        yrName:"电流(A)",
      },
      chartsData3:{
        dataList:[],
        xAxis:[],
        type:null,
        title:"",
        isHiddenLegend:true,
        title:"OP203 压力Pressure",
        ylName:"压力(TBD)",
      },
      chartsData4:{
        dataList:[],
        xAxis:[],
        type:null,
        title:"OP203 温度Temperature-电流Current-PID",
        ylName:"温度(℃)",
        yrName:"电流(A)",
      }
    }
  },
  async mounted(){
    this.initSocket();
  },
  components:{
    Charts
  },
  methods:{
    init(){
      this.data1 = {
        xData:[],
        yData:[{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]}]
      };
      this.data2 = {
        xData:[],
        yData:[{data:[]},{data:[]},{data:[]},{data:[]}]
      };
      this.data3 = {
        xData:[],
        yData:[{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]}]
      };
      this.data4 = {
        xData:[],
        yData:[{data:[]},{data:[]},{data:[]},{data:[]}]
      };
      const paramList1 = [
        'Op201CompCoolFwdPressAct',
        'Op201CompHeatFwdPressAct',
        'Op201CompJunctFwdPressAct',
        'Op201CompMatchFwdPressAct',
        'Op201CompCoolBwdPressAct',
        'Op201CompHeatBwdPressAct',
        'Op201CompJunctBwdPressAct',
        'Op201CompMatchBwdPressAct',
        'Op201TankHeatFwdPressAct',
        'Op201TankMatchFwdPressAct',
        'Op201TankHeatBwdPressAct',
        'Op201TankMatchBwdPressAct',
        ];
      const paramNumList1 = ['76','70','74','66','61','59','60','58','72','68','64','63',];
      const paramList2 = ['Op201CompTempActCP','Op201TankTempActCP','P201M PID','P201M-curent',];
      const paramNumList2 = ['45','47','292','297',];
      const paramList3 = [
        'Op203CompCoolFwdPressAct',
        'Op203CompHeatFwdPressAct',
        'Op203CompJunctFwdPressAct',
        'Op203CompMatchFwdPressAct',
        'Op203CompCoolBwdPressAct',
        'Op203CompHeatBwdPressAct',
        'Op203CompJunctBwdPressAct',
        'Op203CompMatchBwdPressAct',
        'Op203TankHeatFwdPressAct',
        'Op203TankMatchFwdPressAct',
        'Op203TankHeatBwdPressAct',
        'Op203TankMatchBwdPressAct',
        ];
      const paramNumList3 = ['231','225','229','221','216','214','215','213','227','223','219','218',];
      const paramList4 = ['Op203CompTempActCP','Op203TankTempActCP','P203M PID','P203M-Curent',];
      const paramNumList4 = ['253','255','294','298',];

      let ws = new WebSocket("ws://localhost:8181");
      let timeout = null;
      let count = 1;
      ws.onopen = function() {
        console.log("client：打开连接");
      };
      
      ws.onmessage = (e) => {
        if(e.data){
          const data = JSON.parse(e.data);
          // console.log(count)
          if(data.fcstation2){
            if(count === 1){
              const list = data.fcstation2;
              this.handleSocketData(list,1,paramList1,paramNumList1);
              this.handleSocketData(list,2,paramList2,paramNumList2);
              this.handleSocketData(list,3,paramList3,paramNumList3);
              this.handleSocketData(list,4,paramList4,paramNumList4);
            }
          }
        }
      };
      timeout = setInterval(()=>{
        count >= 5 ? count = 1 : count++;
      },1000);
    },
    initSocket() {
      this.data1 = {
        xData:[],
        yData:[{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]}]
      };
      this.data2 = {
        xData:[],
        yData:[{data:[]},{data:[]},{data:[]},{data:[]}]
      };
      this.data3 = {
        xData:[],
        yData:[{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]},{data:[]}]
      };
      this.data4 = {
        xData:[],
        yData:[{data:[]},{data:[]},{data:[]},{data:[]}]
      };
      const paramList1 = [
        'Op201CompCoolFwdPressAct',
        'Op201CompHeatFwdPressAct',
        'Op201CompJunctFwdPressAct',
        'Op201CompMatchFwdPressAct',
        'Op201CompCoolBwdPressAct',
        'Op201CompHeatBwdPressAct',
        'Op201CompJunctBwdPressAct',
        'Op201CompMatchBwdPressAct',
        'Op201TankHeatFwdPressAct',
        'Op201TankMatchFwdPressAct',
        'Op201TankHeatBwdPressAct',
        'Op201TankMatchBwdPressAct',
        ];
      const paramNumList1 = ['76','70','74','66','61','59','60','58','72','68','64','63',];
      const paramList2 = ['Op201CompTempActCP','Op201TankTempActCP','P201M PID','P201M-curent',];
      const paramNumList2 = ['45','47','292','297',];
      const paramList3 = [
        'Op203CompCoolFwdPressAct',
        'Op203CompHeatFwdPressAct',
        'Op203CompJunctFwdPressAct',
        'Op203CompMatchFwdPressAct',
        'Op203CompCoolBwdPressAct',
        'Op203CompHeatBwdPressAct',
        'Op203CompJunctBwdPressAct',
        'Op203CompMatchBwdPressAct',
        'Op203TankHeatFwdPressAct',
        'Op203TankMatchFwdPressAct',
        'Op203TankHeatBwdPressAct',
        'Op203TankMatchBwdPressAct',
        ];
      const paramNumList3 = ['231','225','229','221','216','214','215','213','227','223','219','218',];
      const paramList4 = ['Op203CompTempActCP','Op203TankTempActCP','P203M PID','P203M-Curent',];
      const paramNumList4 = ['253','255','294','298',];
      let timeout = null;
      let count = 1;
      const socket = socketioclient.connect(`http://192.168.8.108:10192/${namespace}`);
      socket.on('connect', () => {
        console.log('connected to socket!!!');
      });
      socket.on(eventName, (resp) => {
        console.log(resp)
        if(resp){
          // const data = JSON.parse(resp);
          const data = resp;
          if(data.fcstation2){
            if(count === 1){
              const list = data.fcstation2;
              this.handleSocketData(list,1,paramList1,paramNumList1);
              this.handleSocketData(list,2,paramList2,paramNumList2);
              this.handleSocketData(list,3,paramList3,paramNumList3);
              this.handleSocketData(list,4,paramList4,paramNumList4);
            }
          }
        }
      });
      timeout = setInterval(()=>{
        count >= 5 ? count = 1 : count++;
      },1000);
    },
    handleSocketData(list,type,paramList,paramNumList){
      this['data'+type].xData.push(this.getDateTime(list.timestamp).substr(11,this.getDateTime(list.timestamp).length));
      this['data'+type].yData.forEach((val,key)=>{
        val["type"] = "line";
        if(type === 1 || type === 3){
          type === 1 ? val["itemStyle"] = {color:"rgb(91,159,167)"} : val["itemStyle"] = {color:"rgb(194,123,99)"};
        }else{
          if(key === 1){
            val["itemStyle"] = {color:"blue"};
          }else if(key === 2){
            val["itemStyle"] = {color:"yellow"};
          }else if(key === 3){
            val["itemStyle"] = {color:"green"};
            val["yAxisIndex"] = 1;
          }else if(key === 4){
            val["yAxisIndex"] = 1;
          }
        }
        val.data.push(list[paramNumList[key]]);;
        val.name = paramList[key];
        if(val.data.length > 10){
          val.data.shift();
        }
      });
      if(this['data'+type].xData.length > 10){
        this['data'+type].xData.shift();
      }
      this.setOption(this['data'+type].xData,this['data'+type].yData,type);
    },
    setOption(xData,yData,type){
      this['chartsData'+type].xAxis = [
          {
              type: 'category',
              boundaryGap: true,
              data:xData,
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
    getDateTime(dateNum){
      let dateObj = new Date(dateNum);
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
    justify-content: space-around;
    span{
      width: 40%;
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
      height: 49%;
      background: #283B52;
      overflow: hidden;
      >div{
        margin-top: 5%;
      }
    }
    >div:nth-child(2){
      margin-top: 2%;
    }
  }
</style>
