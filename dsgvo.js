/*! @license
 * DSGVO/GDPR API
 * Script to include the privacy statement & imprint into websites from a central point
 * copyright Marcel Hauser (https://ice-creme.de/)
*/

let db = [
	{
		key: 'lor3m1p5um',
		id: 1,
		name: 'Lorem ipsum',
    privacy: 'Datenschutzerklärung lorem ipsum ...',
    impressum: 'Impressum lorem ipsum ...'
	}, {
		key: 'asdf142',
		id: 2,
		name: 'Asdf',
    privacy: 'Datenschutzerklärung asdf ...',
    impressum: 'Impressum asdf ...'
	}, {
		key: '5adc3t7',
		id: 3,
		name: 'sad cett',
    privacy: 'Datenschutzerklärung sad cett ...',
    impressum: 'Impressum sad cett ...'
	}
];


var DSGVO = DSGVO || (function() {
	let _args = {}; // private

	return {
		init: function(Args) {
			_args = Args; // get options
		},

    get: function(type, target) {
      return new Promise((res, rej) => {
        const data = this.getData(); // get the data with the key or name from the db

        data.then(data => {
          if (!type && !target) return res(data); // if no arguments are provided => return the raw data

          let targetEl = document.querySelector(target); // select target

          if (!targetEl) return console.error(`DSGVO: target '${target}' not found`);
          if (!data[type]) return console.error(`DSGVO: type '${type}' not found`);

          this.insertData(targetEl, data[type]); // insert the data into the target Element
        })
        .catch(err => console.error('DSGVO:', err));
      });
    },

    getData: function() {
      return new Promise((res, rej) => {
        // // search the db with the key or the name
        // let data = _args.key ? db.find(c => c.key === _args.key) : db.find(c => c.name === _args.name);
				//
        // if (!data) rej('Couldn\'t find client');
        // res(data); // return the data from db

				let request = new XMLHttpRequest();

				request.open('GET', 'getData.php?key=' + _args.key, true);
				request.addEventListener('load', function(e) {
					if (request.status >= 200 && request.status < 300) {
						// console.log(request.responseText);
						res(JSON.parse(request.responseText));
					} else {
						rej('There was an error receiving the data');
					}
				});
				request.send();

      });
    },

    insertData: function(targetEl, content) {
      // targetEl.innerHTML = content;
			content.sort((a, b) => a.position - b.position);
			let elementData = this.getElements();
			elementData.then(data => {
				let html = '';

				content.forEach(block => {
					let blockEl;
					if (block.custom === 1) {
						blockEl = data.customElements.find(b => b.id === block.elementId);
					} else {
						blockEl = data.elements.find(b => b.id === block.elementId);
					}
					html += `<p>${blockEl.content}</p>`;
				});

				targetEl.innerHTML = html;
			});
    },



		getElements: function() {
			return new Promise((res, rej) => {
				let request = new XMLHttpRequest();
				request.open('GET', 'getElements.php', true);
				request.addEventListener('load', function(e) {
					if (request.status >= 200 && request.status < 300) {
						// console.log('element data', request.responseText);
						return res(JSON.parse(request.responseText));
					}
				});
				request.send();
			});
		},
	};
}());
