// 슬라이더(화살표·썸네일·키보드·스와이프·원본 크기)와 '맨 위로' 버튼 동작
(function () {
  function pad(n) { return String(n).padStart(2, "0"); }

  document.querySelectorAll("[data-slider]").forEach(function (root) {
    var thumbs = Array.prototype.slice.call(root.querySelectorAll(".slider-thumb"));
    var strip = root.querySelector(".slider-thumbs");
    var img = root.querySelector(".slider-img");
    var box = root.querySelector(".lightbox");
    var boxImg = box.querySelector("img");
    var counters = root.querySelectorAll("[data-current]");
    var title = img.getAttribute("data-alt");
    var count = thumbs.length;
    var index = 0;

    function show(n) {
      index = ((n % count) + count) % count;
      var src = thumbs[index].getAttribute("data-full");
      img.src = src;
      img.alt = title + " 기획서 " + (index + 1) + "번째 장";
      img.classList.remove("is-in"); void img.offsetWidth; img.classList.add("is-in");
      boxImg.src = src;
      boxImg.alt = img.alt;
      counters.forEach(function (c) { c.textContent = pad(index + 1); });
      thumbs.forEach(function (t, i) {
        t.classList.toggle("is-active", i === index);
        t.setAttribute("aria-current", i === index ? "true" : "false");
      });
      var t = thumbs[index];
      strip.scrollTo({ left: t.offsetLeft - strip.clientWidth / 2 + t.clientWidth / 2, behavior: "smooth" });
      var pre = new Image();
      pre.src = thumbs[(index + 1) % count].getAttribute("data-full");
    }

    root.querySelectorAll("[data-next]").forEach(function (b) { b.addEventListener("click", function () { show(index + 1); }); });
    root.querySelectorAll("[data-prev]").forEach(function (b) { b.addEventListener("click", function () { show(index - 1); }); });
    thumbs.forEach(function (t, i) { t.addEventListener("click", function () { show(i); }); });

    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") show(index + 1);
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "Escape" && !box.hidden) close();
    });

    var x0 = null;
    var stage = root.querySelector(".slider-stage");
    stage.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
      x0 = null;
    });

    function open() {
      boxImg.src = img.src; boxImg.alt = img.alt;
      box.hidden = false; document.body.style.overflow = "hidden";
      box.querySelector("[data-close]").focus();
    }
    function close() {
      box.hidden = true; document.body.style.overflow = "";
      root.querySelector("[data-zoom]").focus();
    }
    root.querySelector("[data-zoom]").addEventListener("click", open);
    box.querySelector("[data-close]").addEventListener("click", close);
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
  });

  // 맨 위로 버튼: 페이지 끝부분에 도달하면 나타납니다.
  var topBtn = document.querySelector(".to-top");
  if (topBtn) {
    var check = function () {
      var doc = document.documentElement;
      var nearEnd = window.scrollY + window.innerHeight >= doc.scrollHeight - 700;
      topBtn.classList.toggle("is-shown", nearEnd && window.scrollY > 300);
    };
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();
    topBtn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }
})();
