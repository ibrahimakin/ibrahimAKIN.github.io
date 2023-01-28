/**
  * The code is a proof of concept and far from
  * perfect. You should never use regex but create or use a parser.
  * Meanwhile, play with it and improve it!
  */
const lang = {
  js: {
    equa: /(\b=\b)/g,
    quot: /(`|'|"|&#39;|&#34;)/g,
    comm: /((\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*))/g,
    logi: /(%=|%|\-|\+|\*|&amp;{1,2}|\|{1,2}|&lt;=|&gt;=|&lt;|&gt;|!={1,2}|={2,3})/g,
    numb: /(\d+(\.\d+)?(e\d+)?)/g,
    func: /(?<=^|\s*)(async|console|alert|Math|Object|Array|String|class(?!\s*\=)|function|(?<=\.)\D\w*)(?=\b)/g,
    decl: /(?<=^|\s*)(var|let|const)/g,                                           // Declarations
    pare: /(\(|\))/g,
    squa: /(\[|\])/g,
    curl: /(\{|\})/g
  },
  // Props order matters! Here I rely on "tags:"
  // being already applied in the previous iteration
  html: {
    tags: /(?<=&lt;(?:\/)?)(\w+)(?=\s|\&gt;)/g,
    angl: /(&lt;\/?|&gt;)/g,
    attr: /((?<=<i class=html_tags>\w+<\/i>)[^<]+)/g
  }
};

let iframeOMid = 'OM300x250' + Math.round(Math.random() * (10000 - 1)) + 1;       // create multi unique iframe
let iframeOM = document.createElement('IFRAME');
iframeOM.id = iframeOMid;
iframeOM.src = 'about:blank';
iframeOM.style.width = '100%';
iframeOM.style.height = '250px';
iframeOM.style.border = '0';
iframeOM.scrolling = 'no';
iframeOM.margin = '0';
iframeOM.frameborder = '0';

const codeResult = document.getElementById('code-result').appendChild(iframeOM);  // this can not apply to curent div
const editors = document.querySelectorAll('.highlite_editable');
const runButton = document.getElementById('run-button');
const instantRun = document.getElementById('instant-run');

const replaceChar = innerHtml => {
  return innerHtml.replace(/<div>/g, '').replace(/<\/div>/g, '').replace(/<br>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
};

let insantCompile = false;
let htmlResult = replaceChar(editors[0].innerHTML);
let scriptResult = replaceChar(editors[1].innerHTML);

const insertResults = () => {
  let contentDOM = '<html><head><style>*,*::before,*::after{box-sizing:border-box;}html{overflow:auto;}body{margin:0;padding:0;height:100%;overflow:auto;}</style></head><body>' + htmlResult + '<script type="text/javascript">' + scriptResult + '</script></body></html>';
  codeResult.src = 'data:text/html;charset=utf-8,' + escape(contentDOM);
  // Another way to write iFrame
  // let docu = iframeOM.contentWindow.document;
  // docu.open(); docu.writeln(contentDOM); docu.close();
}

const handleRunClick = () => {
  htmlResult = replaceChar(editors[0].innerHTML);
  scriptResult = replaceChar(editors[1].innerHTML);
  insertResults();
};

const handleCheckbox = e => {
  insantCompile = e.target.checked;
}

const highlite = el => {
  const dataLang = el.dataset.lang;                                               // Detect "js", "html", "py", "bash", ...
  const langObj = lang[dataLang];                                                 // Extract object from lang regexes dictionary
  let html = el.innerHTML;
  Object.keys(langObj).forEach(key => {
    html = html.replace(langObj[key], `<i class=${dataLang}_${key}>$1</i>`);
  });
  el.previousElementSibling.innerHTML = html;                                     // Finally, show highlights!
  if (insantCompile) {
    if (dataLang === 'js') scriptResult = replaceChar(el.innerHTML);
    else if (dataLang === 'html') htmlResult = replaceChar(el.innerHTML);
    insertResults();
  }
};

editors.forEach(el => {
  el.contentEditable = true;
  el.spellcheck = false;
  el.autocorrect = 'off';
  el.autocapitalize = 'off';
  el.addEventListener('input', highlite.bind(null, el));
  highlite(el);                                                                   // Init!
});

runButton.addEventListener('click', handleRunClick);
instantRun.addEventListener('change', handleCheckbox);
// https://stackoverflow.com/questions/41884969/highlight-syntax-in-contenteditable