// js/templatemo-script.js
$(function () {
    var $header   = $('.tm-header');        // Sidebar
    var $toggler  = $('.navbar-toggler');   // Menü butonu
    var $navLinks = $('#tm-nav .tm-nav-link');
    var $body     = $('body');

    // 1) Butona tıklayınca menüyü aç/kapat
    $toggler.on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Mobil için: .show class'ı (zaten CSS'te var)
        $header.toggleClass('show');

        // Desktop için: body'ye menu-collapsed class'ı
        $body.toggleClass('menu-collapsed');

        // Butonun pozisyonu için class
        $toggler.toggleClass('is-open');
    });

    // 2) Menü linkine tıklanınca menüyü kapat
    $navLinks.on('click', function () {
        $header.removeClass('show');          // mobil
        $body.addClass('menu-collapsed');     // desktop: kapalı hale getir
        $toggler.removeClass('is-open');      // butonu da kapalı moda al
    });

    // 3) Header ve butonun dışına tıklayınca menüyü kapat
    $(document).on('click', function (e) {
        var $target = $(e.target);

        if (
            !$target.closest('.tm-header').length &&
            !$target.closest('.navbar-toggler').length
        ) {
            $header.removeClass('show');      // mobil
            $body.addClass('menu-collapsed'); // desktop
            $toggler.removeClass('is-open');  // buton kapalı
        }
    });
});
