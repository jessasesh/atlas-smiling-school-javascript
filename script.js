$(document).ready(function () {
    // Quotes Section
    const $quotesCarousel = $('#quotes-carousel');
    const $loader = $('#loader');

    $loader.show();

    $.ajax({
        url: 'https://smileschool-api.hbtn.info/quotes',
        method: 'GET',
        success: function (response) {
            console.log('API Response - Quotes:', response);

            $loader.hide();
            $quotesCarousel.empty();

            if (Array.isArray(response)) {
                response.forEach(quote => {
                    const $quoteItem = $('<div>').addClass('quoteItem').append(
                        $('<div>').addClass('row align-items-center').append(
                            $('<div>').addClass('col-12 col-lg-3').append(
                                $('<img>').addClass('d-block mx-auto').attr('src', quote.pic_url)
                            )
                        ).append(
                            $('<div>').addClass('col-12 col-lg-9').append(
                                $('<div>').addClass('quoteText').append(
                                    $('<p>').addClass('text-white').html(`"${quote.text}"`),
                                    $('<h4>').addClass('text-white').text(quote.name),
                                    $('<span>').addClass('text-white').text(quote.title)
                                )
                            )
                        )
                    );
                    $quotesCarousel.append($quoteItem);
                });

                $quotesCarousel.show();

                $quotesCarousel.slick({
                    dots: true,
                    infinite: true,
                    speed: 300,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    prevArrow: '<img src="images/arrow_white_left.png" alt="Quote Previous" class="slick-prev">',
                    nextArrow: '<img src="images/arrow_white_right.png" alt="Quote Next" class="slick-next">'
                });
            }
        },
    });

    // Popular Tutorials Section
    function loadAndDisplayTutorials() {
        $.ajax({
            url: "https://smileschool-api.hbtn.info/popular-tutorials",
            method: "GET",
            beforeSend: function () {
                $("#loader-popular").show();
            },
            success: function (response) {
                console.log('API Response - Tutorial:', response);

                $("#loader-popular").hide();
                const $carouselContainer = $("#popular-carousel");
                $carouselContainer.empty();

                response.forEach(function (item) {
                    const $tutorialCard = $('<div>').addClass('card mx-3').append(
                        $('<img>').addClass('card-img-top').attr('src', item.thumb_url),
                        $('<div>').addClass('card-img-overlay text-center').append(
                            $('<img>').addClass('mx-auto my-auto play-overlay').attr('src', 'images/play.png').attr('width', '55px')
                        ),
                        $('<div>').addClass('card-main').append(
                            $('<h5>').addClass('card-title').text(item.title),
                            $('<p>').addClass('card-text').text(item['sub-title']),
                            $('<div>').addClass('author-info d-flex align-items-center').append(
                                $('<img>').addClass('rounded-circle').attr('src', item.author_pic_url).attr('width', '25px'),
                                $('<h6>').addClass('popular-author').text(item.author)
                            ),
                            $('<div>').addClass('rating-info d-flex justify-content-between').append(
                                $('<div>').addClass('rating d-flex')
                            )
                        )
                    );
                    $carouselContainer.append($tutorialCard);
                });

                $carouselContainer.removeClass('d-none');

                $carouselContainer.slick({
                    dots: true,
                    infinite: true,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    arrows: true,
                    prevArrow: '<img src="images/arrow_black_left.png" alt="Quote Previous" class="slick-prev">',
                    nextArrow: '<img src="images/arrow_black_right.png" alt="Quote Next" class="slick-next">',
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1,
                                infinite: true,
                                dots: true
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });

            },
            error: function () {
                console.error("Failed to load tutorials.");
                alert("Error loading tutorials.");
                $("#loader-popular").hide();
            }
        });
    }

    loadAndDisplayTutorials();
});

// Latest Videos
$(document).ready(function () {
    const loader = $('#loader-latest-videos');
    const carousel = $('#latest-videos-carousel');

    loader.show();
    $.ajax({
        url: 'https://smileschool-api.hbtn.info/latest-videos',
        method: 'GET',
        success: function (data) {
            loader.hide();
            data.forEach((video, index) => {
                const activeClass = index === 0 ? 'active' : '';
                const videoCard = `
                    <div class="carousel-item ${activeClass}">
                        <div class="card">
                            <img src="${video.thumb_url}" class="card-img-top" alt="${video.title}">
                            <div class="card-img-overlay text-center">
                                <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title font-weight-bold">${video.title}</h5>
                                <p class="card-text text-muted">${video['sub-title']}</p>
                                <div class="creator d-flex align-items-center">
                                    <img src="${video.author_pic_url}" alt="${video.author}" width="30px" class="rounded-circle">
                                    <h6 class="pl-3 m-0 main-color">${video.author}</h6>
                                </div>
                                <div class="info pt-3 d-flex justify-content-between">
                                    <div class="rating">
                                        ${'<img src="images/star_on.png" alt="star on" width="15px"/>'.repeat(video.star)}
                                        ${'<img src="images/star_off.png" alt="star off" width="15px"/>'.repeat(5 - video.star)}
                                    </div>
                                    <span class="main-color">${video.duration}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                carousel.append(videoCard);
            });

            $('#carouselExampleControls3').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                prevArrow: $('.slick-prev'),
                nextArrow: $('.slick-next'),
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    }
                ]
            });
        },
        error: function () {
            loader.hide();
            alert('Failed to load latest videos. Please try again later.');
        }
    });
});


$(document).ready(function () {
    // Pricing Page
    const $pricingQuotesCarousel = $('#quotes-carousel');
    const $pricingCarousel = $('#carouselExampleControls');
    const $pricingLoader = $('#loader');

    $pricingLoader.show();

    $.ajax({
        url: 'https://smileschool-api.hbtn.info/quotes',
        method: 'GET',
        success: function (response) {
            console.log('API Response - Quotes (Pricing Page):', response);

            $pricingLoader.hide();
            $pricingQuotesCarousel.empty();

            if (Array.isArray(response)) {
                response.forEach((quote, index) => {
                    const activeClass = index === 0 ? 'active' : '';
                    const $quoteItem = $('<div>').addClass(`carousel-item ${activeClass}`).append(
                        $('<div>').addClass('row mx-auto align-items-center').append(
                            $('<div>').addClass('col-12 col-sm-2 col-lg-2 offset-lg-1 text-center').append(
                                $('<img>').addClass('d-block align-self-center').attr('src', quote.pic_url).attr('alt', quote.name)
                            )
                        ).append(
                            $('<div>').addClass('col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0').append(
                                $('<div>').addClass('quote-text').append(
                                    $('<p>').addClass('text-white').html(`« ${quote.text}`),
                                    $('<h4>').addClass('text-white font-weight-bold').text(quote.name),
                                    $('<span>').addClass('text-white').text(quote.title)
                                )
                            )
                        )
                    );
                    $pricingQuotesCarousel.append($quoteItem);
                });

                $pricingCarousel.show();
            }
        },
        error: function () {
            $pricingLoader.hide();
            alert('Failed to load quotes.');
        }
    });
});
