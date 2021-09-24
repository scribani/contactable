const DOMHandler = (function () {
  return {
    render: function (page) {
      const container = document.querySelector(".js-content");
      container.innerHTML = page.render();
      page.addEventListeners();
    },
  };
})();

export default DOMHandler;
