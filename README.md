
La ruta que estás utilizando para cargar el archivo GLTF es ./assets/scene.gltf. Esta es una ruta relativa, lo que significa que el archivo scene.gltf debe estar en una carpeta llamada assets en el mismo directorio que tu archivo JavaScript.

Si el archivo scene.gltf está en la ubicación correcta y aún así recibes un error, podría ser un problema con la configuración de tu servidor. Asegúrate de que tu servidor esté configurado para servir archivos estáticos.

Si el problema persiste, podría ser útil imprimir la respuesta del servidor para ver qué estás recibiendo. Puedes hacerlo agregando un console.log en la función de error del cargador:

JavaScript

gltfLoader.load(
    './assets/scene.gltf',
    (gltfscene) => {
        scene.add(gltfscene.scene);
    },
    undefined,
    (error) => {
        console.error('Error al cargar el archivo GLTF:', error);
    }
);

parcel ./src/index.html
https://drive.google.com/drive/folders/1SimD0zgmwKq8rgOdUR1atEctoS0ETMxD