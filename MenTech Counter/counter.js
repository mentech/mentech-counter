document.getElementById("container").addEventListener("click", clickHandler);
document.getElementById("generateCard").addEventListener("click", clickHandler);

function addEventToInputs() {
  document.querySelectorAll("#inpuTitle").forEach(e => {
    e.addEventListener("blur", inputOnBlur);
  });
}

function inputOnBlur(e) {
  var elementInput = e.target.parentElement.querySelector("#countTxt");
  var inputId = elementInput.parentElement.parentElement.id + "Txt";
  localStorage.setItem(inputId, e.target.value);
}

function generateCard() {
  counterId = createGuid();
  var element = document.createElement("div");
  element.style = `width: 250px; margin: 0 10px; display:inline-table;`;
  element.className = "card";
  element.innerHTML = `<div class="card-header" style="text-align: center;margin-bottom:0px;padding-bottom:0px">
                <input id="inpuTitle" class="form-control"
                    style="text-align:center;font-size:150%;color: rgb(0, 12, 179);font-weight:600" type="text" value="MenTech Inc.">
                <div class="card-body" style="margin-bottom: 0px;padding-bottom:0px ">
                    <div id="${counterId}" class="form-row">
                        <div class="form-group col-md-12">
                            <input id="countTxt" class="form-control"
                                style="text-align:right;font-size:400%;color: black;font-weight:600" value="0"
                                type="number" disabled>
                        </div>
                        <div class="form-group col-md-12 " style="text-align: center">
                            <button id="btnDecrease" style="width: 30%;font-size: 300%;font-weight: 900"
                                class="btn btn-secondary">-</button>
                            <button id="btnIncrease" style="width: 60%;font-size: 300%;font-weight:900;"
                                class="btn btn-success">+</button>
                        </div>
                        <div class="form-group col-md-12 " style="text-align: center">
                            <button id="btnReset" style="width: 90%;" class="btn btn-secondary">Reset</button>
                            <button id="btnClose" style="width: 30px;margin:14px;" class="btn btn-secondary">X</button>
                        </div>
                    </div>
                </div>
            </div>`;

  document.getElementById("container").appendChild(element);
  var counterDivCode;
  if (localStorage.getItem("counterDivCode") == null) {
    counterDivCode = [];
    localStorage.setItem("counterDivCode", JSON.stringify(counterDivCode));
  } else {
    counterDivCode = JSON.parse(localStorage.getItem("counterDivCode"));
  }
  counterDivCode.push(counterId);
  localStorage.setItem("counterDivCode", JSON.stringify(counterDivCode));
  addEventToInputs();
}

var seconds = 0;
(function() {
  if (localStorage.getItem("count") > 0) {
    document.getElementById("countTxt").value = localStorage.getItem("count");
  }
  if (localStorage.getItem("countTxt") != null) {
    document.getElementById("inpuTitle").value = localStorage.getItem(
      "countTxt"
    );
  }
  if (localStorage.getItem("time") > 0) {
    seconds = parseInt(localStorage.getItem("time"));
  }
  if (
    localStorage.getItem("counterDivCode") != null &&
    JSON.parse(localStorage.getItem("counterDivCode")).length > 0
  ) {
    var counters = JSON.parse(localStorage.getItem("counterDivCode"));
    for (var e in counters) {
      var element = document.createElement("div");
      element.style = `width: 250px; margin: 0 10px; display:inline-table;`;
      element.className = "card";
      element.innerHTML = `<div class="card-header" style="text-align: center;margin-bottom:0px;padding-bottom:0px">
                <input id="inpuTitle" class="form-control"
                    style="text-align:center;font-size:150%;color: rgb(0, 12, 179);font-weight:600" type="text" value="${
                      localStorage.getItem(counters[e] + "Txt") == null
                        ? "MenTech Inc."
                        : localStorage.getItem(counters[e] + "Txt")
                    }">
                <div class="card-body" style="margin-bottom: 0px;padding-bottom:0px ">
                    <div id="${counters[e]}" class="form-row">
                        <div class="form-group col-md-12">
                            <input id="countTxt" class="form-control"
                                style="text-align:right;font-size:400%;color: black;font-weight:600" value="${
                                  localStorage.getItem(counters[e]) == null
                                    ? "0"
                                    : localStorage.getItem(counters[e])
                                }"
                                type="number" disabled>
                        </div>
                        <div class="form-group col-md-12 " style="text-align: center">
                            <button id="btnDecrease" style="width: 30%;font-size: 300%;font-weight: 900"
                                class="btn btn-secondary">-</button>
                            <button id="btnIncrease" style="width: 60%;font-size: 300%;font-weight:900;"
                                class="btn btn-success">+</button>
                        </div>
                        <div class="form-group col-md-12 " style="text-align: center">
                            <button id="btnReset" style="width: 90%;" class="btn btn-secondary">Reset</button>
                            <button id="btnClose" style="width: 30px;margin:14px;" class="btn btn-secondary">X</button>
                        </div>
                    </div>
                </div>
            </div>`;

      document.getElementById("container").appendChild(element);
    }
  }
  addEventToInputs();
})();

function createGuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function clickHandler(e) {
  if (e.target.id == "btnIncrease") {
    increase(e.target.parentElement.parentElement.querySelector("#countTxt"));
  }
  if (e.target.id == "btnDecrease") {
    decrease(e.target.parentElement.parentElement.querySelector("#countTxt"));
  }
  if (e.target.id == "btnReset") {
    resetCount(e.target.parentElement.parentElement.querySelector("#countTxt"));
  }
  if (e.target.id == "btnClose") {
    var counterCard =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement;
    if (confirm("Counter will be deleted, are you sure?")) {
      counterCard.remove();
      arr = JSON.parse(localStorage.getItem("counterDivCode"));
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === e.target.parentElement.parentElement.id) {
          arr.splice(i, 1);
        }
      }
      localStorage.setItem("counterDivCode", JSON.stringify(arr));
    }
  }
  if (e.target.id == "btnResetAll") {
    resetCount(
      e.target.parentElement.parentElement.querySelector("#countTxt"),
      true
    );
  }
  if (e.target.id == "generateCard") {
    generateCard(1);
  }
}

function saveToLocal(el, value) {
  var id = el.parentElement.parentElement.id;
  localStorage.setItem(id, value);
}

function saveTime(value) {
  localStorage.setItem("time", value);
}

function resetCount(el, all) {
  el.value = "0";
  saveToLocal(el, "0");
  if (all) {
    seconds = 0;
  }
}

function increase(el) {
  var inputField = el;
  var count = parseInt(inputField.value);
  count += 1;
  inputField.value = count;
  saveToLocal(el, count);
}

function decrease(el) {
  var inputField = el;
  var count = parseInt(inputField.value);
  count -= 1;
  inputField.value = count;
  saveToLocal(el, count);
}

function incrementSeconds() {
  seconds += 1;
  d = Number(seconds);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);
  document.getElementById("time").value =
    (h < 10 ? "0" : "") +
    h +
    ":" +
    (m < 10 ? "0" : "") +
    m +
    ":" +
    (s < 10 ? "0" : "") +
    s;
  localStorage.setItem("time", seconds);
}
var cancel = setInterval(incrementSeconds, 1000);

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function downloadTxt() {
  zmn = new Date();
  gun = (zmn.getDate() < 10 ? "0" : "") + zmn.getDate();
  ay = (zmn.getMonth() < 10 ? "0" : "") + zmn.getMonth();
  yil = zmn.getFullYear();
  var icerik =
    localStorage.getItem("countTxt") +
    "  -----  " +
    localStorage.getItem("count") +
    "\r\n";
  if (
    localStorage.getItem("counterDivCode") != null &&
    JSON.parse(localStorage.getItem("counterDivCode")).length > 0
  ) {
    var counters = JSON.parse(localStorage.getItem("counterDivCode"));
    for (var e in counters) {
      icerik +=
        localStorage.getItem(counters[e] + "Txt") +
        "  -----  " +
        localStorage.getItem(counters[e]) +
        "\r\n";
    }
  }

  download(
    gun.toString() + "." + ay.toString() + "." + yil.toString() + ".txt",
    icerik
  );
}
