import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/firebase';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

const BookMachine = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });
  
  const { getAllMachines } = useFirebase();

  useEffect(() => {
    loadMachines();
  }, []);

  const FALLBACK_IMAGE = 'https://via.placeholder.com/300x250?text=No+Image';

  const formatListedDate = (value) => {
    if (!value) return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '-';
    return date.toLocaleDateString();
  };

  const loadMachines = async () => {
    try {
      setLoading(true);
      const machinesData = await getAllMachines();
      setMachines(machinesData);
      setError(null);
    } catch (err) {
      setError('Failed to load machines');
      console.error('Error loading machines:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookMachine = (machineId, machineName) => {
    setAlert({
      show: true,
      message: `Booking request sent for ${machineName}!`,
      variant: 'success'
    });
    
    // Hide alert after 3 seconds
    setTimeout(() => {
      setAlert({ show: false, message: '', variant: 'success' });
    }, 5000);
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading available machines...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          {error}
          <Button variant="outline-danger" size="sm" className="ms-2" onClick={loadMachines}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      {/* Alert Component */}
      {alert.show && (
        <Alert variant={alert.variant} dismissible onClose={() => setAlert({ show: false, message: '', variant: 'success' })}>
          {alert.message}
        </Alert>
      )}

      <div className="text-center mb-4">
        <h2 className="text-primary">Available Machines for Rent</h2>
        <p className="text-muted">Find the perfect agricultural equipment for your needs</p>
        <p className='text-muted mx-auto'>  <ul className='flex gap-2 mx-auto '>for any Help ?.-
            <li>{'{@_contact us : 8960960121}' } ;</li>
           <li>{'{@_email : nikhilgupta542006@gmail.com}'}</li>
      </ul></p>
      </div>

      {machines.length === 0 ? (
        <div className="text-center mt-5">
          <Card className="p-5">
            <Card.Body>
              <h4 className="text-muted">No machines available</h4>
              <p className="text-muted">Be the first to list your machine!</p>
              <Button variant="primary" href="/Machine">
                List Your Machine
              </Button>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <Row>
          {machines.map((machine) => (
            <Col md={6} lg={4} key={machine.id} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img 
                  variant="top" 
                  src={machine.imageUrl || FALLBACK_IMAGE} 
                  style={{ height: '250px', objectFit: 'cover' }}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = FALLBACK_IMAGE;
                  }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-primary">{machine.machineName}</Card.Title>
                  <Card.Text className="flex-grow-1">
                    <div className="mb-2">
                      <strong>📍 Location:</strong> {machine.location}
                    </div>
                    <div className="mb-2">
                      <strong>⏰ Availability:</strong> {machine.availability}
                    </div>
                    <div className="mb-2">
                      <strong>💰 Price:</strong> ₹{machine.rentPrice}/day
                    </div>
                    <div className="mb-2">
                      <strong>👤 Owner:</strong> {machine.owner}
                    </div>
                    <div className="mb-2">
                      <strong>📅 Listed:</strong> {formatListedDate(machine.createdAt)}
                    </div>
                  </Card.Text>
                  <div className="mt-auto">
                    <Button 
                      variant="success" 
                      className="w-100"
                      onClick={() => handleBookMachine(machine.id, machine.machineName)}
                    >
                      Book Now
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Refresh Button */}
      <div className="text-center mt-4">
        <Button variant="outline-primary" onClick={loadMachines}>
          Refresh List
        </Button>
      </div>
    </Container>
  );
};

export default BookMachine;