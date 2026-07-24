import { Destination, Trip, UserProfile, DestinationTraffic } from '../types';

export const INITIAL_USER: UserProfile = {
  name: '김지수',
  email: 'jisoo.kim@example.com',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCW2oNjCb2BevEjaQR6TjMRbgJAKpXNpcypLuQD2ERTUipWaOTz2VomxT1CirRrVZGyy8MTKwe0d5e4j6soZbyle8aJj9TpH1m28AGFW2aqPiLByFcN-5sbEK_KpVtzFOyvyJneDmHnSn2y4Y5DZEGVVaWVPzv0wVdrZ7bktwM-05TTnG0-1-GJZ8PBIoelVvc-iTNBR6Noa_6-Kgh_KalWVoB0yC7LokBy2l8Ff094aiujCGJKt3ooBdhFfnbGwdQ2_3gPoKbYda9L',
  membership: '프리미엄 회원',
  roleTag: '여행 매니아',
  stats: {
    destinationsCount: 12,
    reviewsCount: 8,
    savedCount: 24,
    mileage: '2.4k',
  },
};

export const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: 'positano-beach',
    name: '아말피 해안의 보석, 포지타노 7일 투어',
    location: '이탈리아, 아말피',
    country: '이탈리아',
    price: 4250000,
    priceDisplay: '₩4,250,000',
    rating: 4.9,
    reviewCount: 128,
    duration: '6박 7일',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCv91U283UHyxPrK8RWziDlWCcNJZMTh37mLj-QCYZqdvc0T4vLttXCFvwWNK5oWiK1yiLtlT9Aszp1ShZlt8yh3PVaiDF3mmxiAPAE2hkOe5YOCnyhevuQP9BqvLa3f_3p6o-yYOMseUwhP1B94GB0Ke-q6Gdznjq65Li8M-n5-GDfBvlalrliolt91OZKBgVuBTyQDCBGwMJjSS5Nx_ouCtLkLONZO6E9rbxoX44Rqx1aG-LfnYla9-0sjb38aGz9ZJsvH6iaH1D7',
    category: '해변',
    tags: ['가장 인기있는', '프리미엄 투어'],
    badges: ['전 일정 5성급 숙박', '미슐랭 2회 포함', '전용 차량', '모든 입장료 포함'],
    highlights: ['프라이빗 보트', '한국인 가이드', '와인 테이스팅', '스냅 촬영 포함', '소규모 그룹(최대 6인)'],
    isPopular: true,
    isTrending: true,
    description: '세계에서 가장 아름다운 해안선 중 하나로 꼽히는 아말피 해안의 심장부로 떠나보세요. 포지타노의 수직 마을, 아말피의 역사적인 두오모, 그리고 라벨로의 환상적인 정원을 탐험합니다. 전문 가이드와 함께하는 이 여행은 단순한 관광을 넘어 진정한 \'라 돌체 비타(La Dolce Vita)\'를 경험하게 해줄 것입니다. 현지 미슐랭 레스토랑에서의 저녁 식사와 프라이빗 보트 투어가 포함되어 있습니다.',
    itinerary: [
      {
        day: 1,
        events: [
          {
            time: '오전 09:00',
            title: '나폴리 공항 픽업 및 미팅',
            description: '전용 차량을 이용해 나폴리 국제공항에서 가이드와 조우합니다. 아말피 해안으로 향하는 설레는 여정의 시작입니다.',
          },
          {
            time: '오후 01:00',
            title: '포지타노 부티크 호텔 체크인',
            description: '바다 전망이 확보된 5성급 부티크 호텔에 체크인하며 잠시 휴식을 취합니다.',
            images: [
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCfABeguYn82158U8c2lqZwdsL_ECKtvNxejSw0-057SJgiqUpUqwFwsTdTJk3regYozneyGXcq40JFWysDSjUapoag6JgvPg6WqEHTbBQqQsnOwI7fOFxxfREyGUymykHf6y6wc4HeldIda-UMy42CQNxk-0bdefumGUIvR3i71N6GY-5O8TPWHcTpvoau94LUI3JBivbWLN8mBy0cK85u1U2Z4_TBsvHjEUhj_p8lalIDExfW4QKOeUanrnAzAEV83HhN5RU8Qu62',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCzKKLLlvAfvPJA9j3Q2Kvg5AUU9l7043jsywKGTQ9j7zFh9onzmDiVeejutm5q-JORCXYClyLRg1iZ2SnTQCkVjAX5J-4tjTiq8qvcqY0UZLWhR6q1hw_Sm8wbumJUh61FKR-O1cCv6YQPFT0cC_U57lACBI0FpwPE78lsRRkWV80iZmjBFx4q95ElZ5_mXaP8ovvJ7ok8GBfYEIf1winHzSj-Z037Cyr9HlKwFAK4UY6gcJC6ZZMoplMpVITmX7xnEcT7xs995yvr'
            ]
          },
          {
            time: '오후 07:00',
            title: '웰컴 디너 - 라 스폰다',
            description: '400개의 촛불이 켜지는 로맨틱한 분위기 속에서 현지 제철 재료로 만든 이탈리안 코스 요리를 즐깁니다.',
          }
        ]
      },
      {
        day: 2,
        events: [
          {
            time: '오전 10:00',
            title: '포지타노 해안 프라이빗 요트 프라이빗 투어',
            description: '전용 요트에 탑승하여 에메랄드빛 아말피 바다를 순항하고 에메랄드 동굴을 감상합니다.',
          },
          {
            time: '오후 03:00',
            title: '골목 스냅 촬영 & 오르간 레몬첼로 시음',
            description: '포지타노 특산 레몬첼로 제작 과정을 견학하고 전문 작가의 야외 스냅 사진을 촬영합니다.',
          }
        ]
      },
      {
        day: 3,
        events: [
          {
            time: '오전 09:30',
            title: '라벨로 루폴로 빌라 정원 탐방',
            description: '절벽 위에 위치한 하늘 위의 정원 라벨로 빌라 루폴로에서 지중해의 광활한 파노라마를 조망합니다.',
          }
        ]
      },
      {
        day: 4,
        events: [
          {
            time: '오후 02:00',
            title: '아말피 두오모 성당 및 쿠킹클래스',
            description: '현지 셰프와 함께 이탈리아 전통 파스타와 티라미수를 직접 만들어 보는 쿠킹 쿠킹 클래스.',
          }
        ]
      },
      {
        day: 5,
        events: [
          {
            time: '오전 11:00',
            title: '신들의 길(Sentiero degli Dei) 트레킹',
            description: '지중해에서 가장 멋진 도보 코스로 꼽히는 신들의 길을 완만하게 걷는 세미 트레킹.',
          }
        ]
      }
    ]
  },
  {
    id: 'zermatt-alps',
    name: '체르마트 알프스 마터호른 힐링',
    location: '체르마트, 스위스',
    country: '스위스',
    price: 1200000,
    priceDisplay: '₩1,200,000~',
    rating: 4.8,
    reviewCount: 94,
    duration: '4박 5일',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjhNpeeaC5o32n4o1B4Oc3ANFpSpz-Q29mIRxvB9QokU1vUHCASuF-DJq7ng2PK8uyq5WR31S2WsHbs4GuSTcuAXgHawCbLxGLwN8w9aYsJ9FLCeQH8igWN_53JJSONakTg8q-Pp-hkauZDyjEPoZxOLgfd3GUdF4G_l_FZKH9yqjywO8k1aLDyldJzLLpl6fSVOXlk5beyQ2La12azyufPwth8rudWjGrExJ3fB8okJqIk5bQnWoMEY5LCqvEtYN8GKac9er89vix',
    category: '산맥',
    tags: ['알프스', '파노라마 산악철도'],
    isPopular: true,
    isTrending: true,
    description: '웅장한 마터호른 봉우리를 조망하며 청정 스위스 고산지대의 맑은 공기를 마시는 고품격 알프스 힐링 여정.',
    itinerary: []
  },
  {
    id: 'bali-ubud',
    name: '발리 우붓 힐링 투어',
    location: '우붓, 인도네시아',
    country: '인도네시아',
    price: 520000,
    priceDisplay: '₩520,000',
    rating: 4.9,
    reviewCount: 210,
    duration: '3박 4일',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-r3mILe9UyAOOG4pBso_yFWbUvC5oTu8wkNBLl75GKQ8tnVE7XszLLiNcSbuPPC-_4mfAQiYtd4Vrd-CilJ4wfRf2fgigE3VNPxpzBUovpC7IhfMKr9_kfV9-1536OyiaRLgGH6oEU4GqhTib_b5XJCGGLj7JIKmNm-8dzWVCzeYMK3pVxBo8xtvSRNZ2FfuZFt02Bc-tTJ5yIUu5D8iCoOKw2nomNG8lGDxbR1pP2mgts-5nwQsBtomMOXwiSHQm9hoK104PCkSS',
    category: '숲',
    tags: ['친환경 여행'],
    isEco: true,
    description: '평화로운 자연 속에서의 명상과 휴식. 우붓 계단식 논과 열대우림 스파를 함께 경험하세요.',
    itinerary: []
  },
  {
    id: 'iceland-aurora',
    name: '아이슬란드 오로라 탐험',
    location: '레이캬비크, 아이슬란드',
    country: '아이슬란드',
    price: 1580000,
    priceDisplay: '₩1,580,000',
    rating: 5.0,
    reviewCount: 88,
    duration: '5박 6일',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVgM3MKMVvXGB2TZeGFK5b3HNdPcpRW3bejwuu7pSvRPya5A60JH-dshlNK9DgzkQS0UkuEn-UVlmWzfCz8Wvd7wQmDZLwhqPrZbulsURm5v2NBT0Lsy_DRwLy8hVEzeIiyDjpXZmk8rbOIet3B8CX_oX45-GpqyxNW7hWBor0Z4AQo81N_p52zb_-kjKJou0UFBPsEchVLnIUByczgVr40qxje75U2yB5ZrH2rNWtNeL70QCwbC_zRfkYQD8Dq6aPGIH3uphQq_95',
    category: '캠핑',
    tags: ['어드벤처', '5성급 숙소 포함'],
    description: '평생 잊지 못할 밤하늘의 마법 오로라와 빙하 글래시어 투어, 글래스 돔 이글루에서의 특별한 하룻밤.',
    itinerary: []
  },
  {
    id: 'santorini-sunset',
    name: '산토리니 로맨틱 선셋 5일',
    location: '산토리니, 그리스',
    country: '그리스',
    price: 3800000,
    priceDisplay: '₩3,800,000',
    rating: 4.9,
    reviewCount: 154,
    duration: '4박 5일',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjZ0M990H26KnPRsggHvwobtT99BnRfBJR-jVeIeLIF4QG6GFtjJVq_NnBNaIOkrYjltjc5nqNTi1M7VUxbyjjzs1e7VV8_rnuKzO49yRuF891GTFkr4ADmuWKU0fZRCeEkGiH9uHRQTWCMeyzVqY6mtBHGmyUG7pmPJDmNBG90AdKML4kwkBibaGeOUQh1OpF_QDJBd2ReXquVDP5t-RQZAOxfMNtlBjmGRhCY2ACeaeqcAZ7i0zTIlevoYhr6RZjW968zdxFt5lp',
    category: '해변',
    tags: ['로맨틱', '선셋 페리'],
    description: '이아 마을 절벽의 하얀 건물과 푸른 지붕, 세상에서 가장 아름다운 일몰을 만나는 그랜드 럭셔리 투어.',
    itinerary: []
  },
  {
    id: 'provence-lavender',
    name: '남프랑스 라벤더 투어',
    location: '프로방스, 프랑스',
    country: '프랑스',
    price: 2950000,
    priceDisplay: '₩2,950,000',
    rating: 4.7,
    reviewCount: 76,
    duration: '4박 5일',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC94BMuY0J9K6lY6Dlo3jg_Jvwcyka8_rl4FGcirPcLDIuNNskMing6bP7g3Wo9d1Xf8_xhbmoPjylBdeSwUsJbBS3jKlk8sYisevjuwoEz2V35YUhmP0VY-vzp1vALJNjXDXxr0njj6-D6DWTPNnvNADFn33oJpwxPkujeK15UR2y0MB5mnELqRMtYfpAnGCFfd602_BPMHdCIuZxjv70WdaUBjNPKHOazp1pYBr-_hCcbsUktVcqlx6Kb8yltqa0bvFQU-dnrBR3S',
    category: '도시',
    tags: ['라벤더밭', '와이너리'],
    description: '보랏빛 향기가 물씬 풍기는 발랑솔 평원과 프로방스 중세 골목 마을을 거니는 서정적인 고품격 여행.',
    itinerary: []
  },
  {
    id: 'capri-boat',
    name: '카프리섬 일일 보트 투어',
    location: '카프리, 이탈리아',
    country: '이탈리아',
    price: 450000,
    priceDisplay: '₩450,000',
    rating: 4.8,
    reviewCount: 62,
    duration: '당일 투어',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJDaYtOl-JR9WF-SHPieSBjyKQ5d9UWlOljFfU-Gap0xQMJgi2gKlp02olvQMrVcz-wGc9mNNGCm0YeE4LqQkgnVm3yiCoNDU3HnhVO2wMJPvsyzVUOCDIuVfgVval5RqOvnfgq3k3jbzpDz48hGSkpVXORUxlMs3ySonCfJNTUNsHVjTy9upC3NN261Ij-Cg-9u7ayctmw1EUd4reFwigs8wIqSdNmhBze8agmb9hJKjzNEk4HVR9vEUHS-_XEz38MPRIOD__WADy',
    category: '해변',
    tags: ['푸른 동굴', '보트 라이드'],
    description: '신비로운 푸른 동굴(Grotta Azzurra)과 카프리 섬의 절경을 전용 스피드보트로 정복하는 하루.',
    itinerary: []
  }
];

export const INITIAL_TRIPS: Trip[] = [
  {
    id: 'trip-1',
    destinationId: 'positano-beach',
    title: '이탈리아 아말피 해안 7일 투어',
    location: '포지타노, 이탈리아',
    country: '이탈리아',
    startDate: '2024년 10월 12일',
    endDate: '10월 18일',
    price: 2450000,
    priceDisplay: '₩2,450,000',
    status: '예약 확정',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLx6DOhTtej_RvVCX4lKI3E4MQT_AmaawDC971s_kR18RB1cIyCwljAY4CmFkhQYW7YcXY2XjuWdymVVV3EbkFM4O0ItnFQiOvXIg5Y6Cdgw6S8v7I3JFIdGdwq1SOptxTGziz_WPpUtAGBYfFYzwM0kewA_lCaUSAHKAryW8UHmIAY-IDpxeRmvA_to7UWSSUvlL056G2GCgmk7ZpuKE6d7IVmqH9A01D83XZCvmRZ94IcThtwyFbHnZH93MDdqJisQ-fJqpLIaKj',
    participantsCount: 4,
    participantAvatars: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC97bj2bsNY8pyc_ytOYl1TWrNBxxtSHyT3k50waa0_FkS_OkskZHn81ahcr6XUybFBPjJFtF7OSLiR5sGu9WgRrnRM0caQ9fcWZzIzCkX7Jxq2fjyY6vSMiA2YRnet0FPe93mS7MeoZyQAoUhf4r7F-wF70CSvf1qAOX0K1zRSLenYumGO79RyoQB0H_ZtoB4XfVwg9VMS7dN4BgsrBdnTNNZLT8DQxC-KPW1iiC-YEK2Gh05dBvX7ZDVogwfEXz5riFt2B7vPo54r',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCVxxykvg6cADx8KpiZ6veZJSmwaX90RgLKBmGxfKZGn9LrYPZpCe1Kd1t02BFHsiyp5roL80rS7-mg2BUdzulQ6Jhx-3f_MbardaFBDEz-zMoED6JIWigBOc_SDSBn2Qknmq7CgwzZXpBPQsnIlVhzm96_7gsGPe3oFcZwmdwqiMLc0xAdnckniba2SAZrXhcmB7NWj4-RkqSQFnJwFKb9n1sP5LNSm-ANrucGtTrZ9O_XamELfsxRyVNwM2-FY5W-Jkl2ZcocF_sb'
    ],
    hotelNote: '5성급 해안 뷰 호텔 확정'
  },
  {
    id: 'trip-2',
    destinationId: 'tokyo-gourmet',
    title: '도쿄 미식 & 현대 건축 탐방',
    location: '도쿄, 일본',
    country: '일본',
    startDate: '2024년 11월 05일',
    endDate: '11월 09일',
    price: 1120000,
    priceDisplay: '₩1,120,000',
    status: '대기 중',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACVjBKbjUul2jpYd795Q9C7uBwkz9wdthGfYaqEgRn91m4APS-ZXh-VMSmf3-Mq-cua18ZtxDFSToVg18ViOXrcibQRseCLw-WFEkFpkUOrBWSTkGMaSsKB7xEypDd6M9u6CB5SI1iPaZ2nKcqQiT5R7EijM40XniSMDCVMmkoN-Uo5x6mt5FggGgbFCRMoG-R44fnEcpKPCyhwc4Za7og0wThKBzCS3IPKeObSNCGmWn-PXrnrPHbqCYmf1APzcuPeJvWpr3cGFUt',
    participantsCount: 2,
    hotelNote: '호텔 확인 중'
  },
  {
    id: 'trip-3',
    destinationId: 'zermatt-alps',
    title: '스위스 융프라우요흐 스키 캠프',
    location: '그린델발트, 스위스',
    country: '스위스',
    startDate: '2024년 12월 22일',
    endDate: '12월 30일',
    price: 3890000,
    priceDisplay: '₩3,890,000',
    status: '예약 확정',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBU5Ai3nh4z13xf3hlKu5yXC3LwEUZmVbK1pUBg57mXKsbBxgWD7iwcEMUVZPPxs0silSakSWSvoP3uuizdfucRovOcYSUnS1UldfMXvlJfHGsIBfY-jCjifLQYayrTYokbLEsWBrdQxU7v9SmXP5rfVPckgebtYRc531cbvjGu_gJtLRNfyeVpkvTVEE8G6OfNuqWHcLL194EnhMDnPRjH692vr4Z0PBODDZIKJe2SFDT-YtuJ2_BIgaheP7BUNe1SlpMYyjeml106',
    participantsCount: 3,
    badge: '인기 일정'
  },
  {
    id: 'trip-4',
    destinationId: 'bali-ubud',
    title: '인도네시아 발리 힐링 캠프',
    location: '우붓, 인도네시아',
    country: '인도네시아',
    startDate: '2024년 05월 10일',
    endDate: '05월 17일',
    price: 520000,
    priceDisplay: '₩520,000',
    status: '지난 여행',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRWiLlVR1-FdA_naJ76rjMCgDpXZz17wIK6Emk2xWvKleVeeaftHE5io8Woep_GFD7BPEikGzhuNImGZE1F0tCbhOONIlyWo8oKYmxbxVLycwjqzQwWWfpxF1zcO-iUSsoqfVTIPcvElqNdp_UZUGPdkWtVdKNtfHJBd6JnIAzRiSNST9PeHmemt6IyYkEhUjEnh2oVj3DW3Kx0Zi-lftuVHd3h15-jwahaNKgsut5fp8avTUr1-7rZmMvhcC55BF0LlPNNz8n0OQt',
    participantsCount: 2
  }
];
