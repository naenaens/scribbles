import {Row, Col} from 'react-bootstrap';


export default function Banner({bannerData}) {
	return (
		<>
		<Row id="banner" className ="p-3 mt-3">
			<Col>
				<h1 className='pt-5'> {bannerData.title} </h1>
				<p className="my-4 pt-1">{bannerData.content}</p>
				<a className ="btn" id="vp" href="/products">Shop now!</a>
			</Col>
		</Row>
	
		</>
	);
};

// expose the component

