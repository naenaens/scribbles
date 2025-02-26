import { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap'
import {Link} from 'react-router-dom';
import UserContext from '../UserContext'

function AppNavBar() {

	const { user } = useContext(UserContext);
	
	return(
		<Navbar expand="lg" className='navbar fixed-top'>
			<Container>
				<Navbar.Brand id="navbar-brand"> 
					<Link to="/" className="nav-link" style={{color:"white"}}>
					<img src='scribbles.png' className="w-50" alt="logo"/>
					</Link>	
				 </Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse>
					<Nav className="nav-text ml-auto">

						<Link to="/" className="nav-link" style={{color:"white"}}>
							Home
						</Link>	
						{
							user.isAdmin ?
							<Link to="/admin" className="nav-link" style={{color:"white"}}>
							Admin Dashboard
							</Link>						
							:
							true
						}
							<Link to="/products" className="nav-link" style={{color:"white"}}>
							Products
							</Link>	
						{ user.id !== null ?
							<Link to="/logout" className="nav-link" style={{color:"white"}}>
							Log out
							</Link>	
						:
						<>
							<Link to="/login" className="nav-link" style={{color:"white"}}>
								Login
							</Link>	
							<Link to="/register" className="nav-link" 
							style={
								{color:"white",
								fontWeight:"bold"
							}}>
								Sign up here!
							</Link>		
						</>
						}
					</Nav>
				</Navbar.Collapse>			
			</Container>
		</Navbar>
	);
};

export default AppNavBar;