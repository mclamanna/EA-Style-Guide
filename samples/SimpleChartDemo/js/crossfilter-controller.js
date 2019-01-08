		var crossfilterController = (function() {
			var _xf = crossfilter(),
				_chartList = {},
				_reduceFn,
				_dataFilter = function(d){return true};
			
			_xf.onChange(function(evt){ if (evt === 'filtered') {redrawAll();}});
			
			function addChart(chart, ctrl, attr) {
				if (!_reduceFn) {
					console.log('ERROR: you must call reduce() before addChart()');
					return;
				}
				
				var dimension = _xf.dimension(function(d) {
					return d[attr];
				});
				
				var group = dimension.group().reduce(
					_reduceFn.inc,
					_reduceFn.dec,
					_reduceFn.init
				);
				
				_chartList[attr] = {
					chart: chart,
					ctrl: ctrl,
					dimension: dimension,
					group: group
				}
				
				selectionListener(chart, attr);
				return this;
			}
			
			function reduce(inc, dec, init) {
				_reduceFn = {
					inc: inc,
					dec: dec,
					init: init
				}
				return this;
			}
			
			function redrawAll() {
				Object.keys(_chartList).forEach(function(k){
					var chrt = _chartList[k].chart;
					var grp  = _chartList[k].group;
					var ctrl = _chartList[k].ctrl;
					chrt.data(grp.top(Infinity).filter(_dataFilter));
					//ctrl.refresh();
					chrt.redraw();
				});
				return this;
			}
			
			function drawAll() {
				Object.keys(_chartList).forEach(function(k){
					var chrt = _chartList[k].chart;
					var grp  = _chartList[k].group;
					var ctrl = _chartList[k].ctrl;
					chrt.data(grp.top(Infinity).filter(_dataFilter));
					//ctrl.refresh();
					chrt.draw();
				});
				return this;
			}
			
			function filterByArray(arrayOfKeys) {
				return function(d) {
					return arrayOfKeys.indexOf(d) !== -1;
				}
			}
			
			function selectionListener(chart, attr) {
				chart.on('selectionChange.ctl', function(selectedKeys) {
					if (!selectedKeys || !selectedKeys.length || !selectedKeys instanceof Array) {
						_chartList[attr].dimension.filterAll();
					} else {
						_chartList[attr].dimension.filter(filterByArray(selectedKeys));
					}
				});
			}
			
			function dataFilter(fn) {
				_dataFilter = fn;
			}
			
			function loadData(data) {
				_xf.remove();
				_xf.add(data);
				return this;
			}
			
			return {
				addChart: addChart,
				loadData: loadData,
				redrawAll: redrawAll,
				drawAll: drawAll,
				reduce: reduce,
				dataFilter: dataFilter,
				getChart: function(attr){return _chartList[attr].chart},
				getDimension: function(attr){return _chartList[attr].dimension},
				getGroup: function(attr){return _chartList[attr].group},
			}
		});
