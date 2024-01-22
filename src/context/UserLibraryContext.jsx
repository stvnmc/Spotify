import { createContext, useContext, useEffect, useState } from "react";

export const UserLibraryContext = createContext();

export const useSerLibrary = () => {
  const context = useContext(UserLibraryContext);

  if (!context) {
    console.log("need login");
  }
  return context;
};

export const UserLibraryProvider = ({ children }) => {
  // Estado local que almacena las listas de canciones y álbumes del usuario
  const [tracksUserLibrary, setTracksUserLibrary] = useState({
    tracksIds: [],
    albumsArtistIds: [],
  });

  // Función para agregar elementos a la biblioteca del usuario
  const saveUserLibrary = (id, type) => {
    const currentDate = new Date();
    const newItem = {
      id,
      dateAdded: currentDate,
    };

    setTracksUserLibrary((prevState) => {
      let updatedState;

      // Actualizar el estado dependiendo del tipo (canción o álbum/artista)
      if (
        type === "song" &&
        !prevState.tracksIds.some((item) => item.id === id)
      ) {
        updatedState = {
          ...prevState,
          tracksIds: [...prevState.tracksIds, newItem],
        };
      } else if (
        type === "albumArtist" &&
        !prevState.albumsArtistIds.some((item) => item.id === id)
      ) {
        updatedState = {
          ...prevState,
          albumsArtistIds: [...prevState.albumsArtistIds, newItem],
        };
      } else {
        return prevState;
      }

      // Guardar la lista actualizada en el almacenamiento local
      saveListUser(updatedState);

      return { ...prevState, ...updatedState };
    });
  };

  // Función para eliminar elementos de la biblioteca del usuario
  const deleteUserLibrary = (id, type) => {
    setTracksUserLibrary((prevState) => {
      let updatedState;

      // Actualizar el estado dependiendo del tipo (canción o álbum/artista)
      if (
        type === "song" &&
        prevState.tracksIds.some((item) => item.id === id)
      ) {
        updatedState = {
          ...prevState,
          tracksIds: [
            ...prevState.tracksIds.filter((existingId) => existingId.id !== id),
          ],
        };
      } else if (
        type === "albumArtist" &&
        prevState.albumsArtistIds.some((item) => item.id === id)
      ) {
        updatedState = {
          ...prevState,
          albumsArtistIds: [
            ...prevState.albumsArtistIds.filter(
              (existingId) => existingId.id !== id
            ),
          ],
        };
      } else {
        return prevState;
      }

      // Guardar la lista actualizada en el almacenamiento local
      saveListUser(updatedState);

      return { ...prevState, ...updatedState };
    });
  };

  // Función para guardar la lista actualizada en el almacenamiento local
  function saveListUser(updatedState) {
    const newTracksUserLibrary = JSON.stringify(updatedState);
    localStorage.setItem("save_list_user", newTracksUserLibrary);
  }

  // Efecto para cargar la lista del usuario desde el almacenamiento local al montar el componente
  useEffect(() => {
    const saveListUser = localStorage.getItem("save_list_user");
    const newSaveListUserJSON = JSON.parse(saveListUser);
    if (saveListUser) setTracksUserLibrary(newSaveListUserJSON);
  }, []);

  // Proporcionar el contexto y sus valores al árbol de componentes descendientes
  return (
    <UserLibraryContext.Provider
      value={{
        saveUserLibrary,
        tracksUserLibrary,
        deleteUserLibrary,
      }}
    >
      {children}
    </UserLibraryContext.Provider>
  );
};
