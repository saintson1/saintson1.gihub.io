/** http://192.168.30.103:8080/*/
import { render } from "./src/rnd/render.js";

export function main() {
  let rnd = render();
  window.addEventListener("load", () => {
    rnd.init();

    const draw = () => {
      rnd.start();
      rnd.draw(rnd.gl);
      window.requestAnimationFrame(draw);
    };
    draw();
  });
}
