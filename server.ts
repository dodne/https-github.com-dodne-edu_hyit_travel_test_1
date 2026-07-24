import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Health Check API
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Live Traffic & Transport Data API
app.get("/api/traffic/live", (req, res) => {
  const destination = req.query.destination as string || "전체";
  
  // Real-time dynamic noise for simulated live fluctuation
  const now = new Date();
  const minuteSeed = Math.floor(now.getTime() / (1000 * 30)); // updates every 30s
  
  const trafficData = [
    {
      id: "positano",
      name: "이탈리아 포지타노 (아말피 해안)",
      location: "Positano, Italy",
      status: "서행", // 원활, 서행, 정체
      congestionIndex: 68 + (minuteSeed % 12),
      temperature: "24°C",
      weather: "맑음",
      transitOptions: [
        {
          type: "flight",
          name: "인천(ICN) -> 나폴리(NAP) 항공편",
          duration: "14시간 20분",
          price: "₩1,250,000",
          status: "정시 운항",
          delayMinutes: 0,
          notes: "직항/1회 경유 최단 노선"
        },
        {
          type: "car",
          name: "나폴리 공항 -> 포지타노 해안도로 (SS163)",
          duration: "1시간 15분",
          price: "₩120,000 (전용 셔틀/택시)",
          status: "해안 구간 정체",
          delayMinutes: 15,
          notes: "통행량 증가로 해안도로 15분 지연 발생 중"
        },
        {
          type: "ferry",
          name: "살레르노/소렌토 페리 쾌속선",
          duration: "45분",
          price: "₩35,000",
          status: "정시 운항",
          delayMinutes: 0,
          notes: "해상 날씨 양호, 원활한 운항 중"
        }
      ]
    },
    {
      id: "tokyo",
      name: "도쿄 미식 & 현대 건축 탐방",
      location: "Tokyo, Japan",
      status: "원활",
      congestionIndex: 42 + (minuteSeed % 8),
      temperature: "18°C",
      weather: "구름 조금",
      transitOptions: [
        {
          type: "flight",
          name: "김포(GMP) -> 하네다(HND)",
          duration: "2시간 10분",
          price: "₩380,000",
          status: "정시 운항",
          delayMinutes: 0,
          notes: "출국 수속 평균 15분 소요"
        },
        {
          type: "train",
          name: "하네다 공항 -> 도쿄역 (도쿄 모노레일/JR)",
          duration: "28분",
          price: "₩6,800",
          status: "원활",
          delayMinutes: 0,
          notes: "3분 간격 배차, 실시간 혼잡도 낮음"
        }
      ]
    },
    {
      id: "swiss",
      name: "스위스 융프라우요흐 스키 캠프",
      location: "Grindelwald, Switzerland",
      status: "원활",
      congestionIndex: 25 + (minuteSeed % 5),
      temperature: "-2°C",
      weather: "눈",
      transitOptions: [
        {
          type: "flight",
          name: "인천(ICN) -> 취리히(ZRH)",
          duration: "13시간 45분",
          price: "₩1,420,000",
          status: "정시 운항",
          delayMinutes: 0,
          notes: "스위스항공 직항"
        },
        {
          type: "train",
          name: "취리히 중앙역 -> 그린델발트 (SBB 고속철도)",
          duration: "2시간 35분",
          price: "₩95,000",
          status: "원활",
          delayMinutes: 0,
          notes: "정시율 99.2%, 퐁텐블로 환승 원활"
        }
      ]
    },
    {
      id: "bali",
      name: "인도네시아 발리 우붓 힐링 투어",
      location: "Bali, Indonesia",
      status: "서행",
      congestionIndex: 60 + (minuteSeed % 15),
      temperature: "29°C",
      weather: "소나기 유의",
      transitOptions: [
        {
          type: "flight",
          name: "인천(ICN) -> 덴파사르(DPS)",
          duration: "7시간 00분",
          price: "₩620,000",
          status: "정시 운항",
          delayMinutes: 0,
          notes: "가장 빠른 오후 출발편"
        },
        {
          type: "car",
          name: "응우라라이 공항 -> 우붓 중심가 (차량)",
          duration: "1시간 20분",
          price: "₩35,000",
          status: "시내 구간 서행",
          delayMinutes: 20,
          notes: "우붓 입구 도로 공사로 20분 지연"
        }
      ]
    }
  ];

  if (destination && destination !== "전체") {
    const filtered = trafficData.filter(
      (t) =>
        t.name.toLowerCase().includes(destination.toLowerCase()) ||
        t.location.toLowerCase().includes(destination.toLowerCase()) ||
        t.id.toLowerCase().includes(destination.toLowerCase())
    );
    return res.json({ success: true, timestamp: now.toISOString(), data: filtered.length > 0 ? filtered : trafficData });
  }

  res.json({ success: true, timestamp: now.toISOString(), data: trafficData });
});

// AI Route & Traffic Calculator API powered by Gemini
app.post("/api/ai/traffic-route", async (req, res) => {
  try {
    const { origin, destination, departureTime, travelMode } = req.body;

    if (!origin || !destination) {
      return res.status(400).json({
        error: "출발지와 목적지를 입력해주세요.",
      });
    }

    const ai = getGenAI();
    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not set
      return res.json({
        success: true,
        summary: `${origin}에서 ${destination}까지의 실시간 예상 경로 정보입니다.`,
        estimatedDuration: "1시간 25분",
        estimatedCostKRW: 48000,
        congestionLevel: "보통 (원활~서행)",
        trafficTips: [
          "실시간 통행량이 안정적입니다.",
          "오후 5시 이후 퇴근길 정체가 시작되므로 4시 이전 출발을 권장합니다.",
          "대중교통 이용 시 환승 대기 시간이 약 5분 단축됩니다."
        ],
        routes: [
          {
            mode: travelMode || "대중교통/고속철도",
            name: "최단 시간 추천 경로",
            duration: "1시간 20분",
            price: "₩42,000",
            congestion: "원활",
            description: `${origin} 출발 → 주요 환승 거점 → ${destination} 도착`
          },
          {
            mode: "차량/택시",
            name: "편안한 도로 직행 경로",
            duration: "1시간 35분",
            price: "₩65,000 (통행료 포함)",
            congestion: "서행 (구간 정체)",
            description: "고속도로 구간 일부 서행 중"
          }
        ]
      });
    }

    const prompt = `당신은 세계적인 실시간 교통 및 여행 경로 전문가 AI입니다.
출발지: "${origin}"
목적지: "${destination}"
출발 예정 시간: "${departureTime || "현재"}"
선택된 이동 수단: "${travelMode || "전체 (최적 비교)"}"

다음 지침에 맞춰 한국어로 분석하여 JSON 포맷으로만 응답해주세요:
{
  "summary": "경로에 대한 명확하고 친절한 한 줄 실시간 요약",
  "estimatedDuration": "예상 소요 시간 (예: 2시간 15분)",
  "estimatedCostKRW": 85000 (예상 비용 숫자, 원화 기준),
  "congestionLevel": "교통 상태 (원활 / 보통 / 서행 / 원활함 등)",
  "trafficTips": [
    "실시간 팁 1 (실시간 교통 혼잡 회피 전략)",
    "실시간 팁 2 (날씨 및 출발 시각 추천)",
    "실시간 팁 3 (비용 절약 또는 최단 환승 팁)"
  ],
  "routes": [
    {
      "mode": "이동수단 (항공/철도/차량/페리 등)",
      "name": "경로명 (예: KTX 고속철도 + 직행버스)",
      "duration": "소요시간 (예: 1시간 40분)",
      "price": "₩45,000",
      "congestion": "원활/서행/정체 중 하나",
      "description": "경로에 대한 상세 설명 및 환승 안내"
    },
    {
      "mode": "차량/렌터카/택시",
      "name": "경로명 (예: 고속도로 직행)",
      "duration": "소요시간 (예: 2시간 10분)",
      "price": "₩78,000",
      "congestion": "서행",
      "description": "톨게이트비 포함 및 도로 혼잡도 안내"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text || "{}";
    const parsedData = JSON.parse(responseText);

    return res.json({
      success: true,
      ...parsedData,
    });
  } catch (error) {
    console.error("Traffic AI route error:", error);
    res.status(500).json({
      error: "실시간 교통 경로를 분석하는 중 오류가 발생했습니다.",
    });
  }
});

// Setup Vite / Production Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Vibrant Odyssey server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
