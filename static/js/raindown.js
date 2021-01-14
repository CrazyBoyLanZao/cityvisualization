import axios from "axios";
import {time} from "echarts/lib/export";

const echarts = require('echarts')
export default class raindown {
  constructor() {
    this.option = {
      title: {
        text: 'AQI降雨量关系图',
        left: '35%',
        align: 'right'
      },
      grid: {
        // bottom: 80
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          animation: false,
          label: {
            backgroundColor: '#505765'
          }
        }
      },
      legend: {
        data: ['AQI', '降雨量'],
        left: 10
      },
      dataZoom: [
        {
          show: true,
          realtime: true,
          start: 65,
          end: 85
        },
        {
          type: 'inside',
          realtime: true,
          start: 65,
          end: 85
        }
      ],
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisLine: {onZero: false},
          data: null
        }
      ],
      yAxis: [
        {
          name: 'AQI指数',
          type: 'value',
          // max: 500
        },
        {
          name: '降雨量(mm)',
          nameLocation: 'start',
          // max: 5,
          type: 'value',
          inverse: true
        }
      ],
      series: [
        {
          name: 'AQI',
          type: 'line',
          areaStyle: {},
          lineStyle: {
            width: 1
          },
          emphasis: {
            focus: 'series'
          },
          markArea: {
            silent: true,
            itemStyle: {
              opacity: 0.3
            },
            data: []
          },
          data: null
        },
        {
          name: '降雨量',
          type: 'line',
          yAxisIndex: 1,
          areaStyle: {},
          lineStyle: {
            width: 1
          },
          emphasis: {
            focus: 'series'
          },
          markArea: {
            silent: true,
            itemStyle: {
              opacity: 0.3
            },
            data: []
          },
          data: null
        }
      ]
    };
    this.Mycharts = echarts.init(document.getElementById('rainDown'))
    return this;
  }

  async initrainDown(cityname = '江西省') {
    let data = await $.getJSON('static/json/rainAQI/' + cityname + '.json')
    let raindata = data.map(a => a.Rain)
    let date = data.map(a => a.date)
    let AQIdata = data.map(a => a.AQI)
    this.option.xAxis[0].data = date
    this.option.series[0].data = AQIdata
    this.option.series[1].data = raindata
    this.option.title.text = cityname + 'AQI降雨量关系图'
    this.Mycharts.setOption(this.option, true)
  }

  async updateRain(cityname = '赣州市') {
    let data = await $.getJSON('static/json/rainAQI/' + cityname + '.json')
    let raindata = data.map(a => a.Rain)
    let date = data.map(a => a.date)
    let AQIdata = data.map(a => a.AQI)
    // console.log(AQIdata)
    this.option.xAxis[0].data = date
    this.option.series[0].data = AQIdata
    this.option.series[1].data = raindata
    this.option.title.text = cityname + 'AQI降雨量关系图'
    this.Mycharts.setOption(this.option, true)
  }

  rainEvent(maps, suggest) {
    this.Mycharts.on('click', (e) => {
      suggest.initMode(e.name).then(r => r)
      // console.log(e)
    })
    this.Mycharts.on('dblclick', (e) => {
      console.log(e)
    })
    this.Mycharts.on('datazoom', (e) => {
      let timedata = this.option.xAxis[0].data
      setTimeout(this.fillMaps, 800, maps, timedata, e)
    })
  }

  fillMaps(maps, timedata, e) {
    const starttime = timedata[Number.parseInt(e.start)];
    const endtime = timedata[Number.parseInt(e.end)];
    // console.log(starttime, endtime);
    maps.updatefillMap(starttime, endtime)
  }

  async updaterainplace(cityname = '庐山') {
    let data = await $.getJSON('static/json/rainAQI/' + cityname + '.json')
    let dataCI = await $.getJSON('static/json/confortable/' + cityname + '.json')
    // console.log(dataCI)

    let raindata = data.map(a => a.Rain)
    let dataCIHB = dataCI.map(a => a.CIHB)
    // console.log(dataCIHB)
    let date = data.map(a => a.date)
    // let AQIdata = data.map(a => a.AQI)
    // console.log(AQIdata)
    let option = $.extend(true, {}, this.option);
    option.xAxis.data = date
    // this.option.series[0].data = AQIdata
    option.series = [{
      name: '人体舒适指数',
      type: 'line',
      yAxisIndex: 0,
      areaStyle: {},
      lineStyle: {
        width: 1
      },
      emphasis: {
        focus: 'series'
      },
      markArea: {
        silent: true,
        itemStyle: {
          opacity: 0.3
        },
        data: []
      },
      data: dataCIHB
    }, {
      name: '降雨量',
      type: 'line',
      yAxisIndex: 1,
      areaStyle: {},
      lineStyle: {
        width: 1
      },
      emphasis: {
        focus: 'series'
      },
      markArea: {
        silent: true,
        itemStyle: {
          opacity: 0.3
        },
        data: []
      },
      data: raindata
    }]
    option.title.text = cityname + '降雨量图'
    option.title.left = '40%'
    option.yAxis = [
      {
        name: '人体舒适指数',
        type: 'value',
        // max: 500
      },
      {
        name: '降雨量(mm)',
        nameLocation: 'start',
        // max: 5,
        type: 'value',
        inverse: true
      }
    ],
      option.legend = {
        data: ['人体舒适指数', '降雨量'],
        left: 10
      }
    // console.log(option)
    this.Mycharts.setOption(option, true)
  }

  async updateelement(city, ele) {
    let data = await $.getJSON('static/json/elementAir/' + city + '.json')
    let dataAQI = await $.getJSON('static/json/rainAQI/' + city + '.json')
    let date = data.map(a => a.date)
    let eledata = data.map(a => a[ele])
    let AQI = dataAQI.map(a => a.AQI)
    console.log(eledata)
    console.log(AQI)
    let option = $.extend(true, {}, this.option);
    option.xAxis.data = date
    // this.option.series[0].data = AQIdata
    option.series = [{
      name: ele,
      type: 'line',
      yAxisIndex: 0,
      areaStyle: {},
      lineStyle: {
        width: 1
      },
      emphasis: {
        focus: 'series'
      },
      markArea: {
        silent: true,
        itemStyle: {
          opacity: 0.3
        },
        data: []
      },
      data: eledata
    }, {
      name: 'AQI',
      type: 'line',
      yAxisIndex: 1,
      areaStyle: {},
      lineStyle: {
        width: 1
      },
      emphasis: {
        focus: 'series'
      },
      markArea: {
        silent: true,
        itemStyle: {
          opacity: 0.3
        },
        data: []
      },
      data: AQI
    }]
    option.title.text = city + ele + '指数与AQI指数关系图'
    option.title.left = '40%'
    option.yAxis = [
      {
        name: ele,
        type: 'value',
        // max: 500
      },
      {
        name: 'AQI',
        nameLocation: 'start',
        // max: 5,
        type: 'value',
        inverse: true
      }
    ]
    option.legend = {
      data: [ele, 'AQI'],
      left: 10
    }
    // console.log(option)
    this.Mycharts.setOption(option, true)
  }
}
