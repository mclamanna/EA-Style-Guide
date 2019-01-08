		var chartRegistry = (function() {
			var _objects = [];
			
			function add(chart, ctrl, id, attr) {
				_objects.push({
					id: id,
					attr: attr,
					chart: chart,
					ctrl: ctrl
				});
			}
			function getChartById(id) {
				return _objects
					.filter(function(d) {return d.id === id})
					.map(function(d) {return d.chart});
			}
			function getCtrlById(id) {
				return _objects
					.filter(function(d) {return d.id === id})
					.map(function(d) {return d.ctrl});
			}
			function getChartByAttr(attr) {
				return _objects
					.filter(function(d) {return d.attr === attr})
					.map(function(d) {return d.chart});
			}
			function getCtrlByAttr(attr) {
				return _objects
					.filter(function(d) {return d.attr === attr})
					.map(function(d) {return d.ctrl});
			}
			function getCharts() {
				return _objects
					.map(function(d) {return d.chart});
			}
			function getCtrls() {
				return _objects
					.map(function(d) {return d.ctrl});
			}
			function getChartRecords() {
				return _objects;
			}
			return {
				add: add,
				getChartById: getChartById,
				getChartByAttr: getChartByAttr,
				getCtrlById: getCtrlById,
				getCtrlByAttr: getCtrlByAttr,
				getCharts: getCharts,
				getChartRecords: getChartRecords
			}
		})();

