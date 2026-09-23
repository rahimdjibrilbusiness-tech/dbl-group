const supabaseClient = window.supabase.createClient(
  "https://zzcmzbhkgkjtcjtjsnyk.supabase.co",
  "sb_publishable_BO0nXC8mm4-y-Z1BhyAknQ_Sdjy_pS3"
);

let vehicles = [];

function money(n) {
  return n
    ? new Intl.NumberFormat("fr-FR").format(n) + " FCFA"
    : "Sur devis";
}

async function loadVehicles() {
  const { data, error } = await supabaseClient
    .from("vehicles")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Erreur Supabase :", error);
    document.querySelector("#vehicleGrid").innerHTML =
      '<p class="muted">Impossible de charger les véhicules pour le moment.</p>';
    return;
  }

  vehicles = data || [];
  render(vehicles);
}

function render(list = vehicles) {
  const grid = document.querySelector("#vehicleGrid");

  if (!grid) return;

  if (!list.length) {
    grid.innerHTML =
      '<p class="muted">Aucun véhicule disponible actuellement.</p>';
    return;
  }

  grid.innerHTML = list
    .map(
      (v) => `
      <article class="vehicle">
        <div class="photo">
          <span>${v.type || "Véhicule"} • ${v.status || ""}</span>
        </div>

        <div class="body">
          <h3>${v.name}</h3>

          <div class="muted">
            Année : ${v.year || "—"}
          </div>

          <div class="muted">
            Prix HT : ${money(v.price_ht)}
          </div>

          <div class="price">
            ${money(v.price_ttc)} TTC
          </div>

          <span class="pill">
            ${v.status || "Sur commande"}
          </span>

          <br><br>

          <button onclick="showVehicle('${String(v.name).replace(/'/g, "\\'")}')">
            Détails
          </button>
        </div>
      </article>
    `
    )
    .join("");
}

function filterVehicles() {
  const search = document
    .querySelector("#search")
    .value
    .toLowerCase()
    .trim();

  const filtered = vehicles.filter((v) =>
    `${v.name} ${v.type} ${v.status} ${v.year}`
      .toLowerCase()
      .includes(search)
  );

  render(filtered);
}

function showVehicle(name) {
  alert(
    "Fiche véhicule : " +
      name +
      "\n\nDans la version production : galerie, vidéo, fiche technique, HT/TTC, disponibilité, réservation, achat et WhatsApp."
  );
}

function quoteRental() {
  document.querySelector("#rentalResult").textContent =
    "Demande enregistrée dans le prototype. La version production calculera automatiquement la durée, le véhicule disponible, le dépôt et le montant final.";
}

function calcImport() {
  const model = document.querySelector("#imodel");
  const port = document.querySelector("#port");

  if (!model || !port) return;

  const p = Number(model.value);
  const t = Number(port.value);
  const fees = 850000 + t;

  document.querySelector("#iprice").textContent = money(p);
  document.querySelector("#iship").textContent = money(fees);
  document.querySelector("#itotal").textContent = money(p + fees);
}

function submitSell() {
  document.querySelector("#sellResult").textContent =
    "Votre annonce est prête à être envoyée en modération DBL. La version production demandera également les photos obligatoires, le VIN et la vidéo de présentation.";
}

function go(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}

function toggleMenu() {
  const nav = document.querySelector("nav");

  nav.style.display =
    nav.style.display === "flex" ? "none" : "flex";
}

loadVehicles();
calcImport();
