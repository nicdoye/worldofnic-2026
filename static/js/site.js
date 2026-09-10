(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var body = document.querySelector('.body');
    var wrapper = document.getElementById('wrapper');
    var main = document.getElementById('main');
    var header = document.getElementById('header');
    if (!body || !wrapper || !main) return;

    setTimeout(function () {
      body.classList.remove('is-loading');
    }, 100);

    var articles = main.querySelectorAll('article');

    function openArticle(id) {
      var target = main.querySelector('#' + id);
      if (!target) return;

      articles.forEach(function (a) { a.classList.remove('active'); });
      target.classList.add('active');
      body.classList.add('is-article-visible');

      setTimeout(function () {
        main.style.display = 'flex';
        if (header) header.style.display = 'none';
      }, 325);

      setTimeout(function () {
        target.classList.add('timeout');
      }, 350);
    }

    function closeArticle() {
      var active = main.querySelector('article.active');

      if (active) active.classList.remove('timeout');

      setTimeout(function () {
        main.style.display = 'none';
        if (header) header.style.display = '';
      }, 325);

      setTimeout(function () {
        body.classList.remove('is-article-visible');
        if (active) active.classList.remove('active');
      }, 350);
    }

    document.querySelectorAll('nav a[data-panel]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        openArticle(link.getAttribute('data-panel'));
      });
    });

    articles.forEach(function (article) {
      var close = article.querySelector('.close');
      if (close) close.addEventListener('click', closeArticle);
    });

    document.addEventListener('mousedown', function (e) {
      if (body.classList.contains('is-article-visible') && !wrapper.contains(e.target)) {
        closeArticle();
      }
    });
  });
})();
