import { Card } from "react-bootstrap";

const PhotoCard = ({ photo }) => {
    return (
        <Card className="w-100">
            <Card.Img variant="top" src={photo.url} />
            <Card.Body>
                <Card.Title className="w-full text-truncate h5">{photo.title}</Card.Title>
                <Card.Text className="mb-1">Id: #{photo.id}</Card.Text>
                <Card.Text>Album Id: #{photo.albumId}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default PhotoCard;