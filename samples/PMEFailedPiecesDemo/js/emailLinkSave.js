 

		/* email link
		
		   Steps needed in the files using this library:
		   
		   1.  Include a hidden element such as below:
				<div id="hidden-mail-link">
					<a id="mail-link" href="mailto:?to=&subject=Package Delivery Backlog&body=Please have a look at this report">share</a>
				</div>
				
		   2.  Include an email link such as below:
			   <a class="btn" href="javascript:shareLink();" >Email</a>
			   
		   3.  Invoke  setURIfilters(chart, variable) in postLoad()
		
		*/
		
		function shareLink() {
			var emailLink = $('#mail-link');
			var reportTitle = $('#pagetitle').text().trim();
			var body = reportTitle + ': ' + encodeURIComponent(window.location.href)
			var mailHref = 'mailto:?to=&subject=RE: '+reportTitle+'&body='+body;
			emailLink.attr('href',mailHref);
			// for some reason, emailLink.click() doesn't seem to work.
			document.getElementById('mail-link').click(); 
		}
		
		
		var loadFromCookie = (window.location.search == "" && $.cookie(window.location.pathname) != "" && $.cookie(window.location.pathname) != undefined);
		
		function uriUpdateFilteredListener(param) {
			return function(selectedKeys) {
				// update url
				var uri = URI(window.location.href);
				var s = uri.search(true);
				delete s[param];
				if (selectedKeys && selectedKeys.length > 0 && selectedKeys instanceof Array) {
					if (selectedKeys[0] instanceof Date) {
						selectedKeys = selectedKeys.map(function(d){return d3.time.format('%Y-%m-%d')(d);});
					}
					s[param] = selectedKeys;
				}
				uri.search(s);
				window.history.replaceState({path: uri.toString()},' ',uri.toString());
			};
                
		}
		
		function setURIfilters(chart, param){
			
			chart.on('selectionChange.uri', uriUpdateFilteredListener(param));
			
			var p;
			
			if(loadFromCookie && getCookieKey() && $.cookie(getCookieKey())){
				p = URI($.cookie(getCookieKey())).search(true);
			} else{
				p = URI(window.location.href).search(true);
			}
			
		
			if (p[param]) {
				var pval = p[param];
				if (!(pval instanceof Array)) {
					pval = [pval];
				}
				chart.selectionsByKey( pval);
				chart.find(pval[0]); // make sure one selection is visible in the chart
			}
		}
		
		function setCookie(){	
			$.cookie(getCookieKey(), window.location.href, { expires: 365 });
			showNotices();
		}
		
		
		function showNotices(){
				swal({
				  title: ' ',
				  text: '<p>Current Selections Saved!</p> ',
				  html: true,
				  timer: 1200
				});
		}

		getCookieKey = function() {
			return window.location.pathname;
		}
		
		function cookieKey(_f) {
			if (_f && _f instanceof Function) {
				getCookieKey = _f;
			}
			return getCookieKey();
		}

		