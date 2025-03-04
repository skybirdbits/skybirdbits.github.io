import {createCourseListView} from './ui.js';

const courseDataRepo = [
  "/resources/json/java-links.json",
  "/resources/json/kotlin-links.json",
  "resources/json/java-lib-links.json",
  "/resources/json/android-links.json",
  "/resources/json/linux-links.json",
  "/resources/json/web-links.json",
  "/resources/json/blog-links.json"
]

const header = document.querySelector('header');
const footer = document.querySelector("footer");

class CourseData {
  isExpanded = false;
  constructor(id, title, urls) {
    this.id = id;
    this.title = title;
    this.urls = urls;
  }

  reverseExpandStatus() {
    this.isExpanded = !this.isExpanded;
  }
}


//loads Ui Components into documents
function loadAllUiComponents() {


  loadComponent("/ui-components/header-contents.html", header, () => {

    //container is already loaded
    const container = document.getElementById("article_container");

    prepareSidebarAnim();

    loadJsonUrls((result) => {
      const data = new CourseData(
        result.id, result.title, result.links
      );

      const listView = createCourseListView(data);

      container.appendChild(listView);

    });

  });

  loadComponent("/ui-components/footer-contents.html", footer);

}

function prepareSidebarAnim() {
  const sidebar = document.getElementById('sidebar');

  if (sidebar != null) {
    sidebar.addEventListener('show.bs.offcanvas', function () {
      $("#brand").hide('slow');
    });
    sidebar.addEventListener('hide.bs.offcanvas', function () {
      $("#brand").show('slow');
    });
  }
}


async function loadComponent(path, parent, callback) {

  callback = callback || 0;
  const req = await fetch(path);

  await req.text().then(
    (text) => {
      parent.insertAdjacentHTML('beforeend', text);
      if (callback != 0)
        callback();

    }).catch((e) => console.log(e));
}

//retrieve data stored in json files inside path: /resources/json
async function loadJsonUrls(onRetrieveJSONListener) {

  for (var i = 0; i < courseDataRepo.length; i++) {

    const url = courseDataRepo[i];

    const req = await fetch(url)
    await req.json().then(
      (result) =>
        onRetrieveJSONListener(result)
    ).catch(e => console.log(e));
  }
}


const scrollButtonContainer = document.querySelector('.scroll-top-container')

let currentScrollY = 0;

var scrollTopVisibility = function () {

  if (window.scrollY == 0) {
    scrollButtonContainer.style.visibility = "hidden";
  } else {

    if (window.scrollY < currentScrollY) {

      if (document.documentElement.scrollTop > header.offsetHeight)
        scrollButtonContainer.style.visibility = "visible";

    } else {
      scrollButtonContainer.style.visibility = "hidden";
    }
  }

  currentScrollY = window.scrollY;
}

export {loadAllUiComponents, scrollTopVisibility};
