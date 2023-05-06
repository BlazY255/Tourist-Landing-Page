(function ($) {

    var vph = 0;
    function getViewportDimensions() {
        vph = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    }
    getViewportDimensions();

    $(window).on('resize orientationChanged', function () {
        getViewportDimensions();
    });

    $.fn.inViewport = function (whenInView, whenNotInView) {
        return this.each(function () {
            var el = $(this),
                inviewalreadycalled = false,
                notinviewalreadycalled = false;

            $(window).on('resize orientationChanged scroll', function () {
                checkInView();
            });
            function checkInView() {
                var rect = el[0].getBoundingClientRect(),
                    t = rect.top,
                    b = rect.bottom;
                if (t < vph && b > 0) {
                    if (!inviewalreadycalled) {
                        whenInView.call(el);
                        inviewalreadycalled = true;
                        notinviewalreadycalled = false;
                    }
                } else {
                    if (!notinviewalreadycalled) {
                        whenNotInView.call(el);
                        notinviewalreadycalled = true;
                        inviewalreadycalled = false;
                    }
                }
            }
            checkInView();
        });
    }
}(jQuery));

$('.discover_icon').inViewport(
    function () { $(this).addClass("pop"); },
    function () { $(this).removeClass("pop"); }
);

let inntervals = [];
let index = 0;

let targets = [];
targetIndex = 0;

$('.discover_count').inViewport(
    function () {
        let target = parseInt($(this).html()) - 1;
        let element = $(this);
        let count = 0;
        let myIndex = index;

        targets.push(target);

        let newInterval = setInterval(function () {
            if (count == target) clearInterval(inntervals[myIndex]);

            if (target - count < 111 || target < 1000) {
                count++;
            }
            else {
                target < 3000 ? count += 2 : count += 71;
            }
            element.html(`${count}`);
        }, 1);

        inntervals.push(newInterval);

        index++;
    },
    function () {
        for (innterval of inntervals) {
            clearInterval(innterval);

        }
        $(this).html(targets[targetIndex]);
        targetIndex++;
        if (targetIndex == 4) targetIndex = 0;

    }
);
