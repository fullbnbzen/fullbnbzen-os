# 🏗️ SuperHote PMS V2 - Architecture Complète

## 📋 Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture technique](#architecture-technique)
3. [Les 6 couches du système](#les-6-couches)
4. [Flux de données](#flux-de-données)
5. [Moteur de règles](#moteur-de-règles)
6. [Audit Log](#audit-log)
7. [Intégration IA](#intégration-ia)
8. [Sécurité & RGPD](#sécurité--rgpd)
9. [MVP vs V2 vs V3](#roadmap-mvp)
10. [Tech Stack](#tech-stack)

---

## 🎯 Vue d'ensemble

### Objectif
Créer un PMS complet équivalent à SuperHote, enrichi de :
- ✅ Livret d'accueil digital personnalisé
- ✅ Boutique d'upsell intégrée
- ✅ Portail propriétaire (transparence)
- ✅ Portail prestataire (mobile-first)
- ✅ Moteur de règles configurable
- ✅ IA intégrée (ChatGPT ou Gemini)
- ✅ Audit log complet

### Principes fondamentaux
1. **Multi-tenant**: Multi-conciergeries, multi-propriétaires, multi-logements
2. **Scalable**: Jusqu'à 1000+ logements par conciergerie
3. **Configurable**: Règles métier paramétrables
4. **Traçable**: Audit log complet de toutes les actions
5. **Sécurisé**: RGPD compliant, accès granulaires
6. **Intelligent**: IA native dans toutes les couches

---

## 🏗️ Architecture Technique

### Architecture globale

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND LAYER                          │
├─────────────────────────────────────────────────────────────────┤
│  Admin Portal  │  Owner Portal  │  Provider App  │  Guest Web   │
│   (Next.js)    │   (Next.js)    │  (React Native)│  (Next.js)   │
└────────┬────────────────┬────────────────┬────────────┬─────────┘
         │                │                │            │
         └────────────────┴────────────────┴────────────┘
                          │
         ┌────────────────┴────────────────┐
         │         API GATEWAY             │
         │    (Next.js API Routes)         │
         └────────────────┬────────────────┘
                          │
         ┌────────────────┴────────────────────────────┐
         │              BUSINESS LOGIC LAYER            │
         ├──────────────────────────────────────────────┤
         │  - Reservation Manager                       │
         │  - Property Manager                          │
         │  - Task Manager                              │
         │  - Payment Manager                           │
         │  - Rule Engine ⚙️                            │
         │  - AI Service 🤖                             │
         │  - Audit Logger 📝                           │
         └────────────────┬────────────────────────────┘
                          │
         ┌────────────────┴────────────────┐
         │       DATA LAYER                │
         ├─────────────────────────────────┤
         │  PostgreSQL (Prisma ORM)        │
         │  Redis (Cache & Queue)          │
         │  S3 (Files & Photos)            │
         └─────────────────────────────────┘
         
         ┌─────────────────────────────────┐
         │     EXTERNAL SERVICES           │
         ├─────────────────────────────────┤
         │  - OpenAI / Gemini (IA)         │
         │  - Stripe (Paiements)           │
         │  - SendGrid (Email)             │
         │  - Twilio (SMS)                 │
         │  - Airbnb/Booking API           │
         └─────────────────────────────────┘
```

### Stack technique détaillé

| Couche | Technologies |
|--------|-------------|
| **Frontend Web** | Next.js 15, React 19, TypeScript, Tailwind CSS |
| **Mobile App** | React Native, Expo |
| **Backend** | Next.js API Routes, Node.js 20+ |
| **Database** | PostgreSQL 15+, Prisma ORM |
| **Cache** | Redis 7+ |
| **Storage** | AWS S3 / Cloudflare R2 |
| **Auth** | NextAuth.js (JWT + Session) |
| **Payments** | Stripe Connect |
| **Email** | SendGrid / Resend |
| **SMS** | Twilio |
| **AI** | OpenAI API ou Google Gemini |
| **Queue** | BullMQ (Redis) |
| **CDN** | Cloudflare |
| **Hosting** | Vercel (frontend) + Railway (backend) |
| **Monitoring** | Sentry, Datadog |

---

## 🧱 Les 6 Couches du Système

### 1️⃣ BACK-OFFICE CONCIERGERIE (Admin)

**Objectif**: Gestion complète de la conciergerie

#### Navigation principale
```
📊 Dashboard
   - KPIs temps réel
   - Alertes & notifications
   - Graphiques performance
   
🏠 Logements
   - Liste logements
   - Fiche logement (onglets)
     → Infos générales
     → Réservations
     → Tâches
     → Incidents
     → Finances
     → Livret d'accueil
     → Boutique
   - Calendrier multi-logements
   
📅 Réservations
   - Liste & filtres
   - Création manuelle
   - Import canal
   - Fiche réservation complète
   
💬 Messages
   - Inbox centralisée
   - Par réservation
   - Templates
   - Suggestions IA
   
🧹 Opérations
   - Planning tâches
   - Gestion équipes/prestataires
   - Checklists
   - Incidents
   
💰 Finances
   - Paiements
   - Cautions
   - Commandes boutique
   - Exports comptables
   - Split propriétaires
   
👥 Utilisateurs
   - Équipe interne
   - Propriétaires
   - Prestataires
   
⚙️ Configuration
   - Paramètres généraux
   - Canaux de distribution
   - Automatisations
   - Moteur de règles ⭐
   - Templates messages
   - Branding
   
🤖 IA & Automatisation
   - Configuration IA
   - Logs conversations
   - Knowledge base
   - Statistiques utilisation
   
📝 Audit & Logs
   - Timeline globale
   - Par logement
   - Par réservation
   - Exports
```

#### Fonctionnalités clés

**Gestion Logements**
- CRUD complet
- Upload photos (drag & drop)
- Connexion canaux (iCal sync)
- Configuration livret + boutique
- Assignation équipe

**Gestion Réservations**
- Création manuelle avec wizard
- Import Airbnb/Booking
- Gestion caution (selon règles)
- Modification dates/prix
- Annulation avec workflow
- Timeline des événements

**Opérations**
- Création/assignation tâches
- Planning interactif
- Checklists dynamiques
- Validation avec photos
- Gestion incidents

**Finances**
- Paiements Stripe intégrés
- Gestion cautions automatisée
- Split multi-propriétaires
- Exports PDF/Excel
- Tableau de bord financier

---

### 2️⃣ PORTAIL PROPRIÉTAIRE

**Objectif**: Transparence & confiance

#### Navigation
```
📊 Dashboard
   - Mon portefeuille
   - CA du mois
   - Occupation
   - Prochaines réservations
   
📅 Calendrier
   - Vue mes logements
   - Réservations
   - Blocages
   - Demande de blocage
   
💰 Finances
   - Revenus détaillés
   - Commission conciergerie
   - Factures
   - Historique paiements
   
🏠 Mes Logements
   - Liste
   - Fiche logement (vue limitée)
   - Performance
   
🔧 Incidents & Maintenance
   - Liste incidents
   - Photos
   - Statut résolution
   - Coûts
   
💬 Messages
   - Communication conciergerie
   - Notifications
   
📈 Rapports
   - Performance mensuelle
   - Comparatif marché
   - Recommandations
```

#### Règles de visibilité (RGPD)

**Ce que le propriétaire PEUT voir:**
- ✅ Ses logements & calendrier
- ✅ Occupation & revenus
- ✅ Incidents (configurables)
- ✅ Statistiques agrégées

**Ce que le propriétaire NE PEUT PAS voir:**
- ❌ Données personnelles voyageurs (nom, contact)
- ❌ Messages voyageurs
- ❌ Détails opérationnels internes
- ❌ Marges conciergerie (sauf si configuré)

#### Fonctionnalités

1. **Dashboard propriétaire**
```typescript
// Métriques affichées
interface OwnerDashboard {
  period: 'month' | 'quarter' | 'year';
  properties: {
    id: string;
    name: string;
    revenue: number;
    occupancyRate: number;
    avgDailyRate: number;
    upcomingReservations: number;
  }[];
  totalRevenue: number;
  totalOccupancy: number;
  trending: 'up' | 'down' | 'stable';
}
```

2. **Demande de blocage**
- Formulaire simple
- Validation conciergerie
- Notification résultat

3. **Incidents visibles**
- Configuration par conciergerie
- Photos floutées si nécessaire
- Historique résolution

---

### 3️⃣ PORTAIL PRESTATAIRE (Mobile-first)

**Objectif**: Exécution terrain + preuves

#### Application mobile (React Native)

**Écran principal: Planning**
```
📅 Mes Missions
   
   Aujourd'hui (3)
   ├─ 09:00 - Ménage - Villa Mer 🔴 Urgent
   ├─ 14:00 - Inspection - Loft Centre
   └─ 17:00 - Check-in - Studio Plage
   
   Demain (2)
   À venir (5)
   
   [Filtre: Tout | À faire | En cours | Terminées]
```

**Fiche Mission**
```
🏠 Villa Méditerranée
📍 12 Rue de la Plage, 06400 Cannes
⏰ 09:00 - 12:00 (3h estimées)
🔴 Priorité: URGENTE

📋 Type: Ménage complet
💬 Consignes:
   - Check-out 11h, check-in 15h
   - Attention état chambre 2
   - Réappro capsules café

🗝️ Accès: 
   Code porte: 1234A
   Clés: Boîte à clés n°5

📸 Checklist (12 points)
   [Démarrer la mission]
```

**Checklist Interactive**
```
✅ Ménage - Villa Méditerranée

Cuisine (4/4) ✓
├─ ✅ Plan de travail nettoyé 📸
├─ ✅ Évier détartré 📸
├─ ✅ Poubelle vidée
└─ ✅ Sol lavé

Salon (3/3) ✓
├─ ✅ Canapé passé aspirateur
├─ ✅ Vitres nettoyées 📸
└─ ✅ Sol lavé

Chambres (0/5)
├─ ⬜ Lit fait (draps neufs) 📸 OBLIGATOIRE
├─ ⬜ Poussière surfaces
├─ ⬜ Aspirateur
├─ ⬜ Miroir nettoyé 📸
└─ ⬜ Sol lavé

[📷 Photos avant] [📷 Photos après]

💬 Commentaires:
[Zone de texte]

⚠️ Signaler un incident
```

**Signalement Incident**
```
⚠️ Nouvel Incident

📸 Photos (obligatoire)
   [+] Ajouter photo

Type d'incident:
   [ ] Propreté
   [x] Dégât
   [ ] Équipement cassé
   [ ] Manque consommable
   [ ] Autre

Gravité:
   ( ) Faible
   ( ) Moyenne
   (•) Élevée
   ( ) Critique

Description:
┌────────────────────────┐
│ Trace d'eau au plafond │
│ chambre 2, possible    │
│ fuite...               │
└────────────────────────┘

Consommables manquants:
☐ PQ
☐ Savon
☑ Capsules café
☐ Autre

[Annuler] [Signaler]
```

**Fin de Mission**
```
✅ Mission Terminée

Durée réelle: 2h45 (estimé: 3h)

Photos obligatoires: 5/5 ✓
Checklist: 12/12 ✓
Incidents signalés: 1

État final:
(•) Parfait
( ) Bon
( ) Acceptable
( ) Problèmes

Commentaire final:
┌────────────────────────┐
│ RAS, mission OK.       │
│ Incident plafond       │
│ signalé.               │
└────────────────────────┘

[Envoyer pour validation]
```

#### Fonctionnalités clés

1. **Notifications push**
- Nouvelle mission assignée
- Mission modifiée
- Rappel démarrage
- Message conciergerie

2. **Mode hors-ligne**
- Checklist utilisable offline
- Photos stockées localement
- Sync auto à la connexion

3. **Géolocalisation**
- Check-in/out géolocalisé (optionnel)
- Navigation vers logement

4. **Historique**
- Missions passées
- Statistiques perso
- Feedback conciergerie

---

### 4️⃣ ESPACE VOYAGEUR (Livret + Boutique)

**Objectif**: Expérience premium + upsell

#### Accès sécurisé
```
URL: https://app.superhote.com/stay/[TOKEN_UNIQUE]

Token généré par réservation
Valide: check-in - 7j à check-out + 7j
```

#### Page d'accueil Livret
```
┌─────────────────────────────────────────┐
│  🏠 Villa Méditerranée                  │
│  Bienvenue Marie & Jean !               │
│                                         │
│  📅 01 - 05 Février 2026                │
│  ✓ Check-in: 15h | Check-out: 11h      │
└─────────────────────────────────────────┘

🎉 Message de bienvenue personnalisé

┌─────────────────────────┐
│  📱 Votre séjour        │
│  ├─ 🗝️ Accès            │
│  ├─ 📶 WiFi             │
│  ├─ 📜 Règlement        │
│  ├─ 🏡 Le logement      │
│  └─ 📍 Alentours        │
│                         │
│  🛒 Boutique Services   │
│  ├─ 🌅 Check-in anticipé│
│  ├─ 🌆 Check-out tardif │
│  ├─ 🥐 Petit déjeuner   │
│  └─ 🧹 Ménage extra     │
│                         │
│  💬 Besoin d'aide ?     │
│  [Chat IA 24/7] 🤖      │
└─────────────────────────┘
```

#### Section Accès (débloquée selon règles)
```
🗝️ Accès au logement

⚠️ Cette section sera disponible 
   après paiement de la caution

Status: ⏳ Caution en attente

[Payer la caution maintenant] 💳
```

OU (si caution payée)

```
🗝️ Accès au logement

✅ Caution validée

📍 Adresse:
   12 Rue de la Plage
   06400 Cannes, France
   
🚗 Parking:
   Place n°12, Parking souterrain
   Code: 1234A
   
🔑 Entrée logement:
   Code porte: 5678B
   
📶 WiFi:
   Réseau: VillaMed_Guest
   Mot de passe: MerAzur2026!
   
🎥 Vidéo d'accès:
   [▶️ Voir la vidéo]
```

#### Boutique Services
```
🛒 Services Premium

┌────────────────────────────┐
│ 🌅 Check-in Anticipé       │
│ Arrivez dès 12h            │
│ 45€                        │
│ [Ajouter au panier]        │
└────────────────────────────┘

┌────────────────────────────┐
│ 🌆 Check-out Tardif        │
│ Partez jusqu'à 18h         │
│ 55€                        │
│ ❌ Indisponible ce jour    │
└────────────────────────────┘

┌────────────────────────────┐
│ 🥐 Petit Déjeuner Livré    │
│ Viennoiseries + jus fruits │
│ 25€ / 2 pers               │
│ Quantité: [1] [-][+]       │
│ [Ajouter au panier]        │
└────────────────────────────┘

Panier (1)
- Check-in anticipé: 45€
Total: 45€ TTC

[Commander] 💳
```

#### Chat IA 24/7
```
💬 Assistant IA

Vous: Comment marche la machine à café ?

🤖 Assistant (2s):
La machine Nespresso se trouve dans la 
cuisine, sur le plan de travail. Voici 
comment l'utiliser:

1. Remplir le réservoir d'eau
2. Insérer une capsule
3. Appuyer sur le bouton ☕

Des capsules sont disponibles dans le 
tiroir à gauche de la machine.

Besoin d'aide pour autre chose ? 😊

Vous: Le WiFi ne marche pas

🤖 Assistant (3s):
Je comprends, c'est frustrant. Voici 
quelques solutions:

1. Vérifiez que vous êtes connecté à 
   "VillaMed_Guest"
2. Essayez de redémarrer votre appareil
3. La box WiFi est dans l'entrée, vous 
   pouvez la redémarrer

Si le problème persiste, je contacte 
notre équipe pour vous aider rapidement.

[⚠️ Contacter l'équipe humaine]
```

#### Fonctionnalités avancées

1. **Multilingue automatique**
- Détection langue navigateur
- Switch FR/EN/ES/IT/DE
- Traductions IA si besoin

2. **Contenu dynamique**
- Météo locale
- Événements à venir
- Restaurants recommandés (IA)
- Activités sur mesure

3. **Check-out guidé**
- Rappel horaire
- Checklist voyageur
- Formulaire feedback
- Demande avis

---

### 5️⃣ MOTEUR DE RÈGLES (Rule Engine)

**Objectif**: Automatiser selon logique métier configurable

#### Architecture
```typescript
interface Rule {
  id: string;
  type: RuleType;
  name: string;
  conditions: Condition[];
  actions: Action[];
  priority: number;
  isActive: boolean;
}

interface Condition {
  field: string;          // "channel", "depositAmount", etc.
  operator: Operator;     // "equals", "greaterThan", etc.
  value: any;
}

interface Action {
  type: ActionType;
  config: any;
}
```

#### Types de règles

**1. RÈGLES CAUTION**

Exemple 1: Caution obligatoire Booking.com
```json
{
  "type": "SECURITY_DEPOSIT",
  "name": "Caution Booking.com",
  "conditions": [
    {
      "field": "channel",
      "operator": "equals",
      "value": "BOOKING_COM"
    }
  ],
  "actions": [
    {
      "type": "REQUIRE_DEPOSIT",
      "config": {
        "amount": 500,
        "deadline": "checkin_minus_48h",
        "blockCheckInIfNotPaid": true,
        "sendReminders": [24, 12, 6] // heures avant deadline
      }
    }
  ]
}
```

Exemple 2: Caution pour longs séjours
```json
{
  "conditions": [
    {
      "field": "nights",
      "operator": "greaterThan",
      "value": 7
    }
  ],
  "actions": [
    {
      "type": "REQUIRE_DEPOSIT",
      "config": {
        "amount": 1000,
        "allowOverride": true // Admin peut forcer
      }
    }
  ]
}
```

**2. RÈGLES OPÉRATIONNELLES**

Check-out + Check-in même jour
```json
{
  "type": "TASK_AUTOMATION",
  "name": "Ménage prioritaire same-day turnaround",
  "conditions": [
    {
      "field": "nextCheckinSameDay",
      "operator": "equals",
      "value": true
    }
  ],
  "actions": [
    {
      "type": "CREATE_TASK",
      "config": {
        "type": "CLEANING",
        "priority": "URGENT",
        "assignTo": "bestAvailable",
        "dueTime": "checkout_plus_1h",
        "notifyProvider": true
      }
    },
    {
      "type": "SEND_NOTIFICATION",
      "config": {
        "recipients": ["admin", "cleaning_manager"],
        "message": "Turnaround same-day {propertyName}"
      }
    }
  ]
}
```

**3. RÈGLES MESSAGING**

Message J-2
```json
{
  "type": "AUTO_MESSAGING",
  "name": "Check-in J-2",
  "conditions": [
    {
      "field": "daysUntilCheckin",
      "operator": "equals",
      "value": 2
    },
    {
      "field": "depositStatus",
      "operator": "equals",
      "value": "PAID"
    }
  ],
  "actions": [
    {
      "type": "SEND_MESSAGE",
      "config": {
        "template": "checkin_instructions",
        "channel": "EMAIL",
        "includeAccessCodes": true
      }
    }
  ]
}
```

**4. RÈGLES CALENDRIER**

Blocage si incident critique
```json
{
  "type": "CALENDAR_BLOCKING",
  "conditions": [
    {
      "field": "incidentSeverity",
      "operator": "equals",
      "value": "CRITICAL"
    }
  ],
  "actions": [
    {
      "type": "BLOCK_CALENDAR",
      "config": {
        "duration": "until_resolved",
        "notifyOwner": true,
        "cancelPendingReservations": false
      }
    }
  ]
}
```

#### Interface Admin Configuration
```
⚙️ Moteur de Règles

📋 Règles Actives (12)

┌─────────────────────────────────────┐
│ 🔴 Caution Booking.com              │
│ Type: Caution | Priorité: 10        │
│                                     │
│ Conditions:                         │
│ • Canal = Booking.com               │
│                                     │
│ Actions:                            │
│ • Exiger caution 500€               │
│ • Bloquer check-in si impayée       │
│ • Relances: J-2, J-1, J             │
│                                     │
│ ✅ Active | 245 déclenchements      │
│ [Modifier] [Dupliquer] [Désactiver] │
└─────────────────────────────────────┘

[+ Créer nouvelle règle]

📊 Statistiques
- 1,250 règles déclenchées ce mois
- 98% taux d'exécution réussie
- Temps moyen: 0.3s
```

---

### 6️⃣ AUDIT LOG (Timeline Complète)

**Objectif**: Traçabilité totale

#### Architecture
```typescript
interface AuditLog {
  id: string;
  timestamp: Date;
  eventType: AuditEventType;
  
  // Contexte
  reservationId?: string;
  propertyId?: string;
  taskId?: string;
  
  // Acteur
  actorType: 'USER' | 'SYSTEM' | 'AI' | 'GUEST';
  actorId?: string;
  actorName: string;
  
  // Détails
  description: string;
  metadata?: Record<string, any>;
  
  // Modifications
  before?: any;
  after?: any;
  
  // Technique
  ipAddress?: string;
  userAgent?: string;
}
```

#### Types d'événements

**Réservations**
- `RESERVATION_CREATED`
- `RESERVATION_MODIFIED`
- `RESERVATION_CANCELLED`
- `RESERVATION_CHECKED_IN`
- `RESERVATION_CHECKED_OUT`

**Paiements**
- `PAYMENT_INITIATED`
- `PAYMENT_SUCCEEDED`
- `PAYMENT_FAILED`
- `DEPOSIT_PAID`
- `DEPOSIT_REFUNDED`

**Communications**
- `MESSAGE_SENT`
- `AUTO_MESSAGE_SENT`
- `AI_RESPONSE_GENERATED`

**Tâches**
- `TASK_CREATED`
- `TASK_ASSIGNED`
- `TASK_STARTED`
- `TASK_COMPLETED`
- `TASK_VALIDATED`

**Incidents**
- `INCIDENT_REPORTED`
- `INCIDENT_RESOLVED`

**Boutique**
- `SHOP_ORDER_PLACED`
- `SHOP_ORDER_PAID`
- `SHOP_ORDER_CANCELLED`

**Accès**
- `BOOKLET_ACCESSED`
- `BOOKLET_VIEWED`

**Système**
- `RULE_TRIGGERED`
- `AUTOMATION_EXECUTED`
- `ADMIN_OVERRIDE`

#### Interfaces d'affichage

**Timeline Réservation**
```
📝 Timeline - Réservation #RES-2024-001

02/02 10:23 - Réservation créée
👤 Système | Canal: Booking.com
├─ Status: PENDING
├─ Total: 1,200€
└─ Caution requise: 500€

02/02 10:25 - Email confirmation envoyé
🤖 IA | Template: booking_confirmed
└─ Destinataire: marie@email.com

03/02 14:30 - Caution payée
💳 Stripe | Montant: 500€
└─ Payment ID: pi_xxx

03/02 14:31 - Règle déclenchée
⚙️ Moteur | "Débloquer check-in après caution"
└─ Actions: 2 exécutées

03/02 14:32 - Email instructions envoyé
🤖 IA | Template: checkin_instructions
├─ Codes d'accès inclus
└─ Livret débloqué

04/02 09:00 - Tâche ménage créée
👤 Admin (Jean Dupont)
└─ Assigné: Équipe A

04/02 11:30 - Tâche ménage démarrée
👤 Prestataire (Marie Martin)

04/02 14:15 - Tâche ménage terminée
👤 Prestataire (Marie Martin)
├─ Photos: 8 uploadées
├─ Checklist: 12/12
└─ Durée: 2h45

05/02 15:00 - Check-in effectué
👤 Guest | IP: 192.168.1.1
└─ Livret consulté
```

**Timeline Logement**
```
📝 Timeline - Villa Méditerranée

[Filtres: Tout | Réservations | Tâches | Incidents]
[Période: Dernier mois ▼]

05/02 15:00 - Check-in RES-001
05/02 14:15 - Ménage terminé
05/02 11:30 - Ménage démarré
04/02 09:00 - Ménage créé
...
```

#### Exports
- PDF Timeline
- CSV pour comptabilité
- JSON pour intégrations

---

## 🔄 Flux de Données Complets

### Flux 1: Création Réservation → Accès Livret

```
1. Réservation créée (Admin ou Canal)
   ├─ Génération booking reference
   ├─ Génération access token
   └─ Status: PENDING
   
2. Moteur de règles s'exécute
   ├─ Règle "Caution Booking.com" match
   └─ Action: Exiger caution 500€
   
3. Statut caution = REQUIRED
   └─ Email envoyé: "Payez votre caution"
   
4. Voyageur paie caution
   ├─ Stripe webhook
   ├─ Payment créé
   └─ Statut caution = PAID
   
5. Moteur de règles s'exécute
   ├─ Règle "Débloquer après caution" match
   └─ Actions:
      ├─ Envoyer instructions check-in
      ├─ Débloquer accès livret
      └─ Inclure codes d'accès
      
6. Voyageur accède au livret
   ├─ URL avec token
   ├─ GuestBookletAccess créé
   └─ Audit log: BOOKLET_ACCESSED
```

### Flux 2: Achat Boutique → Tâche Auto

```
1. Voyageur dans livret
   └─ Clique boutique
   
2. Affichage produits
   ├─ Filtre par disponibilité dates
   └─ Produits actifs pour ce logement
   
3. Voyageur ajoute "Petit déjeuner"
   └─ Panier: 25€
   
4. Paiement Stripe
   ├─ ShopOrder créé (PENDING)
   └─ Payment créé (PROCESSING)
   
5. Webhook Stripe: payment.succeeded
   ├─ ShopOrder.status = CONFIRMED
   ├─ Payment.status = SUCCEEDED
   └─ Audit log: SHOP_ORDER_PAID
   
6. Produit.generateTask = true
   └─ Tâche auto-créée
      ├─ Type: SHOP_ORDER_DELIVERY
      ├─ Title: "Livraison petit déjeuner"
      ├─ Instructions depuis produit
      ├─ Assigné: équipe par défaut
      └─ Due: jour check-in, 8h
      
7. Notification prestataire
   └─ Push: "Nouvelle tâche assignée"
```

### Flux 3: Check-out + Check-in même jour

```
1. Réservation A check-out 11h
   └─ Réservation B check-in 15h (même jour)
   
2. À 11h: Guest A checkout
   ├─ Status: CHECKED_OUT
   └─ Audit log
   
3. Webhook "checkout" déclenché
   └─ Moteur de règles s'exécute
   
4. Règle "Same-day turnaround" match
   ├─ Conditions:
   │  └─ nextCheckinSameDay = true
   └─ Actions:
      ├─ Créer tâche CLEANING (URGENT)
      ├─ Due: 12h (checkout + 1h)
      ├─ Assigné: meilleur dispo
      └─ Notifier: admin + manager
      
5. Prestataire assigné
   ├─ Push notification
   └─ Email récap
   
6. Prestataire complète mission avant 15h
   ├─ Checklist validée
   ├─ Photos uploadées
   └─ Status: COMPLETED
   
7. Property.status = AVAILABLE
   
8. À 14h30: Règle "Check-in J-0"
   └─ Envoyer instructions Guest B
```

---

## 🤖 Intégration IA

### Architecture IA

```
┌─────────────────────────────────────┐
│         AI ORCHESTRATOR             │
├─────────────────────────────────────┤
│  - Route requests                   │
│  - Context management               │
│  - Safety checks                    │
│  - Logging                          │
└─────────────────┬───────────────────┘
                  │
         ┌────────┴─────────┐
         │                  │
    ┌────▼────┐      ┌─────▼──────┐
    │ OpenAI  │      │   Gemini   │
    │   API   │      │    API     │
    └─────────┘      └────────────┘
```

### 3 Niveaux d'IA

#### 1. Assistant Conciergerie (Back-office)

**Use cases:**
- Suggérer réponses messages
- Résumer conversations
- Détecter intentions
- Générer templates
- Analyser sentiments

**Exemple: Suggestion réponse**
```typescript
async function suggestReply(messageId: string) {
  const message = await getMessageWithContext(messageId);
  
  const prompt = `
Tu es assistant d'une conciergerie de luxe.

Contexte réservation:
- Logement: ${message.reservation.property.name}
- Check-in: ${message.reservation.checkIn}
- Voyageur: ${message.reservation.guest.firstName}

Historique conversation:
${message.previousMessages.map(m => 
  `${m.sender}: ${m.content}`
).join('\n')}

Message du voyageur:
"${message.content}"

Génère une réponse:
- Professionnelle et chaleureuse
- En français
- Répondant précisément à la demande
- Incluant les infos pertinentes
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });
  
  return {
    suggestion: response.choices[0].message.content,
    confidence: 0.85,
    requiresReview: true // Humain valide
  };
}
```

**Interface Admin**
```
💬 Message de Marie Dubois

"Bonjour, est-ce possible d'arriver 
plus tôt le jour du check-in ?"

🤖 Suggestion IA (confidence: 85%)
┌─────────────────────────────────────┐
│ Bonjour Marie,                      │
│                                     │
│ Le check-in standard est à 15h.     │
│ Nous pouvons proposer un check-in   │
│ anticipé à 12h pour 45€.            │
│                                     │
│ Vous pouvez réserver ce service     │
│ directement depuis votre livret     │
│ d'accueil.                          │
│                                     │
│ N'hésitez pas si vous avez des      │
│ questions !                         │
│                                     │
│ Bien cordialement,                  │
│ L'équipe                            │
└─────────────────────────────────────┘

[✏️ Modifier] [✓ Envoyer] [✗ Rejeter]
```

#### 2. Assistant Prestataire (Mobile)

**Use cases:**
- Aide remplissage checklist
- Reformulation consignes
- Détection incohérences
- Guide troubleshooting

**Exemple: Aide incident**
```
Prestataire signale: "Trace brune plafond"

🤖 IA analyse et suggère:

Type probable: Fuite d'eau
Gravité: ÉLEVÉE
Actions:
  1. Prendre photo détaillée
  2. Signaler URGENT
  3. Vérifier étage au-dessus
  4. Ne pas toucher installation

Questions à poser:
  - Trace humide ou sèche ?
  - Récente ou ancienne ?
  - Robinet qui coule à l'étage ?
```

#### 3. Assistant Voyageur (Livret)

**Use cases:**
- FAQ intelligente (RAG)
- Support 24/7
- Upsell contextuel
- Escalade humain

**Architecture RAG**
```typescript
// 1. Embedding de la knowledge base
async function buildKnowledgeBase(propertyId: string) {
  const booklet = await getGuestBooklet(propertyId);
  
  const chunks = [
    ...booklet.sections.map(s => ({
      content: s.content,
      type: s.type,
      embedding: await getEmbedding(s.content)
    })),
    ...booklet.faqKnowledgeBase
  ];
  
  await storeInVectorDB(propertyId, chunks);
}

// 2. Recherche contextuelle
async function answerGuestQuestion(
  question: string,
  reservationId: string
) {
  const reservation = await getReservation(reservationId);
  
  // Récupérer chunks pertinents
  const relevantChunks = await vectorSearch(
    reservation.propertyId,
    question,
    limit: 5
  );
  
  const prompt = `
Tu es l'assistant du logement "${reservation.property.name}".

Contexte:
${relevantChunks.map(c => c.content).join('\n\n')}

Question voyageur:
"${question}"

Réponds de façon:
- Claire et concise
- Amicale
- En français
- En utilisant UNIQUEMENT les infos du contexte
- Si pas d'info: propose de contacter l'équipe
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });
  
  // Log interaction
  await logAIConversation({
    reservationId,
    question,
    answer: response.choices[0].message.content,
    chunks: relevantChunks.map(c => c.id)
  });
  
  return response.choices[0].message.content;
}
```

**Interface Voyageur**
```
💬 Assistant IA 24/7

Vous: Le chauffage ne marche pas

🤖 (typing...)

🤖: Je comprends, c'est désagréable. 
Voici comment allumer le chauffage:

1. Le thermostat est dans l'entrée, 
   sur le mur de droite
   
2. Appuyez sur le bouton ☀️
   
3. Utilisez + et - pour régler la 
   température (recommandé: 20°C)
   
4. Le système prend 10-15 minutes 
   pour chauffer

Le chauffage est au gaz, les radiateurs 
devraient devenir chauds progressivement.

Si ça ne fonctionne toujours pas dans 
20 minutes, je contacte notre équipe 
technique immédiatement.

[📞 Contacter l'équipe maintenant]
```

### Sécurité IA

**Règles impératives:**

1. **L'IA NE PEUT JAMAIS:**
   - Divulguer codes d'accès si caution non payée
   - Partager données autres voyageurs
   - Modifier données système
   - Prendre décisions financières
   - Annuler réservations

2. **L'IA DOIT:**
   - Respecter règles moteur (ex: caution gate)
   - Logger toutes interactions
   - Escalader si incertain
   - Demander confirmation actions sensibles

3. **Contrôles:**
```typescript
// Avant de partager codes d'accès
async function canShareAccessCodes(reservationId: string) {
  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
    include: { property: true }
  });
  
  // Vérifier règles caution
  if (reservation.property.securityDeposit > 0) {
    if (reservation.depositStatus !== 'PAID') {
      return {
        allowed: false,
        reason: 'security_deposit_not_paid',
        message: "Les codes seront disponibles après paiement de la caution."
      };
    }
  }
  
  // Vérifier date
  const now = new Date();
  const checkinMinus48h = new Date(reservation.checkIn);
  checkinMinus48h.setHours(checkinMinus48h.getHours() - 48);
  
  if (now < checkinMinus48h) {
    return {
      allowed: false,
      reason: 'too_early',
      message: "Les codes seront envoyés 48h avant votre arrivée."
    };
  }
  
  return { allowed: true };
}
```

---

## 🔐 Sécurité & RGPD

### Authentification

**Système multi-rôle:**
```typescript
enum Permission {
  // Properties
  VIEW_PROPERTIES,
  EDIT_PROPERTIES,
  DELETE_PROPERTIES,
  
  // Reservations
  VIEW_ALL_RESERVATIONS,
  VIEW_OWN_RESERVATIONS,
  EDIT_RESERVATIONS,
  CANCEL_RESERVATIONS,
  
  // Finances
  VIEW_FINANCES,
  EDIT_FINANCES,
  EXPORT_FINANCES,
  
  // Messages
  VIEW_GUEST_MESSAGES,
  SEND_MESSAGES,
  
  // Tasks
  VIEW_TASKS,
  ASSIGN_TASKS,
  COMPLETE_TASKS,
  
  // Admin
  MANAGE_USERS,
  MANAGE_RULES,
  VIEW_AUDIT_LOG,
  ADMIN_OVERRIDE,
}

const rolePermissions: Record<UserRole, Permission[]> = {
  SUPER_ADMIN: [/* all permissions */],
  
  CONCIERGE_ADMIN: [
    VIEW_PROPERTIES,
    EDIT_PROPERTIES,
    VIEW_ALL_RESERVATIONS,
    EDIT_RESERVATIONS,
    VIEW_FINANCES,
    // ...
  ],
  
  OWNER: [
    VIEW_OWN_PROPERTIES,
    VIEW_OWN_FINANCES,
    VIEW_INCIDENTS,
    // PAS de VIEW_GUEST_MESSAGES
  ],
  
  SERVICE_PROVIDER: [
    VIEW_ASSIGNED_TASKS,
    COMPLETE_TASKS,
    REPORT_INCIDENTS,
  ],
  
  GUEST: [
    VIEW_OWN_RESERVATION,
    VIEW_BOOKLET,
    SHOP_ORDERS,
  ]
};
```

### RGPD

**Données sensibles chiffrées:**
- Numéros passeport/ID
- Codes d'accès
- Coordonnées bancaires

**Consentements:**
```typescript
interface GuestConsent {
  marketing: boolean;        // Emails marketing
  dataRetention: boolean;    // Conservation données
  thirdPartySharing: boolean; // Partage partenaires
  consentDate: Date;
  ipAddress: string;
}
```

**Droit à l'oubli:**
```typescript
async function deleteGuestData(guestId: string) {
  // 1. Anonymiser plutôt que supprimer (historique)
  await prisma.guest.update({
    where: { id: guestId },
    data: {
      firstName: 'ANONYMIZED',
      lastName: 'ANONYMIZED',
      email: `anonymized-${guestId}@deleted.com`,
      phone: null,
      passportNumber: null,
      // Garder statistiques
      totalStays: 0,
      totalSpent: 0,
    }
  });
  
  // 2. Supprimer messages
  await prisma.message.deleteMany({
    where: { guestId }
  });
  
  // 3. Log action
  await createAuditLog({
    eventType: 'GDPR_DATA_DELETION',
    guestId,
    description: 'Guest data anonymized per GDPR request'
  });
}
```

**Export données:**
```typescript
async function exportGuestData(guestId: string) {
  const guest = await prisma.guest.findUnique({
    where: { id: guestId },
    include: {
      reservations: {
        include: {
          property: true,
          payments: true,
          messages: true,
          shopOrders: true,
        }
      }
    }
  });
  
  return {
    personalInfo: {
      firstName: guest.firstName,
      lastName: guest.lastName,
      email: guest.email,
      phone: guest.phone,
    },
    reservations: guest.reservations.map(r => ({
      property: r.property.name,
      dates: `${r.checkIn} - ${r.checkOut}`,
      totalPaid: r.totalPrice,
      messages: r.messages.length,
      // ...
    })),
    exportDate: new Date(),
  };
}
```

---

## 📈 Roadmap MVP

### MVP (3 mois) - Fondations

**DOIT AVOIR:**
✅ Auth multi-rôles
✅ CRUD Logements
✅ CRUD Réservations (manuel)
✅ Calendrier basique
✅ Gestion Tâches
✅ Livret d'accueil simple
✅ Paiements Stripe (réservation)
✅ Messages manuels
✅ Audit log basique
✅ Dashboard admin

**PEUT ATTENDRE:**
⏸️ Sync canaux (iCal)
⏸️ Boutique
⏸️ IA
⏸️ Portail propriétaire complet
⏸️ App mobile prestataire

### V2 (2 mois) - Automatisation

✅ Moteur de règles complet
✅ Automatisations messages
✅ Sync iCal Airbnb/Booking
✅ Boutique + upsell
✅ IA Assistant (basique)
✅ Portail propriétaire
✅ Checklists dynamiques

### V3 (3 mois) - Excellence

✅ App mobile prestataire (React Native)
✅ IA avancée (RAG, multi-agents)
✅ Analytics prédictifs
✅ Pricing dynamique IA
✅ API publique
✅ Marketplace prestataires
✅ White-label

---

## 🛠️ Tech Stack Recommandé

### Frontend
```json
{
  "framework": "Next.js 15",
  "language": "TypeScript",
  "styling": "Tailwind CSS",
  "components": "shadcn/ui",
  "forms": "React Hook Form + Zod",
  "state": "Zustand",
  "charts": "Recharts",
  "calendar": "react-big-calendar",
  "maps": "Mapbox GL"
}
```

### Backend
```json
{
  "runtime": "Node.js 20+",
  "framework": "Next.js API Routes",
  "orm": "Prisma",
  "validation": "Zod",
  "queue": "BullMQ",
  "cache": "Redis",
  "storage": "AWS S3 / Cloudflare R2"
}
```

### Database
```json
{
  "primary": "PostgreSQL 15+",
  "vector": "pgvector (pour IA/RAG)",
  "cache": "Redis 7+",
  "search": "PostgreSQL Full-Text Search"
}
```

### Services externes
```json
{
  "ai": "OpenAI API ou Google Gemini",
  "payments": "Stripe Connect",
  "email": "SendGrid ou Resend",
  "sms": "Twilio",
  "storage": "Cloudflare R2",
  "cdn": "Cloudflare",
  "monitoring": "Sentry + Datadog",
  "analytics": "PostHog"
}
```

### Hosting
```json
{
  "frontend": "Vercel",
  "backend": "Railway ou Render",
  "database": "Neon ou Supabase",
  "redis": "Upstash",
  "cdn": "Cloudflare"
}
```

---

## ⚠️ Erreurs à Éviter

### Erreurs techniques

1. **Ne pas chiffrer données sensibles**
   ❌ Stocker codes d'accès en clair
   ✅ Chiffrer avec AES-256

2. **Permissions trop larges**
   ❌ Propriétaire voit tout
   ✅ Filtrage granulaire par rôle

3. **Pas de rate limiting**
   ❌ API ouverte
   ✅ 100 req/min par IP

4. **Logs insuffisants**
   ❌ Juste erreurs
   ✅ Audit log complet

5. **IA sans guardrails**
   ❌ IA accès direct DB
   ✅ Couche sécurité + validation

### Erreurs produit

1. **Trop de features MVP**
   ❌ Tout faire V1
   ✅ Focus core value

2. **UX mobile négligée**
   ❌ Desktop-first prestataire
   ✅ Mobile-first terrain

3. **Propriétaire frustré**
   ❌ Infos cachées
   ✅ Transparence calibrée

4. **Automatisation rigide**
   ❌ Règles hardcodées
   ✅ Moteur configurable

5. **IA remplace humain trop tôt**
   ❌ Auto-réponse sans validation
   ✅ Suggestion + validation humaine

---

## 📊 Métriques de succès

### KPIs Business
- Temps moyen traitement réservation: < 5min
- Taux automatisation messages: > 60%
- Satisfaction propriétaires: > 4.5/5
- Upsell boutique: > 15% réservations
- Temps validation tâche: < 30min

### KPIs Techniques
- Uptime: > 99.9%
- API response time: < 200ms
- IA response time: < 3s
- Taux erreur: < 0.1%
- Coverage tests: > 80%

### KPIs Utilisateurs
- Onboarding propriétaire: < 10min
- Temps complétion checklist prestataire: -30%
- Taux consultation livret: > 80%
- Satisfaction voyageur: > 4.7/5

---

**Version**: 2.0.0  
**Date**: Février 2026  
**Auteur**: SuperHote PMS Team
