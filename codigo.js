var elemArray = document.querySelectorAll(
    "#cypher-type, #options, #encode-radio, #decode-radio, #submit-btn, #decoded-text, #encoded-text"
);


let decodedTextElement = elemArray[0];
let cypherTypeElement = elemArray[1];
let optionsElement = elemArray[2];
let encodeRadioBtn = elemArray[3];
let decodeRadioBtn = elemArray[4];
let submitBtnElement = elemArray[5];
let encodedTextElement = elemArray[6];

console.log(elemArray);

innitListeners();

function innitListeners() {
    cypherTypeElement.addEventListener("change", function () {
        if (cypherTypeElement.selectedIndex == 0) {
            document.getElementById("caesar-shift").remove();
            document.getElementById("shift-label").remove();
        } else {
            addShiftElement();
        }
    });

    submitBtnElement.addEventListener("click", function (event) {
        event.preventDefault();

        if (cypherTypeElement.selectedIndex == 0) {
            if (isEncode()) {
                encodedTextElement.value = btoa(decodedTextElement.value);
            }

            if (!isEncode()) {
                encodedTextElement.value = atob(encodedTextElement.value);
            }
        } else {
            if (isEncode()) {
                encodedTextElement.value = caesarCipher(
                    decodedTextElement.value,
                    parseInt(document.getElementById("caesar-shift").value)
                );
            }

            if (!isEncode()) {
                encodedTextElement.value = caesarDecipher(
                    decodedTextElement.value,
                    parseInt(document.getElementById("caesar-shift").value)
                );
            }
        }
    });
}

function changeBtnName() {
    if (isEncode()) {
        submitBtnElement.setAttribute("value", "encode message");
    }

    if (!isEncode()) {
        submitBtnElement.setAttribute("value", "decode message");
    }
}

function isEncode() {
    if (encodeRadioBtn.checked == true && decodeRadioBtn.checked == false) {
        return true;
    }

    return false;
}

function addShiftElement() {
    let caesarShiftLabel = document.createElement("label");
    let caesarShiftInput = document.createElement("input");

    caesarShiftLabel.innerHTML = "Shift: ";
    caesarShiftLabel.setAttribute("id", "shift-label");
    caesarShiftLabel.setAttribute("for", "caesar-shift");
    
    caesarShiftInput.style.width = "35px";
    caesarShiftInput.style.margin = "20px";
    caesarShiftInput.setAttribute("value", 1);
    caesarShiftInput.setAttribute("type", "number");
    caesarShiftInput.setAttribute("id", "caesar-shift");

    optionsElement.appendChild(caesarShiftLabel);
    optionsElement.appendChild(caesarShiftInput);
}


 
function caesarCipher(input, shift) {
    let encodedText = [];

    for (var i = 0; i < input.length; i++) {
        let shiftedLetter = input.charCodeAt(i) + (shift);

     
        while (shiftedLetter > 122) {
            
            shiftedLetter = (shiftedLetter - shiftedLetter) + 97;
        }

        encodedText.push(String.fromCharCode(shiftedLetter));
    }

    return encodedText.join("");
}


function caesarDecipher(input, shift) {
    let encodedText = [];

    for (var i = 0; i < input.length; i++) {
       
        let shiftedLetter = input.charCodeAt(i) + shift * -1;

        while (shiftedLetter > 122) {
            shiftedLetter = (shiftedLetter - shiftedLetter) + 97;
        }

        encodedText.push(String.fromCharCode(shiftedLetter));
    }

    return encodedText.join("");
}