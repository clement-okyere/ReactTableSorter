import React from 'react';

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [setValue, key]);

  return [value, setValue];
};

export default useSemiPersistentState;
