"use client";
import React, { useState } from 'react';

export default function DashboardZen() {
  const [ca, setCa] = useState(0);
  const [logements, setLogements] = useState(0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f4f8', padding: '40px', fontFamily: 'sans-serif' }}>
      {/* En-tête */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px', justifyContent: 'center' }}>
        <div style={{ fontSize: '40px', background: 'white', padding: '10px', borderRadius: '50%', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>🪷</div>
        <h1 style={{ color: '#1a365d', margin: 0, fontSize: '2.5rem' }}>FULLBNBZEN OS</h1>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <p style={{ color: '#64748b', fontSize: '1.2rem' }}>Empire de Dimitri : Initialisation terminée.</p>
      </div>

      {/* Compteurs Dynamiques */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', maxWidth: '900px', margin: '0 auto 40px auto' }}>
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 10px 0' }}>Chiffre d'Affaires</p>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb', margin: 0 }}>{ca} €</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 10px 0' }}>Logements Actifs</p>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#059669', margin: 0 }}>{logements}</p>
        </div>
      </div>

      {/* Formulaire de saisie */}
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', maxWidth: '450px', margin: '0 auto', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginTop: 0, color: '#1e293b', textAlign: 'center' }}>Piloter mes données</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>Mettre à jour le CA :</label>
            <input 
              type="number" 
              placeholder="0 €"
              onChange={(e) => setCa(Number(e.target.value))}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>Nombre de logements :</label>
            <input 
              type="number" 
              placeholder="Ex: 8"
              onChange={(e) => setLogements(Number(e.target.value))}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
