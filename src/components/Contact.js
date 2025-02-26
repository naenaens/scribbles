import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow
} from 'mdb-react-ui-kit';

export default function Contact() {
  return (
    <MDBFooter className='contact-footer text-center text-light' style={{ backgroundColor: '#FFC7C7' }}>
        <MDBContainer className='p-4'>
        <MDBRow>
          <MDBCol lg='6' md='12' sm='12' xs='12' className='mb-4 mb-md-0'>
          <img src='scribbles.png' className="w-25" alt="logo"/>

            <p className='text-light'>
            All proceeds from this store will help support Scribbles which is a charitable organization aiming to help the poor and deserving to have an access to education and life-long support.
            </p>
          </MDBCol>

          <MDBCol lg='3' md='6' sm='6' xs='6' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase text-light'>Contact</h5>

            <ul className='list-unstyled mb-0'>
              <li>
                <a href='#!' className='text-light'>
                  shop@scribbles.com
                </a>
              </li>
              <li>
                <a href='#!' className='text-light' >
                  0985xxxxxx
                </a>
              </li>
              <li>
                <a href='#!' className='text-light' >
                  Cebu City, Cebu Philippines, 6000
                </a>
              </li>
            </ul>
          </MDBCol>

          <MDBCol lg='3' md='6' sm='6' xs='6' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase mb-0 text-light'>Legal</h5>

            <ul className='list-unstyled'>
              <li>
                <a href='#!' className='text-light' >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href='#!' className='text-light' >
                  Terms of use
                </a>
              </li>
              <li>
                <a href='#!' className='text-light' >
                  Refund Policy
                </a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  );
}