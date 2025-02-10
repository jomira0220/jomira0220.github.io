const storeDB = {
  Seoul: [
    {
      storeOpen: "preparing",
      storeCodeName: "M-01",
      storeName: "당곡역점",
      storeAddress: "서울특별시 관악구 보라매로 2, 104(봉천동,신흥빌딩)",
      storeDistance: "98m",
    },
    {
      storeOpen: "open",
      storeCodeName: "M-02",
      storeName: "보라매타운점",
      storeAddress:
        "서울특별시 관악구 신대방동 395-69 보라매아카데미타워 101-3",
      storeDistance: "300m",
    },
    {
      storeOpen: "open",
      storeCodeName: "M-03",
      storeName: "신림역사거리점",
      storeAddress: "서울특별시 관악구 남부순환로 1617,17",
      storeDistance: "662m",
    },
    {
      storeOpen: "open",
      storeCodeName: "M-04",
      storeName: "신림역점",
      storeAddress: "서울특별시 관악구 신림로 321",
      storeDistance: "813m",
    },
    {
      storeOpen: "open",
      storeCodeName: "M-05",
      storeName: "신대방삼거리역점",
      storeAddress: "서울특별시 관악구 보라매로 113",
      storeDistance: "1.06km",
    },
    {
      storeOpen: "open",
      storeCodeName: "M-06",
      storeName: "봉일시장점",
      storeAddress: "서울특별시 관악구 은천로 37",
      storeDistance: "1.18km",
    },
    {
      storeOpen: "open",
      storeCodeName: "M-07",
      storeName: "보라매역점",
      storeAddress: "서울특별시 영등포구 여의대방로 137",
      storeDistance: "1.12km",
    },
    {
      storeOpen: "open",
      storeCodeName: "M-08",
      storeName: "보라매공원점",
      storeAddress: "서울특별시 영등포구 여의대방로 87",
      storeDistance: "1.24km",
    },
    {
      storeOpen: "open",
      storeCodeName: "M-09",
      storeName: "신대방역점",
      storeAddress: "서울특별시 관악구 난곡로 367",
      storeDistance: "1.26km",
    },
    {
      storeOpen: "open",
      storeCodeName: "M-10",
      storeName: "보라매점",
      storeAddress: "서울특별시 동작구 신대방동 707",
      storeDistance: "1.4km",
    },
  ],
};

const menuDB = {
  "커피(ICE)": {
    "CI-0001": {
      //prdCodeName: "CI-0001",
      prdName: { ko: "아메리카노", en: "Americano" },
      prdDes:
        "메가MGC커피 블렌드 원두로 추출한 에스프레소에 물을 더해, 풍부한 바디감을 느낄 수 있는 스탠다드 커피.",
      prdPrice: 2000,
      prdCategory: {
        language: { ko: "커피", en: "Coffee" },
        temperature: "ICE",
      },
      prdOption: {
        option_1: {
          title: "농도",
          0: ["선택안함", 0],
          1: ["연하게", 0],
          2: ["샷 추가 +500", 500],
          3: ["2샷 추가 +1000", 1000],
        },
        option_2: {
          title: "추가",
          0: ["선택안함", 0],
          1: ["스테비아추가 +600", 600],
        },
        option_3: {
          title: "개인텀블러 사용(텀블러 크기에 따라 정량보다 적게 제공)",
          0: ["선택안함", 0],
          1: ["텀블러(개인컵사용)", 0],
        },
      },
      prdRecommended: ["DE-0001", "DE-0002"],
    },
    "CI-0002": {
      //prdCodeName: "CI-0002",
      prdName: { ko: "바닐라라떼", en: "Vanilla Latte" },
      prdDes:
        "바닐라의 짙은 향과 풍부한 폼 밀크의 조화가 인상적인 달콤한 라떼.",
      prdPrice: 3400,
      prdCategory: {
        language: { ko: "커피", en: "Coffee" },
        temperature: "ICE",
      },
      prdOption: {
        option_1: {
          title: "농도",
          0: ["선택안함", 0],
          1: ["연하게", 0],
          2: ["샷 추가 +500", 500],
          3: ["2샷 추가 +1000", 1000],
        },
        option_2: {
          title: "추가",
          0: ["선택안함", 0],
          1: ["바닐라시럽추가 +500", 500],
          2: ["라이트바닐라시럽변경 +300", 300],
          3: ["라이트바닐라시럽추가 +800", 800],
          4: ["꿀추가 +700", 700],
        },
        option_3: {
          title: "개인텀블러 사용(텀블러 크기에 따라 정량보다 적게 제공)",
          0: ["선택안함", 0],
          1: ["텀블러(개인컵사용)", 0],
        },
      },
      prdRecommended: ["DE-0001", "DE-0002"],
    },
    "CI-0003": {
      //prdCodeName: "CI-0001",
      prdName: { ko: "아메리카노", en: "Americano" },
      prdDes:
        "메가MGC커피 블렌드 원두로 추출한 에스프레소에 물을 더해, 풍부한 바디감을 느낄 수 있는 스탠다드 커피.",
      prdPrice: 2000,
      prdCategory: {
        language: { ko: "커피", en: "Coffee" },
        temperature: "ICE",
      },
      prdOption: {
        option_1: {
          title: "농도",
          0: ["선택안함", 0],
          1: ["연하게", 0],
          2: ["샷 추가 +500", 500],
          3: ["2샷 추가 +1000", 1000],
        },
        option_2: {
          title: "추가",
          0: ["선택안함", 0],
          1: ["스테비아추가 +600", 600],
        },
        option_3: {
          title: "개인텀블러 사용(텀블러 크기에 따라 정량보다 적게 제공)",
          0: ["선택안함", 0],
          1: ["텀블러(개인컵사용)", 0],
        },
      },
      prdRecommended: ["DE-0001", "DE-0002"],
    },
    "CI-0004": {
      //prdCodeName: "CI-0002",
      prdName: { ko: "바닐라라떼", en: "Vanilla Latte" },
      prdDes:
        "바닐라의 짙은 향과 풍부한 폼 밀크의 조화가 인상적인 달콤한 라떼.",
      prdPrice: 3400,
      prdCategory: {
        language: { ko: "커피", en: "Coffee" },
        temperature: "ICE",
      },
      prdOption: {
        option_1: {
          title: "농도",
          0: ["선택안함", 0],
          1: ["연하게", 0],
          2: ["샷 추가 +500", 500],
          3: ["2샷 추가 +1000", 1000],
        },
        option_2: {
          title: "추가",
          0: ["선택안함", 0],
          1: ["바닐라시럽추가 +500", 500],
          2: ["라이트바닐라시럽변경 +300", 300],
          3: ["라이트바닐라시럽추가 +800", 800],
          4: ["꿀추가 +700", 700],
        },
        option_3: {
          title: "개인텀블러 사용(텀블러 크기에 따라 정량보다 적게 제공)",
          0: ["선택안함", 0],
          1: ["텀블러(개인컵사용)", 0],
        },
      },
      prdRecommended: ["DE-0001", "DE-0002"],
    },
  },

  "커피(HOT)": {
    "CH-0001": {
      //prdCodeName: "CH-0001",
      prdName: { ko: "아메리카노", en: "Americano" },
      prdDes:
        "메가MGC커피 블렌드 원두로 추출한 에스프레소에 물을 더해, 풍부한 바디감을 느낄 수 있는 스탠다드 커피.",
      prdPrice: 1500,
      prdCategory: {
        language: { ko: "커피", en: "Coffee" },
        temperature: "HOT",
      },
      prdOption: {
        option_1: {
          title: "농도",
          0: ["선택안함", 0],
          1: ["연하게", 0],
          2: ["샷 추가 +500", 500],
          3: ["2샷 추가 +1000", 1000],
        },
        option_2: {
          title: "추가",
          0: ["선택안함", 0],
          1: ["스테비아추가 +600", 600],
        },
        option_3: {
          title: "개인텀블러 사용(텀블러 크기에 따라 정량보다 적게 제공)",
          0: ["선택안함", 0],
          1: ["텀블러(개인컵사용)", 0],
        },
      },
      prdRecommended: ["DE-0001", "DE-0002"],
    },
    "CH-0002": {
      //prdCodeName: "CH-0002",
      prdName: { ko: "바닐라라떼", en: "Vanilla Latte" },
      prdDes: "바닐라의 짙은 향과 풍부한 폼 밀크의 조화가 인상적인 달콤한 라떼",
      prdPrice: 3400,
      prdCategory: {
        language: { ko: "커피", en: "Coffee" },
        temperature: "HOT",
      },
      prdOption: {
        option_1: {
          title: "농도",
          0: ["선택안함", 0],
          1: ["연하게", 0],
          2: ["샷 추가 +500", 500],
          3: ["2샷 추가 +1000", 1000],
        },
        option_2: {
          title: "추가",
          0: ["선택안함", 0],
          1: ["바닐라시럽추가 +500", 500],
          2: ["라이트바닐라시럽변경 +300", 300],
          3: ["라이트바닐라시럽추가 +800", 800],
          4: ["꿀추가 +700", 700],
        },
        option_3: {
          title: "개인텀블러 사용(텀블러 크기에 따라 정량보다 적게 제공)",
          0: ["선택안함", 0],
          1: ["텀블러(개인컵사용)", 0],
        },
      },
      prdRecommended: ["DE-0001", "DE-0002"],
    },
    "CH-0003": {
      //prdCodeName: "CH-0001",
      prdName: { ko: "아메리카노", en: "Americano" },
      prdDes:
        "메가MGC커피 블렌드 원두로 추출한 에스프레소에 물을 더해, 풍부한 바디감을 느낄 수 있는 스탠다드 커피.",
      prdPrice: 1500,
      prdCategory: {
        language: { ko: "커피", en: "Coffee" },
        temperature: "HOT",
      },
      prdOption: {
        option_1: {
          title: "농도",
          0: ["선택안함", 0],
          1: ["연하게", 0],
          2: ["샷 추가 +500", 500],
          3: ["2샷 추가 +1000", 1000],
        },
        option_2: {
          title: "추가",
          0: ["선택안함", 0],
          1: ["스테비아추가 +600", 600],
        },
        option_3: {
          title: "개인텀블러 사용(텀블러 크기에 따라 정량보다 적게 제공)",
          0: ["선택안함", 0],
          1: ["텀블러(개인컵사용)", 0],
        },
      },
      prdRecommended: ["DE-0001", "DE-0002"],
    },
    "CH-0004": {
      //prdCodeName: "CH-0002",
      prdName: { ko: "바닐라라떼", en: "Vanilla Latte" },
      prdDes: "바닐라의 짙은 향과 풍부한 폼 밀크의 조화가 인상적인 달콤한 라떼",
      prdPrice: 3400,
      prdCategory: {
        language: { ko: "커피", en: "Coffee" },
        temperature: "HOT",
      },
      prdOption: {
        option_1: {
          title: "농도",
          0: ["선택안함", 0],
          1: ["연하게", 0],
          2: ["샷 추가 +500", 500],
          3: ["2샷 추가 +1000", 1000],
        },
        option_2: {
          title: "추가",
          0: ["선택안함", 0],
          1: ["바닐라시럽추가 +500", 500],
          2: ["라이트바닐라시럽변경 +300", 300],
          3: ["라이트바닐라시럽추가 +800", 800],
          4: ["꿀추가 +700", 700],
        },
        option_3: {
          title: "개인텀블러 사용(텀블러 크기에 따라 정량보다 적게 제공)",
          0: ["선택안함", 0],
          1: ["텀블러(개인컵사용)", 0],
        },
      },
      prdRecommended: ["DE-0001", "DE-0002"],
    },
  },
  Tea: {
    "TH-0001": {
      //prdCodeName: "TH-0001",
      prdName: { ko: "녹차", en: "Green Tea" },
      prdDes:
        "고소한 감칠맛과 부드러운 목넘김으로 산뜻하게 마음을 위로하는 국내산 녹차.",
      prdPrice: 2500,
      prdCategory: {
        language: { ko: "티", en: "Tea" },
        temperature: "HOT",
      },
      prdOption: {
        option_1: {
          title: "추가",
          0: ["선택안함", 0],
          2: ["꿀추가 +700", 700],
        },
        option_2: {
          title: "개인텀블러 사용(텀블러 크기에 따라 정량보다 적게 제공)",
          0: ["선택안함", 0],
          1: ["텀블러(개인컵사용)", 0],
        },
      },
      prdRecommended: ["DE-0001", "DE-0002"],
    },
    "TH-0002": {
      //prdCodeName: "TH-0002",
      prdName: { ko: "얼그레이", en: "Earl Grey" },
      prdDes: "홍차 특유의 풍부한 플레이버를 만끽할 수 있는 허브티.",
      prdPrice: 2500,
      prdCategory: {
        language: { ko: "티", en: "Tea" },
        temperature: "HOT",
      },
      prdOption: {
        option_1: {
          title: "추가",
          0: ["선택안함", 0],
          2: ["꿀추가 +700", 700],
        },
        option_2: {
          title: "개인텀블러 사용(텀블러 크기에 따라 정량보다 적게 제공)",
          0: ["선택안함", 0],
          1: ["텀블러(개인컵사용)", 0],
        },
      },
      prdRecommended: ["DE-0001", "DE-0002"],
    },
    "TI-0001": {
      //prdCodeName: "TI-0001",
      prdName: { ko: "녹차", en: "Green Tea" },
      prdDes:
        "고소한 감칠맛과 부드러운 목넘김으로 산뜻하게 마음을 위로하는 국내산 녹차.",
      prdPrice: 2500,
      prdCategory: {
        language: { ko: "티", en: "Tea" },
        temperature: "ICE",
      },
      prdOption: {
        option_1: {
          title: "추가",
          0: ["선택안함", 0],
          1: ["꿀추가 +700", 700],
        },
        option_2: {
          title: "개인텀블러 사용(텀블러 크기에 따라 정량보다 적게 제공)",
          0: ["선택안함", 0],
          1: ["텀블러(개인컵사용)", 0],
        },
      },
      prdRecommended: ["DE-0001", "DE-0002"],
    },
    "TI-0002": {
      //prdCodeName: "TI-0002",
      prdName: { ko: "얼그레이", en: "Earl Grey" },
      prdDes: "홍차 특유의 풍부한 플레이버를 만끽할 수 있는 허브티.",
      prdPrice: 2500,
      prdCategory: {
        language: { ko: "티", en: "Tea" },
        temperature: "ICE",
      },
      prdOption: {
        option_1: {
          title: "추가",
          0: ["선택안함", 0],
          2: ["꿀추가 +700", 700],
        },
        option_2: {
          title: "개인텀블러 사용(텀블러 크기에 따라 정량보다 적게 제공)",
          0: ["선택안함", 0],
          1: ["텀블러(개인컵사용)", 0],
        },
      },
      prdRecommended: ["DE-0001", "DE-0002"],
    },
  },

  디저트: {
    "DE-0001": {
      //prdCodeName: "DE-0001",
      prdName: { ko: "버터소금빵(쥬에그잼)", en: "Salty Butter Roll" },
      prdDes:
        "고소한 프랑스산 버터를 품어, 더 부드럽고 짭쪼롬하게 즐길 수 있는 베이커리 메뉴",
      prdPrice: 3500,
      prdCategory: {
        language: { ko: "디저트", en: "Dessert" },
        temperature: "none",
      },
      prdOption: {
        option_1: {
          title: "기본 제공 잼 선택",
          0: ["쥬에그잼(딸기)", 0],
          1: ["쥬에그잼(살구)", 0],
        },
        option_2: {
          title: "잼 추가 구매",
          0: ["선택안함", 0],
          1: ["쥬에그잼(딸기)+800", 800],
          2: ["쥬에그잼(살구)+800", 800],
        },
      },
      prdRecommended: ["CI-0001", "CI-0002"],
    },
    "DE-0002": {
      //prdCodeName: "DE-0002",
      prdName: { ko: "크루아상", en: "Croissant" },
      prdDes:
        "바삭하고 부드러운 식감에 고소한 버터향을 가득 담은 베이커리 메뉴.",
      prdPrice: 3500,
      prdCategory: {
        language: { ko: "디저트", en: "Dessert" },
        temperature: "none",
      },
      prdOption: {
        option_1: {
          title: "기본 제공 잼 선택",
          0: ["쥬에그잼(딸기)", 0],
          1: ["쥬에그잼(살구)", 0],
        },
        option_2: {
          title: "잼 추가 구매",
          0: ["선택안함", 0],
          1: ["쥬에그잼(딸기)+800", 800],
          2: ["쥬에그잼(살구)+800", 800],
        },
      },
      prdRecommended: ["CI-0001", "CI-0002"],
    },
  },
};

const orderDB = {
  "M-02": {
    //storeCodeName: "M-02",
    storeName: "보라매타운점",
    orderMenu: [
      {
        prdCodeName: "CH-0001",
        prdName: "(HOT)아메리카노",
        prdOption: {
          option_1: {
            title: "농도",
            2: ["샷 추가 +500", 500],
          },
          option_2: {
            title: "추가",
            0: ["선택안함", 0],
          },
          option_3: {
            title: "개인텀블러 사용",
            0: "선택안함",
          },
        },
        prdCount: 1,
      },
      {
        prdCodeName: "DE-0001",
        prdName: "버터소금빵(쥬에그잼)",
        prdOption: {
          option_1: {
            title: "기본 제공 잼 선택",
            0: ["쥬에그잼(딸기)", 0],
          },
          option_2: {
            title: "추가",
            0: ["선택안함", 0],
            1: ["쥬에그잼(딸기)+800", 800],
          },
          option_3: {
            title: "개인텀블러 사용",
            1: "텀블러(개인컵사용)",
          },
        },
        prdCount: 1,
      },
    ],
    totalPrice: 0,
    totalPrdCount: 0,
    orderersName: "조미라",
    orderersId: "admin",
    orderPhone: "01012345678",
    orderAddress: "서울시 광진구 천호대로 119길 89",
  },
};

const memberDB = {
  Admin: [
    {
      id: "admin",
      password: "123123",
    },
  ],
  Member: [
    {
      memberName: "조미라",
      id: "Memberid_01",
      password: "123123",
      birthDay: "91-02-20",
      joinDay: "23-03-13",
      phoneNum: "01012341234",
      coupon: 2,
      stamp: 2,
      totalOrder: 1,
      totalOrderPrice: 10000,
      userRecommended:["CI-0001","DE-0001","CI-0002","DE-0002","TI-0001","TH-0001"],
      recentOrdermenu: {
        oneWeek: [
          {
            prdCodeName: "CH-0001",
            prdName: "(HOT)아메리카노",
            prdOption: {
              option_1: {
                title: "농도",
                2: ["샷 추가 +500", 500],
              },
              option_2: {
                title: "추가",
                0: ["선택안함", 0],
              },
              option_3: {
                title: "개인텀블러 사용",
                0: "선택안함",
              },
            },
            prdCount: 1,
          },
          {
            prdCodeName: "DE-0001",
            prdName: "버터소금빵(쥬에그잼)",
            prdOption: {
              option_1: {
                title: "기본 제공 잼 선택",
                0: ["쥬에그잼(딸기)", 0],
              },
              option_2: {
                title: "추가",
                0: ["선택안함", 0],
                1: ["쥬에그잼(딸기)+800", 800],
              },
              option_3: {
                title: "개인텀블러 사용",
                1: "텀블러(개인컵사용)",
              },
            },
            prdCount: 1,
          },
        ],
        oneMonth: [],
        threeMonth: [],
        all: [],
      },
    },
  ],
};

export { storeDB, menuDB, memberDB, orderDB };
