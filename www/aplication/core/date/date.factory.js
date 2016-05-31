/**
 * @ngdoc factory
 * @name dateSrv
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('dateSrv', factory);

  function factory($filter) {
    return {
      format : format,
      parse : parse,
      getDaysInRange : getDaysInRange,
      arrayOverlap : arrayOverlap,
      rangeOverlap : rangeOverlap,
      rangeInNextDays : rangeInNextDays,
      validDateRange : validDateRange
    };

    //////////

    /**
     * @ngdoc method
     * @name dateSrv.format
     * @param {Date} date
     * @returns {string|null}
     */
    function format(date) {
      if (!date || !date.getTime) {
        return null;
      }
      return $filter('date')(date, 'yyyy-MM-dd');
    }

    /**
     * @ngdoc method
     * @name dateSrv.parse
     * @param {string} string
     * @returns {Date}
     */
    function parse(string) {
      if (typeof string !== 'string') {
        return null;
      }
      let match = string.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (!match) {
        return null;
      }
      return new Date(match[1], match[2] - 1, match[3]);
    }

    /**
     * Recibe dos fechas y devuelve el número de días que hay de diferencia entre ellos
     * @ngdoc method
     * @name dateSrv.getDaysInRange
     * @param {Date} firstDate
     * @param {Date} lastDate
     * @param {boolean} [inclusive]
     * @returns {number|null}
     */
    function getDaysInRange(firstDate, lastDate, inclusive) {
      inclusive = inclusive || true;
      var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

      if (!lastDate) {
        return null;
      }

      firstDate.setHours(0, 0, 0);
      lastDate.setHours(0, 0, 0);

      return Math.round(
          Math.abs((firstDate.getTime() - lastDate.getTime()) / oneDay)
        ) + (inclusive ? 1 : 0);
    }

    /**
     * Compara el rango dado con el rango "hoy"-> "hoy+plusDays".
     * Si este segundo está dentro, devuelve true.
     * @ngdoc method
     * @name dateSrv.rangeInNextDays
     * @param {Date} firstDate
     * @param {Date} lastDate
     * @param {number} plusDays
     * @returns {boolean}
     */
    function rangeInNextDays(firstDate, lastDate , plusDays) {
        lastDate = lastDate || new Date(2100, 0, 1);
      if (firstDate) {
        let today = new Date();
        let todayPlusDays = new Date();

        today.setHours(0, 0, 0, 0);
        todayPlusDays.setHours(0, 0, 0, 0);
        todayPlusDays = addDays(todayPlusDays, plusDays);

        return todayPlusDays >= firstDate && today <= lastDate;
      }
      return false;
    }

    /**
     * Añade días a una fecha y devuelve la fecha modificada
     * @ngdoc method
     * @name dateSrv.addDays
     * @param {Date} date
     * @param {number} days
     * @returns {Date}
     */
    function addDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + Number(days));
      return result;
    }

    /**
     * Indica si dos rangos de fechas se solapan
     * @ngdoc method
     * @name dateSrv.rangeOverlap
     * @param {object} rango1
     * @param {object} rango2
     * @returns {boolean}
     */
    function rangeOverlap(rango1, rango2) {
      var e1start = rango1.start.getTime();
      var e1end = rango1.end ?
                  rango1.end.getTime() : new Date('20100-01-01').getTime();
      var e2start = rango2.start.getTime();
      var e2end = rango2.end ?
                  rango2.end.getTime() : new Date('20100-01-01').getTime();
      return e1start >= e2start && e1start <= e2end ||
        e2start >= e1start && e2start <= e1end;
    }

    /**
     * Indica si se solapan los rangos de fechas indicados o si el array no es válido
     * @ngdoc method
     * @name dateSrv.arrayOverlap
     * @param {array} ranges
     * @returns {boolean|null}
     */
    function arrayOverlap(ranges) {
      if (ranges && ranges.length > 1) {
        for (let count = 0; count < ranges.length; count++) {
          for (let count2 = count; count2 < ranges.length - 1; count2++) {
            if (rangeOverlap(ranges[count], ranges[count2 + 1]) === true) {
              return true;
            }
          }
        }
        return false;
      }
      return null;
    }

    /**
     * Indica si la primera fecha es menor que la segunda fecha
     * @ngdoc method
     * @name dateSrv.validDateRange
     * @param {string} dateStart
     * @param {string} dateEnd
     * @returns {boolean|null}
     */
    function validDateRange(dateStart, dateEnd) {
      let firstDate = parse(dateStart);
      let lastDate = parse(dateEnd);
      if (!firstDate || !lastDate) {
        return null;
      }
      return lastDate >= firstDate;
    }
  }
}());
