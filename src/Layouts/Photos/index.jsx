import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import PhotoCard from "../../components/PhotoCard";

const Photos = () => {
    const [photoList, setPhotoList] = useState([]);
    const [albumIdSearch, setAlbumIdSearch] = useState('');



    const getPhotos = (start, albumId) => {
        axios.get(`https://jsonplaceholder.typicode.com/photos?_start=${(start != undefined) ? (start) : (photoList.length)}&_limit=${12}${albumId ? `&albumId=${albumId}` : ''}`)
            .then(res => res.data)
            .then(data => {
                if (start === 0) {
                    setPhotoList(data)
                }
                else
                    setPhotoList([...photoList, ...data])
            })
            .catch(e => e);

    }
    useEffect(() => {
        if (albumIdSearch.length === 0)
            getPhotos();
    }, [])

    const handleLoadMore = () => {
        getPhotos(photoList.length, albumIdSearch);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setPhotoList([]);
        getPhotos(0, albumIdSearch);
    }
    return (
        <Container className="py-2">
            <Row>
                <Col xs={12}><h2 className="fw-bold">Photos</h2></Col>
            </Row>
            <Row className="my-4">
                <Col xs={12}>
                    <Form action="#" className="d-flex items-center gap-2">
                        <div>
                            <Form.Select name="filter">
                                <option value="albumId">Album Id</option>
                            </Form.Select>
                        </div>
                        <div>
                            <Form.Control name="search" placeholder="Search by album id" value={albumIdSearch} onChange={e => setAlbumIdSearch(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={handleSearch}>Search</button>
                    </Form>
                </Col>
            </Row>
            <Row>
                {photoList.map(photo => {
                    return (
                        <div key={photo.id} className="mb-4 col-3">
                            <PhotoCard photo={photo} />
                        </div>
                    )
                })}
            </Row>
            <Row>
                <Col xs={12}>
                    <div className="w-100 text-center">
                        <Button variant="primary" onClick={handleLoadMore}>Load more</Button>
                    </div>
                </Col>
            </Row>

        </Container>
    );
}

export default Photos;