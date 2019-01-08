var chartControl = (function() {
	var _controlContainer;
	
	function isSelected(btn, selectThisButton){
		var previouslySelected = d3.select(btn).classed('btn-secondary'); // "selected"
		d3.select(btn).classed('btn-secondary', selectThisButton).classed('btn-outline-secondary', !selectThisButton);
		if (previouslySelected && selectThisButton) {
			// previously selected and selecting again, so toggle
			var isSortDesc = d3.select(btn).classed('sort-desc');
			d3.select(btn).classed('sort-desc', !isSortDesc);
			d3.select(btn).classed('sort-asc', isSortDesc);
		}
		return d3.select(btn).classed('sort-desc') == true ? uspsCharts.constants.descending : uspsCharts.constants.ascending;
	}
	
	function clearInput(elem) {
		$(d3.select(elem.parentNode).selectAll('input.typeahead').nodes()).typeahead('val','');
		d3.select(elem.parentNode).select('i.fa-times').style('display','none');
		d3.select(elem.parentNode).select('i.fa-search').style('display','inline');
	}
	
	function enableClearInput(elem) {
		d3.select(elem.parentNode).select('i.fa-search').style('display','none');
		d3.select(elem.parentNode).select('i.fa-times').style('display','inline');
	}

	function draw(parent) {
		_controlContainer = d3.select(parent).node().append('div');
		
		_controlContainer.node().innerHTML = 
				'<form class="form-inline" style="flex-flow:nowrap">'
			+		'<button name="sortAlpha" class="btn btn-sm btn-outline-secondary sort-alpha sort-asc" type="button">'
			+			'<i class="fa fa-lg fa-sort-alpha-down sort-asc" aria-hidden="true"></i>'
			+			'<i class="fa fa-lg fa-sort-alpha-up sort-desc" aria-hidden="true"></i>'
			+		'</button>'
			+		'<button name="sortValue" class="btn btn-sm btn-secondary sort-value sort-desc" type="button">'
			+			'<i class="fa fa-lg fa-sort-amount-down sort-desc" aria-hidden="true"></i>'
			+			'<i class="fa fa-lg fa-sort-amount-up sort-asc" aria-hidden="true"></i>'
			+		'</button>'
			+		'<div class="form-group-sm find inner-addon right-addon">'
			+			'<label class="control-label sr-only" for="find">Search</label>'
			+			'<input name="find" class="form-control form-control-sm typeahead" data-provide="typeahead"'
			+				'autocomplete="off" type="text" placeholder="search term"/>'
			+			'<i class="fa fa-sm fa-search text-secondary" aria-hidden="true"></i>'
			+			'<i class="fa fa-sm fa-times text-secondary" area-hidden="true" style="display:none"></i>'
			+		'</div>'
			+		'<button name="reset" class="btn btn-sm btn-outline-secondary reset" type="button" style="display:none">'
			+			'<i class="fa fa-lg fa-undo" aria-hidden="true"></i>'
			+		'</button>'
			+		'<span class="btn-sm">&nbsp;</span>'
			+	'</form>';

		_controlContainer
			.select('form')
			.on('keypress', function(){
				return d3.event.keyCode != 13
			});
		_controlContainer
			.select('button[name="sortAlpha"]')
			.on('click', function() {
				var sortOrder = isSelected(this,true);
				isSelected(this.nextElementSibling,false);
				chart().orderBy(uspsCharts.constants.orderByKey,sortOrder);
			});
		_controlContainer
			.select('button[name="sortValue"]')
			.on('click', function() {
				var sortOrder = isSelected(this,true);
				isSelected(this.previousElementSibling,false);
				chart().orderBy(uspsCharts.constants.orderByValue,sortOrder);
			});
		_controlContainer
			.select('button[name="reset"]')
			.on('click', function() {
				clearInput(this);
				chart().matchString(null);
				chart().reset();
			});
		_controlContainer
			.select('.find.inner-addon i.fa-times')
			.on('click', function() {
				clearInput(this);
				chart().matchString(null);
				chart().reset();
			})
		
		// 'find' input field is using typeahead which is a jQuery extension,
		// so must convert D3 selection to jQuery selection and also use 
		// typeahead events and methods.
		$(_controlContainer.select('input[name="find"]').node())
			.on('typeahead:select', function(evt, obj) {
				chart().matchString($(this).typeahead('val'));
				chart().find($(this).typeahead('val'));
				enableClearInput(this.parentNode); // go up one more level
				chart().redraw();
			});
		$(_controlContainer.select('input[name="find"]').node())
			.on('typeahead:autocomplete', function(evt, obj) {
				chart().matchString($(this).typeahead('val'));
				chart().find($(this).typeahead('val'));
				$(this).typeahead('close');
				enableClearInput(this.parentNode); // go up one more level
				chart().redraw();
			});
		$(_controlContainer.select('input[name="find"]').node())
			.on('keyup', function(event) {
				if (event.keyCode == 13) {
					chart().matchString($(this).typeahead('val'));
					chart().find($(this).typeahead('val'));
					$(this).typeahead('close')
					enableClearInput(this.parentNode); // go up one more level
					chart().redraw();
				}
			});
/*		$(_controlContainer.select('.find.inner-addon i.fa-search').node())
			.on('click', function(event) {
				chart().matchString($(this).typeahead('val'));
				chart().find($(this).typeahead('val'));
				$(this).typeahead('close')
				enableClearInput(this.parentNode); // go up one more level
				chart().redraw();
			});
*/		
	}

	var _chart;
	function chart(_) {
		if (!arguments.length) {
			return _chart;
		}
		_chart = _;

		$(_controlContainer.select('input[name="find"]').node()).typeahead({
				highlight: true
			},
			{
				name: 'chartData',
				limit: 100,
				source: function(q,cb) {
					var l = [];
					if (_chart && _chart.findMatches) {
						l = _chart.findMatches(q);
					}
					if (l && l.length > 0) {
						l = l.map(function(d){return _chart.labelAccessor()(d);});
					} else {
						l = [];
					}
					cb(l);
				}
			});
		
		return this;
	}
	
	return {
		draw: draw,
		chart: chart
	}
});
