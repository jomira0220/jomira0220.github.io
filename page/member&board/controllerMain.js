import { LayoutHeader } from "./layout/header.js";
import { LayoutContent } from "./layout/content.js";
import { LayoutFooter } from "./layout/footer.js";

import { PageMemberLogin } from "./page/memberLogin.js";
import { PageMemberJoin } from "./page/memberJoin.js";
import { PageMemberList } from "./page/memberList.js";

import { PageBoardList } from "./page/boardList.js";
import { PageBoardInfo } from "./page/boardInfo.js";
import { PageBoardModify } from "./page/boardModify.js";
import { PageBoardWrite } from "./page/boardWrite.js";
import { PageBoardListPaging } from "./page/boardListPaging.js";


export class ControllerMain {
  static instance = new ControllerMain();
  static getInstance() {
    return ControllerMain.instance;
  }

  start() {
    this.log = null;

    this.pageList = {};
    this.setPageList();

    
    this.changePage("layout_header", null);
    this.changePage("layout_content", null);
    this.changePage("layout_footer", null);

  }

  setPageList() {
    this.pageList["layout_header"] = new LayoutHeader();
    this.pageList["layout_content"] = new LayoutContent();
    this.pageList["layout_footer"] = new LayoutFooter();

    this.pageList["page_memberLogin"] = new PageMemberLogin();
    this.pageList["page_memberJoin"] = new PageMemberJoin();
    this.pageList["page_memberList"] = new PageMemberList();

    this.pageList["page_boardList"] = new PageBoardList();
    this.pageList["page_boardInfo"] = new PageBoardInfo();
    this.pageList["page_boardModify"] = new PageBoardModify();
    this.pageList["page_boardWrite"] = new PageBoardWrite();
    this.pageList["page_boardListPaging"] = new PageBoardListPaging();
  }

  changePage(pageName, data) {
    this.pageList[pageName].execute(data);
  }

  
}