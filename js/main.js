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

  document.addEventListener("DOMContentLoaded", function () {
    addNavigationListeners();
  });
})();
