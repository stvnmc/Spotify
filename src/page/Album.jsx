import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

const Album = () => {
  const { infoGetAlbum, infoAlbum } = useSearch();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await infoGetAlbum(id);
        // Puedes realizar otras operaciones después de obtener el álbum aquí
      } catch (error) {
        console.error("Error fetching album:", error);
      } finally {
        setLoading(false);
      }
    };

    console.log(infoAlbum);
    fetchData();
  }, []);

  return (
    <section className="sectionAlbum">
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <div>
            <div
              style={{ backgroundImage: `url(${infoAlbum.images[1].url})` }}
            ></div>
            <div>
              <h1>Album</h1>
              <h1>{infoAlbum.name}</h1>
              <div>
                <h1>{infoAlbum.artists[0].name}</h1>
                <div></div>
                <h1>{infoAlbum.relese_date}</h1>
                <div></div>
                <h1>{infoAlbum.tracks.items.length} songs</h1>
              </div>
            </div>
          </div>
          <div>
            <div></div>
            <div>

            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Album;
