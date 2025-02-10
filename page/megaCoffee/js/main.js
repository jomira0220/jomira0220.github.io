import { storeDB } from "./db.js";
import { menuDB } from "./db.js";
import { memberDB } from "./db.js";

document.cookie = "safeCookie1=foo; SameSite=Lax"; 
document.cookie = "safeCookie2=foo"; 
document.cookie = "crossCookie=bar; SameSite=None; Secure";

//!스토어 정보
let storeKey = Object.keys(storeDB);
let storeValue = Object.values(storeDB.Seoul);
console.log(storeValue)

//!큰 메뉴 카테고리 정보
let menuKey = Object.keys(menuDB);
console.log(menuKey);

//!큰 메뉴 카테고리별 상품정보
let menuValue = Object.values(menuDB);
console.log(menuValue);


//!회원정보
let userValue = Object.values(memberDB.Member);
//console.log(userValue.length)

function introClose(){
  let introBox = document.querySelector(".intro")
  if(introBox){
    setTimeout(function(){
      introBox.setAttribute("style","border-radius:100%;width:0;height:0;")
    },1500)
  }
 
}
introClose()

//!로그인체크
function loginCheck(){
  let loginBtn = document.querySelector(".loginBtn")
  if(loginBtn){
    loginBtn.addEventListener("click", () => {
      let loginId = document.querySelector(".userId").value
      let loginPw = document.querySelector(".userPw").value
      userValue.forEach((el) => {
        if(el.id == loginId && el.password == loginPw){
          document.location.href = "../index.html?userId="+ loginId
          localStorage.setItem("memberId",loginId)
        }else if(loginId == "" || loginPw == ""){
          alert("아이디 또는 비밀번호를 입력해주세요")
        }else if(el.id != loginId || el.password != loginPw){
          alert("아이디 또는 비밀번호를 확인해주세요")
        }
      })
    })
  }
}
loginCheck()


//! 접속 아이디에 따른 이름 노출
function nameCheck(){
  let nameBox =  document.querySelectorAll(".name")
  let loginIdCheck = localStorage.getItem("memberId")
  userValue.forEach((el) => {
    if(el.id == loginIdCheck){
      nameBox.forEach((nameBox)=>{
        nameBox.innerText = el.memberName
      })
      
    }
  });
}
nameCheck()




//! 아이디복사버튼
function copyToClipBoard(){
  let copyBtn = document.querySelector("#copyBtn")
  if(copyBtn){
    copyBtn.addEventListener("click",()=>{
      console.log("d")
      let copyText = document.querySelector('#copyText').value;
      navigator.clipboard.writeText(copyText)
          .then(() => {
          console.log("Text copied to clipboard...")
      })
          .catch(err => {
          console.log('Something went wrong', err);
      })
    })
  }
}
copyToClipBoard()




//! 팝업 형태 박스 노출 관련
let popOnBtn = document.querySelector("#popOnBtn");
let popOffBtn = document.querySelector("#popOffBtn");
let popBox = document.querySelector("#popBox");

if (popOnBtn && popOffBtn && popBox) {
  function popOpen() {
    popOnBtn.addEventListener("click", () => {
      popBox.classList.remove("off");
    });
  }
  popOpen();

  function popClose() {
    popOffBtn.addEventListener("click", () => {
      popBox.classList.add("off");
    });
  }
  popClose();
}


//! header 뒤로가기 버튼 클릭 이벤트
function backPage() {
  let headerBackBtn = document.querySelector("header .backBtn");
  if (headerBackBtn) {
    headerBackBtn.addEventListener("click", () => {
      window.history.back();
    });
  }
}
backPage();

//! 매장 선택 페이지 & 매장 검색 페이지  
//! 매장 리스트 노출
function storeList() {
  /* 해당 매장에서 주문할지 여부 확인 팝업 노출관련*/
  function storePop() {
    let storeName = this.querySelector(".storeName").innerText;
    let storeCode = this.querySelector(".storeName").dataset.storeCode;
    document.querySelector(".storePop .storeName span").innerText = storeName;

    let storePop = document.querySelector(".storePop");
    storePop.classList.remove("off");

    let cancelBtn = document.querySelector(".storePop .cancelBtn");
    let orderBtn = document.querySelector(".storePop .orderBtn");
    cancelBtn.addEventListener("click", () => {
      storePop.classList.add("off");
    });
    orderBtn.addEventListener("click", () => {
      document.location.href =
        "./orderStep_1.html?storeCode=" + storeCode + "&category=0";
      let storeInfo = [storeName,storeCode]
      localStorage.setItem("orderStore",JSON.stringify(storeInfo))
    });
  }

  /* 매장 리스트 노출 처리 */
  let storeList = document.querySelector(".storeList tbody");
  if (storeList) {
    for (let i = 0; i < storeValue.length; i++) {
      let tr = document.createElement("tr");
      storeList.append(tr);

      if (storeValue[i].storeOpen != "open") {
        storeList.children[i].classList.add("off");
      } else {
        storeList.children[i].addEventListener("click", storePop);
      }

      storeList.children[i].innerHTML =
        `
        <td class="storeInfo">
          <div class="storeName" data-store-code="`+storeValue[i].storeCodeName+`">`+storeValue[i].storeName+`</div>
          <div class="storeAddress">`+storeValue[i].storeAddress+`</div>
          <div class="storeMap">`+storeValue[i].storeDistance+`</div>
        </td>
        <td class="storeImgBox">
          <img class="storeImg" src="../resource/img/store/`+storeValue[i].storeCodeName+`.jpg" alt="">
          <div class="favorite"><i class="icon-favorite_star_circle"></i></div>
        </td>
        `;
    }
  }
}
storeList();


//! orderStep_1 메뉴 선택 페이지
//! 카테고리 셋팅 및 상품검색버튼 파라미터 셋팅 
function menuCategory() {
  
  let menuCategory = document.querySelector(".orderStep_1 .menuCategory ul");
  if (menuCategory) {
    let cateUrlCheck = document.location.href.split("&");

    //상품 검색시 카테고리 및 메뉴 파라미터 자동 적용 처리
    let searchBtn = document.querySelector(".searchBtn a");
    searchBtn.setAttribute(
      "href",
      "../page/prdSearch.html" + location.search
    );

    for (let i = 0; i < menuKey.length; i++) {
      //카테고리명
      let categoryName = menuKey[i];

      //큰 메뉴 카테고리 생성 및 링크 셋팅
      menuCategory.append(document.createElement("li"));
      menuCategory.children[i].innerHTML =
        `<a href="` +
        cateUrlCheck[0] +
        `&category=` +
        i +
        `">` +
        categoryName +
        `</a>`;

      //url에 카테고리 번호에 따라서
      //카테고리 active 밑 카테고리에 따른 메뉴 노출처리
      if (cateUrlCheck[1] == "category=" + i) {
        //
        //현재 접속한 카테고리 메뉴만 active 처리
        menuCategory.children[i].classList.add("active");

        //해당 카테고리 총 상품개수
        let categoryPrd = Object.keys(menuValue[i]).length;

        //총 상품 개수 노출
        document.querySelector(".prdTotalCount > span").innerText = categoryPrd;

        //상품리스트 태그
        let prdList = document.querySelector(".prdList");

        //열개수 기본값 3열
        let colCount = "3";
        
        //* 상품 카테고리에 따른 상품리스트 노출
        prdListSet(colCount);

        //~열 바꾸기 버튼 클릭시 바뀐 배열로 노출처리
        document.querySelector(".colCount").addEventListener("click", () => {
          if (colCount == "3") {
            colCount = "1";
            document.querySelector(".colCount > span").innerText = "3";
            prdList.classList.add("line_1");
          } else if (colCount == "1") {
            colCount = "3";
            document.querySelector(".colCount > span").innerText = "1";
            prdList.classList.remove("line_1");
          }

          prdListSet(colCount);
        });

        //!상품리스트 셋팅
        function prdListSet(colCount) {
          //상품리스트 초기화 - 열바꾸기 버튼 클릭시 초기화용
          prdList.innerHTML = "";

          //상품개수 카운트용
          let prdIndex = 0;

          //상품개수에 따른 행 개수
          let trLineCount = Math.ceil(categoryPrd / colCount);

          for (let k = 0; k < trLineCount; k++) {
            //행 생성
            prdList.append(document.createElement("tr"));

            for (let j = 0; j < colCount; j++) {
              //행별로 colCount 만큼 td 열 생성
              prdList.children[k].append(document.createElement("td"));

              //0부터 총 상품 개수만큼만 내용 생성
              if (prdIndex < categoryPrd) {
                //노출시킬 상품별 정보
                let prdContent = Object.values(menuValue[i])[prdIndex];

                let temperature = prdContent.prdCategory.temperature;
                let prdCodeName = Object.keys(menuValue[i])[prdIndex];
                let prdName = prdContent.prdName.ko;
                let prdPrice = prdContent.prdPrice;
                let prdCateLan = prdContent.prdCategory.language.en;

                prdList.children[k].children[j].innerHTML =
                `
                <a href="orderStep_2.html`+location.search+`&prdCode=`+prdCodeName+`">
                  <img src="../resource/img/menu/`+prdCateLan+`/`+temperature+`/`+prdCodeName+`.jpg" alt="">
                  <div class="prdInfo"><div class="prdName"><span>(`+temperature+`)</span>`+prdName+`</div>
                    <div class="prdPrice"><span>`+prdPrice+`</span>원</div>
                  </div>
                </a>
                `;
              }

              prdIndex++;
            }
          }
        }

        //!디저트 카테고리 온도 관련 내용 삭제
        if (categoryName == "디저트") {
          document.querySelectorAll(".prdName span").forEach((el) => {
            el.remove();
          });
        } //if
      } //if
    } //for
    
    let orderStep_1 = document.querySelector(".orderStep_1")
    let $footer = document.createElement("footer")
    $footer.className = "menuFooter"
    orderStep_1.append($footer)
    let storeCode = new URL(location.href).searchParams.get("storeCode")
    let storeName = ""
  
    for(let i = 0; i < storeValue.length; i++){
      if (storeValue[i].storeCodeName == storeCode){
        storeName = storeValue[i].storeName
      }
    }
    
    $footer.innerHTML = 
    `
     <button type="button" id="storeChangeBtn">`
      +storeName+` <i class="icon-angle_down"></i>
     </button>
     <button class="cartBtn" onClick="location.href='../page/basket.html'">
      <span class="hidden">장바구니</span><i class="icon-cart"></i><span class="cartCount">0</span>
     </button>
    `;
    
    
    let storeChangeBtn = $footer.querySelector("#storeChangeBtn")
    let $storeChangePop = document.createElement("div")
    $storeChangePop.id = "storeChangePop"
    storeChangeBtn.addEventListener("click",() => {
      $footer.append($storeChangePop)
    })
    
    $storeChangePop.innerHTML = 
    `
      <div class="storeChangeBox">
        <strong>매장을 변경하시겠습니까?</strong>
        <p>매장을 변경하실 경우 이전에 담은 메뉴가 삭제됩니다.</p>
        <button type="button" class="changeCancel">취소</button>
        <button type="button" class="changeOk" onclick="location.href='storeChoice.html'">매장변경</button>
      </div>
    `
    $storeChangePop.querySelector(".changeCancel").addEventListener("click",() => {
      $storeChangePop.remove()
    })
    

    

  } //menucategory
}
menuCategory();











//! prdSearch 페이지 전상품리스트 노출
function prdSearchList() {
  let searchList = document.querySelector(".prdSearch .prdList");

  if (searchList) {
    //
    let searchBox = document.querySelector(".searchBox input");
    let prdCount = 0; //총상품개수 카운트용
    let trCount = 0; //검색상품개수 카운트용

    //각 메뉴 카테고리별 상품의 개수만큼 상품 출력 (전상품)
    for (let i = 0; i < menuValue.length; i++) {
      for (let j = 0; j < Object.values(menuValue[i]).length; j++) {
        //
        let searchPrdCon = Object.values(menuValue[i])[j];
        let prdCateLanguage = searchPrdCon.prdCategory.language.en;
        let temperature = searchPrdCon.prdCategory.temperature;
        let prdCodeName = Object.keys(menuValue[i])[j];
        let prdName = searchPrdCon.prdName.ko;
        let prdPrice = searchPrdCon.prdPrice;

        searchList.append(document.createElement("tr"));

        //검색키워드가 없으면 기본값으로 전상품 출력
        if (searchBox.value == "") {
          searchList.children[prdCount].innerHTML =
            `
            <td><a href="orderStep_2.html`+location.search+`&prdCode=`+prdCodeName+`">
              <img src="../resource/img/menu/`+prdCateLanguage+`/`+temperature+`/`+prdCodeName+`.jpg" alt="">
              <div class="prdInfo">
                <div class="prdName"><span>(`+temperature+`)</span>`+prdName+`</div>
                <div class="prdPrice"><span>`+prdPrice+`</span>원</div>
              </div>
            </a></td>
            `;
          prdCount++;
        } else {
          //검색키워드가 있으면 키워드에 맞는 상품정보만 출력
          if (prdName.indexOf(searchBox.value) != -1) {
            searchList.append(document.createElement("tr"));
            searchList.children[trCount].innerHTML =
              `
              <td><a href="orderStep_2.html`+location.search+`&prdCode=`+prdCodeName+`">
                <img src="../resource/img/menu/`+prdCateLanguage+`/`+temperature+`/`+prdCodeName+`.jpg" alt="">
                <div class="prdInfo">
                  <div class="prdName"><span>(`+temperature+`)</span>`+prdName+`</div>
                  <div class="prdPrice"><span>`+prdPrice+`</span>원</div>
                </div>
              </a></td>
              `;
              
            trCount++;
          }
        }
      }
    } //for

    //엔터누르면 초기화하고 검색값에 따라 노출처리
    searchBox.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        //엔터키 누르면 상품리스트 초기화
        searchList.innerHTML = "";
        prdSearchList();
      }
    });

    //
  } //if
}
prdSearchList();



//! orderStep_2 주문상품 옵션 선택 생성
function prdOptionSet() {
  let orderStep_2 = document.querySelector(".orderStep_2");
  if (orderStep_2) {
    //선택해서 들어온 상품코드를 url로 확인
    let menuCode = new URL(location.href).searchParams.get("prdCode")

    //상품코드에 맞는 DB값 selectMenu에 담기
    let selectMenu;
    for (let i = 0; i < menuValue.length; i++) {
      //카테고리별 상품개수 Object.keys(menuValue[i]).length
      for (let j = 0; j < Object.keys(menuValue[i]).length; j++) {
        if (menuCode == Object.keys(menuValue[i])[j]) {
          selectMenu = Object.values(menuValue[i])[j];
        }
      }
    }

    let temperature = selectMenu.prdCategory.temperature; //온도
    let prdCateLan = selectMenu.prdCategory.language.en; //카테고리영어
    let prdName = selectMenu.prdName.ko; //상품이름한글
    let prdDes = selectMenu.prdDes; //상품설명
    
    //상단 상품 정보 노출
    let prdDetail = document.querySelector("#prdDetail");
    prdDetail.innerHTML =
      `
    <img src="../resource/img/menu/` +
      prdCateLan +
      `/` +
      temperature +
      `/` +
      menuCode +
      `.jpg" alt="">
    <div class="prdName">` +
      prdName +
      `</div>
    <p>` +
      prdDes +
      `</p>`;

    //* 온도 정보가 있는 상품이면 상품명 앞에 온도 표시
    if (temperature != "none") {
      let prdtemper = document.querySelector("#prdDetail .prdName");
      prdtemper.prepend(document.createElement("span"));
      prdtemper.children[0].innerHTML = `(` + temperature + `)`;
    }

    //선택 상품 옵션 정보 노출
    let prdOptionBox = document.querySelector(".optionBox form");
    let prdOption = selectMenu.prdOption;

    for (let i = 0; i < Object.keys(prdOption).length; i++) {
      //옵션개수만큼 옵션 박스 생성
      prdOptionBox.append(document.createElement("div"));

      //옵션타이틀박스 생성 및 옵션박스 클래스 이름 주기
      let optionDiv = prdOptionBox.children[i];
      optionDiv.classList.add("option_" + (i + 1));
      optionDiv.append(document.createElement("h4"));

      //옵션별 세부값
      let optionCont = Object.values(prdOption)[i];

      //옵션별 타이틀 넣기
      optionDiv.querySelector("h4").innerHTML = optionCont.title;

      //세부옵션별 선택지 만큼 선택요소(라디오버튼) 생성
      for (let j = 0; j < Object.keys(optionCont).length - 1; j++) {
        optionDiv.append(document.createElement("label"));
        optionDiv.children[j + 1].innerHTML =
          `<input type="radio" value="` +
          optionCont[j][0] +
          `" name="` +
          ("option_" + (i + 1)) +
          `" data-option-price="`+optionCont[j][1]+`">` +
          optionCont[j][0];

        //radio 첫번째 요소 기본 체크처리
        if (j + 1 == 1) {
          optionDiv.children[j + 1].children[0].checked = true;
        }
      } //for
    
  
      let prdReco = selectMenu.prdRecommended; //추천상품

      prdReco.forEach((el, index) => {
        //추천메뉴 개수만큼 추천메뉴박스생성
        let recoMenu = document.querySelector(".recoMenu ul");
        recoMenu.append(document.createElement("li"));

        //추천메뉴 정보 셋팅
        for (let k = 0; k < menuKey.length; k++) {
          let recoMenuCode = prdReco[index];
          let menuSelect = menuValue[k][recoMenuCode];
          if (menuSelect != undefined) {
            let prdCateLan = menuSelect.prdCategory.language.en;
            let temperature = menuSelect.prdCategory.temperature;
            let prdName = menuSelect.prdName.ko;
            let prdPrice = menuSelect.prdPrice;

            recoMenu.children[index].innerHTML =
              `<label>
            <img src="../resource/img/menu/` +
              prdCateLan +
              `/` +
              temperature +
              `/` +
              recoMenuCode +
              `.jpg" alt="">
            <div class="recoInfo">
              <div class="recoName" data-menu-code="`+recoMenuCode+`">` +
              prdName +
              `</div>
              <div class="recoPrice"><span>` +
              prdPrice.toLocaleString("ko-KR") +
              `</span>원</div>
            </div>
            <input type="checkbox" name="recoOption" value="`+ recoMenuCode +`" data-option-price="`+ prdPrice +`">
            </label>`;
          }   
        }
        
      });
      
    } //for
    
    //선택한 상품 옵션 선택에 따른 총가격 노출
    prdOptionTotal(menuCode)

    
  }
}
prdOptionSet();


//!옵션 선택 및 상품개수에 따른 총 가격 계산
function prdOptionTotal(menuCode){

    //옵션별 박스선택 추가구성상품 박스포함 선택임
    let optionBox = document.querySelectorAll(".optionBox div") 
    
    //상품 카운트 버튼
    let mainPrdCountBtn = document.querySelectorAll(".orderBottom .prdCountBox button"); 
    
    //상품 카운트 박스
    let mainPrdCountBox = document.querySelector(".orderBottom .prdCountBox .prdCount"); 
    
    //상품 카운트 개수
    let mainPrdCount = Number(mainPrdCountBox.value); 
    
    //현재 접속한 url 카테고리 번호 확인
    let menuCate = new URL(location.href).searchParams.get("category");
    
    //상품 1개 가격
    let mainPrdPrice = Number(menuValue[menuCate][menuCode].prdPrice)
    
     //선택한 옵션 객체
    let selectOption = {}
     //선택한 옵션 토탈가격
    let totalOptionPrice = 0;
    
    function totalSet(mainPrdCount,mainPrdPrice,totalOptionPrice){
      let totalSet = mainPrdPrice * mainPrdCount + totalOptionPrice
      document.querySelector(".orderBottom .totalBox b").innerText = totalSet.toLocaleString("Ko-KR")+`원`;      
    }
    totalSet(mainPrdCount,mainPrdPrice,totalOptionPrice) //기본 가격 노출

    

    optionBox.forEach(function(e,index){
      let radioOption = e.querySelectorAll("input")
      radioOption.forEach(function(op){
        op.addEventListener("click", () => {
          
          if(op.type == "radio"){
            selectOption[op.name] = Number(op.dataset.optionPrice)
          }else{
         
            if(op.checked){
              selectOption[op.value] = Number(op.dataset.optionPrice)
            }else{
              delete selectOption[op.value]
            }
          }
          
          totalOptionPrice = 0
          Object.values(selectOption).forEach((el)=>{
            totalOptionPrice += el
          });

          totalSet(mainPrdCount,mainPrdPrice,totalOptionPrice)
          return totalOptionPrice
          
        })
      })
    })
    
    mainPrdCountBtn.forEach(function(e){
      e.addEventListener("click",()=>{
        if(e.className == "plus"){
          mainPrdCount += 1
          mainPrdCountBox.setAttribute("value",mainPrdCount)
        }else{
          if(mainPrdCount > 1){
            mainPrdCount -= 1
            mainPrdCountBox.setAttribute("value",mainPrdCount)
          }else{
            alert("1개 미만 으로는 주문이 불가합니다.")
          }
        }
        totalSet(mainPrdCount,mainPrdPrice,totalOptionPrice)
      });
    })
}






//메뉴 옵션 선택 토글버튼
function menuToggleBtn() {
  let menuToggleBtn = document.querySelector(".orderStep_2 .toggleBtn");
  if (menuToggleBtn) {
    menuToggleBtn.addEventListener("click", (e) => {
      //토글버튼의 다음요소를 토글처리
      let nextEl = e.target.nextElementSibling;
      let nextStyle = window.getComputedStyle(nextEl).getPropertyValue("display");

      if (nextStyle == "none") {
        nextEl.style.display = "block";
        e.target.children[0].setAttribute("class", "icon-angle_down");
      } else {
        nextEl.style.display = "none";
        e.target.children[0].setAttribute("class", "icon-angle_up");
      }
    });
  }
}

menuToggleBtn();





//storeSearch 매장검색 페이지
function storeSearchList() {
  let storeSearch = document.querySelector(".storeSearch");
  if (storeSearch) {
    let storeList = document.querySelector(".storeList");
    let searchBox = document.querySelector(".searchBox input");
    let searchKey = "";

    //매장검색 박스에 검색어 입력후 엔터치면
    searchBox.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        // 엔터키가 눌렸을 때
        storeList.innerHTML = "";
        let trIndex = 0;
        
        for (let i = 0; i < storeValue.length; i++) {
          let storeCon = storeValue[i];
          let storeName = storeCon.storeName;
          let storeOpen = storeCon.storeOpen;

          if (storeName.indexOf(e.target.value) != -1) {
            console.log(storeName);
            storeList.append(document.createElement("tr"));

            if (storeOpen == "preparing") {
              storeList.children[trIndex].classList.add("off");
            }

            storeList.children[trIndex].innerHTML =
              `<td class="storeInfo">
              <div class="storeName" data-store-code="` +
              storeValue[i].storeCodeName +
              `">` +
              storeValue[i].storeName +
              `</div>
              <div class="storeAddress">` +
              storeValue[i].storeAddress +
              `</div>
              <div class="storeMap">` +
              storeValue[i].storeDistance +
              `</div>
              </td>
              <td class="storeImgBox">
              <img class="storeImg" src="../resource/img/store/` +
              storeValue[i].storeCodeName +
              `.jpg" alt="">
              <div class="favorite"><i class="icon-favorite_star_circle"></i></div>
            </td>`;

            trIndex++;
          }
        }
      }
    }); //close searchBox keydown
  }
}

storeSearchList();


//! index.html 유저 추천메뉴 
function userRecommended(){
  
  let sugestionMenu = document.querySelector(".sugestionMenu .swiper-wrapper")
  if(sugestionMenu){
    
    let userID = new URL(location.href).searchParams.get("userId") //유저아이디
    //console.log(userID)
    let userRecommended = []; // 유저추천메뉴
    for(let i = 0; i < memberDB.Member.length; i++){
      if(memberDB.Member[i]["id"] == userID){
        userRecommended = memberDB.Member[i]["userRecommended"]
      }
    }
    
    for(let j = 0; j < userRecommended.length; j++){
      
      let $div = document.createElement("div")
      sugestionMenu.prepend($div)
      $div.className = "swiper-slide"

      for(let k = 0; k < menuValue.length; k++){
        if(menuValue[k][userRecommended[j]] != undefined){
          let menuInfo = menuValue[k][userRecommended[j]]
          let menuCode = userRecommended[j]
          //console.log(menuInfo.prdName.ko)

          $div.innerHTML =
          `
            <a href="./page/storeChoice.html?`+userID +`">
              <img src="./resource/img/menu/`+menuInfo.prdCategory.language.en+`/`+menuInfo.prdCategory.temperature+`/`+menuCode+`.jpg" alt="">
              <div class="title"></div>
            </a>
          `;
          
          if( menuInfo.prdCategory.temperature != "none" ){
            $div.children[0].children[1].innerHTML = `(`+menuInfo.prdCategory.temperature+`)`+menuInfo.prdName.ko
          }else{
            $div.children[0].children[1].innerHTML = menuInfo.prdName.ko
          }
          
        }
      }
    }
  }
}
userRecommended()



function basketBtn(){
  let basketAll = []
  let basketBtn = document.querySelector(".basketBtn");

  if(basketBtn){
    
    //상품하나 담고 다른거 상품 담는 경우 누적되도록
    if(localStorage.getItem("basketList") != null){
      basketAll = JSON.parse(localStorage.getItem("basketList"))
    }
    
    basketBtn.addEventListener("click",() => {
    
      let selectOptionList = []
      
      //메인상품 가격 및 옵션
      let buyPrdData = {
          prdName: document.querySelector("#prdDetail .prdName").innerText,
          prdCode: new URL(location.href).searchParams.get("prdCode"), 
          prdOption: selectOptionList, 
          prdPrice: document.querySelector(".orderBottom .totalBox b").innerText, 
          prdCount: Number(document.querySelector(".orderBottom .prdCountBox .prdCount").value),
          prdImg: document.querySelector("#prdDetail > img").getAttribute("src"),
      };
      
      
      
      //주문시 선택한 옵션 리스트 셋팅
      let selectOptionTitle = document.querySelectorAll(".optionBox div[class^='option_'] input")
      selectOptionTitle.forEach((el) => {
        if(el.checked == true){
          selectOptionList.push(el.value)
        }
      })
      
      //함께 구매한 추천상품명, 가격, 메뉴코드
      let buyRecommendedPrdData = {
        prdName:"",
        prdCode:"", 
        prdPrice:0, 
        prdCount:1,
        prdImg:"",
      };
      
      //추천상품중에서 체크되어있는 상품만 정보 셋팅
      document.querySelectorAll(".recoInfo").forEach((el) => {
        let recoCheckBox = el.nextElementSibling
        if(recoCheckBox.checked == true){
          buyRecommendedPrdData.prdName = String(el.querySelector(".recoName").innerText)
          buyRecommendedPrdData.prdCode = String(el.querySelector(".recoName").getAttribute("data-menu-code"))
          buyRecommendedPrdData.prdPrice = String(el.querySelector(".recoPrice").innerText)
          buyPrdData.prdPrice = (document.querySelector(".orderBottom .totalBox b").innerText.replace(/[^0-9]/g,"") - el.querySelector(".recoPrice").innerText.replace(/[^0-9]/g,"")).toLocaleString("ko-KR") + "원"
          
          console.log(buyPrdData.prdPrice)
          
          localStorage.setItem("buyItemInfo",JSON.stringify(buyRecommendedPrdData))
          basketAll.push(buyRecommendedPrdData)
        }
      })
      
      localStorage.setItem("buyItemInfo",JSON.stringify(buyPrdData))
      basketAll.push(buyPrdData)
      
      localStorage.setItem("basketList",JSON.stringify(basketAll))
      document.querySelector(".cartCount").innerText = basketAll.length
    })
  }
}
basketBtn()


function basketCountSet(){
  let basketCountBox = document.querySelector(".cartCount")
  if(basketCountBox){
    let nowBasketListCount = 0
    //로컬에 저장된 값이 있으면 가져오기
    let nowBasketList = JSON.parse(localStorage.getItem("basketList"))
    if(nowBasketList != null){
      nowBasketListCount = nowBasketList.length
    }
    basketCountBox.innerText = nowBasketListCount
  }
}
basketCountSet()

function basketListSet(){
  let basketPageCk = document.querySelector("#order.basket")
  if(basketPageCk){
    
    //로컬에 저장된 장바구니 담은 상품 정보 가져오기
    let nowBasketList = JSON.parse(localStorage.getItem("basketList"))
    
    //상품 주문한 지점명 노출
    let selStoreName = JSON.parse(localStorage.getItem("orderStore"))[0]
    document.querySelector("#storeName").innerText = selStoreName
    
    //장바구니가 비어있는 경우
    if(nowBasketList == null){
      nowBasketList = 0
      document.querySelector(".basketEmpty").style.display = "flex";
    }else{
    //장바구니에 상품이 있는 경우

      //장바구니 비어있습니다 비노출
      document.querySelector(".basketEmpty").style.display = "none"
    
      let basketList = basketPageCk.querySelector(".basketList")
      nowBasketList.forEach((basketLi,liIndex) => {
        
        let $li = document.createElement("li")
        basketList.append($li)
        
        let elEn = ""
        let elTemperature = ""
        let elMainPrice = 0;
        
        //주문한 상품 정보 확인
        menuValue.forEach((value)=>{
          let menu = value[basketLi.prdCode]
          if(menu != undefined){
            elEn = menu.prdCategory.language.en
            elTemperature = menu.prdCategory.temperature
            elMainPrice = menu.prdPrice
          }
          return false
        })
        //주문한 상품 정보 셋팅
        $li.innerHTML = 
        `
            <div class="prdImg"><img src="`+basketLi.prdImg+`" alt=""></div>
            <div class="basketPrd">
              <div class="prdName">`+basketLi.prdName+`</div>
              <ul>
              </ul>
              <div class="delBtn"><button><i class="icon-cancel"></i></button></div>
              <div class="prdCountBox">
                <div class="countBox">
                  <button class="downBtn" type="button" aria-label="수량내리기"><i class="icon-circle_minus"></i></button>
                  <div class="prdCount">`+basketLi.prdCount+`</div>
                  <button class="upBtn" type="button" aria-label="수량올리기"><i class="icon-circle_plus"></i></button>
                </div>
                <div class="prdPrice">`+basketLi.prdPrice+`</div>
              </div>
            </div>
            
        `;
        
        //주문한 상품의 옵션 나열
        if(basketLi.prdOption){
          basketLi.prdOption.forEach((option)=>{
            let optionLi = document.createElement("li")
            optionLi.innerText = option
            $li.querySelector(".basketPrd ul").append(optionLi)
          })
        }
        

        //상품에 따른 카운트 및 삭제 실행
        countNDelEvent($li,liIndex,elMainPrice)
        
      })// close nowBasketList
      
      
      function countNDelEvent(parent,parentIndex,elMainPrice){
        
        //상품 개수 추가
        let prdCountBtnUp = parent.querySelector(".upBtn")
        let prdCountBtnDown = parent.querySelector(".downBtn")
        let prdCountBox = parent.querySelector(".prdCount");
        let prdPrice = parent.querySelector(".prdPrice");
      

        prdCountBtnUp.addEventListener("click",(el)=>{
          let prdCount = Number(parent.querySelector(".prdCount").innerText);
          prdCount++
          prdCountBox.innerText = prdCount
          if(prdCount > 1){
            let prdNowPrice = Number(prdPrice.innerText.replace(/[^0-9]/g,""))
            prdNowPrice += elMainPrice
            prdPrice.innerText = prdNowPrice.toLocaleString("ko-KR") + `원`
            basketTotalSet()
          }
          
        })
        prdCountBtnDown.addEventListener("click",(el)=>{
          let prdCount = Number(parent.querySelector(".prdCount").innerText);
          if(prdCount > 1){
            prdCount--
            prdCountBox.innerText = prdCount
            let prdNowPrice = Number(prdPrice.innerText.replace(/[^0-9]/g,""))
            prdNowPrice -= elMainPrice
            prdPrice.innerText = prdNowPrice.toLocaleString("ko-KR") + `원`
            basketTotalSet()
          }else{
            alert("1개이상 구매가 가능합니다.")
          }
        })
        
        //장바구니 상품 삭제
        let prdDelBtn = parent.querySelector(".delBtn")
        prdDelBtn.addEventListener("click",(delBtn)=>{
          //현재 장바구니 리스트 배열에서 해당하는 객체 삭제
          nowBasketList.splice(parentIndex,1)
          console.log(nowBasketList)
          if(nowBasketList == ""){ 
            //삭제하여 장바구니에 아무것도 없는 경우
            localStorage.removeItem("basketList")
            localStorage.removeItem("buyItemInfo")
            parent.remove()
            document.querySelector(".basketEmpty").style.display = "flex";
          }else{
            //위에서 삭제한 리스트를 다시 로컬에 셋팅
            localStorage.setItem("basketList",JSON.stringify(nowBasketList))
            parent.remove()
          }

        })
        
      } //close countNDelEvent
      
      
      function basketTotalSet(){
        let listPriceSet =  document.querySelectorAll(".basketList .prdPrice")
        let basketTotal = 0;
        listPriceSet.forEach((listPrice) => {
          basketTotal += Number(listPrice.innerText.replace(/[^0-9]/g,""))
          document.querySelector(".orderBottom b").innerText = basketTotal.toLocaleString("ko-KR") + `원`
        })
      }
      basketTotalSet()
      
    }
    //
    
  }
}
basketListSet()

//!주문완료시 로컬스토리지 리셋 관련하여 처리 작업 필요 - 멤버아이디 장바구니 선택매장


function paymentPageSet(){
  let paymentPage = document.querySelector("#order.payment")
  if(paymentPage){
    
    //로컬에 있는 매장명 가져와서 노출
    let storeName = JSON.parse(localStorage.getItem("orderStore"))
    document.querySelector("#storeName").innerText = storeName[0]
    //로컬에 있는 주문상품 가져와서 노출
    let buyList = JSON.parse(localStorage.getItem("basketList"))
    let orderList = document.querySelector("#orderList")
    buyList.forEach((el) => {
      let buyLi = document.createElement("li")
      orderList.append(buyLi)
      
      buyLi.innerHTML = 
      `
      <div class="prdImg"><img src="`+el.prdImg+`" alt=""></div>
      <div class="basketPrd">
        <div class="prdName">`+el.prdName+`</div>
        <ul class="optionList">
        </ul>
        <div class="prdCountBox">
          <div class="countBox">
            <div class="prdCount">`+el.prdCount+`개</div>
          </div>
          <div class="prdPrice">`+el.prdPrice+`</div>
        </div>
      </div>
      `;
      
      
      //주문한 상품의 옵션 나열
      if(el.prdOption){
        el.prdOption.forEach((option)=>{
          let optionLi = document.createElement("li")
          optionLi.innerText = option
          buyLi.querySelector(".basketPrd ul").append(optionLi)
        })
      }
      
    })
    
    //주문할 상품 축약 안내 및 토글클릭시 주문상품 요약 노출
    let orderContraction = document.querySelector(".orderContraction")
    orderContraction.innerText = buyList[0].prdName + ` 외 ` + (buyList.length - 1) + `건`
    
    let payToggleBtn = document.querySelector(".payment .toggleBtn")
    payToggleBtn.addEventListener("click",() => {
      orderList.classList.toggle("open")
      payToggleBtn.querySelector("i").classList.toggle("icon-angle_up")
    })
    
  }
}
paymentPageSet()



function orderBtn(){
  let orderBtn = document.querySelector(".orderBtn")
  if(orderBtn){
  
  }
}
orderBtn()
