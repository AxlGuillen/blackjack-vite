import { createDeck } from "./usecases/create-deck";
import { drawCard } from "./usecases/draw-card";

const miModulo = (() => {
  "use strict";

  let deck = [];
  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];

  let puntosJugadores = [];
  let turnoActual = 0;

  // Referencias del html
  const btnNuevo = document.querySelector("#btnNuevo"),
    btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener"),
    numJugadoresInput = document.querySelector("#numJugadores"),
    jugadoresDiv = document.querySelector("#jugadores");

  let divCartasJugadores = [];
  let puntosHtml = [];

  const inicializarJuego = () => {
    const numJugadores = parseInt(numJugadoresInput.value);
    generarApartadosJugadores(numJugadores);

    deck = createDeck(tipos, especiales);
    puntosJugadores = Array(numJugadores + 1).fill(0); // Incluye la computadora
    turnoActual = 0;

    puntosHtml.forEach((elem) => (elem.innerText = 0));
    divCartasJugadores.forEach((elem) => (elem.innerHTML = ""));

    btnPedir.disabled = false;
    btnDetener.disabled = false;
  };

  const generarApartadosJugadores = (numJugadores) => {
    jugadoresDiv.innerHTML = ""; // Limpia los apartados existentes

    for (let i = 1; i <= numJugadores; i++) {
      const jugadorDiv = document.createElement("div");
      jugadorDiv.classList.add("col");

      jugadorDiv.innerHTML = `
        <h1>Jugador ${i} - <small>0</small></h1>
        <div id="jugador${i}-cartas" class="divCartas"></div>
      `;
      jugadoresDiv.appendChild(jugadorDiv);
    }

    actualizarReferencias();
  };

  const actualizarReferencias = () => {
    divCartasJugadores = document.querySelectorAll(".divCartas");
    puntosHtml = document.querySelectorAll("small");
  };

  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHtml[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  };

  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugadores[turno].append(imgCarta);
  };

  const determinarGanador = () => {
    setTimeout(() => {
      let puntosGanadores = 0;
      let indicesGanadores = [];
      const numJugadores = puntosJugadores.length - 1;
      const puntosComputadora = puntosJugadores[numJugadores];

      for (let i = 0; i < puntosJugadores.length; i++) {
        if (puntosJugadores[i] <= 21 && puntosJugadores[i] > puntosGanadores) {
          puntosGanadores = puntosJugadores[i];
        }
      }

      indicesGanadores = puntosJugadores.reduce((acc, puntosJugador, index) => {
        if (puntosJugador === puntosGanadores) {
          acc.push(index);
        }
        return acc;
      }, []);

      if (indicesGanadores.length === 1) {
        if (indicesGanadores[0] === numJugadores) {
          alert(
            "La computadora ganó con una puntuación de: " + puntosGanadores
          );
        } else {
          alert(
            "El jugador " +
              (indicesGanadores[0] + 1) +
              " ganó con una puntuación de: " +
              puntosGanadores
          );
        }
      } else {
        let ganadores = indicesGanadores.map((index) => {
          return index === numJugadores
            ? "Computadora"
            : "Jugador " + (index + 1);
        });
        alert(
          "Empate entre: " +
            ganadores.join(", ") +
            " con una puntuación de: " +
            puntosGanadores
        );
      }

      btnNuevo.disabled = false;
    }, 1000);
  };

  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0;
    do {
      const carta = drawCard(deck);
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
    determinarGanador();
  };

  const siguienteTurno = () => {
    if (turnoActual < puntosJugadores.length - 2) {
      turnoActual++;
      btnPedir.disabled = false;
      btnDetener.disabled = false;
    } else {
      turnoActual++;
      btnPedir.disabled = true;
      btnDetener.disabled = true;

      const puntosMinimos = puntosJugadores.reduce(
        (acc, puntos, index) =>
          index < puntosJugadores.length - 1 && puntos <= 21 && puntos > acc
            ? puntos
            : acc,
        0
      );
      turnoComputadora(puntosMinimos);
    }
  };

  btnPedir.addEventListener("click", () => {
    const carta = drawCard(deck);
    const puntosJugador = acumularPuntos(carta, turnoActual);
    crearCarta(carta, turnoActual);
    if (puntosJugador >= 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      siguienteTurno();
    }
  });

  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    siguienteTurno();
  });

  btnNuevo.addEventListener("click", () => {
    inicializarJuego();
  });
})();
