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
Elementos de la Biblioteca del Usuario (CartItemsArtis, CartItemsAlbums, CartItemsTrack, SongCollection, SongArtist, Song)
Descripción: Componentes que representan elementos individuales en la biblioteca del usuario.
Props:
redirectPage: Función para redirigir a una página específica.
saveIdList: Función para manejar la lista de reproducción o la acción de guardar.
idPlayState: ID del elemento que se está reproduciendo actualmente.
isPlaying: Estado de reproducción actual.