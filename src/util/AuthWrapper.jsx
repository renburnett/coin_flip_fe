import React from 'react';
import { Redirect } from 'react-router-dom';

export default function AuthWrapper(WrappedComponent) {
  return function AuthWrapper(props) {

    const isAuthorized = () => {
      return localStorage.user;
    }

    return <> { isAuthorized() ? <WrappedComponent {...props} /> : <Redirect to="/login" /> } </>;
  }
}