import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

//displays sunrise/sunset
function SunCards(props) {
    const sunrise = props.sunrise
    const sunset = props.sunset
    return (
        <CardGroup style={{marginTop: '80px', display: 'flex', justifyContent: 'center'}}>
            <Card>
                <Card.Body>
                    <Card.Title>{sunrise}</Card.Title>
                </Card.Body>
                <Card.Img variant="bottom" width='200px' src="/sunrise-img.png" />
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title>{sunset}</Card.Title>
                </Card.Body>
                <Card.Img variant="bottom" width='200px' src="/sunset-img.png" />
            </Card>
        </CardGroup>
    );
}
  
  export default SunCards;