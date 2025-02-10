
function numList(size,arr1,arr2) {
  let num = 1;
  for (let i = 0; i < size; i++) {

    let frontTemp = []
    let backTemp = []

    for (let j = 0; j < size; j++) {
      frontTemp.push(num)
      backTemp.push(size * size + num)
      num++
    }
    
    arr1.push(frontTemp)
    arr2.push(backTemp)
  }
} 


function shuffle(size,arr1,arr2) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {

      let y = Math.floor(Math.random() * size)
      let x = Math.floor(Math.random() * size)
      let temp = arr1[0][0]
      
      arr1[0][0] = arr1[y][x]
      arr1[y][x] = temp

      y = Math.floor(Math.random() * size)
      x = Math.floor(Math.random() * size)
      temp = arr2[0][0]
      
      arr2[0][0] = arr2[y][x]
      arr2[y][x] = temp

    }
  }
}




function tableSet(el,size,gameNum,arr1){
  
  //게임박스 생성
  let $gameBox = document.querySelector(el)
  let $table = document.createElement("table")
  $table.id = "gameTable"
  
  //헤더 박스 생성
  let $headerBox = document.createElement("div")
  $headerBox.id = "headerBox"
  $gameBox.append($headerBox)
  
  let $titleBox = document.createElement("div")
  $titleBox.id = "titleBox"
  $titleBox.innerHTML = `<h3>1to50</h3>
  <p>1부터 50까지 순서대로<br> 터치하여 없애보세요.</p>`;
  $headerBox.append($titleBox)
  
  
  //헤더안 타이머 박스
  let $timerDiv = document.createElement("div")
  $timerDiv.id = "timerId"
  $timerDiv.innerText = "0.00"
  $headerBox.append($timerDiv)
  
  
   //헤더안 다음숫자안내 박스
  let $gameNumDiv = document.createElement("div")
  $gameNumDiv.id = "gameNum"
  $gameNumDiv.innerText = gameNum
  $headerBox.append($gameNumDiv)
  
  

  //버튼 부모 박스 생성
  let $buttonBox = document.createElement("div")
  $buttonBox.id = "buttonBox"
  $gameBox.append($buttonBox)
  
  

  
  
  //힌트 버튼 생성
  let $hintBtn = document.createElement("button")
  $hintBtn.id = "hintBtn"
  $hintBtn.innerText = "힌트!"
  $hintBtn.style.opacity = "0.3"
  $buttonBox.append($hintBtn)
  
  //다시하기 버튼 생성
  let $resetBtn = document.createElement("button")
  $resetBtn.id = "resetBtn"
  $resetBtn.innerText = "다시하기"
  $resetBtn.setAttribute("onClick","location.reload()")
  $resetBtn.style.opacity = "0.3"
  $buttonBox.append($resetBtn)
 
  $gameBox.append($table)
  
  for(let i = 0; i < size; i++){
    let $tr = document.createElement("tr")
    $table.append($tr)
    for(let j = 0; j < size; j++){
      let $td = document.createElement("td")
      $tr.append($td)
      $td.innerText = arr1[i][j]
    }
  }
}





function eventSet(el,size,gameNum,arr1,arr2){
  
  let $gameTable = el.lastChild;
  let $gameTimer = el.children[0].children[1];
  let $gameNum = el.children[0].children[2];
  let $gameHintBtn = el.children[1].children[0];
  let $gameResetBtn = el.children[1].children[1];
  
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      $gameTable.children[i].children[j].addEventListener("click", checkBlock)
    }
  }
  
  function checkBlock(clickEl){
    
    //Math.max(...arr1.flat()) 앞배열의 최대값
    let colorChange =  "#FF9671"
    if(gameNum >= Math.max(...arr1.flat()) + 1){
      colorChange = "#F9F871"
    }
    
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        //클릭한 곳의 값과 
        if (clickEl.target == $gameTable.children[i].children[j]) {
          if ($gameTable.children[i].children[j].innerText == gameNum) {
            $gameTable.children[i].children[j].innerText = arr2[i][j];
            $gameTable.children[i].children[j].style.backgroundColor = colorChange;
            
            gameNum += 1;
          } 
        } 
        
      }
    }
    
    $gameNum.innerText = gameNum;
    
    if (gameNum == 2) {
      
      setTime("start",$gameTimer)
    
      $gameHintBtn.style.opacity = "1"
      $gameResetBtn.style.opacity = "1"
      $gameHintBtn.addEventListener("click",() => {
        console.log("d")
        hintShow($gameHintBtn,size,gameNum)
      })
      
    }

    //게임번호가 배열의 최대 숫자보다 크면 즉 없는 숫자면 종료
    //Math.max(...arr2.flat()) 뒷배열의 최대값
    if(gameNum == Math.max(...arr2.flat()) +1){
      
      setTime("close",$gameTimer)
      
      $gameHintBtn.style.display = "0.8"
      $gameNum.innerText = "게임종료";
    
    }
  }
  
}



let timer = 0
let second = 0;
function setTime(set,timerBox) {
  
  if(set == "start"){
    
    function startTime(){
          second += 1;
          let share = parseInt(second / 100);
          let modNum = second % 100;
          if (modNum < 10) {
            modNum = "0" + modNum;
          }
          let result = share + "." + modNum;
          timerBox.innerText = result;
    }
    
    timer = setInterval(startTime,10);

  }else if(set == "close"){
    clearInterval(timer)
  }
}


function hintShow(e,size,gameNum){
  let $gameTable = e.parentNode.nextSibling
  for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        //다음 클릭할 숫자 힌트
        if(gameNum == $gameTable.children[i].children[j].innerText){
            $gameTable.children[i].children[j].setAttribute("style","background: #ff6f91;")
        }
      }
  }
}


function gameBox({el:el,boxSize:size,gameNum:Num}){
  let frontList = []
  let backList = []
  let gameBox = document.querySelector(el)      
  numList(size,frontList,backList)
  shuffle(size,frontList,backList)
  tableSet(el,size,Num,frontList)
  eventSet(gameBox,size,Num,frontList,backList)
}
/*
gameBox({
  el:"#gameBox",
  boxSize:2,
  gameNum:1
});
gameBox({
  el:"#gameBox2",
  boxSize:4,
  gameNum:1
})
*/

gameBox({
  el:"#gameBox",
  boxSize:5,
  gameNum:1
})