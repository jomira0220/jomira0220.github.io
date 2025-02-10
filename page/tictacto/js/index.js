document.querySelectorAll(".treeWarp").forEach(function (el) {
    el.innerHTML = "\n      <div id=\"tree\"></div>\n      <div id=\"trunk\">\n        <div id=\"left-branch\"></div>\n        <div id=\"right-bottom-branch\"></div>\n        <div id=\"right-top-branch\"></div>\n      </div>\n  ";
});
function gameOpenBox(size, gameBoxId, characterArr) {
    var gameBox = document.querySelector(gameBoxId);
    var gameCount = 0;
    var meList = [];
    var comList = [];
    if (gameBox) {
        //게임박스 만들고
        gameTableSet(gameBox, size);
        //클릭될 위치 체크용 배열 셋팅
        clickPositionSet(size, meList, comList);
        //스타트박스에서 캐릭터 선택하면 게임시작
        var $gameStartBox = document.querySelector("#startBox");
        if ($gameStartBox) {
            var $gameStartBtn = $gameStartBox.querySelectorAll("button");
            $gameStartBtn.forEach(function (btn, meIndex) {
                btn.addEventListener("click", function () {
                    characterSet(btn, gameBox, meIndex);
                    var comIndex = characterSet(btn, gameBox, meIndex) != 1 ? 0 : 1;
                    markEvent(gameBox, size, meList, comList, meIndex, comIndex, characterArr);
                });
            });
        }
    }
}
gameOpenBox(3, "#gameBox", ["dog", "cat"]);
function gameTableSet(gameBox, size) {
    var $gameBox = gameBox;
    var $gameHeader = document.createElement("div");
    $gameBox.append($gameHeader);
    $gameHeader.className = "gameHeader";
    $gameHeader.innerHTML = "<h2><span>T</span>ic <span>T</span>ac <span>T</span>oe</h2>\n  <p>\uAC00\uC7A5 \uBA3C\uC800 \uD55C\uC904\uC744 \uB9DE\uCD94\uB294 \uC0AC\uB78C\uC774<br/> \uC2B9\uB9AC\uD569\uB2C8\uB2E4</p>\n  <h4>\uAC8C\uC784\uC21C\uC11C</h4>\n  <div id=\"playerBox\">\n  <div class=\"player_me\"><img src=\"./img/dog.png\" alt=\"\uAC15\uC544\uC9C0\"><span></span></div>\n  <div class=\"player_you\"><img src=\"./img/cat.png\" alt=\"\uACE0\uC591\uC774\"><span></span></div>\n  </div>\n  <button class=\"resetBtn\" type=\"button\" onClick=\"location.reload()\">\uB2E4\uC2DC\uD558\uAE30</button>\n  ";
    var $gameTable = document.createElement("table");
    $gameTable.id = "gameTable";
    $gameBox.append($gameHeader);
    $gameBox.append($gameTable);
    for (var i = 0; i < size; i++) {
        var $tr = document.createElement("tr");
        $gameTable.append($tr);
        for (var j = 0; j < size; j++) {
            var $td = document.createElement("td");
            $tr.append($td);
        }
    }
    return gameBox = $gameBox;
} //close gameTableSet
function characterSet(btn, gameBox, meIndex) {
    var $gameBox = gameBox;
    if ($gameBox) {
        $gameBox.style.display = "flex";
        if (btn.parentElement) {
            btn.parentElement.style.display = "none";
        }
        var comIndex = 0;
        var $gameOrder = $gameBox.querySelector('#playerBox');
        if ($gameOrder) {
            $gameOrder.children[meIndex].classList.add("on");
            var gameOrderChildren = $gameOrder.children[meIndex].children[1];
            gameOrderChildren.innerText = "ME";
            var comBox = void 0;
            if (meIndex == 0) {
                comBox = $gameOrder.children[meIndex + 1].children[1];
                comBox.innerText = "COM";
                comIndex = meIndex + 1;
            }
            else {
                comBox = $gameOrder.children[meIndex - 1].children[1];
                comBox.innerText = "COM";
                comIndex = meIndex - 1;
            }
        }
        return comIndex;
    }
} //close characterSet
function clickPositionSet(size, meList, comList) {
    //me와 com의 클릭한 위치 저장할 공간마련
    for (var i = 0; i < size; i++) {
        meList.push([]);
        comList.push([]);
        for (var j = 0; j < size; j++) {
            meList[i].push(0);
            comList[i].push(0);
        }
    }
    return meList, comList;
} //close clickPositionSet
function markEvent(gameBox, size, meList, comList, meIndex, comIndex, characterArr) {
    var $tableTd = gameBox.querySelectorAll("td");
    $tableTd.forEach(function (e) {
        e.addEventListener("click", function (td) {
            var turn = true;
            var $gameTable = gameBox.querySelector("#gameTable");
            var y = 0;
            var x = 0;
            //컴이 선택할때 클릭못하도록 가리기용
            $gameTable.classList.remove("on");
            //클릭한 요소 위치값 확인
            for (var i = 0; i < size; i++) {
                for (var j = 0; j < size; j++) {
                    if (td.target == $gameTable.children[i].children[j]) {
                        y = i;
                        x = j;
                    }
                }
            }
            var $gameOrder = gameBox.querySelector('#playerBox');
            $gameOrder.querySelectorAll("div").forEach(function (order) {
                if (order.classList.contains('on')) {
                    order.classList.remove("on");
                }
            });
            //내가 선택하는 경우
            if (turn) {
                $gameOrder.children[meIndex].classList.add("on");
                if ($gameTable.children[y].children[x].innerHTML == "") {
                    $gameTable.children[y].children[x].innerHTML = "<img src=\"./img/" + characterArr[meIndex] + ".png\">";
                    meList[y][x] = 1;
                    winCheck(meList, size, gameBox);
                    $gameTable.classList.add("on");
                    turn = false;
                }
            }
            //클로즈 박스가 생성되면 컴이 누르지 않도록
            var closeCheck = gameBox.querySelector("#closePop");
            //console.log(closeCheck)
            if (turn == false && closeCheck == null) {
                //게임순서 표시 변경 처리
                $gameOrder.children[meIndex].classList.remove("on");
                $gameOrder.children[comIndex].classList.add("on");
                //컴이 0.5초있다가 누르기
                setTimeout(function () {
                    while (true) {
                        //랜덤위치 뽑고
                        var com_y = Math.floor(Math.random() * size);
                        var com_x = Math.floor(Math.random() * size);
                        //해당 위치에 아무것도 없으면 해당 위치 자동클릭처리
                        if ($gameTable.children[com_y].children[com_x].innerHTML == "") {
                            $gameTable.children[com_y].children[com_x].innerHTML = "<img src=\"./img/" + characterArr[comIndex] + ".png\">";
                            comList[com_y][com_x] = 1;
                            winCheck(comList, size, gameBox);
                            turn = true;
                            var gameClickTable = $gameTable.children[com_y].children[com_x];
                            gameClickTable.click();
                            break;
                        }
                    }
                }, 500);
            } //컴이 선택할때 종료
        });
    });
} //close markEvent
function closeGame(gameBox) {
    var $gameOrder = gameBox.querySelector('#playerBox');
    $gameOrder.querySelectorAll("div").forEach(function (order) {
        if (order.classList.contains('on')) {
            var $closePop = document.createElement("div");
            $closePop.id = "closePop";
            gameBox.append($closePop);
            if (order.innerText == "ME") {
                $closePop.innerHTML = "<img src=\"./img/win.png\" alt=\"win\"><p></p>";
                $closePop.children[1].innerHTML = "얏호! 내가 <span>이겼다!</span>";
            }
            else {
                $closePop.innerHTML = "<img src=\"./img/crying.png\" alt=\"\uC6B8\uC74C\uD45C\uC2DC\"><p></p>";
                $closePop.children[1].innerHTML = "내가 <span>졌다!</span>";
            }
        }
    });
} //close closeGame
var gameCount = 0;
function winCheck(meList, size, gameBox) {
    var widthCount = 0;
    var lengthCount = 0;
    var leftCount = 0;
    var rightCount = 0;
    //가로검사
    for (var i = 0; i < meList.length; i++) {
        for (var j = 0; j < meList.length; j++) {
            if (meList[i][j] == 1) {
                widthCount++;
            }
        }
        if (widthCount == 3) {
            closeGame(gameBox);
            break;
        }
        else {
            widthCount = 0;
        }
    }
    //세로검사
    for (var i = 0; i < meList.length; i++) {
        for (var j = 0; j < meList.length; j++) {
            if (meList[j][i] == 1) {
                lengthCount++;
            }
        }
        if (lengthCount == 3) {
            closeGame(gameBox);
            break;
        }
        else {
            lengthCount = 0;
        }
    }
    //왼쪽 대각선 검사
    if (meList[0][0] == 1 && meList[1][1] == 1 && meList[2][2] == 1) {
        leftCount = 1;
        closeGame(gameBox);
    }
    //오른쪽 대각선 검사
    if (meList[0][2] == 1 && meList[1][1] == 1 && meList[2][0] == 1) {
        rightCount = 1;
        closeGame(gameBox);
    }
    //검사할때마다 게임 카운트 세기
    gameCount++;
    //무승부 판단
    console.log(gameCount, widthCount, lengthCount, leftCount, rightCount);
    if (gameCount == (size * size)) {
        //모든 카운트를 채웠는데 빙고된게 없으면 무승부로 처리
        if (widthCount == 0 && lengthCount == 0 && leftCount == 0 && rightCount == 0) {
            var $closePop = document.createElement("div");
            $closePop.id = "closePop";
            gameBox.append($closePop);
            $closePop.innerHTML = "<img src=\"./img/draw.png\"alt=\"\uBB34\uC2B9\uBD80\"><p></p>";
            $closePop.children[1].innerHTML = "<span>무승부<span>에요!";
        }
    }
} //close winCheck

//# sourceMappingURL=index.js.map
