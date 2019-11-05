var uspsDataVis = (function() {
	function optionsFunction(opts) {
		return function(k) {
			if (opts && opts[k]) {
				return opts[k];
			} else {
				return null;
			}
		}
	}
	
	return {
		build: function(chartOptions) {
			var chartElem = document.querySelectorAll('[data-usps-data-vis]');
			for (var i = 0; i < chartElem.length; i++) {
				var d = chartElem.item(i);
				
				var opts = JSON.parse(d.dataset['uspsDataVis']);
				var chart, ctrl = chartControl();
// Delay this				ctrl.draw(d3.select('#'+d.id));

				var cAnchor = '#'+d.id;
				var cHeight = opts.height || 300;
				var rowMargins = {top:10,left:10,right:10,bottom:20};
				var barMargins = {top:10,left:30,right:10,bottom:20};
				
				if (opts.chartType == 'rowChart') {
					var m = {
						top: (opts.margins && opts.margins.top) || (chartOptions.margins && chartOptions.margins.top) || rowMargins.top,
						left: (opts.margins && opts.margins.left) || (chartOptions.margins && chartOptions.margins.left) || rowMargins.left,
						right: (opts.margins && opts.margins.right) || (chartOptions.margins && chartOptions.margins.right) || rowMargins.right,
						bottom: (opts.margins && opts.margins.bottom) || (chartOptions.margins && chartOptions.margins.bottom) || rowMargins.bottom
					}
					chart = uspsCharts
						.rowChart({anchor:cAnchor,height:cHeight,margins:m});
				} 
				else if (opts.chartType == 'barChart') {
					var m = {
						top: (opts.margins && opts.margins.top) || (chartOptions.margins && chartOptions.margins.top) || barMargins.top,
						left: (opts.margins && opts.margins.left) || (chartOptions.margins && chartOptions.margins.left) || barMargins.left,
						right: (opts.margins && opts.margins.right) || (chartOptions.margins && chartOptions.margins.right) || barMargins.right,
						bottom: (opts.margins && opts.margins.bottom) || (chartOptions.margins && chartOptions.margins.bottom) || barMargins.bottom
					}
					chart = uspsCharts
						.barChart({anchor:cAnchor,height:cHeight,margins:m});
					
					if (opts.dataType == 'date') {
						chart.continuousDomain(true);
						// hide controls
					/*	d3.select('#'+d.id).select('button[name="sortAlpha"]').style('display','none');
						d3.select('#'+d.id).select('button[name="sortValue"]').style('display','none');
						d3.select('#'+d.id).select('div[name="find"]').style('display','none');
					*/
						chart.turnOffControl('sort');
						chart.turnOffControl('find');
					}
				}
				else {
					console.log('ERROR: chartType not defined: ' + opts.chartType);
					return;
				}
				
				function getOpt(optName) {
					// opts defined locally
					var retOpt = null;
					if (opts[optName] && chartOptions[opts[optName]]) {
						retOpt = chartOptions[opts[optName]];
					}
					else if (chartOptions[optName]) {
						retOpt = chartOptions[optName];
					}
					return retOpt;
				}

				chart
					.keyAccessor(getOpt("keyAccessor"))
					.metricAccessor(getOpt("metricAccessor"))
					.metric2Accessor(getOpt("metric2Accessor"))
					.descriptorAccessor(getOpt("descriptorAccessor"))
					.labelAccessor(getOpt("labelAccessor"))
					.colors(getOpt("colors"))
					.formatTip(getOpt("formatTip"));
				
				// extend chart model to return options
				chart.options = optionsFunction(opts).bind(chart);
				
				ctrl.chart(chart);
				
				chartRegistry.add(chart,ctrl,d.id,opts);
				
			}
		} // button
	} // return object
})();

	