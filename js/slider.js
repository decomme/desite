// dE_Stun – Slider kontrolü
$(function () {
    var $slider = $('#slider');
    var $track  = $slider.find('.slides');   // hepsini taşıyan şerit
    var $items  = $track.find('.slider');    // her bir slide
    var $dots   = $slider.find('.switch li');// alttaki yuvarlaklar

    var slideCount = $items.length;
    var current    = 0;

    // Belirli slide'a git
    function goToSlide(index) {
        if (index < 0) {
            index = slideCount - 1;
        }
        if (index >= slideCount) {
            index = 0;
        }

        current = index;

        // Şeridi kaydır
        var offset = -100 * current; // 0, -100, -200, -300
        $track.css('margin-left', offset + '%');

        // Noktalarda active sınıfı
        $dots.removeClass('active')
             .eq(current).addClass('active');
    }

    // Noktalara tıklama
    $dots.each(function (i) {
        $(this).on('click', function () {
            goToSlide(i);
        });
    });

    // Oklar
    $('.slider-prev').on('click', function () {
        goToSlide(current - 1);
    });

    $('.slider-next').on('click', function () {
        goToSlide(current + 1);
    });

    // Opsiyonel: otomatik kaydırma (istemiyorsan kapat)
    setInterval(function () {
        goToSlide(current + 1);
    }, 8000); // 8 saniyede bir

    // İlk slide
    goToSlide(0);
});
