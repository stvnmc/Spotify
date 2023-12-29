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
  const [tracksUserLibrary, setTracksUserLibrary] = useState({
    tracksIds: [],
    albumsArtistIds: [],
  });

  const saveUserLibrary = (id, type) => {
    const currentDate = new Date();
    const newItem = {
      id,
      dateAdded: currentDate,
    };
  
    setTracksUserLibrary((prevState) => {
      let updatedState;
  
      if (type === "song" && !prevState.tracksIds.some((item) => item.id === id)) {
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
  
      saveListUser(updatedState);
  
      return { ...prevState, ...updatedState };
    });
  };
  
  const deleteUserLibrary = (id, type) => {
    setTracksUserLibrary((prevState) => {
      let updatedState;
  
      if (type === "song" && prevState.tracksIds.some((item) => item.id === id)) {
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
  
      saveListUser(updatedState);
  
      return { ...prevState, ...updatedState };
    });
  };
  







  function saveListUser(updatedState) {
    const newTracksUserLibrary = JSON.stringify(updatedState);
    localStorage.setItem("save_list_user", newTracksUserLibrary);
  }

  useEffect(() => {
    const saveListUser = localStorage.getItem("save_list_user");
    const newSaveListUserJSON = JSON.parse(saveListUser);
    if (saveListUser) setTracksUserLibrary(newSaveListUserJSON);
  }, []);

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
