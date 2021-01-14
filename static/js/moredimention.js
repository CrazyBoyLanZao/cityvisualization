const echarts = require('echarts')
const axios = require('axios')
export default class moredimention {
  constructor() {
    this.groupColors = ['#d94e5d','#eac736','#50a3ba','#51e974','#5172e9']
    this.option = {
      title:{
        text:'城市污染物对比关系图',
        left:'center'
      },
      color:this.groupColors,
      legend: {
        bottom: 0,
        data: [],
        itemGap: 20,
        textStyle: {
          color: '#000000',
          fontSize: 14
        },
      },
      parallelAxis: [],
      visualMap: {
        show: false,
        // min: 0,
        // max: 150,
        left: '620',
        categories: [],
        dimension:7,
        inRange: {
          color: this.groupColors //['#d94e5d','#eac736','#50a3ba']
        },
      },
      parallel: {
        left: '3%',
        right: '10%',
        bottom: '10%',
        top:'16%',
        // layout: 'vertical',
        parallelAxisDefault: {
          type: 'value',
          name: 'AQI指数',
          // nameLocation: 'start',
          nameGap: 15,
          nameTextStyle: {
            color: '#000000',
            fontSize: 10
          },
          axisLine: {
            lineStyle: {
              color: '#000000'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#000000'
            }
          },
          splitLine: {
            show: true
          },
          axisLabel: {
            // show:true,
            color: '#000000'
          }
        }
      },
      series: []
    };
    this.Mycharts = echarts.init(document.getElementById('moreDimention'));
  }

  initdimention(city='上饶市') {
    if (this.option.visualMap.categories.indexOf(city) !== -1)
      return 0
    axios.get('static/json/elementAir/' + city + '.json').then((res) => {
     let data =  res.data.map(r=>{
        return [r.date,Number.parseFloat(r['PM2.5']),Number.parseFloat(r['PM10'])
          ,Number.parseFloat(r['CO']),Number.parseFloat(r['NO2']),
          Number.parseFloat(r['SO2']),Number.parseFloat(r['O3']),r['城市名'],Number.parseFloat(r['AQI'])]
      })
      let schema = [
        {name: 'date', index: 0, text: '日期'},
        {name: 'PM2.5', index: 1, text: 'PM2.5'},
        {name: 'PM10', index: 2, text: 'PM10'},
        {name: 'CO', index: 3, text: 'CO'},
        {name: 'NO2', index: 4, text: 'NO2'},
        {name: 'SO2', index: 5, text: 'SO2'},
        {name: 'O3', index: 6, text: 'O3'},
        {name: '城市名', index: 7, text: '城市名'},
        {name: 'AQI', index: 8, text: 'AQI'}
      ];
      this.option.parallelAxis = [
        {dim: 0, name: schema[0].text, type: 'category',inverse:true},
        {dim: 1, name: schema[1].text},
        {dim: 2, name: schema[2].text},
        {dim: 3, name: schema[3].text},
        {dim: 4, name: schema[4].text},
        {dim: 5, name: schema[5].text},
        {dim: 6, name: schema[6].text},
        {dim: 8, name: schema[8].text}]
      let serie = {
          name: city,
          type: 'parallel',
          lineStyle: {
            normal: {
              width: 1,
              opacity: 0.5
            }
          },
          data: data
        }
      this.option.series.push(serie)
      this.option.legend.data.push(city)
      this.option.visualMap.categories.push(city)

      // this.option.series[0].name = city
      this.Mycharts.setOption(this.option)
    });
  }
  dimentionevent(heatcalendar){
    this.Mycharts.on('legendselectchanged',(e)=>{
      // delete  this.option.legend.selected[e.name];
      this.option.legend.data.some((item,index)=>{
        if(item===e.name){
          this.option.visualMap.categories.splice(index,1)
          this.option.legend.data.splice(index,1)
          return true;
        }
      })
      this.option.series.some((item,index)=>{
        if(item.name===e.name){
          this.option.visualMap.categories.splice(index,1)
          this.option.series.splice(index,1)
          return true;
        }
      })
      this.Mycharts.setOption(this.option);
      console.log(e)
    })
  }

}
