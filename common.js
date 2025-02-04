$(document).ready(function() {
    // 실행문
    Application.MainGnb.init()
    Application.SelectBoxPath.init()

    // object-fit : IE 대응
    if ($(document).find('.object-fit').length > 0) {
        var objectFitImg = new Application.ObjectFit()
        objectFitImg.init('.object-fit')
    }

    // main visual
    var myVisualSwiper = new Swiper('.main-visual-swiper', {
        loop: false,
        slidePerView: 1,
        autoplay: {
            delay: 7000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-visual-pagination',
            clickable: true,
            renderBullet: function(index, className) {
                return '<span class="' + className + '">' + (index + 1) + '</span>'
            },
        },
        watchOverflow: true,
    })

    // notice
    $('.mini-board-tab').on('click', function() {
        $(this).parent().siblings().removeClass('active')
        $(this).parent().addClass('active')
    })

    // gallery
    var myNewsSwiper = new Swiper('.main-news-swiper', {
        loop: false,
        spaceBetween: 20,
        navigation: {
            prevEl: '.swiper-news-prev',
            nextEl: '.swiper-news-next',
        },
        breakpoints: {
            1024: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 2.2,
            },
            480: {
                slidesPerView: 1.3,
                spaceBetween: 10,
            },
            320: {
                slidesPerView: 1.2,
            },
        },
    })
}) // end of ready

var Application = new Object()

//------------------------------------------------------
// Main Gnb
//------------------------------------------------------
Application.MainGnb = (function() {
    var self
    return {
        init: function() {
            self = this

            $('.gnb-ul > li').each(function() {
                $(this).on('mouseenter focusin', function() {
                    if ($(this).children().is('.sub-mn')) {
                        $('.sub-mn, .gnb-bg').hide()
                        $(this).find('.sub-mn').show()
                        $('.gnb-bg').show()
                    } else {
                        $('.sub-mn, .gnb-bg').hide()
                    }
                })
            })

            // 3뎁스 메뉴 존재 시 클래스 붙임
            $('.sub-mn > li').each(function() {
                if ($(this).has('.sub-mn02').length > 0) {
                    $(this).addClass('has-depth03 open')
                    $(this).children('a').attr({
                        href: '#no-menu'
                    })
                }
                if ($(this).find('.sub-mn02 li a').hasClass('active')) {
                    $(this).removeClass('open').addClass('close')
                    $(this).find('.sub-mn02').slideDown()
                }
            })

            // 3뎁스 메뉴 열기, 닫기
            $(document).on('mouseenter focusin', '.has-depth03 > a', function() {
                $(this).parent('li').siblings().removeClass('close').addClass('open')
                $(this).parent('li').removeClass('open').addClass('close')
                $(this).parent('li').siblings().find('.sub-mn02').hide()
                $(this).next('.sub-mn02').show()
            })
            // 3뎁스 메뉴 열기, 닫기
            $(document).on('mouseleave', '.sub-mn', function() {
                $(this).parent('li').removeClass('close').addClass('open')
                $(this).next('.sub-mn02').hide()
            })

            // 개행 처리
            $('.sub-mn02 > li').each(function() {
                var subMn02Str = $(this).find('a').text()
                subMn02Str = subMn02Str.replace('\\', '<br>')

                $(this)
                    .find('a')
                    .html('<span>' + subMn02Str + '</span>')
            })

            $('.bottom-header-wrap').mouseleave(function() {
                $('.sub-mn, .gnb-bg').hide()
                $(this).find('.sub-mn02').slideUp()
                $(this).find('.has-depth03.close').removeClass('close').addClass('open')
            })
        },
    }
})()

//-----------------------------------------------------------------------------------------
//select box(path)
//-----------------------------------------------------------------------------------------
Application.SelectBoxPath = (function() {
    var self
    var $path
    return {
        init: function() {
            self = this

            $path = $('.path-depth-wrap > ul > li')
            $path.each(function() {
                var $thisBox = $(this)
                $thisBox.find('.path-selected').click(self.onClick)

                $(document).click(function(e) {
                    if ($thisBox.has(e.target).length === 0) {
                        $('.path-selected').parent().removeClass('active')
                        $('.path-depth').slideUp(200)
                    }
                })

                $(window).resize(function() {
                    $('.path-selected').parent().removeClass('active')
                    $('.path-depth').slideUp(200)
                })
            })
        },
        onClick: function() {
            $(this).parents('li').find('.path-depth').slideToggle(200)
            $(this).parents('li').toggleClass('active')

            return false
        },
    }
})()

//------------------------------------------------------
//object-fit(IE)
//------------------------------------------------------
Application.ObjectFit = function() {
    var self
    return {
        init: function(param) {
            if ('objectFit' in document.documentElement.style === false) {
                var container = document.querySelectorAll(param)
                for (var i = 0; i < container.length; i++) {
                    var imageSource = container[i].querySelector('img').src
                    container[i].querySelector('img').style.display = 'none'
                    container[i].style.backgroundSize = 'cover'
                    container[i].style.backgroundImage = 'url(' + imageSource + ')'
                    container[i].style.backgroundPosition = '50% 50%'
                }
            }
        },
    }
}