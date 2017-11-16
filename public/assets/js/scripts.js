var channelName = 'betesdanocc';
$(document).ready(function() {
    $.get(
        "https://www.googleapis.com/youtube/v3/channels", {
            part: 'contentDetails',
            forUsername: channelName,
            key: 'AIzaSyD7nUMpyJsJHJDBq7z8lC9aD3FX6dNJ2gs'
        },
        function(data) {
            $.each(data.items, function(i, item) {
                console.log(item);
                pid = item.contentDetails.relatedPlaylists.uploads;
                getVids(pid);
            })
        }
    );

    function getVids(pid) {
        $.get(
            "https://www.googleapis.com/youtube/v3/playlistItems", {
                part: 'snippet',
                maxResults: 20,
                playlistId: pid,
                key: 'AIzaSyD7nUMpyJsJHJDBq7z8lC9aD3FX6dNJ2gs'
            },


            function(data) {

                var output;

                $.each(data.items, function(i, item) {
                    var date = new Date(item.snippet.publishedAt)
                    console.log(item);
                    videTitle = item.snippet.title;
                    videoId = item.snippet.resourceId.videoId;
                    description = item.snippet.description;
                    output = '<div class="col-md-6"><iframe frameborder="0" width="100%" height="300"  src=\"//www.youtube.com/embed/' + videoId + '\" allowfullscreen></iframe><h4 class="header">' + videTitle + '</h4><p>' + description + '</p><p>Fecha de publicacion: ' + date.toDateString() + '</p></div>';
                    //Append to results listStyleType
                    $('#results').append(output);
                })
            }
        );
    }
})

// 3 videos
var channelName = 'betesdanocc';
$(document).ready(function() {
    $.get(
        "https://www.googleapis.com/youtube/v3/channels", {
            part: 'contentDetails',
            forUsername: channelName,
            key: 'AIzaSyD7nUMpyJsJHJDBq7z8lC9aD3FX6dNJ2gs'
        },
        function(data) {
            $.each(data.items, function(i, item) {
                console.log(item);
                pid = item.contentDetails.relatedPlaylists.uploads;
                getVids(pid);
            })
        }
    );

    function getVids(pid) {
        $.get(
            "https://www.googleapis.com/youtube/v3/playlistItems", {
                part: 'snippet',
                maxResults: 3,
                playlistId: pid,
                key: 'AIzaSyD7nUMpyJsJHJDBq7z8lC9aD3FX6dNJ2gs'
            },


            function(data) {

                var output;

                $.each(data.items, function(i, item) {
                    var date = new Date(item.snippet.publishedAt)
                    console.log(item);
                    videTitle = item.snippet.title;
                    videoId = item.snippet.resourceId.videoId;
                    description = item.snippet.description;
                    output = '<div class="col-md-6 col-sm-12"><iframe frameborder="0" width="90%" height="250"  src=\"//www.youtube.com/embed/' + videoId + '\" allowfullscreen></iframe><h4 class="header">' + videTitle + '</h4><p>' + description + '</p><p>Fecha de publicacion: ' + date.toDateString() + '</p></div>';
                    //Append to results listStyleType
                    $('#latest').append(output);
                })
            }
        );
    }
})


function updateTimer(deadline) {
    var time = deadline - new Date();
    return {
        'days': Math.floor(time / (1000 * 60 * 60 * 24)),
        'hours': Math.floor((time / (1000 * 60 * 60)) % 24),
        'minutes': Math.floor((time / 1000 / 60) % 60),
        'seconds': Math.floor((time / 1000) % 60),
        'total': time
    };
}


function animateClock(span) {
    span.className = "turn";
    setTimeout(function() {
        span.className = "";
    }, 700);
}

function startTimer(id, deadline) {
    var timerInterval = setInterval(function() {
        var clock = document.getElementById(id);
        var timer = updateTimer(deadline);

        clock.innerHTML = '<span>' + timer.days + '</span>' +
            '<span>' + timer.hours + '</span>' +
            '<span>' + timer.minutes + '</span>' +
            '<span>' + timer.seconds + '</span>';

        //animations
        var spans = clock.getElementsByTagName("span");
        animateClock(spans[3]);
        if (timer.seconds == 59) animateClock(spans[2]);
        if (timer.minutes == 59 && timer.seconds == 59) animateClock(spans[1]);
        if (timer.hours == 23 && timer.minutes == 59 && timer.seconds == 59) animateClock(spans[0]);

        //check for end of timer
        if (timer.total < 1) {
            clearInterval(timerInterval);
            clock.innerHTML = '<span>0</span><span>0</span><span>0</span><span>0</span>';
        }


    }, 1000);
}


window.onload = function() {
    var deadline = new Date("November 19, 2017 13:00:00");
    startTimer("clock", deadline);
};