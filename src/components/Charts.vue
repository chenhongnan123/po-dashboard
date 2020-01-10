<template>
  <div class="charts">
    <div v-if="chartsData && chartsData.type" :id='"myChart"+chartsData.type' :style="{width: '100%', height: '100%'}" ></div>
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
        if(document.getElementById('myChart'+newVal.type))
          this.drawLine(newVal);
      },
      deep:true
    }
    
  },
  methods:{
    drawLine(data){
      // _this.$echarts.init(document.getElementById('myChart')).dispose();
      if(!this.myChart)
        this.myChart = this.$echarts.init(document.getElementById('myChart'+data.type))
      this.myChart.setOption({
          grid: {
            width:'80%',
            height:'70%',
            left:'5%',
            top:data.gridTop||50,
          },
          title: {
              text: data.title,
              // subtext: '纯属虚构'
              textStyle:{
                color:"#fff",
              },
              left:"center",
              top:10
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
              top:"center",
              left:'86%',
              show:!data.isHiddenLegend,
              orient:'vertical',
              align:'left',
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
                },
                max: data.lMax,
                min: data.lMin,
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
                max: data.rMax,
                min: data.rMin,
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
