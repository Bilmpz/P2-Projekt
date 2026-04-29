# AAU Study Buddy

Et P2-projekt udviklet på Aalborg Universitet København. AAU Study Buddy er en webapplikation, hvor studerende kan finde læsemakkere på deres fag, oprette studieopslag, tilmelde sig fag-grupper og sende beskeder til hinanden.

---

## Indholdsfortegnelse

- [Om projektet](#om-projektet)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Projektstruktur](#projektstruktur)
- [Kom i gang](#kom-i-gang)
- [Konfiguration](#konfiguration)
- [Kørsel](#kørsel)
- [Routes-oversigt](#routes-oversigt)
- [Datamodeller](#datamodeller)
- [Kendte issues](#kendte-issues)

---

## Om projektet

AAU Study Buddy løser et velkendt problem på universitetet: det kan være svært at finde nogen at læse op med — især på store årgange, eller når man er ny. Platformen lader brugere:

- Browse gennem deres fag (f.eks. SWD601 Software Design, ALG503 Algorithms & Data Structures)
- Tilmelde sig et fag som "gruppe"
- Oprette opslag i en gruppe, fx "søger nogen at læse design patterns med"
- Se et personligt feed af opslag fra de fag, man har tilmeldt sig
- Tage kontakt til andre via beskeder

---

## Features

- **Brugerregistrering & login** med JWT-cookies og bcrypt-hashed passwords
- **Studiegrupper** — én gruppe per fag, brugere kan join/leave
- **Opslag** — opret, læs, opdater og slet posts knyttet til en gruppe
- **Personligt feed** der kun viser opslag fra de grupper man er medlem af
- **Beskeder** mellem brugere
- **Profilside** hvor man kan opdatere brugernavn, email og bio
- **Server-side rendering** med EJS, så siden virker uden JavaScript i klienten

---

## Tech stack

**Backend**
- Node.js (ES modules)
- Express 5
- Mongoose (MongoDB ODM)
- bcrypt (password hashing)
- jsonwebtoken (JWT auth)
- cookie-parser
- dotenv

**Frontend**
- EJS templating
- express-ejs-layouts
- Vanilla CSS (ingen frameworks)

**Database**
- MongoDB Atlas

**Dev tools**
- nodemon

---

## Projektstruktur

```
P2-Projekt/
├── backend/
│   ├── seed.js                     # Seeder grupper i databasen
│   └── src/
│       ├── server.js               # Entry point
│       ├── app.js                  # Express-konfiguration
│       ├── config/
│       │   ├── db.js               # MongoDB-forbindelse
│       │   └── constants.js
│       ├── controllers/            # Forretningslogik
│       │   ├── authController.js
│       │   ├── groupController.js
│       │   ├── messageController.js
│       │   ├── pageController.js
│       │   └── postController.js
│       ├── middleware/
│       │   ├── authMiddleware.js   # JWT-validering
│       │   └── LoadUserGroups.js   # Henter brugerens grupper til sidebaren
│       ├── models/                 # Mongoose-skemaer
│       │   ├── User.model.js
│       │   ├── Group.model.js
│       │   ├── GroupMembership.model.js
│       │   ├── Post.model.js
│       │   └── Message.model.js
│       ├── routes/                 # Route-definitioner
│       │   ├── authRoutes.js
│       │   ├── groupRoutes.js
│       │   ├── postRoutes.js
│       │   └── messageRoutes.js
│       └── services/
│           └── groupService.js
├── frontend/
│   ├── views/                      # EJS-templates
│   │   ├── layouts/
│   │   │   └── main.ejs            # Fælles layout (header + sidebar)
│   │   ├── partials/
│   │   │   └── group-nav.ejs
│   │   └── pages/
│   │       ├── index.ejs
│   │       ├── feed.ejs
│   │       ├── groups.ejs
│   │       ├── groupPost.ejs
│   │       ├── posts.ejs
│   │       ├── createPost.ejs
│   │       └── profile.ejs
│   └── public/                     # Statiske CSS-filer
├── package.json
└── .env                            # Lokale env-variabler (ikke committet)
```

---

## Kom i gang

### Forudsætninger

- Node.js 18 eller nyere
- En MongoDB Atlas-konto med et cluster sat op
- Git

### Installation

Klon repoet og installer dependencies:

```bash
git clone https://github.com/Bilmpz/P2-Projekt.git
cd P2-Projekt
npm install
```

---

## Konfiguration

### 1. Lav en `.env`-fil i projektets rod

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxxxx.mongodb.net/
PORT=3000
JWT_SECRET="vælg_en_lang_tilfældig_streng"
```

### 2. ⚠️ MongoDB Atlas — IP whitelist

Det her er den fejl alle løber ind i først. MongoDB Atlas blokerer som standard alle indkommende forbindelser. Hvis du ikke whitelister din IP, vil serveren ikke starte og du får denne fejl:

```
MongooseServerSelectionError: Could not connect to any servers in your MongoDB Atlas cluster.
```

**Sådan fikser du det:**

1. Log ind på [cloud.mongodb.com](https://cloud.mongodb.com)
2. Vælg dit cluster → **Network Access** i venstre menu
3. Klik **Add IP Address**
4. Vælg enten:
   - **Add Current IP Address** — kun din nuværende IP
   - **Allow Access from Anywhere** (`0.0.0.0/0`) — anbefales til udvikling, så hele gruppen kan tilgå databasen fra forskellige netværk
5. Vent 1-2 minutter på at ændringen slår igennem

> **⚠️ Sikkerhed:** `0.0.0.0/0` er **ikke** sikkert i produktion. Det er kun OK fordi det her er et skoleprojekt med dummy-data.

---

## Kørsel

### Start serveren i dev-mode (med hot reload)

```bash
npm run dev
```

Serveren kører nu på `http://localhost:3000`. Du burde se:

```
MongoDB connected !!!
server is running on port: 3000
```

### Seed databasen med fag/grupper

Hvis databasen er tom, kan du seede den med dummy-grupper:

```bash
npm run seed
```

---

## Routes-oversigt

### Auth

| Method | Endpoint                  | Beskyttet | Beskrivelse                |
|--------|---------------------------|-----------|----------------------------|
| POST   | `/auth/register`          | Nej       | Opret ny bruger            |
| POST   | `/auth/login`             | Nej       | Log ind, returnerer cookie |
| GET    | `/auth/profile`           | Ja        | Vis profilside             |
| POST   | `/auth/profile/update`    | Ja        | Opdater profil             |

### Grupper

| Method | Endpoint                       | Beskyttet | Beskrivelse              |
|--------|--------------------------------|-----------|--------------------------|
| GET    | `/main/groups`                 | Ja        | Liste over alle grupper  |
| POST   | `/main/groups/:groupId/join`   | Ja        | Tilmeld dig en gruppe    |
| POST   | `/main/groups/:groupId/leave`  | Ja        | Forlad en gruppe         |

### Opslag

| Method | Endpoint                          | Beskyttet | Beskrivelse                 |
|--------|-----------------------------------|-----------|-----------------------------|
| GET    | `/main/post/feed`                 | Ja        | Personligt feed             |
| GET    | `/main/post/create`               | Ja        | Opret-opslag-side           |
| POST   | `/main/post/create`               | Ja        | Opret nyt opslag            |
| GET    | `/main/post/group/:groupId`       | Ja        | Opslag i en specifik gruppe |
| GET    | `/main/post/:postId`              | Ja        | Detaljevisning af opslag    |
| PUT    | `/main/post/:postId`              | Ja        | Opdater opslag              |
| DELETE | `/main/post/:postId`              | Ja        | Slet opslag                 |

### Beskeder

| Method | Endpoint                  | Beskyttet | Beskrivelse                  |
|--------|---------------------------|-----------|------------------------------|
| POST   | `/api/messages`           | Ja        | Send en besked               |
| GET    | `/api/messages/:userId`   | Ja        | Hent samtale med en bruger   |

---

## Datamodeller

### User
| Felt       | Type     | Note                       |
|------------|----------|----------------------------|
| username   | String   | Unique, 3-30 tegn          |
| email      | String   | Unique, valideres med regex |
| password   | String   | Bcrypt-hashed              |    |
| createdAt  | Date     | Auto                       |

### Group
| Felt        | Type     | Note         |
|-------------|----------|--------------|
| name        | String   | Påkrævet     |
| description | String   | Påkrævet     |
| location    | String   | Valgfri      |
| department  | String   | Valgfri      |

### Post
| Felt         | Type     | Note                       |
|--------------|----------|----------------------------|
| user         | ObjectId | Reference til User         |
| group        | ObjectId | Reference til Group        |
| title        | String   |                            |
| content      | String   |                            |
| availability | String   | Foretrukne læsetidspunkter |

### GroupMembership
Mange-til-mange-relation mellem User og Group — bestemmer hvilke grupper en bruger er medlem af.

### Message
Beskeder sendt mellem to brugere.

---

## Kendte issues

- **Beskeder-funktionen er ikke fuldt implementeret i frontend** — backend-routes virker, men UI'et er kun delvist.
- **Ingen fejlbeskeder til brugeren** ved login/register — fejl returneres som JSON, men frontend håndterer dem ikke pænt endnu.
- **CORS** er hardcoded til `http://127.0.0.1:5500` (Live Server). Det skal ændres når frontend serveres fra Express selv.

---

## Forfattere

P2-projektgruppe, Aalborg Universitet København, 2. semester Software 2025/26.

---

## Licens

ISC — internt skoleprojekt.
