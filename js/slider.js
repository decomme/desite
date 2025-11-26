// dE_Stun – Slider kontrolü (FINAL)
$(function () {
    var $slider = $('#slider');
    if (!$slider.length) return; // Slider yoksa hiç çalışmasın

    var $track = $slider.find('.slides');   // Hepsini taşıyan şerit
    if (!$track.length) return;

    var $items = $track.find('.slider');    // Her bir slide
    var $dots  = $slider.find('.switch li');// Alttaki yuvarlaklar
    var $prev  = $slider.find('.slider-prev');
    var $next  = $slider.find('.slider-next');

    var slideCount = $items.length;
    if (!slideCount) return; // Hiç slide yoksa çık

    var current    = 0;
    var autoTimer  = null;
    var AUTO_DELAY = 8000; // 8 saniye

    // Güvenlik: Eski CSS animasyonu kalmışsa patlatmasın
    $track.css({
        animation: 'none',
        '-webkit-animation': 'none',
        '-moz-animation': 'none'
    });

    // Belirli slide'a git
    function goToSlide(index, fromAuto) {
        if (index < 0) {
            index = slideCount - 1;
        }
        if (index >= slideCount) {
            index = 0;
        }

        current = index;

        // Şeridi kaydır (margin-left ile)
        var offset = -100 * current; // 0, -100, -200, -300...
        $track.css('margin-left', offset + '%');

        // Noktalarda active sınıfı
        if ($dots.length) {
            $dots.removeClass('active')
                 .eq(current).addClass('active');
        }

        // Kullanıcı tıkladıysa autoplay’i resetle
        if (!fromAuto) {
            restartAuto();
        }
    }

    function nextSlide(fromAuto) {
        goToSlide(current + 1, fromAuto);
    }

    function prevSlide(fromAuto) {
        goToSlide(current - 1, fromAuto);
    }

    // Otomatik kaydırma
    function startAuto() {
        if (autoTimer || slideCount < 2) return; // 1 slaytta gerek yok
        autoTimer = setInterval(function () {
            nextSlide(true); // fromAuto = true
        }, AUTO_DELAY);
    }

    function stopAuto() {
        if (!autoTimer) return;
        clearInterval(autoTimer);
        autoTimer = null;
    }

    function restartAuto() {
        stopAuto();
        startAuto();
    }

    // Noktalara tıklama
    $dots.each(function (i) {
        $(this)
            .css('cursor', 'pointer')
            .on('click', function () {
                goToSlide(i, false);
            });
    });

    // Oklar
    if ($prev.length) {
        $prev.on('click', function (e) {
            e.preventDefault();
            prevSlide(false);
        });
    }

    if ($next.length) {
        $next.on('click', function (e) {
            e.preventDefault();
            nextSlide(false);
        });
    }

    // Hover sırasında autoplay durdur (istersen)
    $slider
        .on('mouseenter', function () {
            stopAuto();
        })
        .on('mouseleave', function () {
            restartAuto();
        });

    // İlk slide'a konumla ve başlat
    goToSlide(0, true);
    startAuto();
});
