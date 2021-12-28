function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={() => (auth
        ? children
        : <Redirect to="/login" />)}
    />
  );
}
