let toplam = [0, 0, 0, 0, 0, 0, 0, 0, 0]
function onClick(elmnt) {
	let txt = elmnt.id;
	let arr = txt.split("_");

	if (elmnt.style.backgroundColor != 'black') {
	    toplam[arr[0]] = toplam[arr[0]] + +arr[1];
		elmnt.style.backgroundColor = 'black';
		document.getElementById(arr[0]).innerHTML = toplam[+arr[0]];
		document.getElementById(arr[0] + arr[0]).innerHTML = toplam[+arr[0]];
	}
	else {
		toplam[arr[0]] = toplam[arr[0]] - +arr[1];
		elmnt.style.backgroundColor = '';
		document.getElementById(arr[0]).innerHTML = toplam[+arr[0]];
		document.getElementById(arr[0] + arr[0]).innerHTML = toplam[+arr[0]];
	}
}
function btnClear() {
	let i;
	let j;
	for (i = 1; i < 9; i++) {
		for (j = 1; j < 17; j = j * 2) {
			document.getElementById(i + "_" + j).style.backgroundColor = '';
			document.getElementById(i).innerHTML = 0;
			document.getElementById(i + "" + i).innerHTML = 0;
			toplam[i] = 0;
		}
	}
}
let displayResult = 0;
const displayRes = document.getElementById('dr');
function DisplayClick(btn) {
	let value = parseInt(btn.value);
	if (btn.style.backgroundColor != 'black') {
		btn.style.backgroundColor = 'black';
		btn.style.color = 'white';
		document.getElementById(btn.name).innerHTML = 1;
		displayResult += value;
	}
	else {
		btn.style.backgroundColor = '';
		btn.style.color = '';
		document.getElementById(btn.name).innerHTML = 0;
		displayResult -= value;
	}
	displayRes.innerHTML = displayResult;
}
let dizi = ['na', 'b', 'c', 'd', 'e', 'f', 'g', 'dp'];
function displayClear() {
	displayResult = 0;
	displayRes.innerHTML = 0;
	for (let i = 0; i < 8; i++) {
		document.getElementById("i" + dizi[i]).style.backgroundColor = 'white';
		document.getElementById("i" + dizi[i]).style.color = 'black';
		document.getElementById(dizi[i]).innerHTML = 0;
	}
}