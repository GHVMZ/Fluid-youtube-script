
//  __     __         _         _
//  \ \   / /        | |       | |
//   \ \_/ /__  _   _| |_ _   _| |__   ___
//    \   / _ \| | | | __| | | | '_ \ / _ \
//     | | (_) | |_| | |_| |_| | |_) |  __/
//     |_|\___/ \__,_|\__|\__,_|_.__/ \___|

// Full width, responsive Youtube video as background
// Created by John Ghavamzadeh 2017-04-28

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('ytplayer', {
        playerVars: {
            controls: 0,
            showinfo: 0,
            rel: 0,
            playlist: '<?= $youtubeId ?>',
            loop: 1
        },
        videoId: '<?= $youtubeId ?>',
        events: {
            'onReady': onPlayerReady
        },
        onStateChange: function(e){
            var id = '<?= $youtubeId ?>';

            if(e.data === YT.PlayerState.ENDED){
                player.loadVideoById(id);
            }
        }
    });
}

function onPlayerReady() {
    player.playVideo();
    player.mute();
}

(function($){
    $(function(){

        $(window).load(function(){

            // If window is less than 700px, stop video else play video.
            if ($(window).width() < 700) {
                player.stopVideo();
            } else{
                player.playVideo();
            }

            // On button click remove thumbnail, button and play video
            $(".bg-video-button").click(function(){
                $(".youtube-thumbnail").fadeToggle();
                $(".bg-video-button").addClass("remove-button");
                player.playVideo();
            });
        });

        $(document).ready(function(){
            // Finds iframe, extract youtube ID for thumbnail.
            // Appends thumbnail + button on div.
            var iframe           = $('iframe:first');
            var iframe_src       = iframe.attr('src');
            var youtube_video_id = iframe_src.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();

            if (youtube_video_id.length == 11) {
                var video_thumbnail = $('<div class="youtube-thumbnail" style="background-image: url(//img.youtube.com/vi/'+youtube_video_id+'/maxresdefault.jpg);"></div>');
                $('#videobg').append(video_thumbnail).append($('<div class="bg-video-button"></div>'));
            }
        });

        $(document).ready(function(){
            sizeTheVideo();
            $(window).resize(function(){
                sizeTheVideo();
            });
        });

        function sizeTheVideo(){
            // - 1.78 is the aspect ratio of the video
            // - This will work if your video is 1920 x 1080
            // - To find this value divide the video's native width by the height eg 1920/1080 = 1.78
            var aspectRatio = 1.78;

            var video = $('#videobg iframe');
            var videoHeight = video.outerHeight();
            var newWidth = videoHeight*aspectRatio;
            var halfNewWidth = newWidth/2;

            //Define the new width and centrally align the iframe
            video.css({"width":newWidth+"px","left":"50%","margin-left":"-"+halfNewWidth+"px"});
        }

    });
})(jQuery);
