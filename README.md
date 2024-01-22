Importante: El sitio web necesita un correo que esté identificado en developer.spotify.com para acceder al funcionamiento correcto de la API de Spotify. Esto se debe a que, para obtener un uso libre de la API con cualquier usuario, se requiere una autorización proporcionada por Spotify. Actualmente, no poseo esta autorización, y su obtención puede llevar meses.

Documentación del Proyecto
Estructura de Archivos y Carpetas
src: Contiene todos los archivos fuente de la aplicación.
components: Componentes React reutilizables.
context: Archivos relacionados con el manejo de contextos.
api: Funciones relacionadas con la interacción con la API.
functions: Funciones de utilidad y ayudantes.
animation: Componentes o archivos relacionados con animaciones.
Contexto de Autenticación (AuthContext)
Descripción: Proporciona un contexto para gestionar la autenticación de usuario.

Métodos y Propiedades:

useAuth: Hook personalizado para acceder al contexto de autenticación.
AuthProvider: Componente proveedor del contexto de autenticación.
login: Función para redirigir a la autorización de Spotify.
useEffect: Comprueba y autentica automáticamente al usuario.
Panel Derecho (RightPanel)
Descripción: Componente que muestra la barra de navegación y elementos relacionados con la búsqueda y la biblioteca del usuario.

Props:

infoPageRightPanel: Función para obtener información específica para elementos de la biblioteca.
tracksUserLibrary: Datos relacionados con la biblioteca del usuario.
Barra de Navegación (NavBar)
Descripción: Barra de navegación superior e inferior.

Métodos:

goBack: Navega hacia atrás.
goForward: Navega hacia adelante.
abrirEnlace: Abre el enlace del perfil de GitHub en una nueva pestaña.
Elementos de la Biblioteca del Usuario
CartItemsArtis
Descripción: Componente que representa artistas en la biblioteca del usuario.

Props:

redirectPage: Función para redirigir a una página específica.
saveIdList: Función para manejar la lista de reproducción o la acción de guardar.
idPlayState: ID del elemento que se está reproduciendo actualmente.
isPlaying: Estado de reproducción actual.
CartItemsAlbums
Descripción: Componente que representa álbumes en la biblioteca del usuario.

Props:

redirectPage: Función para redirigir a una página específica.
saveIdList: Función para manejar la lista de reproducción o la acción de guardar.
idPlayState: ID del elemento que se está reproduciendo actualmente.
isPlaying: Estado de reproducción actual.
CartItemsTrack
Descripción: Componente que representa canciones en la biblioteca del usuario.

...

SongCollection
Descripción: Componente que representa canciones en la colección del usuario.

...

SongArtist
Descripción: Componente que representa canciones de un artista en la biblioteca del usuario.

...

Song
Descripción: Componente que representa canciones en la biblioteca del usuario.

...

HomeRecommendation
Descripción: Componente que muestra recomendaciones en la página de inicio.

Props:

item: Elemento recomendado.
playAlbum: Función para reproducir un álbum.
idPlayState: ID del elemento que se está reproduciendo actualmente.
saveIdList: Función para manejar la lista de reproducción o la acción de guardar.
isPlaying: Estado de reproducción actual.
playListState: Estado de la lista de reproducción actual.
redirectPage: Función para redirigir a una página específica.
