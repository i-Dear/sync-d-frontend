# Sync-D: 실시간 아이디어 기획 협업 플랫폼

![i-dear_Sync-D.png](https://github.com/i-Dear/sync-d-frontend/assets/121740394/a32eab2b-1d4b-4c08-b7fd-9700c68a0fd5)

- 배포 URL : [https://syncd.i-dear.org/](https://syncd.i-dear.org/)

## 프로젝트 소개

- Sync-D는 디자인씽킹, 애자일 방법론에 기반하여 디자인된 체계적인 문제 인식을 통한 기획 및 소프트웨어 설계 가이드라인을 제공하는 실시간 아이디어 기획 협업 플랫폼입니다.
- 유저는 프로젝트를 생성 후 팀원을 초대하거나, 초대를 받아 기획 프로세스를 진행할 수 있습니다.
- 기획 프로세스는 총 12단계로 구성되어 있으며 아래의 순서대로 진행됩니다.

1. 아이스브레이킹
2. 개인 및 팀 목표 설정
3. 문제 소개 및 주제 선정
4. 페르소나 작성
5. 문제 재정의 및 탐색, 관심 문제 선정 (WHAT)
6. 근본 원인 파악 (WHY)

7. 해결 방안 모색 (HOW)
8. 서비스 타겟 및 제공 가치 및 솔루션 결정
9. 비즈니스 모델 작성
10. 유저 시나리오 작성
11. AI 기반 유저스토리 작성
12. 메뉴 트리 작성

- 프로젝트 내에서는 참여자들의 커서, 작성물, 프로세스 위치 등을 실시간으로 확인할 수 있습니다.
- 프로젝트 내에는 효과적인 협업을 위한 공유 타이머, 공유 음악, 보이스챗, 진척도 확인 등 여러 부가 기능이 탑재되어 있습니다.

## 팀원 구성

<div align="center">

| 정준호 | 이재준 |
| ---  | --- |
| <img src="https://avatars.githubusercontent.com/u/121740394?v=4" alt="정준호 프사" /> <br/> 팀장, FE, Designer | <img src="https://avatars.githubusercontent.com/u/91151775?v=4" alt="이재준 프사" /> <br> FE |

<br>

## 1. 개발 환경

- Front : React 18, Next 14, TailwindCSS, Zustand
- 버전 및 이슈 관리 : Github, Github Issues, Github Project
- 협업 도구 : Discord, Notion, Slack, Google Docs
- 서비스 배포 환경 : Vercel
- 디자인 : [Figma](<https://www.figma.com/file/fAisC2pEKzxTOzet9CfqML/README(oh-my-code)?node-id=39%3A1814>)

## 2. 채택한 개발 기술과 브랜치 전략

### Next 14

- Next.js는 기본적으로 빌드 시 서버측에서 렌더링하는 SSG 방식으로 동작하기 때문에 React.js만 사용한 경우에 비해 SEO에 유리하고, 성능적으로 유리합니다. 이러한 이점으로 시장에서 Next를 기술적으로 채택하는 경우가 많아, Next에 대한 기술적 이해를 위해 프로젝트 기술 스택으로 선정하였습니다.
- Next가 14.1 버전 출시로 어느정도 안정화되었고, app router와 부분 사전 렌더링, 로컬 환경에서의 구동 속도 향상 등 다양한 최신 기술을 경험해보기 위해 Next 14.1 버전을 채택했습니다.

### React 18

- React 18에서 공식적으로 도입된 서버 컴포넌트와 클라이언트 컴포넌트 개념을 적용하여 클라이언트로 전송하는 자바스크립트의 양을 줄여 퍼포먼스를 향상시키고, 보안 강화 및 반복 요청 감소의 이점을 획득하고자 했습니다.

### Liveblocks

- 실시간 협업 서비스를 구현함에 있어서 각 사용자가 상호작용 하면서 발생하는 정보들은 다음과 같습니다.
  - 커서위치, 현재 진행 중인 단계, 참여자들의 현재 위치와 같은 정보들 (`presence`)
  - 작성된 모든 작업물, 타이머, 음악과 같은 모든 사용자들이 공유하는 정보들 (`storage`)
  - 이러한 정보들을 효과적으로 관리하고 신속하게 처리하기 위해 실시간 공유 DB를 제공하는 Liveblocks를 채택하였습니다.
- presence와 storage를 관리할 수 있는 **실시간 공유 DB**와 모든 사용자에게 이벤트를 발생시키는 Broadcast 등 유용한 툴과 인프라를 제공받아 실시간 협업을 단기간 내에 효율적으로 구현할 수 있었습니다.
- Liveblocks에서 제공받는 훅인 `useStorage`와 `useMutation`을 통해 모든 작업자의 상호작용이 다른 작업자들의 환경에서 실시간으로 반영이 되도록 프론트엔드에서 liveblocks의 DB로 상호작용 요소에 대한 뮤테이션을 진행하였습니다.
- 한글화된 문서가 존재하지 않고, 자체 타입과 메소드들이 존재하기 때문에 공식문서를 토대로 학습하며 라이브러리를 활용하였습니다.

### Zustand

- Context API를 사용하는 방법을 고려하였으나, 전역에서 관리해야할 상태의 개수만큼 Provider로 감싸게 되어 가독성에 문제가 있었습니다.
- 따라서 전역상태관리 라이브러리 Redux, Recoil, Zustand 중 Zustand를 선택하였습니다.
- Zustand 채택 이유
  - 대부분의 정보가 liveblock내에 저장되기 때문에 유저가 가지고 있어야 할 상태가 복잡하지 않기 때문에 Redux에 비해 구조가 복잡하지 않은 Zustand를 선정하였습니다.
  - 또한 Recoil과 비교하였을 때 store와 action을 Zustand는 store내부에서 모두 관리할 수 있다는 장점이 있어 Zustand를 선정하였습니다.

### eslint, prettier

- local에서 세팅된 prettier 규칙이 달라 매 커밋마다 포맷팅이 변경된 코드들이 변경이력에 남는 문제가 있었습니다.
- 자동적으로 코드 스타일을 정리해 코드의 일관성을 유지하고자 하였습니다.
- eslint는 기본적인 rule만 사용하였고, 논의를 통해 컨벤션을 지정하여 prettier rule을 선정하였습니다.

### 브랜치 전략

- 이슈 생성에 연관된 브랜치 네이밍 컨벤션을 정하고, 브랜치 내에서 작업 후 main에 merge하는 방식을 채택하였습니다.
- 짧은 개발 기간 내 2명의 프론트엔드 팀원이 작업하는 환경에서 dev 브랜치를 통한 테스트가 비효율적이라는 판단에 feature브랜치에서 테스트 후 approve를 통해 main 브랜치에 merge 하는 방식을 채택하였습니다.
- merge commit 방식과 squash merge 방식 중 squah merge를 채택하였습니다. 작업 단위들이 단일 commit으로 만들어지는 단점이 있지만, 그만큼 작업단위 책정, 이슈생성, PR단위에서 통일성 있는 작업을 위해 신중하게 접근할 수 있었고, main 브랜치 내의 깔끔한 히스토리를 유지할 수 있었습니다.

## 3. 프로젝트 구조

<details>
  <summary>프로젝트 구조 트리</summary>

```
📜liveblocks.config.ts
📜next.config.mjs
📜package.json
📜tailwind.config.ts
📜tsconfig.json
📦src
 ┣ 📂app
 ┃ ┣ 📂(user)
 ┃ ┃ ┣ 📂dashboard
 ┃ ┃ ┣ 📂projects
 ┃ ┃ ┗ 📜layout.tsx
 ┃ ┣ 📂api
 ┃ ┃ ┗ 📂revalidate
 ┃ ┣ 📂board
 ┃ ┃ ┣ 📂[boardId]
 ┃ ┃ ┗ 📜layout.tsx
 ┃ ┣ 📂login
 ┃ ┣ 📜layout.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📂components
 ┃ ┣ 📂Canvas
 ┃ ┣ 📂CanvasLayer
 ┃ ┣ 📂CanvasToolBar
 ┃ ┣ 📂Common
 ┃ ┣ 📂Layout
 ┃ ┃ ┣ 📂CollabToolAside
 ┃ ┃ ┃ ┣ 📂GroupCall
 ┃ ┃ ┃ ┣ 📂MusicPlayer
 ┃ ┃ ┃ ┣ 📜LiveAvatars.tsx
 ┃ ┃ ┃ ┣ 📜ProgressBar.tsx
 ┃ ┃ ┃ ┣ 📜Timer.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂LeftNav
 ┃ ┃ ┣ 📂ProcessNav
 ┃ ┃ ┗ 📜TopNavBar.tsx
 ┃ ┣ 📂Modals
 ┃ ┣ 📂ProcessContent
 ┃ ┃ ┣ 📂FlowBox
 ┃ ┣ 📂ReactFlowCanvas
 ┃ ┣ 📜Room.tsx
 ┃ ┗ 📜Loading.tsx
 ┣ 📂hooks
 ┣ 📂lib
 ┣ 📂store
 ┗ 📂utils
```

</details>

## 4. 역할 분담

### 🍊 정준호

- **프로덕트 디자인**
- **UI 퍼블리싱**
  - 페이지 : 홈, 대시보드, 로그인
  - 공통 컴포넌트 : 상단바, 프로세스 네비바, 프로젝트 협업 도구 (동시 접속자, 보이스챗 모듈, 공유 음악 모듈, 공유 타이머 모듈)
  - 모달 : 프로젝트 생성 모달, 투표 모달, 투표 완료 모달, Sync 완료 모달, 기획 완료 모달
  - 기획 프로세스
    - 1단계 - 아이스브레이킹
    - 5단계 - 문제 재정의 및 탐색, 관심 문제 선정 (WHAT)
    - 6단계 - 근본 원인 파악 (WHY)
    - 7단계 - 해결 방안 모색 (HOW)
    - 9단계 - 비즈니스 모델 작성
    - 12단계 - 메뉴 트리 작성
- **기능 구현**
  - 구글 로그인으로 발급 받은 토큰을 통해 인가 정보 조회 구현
  - Zustand를 활용한 로그인 인가 정보 상태 관리
  - 프로젝트 생성 및 유효성 검사 구현
  - 프로젝트 삭제 로직 구현
  - 실시간 사용자 커서 및 프로세스 위치 정보 공유 상태 관리 및 조작 로직 구현
  - Sendbird 보이스챗 모듈 구현 및 실시간 접속 중인 사용자 확인 로직 구현
  - 모든 사용자가 공유된 음악 상태, 러닝 타임을 공유하도록 음악 모듈 구현
  - reactflow의 Node, Edge 컴포넌트에 ContentEditable, liveblocks Storage 개념을 적용하여 실시간으로 노드 및 엣지를 변경할 수 있도록 하고 이를 공유 상태로 반영하도록 구현
  - 5단계 - 인풋창을 통해 랜덤한 좌표에 공유 노드 데이터 추가하는 로직 구현
  - 6, 7단계 - 노드에서 엣지를 끌어서 캔버스에 드랍할 경우 새로운 노드를 추가하는 로직 구현
  - 9단계 - 원하는 색상을 선택하여 드래그앤드랍 방식으로 원하는 곳에 새로운 노드를 추가하는 로직 구현
  - 9단계 - 노드의 위치 변화에 따라 엣지와 엣지의 라벨의 좌표를 자동으로 변경하는 로직 구현
  - 12단계 - 각 노드의 우측, 하단 툴바 상호작용으로 새로운 노드 및 엣지를 추가하는 로직 구현

### 👻 이재준

- **기능 구현**
  - 캔버스 내 활용 가능한 메모지, 이모티콘 컴포넌트 구현
  - 참여자들 간 공유되는 타이머 로직 및 컴포넌트 개발
  - 2단계 - 템플릿 구현
  - 3단계 - 투표 템플릿 및 레이어, 투표로직 구현
  - 4단계 - 페르소나 생성 템플릿 및 레이어 구현
  - 10단계 - 시나리오 입력 레이어 구현
    - 시나리오 데이터 전송을 통한 AI 유저스토리 생성 요청
  - 11단계 - 작성된 유저스토리 편집 레이어 구현
    - AI 생성 유저스토리를 활용한 레이어 자동생성
  - 각 프로세스 완료 시 스토리지 업데이트 및 로컬 상태 동기화
  - Zustand를 활용한 모달 전역 상태 관리 스토어
    - 모달 내 에서 공유 데이터 접근 및 업데이트 기능을 통한 화면이동 구현
- **성능 최적화**
  - 유저 로컬 상태와 Liveblock Storage 상태 변경 간 인터랙션에 의한 버벅임 해소
- **etc**
  - EsLint & Prettier 적용

## 5. 개발 기간 및 작업 관리

### 개발 기간

- 2024-03-02 ~ 2022-06-010

### 작업 관리

- GitHub Projects와 Issues를 사용하여 진행 상황을 공유했습니다.
- 매 주 2번의 팀 전체 회의를 통해 작업 순서와 방향성에 대한 고민을 나누고 Google Docs에 회의 내용을 기록했습니다.
- FE 개발자들은 비정기적으로 모여 해당 주차에 대한 Issues를 나누고, 개발 파트를 분배하였습니다.
- 이터레이션 별로 팀 QA를 진행하고, QA 간 발견된 결함 및 이슈를 Notion 및 Issues에 정리하여 기록한 뒤 이슈 해결 상황을 공유하였습니다.
