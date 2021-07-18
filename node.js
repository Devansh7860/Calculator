let td = document.getElementsByTagName("td");
let tdArr = Array.from(td);

let inputArr = []
let print = (event) => {
  let inputVal = event.target.innerText;
  inputArr.push(inputVal)
  displayInputVal();
};

let checkInputVal = () => {
  for ( i = 0; i < inputArr.length; i++){
    if (inputArr[i] == "+"){
      if (inputArr[i+1] == "-"){
        inputArr.pop()
        inputArr.pop()
        inputArr.splice(inputArr.length , 0 , "-")
      }
      else if(inputArr[i+1] == "*"){
        inputArr.pop()
        inputArr.pop()
        inputArr.splice(inputArr.length , 0 , "*")

      }
      else if(inputArr[i+1] == "/"){
        inputArr.pop()
        inputArr.pop()
        inputArr.splice(inputArr.length , 0 , "/")
      }

    }
    else if (inputArr[i] == "-"){
      if (inputArr[i+1] == "+"){
        inputArr.pop()
        inputArr.pop()
        inputArr.splice(inputArr.length , 0 , "+")
      }
      else if(inputArr[i+1] == "*"){
        inputArr.pop()
        inputArr.pop()
        inputArr.splice(inputArr.length , 0 , "*")

      }
      else if(inputArr[i+1] == "/"){
        inputArr.pop()
        inputArr.pop()
        inputArr.splice(inputArr.length , 0 , "/")
      }

    }
    else if (inputArr[i] == "*"){
      if (inputArr[i+1] == "/"){
        inputArr.pop()
        inputArr.pop()
        inputArr.splice(inputArr.length , 0 , "/")
      }
    }
    else if (inputArr[i] == "/"){
      if (inputArr[i+1] == "*"){
        inputArr.pop()
        inputArr.pop()
        inputArr.splice(inputArr.length , 0 , "*")
      }
    }
  }
  
}

for (i = 1; i < tdArr.length - 2; i++) {
  tdArr[i].addEventListener("click", print);
}

let displayInputVal = () => {
  checkInputVal()
  let displayArea = document.getElementsByClassName("displayArea")[0];
  displayArea.innerText = inputArr.join('')
};

let deleteBtn = document.getElementById("delete");


deleteBtn.addEventListener("click", () => {
  let displayArea = document.getElementsByClassName("displayArea")[0];
  inputArr.splice(-1 , 1)
  inputArr.splice(-1 , 1)
  displayArea.innerText = inputArr.join('')
});

let clear = document.getElementById("c");
let clear2 = () => {
  let displayArea = document.getElementsByClassName("displayArea")[0];
  inputArr = []
  displayArea.innerText = "";
};
clear.addEventListener("click", clear2);


let equal = document.getElementById("equalTo");

let result = () => {
    let displayArea = document.getElementsByClassName("displayArea")[0];
    displayArea.innerText = eval(inputArr.join(''))
    

  let history1 = localStorage.getItem("history");
  if (history1 == null) {
    historyArr = [];
  }
  else {
    historyArr = JSON.parse(history1);
  }

  let h = []
  h.push(inputArr.join(''))
  h.push(' = ')
  h.push(displayArea.innerText)
  historyArr.push(h.join(''))
  localStorage.setItem("history", JSON.stringify(historyArr));
  inputArr = []
  inputArr.push(displayArea.innerText.split(''))
  inputArr = inputArr.flat(Infinity)
};

equal.addEventListener("click", result);

historyBtn = document.getElementsByClassName('historyBtn')[0]

let showHistory = () => {

  let allTr = document.getElementsByTagName("tr");
  for (i = 1; i < allTr.length - 1; i++) {
    allTr[i].style.display = "none";
  }
  let displayArea = document.getElementsByClassName("displayArea")[0];
  displayArea.style.height = "400px";
  displayArea.style.transitionDuration = "0.3s";

  displayArea.innerText = ""
  displayArea.style.fontSize = "26px"
  historyBtn.innerText = "Hide History ..."
  historyBtn.removeEventListener('click' , showHistory)

  let hideHistory = () => {
    for (i = 1; i < allTr.length - 1; i++) {
      allTr[i].style.display = "table-row";
    }
  displayArea.style.height = "85px";
  displayArea.style.transitionDuration = "0s";
  displayArea.innerText = ""
  historyBtn.innerText = "Show History ..."

  historyBtn.removeEventListener('click' , hideHistory )
  historyBtn.addEventListener('click' , showHistory )

  }
  historyBtn.addEventListener('click' , hideHistory)

  
  let bDiv = document.createElement('button')
  bDiv.style.display = "block"
  bDiv.innerText = "Clear History"
  bDiv.id = "clearHistory"
  
  bDiv.addEventListener('click' , () => {
    localStorage.clear()
    hue()
  })
  displayArea.appendChild(bDiv)

  let hue = () => {
  let history2 = localStorage.getItem("history");
  if (history2 == null) {
    displayArea.innerText =  "Sorry , No history Found!";
  } 
  else {
    // displayArea.style.overflow = "scroll"

    history2 = JSON.parse(history2);
    for (elem of history2) {
      let aDiv = document.createElement("div");    
      aDiv.style.display = "block";
      aDiv.style.marginBottom = "6px"
      aDiv.innerText = elem;
      displayArea.appendChild(aDiv);
    }
  }
  }
  hue()
};

historyBtn.addEventListener("click", showHistory);
