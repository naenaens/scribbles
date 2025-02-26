import { Carousel } from 'react-bootstrap'
import Contact from '../components/Contact';
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../UserContext'


export default function Home() {

	const { user } = useContext(UserContext);
	return (
		<div id="home" className="text-center">
			{
				user.isAdmin?
				<div className='pt-5 pb-4 mt-5 text-center'>
				<Link to='/admin' className="btn product-button mb-2" id="product-btn">
								Hello, Admin. Go to dashboard!
				</Link>
				</div>
				:
				<div className='pt-5 pb-4 mt-5 text-center'>
				<Link to='/products' className="btn product-button mb-2" id="product-btn">
								Shop now!
				</Link>
				</div>

			}
			
			<Carousel fade variant="dark" className ="pb-3">
				<Carousel.Item>
   					 <img
      					className="carousel d-block w-50 mx-auto"
     					src="one.gif"
     			 		alt="First slide"
   			 		/>
 				</Carousel.Item>

  				<Carousel.Item>
   					 <img
      					className="carousel d-block w-50 mx-auto"
      					src="two.gif"
      					alt="Second slide"
    				/>
  				</Carousel.Item>

  				<Carousel.Item>
    				<img
      					className="carousel d-block w-50 mx-auto"
     	 				src="three.gif"
      					alt="Third slide"
    				/>
  				</Carousel.Item>
				  <Carousel.Item>
    				<img
      					className="carousel d-block w-50 mx-auto"
     	 				src="four.gif"
      					alt="Fourth slide"
    				/>
  				</Carousel.Item>
			</Carousel>
			
			<Contact/>
			<Footer/>
	
		</div>
	);
};