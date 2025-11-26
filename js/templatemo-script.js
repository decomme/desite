$(function () {
    var $body   = $('body');
    var $header = $('.tm-header');
    var $toggle = $('.navbar-toggler');
    var MOBILE_BREAKPOINT = 992;

    function isMobile() {
        return window.innerWidth < MOBILE_BREAKPOINT;
    }

    function openMenu() {
        $header.addClass('show');
        $body.removeClass('menu-collapsed');
    }

    function closeMenu() {
        $header.removeClass('show');
        $body.addClass('menu-collapsed');
    }

    function toggleMenu() {
        if ($header.hasClass('show')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    if (isMobile()) {
        closeMenu();
    } else {
        openMenu();
    }

    $toggle.on('click', function (e) {
        e.stopPropagation();
        toggleMenu();
    });

    $(document).on('click', function (e) {
        if (!isMobile()) return;
        if ($(e.target).closest('.tm-header, .navbar-toggler').length === 0) {
            closeMenu();
        }
    });

    $(window).on('resize', function () {
        if (isMobile()) {
            closeMenu();
        } else {
            openMenu();
        }
    });
});
