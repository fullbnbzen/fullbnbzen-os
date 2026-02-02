import React from 'react';
import { Wallet, Calendar, Users, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'CA Brut Février', value: '3 075,98 €', icon: Wallet, color: 'text-blue-600' },
    { label: 'Revenu Net Est.', value: '2 397,88 €', icon: TrendingUp, color: 'text-emerald-600' },
    { label: 'Nuits à Remplir', value: '174', icon: Calendar, color: 'text-orange-500' },
    { label: 'Équipe Active', value: '5', icon: Users, color: 'text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Header avec ton identité Lotus Bleu */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">FULLBNBZEN OS</h1>
          <p className="text-slate-500">Bienvenue, Dimitri. Votre empire est sous contrôle.</p>
        </div>
        <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
          DB
        </div>
      </div>

      {/* Alerte Stratégique PriceLabs */}
      <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-8 rounded-r-lg flex items-center gap-3">
        <AlertCircle className="text-orange-500" />
        <p className="text-orange-800 font-medium">
          Analyse PriceLabs : 174 nuits vides détectées en février. Prêt pour une stratégie "Last Minute" ?
        </p>
      </div>

      {/* Stats Principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <stat.icon className={stat.color} size={24} />
            </div>
            <p className="text-slate-500 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Section Équipe - Pour Wilo, Fouss, etc. */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Users size={20} /> État des Ménages
          </h2>
          <div className="space-y-4">
            {['Le Havre de Bruguières', 'Landillon', 'Chambre sur un Nuage'].map((item) => (
              <div key={item} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="font-medium">{item}</span>
                <span className="flex items-center gap-2 text-emerald-600 text-sm">
