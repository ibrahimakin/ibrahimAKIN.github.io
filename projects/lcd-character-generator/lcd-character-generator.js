const display = document.getElementById('dr');
let arr = ['na', 'b', 'c', 'd', 'e', 'f', 'g', 'dp'];
let sum = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let result = 0;

function onClick(elmnt, dsply) {
    if (dsply) {
        let value = parseInt(elmnt.value);
        if (elmnt.style.backgroundColor != 'black') {
            elmnt.style.backgroundColor = 'black';
            elmnt.style.color = 'white';
            document.getElementById(elmnt.name).innerHTML = 1;
            result += value;
        }
        else {
            elmnt.removeAttribute('style');
            document.getElementById(elmnt.name).innerHTML = 0;
            result -= value;
        }
        display.innerHTML = result;
    }
    else {
        let txt = elmnt.ariaLabel;
        let arr = txt.split('x');
        if (elmnt.style.backgroundColor != 'black') {
            sum[arr[0]] = sum[arr[0]] + +arr[1];
            elmnt.style.backgroundColor = 'black';
            document.getElementById(arr[0]).innerHTML = sum[+arr[0]];
            document.getElementById(arr[0] + arr[0]).innerHTML = sum[+arr[0]];
        }
        else {
            sum[arr[0]] = sum[arr[0]] - +arr[1];
            elmnt.removeAttribute('style');
            document.getElementById(arr[0]).innerHTML = sum[+arr[0]];
            document.getElementById(arr[0] + arr[0]).innerHTML = sum[+arr[0]];
        }
    }
}

function onClear(dsply) {
    if (dsply) {
        result = 0;
        display.innerHTML = 0;
        for (let i = 0; i < 8; i++) {
            document.getElementById('i' + arr[i]).removeAttribute('style');
            document.getElementById(arr[i]).innerHTML = 0;
        }
    }
    else {
        const buttons = document.querySelectorAll('#lcd button:not([lang-tag])');
        for (const button of buttons) button.removeAttribute('style');
        for (let i = 1; i < 9; i++) {
            document.getElementById(i + '' + i).innerHTML = 0;
            document.getElementById(i).innerHTML = 0;
            sum[i] = 0;
        }
    }
}