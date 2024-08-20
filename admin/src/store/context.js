import React, { createContext, useState } from 'react';

// Create a Context
export const MyContext = createContext();

// Create a Provider component
export const MyProvider = ({ children }) => {
  const [usersPerDay,setUsersPerDay] = useState({});
  const [transactionsPerDay,setTransactionsPerDay] = useState({})

  return (
    <MyContext.Provider value={{ usersPerDay,setUsersPerDay, transactionsPerDay,setTransactionsPerDay}}>
      {children}
    </MyContext.Provider>
  );
};
