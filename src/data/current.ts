import { QuizQuestion } from '../types';

export const currentQuestions: QuizQuestion[] = [
  {
    id: 61,
    question: 'ESG에서 "S"가 의미하는 것은?',
    options: ['안전(Safety)', '사회(Social)', '과학(Science)', '전략(Strategy)'],
    answer: 1,
    explanation:
      'ESG는 환경(Environmental), 사회(Social), 지배구조(Governance)의 약자로, 기업의 지속가능성을 평가하는 기준입니다.',
  },
  {
    id: 62,
    question: '메타버스(Metaverse)의 의미로 가장 적절한 것은?',
    options: [
      '초고속 인터넷 기술',
      '가상과 현실이 융합된 3차원 세계',
      '새로운 암호화폐 기술',
      '인공위성 통신 시스템',
    ],
    answer: 1,
    explanation:
      '메타버스는 "초월(Meta)"과 "세계(Universe)"의 합성어로, 가상과 현실이 융합된 3차원 디지털 공간을 뜻합니다.',
  },
  {
    id: 63,
    question: '탄소중립(Net Zero)이란 무엇을 의미하나요?',
    options: [
      '탄소 배출을 완전히 없애는 것',
      '탄소 배출량과 흡수량을 같게 만드는 것',
      '탄소세를 부과하는 정책',
      '탄소 거래 시장을 만드는 것',
    ],
    answer: 1,
    explanation:
      '탄소중립은 인간 활동에 의한 탄소 배출량을 최대한 줄이고, 남은 배출량만큼 흡수하여 순 배출량을 0으로 만드는 것입니다.',
  },
  {
    id: 64,
    question: '블록체인 기술의 핵심 특징은?',
    options: [
      '중앙 서버에서 모든 데이터를 관리',
      '분산 원장 기술로 데이터를 여러 노드에 저장',
      '데이터를 암호화하여 삭제하는 기술',
      '초고속 데이터 전송 기술',
    ],
    answer: 1,
    explanation:
      '블록체인은 분산 원장 기술(DLT)로, 데이터를 여러 참여자의 컴퓨터에 분산 저장하여 위변조를 방지하는 것이 핵심입니다.',
  },
  {
    id: 65,
    question: 'AI에서 "딥러닝(Deep Learning)"이란?',
    options: [
      '사람이 직접 규칙을 입력하는 프로그래밍',
      '인공 신경망을 여러 층으로 쌓아 학습하는 기술',
      '데이터를 깊이 있게 분석하는 통계 기법',
      '컴퓨터를 오래 학습시키는 방법',
    ],
    answer: 1,
    explanation:
      '딥러닝은 인공 신경망(Neural Network)을 여러 층(Layer)으로 깊게 구성하여 복잡한 패턴을 스스로 학습하는 머신러닝 기술입니다.',
  },
  {
    id: 66,
    question: 'GDP가 의미하는 것은?',
    options: [
      '국내총생산',
      '국민총소득',
      '정부 부채 비율',
      '국제 개발 프로그램',
    ],
    answer: 0,
    explanation:
      'GDP(Gross Domestic Product)는 국내총생산으로, 한 나라 안에서 일정 기간 동안 생산된 모든 재화와 서비스의 시장 가치 합계입니다.',
  },
  {
    id: 67,
    question: 'OTT 서비스란 무엇인가요?',
    options: [
      '오프라인 영화관 서비스',
      '인터넷을 통해 미디어 콘텐츠를 제공하는 서비스',
      '위성 TV 서비스',
      '라디오 스트리밍 서비스',
    ],
    answer: 1,
    explanation:
      'OTT(Over The Top)는 기존 방송 인프라 없이 인터넷을 통해 영상, 음악 등 미디어 콘텐츠를 제공하는 서비스입니다. 넷플릭스, 웨이브 등이 대표적입니다.',
  },
  {
    id: 68,
    question: '챗GPT와 같은 대규모 언어 모델(LLM)의 기반 기술은?',
    options: [
      '관계형 데이터베이스',
      '트랜스포머(Transformer) 아키텍처',
      'TCP/IP 프로토콜',
      '양자 컴퓨팅',
    ],
    answer: 1,
    explanation:
      'GPT 등 대규모 언어 모델은 2017년 구글이 발표한 트랜스포머(Transformer) 아키텍처를 기반으로 합니다. 자기 주의(Self-Attention) 메커니즘이 핵심입니다.',
  },
  {
    id: 69,
    question: '파리기후협약에서 설정한 지구 평균 기온 상승 억제 목표는?',
    options: [
      '산업화 이전 대비 1.5도 이내',
      '산업화 이전 대비 3도 이내',
      '현재 대비 0.5도 이내',
      '매년 0.1도씩 감소',
    ],
    answer: 0,
    explanation:
      '2015년 파리기후협약은 지구 평균 기온 상승을 산업화 이전 대비 2도보다 훨씬 아래로, 가능하면 1.5도 이내로 제한하는 것을 목표로 합니다.',
  },
  {
    id: 70,
    question: '핀테크(FinTech)에서 "Fin"이 의미하는 것은?',
    options: [
      'Final(최종)',
      'Finance(금융)',
      'Find(발견)',
      'Fine(정밀)',
    ],
    answer: 1,
    explanation:
      '핀테크는 Finance(금융)와 Technology(기술)의 합성어로, IT 기술을 활용한 혁신적인 금융 서비스를 뜻합니다.',
  },
  {
    id: 71,
    question: 'SDGs(지속가능발전목표)를 채택한 국제기구는?',
    options: ['WHO', 'WTO', 'UN', 'NATO'],
    answer: 2,
    explanation:
      'SDGs(Sustainable Development Goals)는 2015년 UN 총회에서 채택한 17개 지속가능발전목표로, 2030년까지 달성을 목표로 합니다.',
  },
  {
    id: 72,
    question: '반도체에서 "파운드리(Foundry)"란?',
    options: [
      '반도체를 설계만 하는 회사',
      '반도체를 위탁 생산하는 공장',
      '반도체 장비를 만드는 회사',
      '반도체 소재를 공급하는 회사',
    ],
    answer: 1,
    explanation:
      '파운드리는 반도체 위탁 생산 전문 공장을 말합니다. TSMC, 삼성전자 파운드리 사업부가 대표적입니다.',
  },
  {
    id: 73,
    question: '클라우드 컴퓨팅의 서비스 모델 중 "SaaS"란?',
    options: [
      '서버를 직접 구매하는 서비스',
      '인프라를 빌려쓰는 서비스',
      '소프트웨어를 인터넷으로 제공하는 서비스',
      '보안을 전문으로 하는 서비스',
    ],
    answer: 2,
    explanation:
      'SaaS(Software as a Service)는 소프트웨어를 설치 없이 인터넷을 통해 이용하는 클라우드 서비스 모델입니다. 구글 독스, 슬랙 등이 대표적입니다.',
  },
  {
    id: 74,
    question: '그린워싱(Greenwashing)이란?',
    options: [
      '친환경 세탁 기술',
      '실제로는 친환경적이지 않으면서 친환경인 것처럼 홍보하는 행위',
      '녹색 에너지로 전환하는 과정',
      '환경 오염을 정화하는 기술',
    ],
    answer: 1,
    explanation:
      '그린워싱은 기업이 실질적인 친환경 노력 없이 마케팅으로만 친환경 이미지를 내세우는 위장 환경주의를 뜻합니다.',
  },
  {
    id: 75,
    question: '빅데이터의 3V에 해당하지 않는 것은?',
    options: [
      'Volume(규모)',
      'Velocity(속도)',
      'Variety(다양성)',
      'Visibility(가시성)',
    ],
    answer: 3,
    explanation:
      '빅데이터의 3V는 Volume(데이터의 규모), Velocity(데이터 생성 속도), Variety(데이터의 다양성)입니다. Visibility는 3V에 포함되지 않습니다.',
  },
];
