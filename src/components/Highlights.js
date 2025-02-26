import {Row, Col, Card, Container} from 'react-bootstrap'


export default function Highlights () {
	return(
		<Container className="mb-4">
			<Row className="my-3">
				{/*First Highlight*/}
				<Col xs={12} md={4}>
					<Card className="p-4 cardHighlight">
						<Card.Body>
							<Card.Title> <b>Quality Products!</b></Card.Title>
							<Card.Text>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, quo.
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>

				{/*Second Higlight*/}
				<Col xs={12} md={4}>
					<Card className="p-4 cardHighlight">
						<Card.Body>
							<Card.Title><b>Eco-friendly!</b> </Card.Title>
							<Card.Text>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, quo.
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>

				{/*Third Highlight*/}
				<Col xs={12} md={4}>
					<Card className="p-4 cardHighlight">
						<Card.Body>
							<Card.Title><b>Charitable Cause</b></Card.Title>
							<Card.Text>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, quo.
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
		
	);
};