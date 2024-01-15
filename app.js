let firstNum = 0;
let secondNum = 0;
let lastNum = 0;
let operand = false;
let pressedOperand = false;
let pressedEqual = false;
let pressedPercent = false;
// let negative = false;
const display = document.querySelector('.display');
const operations = document.querySelector('.operations');
const calculator = document.querySelector('.calculator');
const clear = document.querySelector('#clear');
const plusminus = document.querySelector('#plusminus');
const percent = document.querySelector('#percent');

function updateNumber(input) {
    //DIFFERENT STATES
    //commas needed
    //first number
    //second number
    //operand pressed

    //check if secondNum continued
    if (display.textContent.includes(".")) {
        if (input == '.' && !pressedOperand) return;
    }
    if (pressedPercent) {
        display.textContent = '';
        pressedPercent = false;
    }
    if (firstNum && secondNum) {
        if ((display.textContent == '0' || display.textContent == '-0') && input == '.') return display.textContent = '0.';
        display.textContent = `${display.textContent}${input}`;
        secondNum = display.textContent.replaceAll(',','');
        return;
    }
    //init secondNum
    if (firstNum) {
        if (input == '.') {
            display.textContent = '0.';
            secondNum = '0.';
            if (document.querySelector('.active')) document.querySelector('.active').classList.toggle('active');
            return;
        }
        display.textContent = input;
        secondNum = display.textContent.replaceAll(',','');
        if (document.querySelector('.active')) document.querySelector('.active').classList.toggle('active');
        return;
    }
    //init firstNum
    if (display.textContent == '0') {
        if (input == '0') return;
        if (input == '.') return display.textContent = '0.';
        display.textContent = input;
        clear.firstChild.textContent = "C";
    } else {
        if (display.textContent == '-0') return display.textContent = `-${input}`;
        display.textContent = `${display.textContent}${input}`; 
    }
}

//number is inputted
//take the textcontent from inputted number and display it

calculator.addEventListener('click', (e) => {
    let target = e.target;
    //console.log(target);

    if (target.classList.contains('number') && display.textContent.replace(/\D/g,'').length < 9) {
        updateNumber(target.textContent);
        addCommas(display);
        fitText(display);
    }

    // if (target.classList.contains('number')) {
    //     if (display.textContent == '0' || display.textContent == '–0' || pressedOperand) {
    //         pressedOperand = false;
    //         if(!negative) {
    //             display.textContent = target.textContent;
    //         } else { display.textContent = '–' + target.textContent }
    //         secondNum = display.textContent.replace(',','').replace('–','-');
    //     } else {
    //         display.textContent = `${display.textContent}${target.textContent}`;
    //         secondNum = display.textContent.replace(',','').replace('–','-');
    //     }

    //     clear.firstChild.textContent = "C";

    //     //adding commas
    //     if (display.textContent.replace(/\D/g,'').length > 3) {
    //         display.textContent = display.textContent.replace(/\D/g,'');
    //         display.textContent = display.textContent.slice(0, (display.textContent.length - 3)) +
    //         ',' + display.textContent.slice(-3);
    //         if (display.textContent.replace(/\D/g,'').length > 6) {
    //             display.textContent = display.textContent.slice(0, (display.textContent.length - 7)) +
    //             ',' + display.textContent.slice(-7);
    //         }
    //         if(negative) { display.textContent = '–' + display.textContent }
    //     };
    // }

    // clear pressed
    if (target == clear || target.parentNode == clear) {
        if (clear.firstChild.textContent == "AC") {
            pressedOperand = false;
            if (document.querySelector('.active')) document.querySelector('.active').classList.toggle('active');
            operations.textContent = '';
            firstNum = 0;
            lastNum = 0;
            operand = false;
        }
        if (!secondNum) {
            clear.firstChild.textContent = "AC";
            firstNum = 0;
            //negative = false;
        }
        pressedPercent = false;
        display.textContent = 0;
        secondNum = 0;
        display.style.transform = `unset`;
    }

    if (target == plusminus || target.parentNode == plusminus) {
        if (display.textContent == '0') return display.textContent = '-0';
        if (display.textContent == '-0') return display.textContent = 0;
        display.textContent = display.textContent.replaceAll(',','') * -1;
        console.log(display.textContent);
        addCommas(display);
        fitText(display);
    }

    if (target == percent || target.parentNode == percent) {
        if (display.textContent == 0) {
            return;
        }
        display.textContent = percentage(display.textContent.replaceAll(',','').replace('–','-'));
        fitText(display);
        addCommas(display);
    }

    if (target.classList.contains('operand') || target.parentNode.classList.contains('operand')) {
        if (pressedOperand) {
            if (document.querySelector('.active')) {
                document.querySelector('.active').classList.toggle('active');
                target.closest('.operand').classList.add('active');
                operand = target.textContent;
                return;
            }
            operate();
        }
        operand = target.textContent;
        if (document.querySelector('.active')) document.querySelector('.active').classList.toggle('active');
        target.closest('.operand').classList.add('active');
        pressedOperand = true;
        //negative = false;
        firstNum = display.textContent.replaceAll(',','');
    }

    // equal pressed
    if (target.classList.contains('equal') || target.parentNode.classList.contains('equal')) {
        if (operand && lastNum) {
            operate(true);
            pressedOperand = false;
            return;
        }
        if (!secondNum) return firstNum = display.textContent.replaceAll(',','');
        operate(false);
        pressedOperand = false;
        return;
    }
});

function operate(isOperationDone) {
    let solution;
    if (isOperationDone) {
        switch(operand) {
            case '+':
                solution = add(+firstNum, +lastNum);
            break;
    
            case '–':
                solution = subtract(+firstNum, +lastNum);
            break;
    
            case '×':
                solution = multiply(+firstNum, +lastNum);
            break;
    
            case '÷':
                solution = divide(+firstNum, +lastNum);
            break;
        }
        operations.textContent = `${firstNum} ${operand} ${lastNum}`;
        display.textContent = solution;
        firstNum = solution;
        pressedOperand = false;
        console.log("lastNum used");
        printDebugInfo();
        return;
    }
    if (!isOperationDone) {
        switch(operand) {
            case '+':
                solution = add(+firstNum, +secondNum);
            break;
    
            case '–':
                solution = subtract(+firstNum, +secondNum);
            break;
    
            case '×':
                solution = multiply(+firstNum, +secondNum);
            break;
    
            case '÷':
                solution = divide(+firstNum, +secondNum);
            break;
        }
        if (operations.textContent == '') {
            operations.textContent = `${firstNum} ${operand} ${secondNum}`;
        } else {
            operations.textContent = `${operations.textContent} ${operand} ${secondNum}`;
        }
        display.textContent = solution;
        addCommas(display);
        fitText(display);
        firstNum = solution;
        lastNum = secondNum;
        secondNum = 0;
        pressedOperand = false;
        console.log("secondNum used");
        printDebugInfo();
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) { return display.textContent = "Error" }
    return a / b;
}

function percentage(a) {
    pressedPercent = true;
    let decimalPos = '';
    let output;
    if (a.includes('.')) decimalPos = a.indexOf('.');
    if (decimalPos) {
        output = (a / 100).toFixed(a.slice(decimalPos).length + 1);
    } else {
        output = (a / 100).toFixed(2);
    }
    if (output.length > 9) output.toPrecision(9);
    return output;
}

function fitText(text) {
    let textWidth = text.offsetWidth;
    let parentWidth;
    let sizeProportion;
    parentWidth = text.parentElement.parentElement.offsetWidth;
    sizeProportion = (parentWidth / textWidth).toFixed(2);
    if(textWidth > parentWidth) {
        text.style.transform = `scale(${sizeProportion})`;
    } else {
        text.style.transform = `unset`;
    }
    // console.log(text.textContent + ": text width = " + textWidth + " | parent width = " + parentWidth + " | sibling width = " + siblingWidth + " | scale = " + sizeProportion);
}

function addCommas(text) {
    text = text.textContent;
    let minus = '';
    let decimalPos = '';
    let afterDecimal = '';
    let beforeDecimal = '';
    if (text.includes(".")) {
        decimalPos = text.indexOf('.');
    }
    if (text.charAt(0) == '-') {
        minus = '-';
    }
    if (decimalPos) {
        afterDecimal = text.slice(decimalPos);
        beforeDecimal = text.slice(0, decimalPos);
        text = beforeDecimal;
    }
    console.log(text);

    if(text.replace(/\D/g,'').length > 3) {
        let commadText = text;
        commadText = commadText.replace(/\D/g,'');
        commadText = commadText.slice(0, (commadText.length - 3)) + ',' + commadText.slice(-3);
        if (commadText.replace(/\D/g,'').length > 6) {
            commadText = commadText.slice(0, (commadText.length - 7)) +
             ',' + commadText.slice(-7);
        }
        display.textContent = minus + commadText + afterDecimal;
    }
}


function printDebugInfo() {
    console.log(`
    firstNum = ${firstNum}
    secondNum = ${secondNum}
    lastNum = ${lastNum}
    operand = ${operand}
    pressedOperand = ${pressedOperand}
    pressedEqual = ${pressedEqual}`)
}