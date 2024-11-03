import { toggleSidebar } from '../../utils/app-util';
import './ToggleMenu.css';

export const ToggleMenu = () => {
	return (
		<button className="toggle-menu" onClick={() => toggleSidebar()}>
			<span></span>
			<span></span>
			<span></span>
		</button>
	);
};
