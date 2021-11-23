


# Leggo! <img src="https://user-images.githubusercontent.com/50583262/143018665-e545dd38-a0ae-4694-9793-6efc7fee637c.png" width="40">

골 트래커(Goal Tracker) 제작 프로젝트

- 사용자의 목표 달성에 동기부여를 줄 수 있는 프로젝트 제작
- 목표 일 수를 정하고 목표를 달성했을 때, 스탬프나 스티커를 붙이는 골 트래커(목표 달성 앱) 제작

<br>

## 💫 Our Goal

- 사용자의 흥미를 유발할 유연한 UI/UX
- Vanilla JS, Clean code 작성
- Chrome Extension 제작 및 배포

## 🛠 프로젝트 사용기술

- HTML5, CSS3, JavaScript
- Local Storage, Session Storage

---

## 🔍 Focused

캡슐화 및 정보은닉

- Closure 사용
- Class, private field(`#`) 사용

<br>

UI/UX (유저 친화적 Interaction)

- Sprite Image로 이미지 최적화 및 재미요소 추가
- 클릭 이벤트, opacity 조정 등 다양한 animation 적용

---

### 📚 Goal Object

- 핵심 데이터 Scheme

```js
/**
 * @typedef Goal
 * @property {number} id - Goal's ID (auto-increase)
 * @property {string} name - Goal's name
 * @property {number} days - Goal's number of due days
 * @property {Array<boolean>} [isAchieve=[]] - Achieved or not on each of days
 * @property {string} [rewards=''] - Goal's rewards
 * @property {Date} [startDate=new Date()] - Goal's enroll(start) date
 */
```

---

<br>

## 🪄 Main Feature

### 📌 랜덤 아바타 생성

![index](https://user-images.githubusercontent.com/37561621/139051068-816f006a-8a24-4d2c-9952-671b3e7d650c.gif)

> 아바타와 닉네임을 생성하여 사용자에게 **재미를 주기 위한 진입 페이지**입니다.  
> 아바타는 색깔과 눈, 입 모양의 조합으로 랜덤하게 생성되며 닉네임은 랜덤 형용사와 명사의 조합으로 만들어집니다.  
> 이때 생성된 아바타와 닉네임은 로컬 스토리지에 저장하여 메인 페이지에 연동하였으며, 특히 아바타의 색깔은 메인 페이지의 테마 컬러로 사용됩니다.  
> 아바타의 눈과 입은 **스프라이트 이미지**를 사용하여 구현하였는데, 이를 통해 슬롯처럼 눈과 입이 돌아가는 효과와 **이미지 최적화** 효과를 동시에 얻을 수 있었습니다.

### 📌 spinner

![spinner](https://user-images.githubusercontent.com/37561621/139051053-d7b27b26-dd9c-4cb9-9462-6c58ae5d9f84.gif)

> 골 트래커 페이지로 진입하게 되면 스피너가 발생합니다.  
> **로컬 스토리지**를 이용해서 첫 접속 / 당일 재접속 / 하루 경과 / 7일 이상 경과에 따라 문구를 다르게 하여 사용자의 재접속을 유도하였습니다.

### 📌 Goal 설정

![goal](https://user-images.githubusercontent.com/37561621/139051085-5bab2bbb-bc30-43b4-a550-476075fef73e.gif)

> 목표 일수와 내용을 작성하고 저장하면 하단에 리스트가 표시됩니다. 날짜에 유효하지 않은 범위나 값을 입력할 수 없도록 예외 처리를 했습니다.  
> 리스트를 클릭하면 클릭한 아이템의 색이 강조되면서 우측에 해당 목표의 트래커가 나타납니다.  
> 날짜를 입력할 수도 있고 오른쪽의 버튼을 통해 하루씩 조정도 가능합니다.  
> 휴지통 아이콘을 클릭하면 목록을 삭제할 수 있습니다.
>
> 유저가 하루 하루 목표를 달성하고 트래커의 각 칸을 클릭하면 클릭 이펙트와 함께 도장이 찍히게 됩니다. 이때 왼쪽의 목록 하단에는 달성률을 길이와 농도를 이용해 시각적으로 보이도록 실시간으로 반영하여 표시합니다.  
> 지난 날짜는 도장을 찍을 수 없습니다.
>
> 트래커 하단의 리워드 항목은 유저가 스스로 목표를 달성했을 시 스스로에게 주는 보상을 작성하는 칸입니다. 리워드는 엔터를 입력하거나 포커스를 잃었을 때 저장됩니다.

### 📌 다양한 interaction

![leggo_interaction](https://user-images.githubusercontent.com/41777022/143014852-fd03055f-dbb8-4407-9aa3-ff8ef377ed1f.gif)

> Goal 체크 시, 유저에게 체크를 했다는 타격감을 제공  
> Goal 리스트 내 체크 percentage를 동적으로 변경

### 📌 nav

![nav](https://user-images.githubusercontent.com/37561621/139051080-75ea5a1e-6f8f-4c3e-a973-8e9ee3959a6e.gif)

> 세션 스토리지를 이용해서 네비게이션이 오픈되어 있는지 상태를 관리했습니다.  
> 네비게이션 바를 접으면 우측 상단에 헤더로 요약 정보를 보여주게 하였습니다.  
> 메인에서 아바타 정보와 색상을 받아와서 전체적인 UI색상을 관리할 수 있게 하였습니다.  
> 반응형 UI를 적용하여 모바일에서는 햄버거 메뉴로 변경되어 상->하 방식으로 메뉴가 나타나도록 하였습니다.

### 📌 반응형 UI

![leggo_responsive](https://user-images.githubusercontent.com/41777022/143014879-bb639153-943d-4acf-a82e-da24911e5299.gif)

> 모바일 view 대응을 위한 반응형 UI 설계

<br>

---

🌎 [배포 URL](http://leggo.seohey.co.kr/)

![배포 url QR code](https://user-images.githubusercontent.com/41777022/143009141-99eab821-7187-4d5b-a8b7-de8b3aca7c73.png)

<br>

---

## 🎓 팀원

<table>
    <tr align="center">
        <td><B>김정호<B></td>
        <td><B>박태준<B></td>
        <td><B>이효원<B></td>
        <td><B>서혜연<B></td>
    </tr>
    <tr align="center">
        <td>
            <img src="https://github.com/hoya-kim.png?size=100" style="width:100px; height:100px;">
            <br>
            <a href="https://github.com/hoya-kim" style="width:100px; height:100px;"><I>Hoya-kim</I></a>
        </td>
        <td>
            <img src="https://github.com/joker77z.png?size=100" style="width:100px; height:100px;">
            <br>
            <a href="https://github.com/joker77z"><I>joker77z</I></a>
        </td>
        <td>
            <img src="https://github.com/hhhyyo.png?size=100" style="width:100px; height:100px;">
            <br>
            <a href="https://github.com/hhhyyo"><I>hhhyyo</I></a>
        </td>
        <td>
            <img src="https://github.com/skojphy.png?size=100" style="width:100px; height:100px;">
            <br>
            <a href="https://github.com/skojphy"><I>skojphy</I></a>
        </td>
    </tr>
</table>
