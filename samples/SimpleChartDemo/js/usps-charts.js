(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3'], factory) :
  (factory((global.uspsCharts = {}),global.d3));
}(this, (function (exports,d3$1) { 'use strict';

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  /* 	stamp design pattern core functions 
  	Original code found here: https://medium.com/@koresar/fun-with-stamps-episode-4-implementing-stamps-in-30-loc-e52f5c17dcfe
  	Converted using Babel here: https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=GYVwdgxgLglg9mABBATgUwIZTQMQ9OFATwAoATNAZ1RgAcpCBKRAbwChFF0oQUlRIsBIgDKUDAFtaJOPXhhKAGkQA6NRhQBzSs3adOAGzRREMBeMhpEAXkQB5AEYArNNBWpM2clRr1CKiWMACzgyHQBuDn1HFzcMSkoYTTASM0oLCDRlCmoUOgYUFVoUWTQUWCpGSP1Eb1z8_zMYWAwDGAAvMspEAB8exABtAF1GFWBCAFF8INSwZphWjrKbAD5WKJqmlrbOwohWg1n0jEtlWSEFRQ2a1mOpAC5RcSllDW1HgfP5SiH3BH2oCQ3jplGkMmgAL5Va5Q6r6bi8JBgk6ZOEQtjogTQeTIdBYNBiSTSHK-Aq6KIQBDpRB3Wg2XGeXD4AqkEl5PwoaGcWl_KRwShWWxYi4kck1BF8ZBwPkClQYWi0AykKBBGBKRBvECBMBQCJRCFwmKuKByhJJFI8ykyrKINkNTlwiVIWmRTHgbHCQJaNAAYWltH5GAcRnI6QAIj52QVlJQUBA_TKg0YxVLzDS4xH6hz6SRY_H_YHg1ZEAAyEvp_OJou8gMC5gAfkQ1zzCdrSbQNf5VkeLYLlHbcJgwFqAEI85nSUwuMZEbbw5H7XCwlAJ1H_MVSuUYFR6Ua4mbkiRrsvV_aiiVaGUKt0-qwITGMwuOefN9euXOV0-CgFgqFurY9xNeJEkPY95yzb9AhVP9en6Fh7wrU9nygkIwnfE8v0aOZtiWFB_1qDCIKw-ZFl2G9-mGRhrj-SAsFzR8iMKLYFh2LpYMGEZHRnSVCMnFBXTYNAAA8A3KW00GADAQAMExhRxK1azQEg1E7fsix0dZOEpNMwDQAB3JCCnpAYVTVX5tIBEgFMLIwdGo9AyBATISC9TRfT7dtlHg98nQZfFCSkEhdIMzCHQxIA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=6.26.0&envVersion=
  */

  function createFactory(descriptor) {
    return function Stamp(options) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var instance = Object.create(descriptor.methods);
      _extends(instance, descriptor.properties);
      (descriptor.initializers || []).forEach(function (initializer) {
        initializer.call(instance, options, { stamp: Stamp, args: [options].concat(args), instance: instance });
      });
      return instance;
    };
  }
  function createStamp(descriptor) {
    var stamp = createFactory(descriptor);
    stamp.compose = function () {
      return compose.apply(this, arguments);
    };
    _extends(stamp.compose, descriptor);
    return stamp;
  }
  function mergeComposable(dstDescriptor, srcComposable) {
    var srcDescriptor = srcComposable && srcComposable.compose ? srcComposable.compose : srcComposable;
    if (!srcDescriptor) return dstDescriptor;
    dstDescriptor.properties = _extends(dstDescriptor.properties || {}, srcDescriptor.properties);
    dstDescriptor.methods = _extends(dstDescriptor.methods || {}, srcDescriptor.methods);
    dstDescriptor.initializers = (dstDescriptor.initializers || []).concat(srcDescriptor.initializers || []);
    return dstDescriptor;
  }
  function compose() {
    for (var _len2 = arguments.length, composables = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      composables[_key2] = arguments[_key2];
    }

    var newDescriptor = [this].concat(composables).reduce(mergeComposable, {});
    return createStamp(newDescriptor);
  }

  function hasSvgRootFactory() {

  	var init = function init(_ref) {
  		var anchor = _ref.anchor,
  		    width = _ref.width,
  		    height = _ref.height;

  		var _anchor, _parent, _svg, _width, _height;

  		if (anchor) {
  			_anchor = anchor;
  			_parent = d3$1.select(_anchor);
  			// s is a regular DOM node
  			var s = _parent.append('svg');
  			// _svg is a d3 selection
  			_svg = _parent.select('svg');
  		}

  		if (_svg) {
  			var bBox = _parent && _parent.node() && _parent.node().getBoundingClientRect();

  			_width = width || bBox && bBox.width || 400;
  			_height = height || bBox && bBox.height || 300;
  			_svg.transition().attr('width', _width).attr('height', _height);
  		}

  		this.height = function (_) {
  			if (!arguments.length) {
  				return _height;
  			}
  			_height = _;
  			return this;
  		};

  		this.width = function (_) {
  			if (!arguments.length) {
  				return _width;
  			}
  			_width = _;
  			return this;
  		};

  		this.getSvg = function () {
  			return _svg;
  		};

  		this.getParent = function () {
  			return _parent;
  		};

  		this.getAnchor = function () {
  			return _anchor;
  		};

  		this.naturalWidth = function () {
  			if (_svg) {
  				var bBox = _parent && _parent.node() && _parent.node().getBoundingClientRect();

  				_width = bBox && bBox.width || 400;
  				_svg.transition().attr('width', _width);
  			}
  			return this;
  		};
  	}; // end init

  	var hasSvgRootStamp = compose({
  		initializers: [init]
  	});

  	return hasSvgRootStamp;
  }

  function hasMarginsFactory() {

  	var normalizeMargins = function normalizeMargins(margins) {

  		if (!margins) {
  			margins = {};
  		}

  		// set default margins to 0 if not already explicitly set
  		if (margins) {
  			// if margin values are missing, or not a number set to zero
  			// otherwise convert to a number
  			// convert margin values to numbers
  			margins.left = margins.left && !isNaN(parseInt(margins.left)) ? parseInt(margins.left) : 0;
  			margins.right = margins.right && !isNaN(parseInt(margins.right)) ? parseInt(margins.right) : 0;
  			margins.top = margins.top && !isNaN(parseInt(margins.top)) ? parseInt(margins.top) : 0;
  			margins.bottom = margins.bottom && !isNaN(parseInt(margins.bottom)) ? parseInt(margins.bottom) : 0;
  		}

  		return margins;
  	};

  	var init = function init(_ref) {
  		var margins = _ref.margins;


  		// private variables
  		var _margins;

  		// if margins are passed in, set to private variable
  		if (margins) {
  			_margins = margins;
  		}

  		_margins = normalizeMargins(_margins);

  		// expose this as a privileged method
  		this.margins = function (_) {
  			if (!arguments.length) {
  				return _margins;
  			}
  			_margins = normalizeMargins(_);
  			return this;
  		};
  	}; // end init

  	var hasMarginsStamp = compose({
  		initializers: [init]
  	});

  	return hasMarginsStamp;
  }

  function hasDataAccessorsFactory() {

  	var init = function init(_ref) {
  		var data = _ref.data,
  		    keyAccessor = _ref.keyAccessor,
  		    descriptorAccessor = _ref.descriptorAccessor,
  		    metricAccessor = _ref.metricAccessor,
  		    metric2Accessor = _ref.metric2Accessor,
  		    labelAccessor = _ref.labelAccessor;

  		var _data = [{ x: 'A', y: 0 }, { x: 'B', y: 1 }],
  		    // dummy values
  		_keyAccessor = function _keyAccessor(d) {
  			return d.x;
  		},
  		    _descriptorAccessor = function _descriptorAccessor(d) {
  			return _keyAccessor(d);
  		},
  		    _metricAccessor = function _metricAccessor(d) {
  			return d.y;
  		},
  		    _metric2Accessor = function _metric2Accessor(d) {
  			return d.y || 1;
  		},
  		    _labelAccessor = function _labelAccessor(d) {
  			return _descriptorAccessor(d);
  		};

  		// public members, privileged methods

  		/** Assume passing in an array of data objects **/
  		this.data = function (_) {
  			if (!arguments.length) {
  				return _data;
  			}
  			if (_ instanceof Array) {
  				_data = _;
  			} else if (_ instanceof Object && !(_ instanceof Function)) {
  				_data = [_];
  			} else {
  				console.log('ERROR has-data-accessors: Invalid object passed to data(). Must be an array.');
  			}
  			return this;
  		};

  		/** Following assume passing in a function **/

  		this.keyAccessor = function (_) {
  			if (!arguments.length) {
  				return _keyAccessor;
  			}
  			if (_ instanceof Function) {
  				_keyAccessor = _.bind(this);
  			} else {
  				console.log('ERROR has-data-accessors: Invalid object passed to keyAccessor(). Must be a function.');
  			}
  			return this;
  		};

  		this.descriptorAccessor = function (_) {
  			if (!arguments.length) {
  				return _descriptorAccessor;
  			}
  			if (_ instanceof Function) {
  				_descriptorAccessor = _.bind(this);
  			} else {
  				console.log('ERROR has-data-accessors: Invalid object passed to descriptorAccessor(). Must be a function.');
  			}
  			return this;
  		};

  		this.metricAccessor = function (_) {
  			if (!arguments.length) {
  				return _metricAccessor;
  			}
  			if (_ instanceof Function) {
  				_metricAccessor = _.bind(this);
  			} else {
  				console.log('ERROR has-data-accessors: Invalid object passed to metricAccessor(). Must be a function.');
  			}
  			return this;
  		};

  		this.metric2Accessor = function (_) {
  			if (!arguments.length) {
  				return _metric2Accessor;
  			}
  			if (_ instanceof Function) {
  				_metric2Accessor = _.bind(this);
  			} else {
  				console.log('ERROR has-data-accessors: Invalid object passed to metric2Accessor(). Must be a function.');
  			}
  			return this;
  		};

  		this.labelAccessor = function (_) {
  			if (!arguments.length) {
  				return _labelAccessor;
  			}
  			if (_ instanceof Function) {
  				_labelAccessor = _.bind(this);
  			} else {
  				console.log('ERROR has-data-accessors: Invalid object passed to labelAccessor(). Must be a function.');
  			}
  			return this;
  		};

  		/** Initialize values **/
  		if (data) {
  			this.data(data);
  		}
  		if (keyAccessor) {
  			this.keyAccessor(keyAccessor);
  		}
  		if (descriptorAccessor) {
  			this.descriptorAccessor(descriptorAccessor);
  		}
  		if (metricAccessor) {
  			this.metricAccessor(metricAccessor);
  		}
  		if (metric2Accessor) {
  			this.metric2Accessor(metric2Accessor);
  		}
  		if (labelAccessor) {
  			this.labelAccessor(labelAccessor);
  		}
  	}; // end init

  	var hasDataAccessorsStamp = compose({
  		initializers: [init]
  	});

  	return hasDataAccessorsStamp;
  }

  /* odd utility functions */

  function isInt(a) {
  	return a !== null && !isNaN(parseInt(a));
  }

  function wheelEvent() {
  	// detect available wheel event
  	var support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
  	document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
  	"DOMMouseScroll"; // let's assume that remaining browsers are older Firefox
  	return support;
  }

  // singleton function
  var _lastTouchTarget = null;
  function lastTouchTarget(_) {
  	if (!arguments.length) {
  		return _lastTouchTarget;
  	}
  	_lastTouchTarget = _;
  }

  function invokeOnTarget(target, eventType) {
  	if (target) {
  		var t = d3.select(target);
  		var d = t.datum();
  		var f = t.on(eventType);
  		if (f) {
  			try {
  				f.apply(target, [d]);
  			} catch (e) {
  				console.log(e);
  			}
  		}
  	}
  }

  function invokeOnLastTarget(eventType) {
  	invokeOnTarget(lastTouchTarget(), eventType);
  }

  function invokeOnCurrentTarget(eventType) {
  	invokeOnTarget(d3.event.currentTarget, eventType);
  }

  function twoStepTouchHandler(d, i) {
  	var t = d3.select(this);

  	// if the target has mouseover and mouseout handlers
  	// we want touch events to mimic mouse events so that
  	// the first touch invokes mouseover (but not click)
  	// and the second touch which allows the normal event flow
  	if (t.on('mouseover') && t.on('mouseout')) {
  		// do 2 touch handling...

  		// note: we use a singleton function for lastTouchTarget
  		// which can be shared across charts. Also needed for page
  		// level handler to hide tip if click occurs anywhere else on page.

  		d3.event.preventDefault(); // so we don't invoke other events like click
  		d3.event.cancelBubble = true; // so page level touchend handler is not invoked

  		if (d3.event.currentTarget !== lastTouchTarget()) {
  			// first touch:
  			// 1) invoke mouseout on last target (if exists)
  			invokeOnLastTarget('mouseout');
  			// 2) invoke mouseover on current target
  			invokeOnCurrentTarget('mouseover');
  			// 3) remember current target as last target
  			lastTouchTarget(d3.event.currentTarget);
  		} else {
  			// second touch:
  			// 1) invoke mouseout on current target
  			invokeOnCurrentTarget('mouseout');
  			// 2) invoke click on current target
  			invokeOnCurrentTarget('click');
  		}
  	} else {
  		// no mouseover or mouseout handlers
  		// so default to normal behavior by doing nothing.
  		return; // noop
  	}
  }

  // Must be passed to call on a d3 selection.
  // Must set and unset style values (or attributes)
  // based on value of isHighlight.
  // Mismatched settings will yield erratic behavior.
  // Assumes we are styling a bar, so characteristics
  // like border, fill, opacity, etc. are appropriate.
  // Characteristics like font-weight, etc. are not appropriate.
  function highlightBarStyle(isHighlight) {
  	if (isHighlight) {
  		return function (t) {
  			t.style('opacity', 1);
  		};
  	} else {
  		return function (t) {
  			t.style('opacity', 0.75);
  		};
  	}
  }

  function highlightLabelStyle(isHighlight, returnValue) {
  	if (returnValue) {
  		if (isHighlight) {
  			return 'bold';
  		} else {
  			return null;
  		}
  	} else {
  		// invoked from call
  		if (isHighlight) {
  			return function (t) {
  				t.style('font-weight', 'bold');
  			};
  		} else {
  			return function (t) {
  				t.style('font-weight', null);
  			};
  		}
  	}
  }

  function hasDataWindowFactory() {

  	var dummyData = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  	var init = function init(_ref) {
  		var window = _ref.window,
  		    windowSize = _ref.windowSize;

  		var _window = {};

  		var that = this;

  		// if data() function exists and returns a value, return the length of that
  		// otherwise default to 1
  		var _dataLength = function _dataLength() {
  			return that.data && that.data() && that.data().length || dummyData.length;
  		};

  		var normalizeWindow = function normalizeWindow(window) {
  			// validate input parameters, set to null if not a number
  			window.lower = window && isInt(window.lower) ? parseInt(window.lower) : null;
  			window.size = window && isInt(window.size) ? parseInt(window.size) : null;
  			window.upper = window && isInt(window.upper) ? parseInt(window.upper) : null;

  			// if 2 of 3 values passed in, calculate 3rd value
  			if (window.size == null && isInt(window.upper) && isInt(window.lower)) {
  				window.size = window.upper - window.lower;
  			} else if (window.upper == null && isInt(window.size) && isInt(window.lower)) {
  				window.upper = window.lower + window.size;
  			} else if (window.lower == null && isInt(window.size) && isInt(window.upper)) {
  				window.lower = window.upper - window.size;
  			}
  			// if 1 of 3 ... upper
  			else if (window.size == null && window.lower == null && isInt(window.upper) && isInt(_window.size)) {
  					// upper passed in, calculate lower based on previously set size
  					window.size = _window.size;
  					window.lower = window.upper - window.size;
  				} else if (window.size == null && window.lower == null && isInt(window.upper) && isInt(_window.lower)) {
  					// upper passed in, calculate size base on previously set lower
  					window.lower = _window.lower;
  					window.size = window.upper - window.lower;
  				}
  				// if 1 of 3 ... lower
  				else if (window.size == null && isInt(window.lower) && window.upper == null && isInt(_window.size)) {
  						// lower passed in, calculate lower based on previously set size
  						window.size = _window.size;
  						window.upper = window.lower + window.size;
  					} else if (window.size == null && isInt(window.lower) && window.upper == null && isInt(_window.upper)) {
  						// lower passed in, calculate size base on previously set upper
  						window.upper = _window.upper;
  						window.size = window.upper - window.lower;
  					}
  					// if 1 of 3 ... size
  					else if (isInt(window.size) && window.lower == null && window.upper == null && isInt(_window.lower)) {
  							// size passed in, calculate upper based on previously set lower
  							window.lower = _window.lower;
  							window.upper = window.lower + window.size;
  						} else if (isInt(window.size) && window.lower == null && window.upper == null && isInt(_window.upper)) {
  							// size passed in, calculate lower base on previously set upper
  							window.upper = _window.upper;
  							window.lower = window.upper - window.size;
  						}

  			// assign normalized input values to _window, default to existing value or reasonable default value
  			_window.size = isInt(window.size) ? window.size : isInt(_window.size) ? _window.size : _dataLength();
  			_window.lower = isInt(window.lower) ? window.lower : isInt(_window.lower) ? _window.lower : 0;
  			_window.upper = isInt(window.upper) ? window.upper : isInt(_window.upper) ? _window.upper : _window.lower + _window.size;

  			/** Correct and adjust values if necessary **/

  			// lower bound must be between zero and max length - 1
  			_window.lower = Math.max(0, Math.min(_window.lower, _dataLength() - 1));

  			// set upper bound relative to lower based on window size,
  			// but not greater than _data.length
  			_window.upper = Math.min(_window.lower + _window.size, _dataLength());

  			// if upper is at max and there's more data than window size
  			// make sure we are showing a full windows worth of data
  			// by adjusting the lower bound
  			if (_window.upper == _dataLength() && _dataLength() > _window.size && _window.upper - _window.lower < _window.size) {
  				_window.lower = _window.upper - _window.size;
  			}
  		};

  		// public members, privileged members

  		this.window = function (_) {
  			if (!arguments.length) {
  				return _window;
  			}
  			normalizeWindow(_);
  			return this;
  		};

  		this.windowLowerBound = function (_) {
  			if (!arguments.length) {
  				return _window.lower;
  			}
  			this.window({ lower: _ });
  			return this;
  		};

  		this.windowUpperBound = function (_) {
  			if (!arguments.length) {
  				return _window.upper;
  			}
  			this.window({ upper: _ });
  			return this;
  		};

  		this.windowSize = function (_) {
  			if (!arguments.length) {
  				return _window.size;
  			}
  			this.window({ size: _ });
  			return this;
  		};

  		this.windowPageUp = function () {
  			this.windowLowerBound(this.windowLowerBound() - this.windowSize());
  			return this;
  		};

  		this.windowPageDown = function () {
  			this.windowLowerBound(this.windowLowerBound() + this.windowSize());
  			return this;
  		};

  		this.windowGoTop = function () {
  			this.windowLowerBound(0);
  			return this;
  		};

  		this.windowGoBottom = function () {
  			this.windowUpperBound(_dataLength());
  			return this;
  		};

  		this.windowGetData = function () {
  			var theData = this.data && this.data() || dummyData;
  			if (theData.length <= this.windowSize()) {
  				return theData;
  			}
  			//normalizeWindow({});
  			return theData.slice(this.windowLowerBound(), this.windowUpperBound());
  		};

  		// init values
  		if (window) {
  			this.window(window);
  		} else if (windowSize) {
  			this.windowSize(windowSize);
  		} else {
  			this.window({});
  		}
  	}; // end init

  	var hasDataWindowStamp = compose({
  		initializers: [init]
  	});

  	return hasDataWindowStamp;
  }

  /* UX standards & constants */

  function isMobileDisplay() {
  	return d3.min([screen.width, screen.height]) < 1200;
  }

  var UXConstants = {
  	minimumBarHeight: 12, //Desktop
  	minimumBarSpacing: 14,

  	minimumBarTouchTargetHeight: 20, //Mobile
  	minimumBarTouchTargetWidth: 60,
  	minimumBarTouchTargetSpacing: 30,
  	minimumIconButtonTouchTargetWidth: 29,
  	minimumIconButtonTouchTargetHeight: 29,

  	defaultFontColor: '#212529',
  	deselectedFontColor: '#0D47A1',

  	deselectedFillColor: '#DAE0E5',

  	ascending: 1,
  	descending: -1,

  	orderByKey: 'orderByKey',
  	orderByValue: 'orderByValue',

  	orientation: {
  		vertical: 1,
  		horizontal: 0
  	},

  	bar: {
  		minHeight: function minHeight() {
  			return isMobileDisplay() ? UXConstants.minimumBarTouchTargetHeight : UXConstants.minimumBarHeight;
  		},
  		minHeightWithPadding: function minHeightWithPadding() {
  			return isMobileDisplay() ? UXConstants.minimumBarTouchTargetSpacing : UXConstants.minimumBarSpacing;
  		}
  	},

  	scrollBar: {
  		widthForDesktop: 12, //17
  		widthForMobile: 20, //29

  		width: function width() {
  			return isMobileDisplay() ? UXConstants.scrollBar.widthForMobile : UXConstants.scrollBar.widthForDesktop;
  		},

  		buttonColor: '#F1F1F1',
  		buttonHoverColor: '#C1C1C1',
  		buttonPressColor: '#A1A1A1',

  		buttonAccentColor: '#505050',
  		buttonHoverAccentColor: '#505050',
  		buttonPressAccentColor: '#FFFFFF',

  		backgroundColor: '#F1F1F1',
  		backgroundHoverColor: '#F1F1F1',
  		backgroundPressColor: '#F1F1F1',

  		sliderColor: '#C1C1C1',
  		sliderHoverColor: '#A1A1A1',
  		sliderPressColor: '#808080',

  		sliderMargin: 2
  	}
  };

  function scrollBarFactory() {

  	var init = function init(_ref) {
  		var svg = _ref.svg,
  		    orientation = _ref.orientation,
  		    top = _ref.top,
  		    left = _ref.left,
  		    length = _ref.length,
  		    pageSize = _ref.pageSize,
  		    total = _ref.total,
  		    pos = _ref.pos;

  		var _svg = svg,
  		    _root,
  		    _top = top || 0,
  		    _left = left || 0,
  		    _left = left || 0,
  		    _width = UXConstants.scrollBar.width(),
  		    _minLength = 3 * _width,
  		    _length = length && length > _minLength ? length : _minLength,
  		    _orientation = orientation || UXConstants.orientation.vertical,
  		    _pos = pos || 0,
  		    _pageSize = pageSize || 5,
  		    _total = total || 10,
  		    _barLength = _length - 2 * _width,
  		    _lengthScale = d3$1.scaleLinear().domain([0, _total]).range([0, _barLength]),
  		    _inverseScale = d3$1.scaleLinear().domain([0, _barLength]).range([0, _total]),
  		    _dispatcher = d3$1.dispatch('changePosition');

  		// private functions

  		function drawArrowButton(svgContext) {
  			svgContext.append('rect').attr('class', 'scroll-btn-area').attr('x', 0).attr('y', 0).attr('width', _width).attr('height', _width).attr('fill', UXConstants.scrollBar.buttonColor);

  			// arrow points
  			var arrowWidth = _width / 2,
  			    marginWidth = arrowWidth / 2,
  			    center = _width / 2,
  			    arrowHeight = arrowWidth / 2,
  			    base = _width * 2 / 3,
  			    a = '' + marginWidth + ',' + base,
  			    b = '' + center + ',' + (base - arrowHeight),
  			    c = '' + (_width - marginWidth) + ',' + base;

  			svgContext.append('polygon').attr('class', 'scroll-btn-arrow').attr('points', a + ',' + b + ',' + c).attr('fill', UXConstants.scrollBar.buttonAccentColor);
  		}

  		function buttonMouseOver() {
  			d3$1.select(this).select('.scroll-btn-area').attr('fill', UXConstants.scrollBar.buttonHoverColor);
  			d3$1.select(this).select('.scroll-btn-arrow').attr('fill', UXConstants.scrollBar.buttonAccentHoverColor);
  		}

  		function buttonMouseOut() {
  			d3$1.select(this).select('.scroll-btn-area').attr('fill', UXConstants.scrollBar.buttonColor);
  			d3$1.select(this).select('.scroll-btn-arrow').attr('fill', UXConstants.scrollBar.buttonAccentColor);
  		}

  		function buttonMouseDown() {
  			d3$1.select(this).select('.scroll-btn-area').attr('fill', UXConstants.scrollBar.buttonPressColor);
  			d3$1.select(this).select('.scroll-btn-arrow').attr('fill', UXConstants.scrollBar.buttonPressAccentColor);
  		}

  		function buttonMouseUp() {
  			// if mouse up, still hovered...
  			d3$1.select(this).select('.scroll-btn-area').attr('fill', UXConstants.scrollBar.buttonHoverColor);
  			d3$1.select(this).select('.scroll-btn-arrow').attr('fill', UXConstants.scrollBar.buttonAccentHoverColor);
  		}

  		function buttonTouchStart() {
  			d3$1.select(this).select('.scroll-btn-area').attr('fill', UXConstants.scrollBar.buttonPressColor);
  			d3$1.select(this).select('.scroll-btn-arrow').attr('fill', UXConstants.scrollBar.buttonPressAccentColor);
  			// Don't propagate this event to the mouse handlers
  			d3$1.event.preventDefault();
  		}

  		function buttonTouchEnd(inc) {
  			// This will do the same as mouseup AND click handlers
  			return function () {
  				var p = _pos + inc;
  				updatePosition(p);

  				d3$1.select(this).select('.scroll-btn-area').attr('fill', UXConstants.scrollBar.buttonColor);
  				d3$1.select(this).select('.scroll-btn-arrow').attr('fill', UXConstants.scrollBar.buttonAccentColor);
  				// Don't propagate this event to the mouse handlers
  				d3$1.event.preventDefault();
  			};
  		}

  		function onEventChangeFill(fill) {
  			return function () {
  				d3$1.select(this).attr('fill', fill);
  			};
  		}

  		function updatePosition(p) {
  			// Sanity check...
  			if (p < 0) p = 0;
  			if (p > total - pageSize) p = total - pageSize;

  			_pos = p;

  			_root.select('.scroll-area-prev').attr('height', _lengthScale(_pos));

  			_root.select('.scroll-area-next').attr('y', _lengthScale(_pos + _pageSize)).attr('height', _lengthScale(_total - (_pos + _pageSize)));

  			_root.select('.scroll-slider').attr('y', _lengthScale(_pos));

  			_dispatcher.call('changePosition', this, Math.round(_pos));
  		}

  		function dragUpdatePosition() {

  			var p = _pos + _inverseScale(d3$1.event.dy);

  			updatePosition(p);
  		}

  		function clickUpdatePostion(inc) {
  			return function () {
  				var p = _pos + inc;

  				updatePosition(p);
  			};
  		}

  		var dragf = d3$1.drag().on('drag', dragUpdatePosition);

  		function drawScrollBar() {
  			var scrollBar = _svg.append('g').attr('class', 'scroll').attr('transform', 'translate(' + _left + ',' + _top + ')');

  			_root = scrollBar;

  			if (orientation == UXConstants.orientation.horizontal) {
  				// rotate and translate
  				scrollBar.attr('transform', 'translate(' + _left + ',' + (_top + _width) + ' ) rotate(270)');
  			}

  			var sliderArea = scrollBar.append('g').attr('class', 'scroll-area').attr('transform', 'translate(0,' + _width + ')');

  			sliderArea.append('rect').attr('x', 0).attr('y', 0).attr('width', _width).attr('height', _barLength).attr('fill', UXConstants.scrollBar.backgroundColor);

  			// area before slider
  			sliderArea.append('rect').attr('class', 'scroll-area-prev').attr('transform', 'translate(' + UXConstants.scrollBar.sliderMargin + ',0)').attr('x', 0).attr('y', 0).attr('width', _width - 2 * UXConstants.scrollBar.sliderMargin).attr('height', _lengthScale(_pos)).attr('fill', UXConstants.scrollBar.backgroundColor).on('click', clickUpdatePostion(-pageSize));

  			// slider
  			sliderArea.append('rect').attr('class', 'scroll-slider').attr('transform', 'translate(' + UXConstants.scrollBar.sliderMargin + ',0)').attr('x', 0).attr('y', _lengthScale(_pos)).attr('width', _width - 2 * UXConstants.scrollBar.sliderMargin).attr('height', _lengthScale(_pageSize)).attr('fill', UXConstants.scrollBar.sliderColor).on('mouseover', onEventChangeFill(UXConstants.scrollBar.sliderHoverColor)).on('mouseout', onEventChangeFill(UXConstants.scrollBar.sliderColor)).on('mousedown', onEventChangeFill(UXConstants.scrollBar.sliderPressColor)).on('mouseup', onEventChangeFill(UXConstants.scrollBar.sliderColor)).call(dragf);

  			// area after slider
  			sliderArea.append('rect').attr('class', 'scroll-area-next').attr('transform', 'translate(' + UXConstants.scrollBar.sliderMargin + ',0)').attr('x', 0).attr('y', _lengthScale(_pos + _pageSize)).attr('width', _width - 2 * UXConstants.scrollBar.sliderMargin).attr('height', _lengthScale(_total - (_pos + _pageSize))).attr('fill', UXConstants.scrollBar.backgroundColor).on('click', clickUpdatePostion(pageSize));

  			var prevButton = scrollBar.append('g').attr('class', 'scroll-prev').on('mouseover', buttonMouseOver).on('mouseout', buttonMouseOut).on('mousedown', buttonMouseDown).on('mouseup', buttonMouseUp).on('touchstart', buttonTouchStart).on('touchend', buttonTouchEnd(-1)).on('click', clickUpdatePostion(-1));

  			drawArrowButton(prevButton);

  			var nextButton = scrollBar.append('g').attr('class', 'scroll-next').attr('transform', 'translate(' + _width + ',' + _length + ') rotate(180)').on('mouseover', buttonMouseOver).on('mouseout', buttonMouseOut).on('mousedown', buttonMouseDown).on('mouseup', buttonMouseUp).on('touchstart', buttonTouchStart).on('touchend', buttonTouchEnd(1)).on('click', clickUpdatePostion(1));

  			drawArrowButton(nextButton);
  		}

  		// public members
  		// privileged methods
  		this.draw = function () {
  			// reset the width just in case
  			_width = UXConstants.scrollBar.width();
  			drawScrollBar();
  			return this;
  		};
  		this.position = function (_) {
  			if (!arguments.length) {
  				return _pos;
  			}
  			updatePosition(_);
  			return this;
  		};
  		this.positionChangePx = function (px) {
  			var p = this.position() + _inverseScale(px);
  			updatePosition(p);
  			return this;
  		};
  		this.on = function () {
  			var value = _dispatcher.on.apply(_dispatcher, arguments);
  			return value === _dispatcher ? this : value;
  		};
  	}; // end init

  	// factory descriptor
  	var factoryDesc = {
  		initializers: [init]
  	};

  	return compose(factoryDesc);
  }

  var scrollBar = scrollBarFactory();

  function rowChartFactory() {

  	var init = function init() {
  		var _xScale,
  		    _yScale,
  		    _xAxis,
  		    _defaultColors = d3$1.scaleQuantize().range(['#68B3E4']),
  		    _colors = _defaultColors,
  		    _fontSize,
  		    _paddingPercent = 0.05,
  		    _scrollBar,
  		    _selections = [],
  		    _dispatcher = d3$1.dispatch('selectionChange'),
  		    _tip = null,
  		    _formatTip = null,
  		    _matchString,
  		    _orderBy = UXConstants.orderByValue,
  		    _orderDirection = UXConstants.descending;

  		// private functions

  		var setDefaultDimensions = function () {
  			// bar dimension and padding are all relative to the font size
  			_fontSize = parseFloat(getComputedStyle(this.getParent().node()).fontSize);

  			// minimum bar height with padding is 1.5 times fontsize or minBarHeightWithPadding (30px)
  			var minBarH = Math.max(UXConstants.bar.minHeightWithPadding(), 1.5 * _fontSize);
  			var windowSize = Math.floor(this.effectiveHeight() / (minBarH * (1 + _paddingPercent))); // minimum spacing between rows with padding

  			this.windowSize(windowSize);
  		}.bind(this);

  		var buildScales = function () {
  			setDefaultDimensions();

  			var theData = this.windowGetData();

  			// get domain for y from data or default to dummy values
  			var yDomain = theData.map(this.keyAccessor());
  			_yScale = d3$1.scaleBand().domain(yDomain).rangeRound([this.effectiveHeight(), 0]).padding(_paddingPercent);

  			_xScale = d3$1.scaleLinear().domain(adjustedValueDomain(theData, this.metricAccessor())).range([0, this.effectiveWidth()]);
  		}.bind(this);

  		var adjustedValueDomain = function adjustedValueDomain(theData, valueAccessor) {
  			// get max and min values from data or default to dummy values
  			var min = d3$1.min(theData, valueAccessor);
  			var max = d3$1.max(theData, valueAccessor);
  			// always want 0 included the domain
  			min = min < 0 ? min : 0;
  			max = max > 0 ? max : 0;
  			// don't want domain to be empty (i.e. 1 value)
  			max = max == min ? min + 1 : max;

  			return [min, max];
  		};

  		var refreshScales = function () {
  			var theData = this.windowGetData();
  			_yScale.domain(theData.map(this.keyAccessor()));
  			_xScale.domain(adjustedValueDomain(theData, this.metricAccessor()));
  		}.bind(this);

  		var buildAxis = function buildAxis() {
  			// only need x axis at bottom of chart
  			_xAxis = d3$1.axisBottom(_xScale).tickFormat(d3$1.format('.2~s'));
  		};

  		var buildSVG = function () {
  			var svg = this.getSvg().classed('bar-chart', true);
  			buildGroups();

  			svg.transition().attr('width', this.width()).attr('height', this.height());
  		}.bind(this);

  		var buildGroups = function () {
  			var svg = this.getSvg();
  			var container = svg.append('g').classed('container-group', true).attr('transform', 'translate(' + this.margins().left + ',' + this.margins().top + ')');
  			container.append('g').classed('chart-group', true);
  			container.append('g').classed('x-axis-group axis', true);

  			// add mouse wheel listener to container group
  			container.on(wheelEvent(), function () {
  				if (_scrollBar) {
  					_scrollBar.positionChangePx(d3$1.event.wheelDelta);
  					// prevent default action so page doesn't scroll too
  					d3$1.event.preventDefault();
  				}
  			});
  		}.bind(this);

  		var drawBars = function () {
  			var _chart = this; // for callbacks
  			var svg = this.getSvg();

  			var bars = svg.select('.chart-group').selectAll('.bar').data(this.windowGetData());
  			// Enter
  			bars.enter().append('g').classed('bar', true).on('touchend', twoStepTouchHandler).on('click', function (d, i) {
  				// toggle selection and redraw
  				toggleSelected(d);
  				_chart.redraw();
  			}).on('mouseover', function (d, i) {
  				if (d3$1.tip && _tip) {
  					d3$1.select(this).select('.visible-bar').call(highlightBarStyle(true));
  					_tip.show(d, i, this);
  				}
  			}).on('mouseout', function (d, i) {
  				if (d3$1.tip && _tip) {
  					d3$1.select(this).select('.visible-bar').call(highlightBarStyle(false));
  					_tip.hide(d, i, this);
  				}
  			}).call(function (parent) {
  				// default target area - invisible rect
  				// need to create it before visible rect
  				// and text so it underlies the rect and text
  				parent.append('rect').classed('invisible-bar', true).attr('height', _yScale.bandwidth()).attr('width', boundingBoxWidth).attr('x', function (d) {
  					return _chart.metricAccessor()(d) < 0 ? _xScale(_chart.metricAccessor()(d)) : _xScale(0);
  				}).attr('y', function (d) {
  					return _chart.effectiveHeight() - _yScale(_chart.keyAccessor()(d)) - _yScale.bandwidth();
  				}).attr('fill', '#FFFFFF') // need a fill to make it selectable
  				.style('opacity', 0); // but don't want to actually see it...

  				// draw the rectangle
  				parent.append('rect').classed('visible-bar', true).transition().attr('height', _yScale.bandwidth()).attr('x', function (d) {
  					return _chart.metricAccessor()(d) < 0 ? _xScale(_chart.metricAccessor()(d)) : _xScale(0);
  				}).attr('y', function (d) {
  					return _chart.effectiveHeight() - _yScale(_chart.keyAccessor()(d)) - _yScale.bandwidth();
  				}).attr('width', function (d) {
  					return Math.abs(_xScale(_chart.metricAccessor()(d)));
  				}).attr('fill', function (d) {
  					return showSelected(d) ? _colors(_chart.metric2Accessor()(d)) : UXConstants.deselectedFillColor;
  				}).call(highlightBarStyle(false));

  				// draw the text
  				parent.append('text').classed('bar-label', true).transition().attr('dx', '0.5em').attr('x', function (d) {
  					return _chart.metricAccessor()(d) < 0 ? _xScale(_chart.metricAccessor()(d)) : _xScale(0);
  				}).attr('y', function (d) {
  					return _chart.effectiveHeight() - _yScale(_chart.keyAccessor()(d)) - 0.5 * _yScale.bandwidth() + 0.25 * _fontSize;
  				}).style('text-anchor', 'start').style('fill', function (d) {
  					return showSelected(d) ? UXConstants.defaultFontColor : UXConstants.deselectedFontColor;
  				}).style('font-weight', function (d) {
  					return highlightLabelStyle(isMatch(d), true);
  				}).text(_chart.labelAccessor());
  			});

  			// Update
  			bars.transition().call(function (parent) {
  				// update rectangle
  				parent.select('rect.visible-bar').transition().attr('height', _yScale.bandwidth()).attr('x', function (d) {
  					return _chart.metricAccessor()(d) < 0 ? _xScale(_chart.metricAccessor()(d)) : _xScale(0);
  				}).attr('y', function (d) {
  					return _chart.effectiveHeight() - _yScale(_chart.keyAccessor()(d)) - _yScale.bandwidth();
  				}).attr('width', function (d) {
  					return Math.abs(_xScale(_chart.metricAccessor()(d)));
  				}).attr('fill', function (d) {
  					return showSelected(d) ? _colors(_chart.metric2Accessor()(d)) : UXConstants.deselectedFillColor;
  				}).call(highlightBarStyle(false));

  				// update the text
  				parent.select('text').transition().attr('dx', '0.5em').attr('x', function (d) {
  					return _chart.metricAccessor()(d) < 0 ? _xScale(_chart.metricAccessor()(d)) : _xScale(0);
  				}).attr('y', function (d) {
  					return _chart.effectiveHeight() - _yScale(_chart.keyAccessor()(d)) - 0.5 * _yScale.bandwidth() + 0.25 * _fontSize;
  				}).style('text-anchor', 'start').style('fill', function (d) {
  					return showSelected(d) ? UXConstants.defaultFontColor : UXConstants.deselectedFontColor;
  				}).style('font-weight', function (d) {
  					return highlightLabelStyle(isMatch(d), true);
  				}).text(_chart.labelAccessor());

  				// now make sure the width of the invisible rect 
  				// encompasses width of visible rect and text or
  				// at least minimum width
  				parent.select('rect.invisible-bar').attr('x', function (d) {
  					return _chart.metricAccessor()(d) < 0 ? _xScale(_chart.metricAccessor()(d)) : _xScale(0);
  				}).attr('y', function (d) {
  					return _chart.effectiveHeight() - _yScale(_chart.keyAccessor()(d)) - _yScale.bandwidth();
  				}).attr('height', _yScale.bandwidth()).attr('width', boundingBoxWidth);
  			});

  			// Exit
  			bars.exit().transition().remove();
  		}.bind(this);

  		var boundingBoxWidth = function (d) {

  			var visBarWidth = Math.abs(_xScale(this.metricAccessor()(d))); // bar width

  			// estimate based on font size and character count instead
  			// empirical estimates suggest average char width is 45% of font size
  			var textWidth = (this.labelAccessor()(d).length + 1) * _fontSize * 0.45;

  			// return the maximum of the widths above and minimum width
  			// but don't exceed the maximum width available for the bar
  			return d3$1.min([this.effectiveWidth(), d3$1.max([visBarWidth, textWidth, UXConstants.minimumBarTouchTargetWidth])]);
  		}.bind(this);

  		var drawAxis = function () {
  			var svg = this.getSvg();
  			svg.select('.x-axis-group.axis').transition().attr('transform', 'translate(0,' + this.effectiveHeight() + ')').call(_xAxis);
  		}.bind(this);

  		var drawScrollBar = function () {
  			if (this.data() && this.data().length > this.windowSize()) {
  				_scrollBar = scrollBar({
  					svg: this.getSvg(),
  					pageSize: this.windowSize(),
  					top: this.margins().top,
  					left: this.width() - this.margins().right - UXConstants.scrollBar.width(),
  					length: this.effectiveHeight(),
  					total: this.data().length || 100
  				});
  				var _chart = this; // for callbacks
  				_scrollBar.on('changePosition', function (pos) {
  					_chart.windowLowerBound(pos);
  					_chart.redraw();
  				});
  				_scrollBar.draw();

  				/* turn on find control */
  				turnOnControl('find');
  			} else {
  				/* don't draw a scroll bar and turn off find control */
  				turnOffControl('find');
  			}
  		}.bind(this);

  		/** Selection functions **/
  		var hasSelections = function hasSelections() {
  			return _selections.length > 0;
  		};
  		var isSelected = function isSelected(d) {
  			return _selections.indexOf(d) !== -1;
  		};
  		var showSelected = function showSelected(d) {
  			return !hasSelections() || isSelected(d);
  		};
  		var toggleSelected = function (d) {
  			var idx = _selections.indexOf(d);
  			var ret;
  			if (idx == -1) {
  				// not found so add
  				_selections.push(d);
  				ret = true;
  			} else {
  				// found so remove
  				_selections.splice(idx, 1);
  				ret = false;
  			}

  			/* toggle reset control */
  			if (_selections && _selections.length > 0) {
  				turnOnControl('reset');
  			} else {
  				turnOffControl('reset');
  			}

  			/* notify listeners */
  			_dispatcher.call('selectionChange', this, this.selectionsByKey());
  			return ret;
  		}.bind(this);

  		/** sort function **/
  		var order = function order(orderBy, direction) {
  			_orderBy = orderBy;
  			_orderDirection = direction;
  		};
  		var sort = function () {
  			var orderFunc = _orderBy == UXConstants.orderByKey ? this.keyAccessor() : this.metricAccessor();
  			var dir = _orderDirection == UXConstants.ascending ? UXConstants.ascending : UXConstants.descending;
  			var theData = this.data();
  			theData.sort(function (a, b) {
  				var aa = orderFunc(a),
  				    bb = orderFunc(b);
  				var ret = aa < bb ? -1 : aa > bb ? 1 : 0;
  				return dir * ret;
  			});
  		}.bind(this);

  		/** match functions **/
  		var isMatch = function (d, i, data) {
  			var strMatch = this.matchString();
  			if (strMatch && strMatch.length) {
  				return this.labelAccessor()(d).match(new RegExp('\\b' + strMatch, 'i')) !== null;
  			} else {
  				return false;
  			}
  		}.bind(this);

  		/** Setup tool tip if d3-tip is available **/
  		var enableToolTip = function () {
  			if (d3$1.tip) {
  				_tip = d3$1.tip().attr('class', 'd3-tip');

  				var _chart = this; // for callbacks

  				if (!this.formatTip()) {
  					// default tool tip format function if not yet defined
  					// and will also associate the function to _tip.html
  					this.formatTip(function (d) {
  						var k = _chart.keyAccessor()(d) || 'key';
  						var m = _chart.metricAccessor()(d) || 'value';
  						return '<span>' + k + '</span><br/><span>' + m + '</span>';
  					});
  				}

  				// assign to _tip.html
  				_tip.html(this.formatTip());

  				this.getSvg().call(_tip);

  				// set touchend handler on page to hide any tooltips if touch event occurs outside chart
  				// note: this may mess with other handlers that may be needed on body for touchend...
  				d3$1.select('body').on('touchend', function () {
  					invokeOnLastTarget('mouseout');
  					// clear last touch target
  					lastTouchTarget(null);
  					// catch all to clean up zombie d3-tips
  					d3$1.select('body').selectAll('.d3-tip').style('opacity', 0);
  				});
  			}
  		}.bind(this);

  		/** controls 
    	reset - on/off when selection (filter)
    	find - on/off when need scrollbar
    	sortX - tbd
    **/
  		var turnOnControl = function (ctrl) {
  			this.getParent().selectAll('.' + ctrl).style('display', null);
  		}.bind(this);

  		var turnOffControl = function (ctrl) {
  			this.getParent().selectAll('.' + ctrl).style('display', 'none');
  		}.bind(this);

  		// public members
  		// privileged methods
  		this.colors = function (_) {
  			if (!arguments.length) {
  				return _colors;
  			}
  			_colors = _ || _defaultColors;
  			return this;
  		};

  		this.formatTip = function (_) {
  			if (!arguments.length) {
  				if (!d3$1.tip) {
  					console.log('ERROR row-chart: Return value for formatTip() is undefined because d3-tip support is not available.');
  					return null;
  				} else {
  					return _formatTip;
  				}
  			}
  			if (_ instanceof Function) {
  				if (!d3$1.tip) {
  					console.log('ERROR row-chart: Cannot assign formatting function in formatTip() because d3-tip support is not available.');
  				} else {
  					_formatTip = _.bind(this);
  				}
  			} else {
  				console.log('ERROR row-chart: Invalid object passed to infoAction(). Must be a function.');
  			}
  			return this;
  		};

  		this.selectionsByKey = function (_) {
  			var keyAcc = this.keyAccessor();
  			if (!arguments.length) {
  				// return the key values for the selected items
  				return _selections.map(function (d) {
  					return keyAcc(d);
  				});
  			}
  			if (_ instanceof Array) {
  				_selections = [];
  				for (var i = 0; i < _.length; i++) {
  					var key = _[i];
  					// find all items that match the key and add them to the selection list
  					var matches = this.data().filter(function (d) {
  						return keyAcc(d) == key;
  					});
  					if (matches.length > 0) {
  						for (var j = 0; j < matches.length; j++) {
  							_selections.push(matches[j]);
  						}
  					}
  				}
  				this.redraw();
  				/* toggle reset control */
  				if (_selections && _selections.length > 0) {
  					turnOnControl('reset');
  				} else {
  					turnOffControl('reset');
  				}

  				/* notify listeners */
  				_dispatcher.call('selectionChange', this, _selections.map(function (d) {
  					return keyAcc(d);
  				}));
  			} else {
  				console.log('ERROR row-chart: Invalid object passed to selectionsByKey(). Must be an Array.');
  			}
  			return this;
  		};

  		this.orderBy = function (orderBy, direction) {
  			order(orderBy, direction);
  			sort();
  			this.redraw();
  			return this;
  		};

  		this.reset = function () {
  			// this resets the selections
  			// and redraws the chart 
  			// and turns off the reset control
  			// and notifies listeners of a change
  			this.selectionsByKey([]);
  			return this;
  		};

  		this.findMatches = function (strMatch) {
  			var labAcc = this.labelAccessor();
  			var data = this.data();
  			return data.filter(function (d) {
  				return labAcc(d).match(new RegExp('\\b' + strMatch, 'i'));
  			});
  		};

  		this.selectMatches = function (strMatch) {
  			var matches = this.findMatches(strMatch);
  			if (matches != null && matches.length) {
  				this.selectionsByKey(matches.map(this.keyAccessor()));
  			}
  		};

  		this.matchString = function (_) {
  			if (!arguments.length) {
  				return _matchString;
  			}
  			_matchString = _;
  			return this;
  		};

  		this.find = function (strMatch) {
  			var labAcc = this.labelAccessor();
  			var currPosLower = this.windowLowerBound();
  			var currPosUpper = this.windowUpperBound();
  			var data = this.data();
  			var newPos = null;

  			/* search from current window to end of data */
  			for (var i = currPosUpper; i < data.length && newPos == null; i++) {
  				if (labAcc(data[i]).match(new RegExp('\\b' + strMatch, 'i'))) {
  					newPos = i;
  				}
  			}
  			/* search from start of data to current window position */
  			for (var i = 0; i < currPosLower && newPos == null; i++) {
  				if (labAcc(data[i]).match(new RegExp('\\b' + strMatch, 'i'))) {
  					newPos = i;
  				}
  			}

  			if (newPos !== null && _scrollBar) {
  				/* use scroll bar to set the position
      	as it will also redraw the chart
      */
  				_scrollBar.position(newPos);
  			}

  			return this;
  		};

  		this.effectiveWidth = function () {
  			var w = this.width() - this.margins().left - this.margins().right;
  			// if more data than window size, account for scrollbar
  			if (this.data() && this.data().length > this.windowSize()) {
  				w -= UXConstants.scrollBar.width() + 2 * UXConstants.scrollBar.sliderMargin;
  			}
  			return w;
  		};

  		this.effectiveHeight = function () {
  			return this.height() - this.margins().top - this.margins().bottom;
  		};

  		this.draw = function () {
  			var svg = this.getSvg();
  			if (svg) {
  				svg.selectAll('*').remove();
  			}
  			sort();
  			buildScales();
  			buildAxis();
  			buildSVG();
  			enableToolTip();
  			drawScrollBar();
  			drawBars();
  			drawAxis();
  			return this;
  		};

  		this.redraw = function () {
  			sort();
  			refreshScales();
  			drawBars();
  			drawAxis();
  			return this;
  		};

  		this.on = function () {
  			var value = _dispatcher.on.apply(_dispatcher, arguments);
  			return value === _dispatcher ? this : value;
  		};
  	}; // end init

  	// factory descriptor
  	var factoryDesc = {
  		initializers: [init]
  	};

  	// compose features ... order may be important, especially for initializers
  	return compose(hasSvgRootFactory()).compose(hasMarginsFactory()).compose(hasDataAccessorsFactory()).compose(hasDataWindowFactory()).compose(factoryDesc);
  }

  var rowChart = rowChartFactory();

  function barChartFactory() {

  	var init = function init() {
  		var _xScale,
  		    _xAltScale,
  		    _yScale,
  		    _yAxis,
  		    _xAxis,
  		    _defaultColors = d3$1.scaleQuantize().range(['#68B3E4']),
  		    _colors = _defaultColors,
  		    _fontSize,
  		    _paddingPercent = 0.05,
  		    _scrollBar,
  		    _selections = [],
  		    _dispatcher = d3$1.dispatch('selectionChange'),
  		    _tip = null,
  		    _formatTip = null,
  		    _matchString,
  		    _continuousDomain,
  		    // implies no labels on bars
  		_orderBy = UXConstants.orderByValue,
  		    _orderDirection = UXConstants.descending;

  		// private functions

  		var setDefaultDimensions = function () {
  			if (!_continuousDomain) {
  				// Then we will be displaying labels on bars...
  				// bar dimension and padding are all relative to the font size
  				_fontSize = parseFloat(getComputedStyle(this.getParent().node()).fontSize);

  				// minimum bar width with padding is 1.5 times fontsize or minBarHeightWithPadding (30px)
  				var minBarH = Math.max(UXConstants.bar.minHeightWithPadding(), 1.5 * _fontSize);
  				var windowSize = Math.floor(this.effectiveWidth() / (minBarH * (1 + _paddingPercent))); // minimum spacing between rows with padding

  				this.windowSize(windowSize);
  			} else {
  				// No labels, so minimum bar width may be less
  				// will differ between desktop and mobile

  				var minBarW = UXConstants.bar.minHeight();
  				var windowSize = Math.floor(this.effectiveWidth() / (minBarW * (1 + _paddingPercent))); // minimum spacing between columns with padding

  				this.windowSize(windowSize);
  			}
  		}.bind(this);

  		var buildScales = function () {
  			setDefaultDimensions();

  			var theData = this.windowGetData();

  			if (!_continuousDomain) {
  				// Assume domain is ordinal - use scale band
  				// get domain for x from data or default to dummy values
  				var xDomain = theData.map(this.keyAccessor());
  				_xScale = d3$1.scaleBand().domain(xDomain).rangeRound([0, this.effectiveWidth()]).padding(_paddingPercent);
  			} else {
  				// continuous domain, e.g.: dates, numbers
  				var xDomain = d3$1.extent(theData.map(this.keyAccessor()));
  				var xAltDomain = [];
  				var xExtDomain = [];

  				if (xDomain[0] instanceof Date) {
  					// date
  					_xScale = d3$1.scaleUtc();

  					for (var d = new Date(xDomain[0]); d <= xDomain[1]; d.setDate(d.getDate() + 1)) {
  						xAltDomain.push(new Date(d));
  					}

  					var a = new Date(xDomain[0]);
  					var b = new Date(xDomain[1]);
  					a.setHours(a.getHours() - 12);
  					b.setHours(b.getHours() + 12);
  					xExtDomain = [a, b];
  				} else {
  					// number
  					_xScale = d3$1.scaleLinear();

  					for (var i = xDomain[0]; i <= xDomain[1]; i++) {
  						xAltDomain.push(i);
  					}

  					xExtDomain = [xDomain[0] - 0.5, xDomain[1] + 0.5];
  				}

  				_xScale.domain(xExtDomain).rangeRound([0, this.effectiveWidth()]);

  				_xAltScale = d3$1.scaleBand().domain(xAltDomain).rangeRound([0, this.effectiveWidth()]).padding(_paddingPercent);
  			}

  			_yScale = d3$1.scaleLinear().domain(adjustedValueDomain(theData, this.metricAccessor())).range([this.effectiveHeight(), 0]);
  		}.bind(this);

  		var adjustedValueDomain = function adjustedValueDomain(theData, valueAccessor) {
  			// get max and min values from data or default to dummy values
  			var min = d3$1.min(theData, valueAccessor);
  			var max = d3$1.max(theData, valueAccessor);
  			// always want 0 included the domain
  			min = min < 0 ? min : 0;
  			max = max > 0 ? max : 0;
  			// don't want domain to be empty (i.e. 1 value)
  			max = max == min ? min + 1 : max;

  			return [min, max];
  		};

  		var refreshScales = function () {
  			var theData = this.windowGetData();
  			if (!_continuousDomain) {
  				var xDomain = theData.map(this.keyAccessor());
  				_xScale.domain(xDomain);
  			} else {
  				// continuous domain e.g. dates and numbers
  				var xDomain = d3$1.extent(theData.map(this.keyAccessor()));
  				var xAltDomain = [];
  				var xExtDomain = [];

  				if (xDomain[0] instanceof Date) {
  					// date
  					for (var d = new Date(xDomain[0]); d <= xDomain[1]; d.setDate(d.getDate() + 1)) {
  						xAltDomain.push(new Date(d));
  					}

  					var a = new Date(xDomain[0]);
  					var b = new Date(xDomain[1]);
  					a.setHours(a.getHours() - 12);
  					b.setHours(b.getHours() + 12);
  					xExtDomain = [a, b];
  				} else {
  					//number
  					for (var i = xDomain[0]; i <= xDomain[1]; i++) {
  						xAltDomain.push(i);
  					}

  					xExtDomain = [xDomain[0] - 0.5, xDomain[1] + 0.5];
  				}

  				_xScale.domain(xExtDomain);
  				_xAltScale.domain(xAltDomain);
  			}

  			_yScale.domain(adjustedValueDomain(theData, this.metricAccessor()));
  		}.bind(this);

  		var buildAxis = function buildAxis() {
  			// only need y axis at left of chart
  			_yAxis = d3$1.axisLeft(_yScale).tickFormat(d3$1.format('.2~s'));

  			if (_continuousDomain) {
  				// only need x axis if continuous domain
  				_xAxis = d3$1.axisBottom(_xScale);

  				// adjust ticks if we have dates
  				if (_xScale.domain()[0] instanceof Date) {
  					// Postal week start == Saturday
  					_xAxis.ticks(d3$1.utcSaturday);
  				} else {
  					_xAxis.tickFormat(d3$1.format('.2~s'));
  				}
  			}
  		};

  		var buildSVG = function () {
  			var svg = this.getSvg().classed('bar-chart', true);
  			buildGroups();

  			svg.transition().attr('width', this.width()).attr('height', this.height());
  		}.bind(this);

  		var buildGroups = function () {
  			var svg = this.getSvg();
  			var container = svg.append('g').classed('container-group', true).attr('transform', 'translate(' + this.margins().left + ',' + this.margins().top + ')');
  			container.append('g').classed('chart-group', true);
  			container.append('g').classed('y-axis-group axis', true);
  			if (_continuousDomain) {
  				container.append('g').attr('transform', 'translate(0,' + this.effectiveHeight() + ')').classed('x-axis-group axis', true);
  			}

  			// add mouse wheel listener to container group
  			container.on(wheelEvent(), function () {
  				if (_scrollBar) {
  					_scrollBar.positionChangePx(d3$1.event.wheelDelta);
  					// prevent default action so page doesn't scroll too
  					d3$1.event.preventDefault();
  				}
  			});
  		}.bind(this);

  		var bandWidth = function (d, i, data) {
  			if (!_continuousDomain) {
  				return _xScale.bandwidth();
  			} else {
  				return _xAltScale.bandwidth();
  			}
  		}.bind(this);

  		var bandX = function (d, i, data) {
  			if (!_continuousDomain) {
  				return _xScale(this.keyAccessor()(d));
  			} else {
  				return _xScale(this.keyAccessor()(d)) - bandWidth(d, i, data) / 2;
  			}
  		}.bind(this);

  		var drawBars = function () {
  			var _chart = this; // for callbacks
  			var svg = this.getSvg();

  			var bars = svg.select('.chart-group').selectAll('.bar').data(this.windowGetData());

  			// Enter
  			bars.enter().append('g').classed('bar', true).on('touchend', twoStepTouchHandler).on('click', function (d, i) {
  				// toggle selection and redraw
  				toggleSelected(d);
  				_chart.redraw();
  			}).on('mouseover', function (d, i) {
  				if (d3$1.tip && _tip) {
  					d3$1.select(this).select('.visible-bar').call(highlightBarStyle(true));
  					_tip.show(d, i, this);
  				}
  			}).on('mouseout', function (d, i) {
  				if (d3$1.tip && _tip) {
  					d3$1.select(this).select('.visible-bar').call(highlightBarStyle(false));
  					_tip.hide(d, i, this);
  				}
  			}).call(function (parent) {
  				// default target area - invisible rect
  				// need to create it before visible rect
  				// and text so it underlies the rect and text
  				parent.append('rect').classed('invisible-bar', true).attr('width', bandWidth).attr('x', bandX).attr('y', function (d) {
  					return boundingBoxCoords(d).y;
  				}).attr('height', function (d) {
  					return boundingBoxCoords(d).height;
  				}).attr('fill', '#FFFFFF') // need a fill to make it selectable
  				.style('opacity', 0); // but don't want to actually see it...

  				// draw the rectangle
  				parent.append('rect').classed('visible-bar', true).transition().attr('width', bandWidth).attr('y', function (d) {
  					return _yScale(_chart.metricAccessor()(d));
  				}).attr('x', bandX).attr('height', function (d) {
  					return _chart.effectiveHeight() - _yScale(_chart.metricAccessor()(d));
  				}).attr('fill', function (d) {
  					return showSelected(d) ? _colors(_chart.metric2Accessor()(d)) : UXConstants.deselectedFillColor;
  				}).call(highlightBarStyle(false));

  				if (!_continuousDomain) {
  					// draw the text
  					parent.append('text').classed('bar-label', true).transition().attr('x', function (d) {
  						return -_chart.effectiveHeight();
  					}).attr('y', function (d) {
  						return _xScale(_chart.keyAccessor()(d)) + _xScale.bandwidth() / 2 + _fontSize / 2;
  					}).style('text-anchor', 'start').style('fill', function (d) {
  						return showSelected(d) ? UXConstants.defaultFontColor : UXConstants.deselectedFontColor;
  					}).attr('transform', 'rotate(270)').attr('dx', '0.5em').style('font-weight', function (d) {
  						return highlightLabelStyle(isMatch(d), true);
  					}).text(_chart.labelAccessor());
  				}
  			}); //Enter


  			// Update
  			bars.transition().call(function (parent) {
  				// update rectangle
  				parent.select('rect.visible-bar').transition().attr('width', bandWidth).attr('y', function (d) {
  					return _yScale(_chart.metricAccessor()(d));
  				}).attr('x', bandX).attr('height', function (d) {
  					return _chart.effectiveHeight() - _yScale(_chart.metricAccessor()(d));
  				}).attr('fill', function (d) {
  					return showSelected(d) ? _colors(_chart.metric2Accessor()(d)) : UXConstants.deselectedFillColor;
  				}).call(highlightBarStyle(false));

  				if (!_continuousDomain) {
  					// update the text
  					parent.select('text').transition().attr('x', function (d) {
  						return -_chart.effectiveHeight();
  					}).attr('y', function (d) {
  						return _xScale(_chart.keyAccessor()(d)) + _xScale.bandwidth() / 2 + _fontSize / 2;
  					}).style('text-anchor', 'start').style('fill', function (d) {
  						return showSelected(d) ? UXConstants.defaultFontColor : UXConstants.deselectedFontColor;
  					}).attr('transform', 'rotate(270)').attr('dx', '0.5em').style('font-weight', function (d) {
  						return highlightLabelStyle(isMatch(d), true);
  					}).text(_chart.labelAccessor());
  				}

  				// now make sure the dimensions of the invisible rect 
  				// encompasses dimensions of visible rect and text or
  				// at least minimum width (height)
  				parent.select('rect.invisible-bar').attr('x', bandX).attr('width', bandWidth).attr('y', function (d) {
  					return boundingBoxCoords(d).y;
  				}).attr('height', function (d) {
  					return boundingBoxCoords(d).height;
  				});
  			});

  			// Exit
  			bars.exit().transition().remove();
  		}.bind(this);

  		var boundingBoxCoords = function (d) {

  			var visBarY = Math.abs(_yScale(this.metricAccessor()(d)));

  			var textY = 100000; // crazy default so this value not used if continuous domain (no labels on bars)
  			if (!_continuousDomain) {
  				// estimate based on font size and character count instead
  				// empirical estimates suggest average char width is 45% of font size
  				textY = this.effectiveHeight() - (this.labelAccessor()(d).length + 1) * _fontSize * 0.45;
  			}

  			// account for minimum touch bar height
  			var minTouchY = this.effectiveHeight() - UXConstants.minimumBarTouchTargetWidth;

  			// return the minimum of the Ys above
  			// but don't go less than zero
  			var Y = d3$1.max([0, d3$1.min([visBarY, textY, minTouchY])]);

  			var H = this.effectiveHeight() - Y;

  			return { y: Y, height: H };
  		}.bind(this);

  		var drawAxis = function () {
  			var svg = this.getSvg();
  			svg.select('.y-axis-group.axis').transition().call(_yAxis);

  			if (_continuousDomain) {
  				svg.select('.x-axis-group.axis').transition().call(_xAxis);
  			}
  		}.bind(this);

  		var drawScrollBar = function () {
  			if (this.data() && this.data().length > this.windowSize()) {
  				_scrollBar = scrollBar({
  					svg: this.getSvg(),
  					pageSize: this.windowSize(),
  					orientation: UXConstants.orientation.horizontal,
  					top: this.height() - (!_continuousDomain ? this.margins().bottom : 0) - UXConstants.scrollBar.width(),
  					left: this.margins().left,
  					length: this.effectiveWidth(),
  					total: this.data().length || 100
  				});
  				var _chart = this; // for callbacks
  				_scrollBar.on('changePosition', function (pos) {
  					_chart.windowLowerBound(pos);
  					_chart.redraw();
  				});
  				_scrollBar.draw();

  				/* turn on find control */
  				turnOnControl('find');
  			} else {
  				/* don't draw a scroll bar and turn off find control */
  				turnOffControl('find');
  			}
  		}.bind(this);

  		/** Selection functions **/
  		var hasSelections = function hasSelections() {
  			return _selections.length > 0;
  		};
  		var isSelected = function isSelected(d) {
  			return _selections.indexOf(d) !== -1;
  		};
  		var showSelected = function showSelected(d) {
  			return !hasSelections() || isSelected(d);
  		};
  		var toggleSelected = function (d) {
  			var idx = _selections.indexOf(d);
  			var ret;
  			if (idx == -1) {
  				// not found so add
  				_selections.push(d);
  				ret = true;
  			} else {
  				// found so remove
  				_selections.splice(idx, 1);
  				ret = false;
  			}

  			/* toggle reset control */
  			if (_selections && _selections.length > 0) {
  				turnOnControl('reset');
  			} else {
  				turnOffControl('reset');
  			}

  			/* notify listeners */
  			_dispatcher.call('selectionChange', this, this.selectionsByKey());
  			return ret;
  		}.bind(this);

  		/** sort function **/
  		var order = function order(orderBy, direction) {
  			_orderBy = orderBy;
  			_orderDirection = direction;
  		};
  		var sort = function () {
  			var orderFunc = _orderBy == UXConstants.orderByKey ? this.keyAccessor() : this.metricAccessor();
  			var dir = _orderDirection == UXConstants.ascending ? UXConstants.ascending : UXConstants.descending;
  			var theData = this.data();
  			theData.sort(function (a, b) {
  				var aa = orderFunc(a),
  				    bb = orderFunc(b);
  				var ret = aa < bb ? -1 : aa > bb ? 1 : 0;
  				return dir * ret;
  			});
  		}.bind(this);

  		/** match functions **/
  		var isMatch = function (d, i, data) {
  			var strMatch = this.matchString();
  			if (strMatch && strMatch.length) {
  				return this.labelAccessor()(d).match(new RegExp('\\b' + strMatch, 'i')) !== null;
  			} else {
  				return false;
  			}
  		}.bind(this);

  		/** Setup tool tip if d3-tip is available **/
  		var enableToolTip = function () {
  			if (d3$1.tip) {
  				_tip = d3$1.tip().attr('class', 'd3-tip');

  				var _chart = this; // for callbacks

  				if (!this.formatTip()) {
  					// default tool tip format function if not yet defined
  					// and will also associate the function to _tip.html
  					this.formatTip(function (d) {
  						var k = _chart.keyAccessor()(d) || 'key';
  						var m = _chart.metricAccessor()(d) || 'value';
  						return '<span>' + k + '</span><br/><span>' + m + '</span>';
  					});
  				}

  				// assign to _tip.html
  				_tip.html(this.formatTip());

  				this.getSvg().call(_tip);

  				// set touchend handler on page to hide any tooltips if touch event occurs outside chart
  				// note: this may mess with other handlers that may be needed on body for touchend...
  				d3$1.select('body').on('touchend', function () {
  					invokeOnLastTarget('mouseout');
  					// clear last touch target
  					lastTouchTarget(null);
  					// catch all to clean up zombie d3-tips
  					d3$1.select('body').selectAll('.d3-tip').style('opacity', 0);
  				});
  			}
  		}.bind(this);

  		/** controls 
    	reset - on/off when selection (filter)
    	find - on/off when need scrollbar
    	sortX - tbd
    **/
  		var turnOnControl = function (ctrl) {
  			this.getParent().selectAll('.' + ctrl).style('display', null);
  		}.bind(this);

  		var turnOffControl = function (ctrl) {
  			this.getParent().selectAll('.' + ctrl).style('display', 'none');
  		}.bind(this);

  		// public members
  		// privileged methods
  		this.colors = function (_) {
  			if (!arguments.length) {
  				return _colors;
  			}
  			_colors = _ || _defaultColors;
  			return this;
  		};

  		this.continuousDomain = function (_) {
  			if (!arguments.length) {
  				return _continuousDomain;
  			}
  			_continuousDomain = _;
  			if (_continuousDomain) {
  				// Only ascending key order makes sense
  				order(UXConstants.orderByKey, UXConstants.ascending);
  			}
  			return this;
  		};

  		this.formatTip = function (_) {
  			if (!arguments.length) {
  				if (!d3$1.tip) {
  					console.log('ERROR row-chart: Return value for formatTip() is undefined because d3-tip support is not available.');
  					return null;
  				} else {
  					return _formatTip;
  				}
  			}
  			if (_ instanceof Function) {
  				if (!d3$1.tip) {
  					console.log('ERROR row-chart: Cannot assign formatting function in formatTip() because d3-tip support is not available.');
  				} else {
  					_formatTip = _.bind(this);
  				}
  			} else {
  				console.log('ERROR row-chart: Invalid object passed to infoAction(). Must be a function.');
  			}
  			return this;
  		};

  		this.selectionsByKey = function (_) {
  			var keyAcc = this.keyAccessor();
  			if (!arguments.length) {
  				// return the key values for the selected items
  				return _selections.map(function (d) {
  					return keyAcc(d);
  				});
  			}
  			if (_ instanceof Array) {
  				_selections = [];
  				for (var i = 0; i < _.length; i++) {
  					var key = _[i];
  					// find all items that match the key and add them to the selection list
  					var matches = this.data().filter(function (d) {
  						return keyAcc(d) == key;
  					});
  					if (matches.length > 0) {
  						for (var j = 0; j < matches.length; j++) {
  							_selections.push(matches[j]);
  						}
  					}
  				}
  				this.redraw();
  				/* toggle reset control */
  				if (_selections && _selections.length > 0) {
  					turnOnControl('reset');
  				} else {
  					turnOffControl('reset');
  				}

  				/* notify listeners */
  				_dispatcher.call('selectionChange', this, _selections.map(function (d) {
  					return keyAcc(d);
  				}));
  			} else {
  				console.log('ERROR row-chart: Invalid object passed to selectionsByKey(). Must be an Array.');
  			}
  			return this;
  		};

  		this.orderBy = function (orderBy, direction) {
  			order(orderBy, direction);
  			sort();
  			this.redraw();
  			return this;
  		};

  		this.reset = function () {
  			// this resets the selections
  			// and redraws the chart 
  			// and turns off the reset control
  			// and notifies listeners of a change
  			this.selectionsByKey([]);
  			return this;
  		};

  		this.findMatches = function (strMatch) {
  			var labAcc = this.labelAccessor();
  			var data = this.data();
  			return data.filter(function (d) {
  				return labAcc(d).match(new RegExp('\\b' + strMatch, 'i'));
  			});
  		};

  		this.selectMatches = function (strMatch) {
  			var matches = this.findMatches(strMatch);
  			if (matches != null && matches.length) {
  				this.selectionsByKey(matches.map(this.keyAccessor()));
  			}
  		};

  		this.matchString = function (_) {
  			if (!arguments.length) {
  				return _matchString;
  			}
  			_matchString = _;
  			return this;
  		};

  		this.find = function (strMatch) {
  			var labAcc = this.labelAccessor();
  			var currPosLower = this.windowLowerBound();
  			var currPosUpper = this.windowUpperBound();
  			var data = this.data();
  			var newPos = null;

  			/* search from current window to end of data */
  			for (var i = currPosUpper; i < data.length && newPos == null; i++) {
  				if (labAcc(data[i]).match(new RegExp('\\b' + strMatch, 'i'))) {
  					newPos = i;
  				}
  			}
  			/* search from start of data to current window position */
  			for (var i = 0; i < currPosLower && newPos == null; i++) {
  				if (labAcc(data[i]).match(new RegExp('\\b' + strMatch, 'i'))) {
  					newPos = i;
  				}
  			}

  			if (newPos !== null && _scrollBar) {
  				/* use scroll bar to set the position
      	as it will also redraw the chart
      */
  				_scrollBar.position(newPos);
  			}

  			return this;
  		};

  		this.effectiveWidth = function () {
  			return this.width() - this.margins().left - this.margins().right;
  		};

  		this.effectiveHeight = function () {
  			var h = this.height() - this.margins().top - this.margins().bottom;
  			// if more data than window size, account for scrollbar
  			if (this.data() && this.data().length > this.windowSize()) {
  				h -= UXConstants.scrollBar.width() + 2 * UXConstants.scrollBar.sliderMargin;
  			}
  			return h;
  		};

  		this.draw = function () {
  			var svg = this.getSvg();
  			if (svg) {
  				svg.selectAll('*').remove();
  			}
  			sort();
  			buildScales();
  			buildAxis();
  			buildSVG();
  			enableToolTip();
  			drawScrollBar();
  			drawBars();
  			drawAxis();
  			return this;
  		};

  		this.redraw = function () {
  			sort();
  			refreshScales();
  			buildAxis();
  			drawBars();
  			drawAxis();
  			return this;
  		};

  		this.on = function () {
  			var value = _dispatcher.on.apply(_dispatcher, arguments);
  			return value === _dispatcher ? this : value;
  		};
  	}; // end init

  	// factory descriptor
  	var factoryDesc = {
  		initializers: [init]
  	};

  	// compose features ... order may be important, especially for initializers
  	return compose(hasSvgRootFactory()).compose(hasMarginsFactory()).compose(hasDataAccessorsFactory()).compose(hasDataWindowFactory()).compose(factoryDesc);
  }

  var barChart = barChartFactory();

  exports.rowChart = rowChart;
  exports.barChart = barChart;
  exports.scrollBar = scrollBar;
  exports.constants = UXConstants;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
