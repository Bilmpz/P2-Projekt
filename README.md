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



## Lavet af 
Birk Toppenberg Lazar, Hjalte Zacharias Matthiesen, Mohammed Benjamin Tufail Bhatti, Oliver Hjort Backe Løbel, Uni Gilstón, Jakob Pedersen & Marcus Elkjær


