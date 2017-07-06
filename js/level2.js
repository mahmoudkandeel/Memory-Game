$(document).ready(function() {
    cat = sessionStorage.getItem('cat');
    array = ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6", "7", "7", "8", "8", "9", "9", "10", "10", "11", "11", "12", "12", "13", "13", "14", "14", "15", "15"];
    cards = shuffle(array);
    gameCardsQTY = array.length / 2;
    swal({
        allowEscapeKey: false,
        allowOutsideClick: false,
        title: 'You have only 240S to complete Game',
        type: 'success',
        confirmButtonColor: '#9BCB3C',
        confirmButtonText: 'Start'
    }).then(function(isConfirm) {
        if (isConfirm) {
            var myVar = setInterval(myTimer, 1000);
            distance = 240;

            function myTimer() {
                document.getElementById("timer").innerHTML = distance;
                distance--;
                if (distance < 0) {
                    clearInterval(myVar);
                    document.getElementById("timer").innerHTML = "EXPIRED";
                    swal({
                        title: "Timeout!",
                        text: "Sorry you lost!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Try again",
                        cancelButtonText: "No, cancel",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    }.then(function(isConfirm) {
                        if (isConfirm) {
                            window.location.href = "level2.html"; // redirect to index page forplaying agin
                        } else {
                            swal("Cancelled", "Cancelled", "error");
                        }
                    }));
                }
            }
        }
    })

    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    var _html = '';
    tmp = []; //temp var contains only two items
    var result = 0;
    i = 1; //number of clicks
    match = 0;
    $.each(array, function(k, v) {
        _html += '<li class="selected"><img src="images/' + cat + '/' + v + '.jpg"></img><span class="overlay"></span></li>';
    });
    $('#memory-container').html(_html);
    setInterval('$("li").removeClass("selected")', 6000);

    $('#memory-container li').on('click', function() {
        if (!$(this).hasClass('selected') && !$(this).hasClass('ok')) {
            if (i > 2) {
                $('.selected').removeClass('selected');
                i = 1;
                tmp = [];
            }
            $(this).addClass('selected');
            item = $(this).children('img').attr('src');
            tmp.push(item);
            if (tmp.length == 2 && tmp[0] == tmp[1]) {
                $('.selected').addClass('ok');
                match++;
                $('h1 span').html(++result);
            }
            i++;
        }
        // End Game if match all cards
        if (gameCardsQTY === match) {
            swal({
                allowEscapeKey: false,
                allowOutsideClick: false,
                title: 'Congratulations! You Won!',
                type: 'success',
                showCancelButton: true,
                confirmButtonColor: '#9BCB3C',
                confirmButtonText: 'Play again!'
            }).then(function(isConfirm) {
                if (isConfirm) {
                    window.location.href = "index.html"; // redirect to index page forplaying agin
                }
            })
        }
    });
});
