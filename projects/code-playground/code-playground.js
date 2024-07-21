const iframeOM = document.createElement('iframe');
iframeOM.id = 'OM300x250' + Math.round(Math.random() * (10000 - 1)) + 1;
iframeOM.title = 'result';
iframeOM.src = 'about:blank';

const codeResult = document.getElementById('code-result').appendChild(iframeOM);
const instantRun = document.getElementById('instant-run');
const runButton = document.getElementById('run-button');
const editors = document.querySelectorAll('.editor');

let insantCompile = false;
let htmlResult = editors[0].value;
let cssResult = editors[1].value;
let scriptResult = editors[2].value;

const insertResults = () => {
    const contentDOM = '<html><head><style>*,*::before,*::after{box-sizing:border-box}</style><style>' + cssResult + '</style></head><body>' + htmlResult + '<script type="text/javascript">' + scriptResult + '</script></body></html>';
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
<div>
    <h2>Code Playground</h2>
</div>
`);

    $('textarea.language-css.fill').forEach(t => {
        t.value = `
h2 {
    text-shadow: 1px 1px #000;
}
`;
        t.dispatchEvent(new InputEvent('input'));
    });

    $('textarea.language-js.fill').forEach(t => {
        t.value = `
// Type some JavaScript here
console.log('Code Playground');
document.getElementsByTagName('h2')[0].style = 'color: #f00;';
`;
        t.dispatchEvent(new InputEvent('input'));
    });
})(Bliss.$);