import {extend} from "vue-router/src/util/misc";

const echarts = require('echarts')
export default class heatcalendar {
  constructor() {
    this.option = {
      title: {
        top: '5%',
        left: '10%',
        text: ''
      },
      tooltip: {},
      visualMap: {
        // min: 0,
        // max: 10000,
        calculable: true,
        type: 'piecewise',
        orient: 'horizontal',
        left: 'center',
        bottom: '5%',
        // calculable: true,
        inRange: {
          color: ['#f5dfa6', '#d40000']
        }
      },
      calendar: {
        top: '25%',
        left: '5%',
        right: '4%',
        bottom: '20%',
        cellSize: ['auto', 12],
        range: ['2019-09-01', '2020-4-13'],
        itemStyle: {
          borderWidth: 0.5
        },
        yearLabel: {show: false}
      },
      series: {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: null
      }
    };
    this.Mycharts = echarts.init(document.getElementById('heatmap'))
    // this.city = ' '
  }

  initheatmap(city = '上饶市', elm = 'SO2') {
    // window.city = city
    getdata(city, elm).then((r) => {
      // console.log(r)
      this.option.series.data = r
      this.option.title.text = city + elm + '2019年9月1日~2020年4月13日情况分布图'
      this.Mycharts.setOption(this.option)
    })
    // console.log(this.city)
  }

  heatmapevent(rain) {
    // window.city = this.city
    let option = this.option
    let MyCharts = this.Mycharts
    $("#pid").change(function () {
      const options = $("#pid");  //获取选中的项
      const value = options.val();   //拿到选中项的值
      let city = option.title.text.split('市')[0] + '市'

      getdata(city, value).then((r) => {
        // console.log(r)
        let da = r.map(d => {
          return d[1]
        })
        option.visualMap.max = Math.max.apply(null, da)
        option.series.data = r
        option.title.text = city + value + '2019年9月1日~2020年4月13日情况分布图'
        MyCharts.setOption(option)
      })
      rain.updateelement(city, value).then(r => r)
    });
  }

  // static addheatmap() {
  //
  //   getdata(this.city, elm).then((r) => {
  //     this.option.series.data = r
  //     this.option.title.text = city + elm + '情况分布图'
  //     this.Mycharts.setOption(this.option)
  //   })
  // }
}

async function getdata(city, elm) {
  let data = await $.getJSON('static/json/elementAir/' + city + '.json')
  return data.map(e => {
    return [echarts.format.formatTime('yyyy-MM-dd', e.date), Number.parseFloat(e[elm])]
  })
  // console.log(realdata)
}
