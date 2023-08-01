const tabItems = document.querySelectorAll('.tab-item');
const tabContentItems = document.querySelectorAll('.tab-content-item');

//Select tab content item

function selectItem(value) {
	//remove the border
	removeBorder();
	removeShow();
	//add border to current tab
	this.classList.add('tab-border');
	//Grab content item from DOM

	const selectTab = document.querySelector(`#${this.id}-content`);

	//add show class
	selectTab.classList.add('show');
}
// Since javaScript had a feature called Hoisting(Hoisting is JavaScript's default behavior of moving declarations to the top) therefore we can use the variable or function before declaration "Example i have used removeBorder() function before declaring the function"
function removeBorder() {
	tabItems.forEach((item) => item.classList.remove('tab-border'));
}

function removeShow() {
	tabContentItems.forEach((item) => item.classList.remove('show'));
}

tabItems.forEach((item) => item.addEventListener('click', selectItem));
