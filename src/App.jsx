import { useState, useRef } from "react";
import SignaturePad from "signature_pad";

function App() {
  const [client, setClient] = useState({ nom: "", adresse: "", email: "", tel: "" });
  const [intervention, setIntervention] = useState({ date: "", debut: "", fin: "", description: "" });
  const [materiels, setMateriels] = useState([{ nom: "", quantite: 1, prix: 0 }]);
  const [tva, setTva] = useState(21);
  const canvasRef = useRef(null);
  const signatureRef = useRef(null);

  const handleAddMateriel = () => {
    setMateriels([...materiels, { nom: "", quantite: 1, prix: 0 }]);
  };

  const handleChangeMateriel = (index, field, value) => {
    const newMateriels = [...materiels];
    newMateriels[index][field] = value;
    setMateriels(newMateriels);
  };

  const totalHT = materiels.reduce((sum, m) => sum + m.quantite * m.prix, 0);
  const totalTVA = (totalHT * tva) / 100;
  const totalTTC = totalHT + totalTVA;

  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
    }
  };

  const setupSignature = () => {
    if (canvasRef.current && !signatureRef.current) {
      signatureRef.current = new SignaturePad(canvasRef.current);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Formulaire d’intervention</h1>

      <h2>Client</h2>
      <input placeholder="Nom" value={client.nom} onChange={e => setClient({ ...client, nom: e.target.value })} /><br />
      <input placeholder="Adresse" value={client.adresse} onChange={e => setClient({ ...client, adresse: e.target.value })} /><br />
      <input placeholder="Email" value={client.email} onChange={e => setClient({ ...client, email: e.target.value })} /><br />
      <input placeholder="Téléphone" value={client.tel} onChange={e => setClient({ ...client, tel: e.target.value })} /><br />

      <h2>Intervention</h2>
      <input type="date" value={intervention.date} onChange={e => setIntervention({ ...intervention, date: e.target.value })} />
      <input type="time" value={intervention.debut} onChange={e => setIntervention({ ...intervention, debut: e.target.value })} />
      <input type="time" value={intervention.fin} onChange={e => setIntervention({ ...intervention, fin: e.target.value })} /><br />
      <textarea placeholder="Description" value={intervention.description} onChange={e => setIntervention({ ...intervention, description: e.target.value })} />

      <h2>Matériel utilisé</h2>
      {materiels.map((m, i) => (
        <div key={i}>
          <input placeholder="Nom" value={m.nom} onChange={e => handleChangeMateriel(i, "nom", e.target.value)} />
          <input type="number" placeholder="Quantité" value={m.quantite} onChange={e => handleChangeMateriel(i, "quantite", parseInt(e.target.value))} />
          <input type="number" placeholder="Prix" value={m.prix} onChange={e => handleChangeMateriel(i, "prix", parseFloat(e.target.value))} />
        </div>
      ))}
      <button onClick={handleAddMateriel}>Ajouter un matériel</button>

      <h2>Montants</h2>
      <p>Total HT : {totalHT.toFixed(2)} €</p>
      <p>TVA ({tva}%) : {totalTVA.toFixed(2)} €</p>
      <p><strong>Total TTC : {totalTTC.toFixed(2)} €</strong></p>

      <h2>Signature client</h2>
      <canvas ref={canvasRef} width={400} height={150} style={{ border: "1px solid black" }} onClick={setupSignature}></canvas><br />
      <button onClick={clearSignature}>Effacer la signature</button>

      <h2>À venir</h2>
      <p>📄 Génération PDF</p>
      <p>📂 Historique interventions</p>
    </div>
  );
}

export default App;