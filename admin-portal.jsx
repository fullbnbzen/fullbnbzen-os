import React, { useState, useEffect } from 'react';
import { 
  Home, Calendar, MessageSquare, CheckSquare, DollarSign, 
  Building, Users, Settings, Bell, ChevronRight, Plus,
  Search, Filter, Download, Upload, Eye, Edit, Trash2,
  Sparkles, Bot, TrendingUp, AlertCircle, Clock, CheckCircle,
  X, Menu, LogOut, User, Shield, Zap, BarChart3, FileText,
  Package, MapPin, Phone, Mail, Globe, Wifi, Key, Camera,
  ShoppingBag, Wrench, AlertTriangle, Star, Send, Image
} from 'lucide-react';

// ==================== TYPES ====================

interface Property {
  id: string;
  name: string;
  type: string;
  city: string;
  status: 'ACTIVE' | 'MAINTENANCE' | 'BLOCKED';
  bedrooms: number;
  maxGuests: number;
  basePrice: number;
  nextCheckIn?: string;
  nextCheckOut?: string;
  occupancyRate: number;
  revenue: number;
}

interface Reservation {
  id: string;
  bookingReference: string;
  property: { id: string; name: string };
  guest: { id: string; firstName: string; lastName: string; email: string };
  checkIn: string;
  checkOut: string;
  status: 'PENDING' | 'CONFIRMED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED';
  channel: string;
  totalPrice: number;
  depositStatus: 'NOT_REQUIRED' | 'REQUIRED' | 'PENDING' | 'PAID' | 'REFUNDED';
  nights: number;
  adults: number;
}

interface Task {
  id: string;
  type: string;
  title: string;
  property: { id: string; name: string };
  assignedTo?: { id: string; name: string };
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'VALIDATED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  dueDate: string;
  dueTime?: string;
}

interface Message {
  id: string;
  guest: { firstName: string; lastName: string };
  reservation: { id: string; property: { name: string } };
  content: string;
  isAiGenerated: boolean;
  status: 'SENT' | 'READ';
  createdAt: string;
}

// ==================== MAIN APP ====================

const SuperHotePMSAdmin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user] = useState({
    name: 'Jean Dupont',
    role: 'CONCIERGE_ADMIN',
    avatar: null,
  });

  // Mock data
  const [properties] = useState<Property[]>([
    {
      id: '1',
      name: 'Villa Méditerranée',
      type: 'Villa',
      city: 'Cannes',
      status: 'ACTIVE',
      bedrooms: 4,
      maxGuests: 8,
      basePrice: 350,
      nextCheckIn: '2026-02-05',
      occupancyRate: 85,
      revenue: 28500,
    },
    {
      id: '2',
      name: 'Loft Centre-Ville',
      type: 'Loft',
      city: 'Nice',
      status: 'ACTIVE',
      bedrooms: 2,
      maxGuests: 4,
      basePrice: 180,
      nextCheckOut: '2026-02-03',
      occupancyRate: 92,
      revenue: 16200,
    },
    {
      id: '3',
      name: 'Studio Plage',
      type: 'Studio',
      city: 'Antibes',
      status: 'MAINTENANCE',
      bedrooms: 1,
      maxGuests: 2,
      basePrice: 120,
      occupancyRate: 78,
      revenue: 9360,
    },
  ]);

  const [reservations] = useState<Reservation[]>([
    {
      id: '1',
      bookingReference: 'RES-2026-001',
      property: { id: '1', name: 'Villa Méditerranée' },
      guest: { id: '1', firstName: 'Marie', lastName: 'Dubois', email: 'marie@email.com' },
      checkIn: '2026-02-05',
      checkOut: '2026-02-10',
      status: 'CONFIRMED',
      channel: 'Booking.com',
      totalPrice: 1750,
      depositStatus: 'PAID',
      nights: 5,
      adults: 2,
    },
    {
      id: '2',
      bookingReference: 'RES-2026-002',
      property: { id: '2', name: 'Loft Centre-Ville' },
      guest: { id: '2', firstName: 'Jean', lastName: 'Martin', email: 'jean@email.com' },
      checkIn: '2026-02-03',
      checkOut: '2026-02-08',
      status: 'CHECKED_IN',
      channel: 'Airbnb',
      totalPrice: 900,
      depositStatus: 'PENDING',
      nights: 5,
      adults: 2,
    },
  ]);

  const [tasks] = useState<Task[]>([
    {
      id: '1',
      type: 'CLEANING',
      title: 'Ménage complet',
      property: { id: '2', name: 'Loft Centre-Ville' },
      assignedTo: { id: '1', name: 'Équipe A' },
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      dueDate: '2026-02-03',
      dueTime: '14:00',
    },
    {
      id: '2',
      type: 'MAINTENANCE',
      title: 'Réparation chauffage',
      property: { id: '3', name: 'Studio Plage' },
      status: 'PENDING',
      priority: 'URGENT',
      dueDate: '2026-02-02',
      dueTime: '16:00',
    },
  ]);

  const [messages] = useState<Message[]>([
    {
      id: '1',
      guest: { firstName: 'Marie', lastName: 'Dubois' },
      reservation: { id: '1', property: { name: 'Villa Méditerranée' } },
      content: 'Bonjour, est-ce possible d\'arriver plus tôt ?',
      isAiGenerated: false,
      status: 'READ',
      createdAt: '2026-02-02T10:23:00',
    },
  ]);

  // Status colors
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      ACTIVE: 'bg-emerald-500',
      MAINTENANCE: 'bg-amber-500',
      BLOCKED: 'bg-red-500',
      PENDING: 'bg-amber-500',
      CONFIRMED: 'bg-blue-500',
      CHECKED_IN: 'bg-purple-500',
      CHECKED_OUT: 'bg-gray-500',
      CANCELLED: 'bg-red-500',
      IN_PROGRESS: 'bg-blue-500',
      COMPLETED: 'bg-emerald-500',
      VALIDATED: 'bg-green-600',
      NOT_REQUIRED: 'bg-gray-400',
      REQUIRED: 'bg-amber-500',
      PAID: 'bg-emerald-500',
      REFUNDED: 'bg-gray-500',
    };
    return colors[status] || 'bg-gray-400';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      LOW: 'border-gray-300 bg-gray-50',
      MEDIUM: 'border-blue-400 bg-blue-50',
      HIGH: 'border-amber-400 bg-amber-50',
      URGENT: 'border-red-500 bg-red-50',
    };
    return colors[priority] || 'border-gray-300 bg-gray-50';
  };

  // ==================== DASHBOARD ====================

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600 mt-1">Vue d'ensemble de votre activité</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exporter
          </button>
          <button className="px-4 py-2 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nouvelle réservation
          </button>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">Insights IA</h2>
            <p className="text-purple-100 text-sm">Recommandations intelligentes pour optimiser votre activité</p>
          </div>
          <button className="px-4 py-2 bg-white/20 backdrop-blur rounded-lg font-semibold hover:bg-white/30 transition-colors">
            Tout voir
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Tarification</span>
            </div>
            <p className="text-sm mb-3">Augmentez Villa Méditerranée de 15% pour le week-end prochain (forte demande détectée)</p>
            <div className="text-lg font-bold">+€450 revenus estimés</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Occupation</span>
            </div>
            <p className="text-sm mb-3">Studio Plage: taux bas pour Mars. Promotion -20% recommandée pour booster les réservations</p>
            <div className="text-lg font-bold">+22% occupation prévue</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Opérations</span>
            </div>
            <p className="text-sm mb-3">3 tâches de maintenance en retard. Réassigner à l'Équipe C pour éviter les retards ?</p>
            <div className="text-lg font-bold text-amber-300">Action requise</div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Taux d\'occupation', value: '85%', trend: '+5%', icon: Home, color: 'from-blue-500 to-cyan-500' },
          { label: 'Revenus MTD', value: '54.0K€', trend: '+12%', icon: DollarSign, color: 'from-emerald-500 to-teal-500' },
          { label: 'Réservations', value: '47', trend: '+8', icon: Calendar, color: 'from-purple-500 to-pink-500' },
          { label: 'Satisfaction', value: '4.8/5', trend: '+0.2', icon: Star, color: 'from-amber-500 to-orange-500' },
        ].map((stat, idx) => (
          <div key={idx} className={`bg-gradient-to-br ${stat.color} rounded-xl p-5 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}>
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="w-6 h-6 opacity-90" />
              <span className="text-sm font-semibold px-2 py-1 bg-white/20 rounded-lg">{stat.trend}</span>
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm opacity-90">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Properties & Tasks Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Properties */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Logements</h3>
            <button className="text-violet-600 font-semibold text-sm hover:underline">Tout voir →</button>
          </div>
          <div className="divide-y divide-gray-200">
            {properties.slice(0, 3).map((property) => (
              <div key={property.id} className="p-5 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h4 className="text-lg font-semibold text-gray-900">{property.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(property.status)}`}>
                      {property.status}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{property.city}</span>
                  <span>•</span>
                  <span>{property.bedrooms} ch.</span>
                  <span>•</span>
                  <span className="font-semibold text-emerald-600">{property.revenue.toLocaleString()}€/mois</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Urgent Tasks */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Tâches urgentes</h3>
            <button className="text-violet-600 font-semibold text-sm hover:underline">Tout voir →</button>
          </div>
          <div className="p-5 space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className={`p-4 rounded-lg border-2 ${getPriorityColor(task.priority)}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{task.property.name}</span>
                      <span className="text-xs uppercase tracking-wide text-gray-500">• {task.type}</span>
                    </div>
                    <p className="text-sm text-gray-700">{task.title}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{task.dueTime}</span>
                  {task.assignedTo && <span>• {task.assignedTo.name}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <h3 className="text-xl font-bold text-gray-900">Activité récente</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            { time: '10:23', action: 'Nouvelle réservation', detail: 'RES-2026-003 • Villa Méditerranée', icon: Calendar, color: 'text-emerald-600' },
            { time: '09:45', action: 'Caution payée', detail: 'Marie Dubois • 500€', icon: DollarSign, color: 'text-green-600' },
            { time: '09:12', action: 'Message reçu', detail: 'Jean Martin • Check-in anticipé ?', icon: MessageSquare, color: 'text-blue-600' },
            { time: '08:30', action: 'Tâche terminée', detail: 'Ménage Loft Centre-Ville', icon: CheckCircle, color: 'text-purple-600' },
          ].map((activity, idx) => (
            <div key={idx} className="p-4 hover:bg-gray-50 transition-colors flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center ${activity.color}`}>
                <activity.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{activity.action}</div>
                <div className="text-sm text-gray-600">{activity.detail}</div>
              </div>
              <div className="text-sm text-gray-500">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ==================== PROPERTIES ====================

  const renderProperties = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Logements</h1>
          <p className="text-gray-600 mt-1">{properties.length} logements • {properties.filter(p => p.status === 'ACTIVE').length} actifs</p>
        </div>
        <button className="px-4 py-2 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nouveau logement
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Rechercher un logement..."
            className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-violet-500 focus:outline-none"
          />
        </div>
        <button className="px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filtres
        </button>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
            <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <Building className="w-16 h-16 text-gray-400" />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{property.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{property.city}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(property.status)}`}>
                  {property.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span>{property.bedrooms} ch.</span>
                <span>•</span>
                <span>{property.maxGuests} pers.</span>
                <span>•</span>
                <span className="font-semibold text-emerald-600">{property.basePrice}€/nuit</span>
              </div>
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Occupation</span>
                  <span className="font-semibold text-gray-900">{property.occupancyRate}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Revenus/mois</span>
                  <span className="font-semibold text-emerald-600">{property.revenue.toLocaleString()}€</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ==================== RESERVATIONS ====================

  const renderReservations = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Réservations</h1>
          <p className="text-gray-600 mt-1">{reservations.length} réservations actives</p>
        </div>
        <button className="px-4 py-2 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nouvelle réservation
        </button>
      </div>

      {/* Calendar View Toggle */}
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-violet-600 text-white rounded-lg font-semibold">Liste</button>
        <button className="px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50">Calendrier</button>
      </div>

      {/* Reservations Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Référence</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Voyageur</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Logement</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Canal</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Caution</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-gray-900">{reservation.bookingReference}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{reservation.guest.firstName} {reservation.guest.lastName}</div>
                      <div className="text-gray-500">{reservation.guest.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{reservation.property.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{reservation.checkIn} → {reservation.checkOut}</div>
                    <div className="text-xs text-gray-500">{reservation.nights} nuits</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{reservation.channel}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(reservation.status)}`}>
                      {reservation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(reservation.depositStatus)}`}>
                      {reservation.depositStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-emerald-600">{reservation.totalPrice}€</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded"><Eye className="w-4 h-4 text-gray-600" /></button>
                      <button className="p-1 hover:bg-gray-100 rounded"><Edit className="w-4 h-4 text-gray-600" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ==================== MESSAGES ====================

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-1">Inbox centralisée • Suggestions IA activées</p>
        </div>
      </div>

      {/* AI Banner */}
      <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur">
            <Bot className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">Assistant IA Messages</h2>
            <p className="text-blue-50">L'IA vous suggère des réponses personnalisées • 75% des messages automatisés</p>
          </div>
          <button className="px-4 py-2 bg-white/20 backdrop-blur rounded-lg font-semibold hover:bg-white/30 transition-colors">
            Configurer
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {messages.map((message) => (
            <div key={message.id} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                  {message.guest.firstName[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{message.guest.firstName} {message.guest.lastName}</h3>
                    <span className="text-sm text-gray-500">{message.reservation.property.name}</span>
                    <span className="text-sm text-gray-400">{new Date(message.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-gray-700 mb-3">{message.content}</p>
                  
                  {/* AI Suggestion */}
                  <div className="bg-blue-50 border-l-4 border-blue-400 rounded p-4 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-semibold text-blue-900">Suggestion IA (confiance: 92%)</span>
                    </div>
                    <p className="text-sm text-blue-900 mb-3">
                      Bonjour Marie, le check-in standard est à 15h. Nous pouvons proposer un check-in anticipé à 12h pour 45€. 
                      Vous pouvez réserver ce service directement depuis votre livret d'accueil. N'hésitez pas !
                    </p>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-semibold hover:bg-blue-700 flex items-center gap-1">
                        <Send className="w-3 h-3" />
                        Envoyer
                      </button>
                      <button className="px-3 py-1 border-2 border-blue-400 text-blue-700 rounded text-sm font-semibold hover:bg-blue-50">
                        Modifier
                      </button>
                      <button className="px-3 py-1 text-gray-600 rounded text-sm hover:bg-gray-100">
                        Rejeter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ==================== RULE ENGINE ====================

  const renderRuleEngine = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Moteur de Règles</h1>
          <p className="text-gray-600 mt-1">Automatisations & logique métier configurables</p>
        </div>
        <button className="px-4 py-2 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Créer règle
        </button>
      </div>

      {/* Rules Categories */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { name: 'Cautions', count: 5, icon: Shield, color: 'from-emerald-500 to-teal-500' },
          { name: 'Messages auto', count: 8, icon: MessageSquare, color: 'from-blue-500 to-cyan-500' },
          { name: 'Tâches auto', count: 6, icon: Zap, color: 'from-purple-500 to-pink-500' },
          { name: 'Calendrier', count: 3, icon: Calendar, color: 'from-amber-500 to-orange-500' },
        ].map((category) => (
          <div key={category.name} className={`bg-gradient-to-br ${category.color} rounded-xl p-5 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}>
            <category.icon className="w-8 h-8 mb-3 opacity-90" />
            <div className="text-2xl font-bold mb-1">{category.count}</div>
            <div className="text-sm opacity-90">{category.name}</div>
          </div>
        ))}
      </div>

      {/* Active Rules */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <h3 className="text-xl font-bold text-gray-900">Règles actives</h3>
        </div>
        <div className="p-6 space-y-4">
          {[
            {
              name: 'Caution obligatoire Booking.com',
              type: 'SECURITY_DEPOSIT',
              priority: 10,
              conditions: ['Canal = Booking.com'],
              actions: ['Exiger caution 500€', 'Bloquer check-in si impayée', 'Relances: J-2, J-1, J'],
              triggered: 245,
              active: true,
            },
            {
              name: 'Ménage urgent same-day turnaround',
              type: 'TASK_AUTOMATION',
              priority: 9,
              conditions: ['Check-out + Check-in même jour'],
              actions: ['Créer tâche URGENT', 'Assigner meilleur dispo', 'Notifier équipe'],
              triggered: 89,
              active: true,
            },
            {
              name: 'Instructions check-in J-2',
              type: 'AUTO_MESSAGING',
              priority: 5,
              conditions: ['2 jours avant check-in', 'Caution = PAID'],
              actions: ['Envoyer email instructions', 'Inclure codes accès', 'Débloquer livret'],
              triggered: 412,
              active: true,
            },
          ].map((rule, idx) => (
            <div key={idx} className="border-2 border-gray-200 rounded-xl p-5 hover:border-violet-400 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-bold text-gray-900">{rule.name}</h4>
                    <span className="px-2 py-1 bg-violet-100 text-violet-700 rounded text-xs font-semibold">
                      {rule.type}
                    </span>
                    <span className="text-sm text-gray-500">Priorité: {rule.priority}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">Conditions:</span>
                      <ul className="ml-4 mt-1 space-y-1">
                        {rule.conditions.map((cond, i) => (
                          <li key={i} className="text-gray-600">• {cond}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Actions:</span>
                      <ul className="ml-4 mt-1 space-y-1">
                        {rule.actions.map((action, i) => (
                          <li key={i} className="text-gray-600">• {action}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${rule.active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                    {rule.active ? 'Active' : 'Inactive'}
                  </span>
                  <span className="text-sm text-gray-500">{rule.triggered} déclenchements</span>
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button className="px-3 py-1 border-2 border-gray-300 rounded text-sm font-semibold hover:bg-gray-50">
                  Modifier
                </button>
                <button className="px-3 py-1 border-2 border-gray-300 rounded text-sm font-semibold hover:bg-gray-50">
                  Dupliquer
                </button>
                <button className="px-3 py-1 text-red-600 rounded text-sm font-semibold hover:bg-red-50">
                  Désactiver
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ==================== SIDEBAR & LAYOUT ====================

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: Home },
    { id: 'properties', label: 'Logements', icon: Building },
    { id: 'reservations', label: 'Réservations', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 3 },
    { id: 'tasks', label: 'Tâches', icon: CheckSquare },
    { id: 'finances', label: 'Finances', icon: DollarSign },
    { id: 'users', label: 'Utilisateurs', icon: Users },
    { id: 'rules', label: 'Moteur de Règles', icon: Zap },
    { id: 'settings', label: 'Configuration', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">SuperHote PMS</h1>
                  <p className="text-xs text-gray-600">Admin • Conciergerie Premium</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.role}</div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold shadow">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-72 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] p-6 sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      activeTab === item.id ? 'bg-white/20' : 'bg-red-500 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'properties' && renderProperties()}
            {activeTab === 'reservations' && renderReservations()}
            {activeTab === 'messages' && renderMessages()}
            {activeTab === 'rules' && renderRuleEngine()}
            {activeTab === 'tasks' && (
              <div className="text-center py-12">
                <CheckSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Module Tâches</h2>
                <p className="text-gray-600">Interface complète dans les fichiers suivants</p>
              </div>
            )}
            {activeTab === 'finances' && (
              <div className="text-center py-12">
                <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Module Finances</h2>
                <p className="text-gray-600">Interface complète dans les fichiers suivants</p>
              </div>
            )}
            {activeTab === 'users' && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestion Utilisateurs</h2>
                <p className="text-gray-600">Interface complète dans les fichiers suivants</p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="text-center py-12">
                <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Configuration</h2>
                <p className="text-gray-600">Interface complète dans les fichiers suivants</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperHotePMSAdmin;