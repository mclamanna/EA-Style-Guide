var uspsDataVis = (function() {
	return {
		build: function(chartOptions) {
			var chartElem = document.querySelectorAll('[data-usps-data-vis]');
			for (var i = 0; i < chartElem.length; i++) {
				var d = chartElem.item(i);
				
				var opts = JSON.parse(d.dataset['uspsDataVis']);
				var chart, ctrl = chartControl();
				ctrl.draw(d3.select('#'+d.id));

				var cAnchor = '#'+d.id;
				var cHeight = 300;
				var rowMargins = {top:10,left:10,right:10,bottom:20};
				var barMargins = {top:10,left:30,right:10,bottom:35};
				
				if (opts.chartType == 'rowChart') {
					chart = uspsCharts
						.rowChart({anchor:cAnchor,height:cHeight,margins:(opts.margins || rowMargins)});
				} 
				else if (opts.chartType == 'barChart') {
					chart = uspsCharts
						.barChart({anchor:cAnchor,height:cHeight,margins:(opts.margins || barMargins)});
					
					if (opts.dataType == 'date') {
						chart.continuousDomain(true);
						// hide controls
						d3.select('#'+d.id).select('button[name="sortAlpha"]').style('display','none');
						d3.select('#'+d.id).select('button[name="sortValue"]').style('display','none');
						d3.select('#'+d.id).select('span.input-group').style('display','none');
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
				
				ctrl.chart(chart);
				
				chartRegistry.add(chart,ctrl,d.id,opts.attribute);
				
			}
		} // button
	} // return object
})();

	