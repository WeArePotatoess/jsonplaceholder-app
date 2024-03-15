import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Users from './Layouts/Users';
import Photos from './Layouts/Photos';
import { Container } from 'react-bootstrap';
import UserDetail from './Layouts/UserDetail';

function App() {
  return (
    <Container fluid className="App gx-0">
      <Header />
      <Routes>
        <Route path='/' element={<Navigate to={'/users'} />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<UserDetail />} />
        <Route path='/Photos' element={<Photos />} />
      </Routes>
    </Container>
  );
}

export default App;
