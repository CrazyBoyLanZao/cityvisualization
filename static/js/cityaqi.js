import suggestmode from "./suggestmode";

const echarts = require('echarts');
export default class cityaqi{
  constructor() {
    this.myCharts = echarts.init(document.getElementById('AQI'))
    this.data = null
    this.option = {
      // backgroundColor: '#363636',
      title: {
        text: null,
        // left: '1%',
        left:'center',
        textStyle:{
          color:"#000000"
        }
      },
      grid:{
        // right: '1%'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data: null,
        axisLine: {
          lineStyle: {
            color: '#000000'
          }
        }
      },
      yAxis: {
        axisLine: {
          lineStyle: {
            color: '#000000'
          }
        }
      },
      dataZoom: [{
        startValue: '2019-09-01'
      }, {
        type: 'inside'
      }],
      visualMap: {
        top: 0,
        right: 0,
        pieces: [{
          gt: 0,
          lte: 50,
          color: '#096'
        }, {
          gt: 50,
          lte: 100,
          color: '#76becc'
        }, {
          gt: 100,
          lte: 150,
          color: '#ff9933'
        }, {
          gt: 150,
          lte: 200,
          color: '#cc0033'
        }, {
          gt: 200,
          lte: 300,
          color: '#aa2116'
        }, {
          gt: 300,
          color: '#72231a'
        }],
        outOfRange: {
          color: '#ffffff'
        },
        textStyle: {
          color:"#000000"
        }
      },
      series: {
        name: null,
        type: 'line',
        data: null,
        markLine: {
          silent: true,
          lineStyle: {
            color: '#333'
          },
          data: [{
            yAxis: 50
          }, {
            yAxis: 100
          }, {
            yAxis: 150
          }, {
            yAxis: 200
          }, {
            yAxis: 300
          }]
        }
      }
    }
    return this;
    this.suggest = new suggestmode()
  }
  async initcityaqi(cityname ='南昌市') {
    let value = f(cityname);
    // console.log(value)
    this.data = await $.getJSON('static/json/cityAQI/' + value + '.json')
    // console.log(this.data)
    // console.log( cityname + '城市AQI走势图')
    this.option.title.text = cityname + 'AQI走势图'
    this.option.series.name = cityname + '- AQI'
    this.option.series.data = this.data.map(function (item) {
      return item[1];
    })
    this.option.xAxis.data = this.data.map(function (item) {
      return item[0];
    })
    this.myCharts.setOption(this.option);
    this.myCharts.on('click',(e)=>{
      let city = e.seriesName.split('-')[0]
      let date = this.data[e.dataIndex][0].split(' ')[0].replace('/','-')
      // console.log(date)
      this.suggest.initMode(city,date)
    })
  }
}
function f(cityName) {
  let city = ['南昌市','九江市','景德镇市','萍乡市','新余市','鹰潭市','赣州市','宜春市','上饶市','吉安市','抚州市']
  for (let i in city){
    if (cityName === city[i]){
      let j = Number(i) + 1
      return 'city_' + j
    }
  }

}
