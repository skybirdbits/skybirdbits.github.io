const linkCoursesRepo = [
   "https://skybirdbits.github.io/resources/json/java-links.json",
   "https://skybirdbits.github.io/resources/json/kotlin-links.json",
   "https://skybirdbits.github.io/resources/json/android-links.json",
   "https://skybirdbits.github.io/resources/json/web-links.json",
   "https://skybirdbits.github.io/resources/json/blog-links.json",
]

function initSidebar(){
    var sidebar = document.getElementById('sidebar');

        if(sidebar != null){
            sidebar.addEventListener('show.bs.offcanvas', function(){
               $("#brand").hide('slow');
            });
            sidebar.addEventListener('hide.bs.offcanvas', function(){
                $("#brand").show('slow');
            });
        }
}

/*
    Functions to create list with links to article subjects
    views: createArticleListView(article), createListItemView(link) ,createExpandableButton(article),
    utils: rotate(icon, article), getTransformRotation(degree)
*/

//retrieve links stored in json files inside path: /resources/json
function loadAllArticleLinks(){

    const articleListViewContainer = document.getElementById('article_container');

    if(articleListViewContainer){
        for(var i =0; i<linkCoursesRepo.length; i++){

        $.getJSON(linkCoursesRepo[i], function(data){

            var article = {
                            id: data.id,
                            title: data.title,
                            links: data.links,
                            isExpanded: false
                           };
            var articleListView = createArticleListView(article);
            articleListViewContainer.appendChild(articleListView);

            }).fail(function(){
                articleListViewContainer.innerText = "Links did not Load";
            });
        }
    }
}

//create list view for an article to show its related links
function createArticleListView(article){
    var parent = document.createElement('div');

    var btExpand = createExpandableButton(article);

    var subjectListContainer = document.createElement('div');
    subjectListContainer.classList.add('collapse');
    subjectListContainer.id = article.id;

    var unorderedList = document.createElement('ul');
    unorderedList.classList.add('list');

    var links = article.links;
    for(var i =0; i<links.length; i++){
        var item = createListItemView(links[i]);
        unorderedList.appendChild(item);
    }

    subjectListContainer.appendChild(unorderedList);

    parent.appendChild(btExpand);
    parent.appendChild(subjectListContainer);

    return parent;
}

//create an expandable button for every lists which contain links
function createExpandableButton(article){
    var btExpand = document.createElement('button');
    btExpand.classList.add('md-bt-expandable');
    btExpand.dataset.bsTarget = ('#' + article.id);
    btExpand.dataset.bsToggle = 'collapse'

    var icon = document.createElement('span');
    icon.classList.add('material-icons');
    icon.innerHTML = 'arrow_drop_down'
    icon.style.transform = 'rotate(90deg)';

    var text = document.createElement('span');
    text.innerText = article.title;

    btExpand.appendChild(icon);
    btExpand.appendChild(text);

    btExpand.addEventListener('click', function(){
            rotate(icon, article);
    });

    return btExpand;
}

function rotate(icon , article){
    if(!article.isExpanded){
        icon.style.transform = 'rotate(0deg)';
    }else{
        icon.style.transform = 'rotate(90deg)';
    }

    article.isExpanded = !article.isExpanded;
}

function createListItemView(link){
   var item = document.createElement('li');
   item.classList.add('list-item');

   var anchor = document.createElement('a');
   anchor.classList.add('list-item-link');
   anchor.href = link.href;
   anchor.innerHTML = link.subject;
   item.appendChild(anchor);

   return item;
}

export {initSidebar , loadAllArticleLinks};