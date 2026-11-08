/*
  651WORKS 프로젝트 데이터 — 여기만 고치면 메인, 전체 작업(works.html), 상세 페이지가 함께 바뀝니다.
  배열 순서 = 화면 순서.

  필드
    id        상세 페이지 주소(project.html?id=...)에 쓰이는 고유값
    title     프로젝트 이름
    category  CATEGORIES의 key 중 하나 (파트)
    featured  true면 메인 화면 해당 파트에 노출 (파트당 1~2개 권장, 없으면 앞의 2개)
    type      작은 부제(장르·촬영 방식)
    year      연도 — 현재는 영상 업로드 연도 기준, 실제 제작 연도로 바꿔도 됩니다
    client    클라이언트(채널)
    role      맡은 역할
    image     썸네일/대표 스틸 경로 (1920x1080 권장)
    ratio     썸네일 비율 '16/9' 또는 '4/3' (나란히 놓이는 두 개는 같은 비율 권장)
    span      'full'(전체 너비) 또는 'half'(2열 중 1칸) — 전체 작업 페이지에서만 적용
    youtube   { id, start } 하나 또는 [{ id, label, start }, ...] 여러 개 — 상세 페이지에서 재생
    link      외부 링크(인스타그램 등)
    summary   상세 페이지 설명 — 비워두면 '설명 준비 중' 자리표시가 나옵니다
*/
window.CATEGORIES = {
  'fashion': 'Fashion',
  'music-video': 'Music Video',
  'drone': 'Drone & FPV',
  'youtube': 'YouTube Content',
  'interview': 'Interview',
  'promo': 'Promotional Film'
};

window.PROJECTS = [
  /* ── Fashion ── */
  {
    id: 'letswork', title: '레츠워크 브랜드 필름', category: 'fashion', featured: true, type: 'Brand Film',
    year: 2026, client: '레츠워크', role: '촬영 및 편집',
    image: 'images/letswork.jpg', ratio: '4/3', span: 'half',
    link: 'https://www.instagram.com/reel/De8edgoPU7Z/', summary: ''
  },
  {
    id: 'zerogram', title: '제로그램 인스타그램 릴스', category: 'fashion', featured: true, type: 'Reels',
    year: 2026, client: '제로그램', role: '촬영 및 편집',
    image: 'images/zerogram.jpg', ratio: '4/3', span: 'half',
    link: 'https://www.instagram.com/reel/DdGuA7ENysp/', summary: ''
  },
  {
    id: 'zerogram-2', title: '제로그램 인스타그램 릴스 2', category: 'fashion', type: 'Reels',
    year: 2026, client: '제로그램', role: '촬영',
    image: 'images/zerogram-2.jpg', ratio: '4/3', span: 'half',
    link: 'https://www.instagram.com/reel/DdGtj5DtAHi/', summary: ''
  },

  /* ── Music Video ── */
  {
    id: 'jungin-more', title: '정인 — 조금만 더 너를', category: 'music-video', featured: true, type: 'Music Video',
    year: 2023, client: '서울뮤직', role: '촬영 · 조명',
    image: 'images/jungin-more.jpg', ratio: '16/9', span: 'half',
    youtube: { id: 'WffDqN6pGC4' }, summary: ''
  },
  {
    id: 'juniel-dear', title: '주니엘 — Dear.', category: 'music-video', featured: true, type: 'Music Video',
    year: 2022, client: 'JUNIEL', role: '촬영 · 조명',
    image: 'images/juniel-dear.jpg', ratio: '16/9', span: 'half',
    youtube: { id: 'zNPwoj34nXQ' }, summary: ''
  },
  {
    id: 'hyunwoo-pain', title: '현우 — PAIN', category: 'music-video', type: 'Music Video',
    year: 2024, client: 'HyunWoo', role: '촬영 · 조명',
    image: 'images/hyunwoo-pain.jpg', ratio: '16/9', span: 'half',
    youtube: { id: 'xE1u2Ac9Brc' }, summary: ''
  },
  {
    id: 'hyb-winter', title: 'HYB(허용별) — 그 겨울엔 네가 있어', category: 'music-video', type: 'Music Video',
    year: 2023, client: '1theK', role: '촬영 · 조명',
    image: 'images/hyb-winter.jpg', ratio: '16/9', span: 'half',
    youtube: { id: 'VB4-yt5Kelo' }, summary: ''
  },
  {
    id: 'heeseung-cover', title: 'ENHYPEN 희승 — Off My Face (Cover)', category: 'music-video', type: 'Cover Film',
    year: 2022, client: 'ENHYPEN', role: '촬영',
    image: 'images/heeseung-cover.jpg', ratio: '16/9', span: 'half',
    youtube: { id: 'n4PDo8W2FJQ' }, summary: ''
  },

  /* ── Drone & FPV ── */
  {
    id: 'police-day', title: '제81주년 경찰의 날 홍보영상', category: 'drone', featured: true, type: 'Aerial',
    year: 2026, client: '경찰청', role: '드론 촬영',
    image: 'images/police-day.jpg', ratio: '16/9', span: 'half',
    youtube: { id: 'gsrQ3r5h-ug' }, summary: ''
  },
  {
    id: 'sokcho', title: '속초시 홍보영상', category: 'drone', featured: true, type: 'Aerial & Ground',
    year: 2024, client: '속초시', role: '드론 및 지상 촬영 전체',
    image: 'images/sokcho.jpg', ratio: '16/9', span: 'half',
    youtube: { id: 'MF-lBZ_LEOQ' }, summary: ''
  },
  {
    id: 'gyeonggi-marathon', title: '경기 마라톤 2025 — ASML Run Gyeonggi', category: 'drone', type: 'Aerial & FPV',
    year: 2025, client: 'ASML Korea', role: '드론 · FPV 드론 촬영',
    image: 'images/gyeonggi-marathon.jpg', ratio: '16/9', span: 'half',
    youtube: { id: 'mkwxzBrhU_s' }, summary: ''
  },
  {
    id: 'snua-sports', title: '서울문화예술대학교 한마음 체육대회', category: 'drone', type: 'Aerial & FPV',
    year: 2025, client: '서울문화예술대학교', role: '드론 · FPV 드론 촬영',
    image: 'images/snua-sports.jpg', ratio: '16/9', span: 'half',
    youtube: { id: '1PegsFPvxYY' }, summary: ''
  },
  {
    id: 'sejong-fpv', title: '세종시 홍보영상 FPV 모음', category: 'drone', type: 'FPV',
    year: 2026, client: '세종시', role: 'FPV 드론 촬영',
    image: 'images/sejong-fpv.jpg', ratio: '4/3', span: 'half',
    youtube: { id: 'z4j2FGjiXuo' }, summary: ''
  },
  {
    id: 'fpv-personal', title: 'FPV Personal Work', category: 'drone', type: 'FPV',
    year: 2026, client: '개인 작업', role: 'FPV 촬영 및 편집',
    image: 'images/fpv-personal.jpg', ratio: '4/3', span: 'half',
    youtube: { id: 'SSUNf77KtFM' }, summary: ''
  },

  /* ── YouTube Content ── */
  {
    id: 'catchtheyoung', title: '캐치더영 1주년 기념 영상', category: 'youtube', featured: true, type: 'Web Content',
    year: 2024, client: 'CATCH THE YOUNG', role: '메인 촬영 감독 (감독 5인)',
    image: 'images/catchtheyoung.jpg', ratio: '16/9', span: 'half',
    youtube: [{ id: 'rLdnH5Mw458', label: 'EP.1' }, { id: 'hz78c4YOzso', label: 'EP.2' }], summary: ''
  },
  {
    id: 'unification-football', title: '남북한 축구 이야기', category: 'youtube', featured: true, type: 'Talk Show',
    year: 2026, client: '통일부', role: '서브 촬영 (감독 2인)',
    image: 'images/unification-football.jpg', ratio: '16/9', span: 'half',
    youtube: { id: 'azNFr_vU1_8', start: 436 }, summary: ''
  },
  {
    id: 'dk-haunted', title: '흉가체험 몰카 (feat. DK 1번 동생)', category: 'youtube', type: 'Web Content',
    year: 2026, client: 'happyhandk', role: '촬영',
    image: 'images/dk-haunted.jpg', ratio: '16/9', span: 'half',
    youtube: { id: '3v-sH8o1BBQ', start: 185 }, summary: ''
  },
  {
    id: 'jimun-wiki', title: '지문위키위키 EP.1–5', category: 'youtube', type: 'Web Series',
    year: 2025, client: '지역문화진흥원', role: '인서트 · B캠',
    image: 'images/jimun-wiki.jpg', ratio: '16/9', span: 'half',
    youtube: [
      { id: 'jis3qUADlTg', label: 'EP.1 파주' }, { id: 'Xtx_nhPlSGQ', label: 'EP.2 영월' },
      { id: 'EhzyUsSOn4M', label: 'EP.3 제천' }, { id: 'EGXRPwPfgAo', label: 'EP.4 영주' },
      { id: 'PiKBkJJvY6E', label: 'EP.5-1 김제' }, { id: 'A90F-r-ouS4', label: 'EP.5-2 김제' }
    ], summary: ''
  },
  {
    id: 'umchef-ep6', title: '음문석 채널 〈음쉐프〉 Ep.6', category: 'youtube', type: 'Web Content',
    year: 2024, client: 'UM believable 음문석', role: '메인 촬영 (감독 5인)',
    image: 'images/umchef-ep6.jpg', ratio: '16/9', span: 'half',
    youtube: { id: 'byrkdMIfVc4' }, summary: ''
  },
  {
    id: 'umchef-ep7', title: '음문석 채널 〈음쉐프〉 Ep.7', category: 'youtube', type: 'Web Content',
    year: 2024, client: 'UM believable 음문석', role: '메인 촬영 (감독 5인)',
    image: 'images/umchef-ep7.jpg', ratio: '16/9', span: 'half',
    youtube: { id: 'gVUb9Bi_IcQ' }, summary: ''
  },
  {
    id: 'nakku-mukku', title: '다이와 〈낚쿠먹쿠〉 EP.01–02', category: 'youtube', type: 'Web Series',
    year: 2025, client: '다이와', role: '촬영',
    image: 'images/nakku-mukku.jpg', ratio: '16/9', span: 'half',
    youtube: [{ id: 'VmoTUO3GH4w', label: 'EP.01' }, { id: 'e9i35eBdXKA', label: 'EP.02' }], summary: ''
  },
  {
    id: 'koquiz-uzbek', title: 'KOICA 〈코퀴즈~? 온 더 우즈벡!〉', category: 'youtube', type: 'Web Series',
    year: 2026, client: 'KOICA', role: '촬영',
    image: 'images/koquiz-uzbek.jpg', ratio: '16/9', span: 'half',
    youtube: [{ id: 'Q4Uax1eNesI', label: 'ep.01' }, { id: 'QAjMNvbg93U', label: 'ep.02', start: 417 }], summary: ''
  },
  {
    id: 'koica-edcf', title: 'KOICA x EDCF 우즈벡 협력 의료 현장', category: 'youtube', type: 'Web Content',
    year: 2026, client: 'KOICA', role: '촬영',
    image: 'images/koica-edcf.jpg', ratio: '16/9', span: 'half',
    youtube: { id: 'wpt7X92WH5E' }, summary: ''
  },
  {
    id: 'koica-pbong', title: '우즈벡 프로젝트 봉사단 A to Z', category: 'youtube', type: 'Vlog',
    year: 2026, client: 'KOICA', role: '촬영',
    image: 'images/koica-pbong.jpg', ratio: '16/9', span: 'half',
    youtube: { id: '-bAA7cDCmoA' }, summary: ''
  },
  {
    id: 'taejo', title: '일터혁신 우수사례 — 태조엔지니어링', category: 'youtube', type: 'Web Content',
    year: 2026, client: 'Korea Labor and Employment Service', role: '메인 촬영 감독 (감독 4인)',
    image: 'images/taejo.jpg', ratio: '16/9', span: 'half',
    youtube: { id: 'XZwcGbdZqXY' }, summary: ''
  },
  {
    id: 'stn', title: '일터혁신 우수사례 — 에스티엔', category: 'youtube', type: 'Web Content',
    year: 2026, client: 'Korea Labor and Employment Service', role: '메인 촬영 감독 (감독 4인)',
    image: 'images/stn.jpg', ratio: '16/9', span: 'half',
    youtube: { id: 'DMsclYBOMic' }, summary: ''
  },

  /* ── Interview ── */
  {
    id: 'sung-taejin', title: '〈나.공.펼〉 EP.1 — 아티스트 성태진', category: 'interview', featured: true, type: 'Interview',
    year: 2022, client: '유보라TV', role: '촬영 · 조명',
    image: 'images/sung-taejin.jpg', ratio: '16/9', span: 'half',
    youtube: { id: 'n8l8d_D_RDM' }, summary: ''
  },
  {
    id: 'lol-league', title: '우리WON뱅킹 고등LoL리그 인터뷰', category: 'interview', featured: true, type: 'Interview',
    year: 2024, client: 'LCK', role: '인터뷰 촬영',
    image: 'images/lol-league.jpg', ratio: '16/9', span: 'half',
    youtube: { id: 'zh3AujF-iE8' }, summary: ''
  },
  {
    id: 'gangnam-shoes', title: '다큐 강남 EP.10 — 구두명의 유효순', category: 'interview', type: 'Documentary',
    year: 2024, client: '강남구', role: '인터뷰 촬영',
    image: 'images/gangnam-shoes.jpg', ratio: '16/9', span: 'half',
    youtube: { id: 'dqF1Gg4myQk' }, summary: ''
  },
  {
    id: 'gunpo-cooktalk', title: '군포쿡톡 EP.11 — 자활기업', category: 'interview', type: 'Interview',
    year: 2024, client: '군포시', role: '인터뷰 촬영',
    image: 'images/gunpo-cooktalk.jpg', ratio: '16/9', span: 'half',
    youtube: { id: 'vLrjE5-H9FQ' }, summary: ''
  },

  /* ── Promotional Film ── */
  {
    id: 'railroad-hs', title: '한국철도고등학교 공식 홍보영상', category: 'promo', featured: true, type: 'Promotion',
    year: 2022, client: '한국철도고등학교', role: '촬영',
    image: 'images/railroad-hs.jpg', ratio: '16/9', span: 'half',
    youtube: { id: 'Ps6jZa1nmzw' }, summary: ''
  },
  {
    id: 'koica-samarkand', title: '사마르칸트 직업훈련원 이야기', category: 'promo', featured: true, type: 'Promotion',
    year: 2026, client: 'KOICA', role: '촬영',
    image: 'images/koica-samarkand.jpg', ratio: '16/9', span: 'half',
    youtube: { id: 'Wck3dg38JA8' }, summary: ''
  },
  {
    id: 'counter-terror', title: '대테러센터 홍보영상', category: 'promo', type: 'Public',
    year: 2022, client: '국무조정실 대테러센터', role: '촬영 · 조명',
    image: 'images/counter-terror.jpg', ratio: '16/9', span: 'half',
    youtube: { id: '3__QCKy1WMs' }, summary: ''
  },
  {
    id: 'myeongseong', title: '명성황후기념관 특별기획전시 영상', category: 'promo', type: 'Exhibition',
    year: 2022, client: '여주세종문화관광재단', role: '촬영 · 조명',
    image: 'images/myeongseong.jpg', ratio: '16/9', span: 'half',
    youtube: { id: '-0yxF4lLU9Y' }, summary: ''
  },
  {
    id: 'koica-me', title: "나에게 KOICA는 '__'이다", category: 'promo', type: 'Promotion',
    year: 2026, client: 'KOICA', role: '촬영',
    image: 'images/koica-me.jpg', ratio: '16/9', span: 'half',
    youtube: { id: 'aVZ2z1QOJmM', start: 48 }, summary: ''
  },
  {
    id: 'nhis-care', title: '간호·간병 통합서비스 홍보영상', category: 'promo', type: 'Public',
    year: 2025, client: '국민건강보험', role: '메인 촬영 (1인)',
    image: 'images/nhis-care.jpg', ratio: '16/9', span: 'half',
    youtube: { id: 'G7W2ggZyUPQ' }, summary: ''
  },
  {
    id: 'supreme-court', title: '장애인 사법지원 제도 안내', category: 'promo', type: 'Public',
    year: 2025, client: '대법원', role: '메인 촬영 (감독 2인)',
    image: 'images/supreme-court.jpg', ratio: '16/9', span: 'half',
    youtube: { id: 'h2KmHIbm-FQ' }, summary: ''
  }
];
