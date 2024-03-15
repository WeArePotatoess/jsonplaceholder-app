import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { memo } from "react";
import { useNavigate } from "react-router-dom";



const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        axios.get('https://jsonplaceholder.typicode.com/users', { cancelToken: source.token })
            .then(res => res.data)
            .then(data => setUsers(data))
            .catch(e => console.log(e));
        return () => source.cancel('canceled request');
    }, [])
    return (<Container className="py-2">
        <Row>
            <h2 className="fw-bold">Users</h2>
        </Row>
        <Row>
            <Col xs={12}>
                <Table striped hover>
                    <thead className="border-bottom border-dark ">
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>username</th>
                            <th>email</th>
                            <th>phone</th>
                            <th>website</th>
                            <th>city</th>
                            <th>Company Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => {
                                return (
                                    <tr key={user.id} onClick={() => navigate(`${user.id}`)}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.website}</td>
                                        <td>{user.address.city}</td>
                                        <td>{user.company.name}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Col>
        </Row>
    </Container>);
}

export default memo(Users);