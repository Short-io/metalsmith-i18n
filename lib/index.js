'use strict';

var i18n = require('i18n');

module.exports = function (ops) {
    function isObject(obj) {
        return (typeof obj === "object") && (obj !== null);
    }

    function __() {
        var args   = Array.prototype.slice.call(arguments);
        var str    = args.shift();
        var data   = args.shift() || {};
        var locale = this.locale || data.locale || ops.default;

        delete data.locale;

        if (!isObject(data)) {
            args = [data].concat(args);
            data = {};
        }

        return i18n.__.apply(i18n, [{ phrase: str, locale: locale }].concat(args.concat([data])));
    }

    function __n() {
        var args     = Array.prototype.slice.call(arguments);
        var singular = args.shift();
        var plural   = args.shift();
        var count    = args.shift();
        var data     = args.shift() || {};
        var locale   = this.locale || data.locale || ops.default;

        delete data.locale;

        if (!isObject(data)) {
            args = [data].concat(args);
            data = {};
        }

        args = [{ singular: singular, plural: plural, count: count, locale: locale }].concat(args.concat([data]));

        return i18n.__n.apply(i18n, args);
    }

    return function (files, ms, done) {
        i18n.configure({
            defaultLocale: ops.default,
            locales:       ops.locales,
            directory:     ms.path(ops.directory)
        });

        for (var file in files) {
            files[file].__  = __.bind(files[file]);
            files[file].__n = __n.bind(files[file]);
        }

        done();
    };
};