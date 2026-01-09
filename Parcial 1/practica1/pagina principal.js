const lugares = [
  {
    nombre: "Hotel Poseidón",
    tipo: "Hotel",
    descripcion:
      "Hotel frente al mar con piscina y restaurante.",
  },
  {
    nombre: "Hotel Oro Verde",
    tipo: "Hotel",
    descripcion:
      "Hotel 5 estrellas con vista a la playa y spa.",
  },
  {
    nombre: "Restaurante La Casa Rosada",
    tipo: "Restaurante",
    descripcion:
      "Gastronomía típica de la costa ecuatoriana.",
  },
  {
    nombre: "Museo Cancebí",
    tipo: "Museo",
    descripcion:
      "Historia y cultura de Manta y Manabí.",
  },
];

// Interactividad mínima: búsqueda (respeta filtro) y publicación de reseñas con persistencia local
document.addEventListener(
  "DOMContentLoaded",
  () => {
    const inputBusqueda =
      document.getElementById("busqueda");
    const divResultados =
      document.getElementById("resultados");
    const filtros =
      document.getElementById("filtros");

    function renderResults(items) {
      divResultados.innerHTML = "";
      if (!items || items.length === 0) {
        divResultados.innerHTML =
          "<p>No se encontraron resultados.</p>";
        return;
      }
      for (const lugar of items) {
        const div = document.createElement("div");
        div.className = "resultado";
        div.innerHTML = `<strong>${lugar.nombre}</strong> <span class="muted">(${lugar.tipo})</span><br><small>${lugar.descripcion}</small>`;
        divResultados.appendChild(div);
      }
    }

    function performSearch() {
      if (!inputBusqueda) return;
      const texto = inputBusqueda.value
        .trim()
        .toLowerCase();
      const filtro = filtros ? filtros.value : "";

      if (texto.length === 0) {
        divResultados.innerHTML = "";
        return;
      }

      const resultadosFiltrados = lugares.filter(
        (lugar) => {
          const nombre =
            lugar.nombre.toLowerCase();
          const tipo = lugar.tipo.toLowerCase();
          const descripcion =
            lugar.descripcion.toLowerCase();

          if (filtro === "tipo") {
            return (
              tipo.includes(texto) ||
              nombre.includes(texto)
            );
          }
          // por defecto, buscar en nombre/tipo/descripcion
          return (
            nombre.includes(texto) ||
            tipo.includes(texto) ||
            descripcion.includes(texto)
          );
        }
      );

      renderResults(resultadosFiltrados);
    }

    if (inputBusqueda)
      inputBusqueda.addEventListener(
        "input",
        performSearch
      );
    if (filtros)
      filtros.addEventListener(
        "change",
        performSearch
      );

    // ---- Manejo de reseñas: publicación y persistencia en localStorage ----
    function loadReviews() {
      for (const article of document.querySelectorAll(
        ".lugar"
      )) {
        const titleEl =
          article.querySelector("h3");
        if (!titleEl) continue;
        const key =
          "reviews-" + titleEl.textContent.trim();
        const reviews = JSON.parse(
          localStorage.getItem(key) || "[]"
        );
        let container =
          article.querySelector(".reviews");
        if (!container) {
          container =
            document.createElement("div");
          container.className = "reviews";
          article.appendChild(container);
        }
        for (const r of reviews) {
          const p = document.createElement("p");
          p.className = "review-item";
          p.textContent = r;
          container.appendChild(p);
        }
      }
    }

    function attachReviewHandlers() {
      for (const article of document.querySelectorAll(
        ".lugar"
      )) {
        const btn =
          article.querySelector("button");
        const textarea =
          article.querySelector("textarea");
        const titleEl =
          article.querySelector("h3");
        if (!btn || !textarea || !titleEl)
          continue;

        btn.addEventListener("click", () => {
          const text = textarea.value.trim();
          if (!text) {
            showNotification(
              "Escribe una reseña antes de publicar",
              "warning"
            );
            textarea.focus();
            return;
          }
          const key =
            "reviews-" +
            titleEl.textContent.trim();
          const reviews = JSON.parse(
            localStorage.getItem(key) || "[]"
          );
          reviews.unshift(text);
          localStorage.setItem(
            key,
            JSON.stringify(reviews)
          );

          let container =
            article.querySelector(".reviews");
          if (!container) {
            container =
              document.createElement("div");
            container.className = "reviews";
            article.appendChild(container);
          }
          const p = document.createElement("p");
          p.className = "review-item";
          p.textContent = text;
          container.insertBefore(
            p,
            container.firstChild
          );
          textarea.value = "";
          showNotification(
            "Reseña publicada",
            "success"
          );
        });
      }
    }

    function showNotification(
      message,
      level = "info"
    ) {
      let notif = document.getElementById(
        "notificaciones"
      );
      if (!notif) {
        notif = document.createElement("div");
        notif.id = "notificaciones";
        notif.setAttribute("aria-live", "polite");
        notif.className = "notif";
        document.body.appendChild(notif);
      }
      notif.textContent = message;
      notif.className = "notif " + level;
      setTimeout(() => {
        if (
          notif &&
          notif.textContent === message
        )
          notif.textContent = "";
      }, 3000);
    }

    // Inicializar
    loadReviews();
    attachReviewHandlers();
  }
);
