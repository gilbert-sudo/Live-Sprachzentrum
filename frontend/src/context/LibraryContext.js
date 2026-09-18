import React, { createContext, useContext, useState, useEffect } from 'react';

const LibraryContext = createContext();

export function useLibrary() {
  return useContext(LibraryContext);
}

export function LibraryProvider({ children }) {
  const [libraryItems, setLibraryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLibraryItems = async () => {
    try {
      setIsLoading(true);
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/library`);
      if (!response.ok) {
        throw new Error('Fehler beim Laden der Bibliothek');
      }
      const data = await response.json();
      setLibraryItems(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLibraryItems();
  }, []);

  const value = {
    libraryItems,
    setLibraryItems,
    isLoading,
    error,
    fetchLibraryItems
  };

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
}
