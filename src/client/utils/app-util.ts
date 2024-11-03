export const toggleSidebar = () => {
	if (document.body.classList.contains('showSidebar')) {
		document.body.classList.remove('showSidebar');
	} else {
		document.body.classList.add('showSidebar');
	}
};
