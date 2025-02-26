import { useContext } from 'react';
import Hero from './../components/Banner'
import {Row, Col, Card, Button, Container} from 'react-bootstrap'
import UserContext from '../UserContext'
import Swal from 'sweetalert2';
import { useState, useEffect }from 'react'
import {Navigate} from 'react-router-dom';
import { Link, useParams } from 'react-router-dom'

const data = {
	title: 'Add Product to cart!',
	content: 'Select purchase product to add it to the cart and click on "Shop Now!" products for more products!'
};

export default function ProductView () {

	const { user } = useContext(UserContext);

	const [productInfo, setProductInfo] = useState({
		name: null,
		description: null,
		price: null,
	})

	const {id} =  useParams()
	const image = {id}.id

	useEffect(() => {
			fetch(`https://immense-fortress-37269.herokuapp.com/products/${id}`).then(res=> res.json()).then(cData => {
			setProductInfo({
				name: cData.name,
				description: cData.description,
				price: cData.price
			})
		})
	},[id])

	const buy =  () => {
		return (
			Swal.fire ({
				icon: "success",
				title: 'Purchased Successfully!',
				text: 'Thank you for patronizing our product',
				confirmButtonColor: '#fc5467'
				})
		);
	};

	return (
		user.isAdmin !== true
		?
		<>
		<div id="product-buy">
			<div className='text-center'>
			<Hero className="text-center" bannerData={data}/>
			</div>
			<Container>
			<Row>
				<Col md={6} sm={12}>
					{<Card.Img className="product pl-2" src={`/${image}.png`}/>}
				</Col>
				<Col md={6} sm={12}>
					<Container>
						<Card className="prod-sing-details text-center m-4 mt-5">
							<Card.Body>
								{/*Course Name*/}
								<Card.Title>
									<h3>{productInfo.name}</h3>
								</Card.Title>
								{/*Course Description*/}
								<Card.Subtitle>
									<h6 className="my-4">Description:</h6>
								</Card.Subtitle>
								<Card.Text>
									{productInfo.description}
								</Card.Text>
								{/*Course Price*/}
								<Card.Subtitle>
									<h6 className="my-4">Price: </h6>
								</Card.Subtitle>
								<Card.Text>
									PHP: {productInfo.price}
								</Card.Text>
							</Card.Body>

							{
								user.id !== null ?
								<Button variant="muted" className="purchase-btn font-weight-bold" onClick={buy}>
								Purchase &#128722;
								</Button> :
								<Link className="purchase-btn-dis btn mb-4 font-weight-bold" to="/login">
								Login to Purchase
								</Link>

							}
												
						</Card>
					</Container>
				</Col>
			</Row>
			</Container>
		</div>
		</>
		:
        <Navigate to="/admin" replace={true} />
	);
};