
import React, { useState } from "react";

function App() {
  const [client, setClient] = useState({ nom: "", adresse: "", email: "", tel: "" });
  const [intervention, setIntervention] = useState({ date: "", heureDebut: "", heureFin: "", description: "" });

  const handleGenerateFacture = () => {
    const facture = window.open("", "_blank");
    if (!facture) return alert("Pop-up bloquée");

    const html = `
      <html>
        <head>
          <title>Facture Technipro</title>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
          <style>
            body { font-family: Arial; padding: 20px; }
            h1 { color: #0d2f81; }
            p { margin: 5px 0; }
            #facture { background: #fff; padding: 20px; border: 1px solid #ccc; }
            button { margin-top: 20px; padding: 10px 15px; background: #0d2f81; color: white; border: none; cursor: pointer; }
          </style>
        </head>
        <body>
          <div id="facture">
            <h1>Facture Technipro</h1>
            <p><strong>Client :</strong> ${client.nom}</p>
            <p><strong>Adresse :</strong> ${client.adresse}</p>
            <p><strong>Email :</strong> ${client.email}</p>
            <p><strong>Téléphone :</strong> ${client.tel}</p>
            <hr/>
            <p><strong>Date :</strong> ${intervention.date}</p>
            <p><strong>Heures :</strong> ${intervention.heureDebut} à ${intervention.heureFin}</p>
            <p><strong>Description de l’intervention :</strong><br/> ${intervention.description}</p>
          </div>
          <button onclick="html2pdf().from(document.getElementById('facture')).save('facture-technipro.pdf')">Télécharger la facture</button>
        </body>
      </html>
    `;
    facture.document.write(html);
    facture.document.close();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ color: "#0d2f81" }}>Formulaire d’intervention Technipro</h1>

      <h3>Client</h3>
      <input placeholder="Nom" value={client.nom} onChange={e => setClient({ ...client, nom: e.target.value })} /><br/>
      <input placeholder="Adresse" value={client.adresse} onChange={e => setClient({ ...client, adresse: e.target.value })} /><br/>
      <input placeholder="Email" value={client.email} onChange={e => setClient({ ...client, email: e.target.value })} /><br/>
      <input placeholder="Téléphone" value={client.tel} onChange={e => setClient({ ...client, tel: e.target.value })} /><br/>

      <h3>Intervention</h3>
      <input type="date" value={intervention.date} onChange={e => setIntervention({ ...intervention, date: e.target.value })} /><br/>
      <input placeholder="Heure de début" value={intervention.heureDebut} onChange={e => setIntervention({ ...intervention, heureDebut: e.target.value })} /><br/>
      <input placeholder="Heure de fin" value={intervention.heureFin} onChange={e => setIntervention({ ...intervention, heureFin: e.target.value })} /><br/>
      <textarea placeholder="Description" value={intervention.description} onChange={e => setIntervention({ ...intervention, description: e.target.value })} /><br/>

      <button onClick={handleGenerateFacture} style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#0d2f81", color: "#fff", border: "none", borderRadius: "5px" }}>
        Générer la facture
      </button>
    </div>
  );
}

export default App;
