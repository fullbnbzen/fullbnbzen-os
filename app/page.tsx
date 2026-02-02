"use client";
import React, { useState } from 'react';

export default function DashboardZen() {
  const [ca, setCa] = useState(0);
  const [reservations, setReservations] = useState(0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '40px', fontFamily: 'sans-serif' }}>
      {/* En-tête avec Logo Lotus */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
        <div style={{ fontSize: '40px', background: 'white', padding: '10px', borderRadius: '50%', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>🪷</div>
        <div>
          <h1 style={{ color: '#1e293b', margin: 0, fontSize: '28px' }}>FULLBNBZEN OS</h1>
          <p style={{ color: '#64748b', margin: '5px 0 0 0' }}>Système de gestion - Dimitri</p>
        </div>
      </div>

      {/* Alerte Mode Configuration */}
      <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', padding: '15px', borderRadius: '10px', marginBottom: '30px', color: '#1e40af' }}>
        ✨ **Mode Initialisation :** Votre application est en ligne. Saisissez vos premières données ci-dessous.
      </div>

      {/* Compteurs en Temps Réel */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '10px' }}>Chiffre d'Affaires</p>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb', margin: 0 }}>{ca} €</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '10px' }}>Réservations Février</p>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#059669', margin: 0 }}>{reservations}</p>
        </div>
      </div>

      {/* Formulaire de pilotage */}
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', maxWidth: '450px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginTop: 0, color: '#1e293b' }}>Entrer les données du jour</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="number" 
            placeholder="Montant du CA (€)" 
            onChange={(e) => setCa(Number(e.target.value))}
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
          />
          <input 
            type="number" 
            placeholder="Nombre de réservations" 
            onChange={(e) => setReservations(Number(e.target.value))}
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
          />
        </div>
      </div>
    </div>
  );
}
