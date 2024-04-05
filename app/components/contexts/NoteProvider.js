import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useContext, useState} from 'react';
// import React from 'react'

const NoteContext = createContext();

export default function NoteProvider({ children }) {
    const [notes, setNotes] = useState([]);

    const findNotes = async () =>{
        const result = await AsyncStorage.getItem('notes');

        if(result !== null) setNotes(JSON.parse(result));
    }

    // Utilisation de useEffect pour exécuter findGreet une seule fois après le rendu initial
      useEffect(() => {
        findNotes();
      }, []);

  return (
        <NoteContext.Provider value={{ notes, setNotes, findNotes }}>
                 {children}
        </NoteContext.Provider>
  )
}
export const useNotes = () => useContext(NoteContext);
 