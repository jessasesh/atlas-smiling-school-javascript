$(document).ready(function () {
    const $quotesCarousel = $('#quotes-carousel');
    const $loader = $('#loader');

    $loader.show();

    //Ajax request for quotes
    $.ajax({
        url: 'https://smileschool-api.hbtn.info/quotes',
        method: 'GET',
        success: function (response) {
            // Checking responsee from API
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

                //Slick carousel properties
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
});


$(document).ready(function () {
    function loadAndDisplayTutorials() {
        //Ajax request for tutorial videos
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

                data.forEach(function (item) {
                    const $tutorialCard = $('<div>').addClass('card mx-3').append(
                        $('<img>').addClass('card-img-top').attr('src', item.thumb_url),
                        $('<div>').addClass('card-img-overlay text-center').append(
                            $('<img>').addClass('mx-auto my-auto play-overlay').attr('src', '/images/play.png').attr('width', '55px')
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
                    nextArrow: '<img src="images/arrow_black_right.png" alt="Quote Next" class="slick-next">'
                });

            },
            error: function () {
                console.error("Failed to load.");
                alert("Error loading.");
                $("#loader-popular").hide();
            }
        });
    }

    loadAndDisplayTutorials();
});

