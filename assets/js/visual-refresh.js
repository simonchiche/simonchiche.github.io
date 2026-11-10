/* Accessible navigation and clickable research/outreach figures. */
(function () {
  "use strict";

  if (!document.body.classList.contains("site-refined")) return;

  var navigation = document.getElementById("site-nav");
  var menuButton = navigation && navigation.querySelector("button");
  var overflowMenu = document.getElementById("site-nav-overflow");

  if (menuButton && overflowMenu) {
    var syncMenu = function () {
      menuButton.setAttribute("aria-expanded", String(!overflowMenu.classList.contains("hidden")));
    };
    var closeMenu = function () {
      overflowMenu.classList.add("hidden");
      menuButton.classList.remove("close");
      syncMenu();
    };

    new MutationObserver(syncMenu).observe(overflowMenu, { attributes: true, attributeFilter: ["class"] });
    menuButton.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowDown") return;
      event.preventDefault();
      if (overflowMenu.classList.contains("hidden")) menuButton.click();
      var firstLink = overflowMenu.querySelector("a");
      if (firstLink) firstLink.focus();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !overflowMenu.classList.contains("hidden")) {
        closeMenu();
        menuButton.focus();
      }
    });
    document.addEventListener("click", function (event) {
      if (!navigation.contains(event.target)) closeMenu();
    });
    syncMenu();
  }

  if (!window.jQuery || !window.jQuery.fn.magnificPopup) return;

  window.jQuery(function ($) {
    $(".research-block__figure > img, .outreach-section__image > img").each(function () {
      var image = $(this);
      var source = image.attr("src");
      if (!source || /\.svg(?:[?#]|$)/i.test(source)) return;
      image.wrap($("<a>", { href: source, class: "figure-zoom" }));
    });

    $(".figure-zoom").magnificPopup({
      type: "image",
      closeOnContentClick: true,
      image: {
        titleSrc: function (item) {
          var caption = item.el.closest("figure").find("figcaption").text().trim();
          return $("<span>").text(caption).html();
        }
      }
    });
  });
}());
