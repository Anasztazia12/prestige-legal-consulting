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
    });
})();
