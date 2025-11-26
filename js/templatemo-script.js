$(function () {
    var $body   = $('body');
    var $header = $('.tm-header');
    var $toggle = $('.navbar-toggler');
    var MOBILE_BREAKPOINT = 992; // 992 altı = mobil

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

    // === SAYFA İLK AÇILIŞ DURUMU ===
    if (isMobile()) {
        // Mobilde varsayılan: menü kapalı
        closeMenu();
    } else {
        // Desktop’ta varsayılan: menü açık
        openMenu();
    }

    // === BUTON TIKLAMA – HER YERDE GEÇERLİ ===
    $toggle.on('click', function (e) {
        e.stopPropagation(); // dış tıklama handler'ına gitmesin
        toggleMenu();
    });

    // === DIŞARI TIKLAMA: SADECE MOBİLDE MENÜ KAPANSIN ===
    $(document).on('click', function (e) {
        // Desktop ise hiç bir şey yapma
        if (!isMobile()) return;

        // Tıklanan yer sidebar ya da buton değilse kapat
        if ($(e.target).closest('.tm-header, .navbar-toggler').length === 0) {
            closeMenu();
        }
    });

    // === EKRAN BOYUTU DEĞİŞİNCE DURUMU GÜNCELLE ===
    $(window).on('resize', function () {
        if (isMobile()) {
            // mobilden bakıyorsak kapalı kalsın
            closeMenu();
        } else {
            // desktop'a geçince sidebar açık, içerik sağda
            openMenu();
        }
    });
});
