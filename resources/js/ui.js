/*
  Views which appear in sidebar.
 */

//create list view for a course to show its content links inside sidebar
function createCourseListView(courseData){
    var parent = document.createElement('div');

    var btExpand = createExpandableButton(courseData);

    var subjectListContainer = document.createElement('div');
    subjectListContainer.classList.add('collapse');
    subjectListContainer.id = courseData.id;

    var unorderedList = document.createElement('ul');
    unorderedList.classList.add('list');

    var urls = courseData.urls;
    for(var i =0; i<urls.length; i++){
        var item = createListItemView(urls[i]);
        unorderedList.appendChild(item);
    }

    subjectListContainer.appendChild(unorderedList);

    parent.appendChild(btExpand);
    parent.appendChild(subjectListContainer);

    return parent;
}

//create an expandable button for every courses which contain links
function createExpandableButton(courseData){
    var btExpand = document.createElement('button');
    btExpand.classList.add('md-bt-expandable');
    btExpand.dataset.bsTarget = ('#' + courseData.id);
    btExpand.dataset.bsToggle = 'collapse';
    
    const icon = document.createElement('span');
    icon.classList.add('material-icons');
    icon.innerHTML = 'arrow_drop_down'
    icon.style.transform = 'rotate(90deg)';

    const text = document.createElement('span');
    text.innerText = courseData.title;

    btExpand.appendChild(icon);
    btExpand.appendChild(text);

    btExpand.addEventListener('click', function(){
            rotate(icon, courseData);
    });

    return btExpand;
}

//animates arrow rotation beside of course title
function rotate(icon , courseData){
    if(!courseData.isExpanded){
        icon.style.transform = 'rotate(0deg)';
    }else{
        icon.style.transform = 'rotate(90deg)';
    }

    courseData.reverseExpandStatus()
}

//creates item for every url related to course for showing in sidebar 
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


/*
  Views about code styling usable in article.js
*/

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


export {createCourseListView, createCodeViewHead}
