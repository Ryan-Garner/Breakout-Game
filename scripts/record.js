var SaveScores = {
	persistence : (function () {
		'use strict';
		var highScores = {},
			previousScores = localStorage.getItem('SaveScores.highScores');
		if (previousScores !== null) {
			highScores = JSON.parse(previousScores);
		}

		function add(key, value) {
			highScores[key] = value;
			localStorage['SaveScores.highScores'] = JSON.stringify(highScores);
		}

		function remove(key) {
			delete highScores[key];
			localStorage['SaveScores.highScores'] = JSON.stringify(highScores);
		}
        
        function update(index) {
            var temp1 = 0;
            var temp2 = 0;
            if(index == 1){
                temp1 = highScores[2]
                highScores[2] = highScores[1];
                temp2 = highScores[3]
                highScores[3] = temp1;
                temp1 = highScores[4];
                highScores[4] = temp2;
                highScores[5] = temp1;
            }else if(index == 2){
                temp1 = highScores[3];
                highScores[3] = highScores[2];
                temp2 = highScores[4];
                highScores[4] = temp1;
                highScores[5] = temp2;
            }else if(index == 3){
                temp1 = highScores[4]
                highScores[4] = highScores[3];
                highScores[5] = temp1
            }else if(index == 4){
                highScores[5] = highScores[4];
            }
        }

		function report(high) {
			var node = null;
            node = document.getElementById('one');
            if("undefined" === typeof highScores[1]){
                node.innerHTML = String(0);
                high.one = 0;
            }else{
                node.innerHTML = String(highScores[1]);
                high.one = highScores[1];
            }
            node = document.getElementById('two');
            if("undefined" === typeof highScores[2]){
                node.innerHTML = String(0);
                high.two = 0;
            }else{
                node.innerHTML = String(highScores[2]);
                high.two = highScores[2];
            }
            node = document.getElementById('three');
            if("undefined" === typeof highScores[3]){
                node.innerHTML = String(0);
                high.three = 0;
            }else{
                node.innerHTML = String(highScores[3]);
                high.three = highScores[3];
            }
            node = document.getElementById('four');
            if("undefined" === typeof highScores[4]){
                node.innerHTML = String(4);
                high.four = 0;
            }else{
                node.innerHTML = String(highScores[4]);
                high.four = highScores[4];
            }
            node = document.getElementById('five');
            if("undefined" === typeof highScores[5]){
                node.innerHTML = String(0);
                high.five = 0;
            }else{
                node.innerHTML = String(highScores[5]);
                high.five = highScores[5];
            }
		}

		return {
			add : add,
            update : update,
			remove : remove,
			report : report
		};
	}())
};

function addValue() {
	'use strict';
	
	SaveScores.persistence.add(
		document.getElementById('id-key').value,
		document.getElementById('id-value').value);

	SaveScores.persistence.report();
}

function removeValue() {
	'use strict';
	
	SaveScores.persistence.remove(document.getElementById('id-key').value);
	SaveScores.persistence.report();
}