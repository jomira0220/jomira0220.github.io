export class LayoutContent {
  execute(data) {
    let $content = document.querySelector("#content");
    let tag = "";
    tag += `
         <div>홈페이지 첫 메인 화면</div>
        `;

    $content.innerHTML = tag;
  }
}
