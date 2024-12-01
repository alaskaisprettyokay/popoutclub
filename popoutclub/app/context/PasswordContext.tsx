import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PasswordContextType {
  isPasswordValid: boolean;
  validatePassword: (password: string) => boolean;
}

const PasswordContext = createContext<PasswordContextType | undefined>(undefined);

export const PasswordProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const validatePassword = (password: string) => {
    if (password === 'popout') {
      setIsPasswordValid(true);
      return true;
    }
    return false;
  };

  return (
    <PasswordContext.Provider value={{ isPasswordValid, validatePassword }}>
      {children}
    </PasswordContext.Provider>
  );
};

export const usePassword = () => {
  const context = useContext(PasswordContext);
  if (!context) {
    throw new Error('usePassword must be used within a PasswordProvider');
  }
  return context;
}; 