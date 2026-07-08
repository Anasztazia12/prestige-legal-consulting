(function () {
    function animateCount(el) {
        var target = parseInt(el.getAttribute('data-target'), 10);
        if (isNaN(target)) return;
        var duration = 2200;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                el.textContent = target;
            }
        }
        window.requestAnimationFrame(step);
    }

    document.addEventListener('DOMContentLoaded', function () {
        var items = document.querySelectorAll('.reveal');

        if (!('IntersectionObserver' in window)) {
            items.forEach(function (el) {
                el.classList.add('is-visible');
                el.querySelectorAll('.count[data-target]').forEach(animateCount);
            });
        } else {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        entry.target.querySelectorAll('.count[data-target]').forEach(animateCount);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            items.forEach(function (el) { observer.observe(el); });
        }

        var header = document.querySelector('header');
        if (header) {
            var toggleHeaderShadow = function () {
                header.classList.toggle('scrolled', window.scrollY > 10);
            };
            toggleHeaderShadow();
            window.addEventListener('scroll', toggleHeaderShadow, { passive: true });
        }

        var navToggle = document.getElementById('nav-toggle');
        var nav = document.querySelector('header nav');
        if (navToggle && nav) {
            var closeNav = function () {
                nav.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            };
            navToggle.addEventListener('click', function () {
                var isOpen = nav.classList.toggle('open');
                navToggle.classList.toggle('open', isOpen);
                navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            });
            nav.querySelectorAll('a').forEach(function (link) {
                link.addEventListener('click', closeNav);
            });
        }
    });
})();
