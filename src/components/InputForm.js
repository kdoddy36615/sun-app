import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import $ from 'jquery';
import { publicIpv4 } from 'public-ip';
import SunCards from './SunCards';

function InputForm() {
  //could have combined some of these
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')
  const [sunrise, setSunrise] = useState('')
  const [sunset, setSunset] = useState('')
  const [hasUserInfo, setHasUserInfo] = useState()

  //can make these handlechanges 1 function, but I prefer separation for readability + future changes
  const handleLatChange = (e) => {
    setLat(e.target.value)
  }
  const handleLongChange = (e) => {
    setLong(e.target.value)
  }
  const handleFormSubmit = () => {
    getSunInfo()
  }

  //get's lat/long given an ip address
  const getLocation = (userIpAddress) => {
    fetch(`https://api.ipbase.com/v2/info/?ip=${userIpAddress}&apikey=sbUAPgzHiUVe6hv7tdKqnG6dDy9LFhRDoeBCven0`)
      .then((response => response.json()))
      .then((data) => {
        let { latitude, longitude } = data.data.location
        setHasUserInfo(true)
        setLat(latitude)
        setLong(longitude)
      })
  }

  //get's user's ip address
  const getUserInfo = () => {
    publicIpv4()
      .then(
        (result) => {
          if(result){
            getLocation(result)
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //gets sunrise/sunset for given lat/long
  const getSunInfo = () => {
    $.ajax({
      type: "GET",
      url: `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&callback=mycallback`,
      jsonp: "callback",
      dataType: 'jsonp',
    success: function(response) {
      let { sunrise, sunset } = response.results
      setSunrise(sunrise)
      setSunset(sunset)
    }})
  }

  //gets userinfo + suninfo on initial render
  useEffect(() => {
    if (!hasUserInfo) {
      getUserInfo()
      getSunInfo()
    }
  })

  return (
    //I need a refresher on bootstrap (been a few years)
    //...seemed like most of my parameters weren't doing anything
    <Container style={{marginTop: '80px'}}>
    <Form>
    <Form.Group as={Row} className="mb-3" controlId="formLatitude">
        <Form.Label column sm="2">
          Latitude
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" onChange={handleLatChange} value={lat} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formLongitutde">
        <Form.Label column sm="2">
          Longitude
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" onChange={handleLongChange} value={long} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formSubmit">
      <Button variant="primary" onClick={handleFormSubmit}>
        Submit
      </Button>
      </Form.Group>
    </Form>
    <SunCards sunrise={sunrise} sunset={sunset} />
    </Container>
  );
}

export default InputForm;