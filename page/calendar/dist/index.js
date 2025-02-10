//!현재 타임 노출
function setTime(calendarBox) {
    var nowTimeBox = calendarBox.querySelector(".nowTime");
    nowTimeBox.innerText = new Date().toLocaleTimeString();
}
//!현재 년,월,일,요일 노출
function setDate(calendarBox) {
    var thisYear = new Date().getFullYear();
    var thisMonth = new Date().getMonth();
    var thisDate = new Date().getDate();
    var thisDay = new Date().getDay();
    var dayList = ["일", "월", "화", "수", "목", "금", "토"];
    calendarBox.querySelector(".nowDate").innerText =
        thisYear +
            "\uB144 " +
            (thisMonth + 1) +
            "\uC6D4 " +
            thisDate +
            "\uC77C " +
            dayList[thisDay] +
            "\uC694\uC77C";
    calendarBox.querySelector("#year input").value = thisYear;
    calendarBox.querySelector("#month input").value = thisMonth + 1;
}
//!기본 테이블구조 셋팅
function dayTableSet(calendarBox) {
    var daySection = calendarBox.querySelector("#daySection"); //현재 월
    var dayList = ["일", "월", "화", "수", "목", "금", "토"];
    var $columnHeaderWarp = document.createElement("div");
    $columnHeaderWarp.id = "columnHeaderWarp";
    daySection.append($columnHeaderWarp);
    dayList.forEach(function (day) {
        var $columnHeader = document.createElement("div");
        $columnHeader.setAttribute("role", "columnHeader");
        $columnHeaderWarp.append($columnHeader);
        $columnHeader.innerText = day;
    });
    for (var i = 0; i < 7 * 6; i++) {
        var $dayBox = document.createElement("div");
        $dayBox.classList.add("day");
        $dayBox.innerHTML = "<div class=\"dayNum\"></div>";
        daySection.append($dayBox);
    }
}
//!테이블 구조에 데이터 셋팅
function dayDataSet(calendarBox) {
    var yearCheck = Number(calendarBox.querySelector("#year input").value);
    var monthCheck = Number(calendarBox.querySelector("#month input").value - 1); //
    //구하려는 년도와 월의 1일 요일(인덱스) & 말일(일자)
    var nowYear = new Date().getFullYear();
    var nowMonth = new Date().getMonth();
    var nowDate = new Date().getDate();
    var firstIndex = new Date(yearCheck, monthCheck, 1).getDay();
    var lastDate = new Date(yearCheck, monthCheck + 1, 0).getDate();
    var daySection = calendarBox.querySelector("#daySection"); //현재 월
    var holiDay = [
        { dayName: "새해 첫날", month: 1, day: 1, Lunar: false },
        { dayName: "삼일절", month: 3, day: 1, Lunar: false },
        { dayName: "어린이날", month: 5, day: 5, Lunar: false },
        { dayName: "현충일", month: 6, day: 6, Lunar: false },
        { dayName: "광복절", month: 8, day: 15, Lunar: false },
        { dayName: "개천절", month: 10, day: 3, Lunar: false },
        { dayName: "한글날", month: 10, day: 9, Lunar: false },
        { dayName: "성탄절", month: 12, day: 25, Lunar: false },
        //음력
        { dayName: "부처님 오신날", month: 4, day: 8, Lunar: true },
        { dayName: "추석 연휴", month: 8, day: 15, Lunar: true },
        { dayName: "설날 연휴", month: 1, day: 1, Lunar: true },
    ];
    //양력 -> 음력 날짜 변환
    for (var h = 0; h < holiDay.length; h++) {
        if (holiDay[h].Lunar == true) {
            var holiDayMonth = String(holiDay[h].month);
            var holiDayDay = String(holiDay[h].day);
            if (holiDay[h].month < 10) {
                holiDayMonth = "0" + holiDayMonth;
            }
            if (holiDay[h].day < 10) {
                holiDayDay = "0" + holiDayDay;
            }
            var lunaDate = yearCheck + holiDayMonth + holiDayDay;
            var lunaMonth = Number(lunaDate.substring(0, 2));
            var lunaDay = Number(lunaDate.substring(2));
            //console.log(lunaMonth, lunaDay)
            holiDay[h].month = lunaMonth;
            holiDay[h].day = lunaDay;
        }
    }
    var dayNumBox = daySection.querySelectorAll(".dayNum");
    var dayBox = daySection.querySelectorAll(".day");
    var dayFirst = 1;
    for (var i = 0; i < 7 * 6; i++) {
        if (i >= firstIndex && dayFirst <= lastDate) {
            //해당월에 있는 날짜인 경우
            dayBox[i].style.display = "block";
            dayBox[i].classList.remove("noDay");
            dayNumBox[i].innerText = dayFirst;
            //공휴일표시
            for (var h = 0; h < holiDay.length; h++) {
                var $holiDayBox = document.createElement("div");
                $holiDayBox.innerText = holiDay[h].dayName;
                $holiDayBox.classList.add("holiDay");
                //달력넘김시 주말,공휴일 표시 리셋용
                if (dayBox[i].querySelector(".holiDay") != null) {
                    dayBox[i].querySelector(".holiDay").remove();
                    dayBox[i].querySelector(".dayNum").classList.remove("on");
                }
                //달력넘김시 설날&추석 연휴 표시 리셋용
                if (dayBox[i + 1].querySelector(".bridgeHoliDay") != null) {
                    dayBox[i + 1].querySelector(".bridgeHoliDay").previousSibling.classList.remove("on");
                    dayBox[i + 1].querySelector(".bridgeHoliDay").remove();
                }
                if (holiDay[h].month - 1 == monthCheck && dayFirst == holiDay[h].day) {
                    if (holiDay[h].dayName == "설날 연휴" || holiDay[h].dayName == "추석 연휴") {
                        for (var k = -1; k < 2; k++) {
                            if (k != 0) {
                                var $bridgeHoliDayBox = document.createElement("div");
                                $bridgeHoliDayBox.innerText = holiDay[h].dayName;
                                $bridgeHoliDayBox.classList.add("bridgeHoliDay");
                                dayBox[i + k].append($bridgeHoliDayBox);
                                dayBox[i + k].querySelector(".bridgeHoliDay").previousSibling.classList.add("on");
                            }
                        }
                    }
                    if (dayBox[i].querySelector(".holiDay") == null) {
                        dayBox[i].append($holiDayBox);
                        dayBox[i].querySelector(".dayNum").classList.add("on");
                        break;
                    }
                }
            } //holiDay for close
            //오늘 날짜 표시
            if (dayFirst == nowDate &&
                monthCheck == nowMonth &&
                yearCheck == nowYear) {
                dayBox[i].classList.add("toDay");
            }
            else {
                dayBox[i].classList.remove("toDay");
            }
            //주말 표시
            if (i % 7 == 0) {
                dayBox[i].querySelectorAll(".dayNum").forEach(function (el) {
                    el.classList.add("sunDay");
                });
                if (i > 0) {
                    dayBox[i - 1].querySelectorAll(".dayNum").forEach(function (el) {
                        el.classList.add("saturDay");
                    });
                }
            }
            dayFirst++;
        }
        else {
            //해당 월에 없는 날짜인경우
            dayBox[i].classList.add("noDay");
            dayNumBox[i].innerText = "";
            if (dayBox[i].children[1] != null) {
                dayBox[i].children[1].remove();
            }
        }
        //박스 길이 조절용 35번째 박스에 내용이 있는 경우와
        //없는 경우에 따라서 박스 길이 자르기
        if (i == 35 && dayBox[i].classList.contains("noDay")) {
            removeBox(true);
        }
        else if (i == 35 && dayBox[i].classList.contains("noDay") != true) {
            removeBox(false);
        }
        function removeBox(action) {
            for (var j = 35; j < 42; j++) {
                if (action) {
                    dayBox[j].classList.add("cut");
                }
                else {
                    dayBox[j].classList.remove("cut");
                }
            }
        }
    } //42열 박스 만들기용 for close
}
//!달력 데이터 변경
function changeEvent(calendarBox) {
    var controlBox = calendarBox.querySelector("#controlBox");
    var plusBtn = controlBox.querySelector(".plusBtn");
    var minusBtn = controlBox.querySelector(".minusBtn");
    var monthInput = controlBox.querySelector("#month input");
    var month = Number(monthInput.value);
    var yearInput = controlBox.querySelector("#year input");
    var year = Number(yearInput.value);
    monthInput.addEventListener("change", function (event) {
        month = Number(monthInput.value);
        if (1 > month || month > 12) {
            alert("월 범위는 1 ~ 12 까지입니다.");
            monthInput.value = new Date().getMonth() + 1;
            month = Number(monthInput.value);
        }
        dayDataSet(calendarBox);
    });
    yearInput.addEventListener("change", function (event) {
        year = Number(yearInput.value);
        if (1841 >= year || year >= 2043) {
            alert("연도 범위는 1841 ~ 2043 까지입니다.");
            yearInput.value = new Date().getFullYear();
            year = Number(monthInput.value);
        }
        dayDataSet(calendarBox);
    });
    //pageUp
    plusBtn.addEventListener("click", function () {
        if (1 < month && month <= 12) {
            month -= 1;
        }
        else {
            yearInput.value = Number(yearInput.value) - 1;
            year -= 1;
            month = 12;
            /*alert("월 범위는 1 ~ 12 까지입니다.");*/
        }
        monthInput.value = month;
        dayDataSet(calendarBox);
    });
    //pageDown
    minusBtn.addEventListener("click", function () {
        if (1 <= month && month < 12) {
            month += 1;
        }
        else {
            yearInput.value = Number(yearInput.value) + 1;
            year += 1;
            month = 1;
        }
        monthInput.value = month;
        dayDataSet(calendarBox);
    });
}
/*
//!달력 드래그 이벤트
function dragChange(calendarBox){
  let dragBottomEl = calendarBox.querySelectorAll(".day")
  dragBottomEl.forEach((el,index)=>{
    if(index > 18){
      el.addEventListener("dragenter", (e) => {
        
      });
    }
  })
}
*/
//!캘린더 기본 구조 셋팅 및 함수호출
function calendar(elId) {
    var date = new Date();
    var calendarBox = document.querySelector(elId);
    if (calendarBox) {
        calendarBox.innerHTML = "\n        <div id=\"header\">\n          <h1><img src=\"myCalendarLogo.png\"></h1>\n          <div id=\"controlBox\">\n              <div id=\"yearControl\">\n                <div id=\"year\"><input type=\"number\" value=\"\" min=\"1\" max=\"2043\"><span>\uB144</span></div>\n              </div>\n              <div id=\"monthControl\">\n                <span id=\"month\"><input type=\"number\" value=\"\" min=\"1\" max=\"12\">\uC6D4</span>\n              </div>\n              <div id=\"buttonWarp\">\n                  <button class=\"plusBtn\" type=\"button\"><i class=\"fas fa-angle-up\"></i></button>\n                  <button class=\"minusBtn\" type=\"button\"><i class=\"fas fa-angle-down\"></i></button>\n              </div>\n          </div>\n          <div id=\"nowWarp\">\n            <div class=\"nowDate\"></div>\n            <div class=\"nowTime\"></div>\n          </div>\n        </div>\n        <div id=\"daySection\"></div>\n      ";
    }
    setInterval(function () {
        setTime(calendarBox);
    }, 1000);
    setDate(calendarBox);
    dayTableSet(calendarBox);
    dayDataSet(calendarBox);
    //dragChange(calendarBox)
    changeEvent(calendarBox);
}
calendar("#calendarBox");

//# sourceMappingURL=index.js.map
