var DRAFTMAN = (function () {
    'use strict';

    function DRAFTMAN() {

    }

    DRAFTMAN.Point2D = function (x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    DRAFTMAN.Point2D.prototype = {

        constructor: DRAFTMAN.Point2D,

        setXY: function (x, y) {

            this.x = x;
            this.y = y;

            return this;

        },

        setX: function (x) {

            this.x = x;

            return this;

        },

        setY: function (y) {

            this.y = y;

            return this;

        },
        clone: function () {

            return new DRAFTMAN.Point2D(this.x, this.y);

        }
    }

    var DRAFTMAN = DRAFTMAN || {};

    return DRAFTMAN;

})();
