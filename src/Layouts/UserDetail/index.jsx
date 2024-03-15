import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Album from "../../components/Album";

const UserDetail = () => {
    const [user, setUser] = useState();
    const [userAlbums, setUserAlbums] = useState([]);
    const [newAlbum, setNewAlbum] = useState('');
    const [editContact, setEditContact] = useState(false);
    const [contactInfo, setContactInfo] = useState({});



    const param = useParams();

    const handleEditContact = (e) => {
        const temp = { ...contactInfo };
        temp[`${e.target.id}`] = e.target.value;
        setContactInfo(temp)
    }

    const handleUpdateContact = (e) => {
        e.preventDefault();
        axios.put(`https://jsonplaceholder.typicode.com/users/${param.id}`, contactInfo)
            .then(res => setEditContact(false))
            .catch(e => console.log(e));
        setUser({ ...user, ...contactInfo });
    }

    const createNewAlbum = (e) => {
        e.preventDefault();
        axios.post('https://jsonplaceholder.typicode.com/albums', { userId: user.id, title: newAlbum })
            .then(res => res.data)
            .then(data => {
                console.log(data)
                setUserAlbums([...userAlbums, { ...data, id: Math.floor(Math.random() * 400) }])
            })
            .catch(e => console.log(e));
    }

    const handleDeleteAlbum = (id) => {
        axios.delete('https://jsonplaceholder.typicode.com/albums/' + id)
            .then(res => {
                setUserAlbums(userAlbums.filter(album => album.id != id));
            })
            .catch(e => console.log(e));
    }

    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        axios.get(`https://jsonplaceholder.typicode.com/users/${param.id}`, { cancelToken: source.token })
            .then(res => res.data)
            .then(userData => {
                setUser(userData)
                setContactInfo({
                    email: userData.email,
                    phone: userData.phone,
                    website: userData.website
                })
            })
            .catch(e => console.log(e));

        axios.get(`https://jsonplaceholder.typicode.com/users/${param.id}/albums`, { cancelToken: source.token })
            .then(res => res.data)
            .then(data => setUserAlbums(data))
            .catch(e => console.log(e));
        return () => { source.cancel('Request canceled'); }
    }, [param])
    return (user && userAlbums && <Container className="py-2">
        <Row className="mb-4">
            <Col xs={12}>
                <Row className="mb-4">
                    <Col xs={6}>
                        <h2 className="fw-bold">
                            {user.name}
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <div className="d-flex flex-column gap-4">
                            <Row>
                                <Col xs={12}><h4 className="text-info">Personal:</h4></Col>
                                <Col xs={12}>
                                    <Row>
                                        <Col xs={4} lg={3}>
                                            <p className="mb-0">Id:</p>
                                        </Col>
                                        <Col lg={9} xs={8}>
                                            <p className="mb-0 fw-bold">{user.id}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={3} xs={4}>
                                            <p className="mb-0">Username:</p>
                                        </Col>
                                        <Col lg={9} xs={8}>
                                            <p className="mb-0 fw-bold">{user.username}</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <h4 className="text-info">Address:</h4>
                                </Col>
                                <Col xs={12}>
                                    <Row>
                                        <Col lg={3} xs={4}>
                                            <p className="mb-0">Street:</p>
                                        </Col>
                                        <Col lg={9} xs={8}>
                                            <p className="mb-0 fw-bold">{user.address.street}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={3} xs={4}>
                                            <p className="mb-0">Suite:</p>
                                        </Col>
                                        <Col lg={9} xs={8}>
                                            <p className="mb-0 fw-bold">{user.address.suite}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={3} xs={4}>
                                            <p className="mb-0">City:</p>
                                        </Col>
                                        <Col lg={9} xs={8}>
                                            <p className="mb-0 fw-bold">{user.address.city}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={3} xs={4}>
                                            <p className="mb-0">Zipcode:</p>
                                        </Col>
                                        <Col lg={9} xs={8}>
                                            <p className="mb-0 fw-bold">{user.address.zipcode}</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <h4 className="text-info">Company:</h4>
                                </Col>
                                <Col xs={12}>
                                    <Row>
                                        <Col lg={3} xs={4}>
                                            <p className="mb-0">Name:</p>
                                        </Col>
                                        <Col lg={9} xs={8}>
                                            <p className="mb-0 fw-bold">{user.company.name}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={3} xs={4}>
                                            <p className="mb-0">CatchPhrase:</p>
                                        </Col>
                                        <Col lg={9} xs={8}>
                                            <p className="mb-0 fw-bold">{user.company.catchPhrase}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={3} xs={4}>
                                            <p className="mb-0">Bs:</p>
                                        </Col>
                                        <Col lg={9} xs={8}>
                                            <p className="mb-0 fw-bold">{user.company.bs}</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col xs={6}>
                        <Row>
                            <Col xs={6}>
                                <div className="d-flex items-center justify-content-between">
                                    <h4 className="text-info">Contact:</h4>
                                </div>
                            </Col>
                            <Col xs={12} className="mb-2">
                                {!editContact && <>
                                    <Row>
                                        <Col xs={4} lg={3}>
                                            <p className="mb-0">Email:</p>
                                        </Col>
                                        <Col xs={8} lg={9}>
                                            <p className="mb-0 fw-bold">{user.email}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} lg={3}>
                                            <p className="mb-0">Website:</p>
                                        </Col>
                                        <Col xs={8} lg={9}>
                                            <p className="mb-0 fw-bold">{user.website}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} lg={3}>
                                            <p className="mb-0">Phone:</p>
                                        </Col>
                                        <Col xs={8} lg={9}>
                                            <p className="mb-0 fw-bold">{user.phone}</p>
                                        </Col>
                                    </Row>
                                </>}
                                {editContact &&
                                    <Form action="#">
                                        <Row className="mb-3">
                                            <Col xs={12}>
                                                <div>
                                                    <Form.Label htmlFor="email">Email:</Form.Label>
                                                    <Form.Control id="email" type="email" name="email" placeholder="Email..." value={contactInfo.email} onChange={handleEditContact} />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mb-3">
                                            <Col xs={12}>
                                                <div>
                                                    <Form.Label htmlFor="phone" className="form-label">Phone:</Form.Label>
                                                    <Form.Control type="text" id="phone" name="phone" placeholder="Phone..." value={contactInfo.phone} onChange={handleEditContact} />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="mb-3">
                                            <Col xs={12}>
                                                <div>
                                                    <Form.Label htmlFor="website" className="form-label">Website:</Form.Label>
                                                    <Form.Control type="text" id="website" name="website" className="form-control" placeholder="Website..." value={contactInfo.website} onChange={handleEditContact} />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12}>
                                                <div className="d-flex items-center gap-3">
                                                    <Button variant="success" type="submit" disabled={contactInfo.email === user.email && contactInfo.phone === user.phone && contactInfo.website === user.website} onClick={handleUpdateContact}>Submit</Button>
                                                    <Button variant="danger" type="button">Reset</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form>
                                }
                            </Col>
                            {!editContact && <Col xs={12}>
                                <Button onClick={() => setEditContact(true)} variant="success">Edit</Button>
                            </Col>}

                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <Col xs={12}>
                <Row className="border-top pt-3 mb-3">
                    <Col xs={8}>
                        <h4>Photo Albums: </h4>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs={6}>
                        <Form className="d-flex items-center gap-3">
                            <Form.Control id="new-album" type="text" className="form-control" placeholder="Title of new album" value={newAlbum} onChange={(e) => setNewAlbum(e.target.value)} />
                            <Button variant="success" size="lg" type="submit" className="flex-shrink-0 w-25" onClick={createNewAlbum}>New Album</Button>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    {userAlbums.map((album, index) => {
                        return (
                            <Album key={album.id} album={album} index={index} handleDeleteAlbum={handleDeleteAlbum} />
                        )
                    })}
                </Row>
            </Col>
        </Row>
    </Container>);
}

export default UserDetail;