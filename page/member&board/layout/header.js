import { ControllerMain } from "../controllerMain.js";

export class LayoutHeader {
  execute(data) {
    
    let $header = document.querySelector("#header");
    let tag = "";

    // [로그아웃] 상태 화면
    if (window.localStorage.getItem("user") == null) {
      tag += `
      <h1 id="btn-indexPage">logo</h1>
      <!--
      <ul class="gnb">
          <li id="btn-boardListPage">게시판</li></li>
          <li id="btn-boardListPaging">게시판 페이징</li>
          <li id="btn-memberListPage">회원 전체 목록</li>
      </ul>
      -->
      <ul class="userMenu">
        <li id="btn-memberJoinPage">회원가입</li>
        <li id="btn-memberLoginPage">로그인</li>
      </ul>
      `;
    } else {
      // [로그인] 상태 화면
      tag += `
      <h1 id="btn-indexPage">logo</h1>
      <ul class="gnb">
          <li id="btn-boardListPage">게시판</li></li>
          <li id="btn-boardListPaging">게시판 페이징</li>
          <li id="btn-memberListPage">회원 전체 목록</li>
      </ul>
      <ul class="userMenu">
        <li id="btn-memberLogoutPro">로그아웃</li>
      </ul>
      `;
    }
  

    $header.innerHTML = tag;
  
    let $indexPageBtn = document.querySelector("#btn-indexPage");
    let $joinPageBtn = document.querySelector("#btn-memberJoinPage");
    let $loginPageBtn = document.querySelector("#btn-memberLoginPage");
    let $boardPageBtn = document.querySelector("#btn-boardListPage");
    let $memberLogoutPro = document.querySelector("#btn-memberLogoutPro");
    let $boardListPaging = document.querySelector("#btn-boardListPaging");
    let $memberListPage = document.querySelector("#btn-memberListPage");

    console.log(localStorage.getItem("user"))
    
   // [로그아웃] 상태 화면
   if(localStorage.getItem("user") == null) { 
    
      $indexPageBtn.addEventListener("click",() => { this.pageMove("page_content") }) 
      $loginPageBtn.addEventListener("click",() => { this.pageMove("page_memberLogin") })  
      $joinPageBtn.addEventListener("click",() => { this.pageMove("page_memberJoin") }) 
      
    }else{ 
    // [로그인] 상태 화면
    
      $boardPageBtn.addEventListener("click",() => { this.pageMove("page_boardList") }) 
      $boardListPaging.addEventListener("click",() => { this.pageMove("page_boardListPaging") }) 
      $memberListPage.addEventListener("click",() => { this.pageMove("page_memberList") }) 
      
      $memberLogoutPro.addEventListener("click",() => {  
        alert("로그아웃 되었습니다.");
        ControllerMain.getInstance().log = null;
        
        //로그아웃시 세션 스토리지에 저장된 user값 삭제
        localStorage.removeItem("user")
        
        this.pageMove("layout_header")
        this.pageMove("layout_content")
      }) 
      
      this.loadEvent($boardPageBtn,"page_boardList")
      this.loadEvent($boardListPaging,"page_boardListPaging")
      this.loadEvent($memberListPage,"page_memberList")
      
    }
  }// close execute
  
  //새로고침시 중지한 페이지가 보이도록
  loadEvent = (el,pageName) => {
      let pageStorage = localStorage.getItem("page")
      if(localStorage.getItem("page") != null){
        if(pageStorage == pageName) {
          setTimeout(function(){
            el.click()
          },1);
        }
      }
  }
  
  
  
  //!페이지 이동 처리용
  pageMove = (pageName) => {
    ControllerMain.getInstance().changePage(pageName, null);
    localStorage.setItem("page",pageName)
  }

  
  
}
