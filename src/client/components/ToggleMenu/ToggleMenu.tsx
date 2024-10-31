import './ToggleMenu.css';

export const ToggleMenu = () => {
	const toggle = () => {
		if (document.body.classList.contains('showSidebar')) {
			document.body.classList.remove('showSidebar');
		} else {
			document.body.classList.add('showSidebar');
		}
	};

	return (
		<button className="toggle-menu" onClick={toggle}>
			<span></span>
			<span></span>
			<span></span>
		</button>
	);
};
