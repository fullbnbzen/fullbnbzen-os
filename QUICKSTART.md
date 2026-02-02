# 🚀 Guide de Démarrage Rapide

## Installation en 10 minutes

### Prérequis

```bash
# Vérifier installations
node --version  # >= 20.0.0
npm --version   # >= 10.0.0
psql --version  # >= 15.0
```

Si manquant:
- Node.js: https://nodejs.org/
- PostgreSQL: https://www.postgresql.org/download/

---

## Étape 1: Setup Projet (2 min)

```bash
# Installer dépendances
npm install

# Copier .env
cp .env.example .env
```

---

## Étape 2: Base de Données (3 min)

### A. Créer la base

```bash
# Via psql
psql
CREATE DATABASE superhote_pms;
\q

# OU via terminal
createdb superhote_pms
```

### B. Configurer .env

```env
DATABASE_URL="postgresql://VOTRE_USER:VOTRE_PASSWORD@localhost:5432/superhote_pms"
```

### C. Migrations

```bash
# Créer les tables
npx prisma migrate dev --name init

# Générer client Prisma
npx prisma generate
```

---

## Étape 3: Données de Test (1 min)

```bash
# Peupler avec données demo
npm run db:seed
```

Crée:
- 1 Admin (admin@superhote.com / admin123)
- 3 Logements
- 5 Réservations
- 10 Tâches
- Etc.

---

## Étape 4: Lancer l'Application (1 min)

```bash
# Lancer le portail admin
npm run dev

# Ou spécifier le portail
npm run dev:admin   # Port 3000
npm run dev:owner   # Port 3001 (à venir)
npm run dev:provider # Port 3002 (à venir)
npm run dev:guest   # Port 3003 (à venir)
```

**Ouvrir:** http://localhost:3000

**Se connecter:**
- Email: `admin@superhote.com`
- Password: `admin123`

---

## ✅ Checklist Rapide

Après installation, vous devriez voir:

1. ✅ Dashboard avec 4 KPIs
2. ✅ Section "Insights IA" (avec données démo)
3. ✅ 3 logements dans "Logements"
4. ✅ Réservations dans tableau
5. ✅ Messages avec suggestions IA (demo)
6. ✅ Moteur de règles avec 3 règles actives

---

## 🔧 Commandes Utiles

### Database

```bash
# Prisma Studio (GUI)
npm run db:studio
# Ouvre http://localhost:5555

# Reset complet
npm run db:reset

# Migration production
npm run db:migrate:deploy
```

### Développement

```bash
# Type checking
npm run type-check

# Linter
npm run lint

# Format code
npm run format

# Tests
npm test
npm run test:watch
```

---

## 🔑 Configuration APIs (Optionnel au départ)

### 1. IA (OpenAI ou Gemini)

**OpenAI:**
```bash
# .env
OPENAI_API_KEY="sk-..."
```

**Gemini:**
```bash
# .env
GEMINI_API_KEY="..."
```

### 2. Stripe (Paiements)

```bash
# .env
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

Obtenir clés: https://dashboard.stripe.com/apikeys

### 3. Email (SendGrid ou Resend)

**SendGrid:**
```bash
# .env
SENDGRID_API_KEY="SG..."
SENDGRID_FROM_EMAIL="noreply@superhote.com"
```

**Resend:**
```bash
# .env
RESEND_API_KEY="re_..."
```

### 4. SMS (Twilio)

```bash
# .env
TWILIO_ACCOUNT_SID="AC..."
TWILIO_AUTH_TOKEN="..."
TWILIO_PHONE_NUMBER="+33..."
```

---

## 🎯 Prochaines Étapes

### Semaine 1: Explorer le système

1. **Lire l'architecture**
   ```bash
   cat ARCHITECTURE.md
   ```

2. **Explorer le schema DB**
   ```bash
   npm run db:studio
   ```

3. **Tester le portail admin**
   - Créer un logement
   - Créer une réservation
   - Assigner une tâche
   - Configurer une règle

### Semaine 2-3: Intégrer vos APIs

1. **IA**
   - Obtenir clé OpenAI/Gemini
   - Tester suggestions messages
   - Configurer FAQ livret

2. **Paiements**
   - Setup Stripe
   - Tester cautions
   - Tester boutique

3. **Communications**
   - Setup SendGrid/Twilio
   - Configurer templates
   - Tester automatisations

### Mois 2: Développer les autres portails

1. **Portail Propriétaire**
   - Dashboard finances
   - Calendrier
   - Incidents

2. **App Prestataire (React Native)**
   - Planning missions
   - Checklist interactive
   - Photos

3. **Livret Voyageur**
   - Contenu personnalisé
   - Boutique
   - Chat IA

---

## 🐛 Debugging

### Problème: Connexion DB

```bash
# Vérifier PostgreSQL
sudo service postgresql status

# Tester connexion
psql -U votre_user -d superhote_pms
```

### Problème: Port déjà utilisé

```bash
# Trouver process sur port 3000
lsof -i :3000

# Tuer process
kill -9 PID

# Ou utiliser autre port
PORT=3001 npm run dev
```

### Problème: Prisma Client

```bash
# Régénérer client
npx prisma generate

# Avec clean
rm -rf node_modules/.prisma
npx prisma generate
```

---

## 📚 Documentation Complète

| Document | Description |
|----------|-------------|
| `README.md` | Vue d'ensemble complète |
| `ARCHITECTURE.md` | Architecture technique détaillée |
| `prisma/schema.prisma` | Modèle de données |
| `.env.example` | Variables d'environnement |

---

## 🆘 Besoin d'aide ?

1. **Relire l'ARCHITECTURE.md** - Tout y est expliqué
2. **Prisma Studio** - Pour explorer la DB visuellement
3. **Console logs** - `console.log()` dans le code
4. **Network tab** - DevTools pour voir les requêtes API

---

## ✨ Tips

### Développement

```bash
# Multi-terminaux
Terminal 1: npm run dev        # Frontend
Terminal 2: npm run db:studio  # Prisma Studio
Terminal 3: redis-cli          # Redis (si installé)
```

### Hot Reload

Next.js recharge automatiquement:
- Changements React → Instant
- Changements API → Rapide
- Changements Prisma → Redémarrer

### VSCode Extensions

Recommandées:
- Prisma
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- GitLens

---

## 🎉 Vous êtes prêt !

```bash
npm run dev
```

→ http://localhost:3000

**Login:** admin@superhote.com / admin123

**Explorez:**
1. Dashboard → Insights IA
2. Logements → Créer un nouveau
3. Réservations → Voir workflow caution
4. Messages → Suggestions IA
5. Moteur de Règles → Configurer automatisations

**Bon développement !** 🚀
