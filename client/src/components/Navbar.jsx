import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

// Define the AppNavbar component
const AppNavbar = () => {
  // Set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
     {/* Navigation bar */}
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          {/* Brand link */}
          <Navbar.Brand as={Link} to='/'>
            Google Books Search
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          {/* Navbar links */}
          <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
            <Nav className='ml-auto d-flex'>
              {/* Link to search for books */}
              <Nav.Link as={Link} to='/'>
                Search For Books
              </Nav.Link>
              {/* Conditional rendering based on user login status */}
              {Auth.loggedIn() ? (
                <>
                  {/* Link to see saved books */}
                  <Nav.Link as={Link} to='/saved'>
                    See Your Books
                  </Nav.Link>
                  {/* Logout link */}
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                // Link to open login/signup modal for guests
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Modal setup */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* Tab container for signup and login */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
               {/* Tabs for login and signup */}
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              {/* Login and signup forms */}
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

// Export the AppNavbar component
export default AppNavbar;
