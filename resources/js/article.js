const keyword = /(?<!([^\s,(}]{1}|\/\/.*))(public|private|protected|void|return|static|instanceof|for|while|do|if|else|switch|case|override|fun|var|val|companion|data|in|infix|tailrec|false|true|null|class|short|byte|int|long|double|float|boolean|throw|throws|try|catch|finally|final|static|interface|enum|abstract|import|this|super|new|package|yield|default)(?![\w\d]|[^\s)\{\(;]{1})/g;
const string = /(?<!\/\/.*)(["']([^+]*)["'])|(["'](@\+.*)["'])/g;
const className = /(?<![^\s./-<,(]|(\/\/.*))[A-Z]{1}[\w\d]*(?!([^\s.,>:("]){1})/g;
const digit = /(?<![^\s,(]|(\w\s))\d+(?![\w\d]|[^\s),;]{1})/g;
const annotation = /(?<![^\s]{1})@[A-Z]{1}[a-zA-Z\d]*/g
const comment = /(?<!(http{1}.*))\/\/.*/g

const elements = document.querySelectorAll('.code-container');

const scrollButtonContainer = document.querySelector('.scroll-top-container')
const header = document.querySelector('header');

function createCodeViews(){

    for(var i =0; i<elements.length; i++){

        let codeLines = elements[i].innerHTML.split('\n');
        elements[i].innerHTML = "";

        let codeViewContents = createCodeViewContents(codeLines);

        let codeHead = createCodeViewHead(function(){
             let text = collectTextCodes(codeViewContents);
             navigator.clipboard.writeText(text);
             $('.copy-message').animate({bottom: "0px"}, 512);
             $('.copy-message').delay(3000).animate({bottom: "-128px"}, 512);
        });

        elements[i].appendChild(codeHead);
        elements[i].appendChild(codeViewContents);

    }

}


function createCodeViewHead(onClickListener){
     var codeHead = document.createElement('div');
     codeHead.classList.add('code-head');

     var copyButton = document.createElement('button');
     copyButton.classList.add('md-bt', 'md-bt-light', 'material-icons');
     copyButton.innerHTML = "content_copy";

     copyButton.addEventListener('click', onClickListener);

     codeHead.appendChild(copyButton);

     return codeHead;
}

function createCodeViewContents(codeLines){
     var codeWrap = document.createElement('div');
     codeWrap.classList.add('code-wrap');

     var table = document.createElement('table');
     var tBody = table.createTBody();
     tBody.classList.add('code-body');

    for(var lineIndex = 0; lineIndex < codeLines.length; lineIndex++){
        let line = codeLines[lineIndex];
        line = styleAllSensitiveWords(line);
        insertLine(tBody, line, lineIndex);
    }

    table.appendChild(tBody);

    codeWrap.appendChild(table);

    return codeWrap;
}

function styleAllSensitiveWords(textLine){
        textLine = styleSensitiveWords(textLine, string, "string");
        textLine = styleSensitiveWords(textLine, keyword, "keyword");
        textLine = styleSensitiveWords(textLine, className, "class-name");
        textLine = styleSensitiveWords(textLine, digit, "digit")
        textLine = styleSensitiveWords(textLine, annotation, "annotation")
        textLine = styleSensitiveWords(textLine, comment, "comment");
        return textLine;
}

function styleSensitiveWords(text, regex ,styleClassName){
    return text.replaceAll(regex, function(word){
        return `<span class=\"${styleClassName}\">${word}</span>`;
    });
}

//create a row to insert code line
function insertLine(tBody , line, lineIndex){

    var row = tBody.insertRow(0);

    var col0 = row.insertCell(0);
    col0.classList.add('code-line-number');
    col0.innerHTML = lineIndex + 1;

    var col1 = row.insertCell(0);
    col1.classList.add('code');
    col1.innerHTML = line;

    row.appendChild(col0);
    row.appendChild(col1);

    tBody.appendChild(row);
}

function collectTextCodes(codeViewContents){
    const tBody = codeViewContents.querySelector('tbody');
    const rows = tBody.rows;
    let text = "";
    for(var i=0; i<rows.length; i++){
        var codeLine = rows[i].cells[1];
        text += codeLine.innerHTML +"\n";
    }

    text = text.replaceAll(/\&lt;/g, "<");
    text = text.replaceAll(/\&gt;/g, ">");
    text = text.replaceAll(/<\/span>/g, "");
    text = text.replaceAll(/<span class="(keyword|string)">/g, "")
    text = text.replaceAll(/<span class="(class-name|digit|annotation|comment)">/g,"")

    return text;
}


let currentScrollY = 0;

var scrollTopVisibility = function(){

    if(window.scrollY == 0){
        scrollButtonContainer.style.visibility = "hidden";
    }else{

        if(window.scrollY < currentScrollY){

           if(document.documentElement.scrollTop > header.offsetHeight)
                scrollButtonContainer.style.visibility = "visible";

        }else {
           scrollButtonContainer.style.visibility = "hidden";
        }
    }

    currentScrollY = window.scrollY;
}

function showPageLastModified(){
  
  var lastModified = document.lastModified;
  var date = new Date(lastModified).toLocaleDateString('fa-IR-u-nu-latn');

  var ltu = document.querySelector(".page-last-update");

  if(ltu != null)
    ltu.innerHTML = ltu.innerHTML + " " + date;

}

export {createCodeViews, scrollTopVisibility, showPageLastModified};
