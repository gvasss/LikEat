import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Spinner, Form, Row, Col, Badge, Button, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [reviewsSummary, setReviewsSummary] = useState({});
  const [photos, setPhotos] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantsPerPage] = useState(12);
  const [allFilters, setAllFilters] = useState({
    locations: [],
    styles: [],
    cuisines: [],
    costs: []
  });
  const [selectedFilters, setSelectedFilters] = useState({
    locations: [],
    styles: [],
    cuisines: [],
    costs: []
  });
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || '';
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem('selectedFilters'));
    if (savedFilters) {
      setSelectedFilters(savedFilters);
    }

    const loadRestaurants = async (startIndex, endIndex) => {
      try {
        const result = await axios.get(`http://localhost:8080/restaurants/home?_start=${startIndex}&_end=${endIndex}`);
        const { restaurants, filters } = result.data;

        setRestaurants(restaurants);
        setAllFilters(filters);

        setLoading(false);
      } catch (error) {
        console.error('There was an error fetching the restaurants!', error);
        setLoading(false);
      }
    };

    const startIndex = (currentPage - 1) * restaurantsPerPage;
    const endIndex = currentPage * restaurantsPerPage;
    loadRestaurants(startIndex, endIndex);
  }, [currentPage, restaurantsPerPage]);

  useEffect(() => {
    const fetchReviewsAndPhotos = async () => {
      const reviewsSummaryPromises = restaurants.map(restaurant =>
        axios.get(`http://localhost:8080/restaurant/${restaurant.id}/review-summary`)
      );

      try {
        const reviewsSummaryResults = await Promise.all(reviewsSummaryPromises);
        const reviewsSummaryData = {};
        reviewsSummaryResults.forEach((reviewSummaryResult, index) => {
          reviewsSummaryData[restaurants[index].id] = reviewSummaryResult.data;
        });
        setReviewsSummary(reviewsSummaryData);

        const photosPromises = restaurants.map(restaurant =>
          axios.get(`http://localhost:8080/photos/restaurant/${restaurant.id}?main=true`)
        );

        const photosResults = await Promise.all(photosPromises);
        const photosData = {};
        photosResults.forEach((photoResult, index) => {
          photosData[restaurants[index].id] = photoResult.data;
        });
        setPhotos(photosData);
      } catch (error) {
        console.error('There was an error fetching reviews or photos!', error);
      }
    };

    if (restaurants.length > 0) {
      fetchReviewsAndPhotos();
    }
  }, [restaurants]);

  const handleRestaurantClick = (id) => {
    if (userRole) {
      navigate(`/restaurant/${id}`);
    } else {
      setShowLoginPopup(true);
      setTimeout(() => {
        setShowLoginPopup(false);
      }, 3000);
    }
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const nameMatch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const locationMatch = selectedFilters.locations.length === 0 || selectedFilters.locations.includes(restaurant.location);
    const styleMatch = selectedFilters.styles.length === 0 || selectedFilters.styles.includes(restaurant.style);
    const cuisineMatch = selectedFilters.cuisines.length === 0 || selectedFilters.cuisines.includes(restaurant.cuisine);
    const costMatch = selectedFilters.costs.length === 0 || selectedFilters.costs.includes(restaurant.cost);
    return nameMatch && locationMatch && styleMatch && cuisineMatch && costMatch;
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleFilterChange = (filterCategory, filterValue) => {
    setSelectedFilters(prevFilters => {
      const newFilterValues = prevFilters[filterCategory].includes(filterValue)
        ? prevFilters[filterCategory].filter(value => value !== filterValue)
        : [...prevFilters[filterCategory], filterValue];
      const updatedFilters = { ...prevFilters, [filterCategory]: newFilterValues };
      localStorage.setItem('selectedFilters', JSON.stringify(updatedFilters));
      return updatedFilters;
    });
  };

  const removeFilter = (filterCategory, filterValue) => {
    setSelectedFilters(prevFilters => {
      const updatedFilters = {
        ...prevFilters,
        [filterCategory]: prevFilters[filterCategory].filter(value => value !== filterValue)
      };
      localStorage.setItem('selectedFilters', JSON.stringify(updatedFilters));
      return updatedFilters;
    });
  };

  const getMainPhoto = (restaurantId) => {
    const restaurantPhotos = photos[restaurantId];
    if (!restaurantPhotos || restaurantPhotos.length === 0) {
      return 'https://cdn.otstatic.com/legacy-cw/default2-original.png';
    }
    const mainPhoto = restaurantPhotos[0];
    if (mainPhoto) {
      return `data:image/jpeg;base64,${mainPhoto.image}`;
    }
    return 'https://cdn.otstatic.com/legacy-cw/default2-original.png';
  };

  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const startIndex = (pageNumber - 1) * restaurantsPerPage;
    const endIndex = pageNumber * restaurantsPerPage;
    const restaurantsToFetch = filteredRestaurants.slice(startIndex, endIndex);

    const newPhotosData = { ...photos };
    try {
      const photosPromises = restaurantsToFetch.map(restaurant =>
        axios.get(`http://localhost:8080/photos/restaurant/${restaurant.id}?main=true`)
      );
      const photosResults = await Promise.all(photosPromises);
      photosResults.forEach((photoResult, index) => {
        newPhotosData[restaurantsToFetch[index].id] = photoResult.data;
      });
      setPhotos(newPhotosData);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = filteredRestaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);
  const totalPages = Math.ceil(filteredRestaurants.length / restaurantsPerPage);

  return (
    <Container className="custom-container">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <Form className="mb-4" onSubmit={handleSearchSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearch}
            />
          </Form>

          <Row className="g-4">
            <Col xl={2} className="filter-section">
              <div>
                <h6>Locations</h6>
                {allFilters.locations.map(location => (
                  <Form.Check
                    key={location}
                    type="checkbox"
                    label={location}
                    checked={selectedFilters.locations.includes(location)}
                    onChange={() => handleFilterChange('locations', location)}
                    className="mb-2"
                  />
                ))}
              </div>
              <div>
                <h6>Styles</h6>
                {allFilters.styles.map(style => (
                  <Form.Check
                    key={style}
                    type="checkbox"
                    label={style}
                    checked={selectedFilters.styles.includes(style)}
                    onChange={() => handleFilterChange('styles', style)}
                    className="mb-2"
                  />
                ))}
              </div>
              <div>
                <h6>Cuisines</h6>
                {allFilters.cuisines.map(cuisine => (
                  <Form.Check
                    key={cuisine}
                    type="checkbox"
                    label={cuisine}
                    checked={selectedFilters.cuisines.includes(cuisine)}
                    onChange={() => handleFilterChange('cuisines', cuisine)}
                    className="mb-2"
                  />
                ))}
              </div>
              <div>
                <h6>Costs</h6>
                {allFilters.costs.map(cost => (
                  <Form.Check
                    key={cost}
                    type="checkbox"
                    label={cost}
                    checked={selectedFilters.costs.includes(cost)}
                    onChange={() => handleFilterChange('costs', cost)}
                    className="mb-2"
                  />
                ))}
              </div>
            </Col>

            <Col xl={10}>
              {Object.keys(selectedFilters).some(key => selectedFilters[key].length > 0) && (
                <div className="mb-4">
                  <h5>Selected Filters:</h5>
                  {Object.keys(selectedFilters).map((filterCategory) => (
                    selectedFilters[filterCategory].map((filterValue) => (
                      <Badge
                        key={filterValue}
                        bg="dark"
                        className="me-2 mb-2"
                      >
                        {filterValue}
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => removeFilter(filterCategory, filterValue)}
                          style={{ textDecoration: 'none', color: 'white', marginLeft: '5px' }}
                        >
                          &times;
                        </Button>
                      </Badge>
                    ))
                  ))}
                </div>
              )}
              <Row xs={1} md={4} className="g-4">
                {currentRestaurants.map((restaurant) => (
                  <Col key={restaurant.id}>
                    <Card className="card-hover" onClick={() => handleRestaurantClick(restaurant.id)} style={{ cursor: 'pointer' }}>
                      <Card.Img
                        variant="top"
                        src={getMainPhoto(restaurant.id)}
                        alt={restaurant.name}
                      />
                      <Card.Body>
                        <h4 className="text-center m-3 mb-4">{restaurant.name}</h4>
                        <Card.Text>
                          {restaurant.location} | {restaurant.cuisine} | {restaurant.style} | {'€'.repeat(restaurant.cost)}
                        </Card.Text>
                        <div className="d-flex justify-content-between align-items-center">
                          <StarRating rating={reviewsSummary[restaurant.id]?.averageRating || 0} />
                          <span>{reviewsSummary[restaurant.id]?.reviewCount || 0} reviews</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              {filteredRestaurants.length > restaurantsPerPage && (
                <Pagination className="justify-content-center pagination-dark mt-4">
                  {[...Array(totalPages).keys()].map((number) => (
                    <Pagination.Item
                      key={number + 1}
                      active={number + 1 === currentPage}
                      onClick={() => handlePageChange(number + 1)}
                    >
                      {number + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              )}
            </Col>
          </Row>

          {showLoginPopup && (
            <div className="login-popup">
              Please sign in to view restaurant details.
            </div>
          )}
        </>
      )}
    </Container>
  );
}
