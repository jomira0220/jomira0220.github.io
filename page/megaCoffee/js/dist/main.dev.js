"use strict";

var _db = require("./db.js");

document.cookie = "safeCookie1=foo; SameSite=Lax";
document.cookie = "safeCookie2=foo";
document.cookie = "crossCookie=bar; SameSite=None; Secure"; //!스토어 정보

var storeKey = Object.keys(_db.storeDB);
var storeValue = Object.values(_db.storeDB.Seoul);
console.log(storeValue); //!큰 메뉴 카테고리 정보

var menuKey = Object.keys(_db.menuDB);
console.log(menuKey); //!큰 메뉴 카테고리별 상품정보

var menuValue = Object.values(_db.menuDB);
console.log(menuValue); //!회원정보

var userValue = Object.values(_db.memberDB.Member); //console.log(userValue.length)

function introClose() {
  var introBox = document.querySelector(".intro");

  if (introBox) {
    setTimeout(function () {
      introBox.setAttribute("style", "border-radius:100%;width:0;height:0;");
    }, 1500);
  }
}

introClose(); //!로그인체크

function loginCheck() {
  var loginBtn = document.querySelector(".loginBtn");

  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      var loginId = document.querySelector(".userId").value;
      var loginPw = document.querySelector(".userPw").value;
      userValue.forEach(function (el) {
        if (el.id == loginId && el.password == loginPw) {
          document.location.href = "../index.html?userId=" + loginId;
          localStorage.setItem("memberId", loginId);
        } else if (loginId == "" || loginPw == "") {
          alert("아이디 또는 비밀번호를 입력해주세요");
        } else if (el.id != loginId || el.password != loginPw) {
          alert("아이디 또는 비밀번호를 확인해주세요");
        }
      });
    });
  }
}

loginCheck(); //! 접속 아이디에 따른 이름 노출

function nameCheck() {
  var nameBox = document.querySelectorAll(".name");
  var loginIdCheck = localStorage.getItem("memberId");
  userValue.forEach(function (el) {
    if (el.id == loginIdCheck) {
      nameBox.forEach(function (nameBox) {
        nameBox.innerText = el.memberName;
      });
    }
  });
}

nameCheck(); //! 아이디복사버튼

function copyToClipBoard() {
  var copyBtn = document.querySelector("#copyBtn");

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      console.log("d");
      var copyText = document.querySelector('#copyText').value;
      navigator.clipboard.writeText(copyText).then(function () {
        console.log("Text copied to clipboard...");
      })["catch"](function (err) {
        console.log('Something went wrong', err);
      });
    });
  }
}

copyToClipBoard(); //! 팝업 형태 박스 노출 관련

var popOnBtn = document.querySelector("#popOnBtn");
var popOffBtn = document.querySelector("#popOffBtn");
var popBox = document.querySelector("#popBox");

if (popOnBtn && popOffBtn && popBox) {
  var popOpen = function popOpen() {
    popOnBtn.addEventListener("click", function () {
      popBox.classList.remove("off");
    });
  };

  var popClose = function popClose() {
    popOffBtn.addEventListener("click", function () {
      popBox.classList.add("off");
    });
  };

  popOpen();
  popClose();
} //! header 뒤로가기 버튼 클릭 이벤트


function backPage() {
  var headerBackBtn = document.querySelector("header .backBtn");

  if (headerBackBtn) {
    headerBackBtn.addEventListener("click", function () {
      window.history.back();
    });
  }
}

backPage(); //! 매장 선택 페이지 & 매장 검색 페이지  
//! 매장 리스트 노출

function storeList() {
  /* 해당 매장에서 주문할지 여부 확인 팝업 노출관련*/
  function storePop() {
    var storeName = this.querySelector(".storeName").innerText;
    var storeCode = this.querySelector(".storeName").dataset.storeCode;
    document.querySelector(".storePop .storeName span").innerText = storeName;
    var storePop = document.querySelector(".storePop");
    storePop.classList.remove("off");
    var cancelBtn = document.querySelector(".storePop .cancelBtn");
    var orderBtn = document.querySelector(".storePop .orderBtn");
    cancelBtn.addEventListener("click", function () {
      storePop.classList.add("off");
    });
    orderBtn.addEventListener("click", function () {
      document.location.href = "./orderStep_1.html?storeCode=" + storeCode + "&category=0";
      var storeInfo = [storeName, storeCode];
      localStorage.setItem("orderStore", JSON.stringify(storeInfo));
    });
  }
  /* 매장 리스트 노출 처리 */


  var storeList = document.querySelector(".storeList tbody");

  if (storeList) {
    for (var i = 0; i < storeValue.length; i++) {
      var tr = document.createElement("tr");
      storeList.append(tr);

      if (storeValue[i].storeOpen != "open") {
        storeList.children[i].classList.add("off");
      } else {
        storeList.children[i].addEventListener("click", storePop);
      }

      storeList.children[i].innerHTML = "\n        <td class=\"storeInfo\">\n          <div class=\"storeName\" data-store-code=\"" + storeValue[i].storeCodeName + "\">" + storeValue[i].storeName + "</div>\n          <div class=\"storeAddress\">" + storeValue[i].storeAddress + "</div>\n          <div class=\"storeMap\">" + storeValue[i].storeDistance + "</div>\n        </td>\n        <td class=\"storeImgBox\">\n          <img class=\"storeImg\" src=\"../resource/img/store/" + storeValue[i].storeCodeName + ".jpg\" alt=\"\">\n          <div class=\"favorite\"><i class=\"icon-favorite_star_circle\"></i></div>\n        </td>\n        ";
    }
  }
}

storeList(); //! orderStep_1 메뉴 선택 페이지
//! 카테고리 셋팅 및 상품검색버튼 파라미터 셋팅 

function menuCategory() {
  var menuCategory = document.querySelector(".orderStep_1 .menuCategory ul");

  if (menuCategory) {
    var cateUrlCheck = document.location.href.split("&"); //상품 검색시 카테고리 및 메뉴 파라미터 자동 적용 처리

    var searchBtn = document.querySelector(".searchBtn a");
    searchBtn.setAttribute("href", "../page/prdSearch.html" + location.search);

    var _loop = function _loop(i) {
      //카테고리명
      var categoryName = menuKey[i]; //큰 메뉴 카테고리 생성 및 링크 셋팅

      menuCategory.append(document.createElement("li"));
      menuCategory.children[i].innerHTML = "<a href=\"" + cateUrlCheck[0] + "&category=" + i + "\">" + categoryName + "</a>"; //url에 카테고리 번호에 따라서
      //카테고리 active 밑 카테고리에 따른 메뉴 노출처리

      if (cateUrlCheck[1] == "category=" + i) {
        //!상품리스트 셋팅
        var prdListSet = function prdListSet(colCount) {
          //상품리스트 초기화 - 열바꾸기 버튼 클릭시 초기화용
          prdList.innerHTML = ""; //상품개수 카운트용

          var prdIndex = 0; //상품개수에 따른 행 개수

          var trLineCount = Math.ceil(categoryPrd / colCount);

          for (var k = 0; k < trLineCount; k++) {
            //행 생성
            prdList.append(document.createElement("tr"));

            for (var j = 0; j < colCount; j++) {
              //행별로 colCount 만큼 td 열 생성
              prdList.children[k].append(document.createElement("td")); //0부터 총 상품 개수만큼만 내용 생성

              if (prdIndex < categoryPrd) {
                //노출시킬 상품별 정보
                var prdContent = Object.values(menuValue[i])[prdIndex];
                var temperature = prdContent.prdCategory.temperature;
                var prdCodeName = Object.keys(menuValue[i])[prdIndex];
                var prdName = prdContent.prdName.ko;
                var prdPrice = prdContent.prdPrice;
                var prdCateLan = prdContent.prdCategory.language.en;
                prdList.children[k].children[j].innerHTML = "\n                <a href=\"orderStep_2.html" + location.search + "&prdCode=" + prdCodeName + "\">\n                  <img src=\"../resource/img/menu/" + prdCateLan + "/" + temperature + "/" + prdCodeName + ".jpg\" alt=\"\">\n                  <div class=\"prdInfo\"><div class=\"prdName\"><span>(" + temperature + ")</span>" + prdName + "</div>\n                    <div class=\"prdPrice\"><span>" + prdPrice + "</span>\uC6D0</div>\n                  </div>\n                </a>\n                ";
              }

              prdIndex++;
            }
          }
        }; //!디저트 카테고리 온도 관련 내용 삭제


        //
        //현재 접속한 카테고리 메뉴만 active 처리
        menuCategory.children[i].classList.add("active"); //해당 카테고리 총 상품개수

        var categoryPrd = Object.keys(menuValue[i]).length; //총 상품 개수 노출

        document.querySelector(".prdTotalCount > span").innerText = categoryPrd; //상품리스트 태그

        var prdList = document.querySelector(".prdList"); //열개수 기본값 3열

        var colCount = "3"; //* 상품 카테고리에 따른 상품리스트 노출

        prdListSet(colCount); //~열 바꾸기 버튼 클릭시 바뀐 배열로 노출처리

        document.querySelector(".colCount").addEventListener("click", function () {
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

        if (categoryName == "디저트") {
          document.querySelectorAll(".prdName span").forEach(function (el) {
            el.remove();
          });
        } //if

      } //if

    };

    for (var i = 0; i < menuKey.length; i++) {
      _loop(i);
    } //for


    var orderStep_1 = document.querySelector(".orderStep_1");
    var $footer = document.createElement("footer");
    $footer.className = "menuFooter";
    orderStep_1.append($footer);
    var storeCode = new URL(location.href).searchParams.get("storeCode");
    var storeName = "";

    for (var _i = 0; _i < storeValue.length; _i++) {
      if (storeValue[_i].storeCodeName == storeCode) {
        storeName = storeValue[_i].storeName;
      }
    }

    $footer.innerHTML = "\n     <button type=\"button\" id=\"storeChangeBtn\">" + storeName + " <i class=\"icon-angle_down\"></i>\n     </button>\n     <button class=\"cartBtn\" onClick=\"location.href='../page/basket.html'\">\n      <span class=\"hidden\">\uC7A5\uBC14\uAD6C\uB2C8</span><i class=\"icon-cart\"></i><span class=\"cartCount\">0</span>\n     </button>\n    ";
    var storeChangeBtn = $footer.querySelector("#storeChangeBtn");
    var $storeChangePop = document.createElement("div");
    $storeChangePop.id = "storeChangePop";
    storeChangeBtn.addEventListener("click", function () {
      $footer.append($storeChangePop);
    });
    $storeChangePop.innerHTML = "\n      <div class=\"storeChangeBox\">\n        <strong>\uB9E4\uC7A5\uC744 \uBCC0\uACBD\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?</strong>\n        <p>\uB9E4\uC7A5\uC744 \uBCC0\uACBD\uD558\uC2E4 \uACBD\uC6B0 \uC774\uC804\uC5D0 \uB2F4\uC740 \uBA54\uB274\uAC00 \uC0AD\uC81C\uB429\uB2C8\uB2E4.</p>\n        <button type=\"button\" class=\"changeCancel\">\uCDE8\uC18C</button>\n        <button type=\"button\" class=\"changeOk\" onclick=\"location.href='storeChoice.html'\">\uB9E4\uC7A5\uBCC0\uACBD</button>\n      </div>\n    ";
    $storeChangePop.querySelector(".changeCancel").addEventListener("click", function () {
      $storeChangePop.remove();
    });
  } //menucategory

}

menuCategory(); //! prdSearch 페이지 전상품리스트 노출

function prdSearchList() {
  var searchList = document.querySelector(".prdSearch .prdList");

  if (searchList) {
    //
    var searchBox = document.querySelector(".searchBox input");
    var prdCount = 0; //총상품개수 카운트용

    var trCount = 0; //검색상품개수 카운트용
    //각 메뉴 카테고리별 상품의 개수만큼 상품 출력 (전상품)

    for (var i = 0; i < menuValue.length; i++) {
      for (var j = 0; j < Object.values(menuValue[i]).length; j++) {
        //
        var searchPrdCon = Object.values(menuValue[i])[j];
        var prdCateLanguage = searchPrdCon.prdCategory.language.en;
        var temperature = searchPrdCon.prdCategory.temperature;
        var prdCodeName = Object.keys(menuValue[i])[j];
        var prdName = searchPrdCon.prdName.ko;
        var prdPrice = searchPrdCon.prdPrice;
        searchList.append(document.createElement("tr")); //검색키워드가 없으면 기본값으로 전상품 출력

        if (searchBox.value == "") {
          searchList.children[prdCount].innerHTML = "\n            <td><a href=\"orderStep_2.html" + location.search + "&prdCode=" + prdCodeName + "\">\n              <img src=\"../resource/img/menu/" + prdCateLanguage + "/" + temperature + "/" + prdCodeName + ".jpg\" alt=\"\">\n              <div class=\"prdInfo\">\n                <div class=\"prdName\"><span>(" + temperature + ")</span>" + prdName + "</div>\n                <div class=\"prdPrice\"><span>" + prdPrice + "</span>\uC6D0</div>\n              </div>\n            </a></td>\n            ";
          prdCount++;
        } else {
          //검색키워드가 있으면 키워드에 맞는 상품정보만 출력
          if (prdName.indexOf(searchBox.value) != -1) {
            searchList.append(document.createElement("tr"));
            searchList.children[trCount].innerHTML = "\n              <td><a href=\"orderStep_2.html" + location.search + "&prdCode=" + prdCodeName + "\">\n                <img src=\"../resource/img/menu/" + prdCateLanguage + "/" + temperature + "/" + prdCodeName + ".jpg\" alt=\"\">\n                <div class=\"prdInfo\">\n                  <div class=\"prdName\"><span>(" + temperature + ")</span>" + prdName + "</div>\n                  <div class=\"prdPrice\"><span>" + prdPrice + "</span>\uC6D0</div>\n                </div>\n              </a></td>\n              ";
            trCount++;
          }
        }
      }
    } //for
    //엔터누르면 초기화하고 검색값에 따라 노출처리


    searchBox.addEventListener("keydown", function (e) {
      if (e.keyCode == 13) {
        //엔터키 누르면 상품리스트 초기화
        searchList.innerHTML = "";
        prdSearchList();
      }
    }); //
  } //if

}

prdSearchList(); //! orderStep_2 주문상품 옵션 선택 생성

function prdOptionSet() {
  var orderStep_2 = document.querySelector(".orderStep_2");

  if (orderStep_2) {
    //선택해서 들어온 상품코드를 url로 확인
    var menuCode = new URL(location.href).searchParams.get("prdCode"); //상품코드에 맞는 DB값 selectMenu에 담기

    var selectMenu;

    for (var i = 0; i < menuValue.length; i++) {
      //카테고리별 상품개수 Object.keys(menuValue[i]).length
      for (var j = 0; j < Object.keys(menuValue[i]).length; j++) {
        if (menuCode == Object.keys(menuValue[i])[j]) {
          selectMenu = Object.values(menuValue[i])[j];
        }
      }
    }

    var temperature = selectMenu.prdCategory.temperature; //온도

    var prdCateLan = selectMenu.prdCategory.language.en; //카테고리영어

    var prdName = selectMenu.prdName.ko; //상품이름한글

    var prdDes = selectMenu.prdDes; //상품설명
    //상단 상품 정보 노출

    var prdDetail = document.querySelector("#prdDetail");
    prdDetail.innerHTML = "\n    <img src=\"../resource/img/menu/" + prdCateLan + "/" + temperature + "/" + menuCode + ".jpg\" alt=\"\">\n    <div class=\"prdName\">" + prdName + "</div>\n    <p>" + prdDes + "</p>"; //* 온도 정보가 있는 상품이면 상품명 앞에 온도 표시

    if (temperature != "none") {
      var prdtemper = document.querySelector("#prdDetail .prdName");
      prdtemper.prepend(document.createElement("span"));
      prdtemper.children[0].innerHTML = "(" + temperature + ")";
    } //선택 상품 옵션 정보 노출


    var prdOptionBox = document.querySelector(".optionBox form");
    var prdOption = selectMenu.prdOption;

    var _loop2 = function _loop2(_i2) {
      //옵션개수만큼 옵션 박스 생성
      prdOptionBox.append(document.createElement("div")); //옵션타이틀박스 생성 및 옵션박스 클래스 이름 주기

      var optionDiv = prdOptionBox.children[_i2];
      optionDiv.classList.add("option_" + (_i2 + 1));
      optionDiv.append(document.createElement("h4")); //옵션별 세부값

      var optionCont = Object.values(prdOption)[_i2]; //옵션별 타이틀 넣기


      optionDiv.querySelector("h4").innerHTML = optionCont.title; //세부옵션별 선택지 만큼 선택요소(라디오버튼) 생성

      for (var _j = 0; _j < Object.keys(optionCont).length - 1; _j++) {
        optionDiv.append(document.createElement("label"));
        optionDiv.children[_j + 1].innerHTML = "<input type=\"radio\" value=\"" + optionCont[_j][0] + "\" name=\"" + ("option_" + (_i2 + 1)) + "\" data-option-price=\"" + optionCont[_j][1] + "\">" + optionCont[_j][0]; //radio 첫번째 요소 기본 체크처리

        if (_j + 1 == 1) {
          optionDiv.children[_j + 1].children[0].checked = true;
        }
      } //for


      var prdReco = selectMenu.prdRecommended; //추천상품

      prdReco.forEach(function (el, index) {
        //추천메뉴 개수만큼 추천메뉴박스생성
        var recoMenu = document.querySelector(".recoMenu ul");
        recoMenu.append(document.createElement("li")); //추천메뉴 정보 셋팅

        for (var k = 0; k < menuKey.length; k++) {
          var recoMenuCode = prdReco[index];
          var menuSelect = menuValue[k][recoMenuCode];

          if (menuSelect != undefined) {
            var _prdCateLan = menuSelect.prdCategory.language.en;
            var _temperature = menuSelect.prdCategory.temperature;
            var _prdName = menuSelect.prdName.ko;
            var prdPrice = menuSelect.prdPrice;
            recoMenu.children[index].innerHTML = "<label>\n            <img src=\"../resource/img/menu/" + _prdCateLan + "/" + _temperature + "/" + recoMenuCode + ".jpg\" alt=\"\">\n            <div class=\"recoInfo\">\n              <div class=\"recoName\" data-menu-code=\"" + recoMenuCode + "\">" + _prdName + "</div>\n              <div class=\"recoPrice\"><span>" + prdPrice.toLocaleString("ko-KR") + "</span>\uC6D0</div>\n            </div>\n            <input type=\"checkbox\" name=\"recoOption\" value=\"" + recoMenuCode + "\" data-option-price=\"" + prdPrice + "\">\n            </label>";
          }
        }
      });
    };

    for (var _i2 = 0; _i2 < Object.keys(prdOption).length; _i2++) {
      _loop2(_i2);
    } //for
    //선택한 상품 옵션 선택에 따른 총가격 노출


    prdOptionTotal(menuCode);
  }
}

prdOptionSet(); //!옵션 선택 및 상품개수에 따른 총 가격 계산

function prdOptionTotal(menuCode) {
  //옵션별 박스선택 추가구성상품 박스포함 선택임
  var optionBox = document.querySelectorAll(".optionBox div"); //상품 카운트 버튼

  var mainPrdCountBtn = document.querySelectorAll(".orderBottom .prdCountBox button"); //상품 카운트 박스

  var mainPrdCountBox = document.querySelector(".orderBottom .prdCountBox .prdCount"); //상품 카운트 개수

  var mainPrdCount = Number(mainPrdCountBox.value); //현재 접속한 url 카테고리 번호 확인

  var menuCate = new URL(location.href).searchParams.get("category"); //상품 1개 가격

  var mainPrdPrice = Number(menuValue[menuCate][menuCode].prdPrice); //선택한 옵션 객체

  var selectOption = {}; //선택한 옵션 토탈가격

  var totalOptionPrice = 0;

  function totalSet(mainPrdCount, mainPrdPrice, totalOptionPrice) {
    var totalSet = mainPrdPrice * mainPrdCount + totalOptionPrice;
    document.querySelector(".orderBottom .totalBox b").innerText = totalSet.toLocaleString("Ko-KR") + "\uC6D0";
  }

  totalSet(mainPrdCount, mainPrdPrice, totalOptionPrice); //기본 가격 노출

  optionBox.forEach(function (e, index) {
    var radioOption = e.querySelectorAll("input");
    radioOption.forEach(function (op) {
      op.addEventListener("click", function () {
        if (op.type == "radio") {
          selectOption[op.name] = Number(op.dataset.optionPrice);
        } else {
          if (op.checked) {
            selectOption[op.value] = Number(op.dataset.optionPrice);
          } else {
            delete selectOption[op.value];
          }
        }

        totalOptionPrice = 0;
        Object.values(selectOption).forEach(function (el) {
          totalOptionPrice += el;
        });
        totalSet(mainPrdCount, mainPrdPrice, totalOptionPrice);
        return totalOptionPrice;
      });
    });
  });
  mainPrdCountBtn.forEach(function (e) {
    e.addEventListener("click", function () {
      if (e.className == "plus") {
        mainPrdCount += 1;
        mainPrdCountBox.setAttribute("value", mainPrdCount);
      } else {
        if (mainPrdCount > 1) {
          mainPrdCount -= 1;
          mainPrdCountBox.setAttribute("value", mainPrdCount);
        } else {
          alert("1개 미만 으로는 주문이 불가합니다.");
        }
      }

      totalSet(mainPrdCount, mainPrdPrice, totalOptionPrice);
    });
  });
} //메뉴 옵션 선택 토글버튼


function menuToggleBtn() {
  var menuToggleBtn = document.querySelector(".orderStep_2 .toggleBtn");

  if (menuToggleBtn) {
    menuToggleBtn.addEventListener("click", function (e) {
      //토글버튼의 다음요소를 토글처리
      var nextEl = e.target.nextElementSibling;
      var nextStyle = window.getComputedStyle(nextEl).getPropertyValue("display");

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

menuToggleBtn(); //storeSearch 매장검색 페이지

function storeSearchList() {
  var storeSearch = document.querySelector(".storeSearch");

  if (storeSearch) {
    var _storeList = document.querySelector(".storeList");

    var searchBox = document.querySelector(".searchBox input");
    var searchKey = ""; //매장검색 박스에 검색어 입력후 엔터치면

    searchBox.addEventListener("keydown", function (e) {
      if (e.keyCode == 13) {
        // 엔터키가 눌렸을 때
        _storeList.innerHTML = "";
        var trIndex = 0;

        for (var i = 0; i < storeValue.length; i++) {
          var storeCon = storeValue[i];
          var storeName = storeCon.storeName;
          var storeOpen = storeCon.storeOpen;

          if (storeName.indexOf(e.target.value) != -1) {
            console.log(storeName);

            _storeList.append(document.createElement("tr"));

            if (storeOpen == "preparing") {
              _storeList.children[trIndex].classList.add("off");
            }

            _storeList.children[trIndex].innerHTML = "<td class=\"storeInfo\">\n              <div class=\"storeName\" data-store-code=\"" + storeValue[i].storeCodeName + "\">" + storeValue[i].storeName + "</div>\n              <div class=\"storeAddress\">" + storeValue[i].storeAddress + "</div>\n              <div class=\"storeMap\">" + storeValue[i].storeDistance + "</div>\n              </td>\n              <td class=\"storeImgBox\">\n              <img class=\"storeImg\" src=\"../resource/img/store/" + storeValue[i].storeCodeName + ".jpg\" alt=\"\">\n              <div class=\"favorite\"><i class=\"icon-favorite_star_circle\"></i></div>\n            </td>";
            trIndex++;
          }
        }
      }
    }); //close searchBox keydown
  }
}

storeSearchList(); //! index.html 유저 추천메뉴 

function userRecommended() {
  var sugestionMenu = document.querySelector(".sugestionMenu .swiper-wrapper");

  if (sugestionMenu) {
    var userID = new URL(location.href).searchParams.get("userId"); //유저아이디
    //console.log(userID)

    var _userRecommended = []; // 유저추천메뉴

    for (var i = 0; i < _db.memberDB.Member.length; i++) {
      if (_db.memberDB.Member[i]["id"] == userID) {
        _userRecommended = _db.memberDB.Member[i]["userRecommended"];
      }
    }

    for (var j = 0; j < _userRecommended.length; j++) {
      var $div = document.createElement("div");
      sugestionMenu.prepend($div);
      $div.className = "swiper-slide";

      for (var k = 0; k < menuValue.length; k++) {
        if (menuValue[k][_userRecommended[j]] != undefined) {
          var menuInfo = menuValue[k][_userRecommended[j]];
          var menuCode = _userRecommended[j]; //console.log(menuInfo.prdName.ko)

          $div.innerHTML = "\n            <a href=\"./page/storeChoice.html?" + userID + "\">\n              <img src=\"./resource/img/menu/" + menuInfo.prdCategory.language.en + "/" + menuInfo.prdCategory.temperature + "/" + menuCode + ".jpg\" alt=\"\">\n              <div class=\"title\"></div>\n            </a>\n          ";

          if (menuInfo.prdCategory.temperature != "none") {
            $div.children[0].children[1].innerHTML = "(" + menuInfo.prdCategory.temperature + ")" + menuInfo.prdName.ko;
          } else {
            $div.children[0].children[1].innerHTML = menuInfo.prdName.ko;
          }
        }
      }
    }
  }
}

userRecommended();

function basketBtn() {
  var basketAll = [];
  var basketBtn = document.querySelector(".basketBtn");

  if (basketBtn) {
    //상품하나 담고 다른거 상품 담는 경우 누적되도록
    if (localStorage.getItem("basketList") != null) {
      basketAll = JSON.parse(localStorage.getItem("basketList"));
    }

    basketBtn.addEventListener("click", function () {
      var selectOptionList = []; //메인상품 가격 및 옵션

      var buyPrdData = {
        prdName: document.querySelector("#prdDetail .prdName").innerText,
        prdCode: new URL(location.href).searchParams.get("prdCode"),
        prdOption: selectOptionList,
        prdPrice: document.querySelector(".orderBottom .totalBox b").innerText,
        prdCount: Number(document.querySelector(".orderBottom .prdCountBox .prdCount").value),
        prdImg: document.querySelector("#prdDetail > img").getAttribute("src")
      }; //주문시 선택한 옵션 리스트 셋팅

      var selectOptionTitle = document.querySelectorAll(".optionBox div[class^='option_'] input");
      selectOptionTitle.forEach(function (el) {
        if (el.checked == true) {
          selectOptionList.push(el.value);
        }
      }); //함께 구매한 추천상품명, 가격, 메뉴코드

      var buyRecommendedPrdData = {
        prdName: "",
        prdCode: "",
        prdPrice: 0,
        prdCount: 1,
        prdImg: ""
      }; //추천상품중에서 체크되어있는 상품만 정보 셋팅

      document.querySelectorAll(".recoInfo").forEach(function (el) {
        var recoCheckBox = el.nextElementSibling;

        if (recoCheckBox.checked == true) {
          buyRecommendedPrdData.prdName = String(el.querySelector(".recoName").innerText);
          buyRecommendedPrdData.prdCode = String(el.querySelector(".recoName").getAttribute("data-menu-code"));
          buyRecommendedPrdData.prdPrice = String(el.querySelector(".recoPrice").innerText);
          buyPrdData.prdPrice = (document.querySelector(".orderBottom .totalBox b").innerText.replace(/[^0-9]/g, "") - el.querySelector(".recoPrice").innerText.replace(/[^0-9]/g, "")).toLocaleString("ko-KR") + "원";
          console.log(buyPrdData.prdPrice);
          localStorage.setItem("buyItemInfo", JSON.stringify(buyRecommendedPrdData));
          basketAll.push(buyRecommendedPrdData);
        }
      });
      localStorage.setItem("buyItemInfo", JSON.stringify(buyPrdData));
      basketAll.push(buyPrdData);
      localStorage.setItem("basketList", JSON.stringify(basketAll));
      document.querySelector(".cartCount").innerText = basketAll.length;
    });
  }
}

basketBtn();

function basketCountSet() {
  var basketCountBox = document.querySelector(".cartCount");

  if (basketCountBox) {
    var nowBasketListCount = 0; //로컬에 저장된 값이 있으면 가져오기

    var nowBasketList = JSON.parse(localStorage.getItem("basketList"));

    if (nowBasketList != null) {
      nowBasketListCount = nowBasketList.length;
    }

    basketCountBox.innerText = nowBasketListCount;
  }
}

basketCountSet();

function basketListSet() {
  var basketPageCk = document.querySelector("#order.basket");

  if (basketPageCk) {
    //로컬에 저장된 장바구니 담은 상품 정보 가져오기
    var nowBasketList = JSON.parse(localStorage.getItem("basketList")); //상품 주문한 지점명 노출

    var selStoreName = JSON.parse(localStorage.getItem("orderStore"))[0];
    document.querySelector("#storeName").innerText = selStoreName; //장바구니가 비어있는 경우

    if (nowBasketList == null) {
      nowBasketList = 0;
      document.querySelector(".basketEmpty").style.display = "flex";
    } else {
      // close nowBasketList
      var countNDelEvent = function countNDelEvent(parent, parentIndex, elMainPrice) {
        //상품 개수 추가
        var prdCountBtnUp = parent.querySelector(".upBtn");
        var prdCountBtnDown = parent.querySelector(".downBtn");
        var prdCountBox = parent.querySelector(".prdCount");
        var prdPrice = parent.querySelector(".prdPrice");
        prdCountBtnUp.addEventListener("click", function (el) {
          var prdCount = Number(parent.querySelector(".prdCount").innerText);
          prdCount++;
          prdCountBox.innerText = prdCount;

          if (prdCount > 1) {
            var prdNowPrice = Number(prdPrice.innerText.replace(/[^0-9]/g, ""));
            prdNowPrice += elMainPrice;
            prdPrice.innerText = prdNowPrice.toLocaleString("ko-KR") + "\uC6D0";
            basketTotalSet();
          }
        });
        prdCountBtnDown.addEventListener("click", function (el) {
          var prdCount = Number(parent.querySelector(".prdCount").innerText);

          if (prdCount > 1) {
            prdCount--;
            prdCountBox.innerText = prdCount;
            var prdNowPrice = Number(prdPrice.innerText.replace(/[^0-9]/g, ""));
            prdNowPrice -= elMainPrice;
            prdPrice.innerText = prdNowPrice.toLocaleString("ko-KR") + "\uC6D0";
            basketTotalSet();
          } else {
            alert("1개이상 구매가 가능합니다.");
          }
        }); //장바구니 상품 삭제

        var prdDelBtn = parent.querySelector(".delBtn");
        prdDelBtn.addEventListener("click", function (delBtn) {
          //현재 장바구니 리스트 배열에서 해당하는 객체 삭제
          nowBasketList.splice(parentIndex, 1);
          console.log(nowBasketList);

          if (nowBasketList == "") {
            //삭제하여 장바구니에 아무것도 없는 경우
            localStorage.removeItem("basketList");
            localStorage.removeItem("buyItemInfo");
            parent.remove();
            document.querySelector(".basketEmpty").style.display = "flex";
          } else {
            //위에서 삭제한 리스트를 다시 로컬에 셋팅
            localStorage.setItem("basketList", JSON.stringify(nowBasketList));
            parent.remove();
          }
        });
      }; //close countNDelEvent


      var basketTotalSet = function basketTotalSet() {
        var listPriceSet = document.querySelectorAll(".basketList .prdPrice");
        var basketTotal = 0;
        listPriceSet.forEach(function (listPrice) {
          basketTotal += Number(listPrice.innerText.replace(/[^0-9]/g, ""));
          document.querySelector(".orderBottom b").innerText = basketTotal.toLocaleString("ko-KR") + "\uC6D0";
        });
      };

      //장바구니에 상품이 있는 경우
      //장바구니 비어있습니다 비노출
      document.querySelector(".basketEmpty").style.display = "none";
      var basketList = basketPageCk.querySelector(".basketList");
      nowBasketList.forEach(function (basketLi, liIndex) {
        var $li = document.createElement("li");
        basketList.append($li);
        var elEn = "";
        var elTemperature = "";
        var elMainPrice = 0; //주문한 상품 정보 확인

        menuValue.forEach(function (value) {
          var menu = value[basketLi.prdCode];

          if (menu != undefined) {
            elEn = menu.prdCategory.language.en;
            elTemperature = menu.prdCategory.temperature;
            elMainPrice = menu.prdPrice;
          }

          return false;
        }); //주문한 상품 정보 셋팅

        $li.innerHTML = "\n            <div class=\"prdImg\"><img src=\"" + basketLi.prdImg + "\" alt=\"\"></div>\n            <div class=\"basketPrd\">\n              <div class=\"prdName\">" + basketLi.prdName + "</div>\n              <ul>\n              </ul>\n              <div class=\"delBtn\"><button><i class=\"icon-cancel\"></i></button></div>\n              <div class=\"prdCountBox\">\n                <div class=\"countBox\">\n                  <button class=\"downBtn\" type=\"button\" aria-label=\"\uC218\uB7C9\uB0B4\uB9AC\uAE30\"><i class=\"icon-circle_minus\"></i></button>\n                  <div class=\"prdCount\">" + basketLi.prdCount + "</div>\n                  <button class=\"upBtn\" type=\"button\" aria-label=\"\uC218\uB7C9\uC62C\uB9AC\uAE30\"><i class=\"icon-circle_plus\"></i></button>\n                </div>\n                <div class=\"prdPrice\">" + basketLi.prdPrice + "</div>\n              </div>\n            </div>\n            \n        "; //주문한 상품의 옵션 나열

        if (basketLi.prdOption) {
          basketLi.prdOption.forEach(function (option) {
            var optionLi = document.createElement("li");
            optionLi.innerText = option;
            $li.querySelector(".basketPrd ul").append(optionLi);
          });
        } //상품에 따른 카운트 및 삭제 실행


        countNDelEvent($li, liIndex, elMainPrice);
      });
      basketTotalSet();
    } //

  }
}

basketListSet(); //!주문완료시 로컬스토리지 리셋 관련하여 처리 작업 필요 - 멤버아이디 장바구니 선택매장

function paymentPageSet() {
  var paymentPage = document.querySelector("#order.payment");

  if (paymentPage) {
    //로컬에 있는 매장명 가져와서 노출
    var storeName = JSON.parse(localStorage.getItem("orderStore"));
    document.querySelector("#storeName").innerText = storeName[0]; //로컬에 있는 주문상품 가져와서 노출

    var buyList = JSON.parse(localStorage.getItem("basketList"));
    var orderList = document.querySelector("#orderList");
    buyList.forEach(function (el) {
      var buyLi = document.createElement("li");
      orderList.append(buyLi);
      buyLi.innerHTML = "\n      <div class=\"prdImg\"><img src=\"" + el.prdImg + "\" alt=\"\"></div>\n      <div class=\"basketPrd\">\n        <div class=\"prdName\">" + el.prdName + "</div>\n        <ul class=\"optionList\">\n        </ul>\n        <div class=\"prdCountBox\">\n          <div class=\"countBox\">\n            <div class=\"prdCount\">" + el.prdCount + "\uAC1C</div>\n          </div>\n          <div class=\"prdPrice\">" + el.prdPrice + "</div>\n        </div>\n      </div>\n      "; //주문한 상품의 옵션 나열

      if (el.prdOption) {
        el.prdOption.forEach(function (option) {
          var optionLi = document.createElement("li");
          optionLi.innerText = option;
          buyLi.querySelector(".basketPrd ul").append(optionLi);
        });
      }
    }); //주문할 상품 축약 안내 및 토글클릭시 주문상품 요약 노출

    var orderContraction = document.querySelector(".orderContraction");
    orderContraction.innerText = buyList[0].prdName + " \uC678 " + (buyList.length - 1) + "\uAC74";
    var payToggleBtn = document.querySelector(".payment .toggleBtn");
    payToggleBtn.addEventListener("click", function () {
      orderList.classList.toggle("open");
      payToggleBtn.querySelector("i").classList.toggle("icon-angle_up");
    });
  }
}

paymentPageSet();

function orderBtn() {
  var orderBtn = document.querySelector(".orderBtn");

  if (orderBtn) {}
}

orderBtn();
//# sourceMappingURL=main.dev.js.map
