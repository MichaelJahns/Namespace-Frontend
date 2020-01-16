import React, { useEffect, useContext, createContext } from 'react';
import axios from 'axios';
import * as firebase from 'firebase';
import 'firebase/firestore'
require("firebase/firestore");

var db = firebase.firestore();
const FireStoreContext = createContext()


export function ProvideFirestore({ children }) {
    const firestore = useProvideFireStore();
    return <FireStoreContext.Provider value={firestore}>  {children}  </FireStoreContext.Provider>
};

export const useFirestore = () => {
    return useContext(FireStoreContext);
};

function useProvideFireStore() {
    const [fireStoreError, setFireStoreError] = React.useState(null);
    const [characters, setCharacters] = React.useState([]);


    const setUpListeners = () => {
        db.collection("characters").where("campaign", "==", "iqNOydMMd4hJY5uxmveW")
            .onSnapshot(function (querySnapshot) {
                var characters = [];
                querySnapshot.forEach(function (character) {
                    characters.push(character.data());
                });
                setCharacters(characters);
            });
    }

    useEffect(() => {
        setUpListeners();
        getAllCharacters();
    }, []);

    const createNewCharacter = (name, title, notes, relationships) => {
        db.collection("characters").doc(name).set({
            name: name,
            title: title,
            notes: notes,
            relationships: relationships,
            campaign: "iqNOydMMd4hJY5uxmveW"
        })
            .catch(function (error) {
                console.error("Error adding document: ", error);
                setFireStoreError(error);
            });
    };

    const deleteCharacter = (name) => {
        db.collection("characters").doc(name)
            .delete()
            .then(() => {
                console.log(`Document ${name} deleted`);
            }).catch(function (error) {
                console.log(`Failed to delete ${name}`)
            })
    }

    const getAllCharacters = () => {
        axios
            .get('/characters')
            .then(response => {
                console.log(response.data)
                setCharacters(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }

    return {
        characters,
        fireStoreError,
        createNewCharacter,
        deleteCharacter,
        getAllCharacters,
    };
}