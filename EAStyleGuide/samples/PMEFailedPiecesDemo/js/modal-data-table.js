/*****************
	Modal table
*****************/
var modalDataTable = (function() {
	var _dataTable;
	var _modalContainer;
	var _rowFunction;
	var _filterFunction;
	var _containerId;
	var _buttonContainerId;
	var _tableContainerId;
	var _titleContainerId;
	var _itemNameContainerId;

	// set some defaults
	$.fn.dataTable.Buttons.defaults.dom.button.className += ' btn-sm';
	
	function initModal(colHeaders) {
		_modalContainer = $('#'+_containerId);
		if (_modalContainer.length == 0) {
			_modalContainer = $('<div/>').appendTo('body');
			_modalContainer.attr('id',_containerId);
		}
		_modalContainer.attr('class','modal fade')
			.attr('tabindex','-1')
			.attr('role','dialog')
			.attr('aria-labelledby','chartTableModal');
			
		var tHeaders = '';
		var colDefsIsArray = (colHeaders.length > 0 && colHeaders[0] instanceof Array);
		for (var i = 0; i < colHeaders.length; i++) {
			var hdr = colDefsIsArray ? colHeaders[i][0] : colHeaders[i];
			var pri = colDefsIsArray ? ' data-priority="' + colHeaders[i][1] + '"' : '';
			if (i == 0) {
				tHeaders += '<th id="' + _itemNameContainerId + '"' + pri + '>' + hdr + '</th>';
			} else {
				tHeaders += '<th' + pri + '>' + hdr + '</th>';
			}
		}
		
		/* For few columns, <= 6, use modal-lg. For more columns, add modal-xl */
		_modalContainer.html(
				'<div class="modal-dialog modal-lg' + (colHeaders.length > 6 ? ' modal-xl' : '') + '">'
		+			'<div class="modal-content">'
		+				'<div class="modal-header">'
		+					'<div class="col">'
		+						'<h4 id="' + _titleContainerId + '" class="modal-title">Data for ...</h4>'
		+					'</div>'
		+					'<div id="' + _buttonContainerId + '" class="col-auto"></div>'
		+					'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
		+				'</div>'
		+				'<div class="modal-body">'
		+					'<table id="' + _tableContainerId + '" class="table table-striped table-hover dt-responsive no-wrap" cellspacing="0" width="100%">'
		+						'<thead>'
		+							'<tr>'
		+								tHeaders
		+							'</tr>'
		+						'</thead>'
		+					'</table>'
		+				'</div>'
		+				'<div class="modal-footer">'
		+					'<div id="' + _buttonContainerId2 + '" class="col"></div>'
		+					'<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Close</button>'
		+				'</div>'
		+			'</div>'
		+		'</div>'
		);
	}
	
	function init_dataTable(containerId,colHeaders,rowFunc,filterFunc,doConfigModal) {
		if (doConfigModal == 'undefined') {
			doConfigModal = true;
		}
		_containerId 		= containerId;
		_buttonContainerId 	= _containerId + '-buttons';
		_buttonContainerId2	= _buttonContainerId + '-footer';
		_tableContainerId 	= _containerId + '-table';
		_titleContainerId 	= _containerId + '-title';
		_itemNameContainerId = _containerId + '-item-name';
		
		initModal(colHeaders);
		_rowFunction = rowFunc;
		if (filterFunc == undefined) {
			_filterFunction = function(d){return true;};
		} else {
			_filterFunction = filterFunc;
		}
		
		var colDefs = [];
		var colCount = colHeaders.length || 1;
		var colDefsHasPriority = (colHeaders.length > 0 && colHeaders[0] instanceof Array);
		for (var j = 0; j < colCount; j++) {
			colDefs.push({
				responsivePriority: colDefsHasPriority ? colHeaders[j][1] : j+1, 
				target: j,
				defaultContent: ""
			});
		}
		
		_dataTable = $('#'+_tableContainerId).DataTable({
			responsive: true,
			bSort: true,
			columnDefs: colDefs
		});
		
		// buttons for header
		new $.fn.dataTable.Buttons( _dataTable, {
			buttons: [
				{
					extend: 'copy',
					text:	'<i class="far fa-copy"></i> Copy'
				},
				{
					extend:	'excel',
					text:	'<i class="far fa-file-excel"></i> Excel'
				}
			]
		} );
		_dataTable.buttons(0,null).container().appendTo( $('#'+_buttonContainerId)).css('display:inline-block');
		$('#'+_buttonContainerId+' div').removeClass('btn-group');
		$('#'+_buttonContainerId+' div button').removeClass('btn-secondary').addClass('btn-outline-secondary');
		
		// buttons for footer
		new $.fn.dataTable.Buttons( _dataTable, {
			buttons: [
				{
					extend: 'copy',
					text:	'<i class="far fa-copy"></i> Copy'
				},
				{
					extend:	'excel',
					text:	'<i class="far fa-file-excel"></i> Excel'
				}
			]
		} );
		_dataTable.buttons(1,null).container().appendTo( $('#'+_buttonContainerId2)).css('display:inline-block');
		$('#'+_buttonContainerId2+' div').removeClass('btn-group');
		$('#'+_buttonContainerId2+' div button').removeClass('btn-secondary').addClass('btn-outline-secondary');

		// adjust the classes for divs inside dataTables_wrapper
		$('#'+_tableContainerId+'_wrapper div.row:nth-child(1) div:nth-child(1)').removeClass('col-sm-12').addClass('col-auto');
		$('#'+_tableContainerId+'_wrapper div.row:nth-child(1) div:nth-child(1) div:nth-child(1)').removeClass('col-auto');
		$('#'+_tableContainerId+'_wrapper div.row:nth-child(1) div:nth-child(2)').removeClass('col-sm-12').addClass('col');
		$('#'+_tableContainerId+'_filter').removeClass('col-auto');
		
		if (doConfigModal) {
			configModal();
		}
	}

	function refresh_dataTable(chart) {

		if (_dataTable == undefined) {
			console.log("ERROR: must call init() before refresh()");
			return;
		}
		var filters;
		if (chart.selectionsByKey().length == 1 && chart.selectionsByKey()[0].length > 0) {
			filters = chart.selectionsByKey()[0];
		}
		var data = chart.data()
			.filter(_filterFunction)
			.filter(function(d) {
				if (filters !== undefined && filters.length > 0) {
					return filters.indexOf(d.key) !== -1;
				} else {
					return true;
				}
			})
			.map(function(d) {
				return _rowFunction(chart,d);
			});
		
		_dataTable
			.clear()
			.rows.add(data)
			.draw();
			
		// need a delay for the resize to work
		setTimeout( function() {
			_dataTable
				.columns.adjust()
				.responsive.recalc();
			$(window).trigger('resize');
		}, 300);
	}
	
	function configModal() {
		$('#'+_containerId).on('show.bs.modal', function(event){
			var container = $(event.relatedTarget).closest('div.usps-data-vis');
			var chart = chartRegistry.getChartById(container.attr('id'));
			var chartName = chart.options("chartName");
			var itemName = chart.options("attributeName") || chartName;
			$('#'+_titleContainerId).text('Data for ' + chartName + ' Chart');
			$('#'+_itemNameContainerId).text(itemName);
			refresh_dataTable(chart);
		});
	}

	return {
		init: init_dataTable,
		refresh: refresh_dataTable,
		dataTable: function() {return _dataTable;}
	}
});