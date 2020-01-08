<template>
  <div class="charts">
    <div v-if="chartsData && chartsData.type" :id='"myChart"+chartsData.type' :style="{width: '100%', height: '80%'}" ></div>
    <!-- <div id='myChart2' :style="{width: '100%', height: '80%'}" ></div> -->
    <!-- <div id='myChart3' :style="{width: '100%', height: '80%'}" ></div>
    <div id='myChart4' :style="{width: '100%', height: '80%'}" ></div> -->
  </div>
</template>

<script>
export default {
  name: 'Charts',
  data(){
    return {
    }
  },
  props:{
    chartsData:{
      type:Object,
      required:false
    },
  },
  mounted(){
  },
  components:{
  },
  watch:{
    chartsData:{
      handler(newVal,oldVal){
        this.drawLine(newVal);
      },
      deep:true
    }
    
  },
  methods:{
    handleSelect(){
      this.drawLine();
    },
    drawLine(data){
      // _this.$echarts.init(document.getElementById('myChart')).dispose();
      this.myChart = this.$echarts.init(document.getElementById('myChart'+data.type))
      this.myChart.setOption({
          title: {
              text: data.title,
              // subtext: '纯属虚构'
              textStyle:{
                color:"#fff",
              },
              left:"center",
              top:0
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  label: {
                      backgroundColor: '#283b56'
                  }
              }
          },
          legend: {
              data:data.dataList.map(item=>item.name),
              textStyle:{
                color:'#fff'
              },
              top:30,
              show:!data.isHiddenLegend,
          },
          dataZoom: {
              show: false,
              start: 0,
              end: 100
          },
          xAxis: data.xAxis,
          yAxis: [
              {
                name:data.ylName,
                splitLine:{
                  show:false
                },
                axisLine:{
                  lineStyle:{
                    color:'#fff'
                  }
                },
                axisLabel:{
                  color:'#fff'
                }
              },
              {
                name:data.yrName,
                show:data.yrName,
                splitLine:{
                  show:false
                },
                axisLine:{
                  lineStyle:{
                    color:'#fff'
                  }
                },
                axisLabel:{
                  color:'#fff'
                },
                // max: 10,
                // min: 0,
              }
          ],
          series:data.dataList
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .charts{
    height: 100%;
  }
</style>
