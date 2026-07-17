# Nav-Smart Manager: Design System & Identity

본 문서는 한화에어로스페이스(Hanwha Aerospace)의 브랜드 아이덴티티와 웹 디자인 가이드를 기반으로 한 **Nav-Smart Manager**의 디자인 원칙을 정의합니다.

## 1. 브랜드 핵심 가치 (Brand Core)
- **Trust & Quality**: 방산 및 항공우주 산업의 신뢰성과 정밀한 품질을 상징.
- **Innovation**: 데이터 기반의 스마트한 생산 환경과 미래 지향적 기술력.
- **Solidness**: 견고하고 단단한 산업 현장의 느낌을 현대적인 UI로 재해석.

## 2. 컬러 팔레트 (Color Palette)

### Primary Colors
- **Hanwha Orange** (`#FF6B00`): 한화의 역동성과 에너지를 상징하는 메인 포인트 컬러. 주요 버튼, 강조 텍스트, 상태 인디케이터에 사용.
- **Hanwha Dark** (`#1A1A1A` / `#0F0F0F`): 정밀 기기와 생산 현장의 무게감을 전달하는 배경 및 다크 모드 메인 컬러.

### Secondary Colors
- **Industrial Gray** (`#2D2D2D` / `#404040`): 패널 경계, 보조 텍스트, 비활성 상태 표시.
- **Success Green** (`#4ADE80`): 공정 최적화 및 품질 합격 상태 표시.
- **Alert Red** (`#EF4444`): 불량 발생, 단종 리스크, 긴급 경고 표시.

## 3. 타이포그래피 (Typography)

### 한글 (Korean)
- **Pretendard / Inter**: 가독성이 높고 현대적인 Sans-serif 폰트 사용.
- **Weight**: 
  - Heading: 700 (Bold)
  - Subheading: 600 (Semi-bold)
  - Body: 400 (Regular)

### 데이터 및 영문 (Data & English)
- **JetBrains Mono**: 에러 코드, 부품 번호, 시계열 데이터 등 정형 데이터의 가독성을 위해 고정폭(Monospace) 폰트 사용.

## 4. UI 구성 요소 및 레이아웃 (UI Components & Layout)

### Glassmorphism & Panel
- **Glass Panel**: 배경이 살짝 투명하게 비치는 다크 패널을 사용하여 깊이감(Depth)과 세련미를 부여.
- **Border**: 아주 미세한 `white/5` 혹은 `white/10` 테두리를 사용하여 패널 간 경계를 명확히 함.

### Data Visualization
- **Clean Grids**: 10년 치 방대한 데이터를 다루므로, 불필요한 장식을 배제하고 데이터 본연의 가독성에 집중.
- **Animated Graphs**: `motion` 라이브러리를 활용하여 차트 로딩 시 부드러운 전입 효과 부여.

### Iconography
- **Lucide-react**: 선의 굵기가 일정하고 깔끔한 미니멀리즘 아이콘 사용.
- **Consistency**: 아이콘의 색상은 해당 기능의 상태(정상/경고/위험)와 일치시킴.

## 5. 디자인 철학 (Design Philosophy)
- **Desktop-First**: 현장 PC 환경(와이드 모니터)에 최적화된 대시보드 레이아웃.
- **Security Visibility**: 폐쇄망 보안 환경임을 인지할 수 있는 시스템 노드 상태 표시줄 포함.
- **Efficiency**: 작업자가 최소한의 클릭으로 필요한 정보(에러 코드 해결책 등)에 도달할 수 있는 UX 설계.
