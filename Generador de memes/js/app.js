document.addEventListener('DOMContentLoaded', function(){

    const canvas = document.getElementById('canvas');
    const contexto = canvas.getContext('2d');

    const api_key = 'live_LeFH3rlKn7H37vUVH5cvTSRxPYOcQbBHN8iMJds7bz3bOmiYCEjKJf6hzdIdM00K';
    let image = new Image();

    document.getElementById('generar').addEventListener('click', GetDogImage);
    document.getElementById('actualizar').addEventListener('click', addText);


    async function GetDogImage(){
        try{
            const response = await fetch(`https://api.thedogapi.com/v1/images/search?api_key=$(api_key)`)
            .then(response => response.json())
            .then(datos =>{
                image.src = datos[0].url;
                addImage();
                //document.getElementById('img').src = datos[0].url;
            })
        } catch (error){
            console.log(error)
        }
    }



    function addImage(){
        image.addEventListener('load', ()=>{
            const relacion_de_aspecto = image.width/image.height;
            const maxwidth = window.innerWidth * 0.8;
            const maxheight = window.innerHeight * 0.8;

            let canvasWidth, canvasHeight;

            if (maxwidth/maxheight < relacion_de_aspecto){
                canvasWidth = maxwidth;
                canvasHeight = maxwidth / relacion_de_aspecto;

            } else {
                canvasWidth = maxheight * relacion_de_aspecto;
                canvasHeight = maxheight;
            }
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            contexto.drawImage(image, 0, 0, canvas.width, canvas.height)
            addText();

        });
    }

    function addText(){
        const text = document.getElementById('texto').value;
        const size = document.getElementById('size').value;
        const color = document.getElementById('color').value;

        contexto.drawImage(image, 0, 0, canvas.width, canvas.height);

        contexto.fillStyle = color;
        contexto.font = `${size}px 'Arial'`;
        contexto.textAlign = 'center';
        contexto.fillText(text, canvas.width/2, canvas.height * 0.75);

    }
});