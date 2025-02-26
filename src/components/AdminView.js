import {Link} from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap'
import UserContext from '../UserContext';
import {Navigate} from 'react-router-dom';
import { useContext } from 'react';


const AdminView = () => {
    const { user } = useContext(UserContext);
    return ( 
        user.id && user.isAdmin
		?
        <>
            <Container>
                <Row>
                    <Col xs={12} md={4} lg={2} className="text-center">
                    <div className='text-center mt-5 pt-5'>
                        <h2 className='pr-3'>Admin Actions</h2>
                        <Link className="purchase-btn-dis btn btn-block mt-5 font-weight-bold" to="/products/add">
								Create Product
		                </Link>
                        <Link className="purchase-btn-dis btn btn-block mt-2 font-weight-bold" to="/products/all">
								View all Products
		                </Link>
                    </div>
                                 
                    </Col >
                    <Col xs={12} md={8} lg={10}>
                    <div className='text-center mt-5 pt-5'>
                        <h2 className='mt-2 mb-5'> Sales Analysis </h2>
                        <img src={'sales.png'} alt="sales" className='w-100 mb-3'/>
                     </div>
                    </Col>
                </Row>
            </Container>
              
            
        </>
        :
        <Navigate to="/products" replace={true} />
     );
}
 
export default AdminView;
