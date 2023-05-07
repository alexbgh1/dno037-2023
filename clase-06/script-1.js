async function primero() {
  let hombresColor = "#55a1ff";
  let mujeresColor = "#ea3f5f";

  const consulta = await fetch(
    "https://raw.githubusercontent.com/profesorfaco/dno037-2023/main/clase-06/datos.json"
  );
  const data = await consulta.json();
  //Declaro variables que parten con un arreglo vacío
  let regiones = [];
  let hombres = [];
  let mujeres = [];
  //Reviso data y empujo un elemento a cada arreglo que estaba vacío
  data.forEach((x) => {
    regiones.push(x.region);
    hombres.push(x.hombres);
    mujeres.push(x.mujeres);
  });
  //Ahora puedo armar el gráfico
  new Chart(document.getElementById("regiones"), {
    type: "bar",
    data: {
      labels: regiones,
      datasets: [
        {
          label: "Hombres",
          data: hombres,
          backgroundColor: hombresColor,
        },
        {
          label: "Mujeres",
          data: mujeres,
          backgroundColor: mujeresColor,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Población por región",
        },
      },
      responsive: true,
      layout: {
        padding: 20,
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
          ticks: {
            callback: function (numero) {
              return numero.toLocaleString("es-CL");
            },
          },
        },
      },
    },
  });

  const totalHombres = hombres.reduce((a, b) => a + b, 0);
  const totalMujeres = mujeres.reduce((a, b) => a + b, 0);
  const total = totalHombres + totalMujeres;
  console.log(totalHombres, totalMujeres);
  // Con los totales, podemos asignar este valor a los svg
  // svg--hombres ; id: hombres-percent
  // svg--mujeres : id: mujeres-percent
  // Insertaremos en el svg > defs : Un linearGradient

  // Hombres
  const getHombresPercent = (totalHombres / total) * 100;
  let referenceHombres = document.querySelector(".svg--hombres--defs");

  // Append child svg > defs >
  const linearGradientHombres = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "linearGradient"
  );
  linearGradientHombres.setAttribute("id", "hombres-percent");
  linearGradientHombres.setAttribute("x1", "0%");
  linearGradientHombres.setAttribute("y1", "0%");
  linearGradientHombres.setAttribute("x2", "100%");
  linearGradientHombres.setAttribute("y2", "0%");
  linearGradientHombres.innerHTML = `
    <stop offset="0%" stop-color="${hombresColor}"></stop>
    <stop offset="${getHombresPercent}%" stop-color="${hombresColor}"></stop>
    <stop offset="${getHombresPercent}%" stop-color="${mujeresColor}"></stop>
    <stop offset="100%" stop-color=${mujeresColor}></stop>
    `;
  referenceHombres.appendChild(linearGradientHombres);

  // Reference .hombres y .mujeres
  let pHombres = document.querySelector(".hombres");
  let pMujeres = document.querySelector(".mujeres");
  pHombres.innerHTML = `${getHombresPercent.toFixed(1)}% hombres`;
  pMujeres.innerHTML = `${(100 - getHombresPercent).toFixed(1)}% mujeres`;
}
primero().catch((error) => console.error(error));
