import { Container, Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import './Header.css'
import { memo } from "react";

const Header = () => {
    const location = useLocation();
    return (
        <div className="bg-dark py-3">
            <Container>
                <Nav activeKey={location.pathname} className="gap-4">
                    <Nav.Item>
                        <NavLink to={'/users'} className={'text-decoration-none'}>Users</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to={'/photos'} className={'text-decoration-none'} >Photos</NavLink>
                    </Nav.Item>
                </Nav>
            </Container>
        </div>
    );
}

export default memo(Header);