// import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Herosection = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero.jpg')"
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <Container>
            <Row className="min-vh-100 align-items-center">
              <Col lg={8} className="text-white">
                <div className="py-8">
                  {/* Main Heading */}
                  <h1 className="text-5xl font-bold mb-6 leading-tight">
                    Empowering Farmers,
                    <br />
                    <span className="text-green-700">Transforming Agriculture</span>
                  </h1>
                  
                  {/* Subtitle */}
                  <p className="text-2xl italic mb-4 opacity-90">
                    A Movement for Sustainable Farming & Healthy Food
                  </p>
                  
                  {/* Description */}
                  <p className="text-lg mb-8 opacity-80 max-w-2xl">
                    Connect with modern agricultural machinery through our rental platform. 
                    Access tractors, harvesters, and farming equipment when you need them.
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Button 
                      as={Link} 
                      to="/BookMachine" 
                      variant="success" 
                      size="lg" 
                      className="px-8 py-3 font-semibold rounded-md hover:transform hover:-translate-y-1 transition-all duration-300"
                    >
                      Find Equipment
                    </Button>
                    
                    <Button 
                      as={Link} 
                      to="/Machine" 
                      variant="outline-light" 
                      size="lg" 
                      className="px-8 py-3 font-semibold rounded-md hover:transform hover:-translate-y-1 transition-all duration-300"
                    >
                      List Your Machine
                    </Button>
                  </div>

                  {/* Simple Stats */}
                  <div className="mt-8">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <h4 className="text-3xl font-bold text-green-500 mb-1">500+</h4>
                        <small className="text-white opacity-80">Machines</small>
                      </div>
                      <div className="text-center">
                        <h4 className="text-3xl font-bold text-green-500 mb-1">1000+</h4>
                        <small className="text-white opacity-80">Farmers</small>
                      </div>
                      <div className="text-center">
                        <h4 className="text-3xl font-bold text-green-500 mb-1">50+</h4>
                        <small className="text-white opacity-80">Cities</small>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Herosection;