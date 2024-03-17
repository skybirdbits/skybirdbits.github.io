import {createCodeViews, scrollTopVisibility, getLastUpdate} from './article.js';
import {initSidebar , loadAllArticleLinks} from './base.js';
import * as fileloader from './fileloader.js';

fileloader.loadStylesheet(
"https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" ,
"sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi",
"anonymous"
);

fileloader.loadJavaScript(
"https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js",
"sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3",
"anonymous"
);

fileloader.loadJavaScript(
"https://code.jquery.com/jquery-3.6.1.min.js",
"sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=",
"anonymous"
);

window.onload = function(){

    document.getElementById('lastUpdate').innerHTML = getLastUpdate();

    $('header').load('/ui-components/header-contents.html', function(){
        initSidebar();
        loadAllArticleLinks();
    });
    $('footer').load('/ui-components/footer-contents.html');

    createCodeViews();
}


window.onscroll = scrollTopVisibility;
