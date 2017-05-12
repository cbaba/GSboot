
// initialize string.format()
// usage:       "my string patterns: {0} = {1}".format("name", "value");
// reference:   http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
(function () {
    // First, checks if it isn't implemented yet.
    if (!String.prototype.format) {
        String.prototype.format = function () {
            var args = Array();
            args[0] = this;
            for (var i = 0; i < arguments.length; i++) {
                args[i + 1] = arguments[i];
            }
            return orca_string_format.apply(
                this,
                args);
        };
    }

    if (!String.prototype.EndsWith) {
        String.prototype.EndsWith = orca_string_endswith;
    }
})();


function orca_string_format(pattern) {
    if (pattern == null || pattern == undefined) return null;
    if (arguments.length == 1) return pattern;

    var args = arguments;

    return pattern.replace(/{(\d+)}/g, function (match, number) {
        var n = parseInt(number, 10);

        if (args[n + 1] === undefined || args[n + 1] === null || args[n + 1] === NaN)
            return match;
        else
            return args[n + 1];
    });
}


function orca_string_endswith(suffix) {
    if (suffix != null) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    }
    else { return ""; }
};


// initialize string builder
// http://www.codeproject.com/Articles/12375/JavaScript-StringBuilder

// Initializes a new instance of the StringBuilder class
// and appends the given value if supplied
function StringBuilder(value) {
    this.strings = new Array("");
    this.append(value);
}

// Appends the given value to the end of this instance.
StringBuilder.prototype.append = function (value) {
    if (value) {
        this.strings.push(value);
    }
};

// Appends the given value to the end of this instance.
StringBuilder.prototype.appendFormat = function (value) {
    if (value) {
        this.strings.push(orca_string_format.apply(value, arguments));
    }
};

//7
// Clears the string buffer
StringBuilder.prototype.clear = function () {
    this.strings.length = 1;
};

// Converts this instance to a String.
StringBuilder.prototype.toString = function () {
    return this.strings.join("");
};




function detectmob() {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ) {
        return true;
    }
    else {
        return false;
    }
}

function getToday() {
    var d = new Date();

    var month = d.getMonth() + 1;
    var day = d.getDate();

    return d.getFullYear() + '-' +
        (month < 10 ? '0' : '') + month + '-' +
        (day < 10 ? '0' : '') + day;
}

function checkInt(value) {
    var reg = /^-?\d+$/;
    return reg.test(value);
}

function checkFloat(value) {
    var reg = /^(-?\d+)(\.\d+)?$/;
    return reg.test(value);
}

function checkEmail(value) {
    var reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
    return reg.test(value);
}