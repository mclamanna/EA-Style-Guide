		var crossfilterController = (function() {
			var _xf = crossfilter(),
				_chartList = {},
				_reduceFn,
				_summaryReduceFn,
				_filterCallback,
				_dataFilter = function(d){return true},
				_universal = {};
			
			_xf.onChange(function(evt){ 
				if (evt === 'filtered') {
					redrawAll();
					
					if (_filterCallback) {
						_filterCallback();
					}
				}
			});
			
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
			
			function universal() {
				var universalFunc = function(d){return "universal"};
				createDimension("universal",universalFunc);
				return this;
			}
			
			// creates a dimension/group without a chart
			function createDimension(dimName, dimFunc) {
				if (!_reduceFn) {
					console.log('ERROR: you must call reduce() before createDimension()');
					return;
				}
				
				if (typeof dimFunc !== "function") {
					console.log('ERROR: second parameter to createDimension must be a function');
					return;
				}

				var dimension = _xf.dimension(dimFunc);
				
				var group = dimension.group().reduce(
					_reduceFn.inc,
					_reduceFn.dec,
					_reduceFn.init
				);
				
				_chartList[dimName] = {
					chart: null,
					ctrl: null,
					dimension: dimension,
					group: group
				}
				
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
			
			function summaryReduce(inc, init) {
				_summaryReduceFn = {
					inc: inc,
					init: init
				};
				return this;
			}
			
			function redrawAll() {
				Object.keys(_chartList).forEach(function(k){
					var chrt = _chartList[k].chart;
					if (chrt) {
						var grp  = _chartList[k].group;
						var ctrl = _chartList[k].ctrl;
						var data = grp.top(Infinity).filter(_dataFilter);
						if (_summaryReduceFn) {
							var summary = data.reduce(_summaryReduceFn.inc,_summaryReduceFn.init());
							data.forEach(function(d){
								d.summary = summary;
							})
						}
						chrt.data(data);
						//ctrl.refresh();
						chrt.redraw();
					}
				});
				return this;
			}
			
			function resetAll() {
				Object.keys(_chartList).forEach(function(k){
/*					var chrt = _chartList[k].chart;
					if (chrt) {
						chrt.matchString(null);
						chrt.reset();
					} */
					var ctrl = _chartList[k].ctrl;
					if (ctrl) {
						ctrl.reset();
					}
				});
				return this;
			}
			
			function drawAll() {
				Object.keys(_chartList).forEach(function(k){
					var chrt = _chartList[k].chart;
					if (chrt) {
						var grp  = _chartList[k].group;
						var ctrl = _chartList[k].ctrl;
						var data = grp.top(Infinity).filter(_dataFilter);
						if (_summaryReduceFn) {
							var summary = data.reduce(_summaryReduceFn.inc,_summaryReduceFn.init());
							data.forEach(function(d){
								d.summary = summary;
							})
						}
						
						// Wait to draw controls just before we draw chart for first time
						ctrl.draw(chrt.getParent());
						
						chrt.data(data);
						//ctrl.refresh();
						chrt.draw();
					}
				});
				return this;
			}
			
			function filterByArray(arrayOfKeys) {
				if (arrayOfKeys[0] instanceof Date) {
					arrayOfKeys = arrayOfKeys.map(function(d){return d.getTime();});
				}
				return function(d) {
					if (d instanceof Date) {
						d = d.getTime();
					}
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
			
			function getData(limit) {
				// use any (ie: first) dimension
				var dimKey = Object.getOwnPropertyNames(_chartList)[0];
				return _chartList[dimKey].dimension.top(limit);
			}
			
			return {
				addChart: addChart,
				loadData: loadData,
				redrawAll: redrawAll,
				resetAll: resetAll,
				drawAll: drawAll,
				reduce: reduce,
				summaryReduce: summaryReduce,
				dataFilter: dataFilter,
				getData: getData,
				getChart: function(attr){return _chartList[attr].chart},
				getDimension: function(attr){return _chartList[attr].dimension},
				getGroup: function(attr){return _chartList[attr].group},
				onFilter: function(_) {
					if (!arguments.length) {
						return _filterCallback;
					}
					_filterCallback = _;
					return this;
				},
				createDimension: createDimension,
				universal: universal
			}
		});
