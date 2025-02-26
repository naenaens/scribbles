import { useState, useEffect }from 'react'
import ProductCard from './../components/ProductCard'
import {Container} from 'react-bootstrap'

export default function Products () {

	const [productsCollection, setProductCollection] = useState([]);

	useEffect(() => {

		fetch('https://immense-fortress-37269.herokuapp.com/products/')
		.then(res => res.json())
		.then(convertedData => {
			// console.log(convertedData);
			setProductCollection(convertedData.map(product => {
				return (
					<ProductCard key={product._id} productProp={product}/>
				)
			})) 
			
		})

	},[]);

	return (
		<>
			<div className="product-view text-center">
			<h1 className='pt-5 mt-5'> Awesome Products! </h1>
			<Container className="product-collection">
					{productsCollection}
			</Container>
			</div>
		</>
	);
};