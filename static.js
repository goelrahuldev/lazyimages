function isOnScreen(pic) {
	var that = pic;
    var win = $(window);

    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = $(that).offset();
    bounds.right = bounds.left + $(that).outerWidth();
    bounds.bottom = bounds.top + $(that).outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right ||
		viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

var lazyLoad;

$(document).ready(function() {
	lazyLoad = new LazyLoad();
	var pics = document.getElementsByTagName('picture');
	var pic;
	for (x in pics) {
		pic = pics[x];
		var elem = document.getElementsByTagName('img');
		if (!isOnScreen(pic) || (isOnScreen(pic) && $(elem).hasClass('loading'))) {
			$(elem).addClass('blur-up');
		}
	}
});

$(window).on('resize', function(e) {
	var elem = document.getElementsByTagName('img');
	$(elem).removeClass('loaded');
	setTimeout(function() {
		$(elem).addClass('loaded');
	}, 3500);
});
