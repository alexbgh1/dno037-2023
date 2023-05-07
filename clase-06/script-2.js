async function segundo() {
  const consulta = await fetch(
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"
  );
  const data = await consulta.json();
  //Declaro variables que parten en cero

  //Reviso data con alguna condiciones
  const counts = data.features.reduce(
    (acc, t) => {
      // Buscamos el país en el que ocurrió el terremoto
      const place = t.properties.place.toLowerCase();
      if (place.includes("chile")) {
        acc.Chile += 1;
      } else if (place.includes("argentina")) {
        acc.Argentina += 1;
      } else if (place.includes("perú")) {
        acc.Perú += 1;
      } else if (place.includes("japan")) {
        acc.Japan += 1;
      } else {
        acc.Otros += 1;
      }
      return acc;
    },
    { Chile: 0, Argentina: 0, Perú: 0, Japan: 0, Otros: 0 }
  );
  console.log(counts);

  //Creo una variable como un arreglo vacío
  var numeros = [];
  var nombres = [];
  var colors = [];

  //Empujo a la variable los resultados del contador
  for (var i in counts) {
    numeros.push(counts[i]);
    nombres.push(i);
    // Random pastel color
    colors.push("#" + Math.floor(Math.random() * 16777215).toString(16)) + "80";
  }

  let graph_countries = document.querySelector(".graph-countries");
  graph_countries.innerText =
    "El gráfico resulta de consultar cada registro de movimiento telúrico: " +
    data.features.length +
    " terremotos en total. En donde consideramos los siguientes países:" +
    "\n\n";

  //Recorro el arreglo de países y los imprimo en el html
  for (let i = 0; i < nombres.length; i++) {
    graph_countries.innerText +=
      // nombres[i] + ": " + numeros[i] + "\n";
      nombres[i] + ": " + numeros[i] + "\n ";
  }

  //Ahora puedo armar el gráfico
  new Chart(document.getElementById("earthquakes").getContext("2d"), {
    type: "doughnut",
    data: {
      labels: nombres,
      datasets: [
        {
          label: "Earthquakes",
          data: numeros,
          backgroundColor: colors,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: false,
        },
      },
      responsive: true,
      layout: {
        padding: 20,
      },
    },
  });
}
segundo().catch((error) => console.error(error));
