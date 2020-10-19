(function ($, elements, OUTER_CLICK) {
    function check(event) {
        for (var i = 0, l = elements.length, target = event.target, el; i < l; i++) {
            el = elements[i];
            if (el !== target && !(el.contains ? el.contains(target) : el.compareDocumentPosition ? el.compareDocumentPosition(target) & 16 : 1)) {
                $.event.trigger(OUTER_CLICK, event, el);
            }
        }
    }

    $.event.special[OUTER_CLICK] = {
        setup: function () {
            var i = elements.length;
            if (!i) {
                $.event.add(document, 'click', check);
            }
            if ($.inArray(this, elements) < 0) {
                elements[i] = this;
            }
        },
        teardown: function () {
            var i = $.inArray(this, elements);
            if (i >= 0) {
                elements.splice(i, 1);
                if (!elements.length) {
                    jQuery(this).unbind('click', check);
                }
            }
        }
    };
    $.fn[OUTER_CLICK] = function (fn) {
        return fn ? this.bind(OUTER_CLICK, fn) : this.trigger(OUTER_CLICK);
    };
})(jQuery, [], 'outerClick');

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}

$(document).ready(function () {
    if ($('#banner-slider').length > 0) {
        $('#banner-slider').lightSlider({
            item: 1,
            slideMargin: 0,
            pager: false,
            speed: 650,
            auto: true,
            pause: 2000,
            loop: true
        });
    }

    if ($('#js-site-recommend-slider').length > 0) {
        $('#js-site-recommend-slider').lightSlider({
            slideMargin: 46,
            loop: false,
            item: 5,
            pager: false,
            speed: 650,
            pause: 3000,
            auto: true,
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        item: 4
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        item: 3
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        item: 2
                    }
                },
                {
                    breakpoint: 479,
                    settings: {
                        item: 1
                    }
                }
            ]
        });
    }

    if ($('#js-site-about-major').length > 0) {
        var swiper = new Swiper('#js-site-about-major', {
            slidesPerColumn: 2,
            slidesPerView: 2,
            slidesPerGroup: 2,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            spaceBetween: 32,
            speed: 500,
            breakpoints: {
                480: {
                    slidesPerView: 1,
                    slidesPerColumn: 1
                },
            }
        });
    }

    $('.scroll-country').each(function () {
        new PerfectScrollbar($(this)[0]);
    });

    new WOW().init();
    const targetElement = document.querySelector("body");

    $(".js-keep").outerClick(function () {
        $(this).removeClass('open');
        bodyScrollLock.enableBodyScroll(targetElement);
    });

    $(".js-open").off('click').on('click', function () {
        $(this).parent().addClass('open');
        bodyScrollLock.disableBodyScroll(targetElement);
    });

    $('.js-search-input').focus(function () {
        $(this).parent().addClass('open');
    });
    $('.site-search__popular-dropdown').outerClick(function () {
        $(this).removeClass('open');
    });
    $('.js-popular-text').on('click', function () {
        $('.js-search-input').val($(this).text().trim());
    });
    if ($('#detail-page').length > 0) {
        $('#imageGallery').lightSlider({
            gallery: true,
            item: 1,
            loop: true,
            thumbItem: 5,
            slideMargin: 0,
            onSliderLoad: function (ele) {
                ele.lightGallery({
                    selector: '#imageGallery .lslide',
                    pager: true
                });

                const totalSlide = ele.getTotalSlideCount();
                let currentSlide = ele.getCurrentSlideCount();

                $('.js-abc').append($('<span class="js-slide-number">' + currentSlide + '/' + totalSlide + '<i class="fa fa-camera-retro ml-h1" aria-hidden="true"></i>' + '</span>'));
            },
            onAfterSlide: function (ele) {
                const totalSlide = ele.getTotalSlideCount();
                let currentSlide = ele.getCurrentSlideCount();

                $('.js-slide-number').replaceWith($('<span class="js-slide-number">' + currentSlide + '/' + totalSlide + '<i class="fa fa-camera-retro ml-h1" aria-hidden="true"></i>' + '</span>'));
            },
            responsive: [
                {
                    breakpoint: 480,
                    settings: {
                        item: 1,
                        thumbItem: 3,
                    }
                }
            ]
        });

        $(document).on('click', '.plus', function () {
            $('.js-input-number').val(parseInt($('.js-input-number').val()) + 1);
        });
        $(document).on('click', '.minus', function () {
            $('.js-input-number').val(parseInt($('.js-input-number').val()) - 1);
            if ($('.js-input-number').val() == 0) {
                $('.js-input-number').val(1);
            }
        });
    }

    if ($('#almostSlider').length > 0) {
        $('#almostSlider').lightSlider({
            loop: true,
            item: 4,
            pager: false,
            slideMargin: 32,
            speed: 650,
            easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
            auto: true,
            pause: 3000,
            responsive: [
                {
                    breakpoint: 769,
                    settings: {
                        item: 3
                    }
                },
                {
                    breakpoint: 639,
                    settings: {
                        item: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        item: 1
                    }
                }
            ]
        });
    }
    $(".js-categories").outerClick(function () {
        $(this).removeClass('open');
    });

    $('.js-dropdown-toggle').on('click', function () {
        $(this).parent().toggleClass('open');
    });

    if ($(window).width() < 992) {
        $('.js-toggle-categories').on('click', function () {
            $(this).closest('.dropdown').find('.dropdown-menu:eq(0)').collapse('toggle');
        });
    }

    $('.js-showpass').on('click', function () {
        $(this).siblings('.password').prop('type', 'text');
        $(this).parents('form').find('.js-showpass-re').prop('type', 'text');
    });

    $('.js-create-account').on('click', function () {
        $('#signup-tab').tab('show');
    });
    $('.js-sign-in').on('click', function () {
        $('#signin-tab').tab('show');
    });

    $('#site-news-slider').lightSlider({
        item: 1,
        slideMargin: 16,
        pager: false,
        speed: 650,
        auto: true,
        pause: 2000,
        loop: true
    });
});