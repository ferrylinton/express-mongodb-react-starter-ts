import { Link } from 'react-router-dom';
import './Sidebar.css';
import { CollapsibleMenuItem } from './CollapsibleMenuItem';

export const Sidebar = () => {
	return (
		<>
			<div className="sidebar-overlay"></div>
			<aside className="sidebar">
				<div className="sidebar-menu">
					<Link to="/home">Home</Link>
					<CollapsibleMenuItem label={'Profile'}>
						<Link to="/profile">View Profile</Link>
						<Link to="/changepassword">Change Password</Link>
					</CollapsibleMenuItem>
					<CollapsibleMenuItem label={'Todo'}>
						<Link to="/todo">View Todoes</Link>
						<Link to="/todo/create">Create Todo</Link>
					</CollapsibleMenuItem>
				</div>
				<button className="btn btn-primary">Logout</button>
			</aside>
		</>
	);
};
