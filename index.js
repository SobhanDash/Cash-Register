const billAmt = document.querySelector("#billAmt");
const cashAmt = document.querySelector("#cashAmt");

const cashDiv = document.querySelector(".cash");
const outputCard = document.querySelector(".output-card");
const outputDiv = document.querySelector(".output");

const notes = document.querySelectorAll(".notes");

const nextBtn = document.querySelector(".nextBtn");
const checkBtn = document.querySelector(".checkBtn");

const errorDiv = document.querySelector(".errorMsg");
const noReturn = document.querySelector(".noReturn");

const notesArray = [2000, 500, 100, 20, 10, 5, 1];

nextBtn.addEventListener("click", () => {
  if (Number(billAmt.value) > 0) {
    nextBtn.style.display = "none";
    cashDiv.style.display = "block";
  } else {
    showError("Enter valid bill amount");
  }
});

checkBtn.addEventListener("click", () => {
  hideError();
  let billAmtVal = Number(billAmt.value);
  let cashAmtVal = Number(cashAmt.value);
  //error handling
  if (billAmtVal > 0 && cashAmtVal > 0) {
    if (billAmtVal > cashAmtVal) {
      showError("Cash Amount is less than Bill. Enter right amount");
      return;
    }
    //calculate the cash to be returned
    calc(billAmtVal, cashAmtVal);
  } else {
    showError("Enter valid Bill and Cash amount");
  }
});

function calc(bill, cash) {
  let cashToReturn = cash - bill;
  if (cashToReturn < 1) {
    outputCard.style.display = "block"
    outputDiv.style.display = "none"
    noReturn.innerText = "No amount to be returned";
    return;
  }

  outputCard.style.display = "block";

  for (let i = 0; i < notesArray.length; i++) {
    cashToReturn = addNotes(cashToReturn, notesArray[i], i);
  }
}

//add notes to the table
function addNotes(remainder, noteVal, index) {
  if (remainder >= noteVal) {
    let noOfNotes = Math.floor(remainder / noteVal);
    remainder = remainder - noOfNotes * noteVal;
    notes[index].innerHTML = `${noOfNotes}`;
  }

  return remainder;
}

function showError(text) {
  errorDiv.style.display = "block";
  errorDiv.innerText = text;
  outputDiv.style.display = "none";
}

const hideError = () => {
  errorDiv.style.display = "none";
};
