
document.querySelectorAll(".treeWarp").forEach((el)=>{
  el.innerHTML = `
      <div id="tree"></div>
      <div id="trunk">
        <div id="left-branch"></div>
        <div id="right-bottom-branch"></div>
        <div id="right-top-branch"></div>
      </div>
  `
})



function gameBox(size,gameBoxId,characterArr){
  
  let gameBox = document.querySelector(gameBoxId)
  let character = characterArr
  
  let meList = []
  let comList = []
  
  let meIndex = 0;
  let comIndex = 0;
  
  let gameCount = 0;
  
  if(gameBox){
    
    //게임박스 만들고
    gameTableSet(gameBox)
    
    //클릭될 위치 체크용 배열
    clickPositionSet(size,meList,comList)
    
    //스타트박스에서 캐릭터 선택하면 게임시작
    let $gameStartBox = document.querySelector("#startBox")
    let $gameStartBtn = $gameStartBox.querySelectorAll("button")
    $gameStartBtn.forEach((e,index) => {
      e.addEventListener("click",() => {
        characterSet(e,gameBox,index)
        markEvent(gameBox,size,meList,comList,meIndex,comIndex)
      });
    });
 
    
  }
  
  
  function gameTableSet(gameBox){
    let $gameBox = gameBox
    let $gameHeader = document.createElement("div");
    $gameBox.append($gameHeader)
    $gameHeader.className = "gameHeader"
    $gameHeader.innerHTML = `<h2><span>T</span>ic <span>T</span>ac <span>T</span>oe</h2>
    <p>가장 먼저 한줄을 맞추는 사람이<br/> 승리합니다</p>
    <h4>게임순서</h4>
    <div id="playerBox">
    <div class="player_me"><img src="./img/dog.png" alt="강아지"><span></span></div>
    <div class="player_you"><img src="./img/cat.png" alt="고양이"><span></span></div>
    </div>
    <button class="resetBtn" type="button" onClick="location.reload()">다시하기</button>
    `

    let $gameTable = document.createElement("table");
    $gameTable.id = "gameTable";

    $gameBox.append($gameHeader)
    $gameBox.append($gameTable)

    for(let i = 0; i < size; i++){
      let $tr = document.createElement("tr");
      $gameTable.append($tr)
      for(let j = 0; j < size; j++){
        let $td = document.createElement("td");
        $tr.append($td)
      }
    }
    
    return gameBox = $gameBox
  }//close gameTableSet
  
  function characterSet(me,gameBox,index){
    
    let $gameBox = gameBox;
    let $gameOrder = $gameBox.querySelector('#playerBox')
    
    me.parentNode.style.display = "none"
    $gameBox.style.display = "flex"
    $gameOrder.children[index].classList.add("on")
    $gameOrder.children[index].children[1].innerText = "ME"
    meIndex = index;
    if(index == 0){
      $gameOrder.children[index+1].children[1].innerText = "COM"
      comIndex = index+1;
    }else{
      $gameOrder.children[index-1].children[1].innerText = "COM"
      comIndex = index-1;
    }
    return meIndex,comIndex;
  }//close characterSet

  function clickPositionSet(size,meList,comList){
    //me와 com의 클릭한 위치 저장할 공간마련
    for (let i = 0; i < size; i++) {
        meList.push([])
        comList.push([])
      for (let j = 0; j < size; j++) {
        meList[i].push(0);
        comList[i].push(0);
      }
    }
    
    return meList,comList

  }//close clickPositionSet

  function markEvent(gameBox,size,meList,comList,meIndex,comIndex){
    
    let $tableTd = document.querySelectorAll("#"+gameBox.id + " td")
    $tableTd.forEach((e) => {
      
      e.addEventListener("click", (td)=>{
        
        let turn = true
        let $gameTable = gameBox.querySelector("#gameTable");
        let y = 0;
        let x = 0;
        
        //컴이 선택할때 클릭못하도록 가리기용
        $gameTable.classList.remove("on")
        
        //클릭한 요소 위치값 확인
        for(let i = 0; i < size; i++){
          for(let j = 0; j < size; j++){
            if(td.target == $gameTable.children[i].children[j]){
              y = i;
              x = j;
            }
          }
        }

        
        let $gameOrder = gameBox.querySelector('#playerBox')
        $gameOrder.querySelectorAll("div").forEach((order) => {
          if(order.classList.contains('on')){
            order.classList.remove("on")
          }
        })
  
        
        
        //내가 선택하는 경우
        if (turn) {
          $gameOrder.children[meIndex].classList.add("on")
          if ($gameTable.children[y].children[x].innerHTML == "") {
            $gameTable.children[y].children[x].innerHTML = `<img src="./img/`+character[meIndex]+`.png">`;
            meList[y][x] = 1
            winCheck(meList,size,gameBox)
            $gameTable.classList.add("on")
            turn = false
          }
        }
        
        //클로즈 박스가 생성되면 컴이 누르지 않도록
        let closeCheck = gameBox.querySelector("#closePop")
        //console.log(closeCheck)
        
        if (turn == false && closeCheck == null) {
          
          //게임순서 표시 변경 처리
          $gameOrder.children[meIndex].classList.remove("on");
          $gameOrder.children[comIndex].classList.add("on");
          
          //컴이 0.5초있다가 누르기
          setTimeout( () => {
              while(true){
                  
                  //랜덤위치 뽑고
                  let com_y = Math.floor(Math.random() * size);
                  let com_x = Math.floor(Math.random() * size);
                  
                  //해당 위치에 아무것도 없으면 해당 위치 자동클릭처리
                  if($gameTable.children[com_y].children[com_x].innerHTML == ""){
                    
                      $gameTable.children[com_y].children[com_x].innerHTML = `<img src="./img/`+ character[comIndex] +`.png">`;
                      comList[com_y][com_x] = 1;
                      winCheck(comList,size,gameBox);
                      turn = true
                      $gameTable.children[com_y].children[com_x].click();
                      break;
                  }
              }
          },500);
          

        }//컴이 선택할때 종료
        
        
      });
    })
      
  }//close markEvent
    
  function closeGame(gameBox){
    
    let $gameOrder = gameBox.querySelector('#playerBox')
    $gameOrder.querySelectorAll("div").forEach((order) => {
      if(order.classList.contains('on')){
        
        let $closePop = document.createElement("div")
        $closePop.id = "closePop"
        gameBox.append($closePop)
        
        if(order.innerText == "ME"){
          $closePop.innerHTML = `<img src="./img/win.png" alt="win"><p></p>`;
          $closePop.children[1].innerHTML = "얏호! 내가 <span>이겼다!</span>";
        }else{
          $closePop.innerHTML = `<img src="./img/crying.png" alt="울음표시"><p></p>`;
          $closePop.children[1].innerHTML = "내가 <span>졌다!</span>"
        }
      }
    })
    
  }//close closeGame
  
  function winCheck(arr,size,gameBox) {

    let garoCount = 0;
    let seroCount = 0;
    let leftCount = 0;
    let rightCount = 0;
  
      //가로검사
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (arr[i][j] == 1) {
            garoCount++;
          }
        }
        if (garoCount == 3) {
          closeGame(gameBox)
          break;
        } else {
          garoCount = 0;
        }
      }
    
  
      //세로검사
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (arr[j][i] == 1) {
            seroCount++;
          }
        }
        if (seroCount == 3) {
          closeGame(gameBox);
          break;
        } else {
          seroCount = 0;
        }
      }

      //왼쪽 대각선 검사
      if (arr[0][0] == 1 && arr[1][1] == 1 && arr[2][2] == 1) {
        leftCount = 1
        closeGame(gameBox);
      }
    
      //오른쪽 대각선 검사
      if (arr[0][2] == 1 && arr[1][1] == 1 && arr[2][0] == 1) {
        rightCount = 1
        closeGame(gameBox);
      }
    
      
    //검사할때마다 게임 카운트 세기
    gameCount++

    //무승부 판단
    //console.log(gameCount,garoCount,seroCount,leftCount,rightCount)
    if(gameCount == (size*size)){
      //모든 카운트를 채웠는데 빙고된게 없으면 무승부로 처리
      if(garoCount == 0 && seroCount == 0 && leftCount == 0 && rightCount == 0){
        let $closePop = document.createElement("div")
        $closePop.id = "closePop"
        gameBox.append($closePop)
        $closePop.innerHTML = `<img src="./img/draw.png"alt="무승부"><p></p>`;
        $closePop.children[1].innerHTML = "<span>무승부<span>에요!"
      }
    }
  
  }//close winCheck
    
}


gameBox(3,"#gameBox",["dog","cat"])


