const $button = document.querySelectorAll("button");
const $cashBtnMinus = document.querySelectorAll(".minusBtn");
const $cashBtnPlus = document.querySelectorAll(".plusBtn");
const $inventoryQuantity = document.querySelector("#inventoryQuantity");
//식권 가격
const $ticketPrice = 3200;

document.querySelector("#ticketPrice").innerText = $ticketPrice + "원";

/*
  ^ 버튼들 호버시 스타일 변경
 */
const buttonHover = () => {
  $button.forEach((e) => {
    e.addEventListener("mouseover", () => {
      e.classList.add("on");
    });
    e.addEventListener("mouseout", () => {
      e.classList.remove("on");
    });
  });
};
buttonHover();

/*
  ^ 개수 카운트 변경
*/
function cashBtnClick() {
  $cashBtnMinus.forEach((el, index) => {
    el.addEventListener("click", () => {
      let countTd = el.parentElement.nextElementSibling.innerText;
      let tempNum = Number(countTd);
      if (tempNum >= 1) {
        tempNum--;
        el.parentElement.nextElementSibling.innerText = tempNum;
      } else {
        alert("1개이상 구매가능합니다.");
      }
      calCulation(el);
    });
  });

  $cashBtnPlus.forEach((el, index) => {
    el.addEventListener("click", () => {
      let countTd = el.parentElement.previousElementSibling.innerText;
      let tempNum = Number(countTd);
      tempNum++;
      el.parentElement.previousElementSibling.innerText = tempNum;
      calCulation(el);
    });
  });
}
cashBtnClick();

//금액대
let amountType = [50000, 10000, 5000, 1000, 500, 100];

let inventoryNum = 0; //식권 충전 개수 누적

let adminCashAccumulate = []; //관리자 금액대별 충전금액 누적치
let userCashAccumulate = []; //사용자 금액대별 충전금액 누적치

let adminCashTotalList = []; //관리자가 금액대별 한번 충전할 금액
let userCashTotalList = []; //사용자가 금액대별 충전한 금액

amountType.forEach(() => {
  adminCashAccumulate.push(0);
  userCashAccumulate.push(0);

  adminCashTotalList.push(0);
  userCashTotalList.push(0);
});

function charging() {
  //상단 관리자 금액대 리스트
  let adminCashList = document.querySelector("#adminCashList");
  //관리자 충전 총 금액 노출 박스
  let adminChargingPriceTotal = document.querySelector("#adminChargingPriceTotal");
  //관리자 금액 충전 버튼
  let adminCashChargingBtn = document.querySelector("#adminCashChargingBtn");
  //관리자 티켓 충전 버튼
  let ticketChargingBtn = document.querySelector("#ticketChargingBtn");

  //!관리자 잔돈 충전
  adminCashChargingBtn.addEventListener("click", () => {
    //금액대별 충전 요청한 금액리스트인 adminCashTotalList를
    //cashAccumulate 로 누적하여 현재까지 금액대별로 충전된 금액 확인
    adminCashTotalList.forEach((el, index) => {
      adminCashAccumulate[index] += el;
    });

    //console.log(adminCashTotalList)

    //화면에 금액대별 충전된 금액 노출
    adminCashList
      .querySelectorAll("ul li .title + span")
      .forEach((el, index) => {
        el.innerText =
          adminCashAccumulate[index].toLocaleString("ko-KR") + `원`;
      });

    //관리자가 현재까지 충전한 총 금액 계산 및 노출

    adminChargingPriceTotal.innerText =
      adminCashAccumulate.reduce((a, b) => a + b, 0).toLocaleString("ko-KR") +
      `원`;

    //관리자의 충전에 따라서 사용자 오픈처리
    userTableOpen(inventoryNum);

    //잔돈 충전 금액대별 카운트 및 충전할 총 금액 리셋
    let adminCashTable = document.querySelector("#adminCashTable");
    adminCashTable.querySelectorAll(".count").forEach((countEl) => {
      countEl.innerText = 0;
    });
    adminCashTable.querySelector(".cashTotal").innerText = 0 + `원`;

    //한번 충전용 리스트 초기화
    amountType.forEach((el, index) => {
      adminCashTotalList[index] = 0;
    });
  });

  //!관리자 식권 충전
  //충전하기 버튼 클릭에 따라서 식권 개수 누적 노출 처리
  ticketChargingBtn.addEventListener("click", () => {
    let adminCountTable = document.querySelector("#adminCountTable");
    let ticketCount = adminCountTable.querySelector(".ticketCount");

    inventoryNum += Number(ticketCount.innerText);
    $inventoryQuantity.innerText = inventoryNum + `개`;

    //관리자의 충전에 따라서 사용자 오픈처리
    userTableOpen(inventoryNum);
    //충전한 후 리셋
    ticketCount.innerText = 1;
  });

  //사용자 금액 투입 버튼
  let userCashChargingBtn = document.querySelector("#userCashChargingBtn");
  
  //사용자 티켓 구입 버튼
  let userTicketBuyBtn = document.querySelector("#userTicketBuyBtn");

  //사용자 티켓 매수 카운트 테이블
  let userCountTable = document.querySelector("#userCountTable");

  //사용자 티켓 구입 개수
  let ticketCount = userCountTable.querySelector(".ticketCount");

  //사용자 현재까지 충전한 총 금액 노출 박스
  let userChargingPriceTotal = document.querySelector("#userChargingPriceTotal");

  //!사용자 금액 투입
  userCashChargingBtn.addEventListener("click", () => {
    //사용자 금액대별 투입 금액 누적
    userCashTotalList.forEach((el, index) => {
      userCashAccumulate[index] += el;
    });

    //사용자가 현재까지 충전한 총 금액 계산
    let userChargingPriceTotalNum = userCashAccumulate.reduce((a, b) => a + b, 0);
    
    //사용자가 현재까지 충전한 총 금액 노출
    userChargingPriceTotal.innerText = userChargingPriceTotalNum.toLocaleString("ko-KR") + `원`;

    //사용자 테이블의 충전 금액대별 카운트 및 투입할 총 금액 리셋
    let userCashTable = document.querySelector("#userCashTable");
    userCashTable.querySelectorAll(".count").forEach((countEl) => {
      countEl.innerText = 0;
    });
    userCashTable.querySelector(".cashTotal").innerText = 0 + `원`;

    //한번 투입용 리스트 초기화
    amountType.forEach((el, index) => {
      userCashTotalList[index] = 0;
    });

    //*금액 투입 후에 식권 한개 금액보다 투입한 금액이 크면 식권 구입하기 버튼 활성화
    //console.log($ticketPrice, userChargingPriceTotalNum)
    if ($ticketPrice <= userChargingPriceTotalNum) {
      userTicketBuyBtn.disabled = false;
    }
  });

  

  //!사용자 식권 구입
  userTicketBuyBtn.addEventListener("click", () => {
    //충전한 총금액 확인
    let userChargingPriceTotalNum = Number(userChargingPriceTotal.innerText.replace(/[^0-9]/g, ""));

    //사용자가 결제할 총 금액 = 구매할 티켓 개수 * 티켓 가격
    let userPayTotal = Number(ticketCount.innerText) * $ticketPrice;

    //거스름돈 총 금액
    let totalChange = userChargingPriceTotalNum - userPayTotal;
    let userTotalChange = userChargingPriceTotalNum - userPayTotal; //고객 거스름돈 출력용
    let adminChangeList = []; //관리자 충전된 금액대별 개수 리스트
    let userChangeList = []; //관리자가 사용자에게 주는 금액대별 개수 리스트
    let resultChangeList = []; //관리자가 사용자에게 주고 남은 금액대별 개수 리스트

    //관리자가 가지고 있는 금액대별 개수 계산 및 배열 셋팅
    amountType.forEach((el, index) => {
      userChangeList.push(0)
      let amountTypeCount = adminCashAccumulate[index] / el;
      if (amountTypeCount > 0) {
        adminChangeList.push(amountTypeCount);
      } else {
        adminChangeList.push(0);
      }
    });
    
    resultChangeList = [...adminChangeList]
    
    for(let i = 0; i < adminChangeList.length; i++){ //금액권별로
      for(let j = 0; j < adminChangeList[i]; j++){ //해당 금액권의 개수만큼 돌리며 확인
        
        //금액권의 개수가 1개이상이고 해당 금액권이 거스름돈 보다 작거나 같으면
        if(0 < adminChangeList[i] && amountType[i] <= totalChange){
          totalChange -= amountType[i]
          userChangeList[i] += 1
          resultChangeList[i] -= 1
        }
        if(totalChange == 0){
          break
        }
        
      }
    }
    console.log( adminChangeList ,userChangeList , resultChangeList, totalChange)
    
    
    let buySuccess = true; //구매성공여부
    let guideMessage = ""; //구매실패시 노출할 멘트
    
    //*관리자가 거스러줄 금액이 모자르면
    if(0 < totalChange){
      guideMessage += "현재 잔돈이 없어 구매가 불가합니다. 관리자에서 " + totalChange + "원 충전이 필요합니다.";
      buySuccess = false;
    }

    //*충전된 식권의 개수보다 사용자가 구입하려는 식권의 개수가 많으면
    if (inventoryNum < Number(ticketCount.innerText)) {
      guideMessage += `현재 구매 가능한 식권 수량은 ` + inventoryNum + `개 입니다. `;
      buySuccess = false;
    }
    //*충전한 금액이 식권 결제할 비용 보다 적으면
    if (userChargingPriceTotalNum < userPayTotal) {
      let shortfallAmount = userPayTotal - userChargingPriceTotalNum; //모자란 금액
      guideMessage += Number(ticketCount.innerText) + `개 구매하려면 ` + shortfallAmount + `원이 부족합니다.`;
      buySuccess = false;
    }
    
  
    
    //*구매에 성공하면
    if (buySuccess) {
    
      //거스름돈 주고 남은 금액으로 변경
      resultChangeList.forEach((el,index)=>{
        adminCashAccumulate[index] = amountType[index] * el
      })
      
      //관리자 거스름돈 주고 남은 충전 총 금액 계산하여 다시 노출
      adminChargingPriceTotal.innerText = adminCashAccumulate.reduce((a, b) => a + b, 0).toLocaleString("ko-KR") + `원`;
        
      //화면에 금액대별 충전된 금액 변경 노출
      adminCashList.querySelectorAll("ul li .title + span").forEach((el, index) => {
        el.innerText = adminCashAccumulate[index].toLocaleString("ko-KR") + `원`;
      });  

      //관리자에서 충전 되어있는 식권 개수 차감
      inventoryNum -= Number(ticketCount.innerText);
      $inventoryQuantity.innerText = inventoryNum + `개`;
      
      //사용자 충전 금액 리셋
      userChargingPriceTotal.innerText = 0 + `원`;
      

      receiptConfirm(
        "구매에 성공하였습니다. 영수증을 발행하시겠습니까?",
        userPayTotal,
        userChargingPriceTotalNum,
        userTotalChange,
        userChangeList
      );
    } else {
      guidePop(guideMessage);
    }


  
    
  });
}
charging();

//!영수증 노출여부 확인 팝업
function receiptConfirm(
  guideMessage,
  userPayTotal,
  userChargingPriceTotalNum,
  userTotalChange,
  userChangeList
) {
  let guideBox = document.createElement("div");
  guideBox.id = "guideBox";
  guideBox.innerHTML =
    `
  <div class="inner">
    <img src="info_icon.png" alt="">
    <p>` +
    guideMessage +
    `</p>
    <button class="receiptOpen">영수증 발행</button>
    <button class="close">닫기</button>
  </div>
  `;
  //guideMessage;
  document.body.append(guideBox);

  guideBox.querySelector(".close").addEventListener("click", () => {
    document.querySelector("#guideBox").remove();
  });
  guideBox.querySelector(".receiptOpen").addEventListener("click", () => {
    document.querySelector("#guideBox").remove();
    receiptPop(
      userPayTotal,
      userChargingPriceTotalNum,
      userTotalChange,
      userChangeList
    );
  });
}

//!영수증노출 - 결제금액,투입금액,총거스름돈,금액대별 거스름돈
function receiptPop(
  userPayTotal,
  userChargingPriceTotalNum,
  userTotalChange,
  userChangeList
) {
  
  let receipt = document.querySelector("#receipt")
  let receiptTr = receipt.querySelectorAll("table tr");

  receiptTr[1].children[1].innerText =
    userPayTotal.toLocaleString("ko-KR") + `원`;
  receiptTr[2].children[1].innerText =
    userChargingPriceTotalNum.toLocaleString("ko-KR") + `원`;
  receiptTr[3].children[1].innerText =
  userTotalChange.toLocaleString("ko-KR") + `원`;

  //타이틀을 제외한 1번째 순서부터 값 넣기
  for (let i = 4; i < receiptTr.length - 2; i++) {
    receiptTr[i].children[1].innerText =
      amountType[i - 4] * userChangeList[i - 4].toLocaleString("ko-KR") + `원`;
  }
  
  document.querySelector("#receipt .close").addEventListener("click", () => {
    receipt.style.display = "none"
  })
  
  receipt.style.display = "flex";
  
  
  
}

//!클릭한 부모에 따른 배열 셋팅
//!충전할 총금액 노출 및 투입할 총 금액 노출
function calCulation(el) {
  let cashTotal = 0; //충전할 총 금액
  let parentCashTable = el.closest("table"); //클릭한 버튼의 부모테이블
  let cashTotalBox = parentCashTable.querySelector(".cashTotal"); //클릭한 부모테이블의 총금액

  if (cashTotalBox) {
    /*
      ^클릭한 요소의 부모값에 따라서 해당하는 배열로 값 넣기
    */
    //관리자
    if (parentCashTable.id == "adminCashTable") {
      parentCashTable.querySelectorAll(".count").forEach((el, index) => {
        adminCashTotalList[index] = Number(el.innerText) * amountType[index];
      });

      adminCashTotalList.forEach((el, index) => {
        cashTotal += el;
      });
    } else if (parentCashTable.id == "userCashTable") {
      //사용자
      parentCashTable.querySelectorAll(".count").forEach((el, index) => {
        userCashTotalList[index] = Number(el.innerText) * amountType[index];
      });

      userCashTotalList.forEach((el, index) => {
        cashTotal += el;
      });
    }

    cashTotalBox.innerText = cashTotal.toLocaleString("ko-KR") + "원";
  }
}

//!사용자 테이블 오픈
function userTableOpen(inventoryNum) {
  //관리자가 충전한 금액이 있고 식권재고가 있으면 사용자 테이블 오픈되도록
  let adminChargingPriceTotal = Number(
    document
      .querySelector("#adminChargingPriceTotal")
      .innerText.replace(/[^0-9]/g, "")
  );

  if (inventoryNum > 0 && adminChargingPriceTotal > 0) {
    let userTable = document.querySelector("#userTable");
    userTable
      .querySelectorAll("button:not(#userTicketBuyBtn)")
      .forEach((el) => {
        el.disabled = false;
      });
  }
}

//!구매불가시 안내 문구 오픈
function guidePop(guideMessage) {
  let guideBox = document.createElement("div");
  guideBox.id = "guideBox";
  guideBox.innerHTML =
    `
  <div class="inner">
    <img src="info_icon.png" alt="">
    <p>` +
    guideMessage +
    `</p>
    <button class="close">닫기</button>
  </div>
  `;
  //guideMessage;
  document.body.append(guideBox);

  guideBox.querySelector(".close").addEventListener("click", () => {
    document.querySelector("#guideBox").remove();
  });
}

//TODO 금액이 모자란게 맞지않고 있음 수정필요
//TODO 영수증 발행시 금액대별 얼마 거스름돈인지 내용 표시 필요
