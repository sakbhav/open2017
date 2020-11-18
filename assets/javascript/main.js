$('.hidden-code').click(function(e) {
    e.preventDefault();
    $(this).children('.gist').slideToggle();
});

var originalText;
$('.example-grid').children().hover(
    function() {
        originalText = $(this).text();
        $(this).html($(this).width()+'px');
    },
    function() {
        $(this).html(originalText);
    }
);

$.getJSON('assets/json/guests.json').then(function(data) {
    data.forEach(function(guest) {
        socialHandle = guest.twitterHandle || guest.githubHandle
        socialURL = guest.twitterHandle ? ("https://twitter.com/" + socialHandle) : ("https://github.com/" + socialHandle)

        $("#guest-list").append(
            `
                <div class="four columns alpha">
                    <img class="profile-image" src="//imgur.com/${guest.imageUrl}">
                    <div class="palette-pad">
                        <h4>${guest.name}</h4>
                        <a href="${socialURL}" target="_blank">
                            <h5>@${socialHandle}</h5>
                        </a>
                        <p>${guest.bio}</p>
                    </div>
                </div>
            `
        )
    })
});

// responsive 16x9 iframe - restricted by parent's width
var resizeIframe = function() {
    $('.responsive-iframe iframe').each(function(index, iframe) {
        var parentWidth = $(iframe).parent().width();
        $(iframe).width(parentWidth);
        $(iframe).height(parentWidth / 16 * 9);
    });
};
$(window).on('resize', resizeIframe);
resizeIframe();

// Twitter timeline
!function(d,s,id){
    var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
    if(!d.getElementById(id)){
        js=d.createElement(s);js.id=id;
        js.src=p+"://platform.twitter.com/widgets.js";
        js.setAttribute('onload', "twttr.events.bind('rendered',function(e) {responsiveTwitterWidget()});");
        fjs.parentNode.insertBefore(js,fjs);
    }
}(document,"script","twitter-wjs");

function responsiveTwitterWidget(){
    var widget = $("#twitter-widget-0");
    var frame_style = widget.attr('style');
    widget.attr('style', frame_style + ' max-width:none !important; width:100%');
    if(widget) {
        var head = widget.contents().find("head")
        if (head.length) {
            head.append('<style>.timeline { max-width: 100% !important; width: 100% !important; } .timeline .stream { max-width: none !important; width: 100% !important; }</style>');
        }
        widget.append($('<div class=timeline>'));
    }
}

//sticky navigation
+(function() {

    // Selectors
    var sidebar = document.querySelector('.sidebar');
    var content = document.querySelector('.content');

    // Constants
    var SIDEBAR_DISTANCE_TOP = sidebar.getBoundingClientRect().top + document.body.scrollTop - 50;
    var WIDTH_BRAKE_POINT = 767;

    // Global varialbes
    var distanceTop = document.body.scrollTop;
    var browserWidth = window.innerWidth || document.body.clientWidth;

    window.addEventListener('resize', function(){
        browserWidth = window.innerWidth || document.body.clientWidth;
        doStick();
    });

    window.addEventListener("scroll", function() {
        distanceTop = document.body.scrollTop;
        doStick();
    });

    function doStick() {
        if (isStickable()) {
            SIDEBAR_DISTANCE_TOP < distanceTop ? stick() : unStick();
        } else {
            unStick();
        }
    }

    function stick() {
        sidebar.classList.add('stick');
        content.classList.add('offset-by-four');
    }

    function unStick() {
        sidebar.classList.remove('stick')
        content.classList.remove('offset-by-four')
        console.log("test2")
    }

    function isStickable() {
        return browserWidth > WIDTH_BRAKE_POINT;
        console.log("test");
    }

})()