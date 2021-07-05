document.addEventListener("DOMContentLoaded",()=>{

    //Variables
    const playlist = document.querySelector(".playlist");//Seleccionamos el contenedor donde almacenaremos canciones
    let canciones = [];
    canciones = JSON.parse(localStorage.getItem("canciones")) || [];







    //LLmada a funciones o eventos
    console.log(canciones);

    if(canciones.length > 0){
        insertarCanciones(canciones);
        borrarMnsg(canciones);
    }

    document.addEventListener("click",seleccionarCancion);
    




    //Funciones
    function seleccionarCancion(e){
        if(e.target.id === "seleccionar" && !e.target.classList.contains("remove")){
            const cancionContenedor = e.target.parentElement.parentElement.parentElement;
            const loaded = document.querySelector(".loaded1");
            loaded.style.display = "block";
            
            setTimeout(()=>{
                loaded.style.display = "none";
            },500);

            leerDatosCancion(cancionContenedor);
        }
        if(e.target.classList.contains("remove")){
            const cancionContenedor = e.target.parentElement.parentElement.parentElement;
            const id = cancionContenedor.dataset.id;

            const loaded = document.querySelector(".loaded2");
            loaded.style.display = "block";
            
            setTimeout(()=>{
                loaded.style.display = "none";
            },500);

            //localStorage.removeItem("canciones");
            canciones = canciones.filter(cancion => cancion.id != id);
            localStorage.setItem("canciones",JSON.stringify(canciones));
            borrarMnsg(canciones);
            insertarCanciones(canciones);
        }
    }


    function leerDatosCancion(cancionContenedor){
        const cancion = {
            id: Date.now(),
            imagen: cancionContenedor.querySelector("#image img").src,
            nombre:cancionContenedor.querySelector("#description h1").textContent,
            descripcion:cancionContenedor.querySelector("#description p").textContent
        }
        canciones = [...canciones,cancion];
        localStorage.setItem("canciones",JSON.stringify(canciones));
        insertarCanciones(canciones);
    }

    function insertarCanciones(canciones){
        while(playlist.firstChild){
            playlist.removeChild(playlist.firstChild);
        }
        borrarMnsg(canciones);
        canciones.forEach(cancion => {
            const {id,imagen,nombre,descripcion} = cancion;

            const cancionHTML = document.createElement("div");
            cancionHTML.innerHTML = `
                <div class="song" data-id = ${id}>
                <div id="image"><img src="${imagen}" alt="song"></div>
                    
                <div id="description" class="font-primary">
                    <h1>${nombre}</h1>
                    <p>${descripcion}</p>
                </div>

                <div id="buttons">
                    <div id="controls">
                        <button><i class="fas fa-backward"></i></button>
                        <button><i class="far fa-play-circle"></i></button>
                        <button><i class="fas fa-forward"></i></button>
                    </div>

                    <div id="feelings">
                        <i class="fas fa-heart"></i>
                        <button id="seleccionar" class="remove">Eliminar</button>
                        <i class="fas fa-share-alt"></i>
                    </div>
                </div>
                </div>
            `;

            playlist.appendChild(cancionHTML);
        });
    }

    function borrarMnsg(canciones){//Quita el mensaje de lista vacia cuando ya se inserta canciones
        if(canciones.length >= 1){
            const h4 = document.querySelector(".container h4");
            h4.style.display = "none";
        }else if(canciones.length === 0){
            const h4 = document.querySelector(".container h4");
            h4.style.display = "block";
        }
    }
});