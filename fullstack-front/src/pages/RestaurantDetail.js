import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import StarRating from './StarRating';
import './Restaurant.css';
import { Container, Card, ListGroup, Spinner, Carousel, Row, Col } from 'react-bootstrap';

export default function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [customerReviewCounts, setCustomerReviewCounts] = useState({});

  useEffect(() => {
    const loadRestaurant = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/restaurant/${id}`);
        setRestaurant(result.data);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the restaurant details!", error);
        setLoading(false);
      }
    };

    const loadReviews = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/restaurant/${id}/reviews`);
        const fetchedReviews = result.data;

        const customerReviewPromises = fetchedReviews.map(review => 
          axios.get(`http://localhost:8080/customer/${review.customerUserId.id}/reviews`)
        );
        const customerReviewsResults = await Promise.all(customerReviewPromises);
        const reviewCounts = {};
        customerReviewsResults.forEach((customerReviews, index) => {
          reviewCounts[fetchedReviews[index].customerUserId.id] = customerReviews.data.length;
        });

        setReviews(fetchedReviews);
        setCustomerReviewCounts(reviewCounts);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the reviews!", error);
        setLoading(false);
      }
    };

    const loadPhotos = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/photos/restaurant/${id}`);
        console.log("Fetched photos:", result.data);
        setPhotos(result.data);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the photos!", error);
        setLoading(false);
      }
    };

    const userRole = localStorage.getItem('userRole');
    setUserRole(userRole);

    loadRestaurant();
    loadReviews();
    loadPhotos();
  }, [id]);

  const handleSelect = (selectedIndex) => {
    setCarouselIndex(selectedIndex);
  };

  if (!restaurant) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  const generateGoogleMapsEmbedUrl = (address) => {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyAG-SZyG6mMrfhGHJPcc1y8mCFCYd3FWpU&q=${encodedAddress}`;
  };

  // const getMainPhoto = (photos) => {
  //   if (!photos || photos.length === 0) return 'default-image-url';
  //   const mainPhoto = photos.find(photo => photo.isMain);
  //   if (mainPhoto) {
  //     return `data:image/jpeg;base64,${mainPhoto.image}`;
  //   }
  //   return 'default-image-url';
  // };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container className='py-4'>
      <Card.Body>
        <Row>
          <div>
            <Card.Title className="display-4">{restaurant.name}</Card.Title>
            <div className="mb-4">
              <StarRating rating={calculateAverageRating()} />
              <p>{calculateAverageRating()}</p>
            </div>
          </div>
        </Row>
      </Card.Body>

      <Card.Body className="mb-4">
          {photos.length > 0 ? (
            <Carousel activeIndex={carouselIndex} onSelect={handleSelect} data-bs-theme="dark">
              {photos.map((photo, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100 carousel-image"
                    src={`data:image/jpeg;base64,${photo.image}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <div className="alert alert-warning" role="alert">
              <p>No photos available</p>
            </div>
          )}
      </Card.Body>

      <h3 className="mb-4">Information</h3>
      <Card className="text-center mx-auto mb-4" border="dark">
      <Card.Body>
          <Card.Text><i className="fas fa-info-circle"></i> {restaurant.information}</Card.Text>
          <Card.Text><i className="fas fa-map-marker-alt"></i> <strong>Address:</strong> {restaurant.address}</Card.Text>
          <Card.Text><i className="fas fa-clock"></i> <strong>Opening hours:</strong> {restaurant.openingHours}</Card.Text>
          <Card.Text><i className="fas fa-phone"></i> <strong>Phone:</strong> {restaurant.phone}</Card.Text>
          <Card.Text><i className="fas fa-utensils"></i> <strong>Style:</strong> {restaurant.style}</Card.Text>
          <Card.Text><i className="fas fa-euro-sign"></i> <strong>Cost:</strong> {'€'.repeat(restaurant.cost)}</Card.Text>
        </Card.Body>
      </Card>

      <ListGroup.Item className="mb-4">
        <div style={{ height: '400px', width: '100%' }}>
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            src={generateGoogleMapsEmbedUrl(restaurant.address)}
            allowFullScreen
          ></iframe>
        </div>
      </ListGroup.Item>

      <h3 className="mb-4">Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map(review => (
          <Card key={review.id} className="mb-3" border="dark">
            <Card.Body>
              <Row className="justify-content-md-center">
              <Col sm={1}>
                  <i className="fas fa-user-circle fa-2x"></i>
                  <div className="reviewer-name">{review.customerUserId.name}</div>
                  <div className="reviewer-review-count">
                    {customerReviewCounts[review.customerUserId.id] || 0} Reviews
                  </div>
                </Col>
                <Col sm={10}>
                  <StarRating rating={review.rating} />
                  <Card.Text>{review.description}</Card.Text>
                  <Card.Subtitle>{new Date(review.date).toLocaleDateString()}</Card.Subtitle>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div className="alert alert-warning" role="alert">
          No reviews found for this restaurant.
        </div>
      )}
      {userRole === 'customer' && (
        <Link className="btn btn-dark" to={`/addreview/${restaurant.id}`}>Add Review</Link>
      )}
    </Container>
  );
}