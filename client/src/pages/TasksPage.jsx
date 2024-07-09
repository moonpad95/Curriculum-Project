import { Button } from "react-bootstrap";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import cctbg from "./../pages/cv2.png";

const TasksPage = () => {
  // Referencia al elemento contenedor de la animación
  const comp = useRef(null);

  // Hook useLayoutEffect utilizado para ejecutar la animación cuando el componente está montado en el DOM
  useLayoutEffect(() => {
    // Inicia una nueva instancia de TimelineMax de GSAP y vincula el contexto a 'comp'
    let ctr = gsap.context(() => {
      // Define una nueva línea de tiempo de animación con GSAP
      const t1 = gsap.timeline();

      // Animación de entrada para el slider de introducción
      t1.from("#intro-slider", {
        xPercent: "-100",
        duration: 1.3,
        delay: 0.4
      })
      // Animación de entrada para el logo y el texto
      .from(["#logo1", "#text1"], {
        opacity: 0,
        y: "+=30",
        stagger: 0.5,
      })
      // Animación de salida para el logo y el texto
      .to(["#logo1", "#text1"],{
        opacity: 0,
        y: "-=30",
        delay: 0.4,
        stagger: 0.5,
      })
      // Animación de salida para el slider de introducción
      .to("#intro-slider", {
        xPercent: "-100",
        duration: 0.4,
      })
      // Animación de entrada para el mensaje de bienvenida
      .from("#welcome",{
        opacity: 0,
        duration: 0.5,
      });
    }, comp);

    // Función de limpieza para revertir la animación cuando el componente se desmonta
    return () => ctr.revert();
  }, []); // El array vacío [] asegura que el efecto solo se ejecute una vez después del montaje inicial

  // Renderiza el componente con los elementos HTML y la estructura de JSX
  return (
    <div className="relative" ref={comp}>
      <div className=" p-10 bg-indigo-500 absolute top-0 left-0 h-screen flex w-full  place-items-center"  id="intro-slider" >
        <img src={cctbg} alt="Logo1" id="logo1" />
        <div className="text-6xl text-left text-white ml-10 font-bold font-mono" id="text1">
          <h1>Sistema Curricular</h1>
          <h1>Cultive Care Tecnologies</h1>
        </div>
      </div>
      <div className="bg-purple-900" id="welcome-page">
        <div className=" h-screen flex justify-center place-items-center">
          <h1 className="text-8xl font-bold text-center text-purple-100">Bienvenido al Sistema Curricular de Cultive Care Technologies
            <Button type="button" href="/datos-generales" className="text-white mt-40 bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full px-5 py-5 text-center mb-2 dark:bg-pink-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-4/5 text-2xl text-bold font-mono"> Generar mi propio Curriculum</Button>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default TasksPage;
