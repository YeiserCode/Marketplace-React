import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const withUserAuth = (Component) => {
  return (props) => {
    const { uid, loading } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
      if (!loading && !uid) {
        navigate('/login', { replace: true });
      }
    }, [uid, navigate, loading]);

    if (loading) {
      return null;
    }

    if (uid) {
      return <Component {...props} />;
    } else {
      return null;
    }
  };
};

export default withUserAuth;
