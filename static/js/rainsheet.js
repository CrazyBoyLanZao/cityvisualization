import {time} from "echarts/lib/export";

const d3 = require('d3')
export default class rainsheet {
  constructor() {
    this.date = {
      formatEN: time => {
        return new Date(time.replace(/月/, '/').replace(/日/, '/'))
      },
      formatCN: time => {
        return [time.getMonth() + 1 + "月", time.getDate() + "日"].join("")
      },
      formatPoint: time => {
        return [time.getDate()]
      },
      resultformatEN: time => {
        return new Date(time.replace(/年/, '/').replace(/月/, '/').replace(/日/, '/'))
      },
      resultformatCN: time => {
        return [time.getFullYear() + "年", (time.getMonth() + 1) + "月"].join("")
      },
      resultformatPoint: time => {
        return [time.getFullYear() + "." + (time.getMonth() + 1)]
      },
      getDays: data => {
        let startTime = d3.min(data, d => this.date.formatEN(d['日期']).getTime())
        let endTime = d3.max(data, d => this.date.formatEN(d['日期']).getTime())
        let totalTimes = (endTime - startTime) / 864e5 + 1
        return {
          startTime,
          endTime,
          totalTimes
        }
      },
      getresultDay: data => {
        let startTime = d3.min(data, d => this.date.resultformatEN(d['日期']).getTime())
        let endTime = d3.max(data, d => this.date.resultformatEN(d['日期']).getTime())
        let totalTimes = (endTime - startTime) / 2592e6 + 1
        return {
          startTime,
          endTime,
          totalTimes
        }
      }
    }

    this.utils = {
      parseToInt: function (num) {
        return "" === num ? 0 : parseInt(num)
      }
    }
    return this;
  }

  initdarw() {
//日期统计和日期转换  //中文-月日转换成数字格式 例如'1月15日'转换成'2020/1/15'

    d3.csv('static/json/rainsheet/month.csv').then(data => {
      let allHieData = d3.nest().key(t => t["类型"]).map(data);
      let city = d3.nest().key(t => t["城市名"]).key(t => t["日期"]).map(allHieData["$1 "]);
      //晴雨表中间数据
      //画图数据，长度等于省级的数量
      let barometerDate = {};
      let mapData = [];//数据
      let xLabel = [];//标签
      let cityList = []; //地区省 清单
      barometerDate = this.date.getresultDay(data); //晴雨表数据

      // for (let i = 0; i < barometerDate.totalTimes; i++) {
      //   let time = 2592e6 * i;
      //   // console.log(barometerDate.startTime + time)
      //   let day = new Date(barometerDate.startTime + time);
      //   // console.log(barometerDate.startTime)
      //   xLabel.push(this.date.resultformatPoint(day))
      //   // console.log(day)
      // }
      xLabel = [['2019.9'], ['2019.10'], ['2019.11'], ['2019.12'], ['2020.1'], ['2020.2'], ['2020.3'], ['2020.4']]
      // console.log(xLabel)

      Object.keys(city).forEach(d => {
        let data = [];
        let incArr = [];
        // let incArr1 = [];
        let dayCN = ['2019年9月1日','2019年10月1日','2019年11月1日','2019年12月1日','2020年1月1日','2020年2月1日','2020年3月1日','2020年4月1日']
        for (let i = 0; i < 8; i++) {
          // let day = new Date(barometerDate.startTime + 2592e6 * i);
          // let dayCN = this.date.resultformatCN(day)

          let day = new Date(this.date.resultformatEN(dayCN[i]))
          // console.log(day)
          let dayData = city[d]['$' + dayCN[i]]
          // console.log(city[d])
          let inc = dayData ? this.utils.parseToInt(dayData[0]['AQI']) : 0;
          let inc1 = dayData ? this.utils.parseToInt(dayData[0]['排名'])/5 : 0;
          let inc2 = dayData ? dayData[0]['AQI'] : 0;
          let change = inc;
          let change1 = inc1
          let change2 = inc2
          incArr.push(inc)
          // incArr1.push(inc1)
          data.push({
            day,
            inc,
            inc1,
            inc2,
            change,
            change1,
            change2
          })
        }
        d.slice(1) !== '0' && cityList.push(d.slice(1))
        d.slice(1) !== '0' && mapData.push({
          data,
          city: d.slice(1),
          max: d3.max(incArr)
        });
      })
// console.log(data)
      //边距
      const margin = ({
        top: 30,
        right: 20,
        bottom: 180,
        left: 30
      })

      //矩形边长
      const rectHeight = 50;//大矩形一个单位长
      const padding = 20;//内置矩形边长
      const totalDays = barometerDate.totalTimes//总共的天数
      const width = rectHeight * totalDays;//大矩形长
      const height = (rectHeight + padding) * mapData.length;

      const color1 = 'rgb(17,198,11)';//0-50    绿
      const color2 = 'rgb(231,203,101)';//51-100     黄
      const color3 = 'rgb(238,148,40)';//101-150    橙
      const color4 = 'rgb(232,83,57)'; //151-200    红
      const color5 = 'rgb(107,46,206)'; //201--300      紫
      const color = 'rgb(108,33,4)';//300---              褐

      //规模，标签
      const x = d3.scaleBand()
        .domain(xLabel)
        .range([margin.left, width - margin.right])
        .paddingInner(0.1)
        .paddingOuter(0.2)

      const y = d3.scaleBand()
        .domain(mapData.map(d => d.city))
        .range([margin.top, height - margin.bottom])
        .paddingInner(0.2)

      let zLabel = [2019.9, 2019.10, 2019.11, 2019.12, 2020.1, 2020.2, 2020.3, 2020.4]
      const z = d3.scaleBand()
        .domain(zLabel)
        .range([margin.left, width - margin.right + 250])
        .paddingInner(0.1)
        .paddingOuter(0.2)

      //标刻线
      const r = d3.scaleLinear()
        .domain([1, d3.max(mapData.map(d => d.max))])
        .rangeRound([5 * 5, Math.pow(x.bandwidth(), 2)])

      //添加画布
      d3.select('#rainsheet').select('*').remove()
      const svg = d3.select('#rainsheet')
        .append('svg')
        .attr("width", document.getElementById('rainsheet').clientWidth)
        .attr("height", document.getElementById('rainsheet').clientHeight)
        .attr("viewBox", [0, 0, document.getElementById('rainsheet').clientWidth + margin.left + margin.right, document.getElementById('rainsheet').clientHeight + margin.top + margin.bottom])

      svg.append('g')
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y)
          .tickValues(mapData.map(d => d.city))
          .tickSize(0))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll("text").style("font-size", "14").style("font-weight", 'bold'))

      //标签时间轴
      svg.append('g')
        .attr("transform", `translate(0,${margin.top})`)
        .call(d3.axisTop(z).tickSize(5))
        // .call(g => g.select(".domain").remove())
        .call(g => g.selectAll("text").style("font-size", "14"))

      let prov = svg.append('g')
        .selectAll('g')
        .data(mapData)
        .join('g')
        .attr('class', 'prov')

      prov.each(function (d, i) {
        d3.select(this)
          .append('g')
          .selectAll('rect')
          .data(d => d.data)
          .join('rect')
          .attr('width', x.bandwidth())
          .attr('height', x.bandwidth())
          .attr('x', (t, n) => x(xLabel[n]) + 40 * n)
          .attr('y', y(cityList[i]))
          .attr('fill', '#eee')
          .attr("rx", 20)
          .attr("ry", 20)

        //上层
        d3.select(this)
          .append('g')
          .selectAll('rect')
          .data(d => {
            return d.data
          })
          .join('rect')
          .attr('width', t => {
            return t.inc1 === 0 ? 0 : Math.sqrt(r(t.inc1))
          })
          .attr('height', t => {
            return t.inc1 === 0 ? 0 : Math.sqrt(r(t.inc1))
          })
          .attr('x', (t, n) => {
            // console.log(t)
            return x(xLabel[n]) + 40 * n})
          .attr('y', y(cityList[i]))
          .attr('fill', t => t.change <= 50 ? color1 : (t.change > 50 && t.change <= 100 ? color2 : (t.change > 100 && t.change <= 150 ? color3 :
            (t.change > 150 && t.change <= 200 ? color4 : (t.change > 200 && t.change <= 300 ? color5 : color)))))
          .attr("transform", t => {
            let innerR = Math.sqrt(r(t.inc1))
            let outerR = x.bandwidth()
            return t.inc1 === 0 ? '' : `translate(${(outerR - innerR) / 2},${(outerR - innerR) / 2})`
          })
          .attr("rx", 15)
          .attr("ry", 15)
          .on('click',(e)=>{
            // console.log(e.day.getFullYear()+'年' +(e.day.getMonth() + 1)+ '月')
            // console.log(e)
            monthdraw(e.day.getFullYear()+'年' +(e.day.getMonth() + 1)+ '月')
          })
        d3.select(this)
          .append('g')
          .selectAll('text')
          .data(d => d.data)
          .join('text')
          .attr('x', (t, n) => x(xLabel[n]) + 40 * n)
          .attr('y', y(cityList[i]) + 10)
          .attr('dx', x.bandwidth() / 2)
          .attr('dy', y.bandwidth())
          .text(t => t.inc2)
          .attr('text-anchor', 'middle')
          .style("font-size", "15")

      })
    })
  }

}
function monthdraw(time){
  // console.log(time);
  d3.csv('static/json/rainsheet/'+ time +'.csv').then(data => {
    // console.log("数据:")
    console.log(data)
    let allHieData = d3.nest().key(t => t["类型"]).map(data);
    // console.log("数据：")
    // console.log(allHieData)
    // console.log(allHieData["$1"])
    let city = d3.nest().key(t => t["城市名"]).key(t => t["日期"]).map(allHieData["$1"]);
    // console.log("城市名:")
    // console.log(city)
    const rainSheet = new rainsheet()
    //晴雨表中间数据
    //画图数据，长度等于省级的数量
    let barometerDate = {};
    let mapData = [];//数据
    let xLabel = [];//标签
    let cityList = []; //地区省 清单
    barometerDate = rainSheet.date.getDays(data); //晴雨表数据
    // console.log(barometerDate)


    for (let i = 0; i < barometerDate.totalTimes; i++) {
      let day = new Date(barometerDate.startTime + 864e5 * i);
      xLabel.push(rainSheet.date.formatPoint(day))
    }
    // console.log(xLabel)

    Object.keys(city).forEach(d => {
      let data = [];
      // let preInc = 0;
      let incArr = [];
      // let incArr1 = []
      for (let i = 0; i < barometerDate.totalTimes; i++) {

        let day = new Date(barometerDate.startTime + 864e5 * i);
        let dayCN = rainSheet.date.formatCN(day)
        let dayData = city[d]['$' + dayCN]
        let inc = dayData ? rainSheet.utils.parseToInt(dayData[0]['AQI']) : 0;
        let inc1 = dayData ? rainSheet.utils.parseToInt(dayData[0]['排名'])/5 : 0;
        let inc2 = dayData ? dayData[0]['AQI'] : 0;
        let change = inc;
        let change1 = inc1
        let change2 = inc2
        incArr.push(inc)
        // preInc = inc
        data.push({
          day,
          inc,
          inc1,
          inc2,
          change,
          change1,
          change2
        })
      }
      d.slice(1) !== '0' && cityList.push(d.slice(1))
      d.slice(1) !== '0' && mapData.push({
        data,
        city: d.slice(1),
        max: d3.max(incArr)
      });
      // console.log(d.slice(1))
      // console.log(d3.max(incArr))
    })
    //边距
    const margin = ({
      top: 40,
      right: 0,
      bottom: 0,
      left: 15
    })

    //矩形边长
    const rectHeight = 22;//大矩形一个单位长
    const padding = 14;//内置矩形边长
    const totalDays = barometerDate.totalTimes//总共的天数
    const width = rectHeight * totalDays;//大矩形长
    const height = (rectHeight + padding) * mapData.length;

    const color1 = 'rgb(17,198,11)';//0-50    绿
    const color2 = 'rgb(231,203,101)';//51-100     黄
    const color3 = 'rgb(238,148,40)';//101-150    橙
    const color4 = 'rgb(232,83,57)'; //151-200    红
    const color5 = 'rgb(107,46,206)'; //201--300      紫
    const color = 'rgb(108,33,4)';//300---              褐

    //规模，标签
    const x = d3.scaleBand()
      .domain(xLabel)
      .range([margin.left, width - margin.right])
      .paddingInner(0.1)
      .paddingOuter(0.2)

    const y = d3.scaleBand()
      .domain(mapData.map(d => d.city))
      .range([margin.top, height - margin.bottom])
      .paddingInner(0.2)

    //标刻线
    const r = d3.scaleLinear()
      .domain([1, d3.max(mapData.map(d => d.max))])
      .rangeRound([5 * 5, Math.pow(x.bandwidth(), 2)])

    //添加画布
    d3.select('#rainsheet').select('*').remove()
    const svg = d3.select('#rainsheet')
      .append('svg')
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom])

    svg.append('g')
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y)
        .tickValues(mapData.map(d => d.city))
        .tickSize(0))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll("text").style("font-size", "14").style("font-weight", 'bold'))

    svg.append('g')
      .attr("transform", `translate(0,${margin.top})`)
      .call(d3.axisTop(x).tickSize(10))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll("text").style("font-size", "14"))

    let prov = svg.append('g')
      .selectAll('g')
      .data(mapData)
      .join('g')
      .attr('class', 'prov')

    prov.each(function (d, i) {
      d3.select(this)
        .append('g')
        .selectAll('rect')
        .data(d => d.data)
        .join('rect')
        .attr('width', x.bandwidth())
        .attr('height', x.bandwidth())
        .attr('x', (t, n) => x(xLabel[n]))
        .attr('y', y(cityList[i]))
        .attr('fill', '#eee')
        .attr("rx", 20)
        .attr("ry", 20)

      //上层
      d3.select(this)
        .append('g')
        .selectAll('rect')
        .data(d => d.data)
        .join('rect')
        .attr('width', t => {
          return t.inc1 === 0 ? 0 : Math.sqrt(r(t.inc1))
        })
        .attr('height', t => {
          return t.inc1 === 0 ? 0 : Math.sqrt(r(t.inc1))
        })
        .attr('x', (t, n) => x(xLabel[n]))
        .attr('y', y(cityList[i]))
        .attr('fill', t => t.change <= 50 ? color1 : (t.change > 50 && t.change <= 100 ? color2 : (t.change > 100 && t.change <= 150 ? color3 :
          (t.change > 150 && t.change <= 200 ? color4 : (t.change > 200 && t.change <= 300 ? color5 : color)))))
        .attr("transform", t => {
          let innerR = Math.sqrt(r(t.inc))
          let outerR = x.bandwidth()
          return t.inc1 === 0 ? '' : `translate(${(outerR - innerR) / 2},${(outerR - innerR) / 2})`
        })
        .attr("rx", 15)
        .attr("ry", 15)
        .on('click',()=>{
          rainSheet.initdarw()
        })

      d3.select(this)
        .append('g')
        .selectAll('text')
        .data(d => d.data)
        .join('text')
        .attr('x', (t, n) => x(xLabel[n]))
        .attr('y', y(cityList[i]))
        .attr('dx', x.bandwidth() / 2)
        .attr('dy', y.bandwidth())
        .text(t => t.inc2)
        .attr('text-anchor', 'middle')
        .style("font-size", "10")

    })
  })
}
