const echarts = require('echarts')
const yuqing = ['2020年12月：九江萍钢钢铁有限公司安装了一套完整的烧结烟气脱硝装置，企业将生产过程中产生的所有气体，通过层层处理之后来到这个装置中，经过脱硝处理后，最终会通过红白相间的排口排出。这样一来不仅使企业产生的气体能达到国家标准排放，同时还能实现超低排放。',
  '无相关政策发布',
  '2020年10月：江西龙南开展禁捕退捕斩断市场销售产业链专项行动 #长江十年禁渔#\n' +
  '2020年9月为落实长江流域重点水域常态化禁捕政策，进一步养护水生生物资源，保护水域生态环境，近日，江西省龙南市市场监管局在全市范围内开展禁捕退捕斩断市场销售产业链专项行动',
  '无相关政策发布',
  '2020年7月：全面落实“党政同责、一岗双责”责任制，压紧压实党委、政府及相关部门环保责任。建立并推行企业生态环境保护公开承诺制，落实企业排污主体责任。健全公众参与制度，引导公众依法有序参与生态环境保护。完善生态环境保护委员会体制机制，构建党委领导、政府主导、部门协同、企业主体、社会参与的生态环境保护大格局。',
  '无相关政策发布',
  '2020年5月：大力宣传习近平生态文明思想，培育弘扬生态文化，提高全民生态环境保护意识。完善生态环境信息公开制度，健全新闻发布制度，在新闻媒体开设专栏，加大正面典型宣传，及时曝光反面案例和突出生态环境问题。完善生态环境信访工作机制，充分发挥“12369”环保热线作用，对举报恶意偷排偷放违法行为有功人员实行重奖制度。',
  '无相关政策发布',
  '2020年3月：建设一批环保科技创新服务平台、环保产业技术创新基地和环保科技成果转化示范基地，大力推进污染防治适用技术研发和推广应用。充分发挥技术标准的强制和引领作用，加快编制修订一批急需的地方生态环境保护标准和适用的污染防治技术指南。充分运用在线监控、遥感技术、大数据、人工智能等现代科技手段提升环境保护监管水平。',
  '无相关政策发布',
  '2020年1月：实施省级生态环境保护督察制度，落实中央和省委、省政府生态环境保护决策部署，解决突出生态环境问题。在每届省委会任期内，对各设区市党委和政府、省直有关部门以及省属有关国有企业等开展一次例行督察，并根据需要对整改情况实施“回头看”。针对突出问题，适时开展专项督察。强化日常监督，实行派驻监察制度',
  '无相关政策发布',
  '2019年11月：健全生态环境保护评价考核制度，对生态环境状况和各级党委、政府及有关部门生态环境保护履职情况进行考核。强化考核结果运用，考核结果作为领导班子和领导干部综合考核评价、奖惩任免的重要依据。严格责任追究，对不履行或者不正确履行生态环境保护职责造成不良影响和后果的，移送纪委监委和组织人事部门依纪依法严肃问责、终身追究',
  '无相关政策发布',
  '2019年9月：全面完成污染源普查，摸清全省生态环境“家底”。加强生态环境监测工作，提高监测质量。与生态环境部环境规划院建立战略合作关系，高质量编制江西省“十四五”生态环境保护规划。制定区域、流域、行业、企业分类监管办法与目录，根据污染轻重采取不同的监管措施。以普查结果、准确数据、科学规划、分类监管推进精准治污。',
  '无相关政策发布',
  '2019年7月：《意见》提出，要强化燃煤、工业、城市、农业、交通等大气污染治理，到2020年全省细微颗粒物（PM2.5）年平均浓度比2015年下降15%，达到38微克/立方米以下，设区城市空气质量优良天数比率达到92.8%以上。与2015年相比，二氧化硫排放量减少12%以上，氮氧化物排放量减少12%以上，化学需氧量排放量减少4.3%以上，氨氮排放量减少3.8%以上。',
  '无相关政策发布',
  '无相关政策发布',
  '无相关政策发布',
  '无相关政策发布',
  '无相关政策发布',
  '无相关政策发布',
  '无相关政策发布',
  '2018年12月：严格依法履行职责，做到“法无授权不可为，法定职责必须为”，以法治方式、法治思维推进治污。建立与司法部门协调联动机制，加大生态环境违法行为行政责任、民事责任、刑事责任追究力度，大力推进生态环境损害赔偿制度和生态环境信用评价制度。加强执法规范化建设，严格执法程序，推行执法公示、全过程记录、重大执法决定法制审核等制度。',
  '无相关政策发布',
  '2018年10月：开展规范性文件清理，对与法律法规以及“放管服”精神不符、发布程序不规范的予以废止或修改完善。开展地方标准、技术导则、技术规范清理，对与国家有关规定不符或“环保要求过度”的予以废止或修改完善。开展强制监测项目和监测内容清理，对不符合国家政策要求或保护作用不大且加重企业负担的予以废止或修改完善。',
  '2018年9月：有下列行为之一的，由县级以上人民政府生态环境主管部门责令改正或者限制生产、停产整治，并处十万元以上一百万元以下的罚款；情节严重的，报经有批准权的人民政府批准，责令停业、关闭：\n' +
  '（一）未依法取得排污许可证排放大气污染物的；'];
const a = [[0, 0, 1], [0, 0, 0], [0, 1, 0], [1, 0, 2], [0, 0, 0], [0, 1, 2],
  [0, 0, 0], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2],
  [0, 1, 1], [1, 0, 0], [0, 1, 0], [1, 1, 2], [0, 1, 2], [0, 1, 2],
  [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0],
  [0, 0, 0], [0, 1, 2], [0, 0, 0], [0, 0, 1]];

function calender() {
  if(document.getElementById('pieDays') ===null)
    return
  const dom = document.getElementById("pieDays");
  const myChart = echarts.init(dom);
  const app = {};
  let option = null;
  const cellSize = [65, 45];
  const pieRadius = 18;

  function getVirtulData() {
    const date = +echarts.number.parseDate('2017-02-01');
    const end = +echarts.number.parseDate('2017-03-01');
    const dayTime = 3600 * 24 * 1000;
    const data = [];
    let i = 0;
    for (let time = date; time < end; time += dayTime) {
      data.push([
        echarts.format.formatTime('yyyy-MM-dd', time),
        Math.floor(Math.random() * 10000),
        i++,
      ]);
    }
    return data;
  }

  function getPieSeries(scatterData, chart) {
    return echarts.util.map(scatterData, function (item, index) {
      const center = chart.convertToPixel('calendar', item);
      return {
        id: item[2] + 'pie',
        type: 'pie',
        center: center,
        label: {
          normal: {
            formatter: '{c}',
            position: 'inside'
          }
        },
        radius: pieRadius,
        data: [
          {name: '政府', value: a[item[2]][0]},
          {name: '群众', value: a[item[2]][1]},
          {name: '企业', value: a[item[2]][2]},
        ]

      };
    });
  }


  function getPieSeriesUpdate(scatterData, chart) {
    return echarts.util.map(scatterData, function (item, index) {
      const center = chart.convertToPixel('calendar', item);
      return {
        id: index + 'pie',
        center: center,
      };
    });
  }

  const scatterData = getVirtulData();

  option = {
    color: ['#e9ec9c', '#408393', '#a3e3bd'],
    legend: {
      data: ['政府', '群众', '企业'],
      // bottom: 20,
      textStyle: {
        color: '#000000'
      },
      right:'0%',
      top:'90%'
    },
    // backgroundColor: '#ffffff',
    grid: {
      bottom: "0%",
    },
    calendar: {
      top: 'center',
      left: 'center',
      orient: 'vertical',
      cellSize: cellSize,
      yearLabel: {
        show: false,
        textStyle: {
          fontSize: 30
        }
      },
      monthLabel: {
        show: false
      },
      range: ['2017-02'],
      itemStyle: {
        normal: {
          color: '#ffffff',
          borderWidth: 3,
          borderColor: '#ffffff'
        }
      }
    },
    series: [{
      id: 'label',
      type: 'scatter',
      coordinateSystem: 'calendar',
      symbolSize: 1,
      label: {
        normal: {
          show: true,
          formatter: function (params) {
            return echarts.format.formatTime('dd', params.value[0]);
          },
          offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
          textStyle: {
            color: '#f6f4f4',
            fontSize: 14
          }
        }
      },
      data: scatterData
    }]
  };

  let pieInitialized;
  setTimeout(function () {
    pieInitialized = true;
    myChart.setOption({
      series: getPieSeries(scatterData, myChart)
    });
  }, 10);

  app.onresize = function () {
    if (pieInitialized) {
      myChart.setOption({
        series: getPieSeriesUpdate(scatterData, myChart)
      });
    }
  };
  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }

  myChart.on('click', function (params) {
    console.log(yuqing[params.seriesIndex - 1])
    document.getElementById('word').innerText = yuqing[params.seriesIndex - 1]
  })
}

export {
  calender
}
