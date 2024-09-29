let arr = ['na', 'b', 'c', 'd', 'e', 'f', 'g', 'dp'];
let sum = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let result = 0;

function onClick(elmnt, dsply) {
    if (dsply) {
        let value = parseInt(elmnt.value);
        if (!elmnt.classList.contains('on')) {
            elmnt.classList.add('on');
            document.getElementById(elmnt.name).innerHTML = 1;
            result += value;
        }
        else {
            elmnt.classList.remove('on');
            document.getElementById(elmnt.name).innerHTML = 0;
            result -= value;
        }
        document.getElementById('dr').innerHTML = result;
    }
    else {
        let txt = elmnt.getAttribute('aria-label');
        let arr = txt.split('x');
        if (!elmnt.classList.contains('on')) {
            sum[arr[1]] = sum[arr[1]] + +arr[0];
            elmnt.classList.add('on');
            document.getElementById(arr[1]).innerHTML = sum[+arr[1]];
            document.getElementById(arr[1] + arr[1]).innerHTML = sum[+arr[1]];
        }
        else {
            sum[arr[1]] = sum[arr[1]] - +arr[0];
            elmnt.removeAttribute('class');
            document.getElementById(arr[1]).innerHTML = sum[+arr[1]];
            document.getElementById(arr[1] + arr[1]).innerHTML = sum[+arr[1]];
        }
    }
}

function onClear(dsply) {
    if (dsply) {
        result = 0;
        document.getElementById('dr').innerHTML = 0;
        for (let i = 0; i < 8; i++) {
            document.getElementById('i' + arr[i]).classList.remove('on');
            document.getElementById(arr[i]).innerHTML = 0;
        }
    }
    else {
        const buttons = document.querySelectorAll('#lcd button:not([lang-tag])');
        for (const button of buttons) button.removeAttribute('class');
        for (let i = 1; i < 9; i++) {
            document.getElementById(i + '' + i).innerHTML = 0;
            document.getElementById(i).innerHTML = 0;
            sum[i] = 0;
        }
    }
}