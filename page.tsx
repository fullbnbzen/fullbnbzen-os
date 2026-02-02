"use client";
import React, { useState } from 'react';

export default function DashboardZen() {
  const [ca, setCa] = useState(0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f4f8', padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1 style={{ color: '#1a365d', fontSize: '2.5rem' }}>🪷 FULLBNBZEN OS</h1>
      <p style={{ color: '#64748b', fontSize: '1.2rem' }}>Votre empire est prêt. Tout commence ici.</p>
      
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', display: 'inline-block', marginTop: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <p style={{ color: '#64748b' }}>Chiffre d'Affaires Actuel</p>
        <h2 style={{ fontSize: '3rem', margin: '10px 0', color: '#2563eb' }}>{ca} €</h2>
        <input 
          type="number" 
          placeholder="Entrer un montant"
          onChange={(e) => setCa(Number(e.target.value))}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', width: '200px' }}
        />
      </div>
    </div>
  );
}
