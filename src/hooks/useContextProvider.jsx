import { useContext } from 'react';
import { Context } from '../hooks/Provider';

function useContextProvider() {
  const context = useContext(Context);
  if (context === undefined)
    throw new Error('Context was used outside of the PostProvider');

  return context;
}

export { useContextProvider };
