import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import '../styles/navbar.css'

function Nav({ name }) {
    return (
      <>
        <Navbar bg="dark" variant="dark" className="navbar-custom">
          <Container fluid className="px-0">
            <Navbar.Brand href="#home">
              <p className='title'>Task Management</p>
            </Navbar.Brand>
            <Navbar.Text className="welcome-text">
              Welcome {name}
            </Navbar.Text>
          </Container>
        </Navbar>
      </>
    );
  }
  
export default Nav;