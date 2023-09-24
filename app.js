// Obtener los datos del archivo json
const url = 'data.json';

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('No se pudo cargar el archivo JSON');
    }
    return response.json();
  })
  .then(data => {
    crearQuiz(data)
  })
  .catch(error => {
   console.error('Error:', error);
  });


  const container = document.querySelector('.container');
  container.classList.add('container')
  let x = 0
  let puntos = 0
  let numPregunta = 0

  //funcion principal
  function crearQuiz(data){
    //crear el quiz
      let quiz = document.createElement('div');
        quiz.classList.add('quiz');
        container.appendChild(quiz);
      let pregunta = document.createElement('h5')
      
       quiz.appendChild(pregunta)
       pregunta.innerText = data[x].pregunta
      let opciones = document.createElement('div')
        opciones.classList.add('opciones')
        quiz.appendChild(opciones)
        let botones = []
        for(i = 1; i <= 4 ; i++ ){
          boton = document.createElement('button')
          botones.push(boton)
          boton.classList.add('boton')
          opciones.appendChild(boton)
          boton.innerText = data[x][i]  
      }
      //cuando le de click a una opcion crear el siguiente quiz
      botones.forEach((e, index) => {
        e.addEventListener('click', (event) => {
          opcionSeleccionada = event.target.innerText
          numPregunta++
          if (opcionSeleccionada == data[x][5]){
            puntos++
          }
            container.innerHTML = '' 
            x++
          
          if (numPregunta < data.length){
            crearQuiz(data)
          }else { //si no hay mas preguntas, mostrar el resultado
            let quiz = document.createElement('div')
            quiz.classList.add('quiz')
            container.appendChild(quiz)
            let res = document.createElement('h3')
            quiz.appendChild(res)
            res.innerHTML = `Acertaste ${puntos} de ${data.length}`
          }
        })
      })
    }