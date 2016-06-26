(function () {
  var IN_TRANSITION = false;

  function hasClass(element, className) {
    var classArray = [].slice.call(element.classList);
    return (classArray.indexOf(className) !== -1);
  }

  function addClass(element, newClass) {
  if (!hasClass(element, newClass)) {
      element.className = element.className + " " + newClass;
    }
  }

  function removeClass(element, className) {
    var classArray = [].slice.call(element.classList);
    element.className = classArray.filter( function (klass) {
      return klass !== className;
    }).join(" ");
  }

  function exitAll () {
    var elements = [].slice.call(document.getElementsByClassName("active"));
    elements.forEach( function (el) {
      removeClass(el, "active");
    });
  }

  function enterGroup (groupName) {
    var elements = [].slice.call(document.getElementsByClassName(groupName));
    elements.forEach( function (el) {
      addClass(el, "active");
      IN_TRANSITION = false;
    });
  }

  function addNavigationListeners () {
    var nav = document.getElementById("internal-nav");
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        if (IN_TRANSITION || hasClass(e.target, "active")) {
          return;
        }
        IN_TRANSITION = true;
        var targetGroup = e.target.className.split(" ")[0];
        exitAll();
        addClass(e.target, "active");
        setTimeout( function () {
          enterGroup(targetGroup);
        }, 300);
      }
    });
  }

  function addDropdownListener () {
    var nav = document.getElementById("collapse-button");
    var content = document.getElementById("collapse-target");
    document.addEventListener("click", function (e) {
      if (nav.contains(e.target)) {
        addClass(content, "active");
      }
      else {
        removeClass(content, "active");
      }
    });
  }

  function addProjectLinkListener () {
    var menu = document.getElementById("project-menu");
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "LI") {
        var index = parseInt(e.target.attributes["data-index"].value);
        var top = "-" + (index * 100) + "%";
        var view = document.getElementById("project-view");
        view.style.top = top;
        var listItems = menu.getElementsByTagName("li");
        [].slice.call(listItems).forEach( function (li) {
          removeClass(li, "selected");
        });
        addClass(e.target, "selected");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    addNavigationListeners();
    addDropdownListener();
    addProjectLinkListener();
  });

})();
