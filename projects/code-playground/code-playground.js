let iframeOMid = 'OM300x250' + Math.round(Math.random() * (10000 - 1)) + 1;       // create multi unique iframe
let iframeOM = document.createElement('IFRAME');
iframeOM.id = iframeOMid;
iframeOM.title = 'result';
iframeOM.src = 'about:blank';
iframeOM.style.width = '100%';
iframeOM.style.height = '250px';
iframeOM.style.border = '0';
iframeOM.scrolling = 'no';
iframeOM.margin = '0';
iframeOM.frameborder = '0';

const codeResult = document.getElementById('code-result').appendChild(iframeOM);  // this can not apply to curent div
const instantRun = document.getElementById('instant-run');
const runButton = document.getElementById('run-button');
const editors = document.querySelectorAll('.editor');

let insantCompile = false;
let htmlResult = editors[0].value;
let cssResult = editors[1].value;
let scriptResult = editors[2].value;

const insertResults = () => {
    let contentDOM = '<html><head><style>*,*::before,*::after{box-sizing:border-box}html{overflow:auto}body{margin:0;padding:0;height:100%;overflow:auto}</style><style>' + cssResult + '</style></head><body>' + htmlResult + '<script type="text/javascript">' + scriptResult + '</script></body></html>';
    codeResult.src = 'data:text/html;charset=utf-8,' + escape(contentDOM);
}

const handleRun = () => {
    htmlResult = editors[0].value;
    cssResult = editors[1].value;
    scriptResult = editors[2].value;
    insertResults();
};

editors.forEach(t => t.addEventListener('input', () => { if (insantCompile) handleRun(); }));
runButton.addEventListener('click', handleRun);
instantRun.addEventListener('change', e => insantCompile = e.target.checked);

(async $ => {
    $('textarea.language-html.fill').forEach(t => t.value = `
<div style="padding: 1px 20px;">
	<div id="id01">
		<h2>Code Playground</h2>
	</div>
	<div><h2 class="head">Code Playground</h2></div>
	<div><h2>Code Playground</h2></div>
	<div><h2 class="head">Code Playground</h2></div>
	<div><h2>Code Playground</h2></div>
	<div><h2 class="head">Code Playground</h2></div>
	<div><h2>Code Playground</h2></div>
	<div><h2 class="head">Code Playground</h2></div>
	<div><h2>Code Playground</h2></div>
	<div><h2 class="head">Code Playground</h2></div>
	<div><h2>Code Playground</h2></div>
</div>
`);

    $('textarea.language-css.fill').forEach(t => {
        t.value = `
.head {
	color: gray;
}
`;
        t.dispatchEvent(new InputEvent('input'));
    });

    $('textarea.language-js.fill').forEach(t => {
        t.value = `
// Type some JavaScript here
console.log('OK');
document.getElementById('id01').style = "color: red;";
`;
        t.dispatchEvent(new InputEvent('input'));
    });
})(Bliss.$);