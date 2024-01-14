let firstNum = 0;
let secondNum = 0;
let lastNum = 0;
let operand = false;
let pressedOperand = false;
let pressedEqual = false;
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
    if (firstNum && secondNum) {
        display.textContent = `${display.textContent}${input}`;
        secondNum = display.textContent.replace(',','');
        return;
    }
    //init secondNum
    if (firstNum) {
        display.textContent = input;
        secondNum = display.textContent.replace(',','');
        if (document.querySelector('.active')) document.querySelector('.active').classList.toggle('active');
        return;
    }
    //init firstNum
    if (display.textContent == '0') {
        if (input == 0) return;
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

    if (target.classList.contains('number')) {
        updateNumber(target.textContent);
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
        }
        if (!secondNum) {
            clear.firstChild.textContent = "AC";
            firstNum = 0;
            //negative = false;
        }
        display.textContent = 0;
        secondNum = 0;
    }

    if (target == plusminus || target.parentNode == plusminus) {
        if (display.textContent == '0') return display.textContent = '-0';
        if (display.textContent == '-0') return display.textContent = 0;
        display.textContent *= -1;
    }

    if (target == percent || target.parentNode == percent) {
        if (display.textContent == 0) {
            return;
        }
        display.textContent = percentage(display.textContent.replace(',','').replace('–','-'));
    }

    if (target.classList.contains('operand') || target.parentNode.classList.contains('operand')) {
        if (pressedOperand) {
            if (document.querySelector('.active')) {
                document.querySelector('.active').classList.toggle('active');
                target.closest('.operand').classList.add('active');
                return;
            }
            operate();
        }
        operand = target.textContent;
        if (document.querySelector('.active')) document.querySelector('.active').classList.toggle('active');
        target.closest('.operand').classList.add('active');
        pressedOperand = true;
        //negative = false;
        firstNum = display.textContent.replace(',','');
    }

    // equal pressed
    if (target.classList.contains('equal') || target.parentNode.classList.contains('equal')) {
        if (operand && lastNum) {
            operate(true);
            pressedOperand = false;
            return;
        }
        if (!secondNum) return firstNum = display.textContent.replace(',','');
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
        console.log("lastNum used");
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
        firstNum = solution;
        lastNum = secondNum;
        secondNum = 0;
        console.log("secondNum used");
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
    return (a / 100).toFixed(a.replace('.','').replace(',','').length + 1);
}