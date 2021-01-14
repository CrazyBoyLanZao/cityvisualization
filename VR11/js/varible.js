var container,
    camera,//相机
    scene,//场景
    renderer,//渲染器
    light;//灯光


var controller1,//手柄
    controller2,//手柄
    raycaster,//射线
    intersected = [],
    tempMatrix = new THREE.Matrix4();

var meau,//菜单组
    chart,//图表组
    travel;//旅游组


var time_day = 0,//天
    time_hour = 0,//小时
    timeTable ,//表
    zhen = 0,//帧
    speed = 0;//限制leap的刷新速度

var cityName = ['南昌','赣州','宜春','吉安','上饶','抚州','九江','景德镇','萍乡','新余','鹰潭'];
var cityJd = [115.8646,114.9405,114.4236,115.0005,117.9495,116.3645,116.0075,117.1846,113.8615,114.9235,117.0756];
var cityWd = [28.68946,25.83518,27.82086,27.11973,28.46063,27.95489,29.71134,29.27425,27.62839,27.82358,28.26579];

//旅游菜单
var travel_bg,//菜单背景
    travel_meau,
    travel_title,
    travel_scene,//环境
    travel_screen,//菜单屏幕
    travel_url_Index = 0,travel_name_Index = 0,//旅游当前的文件夹和名字的索引
    travel_next,travel_last,travel_back,travel_front,//旅游菜单栏四个按钮：右，左，上，下(组件)
    travel_next_mesh,travel_last_mesh,travel_back_mesh,travel_front_mesh,//四个菜单的交互块
    travel_scene_urls = [
        '庐山/','滕王阁/','古北水镇/','望江楼/','江湾/','玉溪/','赣州/'
    ],//旅游文件夹名字
    travel_scene_name = [
        [ 'lushan_riluo','nanchang_81guan','nanchang_qianfosi','nanchangtiantan','sanqingfengh','tengwangge'],
        [ '滕王阁', '绳金塔', '绳金塔二景', '秋水广场', '世纪广场', '青山湖' ],
        [ '南天门', '日月岛广场', '汤河古寨', '银笺桥', '英华桥' ],
        [ '枇杷门巷', '沈流雅筑', '望江楼夜景', '竹艺'],
        [ '百年邮局', '江湾', '江永纪念馆', '莲花池', '乡贤园','宗祠广场' ],
        [ '古柏阁', '红云殿', '帽天山2', '涌金寺', '玉溪' ],
        [ '浮桥', '俯瞰赣州', '万象城', '涌金门', '郁孤台' ]
    ],//旅游点的名字
    travel_scene_num = [
        6 , 6 , 5 , 4 , 6 , 5 , 5
    ];//旅游点个数
//旅游音频
var listener,audio,audioLoader;
//旅游介绍
var travel_intro,travel_introdus = [
    [ '暂无', '暂无', '暂无', '暂无', '暂无', '暂无' ],
    [ '暂无', '暂无', '暂无', '暂无', '暂无', '暂无' ],
    [
        '古北水镇南天门的对联：\n' +
    '上联：山自穹窿水自潺,\n' +
    '下联：扼吭朔塞此雄关。\n' +
    '穹窿：中间高而四周下垂的样子。\n' +
    '扼吭：意思是气逆于喉，自缢，喻控制要害部位。\n' +
    '“山自穹窿水自潺”大意是：山势高耸，流水潺潺。\n' +
    '“扼吭朔塞此雄关”大意是：南天门是是扼守北塞的重要关口。',
        '水光潋滟的元荡湖畔，与大观园风景区毗邻。整个度假村被湖水环抱，空气清新，环境幽雅。岛内园林绿化点缀出浓浓秀色。度假村地处江、浙、沪交界处，西南通往杭州、嘉兴；西北通往苏州、无锡。周围有古典名园大观园、福禄贝尔科幻乐园、民族文化村、水乡泽国周庄、江南古镇同里、松江佘山、高尔夫球场等名胜景区和娱乐场所，构成了日月岛为轴心的旅游网络，是组织旅游观光的极好中转站。',
        '古寨历史悠久，从定居宅户距今有四百多年，现有一万多人（包括自然村） ，是个大村庄；古寨村西面包含：后环、沟头、大园村，南面包含：青南溪、青南溪场、南新村、大埔村及水城村等五个自然村（移民村）；古寨村姓氏较多，古时有：“古寨十八姓，龙潭十八乡”的说法，如今古寨的姓氏有：谢、郑、吴、高、钟、林、胡、（邓、曾、罗、余、为自然村姓氏）等；其中谢、郑、吴、为村中三大姓氏，人数占总人口一半以上；古寨水资源丰富，西北面，有两座水电站：巷口水电站（距离三公里，属市级）和龙潭水电站（距离五公里，属省级），两座水库都是根据自然地理环境修建而成，所以景色更加宜人， ­是游玩的旅游胜地。 ­',
        '古北水镇背靠中国最美、最险的司马台长城，是独具北方风情的小镇。漫步在古北水镇，感受小桥流水的诗情画意，让人仿佛置身于江南水乡。在这里，形态各异的古桥赋予了古北水镇古朴的美，增添了浓厚的人文气息。英华桥、佛爷桥、银笺桥……每过一座桥，都是一处风景',
        '古北水镇背靠中国最美、最险的司马台长城，是独具北方风情的小镇。漫步在古北水镇，感受小桥流水的诗情画意，让人仿佛置身于江南水乡。在这里，形态各异的古桥赋予了古北水镇古朴的美，增添了浓厚的人文气息。英华桥、佛爷桥、银笺桥……每过一座桥，都是一处风景' ],
    [
        '枇杷门巷，意思是妓女居住的地方。出自唐·王建《寄蜀中薛涛校书》。',
        '建筑风格指建筑设计中在内容和外貌方面所反映的特征，主要在于建筑的平面布局、形态构成、艺术处理和手法运用等方面所显示的独创和完美的意境。建筑风格因受时代的政治、社会、经济、建筑材料和建筑技术等的制约以及建筑设计思想、观点和艺术素养等的影响而有所不同。如外国建筑史中古希腊、古罗马有多立克、爱奥尼克和科林斯等代表性建筑柱式风格；中古时代有哥特建筑的建筑风格；文艺复兴后期有运用矫揉奇异手法的巴洛克和纤巧烦琐的洛可可等建筑风格。我国古代宫殿建筑，其平面严谨对称，主次分明，砖墙木梁架结构，飞檐、斗栱、藻井和雕梁画栋等形成中国特有的建筑风格。',
        '望江楼夜景，美丽商洛，我们所有商洛人的骄傲。\n' +
        '岁月无限好，只是近黄昏。\n' +
        '夜晚徒步公园河畔，感慨良多，内心情怀，无法用语言言表。',
        '经过代代能工巧匠的探索实践，富于地方特色的竹艺形式日臻完善，竹艺名家辈出，并形成几大流派。其中梁平的竹帘画、自贡的龚扇、崇庆的瓷胎竹编和江安的竹簧雕刻、竹镶嵌等都是颇享盛誉的江西竹艺'
    ],
    [
        '百年邮局\n' +
        '      百年邮局：建于清光绪间，始称江湾民信柜，邮寄信件。宣统三年(1911)改邮信代办所。 民国九年（1320年）升二等邮局，婺源与屯溪双方邮袋在此交换。\n' +
        '\n' +
        '      Built in the reign of only known as jiangwan cabinets, mail letters.Emperor Xuantong three years (1911) to post the letter Agency, Republic of (9) l second-class post office, Wuyuan pouch this exchange with both tunxi. \n' +
        '\n',
        '江湾村与景区\n' +
        '      江湾，千年古镇，位于江西省婺源县，是萧江氏族聚居村落。自古钟灵毓秀，文风炽盛，先后走出了明代抗倭名将江一麟、宫廷太医江一道、清代朴学大师江永、近代教育家江谦等38名进士官宦和21位文人学士；留下传世著作94部，其中16部选入《四库全书》。 \n' +
        '\n' +
        '      江湾北依后龙山，山上林木葱郁；南环梨园河，清流蜿蜒西去，历史上曾是郡县古道上的商业重镇。至今尚存的御史府、中宪第等明清官邸，滕家老屋、培心堂等徽派商宅，以及东和、南关、西安、北钥四座古门亭和滕家巷、添丁巷、明代剑泉井等建筑，依然透着历史的厚重和岁月的遗韵。 \n' +
        '\n' +
        '      Jiangwan, the Millennium town, is located in Wuyuan County, Jiangxi province. It is a village of Xiao Jiang clan. Since ancient times, Zhong Lingyuxiu and his literary style have been flourishing. He has stepped out of the Ming Dynasty\'s famous anti-Japanese generals Jiang Yilin, the court Taiyi Jiang, the Qing Dynasty\'s master Jiang Yong, the modern educator Jiang Qian and other 38 scholars and eunuchs and 21 scholars. He has left 94 handed down works, 16 of which were selected into the Four Kuquan Books.\n' +
        '\n' +
        '      The north of the Bay lies in Houlong Mountain, with lush forests on the hills, and the south is surrounded by Liyuan River, with clear currents winding westward. Historically, it was a commercial town on the ancient roads of counties and counties. The remaining official residences of Ming and Qing dynasties, such as Royal Shifu and Zhongxian, the old houses of Tengjia and Peixintang, as well as the four ancient gate pavilions of Donghe, Nanguan, Xi\'an and Beiyi, and the buildings of Tengjiaxiang, Tianding Lane and Jianquan Well in Ming Dynasty still reflect the heavy history and the lingering charm of the years.',
        '江永纪念馆\n' +
        '      江永纪念馆：江永（1681——1762）字慎修，号慎斋，清代经学家、音韵学家，皖派经学创始人，一生蛰居乡里，以教书为业，著有大量治学必读著作。江永纪念馆为民居加私塾式的徽派建筑，建于清代末期。\n' +
        '\n' +
        '      Jiangyong Memorial ：Jiang Yong ( 1681 -- 1762) word Shen, Shen Qing Dynasty repaired, vegetarian, scribes, phonologists, Wan school by school founder, in the village life, working as a teacher, with a great number of studies required works. Jiangyong Memorial residences with private school in Hui style architecture, was built in the late Qing dynasty. ',
        '莲花池\n' +
        '      莲花池，又称龙池。龙池是江湾的风水穴位之一，它构成江湾“江”字形水系最下面的一点。荷花池景色宜人，池上有桥，桥墩上有阁，桥下有鱼。每当仲夏，池中荷花争开竞放，令你心旷神怡。\n' +
        '\n' +
        '      Lotus Pond, also known as Longchi .Longchi is one of the jiangwan feng shui acupuncture points, it constitutes a jiangwan "river" glyph drainage at the bottom of a little. Lotus pond scenery delightful, on the pool have bridge, bridge pier on the pavilion, under the bridge have fish. When midsummer, lotus pool for those open, make you relaxed and happy. \n' +
        '\n',
        '乡贤园\n' +
        '      乡贤园在江湾古代园林“后桃园”基础上扩建而成，有廊、舫、阁、汇贤湖、文笔塔、观鱼台，名人名树观赏区，乡土花木观赏园和历代名人石雕群，种植各类名贵树木花草达四十多种。\n' +
        '\n' +
        '      The Country Squires Park, which is a typical imitation Huizhou garden. The park the Tinglang Shuixie who spent Qimu. The Country Squires Park, in the Jiangwan ancient garden " Taoyuan " on the basis of the expansion and become, have Gallery, Fang, pavilion, Yin Department of lake view, style tower, Yutai, celebrity name tree viewing areas, native plants and ornamental garden and the famous ancient stone carvings, planting various kinds of rare flowers and trees up to 40.Walk the patina of pleasant corridor between the cicadas, Lam, green, water gurgling, Furura Kazuho, it is simple and quiet, leisurely and carefree, feelings of nostalgia, arise spontaneously ... ... This is the celebrity name tree viewing area. \n' +
        '\n',
        '宗祠广场\n' +
        '      江湾宗祠广场，是村民主要活动的集聚地，也是景区日常活动的主要室外场所。节庆文艺表演、传统民间民俗表演、秋收运动会等一系列活动在这里精彩呈现，游客不仅可以享受丰富的视觉文化大餐，而且可以现场参与体验。\n' +
        '\n' +
        '      Jiangwan ancestral temple square is not only the gathering place for important activities of village democracy, but also the main outdoor place for daily activities in scenic spots. Festival performances, traditional folk performances, Autumn Harvest Games and other activities are presented here. Tourists can not only enjoy a rich visual and cultural feast, but also participate in the experience on site.'
    ],
    [
        '一提起“滕王阁”，人们很自然地想起王勃写的《滕王阁序》。雄踞赣水之滨的“滕王阁”，因“序”而名扬天下，声威古今。其实“滕王阁”不止江西南昌有，四川阆中也有一座“滕王阁”，而这两处的“滕王阁”都渊源于山东滕州。为何在中华大地上会出现一字不差的两座飞檐翘翘，金碧辉煌的建筑群呢？赣、蜀“滕王阁”之名源于古滕，为何两座“滕王阁”历经千余载的风风雨雨流传至今，而李元婴的原始诏封地古滕国（今山东滕州）多少年来却鲜为人知呢？主要是因为，南昌、阆中“滕王阁”皆成名于诗文。滕王阁因滕王而建，滕王源于滕州。据《旧唐书》记载：“贞观十三年丙申六月，皇弟元婴封滕王”。\n' +
        '滕始于黄帝，因境内泉水"腾涌"而得名，公元1182年金置滕阳州，1184年改为滕州，这是”滕州“名字最早的起源，距今已经走过833年的历史沧桑。贞观年间，唐高祖李渊之子、唐太宗李世民之弟李元婴曾被封于滕州故为滕王，且于滕州筑一阁楼名以“滕王阁”（已被毁），后滕王李元婴调任江南洪州（今江西南昌），因思念故地滕州修筑了著名的“滕王阁”，此阁因王勃一首“滕王阁序”为后人熟知，成为永世的经典。',
        '通海秀山是云南省四大名山之一，有着“秀甲滇南”的美名。位于在云南玉溪通海县城南隅，山顶海拔高度2060米，管辖区总面积7.6平方米公里。繁茂的树木把这座山遮盖得绿意盎然。秀山不但有山河之秀美，更有各代墨客骚人、专家学者名宦之咏颂，使其变成“匾山联海”和碑林发烧友的人间天堂。迄今保存在这里的匾联碑刻现有200余副，书法艺术均属鸿篇巨制，使秀山变成知名的历史湿地公园。登秀山，近观翠林萋萋凉台、普光寺、土主庙、毓秀坊、白龙寺、玉皇阁、红云殿、清爽台、涌金禅寺、万寿宫、斗天阁等。',
        '2011年1月云南玉溪澄江帽天山动物群申报世界文化和自然遗产。\n' +
        '2001年3月，这里建成了帽天山国家地质公园，公园里有寒武纪化石保护区，保护区面积18平方公里，其中，核心区1.2平方公里。这里也是磷矿富集地，受经济利益的驱动，保护区被破坏得很严重。\n' +
        '1984年7月1日，中国科学院南京地质古生物研究所研究员侯先光在澄江县帽天山发现了“纳罗虫”化石，向人类揭示沉睡了5.3亿年的寒武纪早期世界，中国、云南、玉溪、澄江和帽天山，从此闻名世界。',
        '涌金寺位于云南佛教四小名山之一的通海秀山。西汉时期即有僧人于山顶结庐而居。至宋朝理宗嘉熙年间(公元1237--1240)，有高僧于秀山山颠，独坐繁星下，生草为座，入甚深禅定。定中现观五朵金莲从地涌出，金光灿然，照彻大千世界。因瑞象暗含五方佛之佛教玄义，高僧当即以锡杖划地为记，于此处兴建梵刹，刹名涌金。又于建寺时掘地得金若干，以充建寺之资。此一瑞象，实为佛菩萨的加持护佑。故涌金寺能于千年当中，一直名震滇中。鼎盛时期僧人达数百人之众。 寺院初始以华严为宗，弘化一方，为云南华严宗祖庭之一。其后则以禅宗五派，临济、曹洞、云门、沩仰、法眼交替住持弘化。 寺院建筑坐南朝北，为倒风水格式。一反坐北朝南的风水常规，实属罕见。此一独特风水布置，祖师既有依山而为的方便，尚有不为人所易知的甚深密意，所谓佛陀法轮常转，因机设教，应病以药。诸佛菩萨能以菩萨正法轮化人，亦能以忿怒威猛的教令轮化人，上天入地种种手段莫不是一片悲心慈航！',
        '玉溪是聂耳故乡、云烟之乡、花灯之乡和高原水乡，位于滇中腹地，是连接省外和南亚、东南亚的重要交通枢纽，为云南重要的产铜地区。   境内有帽天山古生物文化、古滇文化、高原水乡文化和哀牢山一红河谷民族风情文化，主要旅游景区（点）有4A级旅游景区4个，3A级旅游景区2个，2A级旅游景区11个。 \n' +
        '截至2016年，玉溪辖2区、7县，市委、市政府驻红塔区。 2017年，全市常住人口为238.1万人，城镇化水平50.8%，完成生产总值1415.1亿元，城镇常住居民人均可支配收入34880元，农村常住居民人均可支配收入13057元。2018年重新确认国家卫生城市（区）。'
    ],
    [
        '浮桥，指用船或浮箱代替桥墩，浮在水面的桥梁。军队采用制式器材拼组的军用浮桥，则称舟桥。浮桥的历史记载以中国为早。《诗经·大雅·大明》记载：“亲迎于渭，造舟为梁”，记载周文王姬昌于公元前1184年在渭河架浮桥。在国外，波斯帝国居鲁士大帝于公元前537年在美索不达米亚修建过浮桥。\n',
        '赣州，简称“虔”，别称“虔城”，也称“赣南”，是江西省的南大门，是江西省面积最大、人口最多的设区市。赣州地处亚热带季风气候区，地形以山地、丘陵、盆地为主，总面积39379.64平方千米，下辖3个市辖区、13个县、2个县级市、2个功能区，2019年户籍人口为983.07万人。\n' +
        '赣州是江西省省域副中心城市、中国百强城市、国家区域中心城市、国家Ⅱ型大城市、“一带一路”重要节点城市、全国性综合交通枢纽、赣粤闽湘四省通衢的区域性现代化中心城市，拥有4个国家级开发区和1个综合保税区。赣州钨与稀土资源丰富，是全国稀有金属产业基地和先进制造业基地。赣州是全国著名的革命老区、原中央苏区振兴发展示范区、红色文化传承创新区。赣州都市区是江西省重点培育和发展的都市区。 \n' +
        '赣州是国家历史文化名城、全国文明城市、国家森林城市、国家园林城市、中国优秀旅游城市、全国双拥模范城市、原中央苏区所在地、万里长征的起点城市，文天祥、周敦颐、海瑞、王守仁、辛弃疾和中共第一代核心领导人皆在赣州主政过。赣州是中国魅力城市之一，有着千里赣江第一城、江南宋城、红色故都、客家摇篮、世界橙乡、世界钨都、稀土王国和世界风水堪舆文化发源地等美誉。',
        '万象城力推“一站式”消费和“体验式”购物，包罗万象，应有尽有，为消费者带来全新的消费概念和生活体验。万象城所到之处，都将推动城市的商业发展乃至改变城市的商业格局。万象城现已成为众多国际国内著名品牌进一步拓展中国市场的首选之地和优良载体。\n' +
        'HOPSCA——集酒店(Hotel)、写字楼(Office)、生态公园(Park)、购物中心(Shopping)、会所(Convention)、城市超级寓所 (Apartment)为一体的多功能、现代化、综合性城市多维空间，世界上最先进的地产开发模式，也是万象城的组成模式。都市综合体，将之前分割零散的不同建筑在此有机重组，并赋予它们新的意义；对每个怀有理想的城市而言，它是“从城市进化到都市”的必需品，成功的城市综合体，将成为城市的象征和图腾。巴黎拉·德方斯广场如此，纽约洛克菲勒中心如此，东京六本木新城如此，日益蓬勃兴盛的万象城MIXC亦如此。它们浓缩着时代的记忆，它们与城市融为一体，共同前进。',
        '涌金门为古代赣州西城门之一。五代天福元年，吴越王钱元瓘引西湖水入城，在此开凿涌金池，筑此门，门濒湖，东侧有水门。传说为西湖中金牛涌现之地，因而得名。南宋绍兴二十八年，增筑城垣，改称丰豫门。明初，仍复旧名。涌金门历来是从杭州城里到西湖游览的通道，为市区繁华地段，城门楼上有楹联曰：“长堞接清波看水天一色；高楼 闹市烟火万家。”西湖游船多在此处聚散，故有“涌金门外划船儿”之谚。清康熙四十年，康熙南来杭，从城内河道出涌金水门游西湖。民国二年杭州开始拆城，继拆除“旗营”之后，涌金、清波、钱塘三门间城墙均拆除改建为南山路、湖滨路。从此西湖与市区连接。为使后人明了城池变迁，于故址立碑志。',
        '孤台位于赣州城区西北部贺兰山（别名：田螺岭）顶，海拔131米，是城区的制高点，赣州宋代古城墙自台下逶迤而过，属市级文物保护单位，1985年12月列为第一批省级重点风景名胜区点。\n' +
        '郁孤台建在赣州市区北部的贺兰山顶，始建于唐代，因树木葱郁，山势孤独而得名。李渤、苏东坡、辛弃疾、岳飞、文天祥、王阳明、郭沫若等历代名人都曾在这里留下过诗词。其中，与郁孤台渊源最深的，要数南宋著名词人辛弃疾，他在赣州任职时，留下名词《菩萨蛮·书江西造口壁》，郁孤台从此名扬天下。郁孤台一楼正厅置江泽民同志亲书《菩萨蛮》。郁孤台是赣州老城区的制高点，台上建有3层高的仿木结构楼阁，为省级重点风景名胜区。登上郁孤台，可远眺秀丽的山光水色和赣州全景。郁孤台的始建年代已经无法考证了，唐代时虔州刺史李勉曾登台北望，将台更名为“望阙”。宋绍兴十七年赣州知州曾慥增创二台：南边叫“郁孤台”，北边叫做“望阙台”，后几经兴废，仍名郁孤台。1983年按清代同治年式样重建。台有3层，高17米，占地面积300平方米。游人登上郁孤台，可远眺市区全景。'
    ]
];

//灾害复现菜单
var damage_bg,
    damage_meau,
    damage_title,
    damage_Index=0,
    damage_next,damage_last,
    damage_next_mesh,damage_last_mesh,
    damage_name = [
        '洪水','地震','龙卷'
    ],//灾害复现场景名字
    damage_screen_mesh,damage_screen;
//晴雨表
var barometer,
    barometer_bg,
    barometer_title,
    barometer_table,
    barometer_next,barometer_last,//左右按钮，增减天数
    barometer_next_mesh,barometer_last_mesh,//左右按钮的交互快块
    barometer_sliderBall,barometer_sliderBar,//滑动球和滑动条
    barometer_sliderBall_mesh,barometer_sliderBar_mesh,//滑动球和滑动条的交互块
    barometer_data_p;//移动方块位置的组
    barometer_data = new Array(11*24);//晴雨表的方块
//降雨量柱状图
var Bar,
    Bar_map,
    Bar_title,
    Bar_Pointsdata = new Array(61),
    Bar_Bardata = new Array(11),
    Bar_PointsData_title = new Array(61),
    Bar_Bardata_title = new Array(11),
    Bar_Barpx = [30.318, -65.719, -111.539, -115.957, 309.608, 107.923, -16.435, 224.293,-266.726, -133.079, 203.335],
    Bar_Barpz = [-264.965, 232.353, -217.004, 12.250, -221.304, -44.881, -370.763, -346.333,-61.148, -124.721, -177.930],
    Bar_Pointspx = [-54.3466,-49.9767,9.404,-201.2354,-183.1292,-163.8563,-176.6634,-112.721,-65.4279,-102.4102,147.4694,272.9329,301.1989,354.6376,289.0801,-142.3506,-104.609,-146.7909,-119.7912,-80.9961,97.7246,-4.6006,37.2255,61.6396,1.5688,34.7855,67.8229,44.7364,34.3652,159.9971,161.9007,105.1745,97.7449,-42.7918,-193.0241,-114.7029,-194.8751,-48.9514,222.7763,214.5374,221.8743,248.1034,224.6268,-265.9017,-278.4473,-248.9802,-234.5826,196.8692,175.2005,213.0381,201.2448,237.2455,-186.0578,-75.278,5.5314,96.0261,124.4198,-207.5398,-121.018,-26.2499,32.0085],
    Bar_Pointspz = [-195.1312,-147.5643,-130.0998,-139.4314,-88.876,-163.6542,-207.6154,-191.1158,-251.5929,-158.1533,-261.4301,-217.3377,-337.4984,-198.3985,-139.5491,-123.573,-117.7382,-77.755,-96.273,-97.9598,-195.8059,-259.217,-272.0025,-285.8389,-224.0345,-237.1245,-240.7073,-200.9029,-56.1826,-11.2244,-79.5082,-134.722,51.1201,-60.9455,-6.6075,22.9282,125.7777,49.811,-420.9742,-285.5353,-377.832,-389.6261,-329.0804,-90.054,-55.6971,-9.5434,-71.576,-204.3295,-173.4109,-172.5282,-147.7344,-136.2788,-304.8298,-358.9321,-305.5508,-331.5216,-421.8023,214.0826,372.7856,289.2705,109.362];
//气象动态球图
var dynamicBall,
    dynamicBall_data = new Array(11),
    dynamicBall_data_title = new Array(11),
    px, py, pz,
    xAixs,yAixs,zAixs,
    xAixs_title,yAixs_title,zAixs_title;
var intro_txt='model/scene/'+travel_scene_urls[travel_url_Index]+travel_scene_name[travel_url_Index][travel_name_Index]+'.txt'


//天气模拟菜单
var weather_meau,
    rains,snows,winds,
    raintext,snowtext,windtext,
    weather_bg,weather_rain,weather_snow,weather_wind,
    weather_rain_mesh,weather_snow_mesh,weather_wind_mesh;











