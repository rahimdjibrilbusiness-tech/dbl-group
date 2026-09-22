const supabaseClient = window.supabase.createClient(
  "https://zzcmzbhkgkjtcjtjsnyk.supabase.co",
  "sb_publishable_BO0nXC8mm4-y-Z1BhyAknQ_Sdjy_pS3",
);
const vehicles=[
{name:"Changan UNI-K AWD 2026",type:"SUV",price:18800000,ht:15800000,status:"Disponible immédiatement"},
{name:"GAC GS3 2026",type:"SUV",price:9500000,ht:8200000,status:"Disponible"},
{name:"GAC GS3 Emzoom Rstyle 2026",type:"SUV",price:11500000,ht:9800000,status:"Déjà dédouanée"},
{name:"Changan UNI-Z 2026",type:"SUV",price:14500000,ht:12500000,status:"Sur commande"},
{name:"BAW 212 T01",type:"4x4",price:0,ht:0,status:"Sur commande"},
{name:"Roewe i5 2026",type:"Berline",price:0,ht:0,status:"Sur commande"}];
function money(n){return n?new Intl.NumberFormat('fr-FR').format(n)+" FCFA":"Sur devis"}
function render(list=vehicles){document.querySelector('#vehicleGrid').innerHTML=list.map(v=>`<article class="vehicle"><div class="photo"><span>${v.type} • ${v.status}</span></div><div class="body"><h3>${v.name}</h3><div class="muted">Prix HT : ${money(v.ht)}</div><div class="price">${money(v.price)} TTC</div><span class="pill">${v.status}</span><br><br><button onclick="showVehicle('${v.name}')">Détails</button></div></article>`).join('')}
function filterVehicles(){let q=document.querySelector('#search').value.toLowerCase();render(vehicles.filter(v=>(v.name+v.type+v.status).toLowerCase().includes(q)))}
function showVehicle(n){alert("Fiche véhicule : "+n+"\\n\\nDans la version production : galerie, vidéo, fiche technique, HT/TTC, disponibilité, réservation, achat et WhatsApp.")}
function quoteRental(){document.querySelector('#rentalResult').textContent="Demande enregistrée dans le prototype. La version production calculera automatiquement la durée, le véhicule disponible, le dépôt et le montant final."}
function calcImport(){let p=+document.querySelector('#imodel').value,t=+document.querySelector('#port').value,fees=850000+t;document.querySelector('#iprice').textContent=money(p);document.querySelector('#iship').textContent=money(fees);document.querySelector('#itotal').textContent=money(p+fees)}
function submitSell(){document.querySelector('#sellResult').textContent="Votre annonce est prête à être envoyée en modération DBL. La version production demandera également les photos obligatoires, le VIN et la vidéo de présentation."}
function go(id){document.getElementById(id).scrollIntoView({behavior:'smooth'})}function toggleMenu(){document.querySelector('nav').style.display=document.querySelector('nav').style.display==='flex'?'none':'flex'}
render();calcImport();
