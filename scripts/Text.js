

    function Text(spec, context){
        'use strict';
        var that = {};
        function measureTextHeight(spec) {
			context.save();
			
			context.font = spec.font;
			context.fillStyle = spec.fill;
			context.strokeStyle = spec.stroke;
			
			var height = context.measureText('m').width;
			
			context.restore();
			
			return height;
	    }

        function measureTextWidth(spec) {
                context.save();
                
                context.font = spec.font;
                context.fillStyle = spec.fill;
                context.strokeStyle = spec.stroke;
                
                var width = context.measureText(spec.text).width;
                
                context.restore();
                
                return width;
        }
        
        that.draw = function() {
                context.save();
                        
                context.font = spec.font;
                context.fillStyle = spec.fill;
                context.strokeStyle = spec.stroke;
                context.textBaseline = 'top';

                context.translate(spec.pos.x + that.width / 2, spec.pos.y + that.height / 2);
                context.rotate(spec.rotation);
                context.translate(-(spec.pos.x + that.width / 2), -(spec.pos.y + that.height / 2));

                context.fillText(spec.text, spec.pos.x, spec.pos.y);
                context.strokeText(spec.text, spec.pos.x, spec.pos.y);
                        
                context.restore();
        };
        that.height = measureTextHeight(spec);
	    that.width = measureTextWidth(spec);
        that.pos = spec.pos;

	    return that;
    }
