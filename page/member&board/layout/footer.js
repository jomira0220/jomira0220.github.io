import { ControllerMain } from "../controllerMain.js";

export class LayoutFooter {
  execute(data) {
    let $footer = document.querySelector("#footer");
    let tag = "";
    tag += `
         <div>
            <h2>logo</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.</p>
         </div>
         <ul class="gnb">
              <li>푸터메뉴1</li>
              <li>푸터메뉴2</li>
              <li>푸터메뉴3</li>
        </ul>
        `;

    $footer.innerHTML = tag;
  }
}
