export type PortfolioCategory = 'visual' | 'web' | 'photo' | 'marketing'

export interface PortfolioItem {
  id: number
  title: string
  client: string
  year: string
  description: string
  thumbnail: string
  images: string[]
  external_site_url?: string
}

export interface SiteData {
  brand: { name: string; slogan: string; description: string }
  contact: { title: string; description: string; email: string; phone: string; address: string }
  social: { name: string; url: string }[]
  gallery: Record<PortfolioCategory, PortfolioItem[]>
  featuredIds: Record<PortfolioCategory, number[]>
  packages: {
    label: string
    title: string
    description: string
    items: {
      name: string
      subtitle: string
      description: string
      features: string[]
      highlight: boolean
    }[]
  }
  cta: { title: string; description: string; buttonText: string; buttonLink: string; subText: string }
}

export const siteData: SiteData = {
  brand: {
    name: 'NEWDIA',
    slogan: 'Framing Ideas into Impact',
    description: '아이디어를 임팩트로 전환하는 종합 디자인 컴퍼니',
  },
  contact: {
    title: "Let's Work Together",
    description: '새로운 프로젝트에 대해 이야기해 보세요',
    email: 'newdia@kakao.com',
    phone: '+82 10 8528 1799',
    address: '서울 성동구 왕십리로 지하 300 스파크플러스',
  },
  social: [
    { name: 'Instagram', url: 'https://www.instagram.com/newdia2015/' },
    { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61586329989031&locale=ko_KR' },
    { name: 'Linkedin', url: 'https://www.linkedin.com/in/%EC%A4%80%ED%9D%AC-%EC%A1%B0-9aa891274/' },
  ],
  gallery: {
    visual: [
      { id: 1, title: 'HANDOL PUMPS CI', client: 'HANDOL PUMPS', year: '2025', description: '한돌펌프 기업 아이덴티티 디자인. 로고, 컬러시스템, 다양한 어플리케이션 등 한돌펌프의 시각적 요소를 개발 하였습니다.', thumbnail: 'http://newdia.co.kr/images/uploads/visual/1768279295538-260113_VB_BR-01.jpg', images: ['http://newdia.co.kr/images/uploads/visual/1768279328879-260113_VB_BR-02.jpg','http://newdia.co.kr/images/uploads/visual/1768279337697-260113_VB_BR-03.jpg','http://newdia.co.kr/images/uploads/visual/1768279352684-260113_VB_BR-04.jpg','http://newdia.co.kr/images/uploads/visual/1768279360475-260113_VB_BR-05.jpg','http://newdia.co.kr/images/uploads/visual/1768279371810-260113_VB_BR-06.jpg','http://newdia.co.kr/images/uploads/visual/1768279381941-260113_VB_BR-07.jpg'] },
      { id: 2, title: 'LINK & LEAVE CI', client: 'LINK & LEAVE', year: '2025', description: 'LINK & LEAVE 기업 아이덴티티 디자인. 로고, 컬러시스템, 그래픽모티브 등 LINK & LEAVE의 시각적 요소를 개발 하였습니다.', thumbnail: 'http://newdia.co.kr/images/uploads/visual/1768279401405-260113_VB_BR-08.jpg', images: ['http://newdia.co.kr/images/uploads/visual/1768279412348-260113_VB_BR-09.jpg','http://newdia.co.kr/images/uploads/visual/1768279419750-260113_VB_BR-12.jpg','http://newdia.co.kr/images/uploads/visual/1768279430199-260113_VB_BR-10.jpg','http://newdia.co.kr/images/uploads/visual/1768279439424-260113_VB_BR-11.jpg'] },
      { id: 3, title: 'DR.ROHJI BI', client: '인핸스비(주)', year: '2024', description: 'DR.ROHJI BI Design.', thumbnail: 'http://newdia.co.kr/images/uploads/visual/1768279633241-260113_VB_BR-13.jpg', images: ['http://newdia.co.kr/images/uploads/visual/1768279655397-260113_VB_BR-14.jpg'] },
      { id: 10, title: 'SEWHA SEAFOOD CI', client: '세화식품(주)', year: '2025', description: 'SEWHA SEAFOOD CI Design', thumbnail: 'http://newdia.co.kr/images/uploads/visual/1768279678546-260113_VB_BR-15.jpg', images: ['http://newdia.co.kr/images/uploads/visual/1768279694483-260113_VB_BR-16.jpg'] },
      { id: 11, title: 'SIF BI', client: 'NK Hair & Skincare', year: '2025', description: 'SIF BI Design', thumbnail: 'http://newdia.co.kr/images/uploads/visual/1768279753915-260113_VB_BR-17.jpg', images: ['http://newdia.co.kr/images/uploads/visual/1768279762926-260113_VB_BR-18.jpg'] },
      { id: 12, title: 'ARTISENTIAL Catalogue', client: 'LIVSMED', year: '2024', description: 'ARTISENTIAL Catalogue Design', thumbnail: 'http://newdia.co.kr/images/uploads/visual/1768279847612-260113_VD_ED-39.jpg', images: ['http://newdia.co.kr/images/uploads/visual/1768279858777-260113_VD_ED-40.jpg','http://newdia.co.kr/images/uploads/visual/1768279866189-260113_VD_ED-41.jpg','http://newdia.co.kr/images/uploads/visual/1768279875593-260113_VD_ED-42.jpg','http://newdia.co.kr/images/uploads/visual/1768279883896-260113_VD_ED-43.jpg'] },
      { id: 13, title: 'HEALTH & BEAUTY Catalogue', client: 'HEALTH & BEAUTY', year: '2024', description: 'HEALTH & BEAUTY Catalogue Design', thumbnail: 'http://newdia.co.kr/images/uploads/visual/1768279948487-260113_VD_ED-44.jpg', images: ['http://newdia.co.kr/images/uploads/visual/1768279963511-260113_VD_ED-45.jpg','http://newdia.co.kr/images/uploads/visual/1768279971609-260113_VD_ED-46.jpg','http://newdia.co.kr/images/uploads/visual/1768279985240-260113_VD_ED-47.jpg','http://newdia.co.kr/images/uploads/visual/1768279998525-260113_VD_ED-48.jpg'] },
      { id: 14, title: 'EnE System Catalogue', client: 'EnE System', year: '2024', description: 'EnE System Catalogue Design', thumbnail: 'http://newdia.co.kr/images/uploads/visual/1768280134351-260113_VD_ED-49.jpg', images: ['http://newdia.co.kr/images/uploads/visual/1768280148762-260113_VD_ED-50.jpg','http://newdia.co.kr/images/uploads/visual/1768280156497-260113_VD_ED-51.jpg','http://newdia.co.kr/images/uploads/visual/1768280164239-260113_VD_ED-52.jpg','http://newdia.co.kr/images/uploads/visual/1768280172855-260113_VD_ED-53.jpg'] },
      { id: 15, title: 'IL KWANG MOTORS Catalogue', client: 'IL KWANG MOTORS', year: '2024', description: 'IL KWANG MOTORS Catalogue Design', thumbnail: 'http://newdia.co.kr/images/uploads/visual/1768280246131-260113_VD_ED-54.jpg', images: ['http://newdia.co.kr/images/uploads/visual/1768280260859-260113_VD_ED-55.jpg','http://newdia.co.kr/images/uploads/visual/1768280273681-260113_VD_ED-56.jpg','http://newdia.co.kr/images/uploads/visual/1768280315484-260113_VD_ED-63.jpg'] },
      { id: 16, title: 'ELFACE Itself Catalogue', client: 'ELFACE', year: '2024', description: 'ELFACE Itself Catalogue Design', thumbnail: 'http://newdia.co.kr/images/uploads/visual/1768280396488-260113_VD_ED-57.jpg', images: ['http://newdia.co.kr/images/uploads/visual/1768280411977-260113_VD_ED-58.jpg','http://newdia.co.kr/images/uploads/visual/1768280422501-260113_VD_ED-59.jpg'] },
      { id: 17, title: 'ECARPLUG Catalogue', client: 'ECARPLUG', year: '2024', description: 'ECARPLUG Catalogue Design', thumbnail: 'http://newdia.co.kr/images/uploads/visual/1768280507213-260113_VD_ED-60.jpg', images: ['http://newdia.co.kr/images/uploads/visual/1768280520883-260113_VD_ED-61.jpg','http://newdia.co.kr/images/uploads/visual/1768280529230-260113_VD_ED-62.jpg'] },
      { id: 18, title: 'EA Material & Technologies Catalogue', client: 'EA Material & Technologies', year: '2024', description: 'EA Material & Technologies Catalogue Design', thumbnail: 'http://newdia.co.kr/images/uploads/visual/1768280599604-260113_VD_ED-64.jpg', images: ['http://newdia.co.kr/images/uploads/visual/1768280607777-260113_VD_ED-65.jpg','http://newdia.co.kr/images/uploads/visual/1768280616656-260113_VD_ED-66.jpg'] },
      { id: 19, title: 'BASSAK Brochure', client: '(주)한빛식품', year: '2024', description: 'BASSAK Brochure Design', thumbnail: 'http://newdia.co.kr/images/uploads/visual/1768280698723-260113_VD_ED-67.jpg', images: ['http://newdia.co.kr/images/uploads/visual/1768280710420-260113_VD_ED-68.jpg','http://newdia.co.kr/images/uploads/visual/1768280727429-260113_VD_ED-69.jpg'] },
      { id: 20, title: 'SJ GLOBAL Catalogue', client: 'SJ GLOBAL', year: '2024', description: 'SJ GLOBAL Catalogue Design', thumbnail: 'http://newdia.co.kr/images/uploads/visual/1768280783341-260113_VD_ED-70.jpg', images: ['http://newdia.co.kr/images/uploads/visual/1768280797700-260113_VD_ED-71.jpg','http://newdia.co.kr/images/uploads/visual/1768280808880-260113_VD_ED-72.jpg','http://newdia.co.kr/images/uploads/visual/1768280845225-260113_VD_ED-73.jpg'] },
      { id: 21, title: 'WOMEN CARE Catalogue', client: 'SJ GLOBAL', year: '2024', description: 'WOMEN CARE Catalogue Design', thumbnail: 'http://newdia.co.kr/images/uploads/visual/1768280962925-260113_VD_ED-74.jpg', images: ['http://newdia.co.kr/images/uploads/visual/1768280972705-260113_VD_ED-75.jpg','http://newdia.co.kr/images/uploads/visual/1768280982212-260113_VD_ED-76.jpg'] },
      { id: 22, title: '술깨 팩키지', client: '(주)바이오센스', year: '2025', description: '술깨(술술 풀리고 깨워라) 팩키지 디자인', thumbnail: 'http://newdia.co.kr/images/uploads/visual/1768281070472-260113_VD_PK-19.jpg', images: ['http://newdia.co.kr/images/uploads/visual/1768281079834-260113_VD_PK-20.jpg','http://newdia.co.kr/images/uploads/visual/1768281087765-260113_VD_PK-21.jpg','http://newdia.co.kr/images/uploads/visual/1768281093312-260113_VD_PK-22.jpg'] },
      { id: 23, title: 'LOUNG Package', client: 'DEPCENT', year: '2025', description: 'LOUNG Package Design', thumbnail: 'http://newdia.co.kr/images/uploads/visual/1768281192345-260113_VD_PK-23.jpg', images: ['http://newdia.co.kr/images/uploads/visual/1768281205158-260113_VD_PK-24.jpg','http://newdia.co.kr/images/uploads/visual/1768281213361-260113_VD_PK-25.jpg','http://newdia.co.kr/images/uploads/visual/1768281220117-260113_VD_PK-26.jpg','http://newdia.co.kr/images/uploads/visual/1768281230529-260113_VD_PK-27.jpg'] },
      { id: 24, title: 'BEAU:LETTE Package', client: '(주)하이본인터네셔널', year: '2024', description: 'BEAU:LETTE Package Design', thumbnail: 'http://newdia.co.kr/images/uploads/visual/1768281308208-260113_VD_PK-28.jpg', images: ['http://newdia.co.kr/images/uploads/visual/1768281318389-260113_VD_PK-29.jpg','http://newdia.co.kr/images/uploads/visual/1768281325587-260113_VD_PK-30.jpg'] },
      { id: 25, title: 'APERIRE Package', client: '(주)수아내추럴', year: '2025', description: 'APERIRE Package Design', thumbnail: 'http://newdia.co.kr/images/uploads/visual/1768281661767-260113_VD_PK-31.jpg', images: ['http://newdia.co.kr/images/uploads/visual/1768281672564-260113_VD_PK-32.jpg','http://newdia.co.kr/images/uploads/visual/1768281683815-260113_VD_PK-33.jpg'] },
      { id: 26, title: 'MEDI-CHANGE Package', client: '(주)양스스토어', year: '2025', description: 'MEDI-CHANGE Package Design', thumbnail: 'http://newdia.co.kr/images/uploads/visual/1768281748199-260113_VD_PK-34.jpg', images: ['http://newdia.co.kr/images/uploads/visual/1768281757869-260113_VD_PK-35.jpg','http://newdia.co.kr/images/uploads/visual/1768281766764-260113_VD_PK-36.jpg'] },
      { id: 27, title: 'OLIO EXTRA VERGINE DI OLIVA Package', client: 'LINK & LEAVE', year: '2025', description: 'OLIO EXTRA VERGINE DI OLIVA Package Design', thumbnail: 'http://newdia.co.kr/images/uploads/visual/1768281891570-260113_VD_PK-37.jpg', images: ['http://newdia.co.kr/images/uploads/visual/1768281900336-260113_VD_PK-38.jpg'] },
    ],
    web: [
      { id: 4, title: 'NGLE', client: 'NGLE', year: '2024', description: '기업 홈페이지 디자인 개발', external_site_url: 'https://www.ngle.co.kr', thumbnail: 'http://newdia.co.kr/images/uploads/web/1768288296671-1768285628810-260113_WED_CH_01-1.png', images: ['http://newdia.co.kr/images/uploads/web/1768288309664-1768285628810-260113_WED_CH_01.jpg'] },
      { id: 28, title: 'SECURITY FLATFORM', client: '시큐리티플랫폼(주)', year: '2024', description: '기업 홈페이지 디자인 개발', external_site_url: 'https://www.securityplatform.co.kr', thumbnail: 'http://newdia.co.kr/images/uploads/web/1768288335862-1768286423959-260113_WED_CH_02-1.png', images: ['http://newdia.co.kr/images/uploads/web/1768288345185-1768286423959-260113_WED_CH_02.jpg'] },
      { id: 29, title: 'Dashboard Design', client: '', year: '2025', description: '대시보드 디자인 개발', thumbnail: 'http://newdia.co.kr/images/uploads/web/1768288372349-1768286640742-28.jpg', images: ['http://newdia.co.kr/images/uploads/web/1768288379263-1768286650710-28.jpg','http://newdia.co.kr/images/uploads/web/1768288384396-1768286659282-29.jpg','http://newdia.co.kr/images/uploads/web/1768288390591-1768286666540-30.jpg'] },
      { id: 30, title: '나눔에너지', client: '나눔에너지', year: '2022', description: '에너지 솔루션 회사소개 홈페이지 디자인 개발', thumbnail: 'http://newdia.co.kr/images/uploads/web/1768288414269-1768287410852-260113_WED_CH_03-1.png', images: [] },
      { id: 31, title: '얌샘김밥', client: '얌샘김밥', year: '2024', description: '요식업 프랜차이즈 소개 웹사이트 개발', thumbnail: 'http://newdia.co.kr/images/uploads/web/1768288895970-260113_WED_CH_04-1.png', images: ['http://newdia.co.kr/images/uploads/web/1768288905645-260113_WED_CH_04.jpg'] },
      { id: 32, title: 'CERAVIDA', client: 'CERAVIDA', year: '2025', description: '제조업 홈페이지 디자인 개발', thumbnail: 'http://newdia.co.kr/images/uploads/web/1768289262390-260113_WED_CH_05-1.png', images: ['http://newdia.co.kr/images/uploads/web/1768289277121-260113_WED_CH_05.jpg'] },
      { id: 33, title: 'CORE INSIGH', client: '코어인사이트(주)', year: '2025', description: '제조업 웹사이트 디자인 개발', thumbnail: 'http://newdia.co.kr/images/uploads/web/1768289687683-260113_WED_CH_06-1.png', images: ['http://newdia.co.kr/images/uploads/web/1768289701388-260113_WED_CH_06.jpg'] },
      { id: 34, title: 'GLUESYS', client: '(주)글루시스', year: '2025', description: '제품소개 웹사이트 디자인 개발', thumbnail: 'http://newdia.co.kr/images/uploads/web/1768289978482-260113_WED_CH_07-1.png', images: ['http://newdia.co.kr/images/uploads/web/1768289993379-260113_WED_CH_07.jpg'] },
      { id: 35, title: 'VITA NATURE', client: '비타네이쳐(주)', year: '2025', description: '코스메틱 제조업 웹사이트 디자인 개발', thumbnail: 'http://newdia.co.kr/images/uploads/web/1768290348396-260113_WED_CH_08-1.png', images: ['http://newdia.co.kr/images/uploads/web/1768290356976-260113_WED_CH_08.jpg'] },
      { id: 36, title: 'T30', client: 'T30', year: '2025', description: 'IT기업 웹사이트 디자인 개발', thumbnail: 'http://newdia.co.kr/images/uploads/web/1768290648996-260113_WED_CH_09-1.png', images: ['http://newdia.co.kr/images/uploads/web/1768290662494-260113_WED_CH_09.jpg'] },
    ],
    photo: [
      { id: 6, title: 'CLARINS Double Serum', client: 'CLARINS', year: '2025', description: '코스메틱 제품 사진 촬영', thumbnail: 'http://newdia.co.kr/images/uploads/photo/1768350906351-260114_PT_01.jpg', images: ['http://newdia.co.kr/images/uploads/photo/1768350918854-260114_PT_01.jpg'] },
      { id: 7, title: 'NATIONAL GEOGRAPHIC', client: 'NATIONAL GEOGRAPHIC', year: '2025', description: '코스메틱 제품 사진 촬영', thumbnail: 'http://newdia.co.kr/images/uploads/photo/1768351029547-260114_PT_02.jpg', images: ['http://newdia.co.kr/images/uploads/photo/1768351041234-260114_PT_02.jpg'] },
      { id: 37, title: 'AGERIN Facial Cleansing Pads', client: 'AGERIN', year: '2025', description: '코스메틱 제품 사진 촬영', thumbnail: 'http://newdia.co.kr/images/uploads/photo/1768351074129-260114_PT_03.jpg', images: ['http://newdia.co.kr/images/uploads/photo/1768351084147-260114_PT_03.jpg'] },
      { id: 38, title: 'LE LABO Another 13', client: 'LE LABO', year: '2025', description: '코스메틱 제품 사진 촬영', thumbnail: 'http://newdia.co.kr/images/uploads/photo/1768351197556-260114_PT_04.jpg', images: ['http://newdia.co.kr/images/uploads/photo/1768351205239-260114_PT_04.jpg'] },
      { id: 39, title: 'META D. Clinc Interior', client: '청담메타디클리닉 치과', year: '2025', description: '인테리어 사진 촬영', thumbnail: 'http://newdia.co.kr/images/uploads/photo/1768351318143-260114_PT_05.jpg', images: ['http://newdia.co.kr/images/uploads/photo/1768351328763-260114_PT_05.jpg'] },
      { id: 40, title: 'egg Stroller', client: 'egg', year: '2025', description: 'egg 유모차 모델 사진 촬영', thumbnail: 'http://newdia.co.kr/images/uploads/photo/1768351620793-260114_PT_06.jpg', images: ['http://newdia.co.kr/images/uploads/photo/1768351633937-260114_PT_06.jpg'] },
      { id: 41, title: 'POCARI SWEAT', client: '동아오츠카', year: '2024', description: '제품 사진 촬영', thumbnail: 'http://newdia.co.kr/images/uploads/photo/1768351959280-260114_PT_07.jpg', images: ['http://newdia.co.kr/images/uploads/photo/1768351971281-260114_PT_07.jpg'] },
      { id: 42, title: 'LITTLE MAMA Spa Wash', client: 'ALPBEBE', year: '2024', description: '코스메틱 제품 촬영', thumbnail: 'http://newdia.co.kr/images/uploads/photo/1768352301934-260114_PT_08.jpg', images: ['http://newdia.co.kr/images/uploads/photo/1768352310954-260114_PT_08.jpg'] },
    ],
    marketing: [
      { id: 8, title: 'Acting SNS Management', client: 'CLOTOY / Nanoom Energy', year: '2022', description: 'SNS 관리 대행. SNS Contants(Instargram Feed) 디자인 개발 및 관리 대행', thumbnail: 'http://newdia.co.kr/images/uploads/marketing/1768362638541-260114_MK_01.jpg', images: ['http://newdia.co.kr/images/uploads/marketing/1768362648456-260114_MK_01.jpg','http://newdia.co.kr/images/uploads/marketing/1768362654575-260114_MK_02.jpg'] },
      { id: 9, title: 'Viral Marketing', client: 'CLOTOY', year: '2022', description: 'CLOTOY 바이럴 마케팅(YouTube, Blog, SNS) 제작 진행', thumbnail: 'http://newdia.co.kr/images/uploads/marketing/1768362965322-260114_MK_03-1.jpg', images: ['http://newdia.co.kr/images/uploads/marketing/1768362920394-260114_MK_03-1.jpg','http://newdia.co.kr/images/uploads/marketing/1768362927672-260114_MK_03-2.jpg','http://newdia.co.kr/images/uploads/marketing/1768362933357-260114_MK_03-3.jpg'] },
      { id: 43, title: 'Transmission of Article', client: 'CUPUL', year: '2022', description: 'CUPUL 기사송출. CUPUL 매일경제, 아시아경제 기사 송출 대행', thumbnail: 'http://newdia.co.kr/images/uploads/marketing/1768363325314-260114_MK_04-2.jpg', images: ['http://newdia.co.kr/images/uploads/marketing/1768363335367-260114_MK_04-1.jpg','http://newdia.co.kr/images/uploads/marketing/1768363341235-260114_MK_04-2.jpg'] },
      { id: 44, title: 'Live Shopping', client: 'Dewbell / Krono / Mixsoon / Reve', year: '2022', description: 'Live Shopping 대행', thumbnail: 'http://newdia.co.kr/images/uploads/marketing/1768363495642-260114_MK_05-1.jpg', images: ['http://newdia.co.kr/images/uploads/marketing/1768363505232-260114_MK_05-1.jpg','http://newdia.co.kr/images/uploads/marketing/1768363513970-260114_MK_05-2.jpg','http://newdia.co.kr/images/uploads/marketing/1768363521196-260114_MK_05-3.jpg','http://newdia.co.kr/images/uploads/marketing/1768363532913-260114_MK_05-4.jpg'] },
      { id: 45, title: 'Shorts Platform', client: 'CLOTOY', year: '2022', description: 'CLOTOY Short Platform 대행', thumbnail: 'http://newdia.co.kr/images/uploads/marketing/1768363634445-260114_MK_06-1.jpg', images: ['http://newdia.co.kr/images/uploads/marketing/1768363652124-260114_MK_06-1.jpg','http://newdia.co.kr/images/uploads/marketing/1768363665418-260114_MK_06-2.jpg'] },
      { id: 46, title: 'SEO', client: '신호시스템 / 씨엘팜', year: '2022', description: 'SEO(검색엔진 최적화) 진행', thumbnail: 'http://newdia.co.kr/images/uploads/marketing/1768363838117-260114_MK_07-1.jpg', images: ['http://newdia.co.kr/images/uploads/marketing/1768363853431-260114_MK_07-1.jpg','http://newdia.co.kr/images/uploads/marketing/1768363861343-260114_MK_07-2.jpg'] },
      { id: 47, title: 'E-commerce', client: '둘로스텍 / 블루레오 / Nail with Me', year: '2022', description: 'E-commerce(Ebay, Shopee, Amazon) 대행.', thumbnail: 'http://newdia.co.kr/images/uploads/marketing/1768364109592-260114_MK_08-1.jpg', images: ['http://newdia.co.kr/images/uploads/marketing/1768364117233-260114_MK_08-1.jpg','http://newdia.co.kr/images/uploads/marketing/1768364245514-260114_MK_08-2.png','http://newdia.co.kr/images/uploads/marketing/1768364263404-260114_MK_08-3.jpg'] },
      { id: 48, title: 'Sales Agent', client: 'BTS Album / ENTERADO', year: '2026', description: 'BTS Album(Joom), ENTERADO(Shopee) 판매대행 진행.', thumbnail: 'http://newdia.co.kr/images/uploads/marketing/1768366544211-260114_MK_09-1.jpg', images: ['http://newdia.co.kr/images/uploads/marketing/1768366558264-260114_MK_09-1.jpg','http://newdia.co.kr/images/uploads/marketing/1768366565355-260114_MK_09-2.jpg'] },
    ],
  },
  featuredIds: {
    visual: [1, 12, 2, 26, 25, 10],
    web: [4, 28, 31, 34, 35, 36],
    photo: [7, 6, 39, 40, 42, 38],
    marketing: [8, 9, 43, 44, 45, 47],
  },
  packages: {
    label: 'Service Packages',
    title: '맞춤형 패키지',
    description: '비즈니스 규모와 목표에 맞는 최적의 솔루션을 제안합니다.',
    items: [
      { name: 'Starter', subtitle: '스타트업 & 소규모 비즈니스', description: '브랜드의 첫 걸음을 위한 필수 디자인 패키지', features: ['로고 디자인', '명함 & 기본 문구류', 'SNS 프로필 키트'], highlight: false },
      { name: 'Growth', subtitle: '성장하는 기업', description: '브랜드 확장을 위한 종합 디자인 솔루션', features: ['브랜드 아이덴티티 시스템', '웹사이트 디자인', '마케팅 콘텐츠 제작', 'SNS 운영 가이드'], highlight: true },
      { name: 'Enterprise', subtitle: '대기업 & 프랜차이즈', description: '브랜드 리뉴얼 및 통합 관리 서비스', features: ['브랜드 리뉴얼 전략', '멀티 채널 디자인', '브랜드 가이드라인', '전담 디자인 팀 배정'], highlight: false },
    ],
  },
  cta: {
    title: '지금 시작하세요',
    description: '무료 상담을 통해 귀사에 맞는 최적의 솔루션을 제안받으세요.',
    buttonText: '무료 상담 신청',
    buttonLink: '/consultation',
    subText: '상담은 무료이며, 부담 없이 문의해 주세요.',
  },
}

export function getFeaturedItems(category: PortfolioCategory): PortfolioItem[] {
  const ids = siteData.featuredIds[category]
  return ids.map(id => siteData.gallery[category].find(item => item.id === id)).filter(Boolean) as PortfolioItem[]
}

export function getAllItems(): PortfolioItem[] {
  return Object.values(siteData.gallery).flat()
}
