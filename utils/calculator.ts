var documentElement: HTMLElement;
var opcode: "pl" | "mi" | "mp" | "di" | "null" = "null";
var cur: string = "",
  last: string = "";
export default {
  init(root: HTMLElement) {
    documentElement = root;
    start();
  },
};

function start() {
  let temp = document.createElement("div");
  temp.classList.add("root");
  const btnType = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "pl",
    "mi",
    "mp",
    "di",
    "c",
    "re",
  ];
  const btnDisplay = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "-",
    "*",
    "/",
    "c",
    "=",
  ];
  temp.innerHTML = [
    "",
    "",
    "",
    "<div class='terminal'>",
    "&nbsp",
    "</div>",
    "<div class='btnroot'>",
    ((x) => {
      let str: string = "";
      for (let index = 0; index < btnType.length; index++)
        str += `<span id='cb${btnType[index]}' class='btn'>${btnDisplay[index]}</span>`;
      return str;
    })(),
    "</div>",
    "<style>",
    ".root{",
    "position: fixed;",
    "user-select: none;",
    "top: 0;",
    "left: 50vw;",
    "width: 50vw;",
    "font-size: 50px;",
    "}",
    ".btnroot{",
    "width: 100%;",
    "}",
    ".btn{",
    "text-align: center;",
    "color: white;",
    "background-color: black;",
    "display: inline-block;",
    "width: 50px;",
    "height: 50px;","margin-right: 3px;",
    "}",
    ".terminal{",
    "color: white;",
    "background-color: black;",
    "margin: 5px;",
    "margin-left: 0",
    "}",
    "</style>",
  ].join("\n");
  document.body.appendChild(temp);
  console.log(
    btnType.map((x) =>
      document.querySelector("#cb" + x).addEventListener("click", (event) => {
        const curopcode = x;
        const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        const operators = ["pl", "mi", "mp", "di"];
        if (numbers.includes(curopcode)) {
          cur += curopcode;
          updateTerminal(cur);
        }
        if (operators.includes(curopcode)) {
          last = cur;
          cur = "";
          opcode = curopcode;
          updateTerminal(cur);
        }
        if (curopcode == "c") {
          opcode = "null";
          (cur = ""), (last = "");
          updateTerminal("");
        }
        if (curopcode == "re" && opcode != null) {
          cur = "" + op(opcode, +last, +cur);
          updateTerminal(cur);
          opcode = null;
          last = "";
        }
        updateTerminal(cur);
        console.log("exec op: " + curopcode);
      })
    )
  );
  function updateTerminal(x: string): void {
    document.querySelector(".terminal").innerHTML = x == "" ? "&nbsp" : x;
  }
  function op(
    opcode: "pl" | "mi" | "mp" | "di" | "null" = "null",
    a: number,
    b: number
  ): number {
    switch (opcode) {
      case "pl":
        return a + b;
      case "mi":
        return a - b;
      case "mp":
        return a * b;
      case "di":
        return a / b;
    }
  }
}
