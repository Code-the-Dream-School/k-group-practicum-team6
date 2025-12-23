import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">Go back to login</Link>
    </div>
  );
};

export default NotFoundPage;