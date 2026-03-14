# 🔐 Password Generator

Un générateur de mots de passe sécurisés — construit en Fullstack avec Node.js et Express. Simple, rapide, et orienté cybersécurité.

---

## Aperçu

- Génération de mots de passe forts et aléatoires
- Indicateur de force en temps réel (Faible / Moyen / Fort / Très fort)
- Options personnalisables — longueur, minuscules, majuscules, chiffres, symboles
- Copie en un clic dans le presse-papier
- Interface sobre et moderne

---

## Stack technique

- **Backend** — Node.js, Express
- **Frontend** — HTML, CSS, JavaScript vanilla
- **Sécurité** — Génération cryptographiquement fiable, caractères garantis par type

---

## Lancer le projet en local

### Prérequis

- [Node.js]
- [Git]

### Étapes

```bash
# 1. 
git clone https://github.com/TON_USERNAME/password-generator.git

# 2. 
cd password-generator

# 3. 
npm install

# 4. 
node server.js
```

 **http://localhost:3000** launch the website 🚀

---

## Structure du projet

```
password-generator/
├── public/
│   └── index.html       ← Interface utilisateur
├── server.js            ← Serveur Express + logique de génération
└── package.json
```

---

## API REST

| Méthode | Route | Description |
|--------|-------|-------------|
| POST | `/api/generate` | Générer un mot de passe |

### Exemple de requête

```json
POST /api/generate
{
  "length": 16,
  "lowercase": true,
  "uppercase": true,
  "numbers": true,
  "symbols": false
}
```

### Exemple de réponse

```json
{
  "password": "aB3kR9mX2pLq7nWt",
  "strength": {
    "label": "Fort",
    "level": 3
  }
}
```

---

## Logique de sécurité

- Chaque type de caractère activé est **garanti** d'apparaître au moins une fois
- Le mot de passe est **mélangé aléatoirement** pour éviter tout pattern prévisible
- Le score de force est calculé sur 6 critères — longueur, diversité des caractères
- Longueur entre **4 et 128 caractères**

--()
### 3. Crée un repo sur GitHub
- Va sur [github.com](https://github.com)
- Clique sur **"New repository"**
- Nom : `password-generator`
- Clique **"Create repository"**

### 4. Initialise et pousse le projet
```bash

---

## Déploiement (Railway)


---

## Auteur

**Christophe** — Développeur Fullstack  
Stack : HTML · CSS · JavaScript · Node.js · Python · SQL · Linux

---

> Projet réalisé dans le cadre de mon portfolio — orienté cybersécurité.
