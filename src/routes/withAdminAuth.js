import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const withAdminAuth = (Component) => {
  return (props) => {
    const { userType, loading } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
      if (!loading && userType !== 'admin') {
        navigate('/', { replace: true });
      }
    }, [userType, navigate, loading]);

    if (loading) {
      return null;
    }

    if (userType === 'admin') {
      return <Component {...props} />;
    } else {
      return null;
    }
  };
};

export default withAdminAuth;
