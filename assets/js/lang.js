(function () {
    function applyLang(lang) {
        document.querySelectorAll('[data-hu]').forEach(function (el) {
            var text = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-hu');
            if (text !== null) {
                el.textContent = text;
            }
        });
        document.querySelectorAll('[data-hu-placeholder]').forEach(function (el) {
            var placeholder = lang === 'en' ? el.getAttribute('data-en-placeholder') : el.getAttribute('data-hu-placeholder');
            if (placeholder !== null) {
                el.setAttribute('placeholder', placeholder);
            }
        });
        document.documentElement.setAttribute('lang', lang);
        var btn = document.getElementById('lang-toggle');
        if (btn) {
            btn.textContent = lang === 'en' ? 'HU' : 'EN';
        }
        localStorage.setItem('lang', lang);
    }

    document.addEventListener('DOMContentLoaded', function () {
        var lang = localStorage.getItem('lang') || 'hu';
        applyLang(lang);
        var btn = document.getElementById('lang-toggle');
        if (btn) {
            btn.addEventListener('click', function () {
                var current = localStorage.getItem('lang') || 'hu';
                applyLang(current === 'hu' ? 'en' : 'hu');
            });
        }
    });
})();
