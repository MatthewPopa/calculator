let firstNum = false;
let secondNum = false;
let operand;
let pressedOperand;
let negative = false;
const display = document.querySelector('.display');
const calculator = document.querySelector('.calculator');
const clear = document.querySelector('#clear');
const plusminus = document.querySelector('#plusminus');
const percent = document.querySelector('#percent');

calculator.addEventListener('click', (e) => {
    let target = e.target;
    //console.log(target);

    if (target.classList.contains('number')) {
        if (display.textContent == '0' || display.textContent == '–0' || pressedOperand) {
            pressedOperand = false;
            if(!negative) {
                display.textContent = target.textContent;
            } else { display.textContent = '–' + target.textContent }
            secondNum = display.textContent.replace(',','').replace('–','-');
        } else {
            display.textContent = `${display.textContent}${target.textContent}`;
            secondNum = display.textContent.replace(',','').replace('–','-');
        }

        clear.firstChild.textContent = "C";

        //adding commas
        if (display.textContent.replace(/\D/g,'').length > 3) {
            display.textContent = display.textContent.replace(/\D/g,'');
            display.textContent = display.textContent.slice(0, (display.textContent.length - 3)) +
            ',' + display.textContent.slice(-3);
            if (display.textContent.replace(/\D/g,'').length > 6) {
                display.textContent = display.textContent.slice(0, (display.textContent.length - 7)) +
                ',' + display.textContent.slice(-7);
            }
            if(negative) { display.textContent = '–' + display.textContent }
        };
    }

    if (target == clear || target.parentNode == clear) {
        if (clear.firstChild.textContent == "AC") {
            pressedOperand = false;
            if (document.querySelector('.active')) document.querySelector('.active').classList.toggle('active');
        }
        display.textContent = 0;
        clear.firstChild.textContent = "AC";
        negative = false;
    }

    if (target == plusminus || target.parentNode == plusminus) {
        negative = !negative;
        if(!negative) {
            display.textContent = display.textContent.slice(1 - display.textContent.length);
        } else { display.textContent = '–' + display.textContent; }
    }

    if (target == percent || target.parentNode == percent) {
        if (display.textContent == '0' || display.textContent == '–0') {
            return;
        }
        display.textContent = percentage(display.textContent.replace(',','').replace('–','-'));
    }

    if (target.classList.contains('operand') || target.parentNode.classList.contains('operand')) {
        operand = target.textContent;
        if (document.querySelector('.active')) document.querySelector('.active').classList.toggle('active');
        target.closest('.operand').classList.add('active');
        pressedOperand = true;
        negative = false;
        firstNum = display.textContent.replace(',','').replace('–','-');
    }
});

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
    return (a / 100).toFixed(a.length + 1);
}