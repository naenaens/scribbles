import { Card, Container } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export default function ProductCard({productProp}) {
	

	return (
		
			
					<Card className="product-card text-center m-4 d-md-inline-flex d-sm-inline-flex d-lg-inline-flex d-xs-inline-flex">
						<Card.Body className='card-body text-center'>
							<Card.Title><strong>{productProp.name}</strong>								
							</Card.Title>
							<Container className='prod-img image-fluid w-75'>
							<Card.Img src={`/${productProp._id}.png`}/>
							</Container>
							<Card.Text>
								{productProp.description}
							</Card.Text>
							<Card.Text>
								PHP {productProp.price}
							</Card.Text>
							<Link to={`view/${productProp._id}`} className="btn product-button" id="product-btn">
								View Product
							</Link>
						</Card.Body>
					</Card>
		
	)
}