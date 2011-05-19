/*!
* rfitText.js 0.0.1
*
* Copyright 2011, Jeremy Perret jeremy@devster.org
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
*/

(function($) {

	$.fn.rfitText = function(options) {

		var settings = {
			width: null,
			parent: null,
			step: 1,
			maxsize: null,
			minsize: null
		}

		$.extend(settings, options);
		settings.step = Math.abs(settings.step);

		return this.each(function() {

			var $el = $(this);
			var step = settings.step;
			var pwidth = 0;

			if (! settings.width && ! settings.parent)
				var $parent = $el.parent();

			if (settings.width) {	
				pwidth = parseFloat(settings.width);
			} 
			else {
				if (typeof settings.parent != 'object') {
					var str_error = "No parent `" + settings.parent + "` found";
					$parent = $el.closest(settings.parent);
					if (! $parent.length)
						$.error(str_error);
				}

				pwidth = $parent.width();
			}

			$el.css({whiteSpace: 'nowrap'});
			var cwidth = $el.width();
			var cfs, fs;
			cfs = fs = parseFloat($el.css('font-size'));

			var direction = 'more';
			if (pwidth < cwidth) {
				step = step * -1;
				direction = 'less';
			}

			var total_step = step;
			while (test(cwidth, fs)) {
				fs = cfs + total_step;
				$el.css({fontSize: fs + 'px'});
				cwidth = $el.width();
				total_step += step;
			}

			function test(child_width, current_size) {
				if (direction == 'less') {
					if (! settings.minsize || current_size > settings.minsize)
						return pwidth < child_width;
				}
				else if(direction == 'more') {
					if (! settings.maxsize || current_size < settings.maxsize)
						return pwidth > child_width;
				}

				return false;
			}
		});
	}

})(jQuery);