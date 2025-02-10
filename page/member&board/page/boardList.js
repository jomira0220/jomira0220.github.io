import { ControllerMain } from "../controllerMain.js";
import { JsonBoard } from "../jsonBoard.js";

export class PageBoardList {

    $boardNo = null;
    $atagBoardInfoPage = null;
    $buttonBoardModifyPro = null;
    $buttonBoardDeletePro = null;
    $buttonBoardWritePage = null;
    $buttonBoardDummyAddPro = null;
    $checkboxAll = null;
    $checkboxBoard = null;
    $buttonCheckBoardDeletePro = null;

    
    
    execute(data) {
        let $content = document.querySelector("#content");
        let tag = "";

        tag +=
        `
        <table id="content-board">
            <tr>
                <td colspan="8"><h1>게시판 목록</h1></td>
            </tr>
            <tr>
                <td colspan="8" align="right">
                    <button id="button-boardWritePage">새글작성</button>
                    <button id="button-boardDummyAddPro">더미파일 추가하기</button>
                </td>
            </tr>
            <tr>
                <td>
                    <input id="checkbox-all" type="checkbox">전체선택
                </td>
                <td>
                    <button id="button-checkBoardDeletePro">선택 삭제</button>
                </td>
            </tr>
            <tr>
                <td>
                    선택
                </td>
                <td>번호</td>
                <td>제목</td>
                <td>작성자</td>
                <td>작성일</td>
                <td>조회수</td>
                <td>수정</td>
                <td>삭제</td>
            </tr>
        `;
        

        let boardList = JsonBoard.getInstance().getBoardList()
        //console.log(boardList)
        for(let i = 0; i < boardList.length; i++) {
            tag += 
            `
                <tr>
                    <td>
                        <input class="checkbox-board" type="checkbox">
                    </td>
                    <td class="boardNo">${boardList[i].boardNo}</td>
                    <td><a class="atag-boardInfoPage" href="#">${boardList[i].title}</a></td>
                    <td>${boardList[i].writer}</td>
                    <td>${boardList[i].regDate}</td>
                    <td>${boardList[i].readCount}</td>
                    <td><button class="button-boardModifyPro">수정</button></td>
                    <td><button class="button-boardDeletePro">삭제</button></td>
                </tr>
            `;
        }
        
        tag += `</table>`;
        
        $content.innerHTML = tag;

        this.$boardNo = document.querySelectorAll(".boardNo");
        
        this.$atagBoardInfoPage = document.querySelectorAll(".atag-boardInfoPage");
        this.eachClickPageMove(this.$atagBoardInfoPage,"page_boardInfo")
        //this.eachClickPageMove(this.$atagBoardInfoPage,"page_boardInfo")
        
        this.$buttonBoardModifyPro = document.querySelectorAll(".button-boardModifyPro");
        this.eachClickPageMove(this.$buttonBoardModifyPro,"page_boardModify")

        this.$buttonBoardDeletePro = document.querySelectorAll(".button-boardDeletePro");
        this.boardDeleteProClick()

        this.$buttonBoardWritePage = document.querySelector("#button-boardWritePage");
        this.$buttonBoardWritePage.addEventListener("click", this.boardWritePageClick);

        this.$buttonBoardDummyAddPro = document.querySelector("#button-boardDummyAddPro");
        this.$buttonBoardDummyAddPro.addEventListener("click", this.buttonBoardDummyAddProClick);

        this.$checkboxAll = document.querySelector("#checkbox-all");
        this.$checkboxAll.addEventListener("click", this.checkboxAllClick);

        this.$checkboxBoard = document.querySelectorAll(".checkbox-board");
        this.$checkboxBoard.forEach((el)=>{
            el.addEventListener("click", this.checkboxBoardClick);
        })

        this.$buttonCheckBoardDeletePro = document.querySelector("#button-checkBoardDeletePro");
        this.$buttonCheckBoardDeletePro.addEventListener("click", this.buttonCheckBoardDeleteProClick);
        
        
    }//close execute
    

    
    eachClickPageMove = (target,changePage) => {
        target.forEach((el,index) => {
            el.addEventListener("click", () => {
                ControllerMain.getInstance().changePage(changePage, this.$boardNo[index].innerText);
            });
        })
    }
    
    boardDeleteProClick = (event) => {
        this.$buttonBoardDeletePro.forEach((el,index) => {
         el.addEventListener("click", () => {
             JsonBoard.getInstance().deleteBoard(this.$boardNo[index].innerText);
             ControllerMain.getInstance().changePage("page_boardList", null);
         });
        })
     }
    
    
    
    
    
    boardWritePageClick = (event) => {
        ControllerMain.getInstance().changePage("page_boardWrite", null);
    }

    buttonBoardDummyAddProClick = (event) => {
        JsonBoard.getInstance().setBoardDummyAdd()
        ControllerMain.getInstance().changePage("page_boardList", null);
    }

    checkboxAllClick = (event) => {
        if(this.$checkboxAll.checked) {
            this.$checkboxBoard.forEach((el)=>{
                el.checked = true;
            })
        } else {
            this.$checkboxBoard.forEach((el)=>{
                el.checked = false;
            })
        }
    }

    checkboxBoardClick = (event) => {
        let count = 0;
        this.$checkboxBoard.forEach((el)=>{
            if(el.checked){
                count += 1;
            }
        })
        if(count == this.$checkboxBoard.length) {
            this.$checkboxAll.checked = true;
        } else {
            this.$checkboxAll.checked = false;
        }
    }

    buttonCheckBoardDeleteProClick = (event) => {
        let deleteList = [];
        this.$checkboxBoard.forEach((el,index)=>{
            if(el.checked){
                deleteList.push(Number(this.$boardNo[index].innerHTML));
            }
        })

        JsonBoard.getInstance().checkBoardDeletePro(deleteList);
        ControllerMain.getInstance().changePage("page_boardList", null);
    }


}