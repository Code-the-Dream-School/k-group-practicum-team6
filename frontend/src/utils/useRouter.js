import { useNavigate } from 'react-router-dom';

const useRouter = () => {
  const navigate = useNavigate();

  return {
    push: (path) => navigate(path),
    toLogin: () => navigate('/'),
    toDashboard: () => navigate('/dashboard'),
  };
};

export default useRouter;