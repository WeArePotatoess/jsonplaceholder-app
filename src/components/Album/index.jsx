import { Button, Col } from "react-bootstrap";
import Styles from './Album.css';

const Album = ({ index, album, handleDeleteAlbum }) => {
    return (
        <Col md={6} className="mb-3">
            <div className="d-flex items-center justify-content-between border rounded text-decoration-none text-black ">
                <div className={`py-2 flex-shrink-0 border-end d-flex items-center justify-content-center w-10`}>{index + 1}</div>
                <div className="py-2 w-100 px-4 text-truncate fw-bold text-start">
                    {album.title}
                </div>
                <div className="text-center flex-shrink-0 w-10 py-2">
                    <Button variant="danger" size="sm" onClick={() => { handleDeleteAlbum(album.id) }}>X</Button>
                </div>
            </div>
        </Col>);
}

export default Album;