# 🎬 FilmHub - Classificateur de Films

Une interface moderne et intuitive pour classer, organiser et gérer votre collection de films par genre et catégorie.

## ✨ Caractéristiques

### 🎯 Fonctionnalités Principales

- **📽️ Gestion des Films** - Ajoutez, modifiez et supprimez des films facilement
- **🎭 Filtrage par Genre** - Organisez vos films par genre (Action, Comédie, Drame, etc.)
- **📂 Filtrage par Catégorie** - Classez par type (Cinéma, Série, Film court, Documentaire)
- **⭐ Système de Favoris** - Marquez vos films préférés
- **🔍 Recherche Avancée** - Trouvez rapidement vos films
- **💾 Stockage Local** - Toutes les données sont sauvegardées dans votre navigateur
- **🎨 Design Moderne** - Interface élégante avec thème sombre
- **📱 Responsive Design** - Fonctionne sur tous les appareils

### 🎬 Gestion des Films

Pour chaque film, vous pouvez ajouter:
- Titre (obligatoire)
- Genre (obligatoire)
- Catégorie (obligatoire)
- Année de sortie
- Note personnelle (/10)
- Description/Résumé
- URL de l'affiche

## 🚀 Démarrage Rapide

### 1. Télécharger les fichiers

Clonez le dépôt:
```bash
git clone https://github.com/djinx22/movie-classifier.git
cd movie-classifier
```

### 2. Ouvrir l'application

Ouvrez simplement le fichier `index.html` dans votre navigateur:
```bash
# Sur macOS
open index.html

# Sur Windows
start index.html

# Sur Linux
xdg-open index.html
```

Ou utilisez un serveur local (optionnel mais recommandé):
```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (http-server)
npx http-server
```

Puis accédez à `http://localhost:8000` dans votre navigateur.

## 📖 Guide d'Utilisation

### Ajouter un Film

1. Cliquez sur le bouton **"+ Ajouter un film"** dans la barre latérale
2. Remplissez les informations obligatoires (Titre, Genre, Catégorie)
3. Complétez les informations optionnelles
4. Cliquez sur **"Ajouter le film"**

### Filtrer par Genre

1. Cliquez sur **"Par Genre"** dans la navigation
2. Sélectionnez le genre souhaité parmi les filtres disponibles
3. Les films correspondants s'affichent automatiquement

### Filtrer par Catégorie

1. Cliquez sur **"Par Catégorie"** dans la navigation
2. Sélectionnez la catégorie souhaitée
3. Visualisez les films de cette catégorie

### Rechercher un Film

Utilisez la barre de recherche en haut de page pour trouver rapidement un film par:
- Titre
- Genre
- Catégorie

### Gérer les Favoris

- Cliquez sur l'icône **cœur** (🤍/❤️) sur une carte de film pour l'ajouter aux favoris
- Cliquez sur **"Favoris"** pour voir tous vos films préférés

### Voir les Détails d'un Film

1. Cliquez sur une carte de film
2. Une fenêtre détaillée s'ouvre avec toutes les informations
3. Vous pouvez ajouter aux favoris ou supprimer le film depuis cette vue

### Supprimer un Film

- Cliquez sur l'icône **poubelle** (🗑️) sur une carte
- Ou utilisez le bouton **"Supprimer"** dans la vue détaillée

## 🎨 Design et Interface

### Thème

- **Thème Sombre** pour une meilleure expérience visuelle
- **Couleurs Modernes** - Dégradés indigo et rose
- **Animations Fluides** - Transitions élégantes

### Composants

- **Barre Latérale** - Navigation principale et actions rapides
- **En-tête** - Recherche et statistiques
- **Grille de Films** - Affichage en cartes responsives
- **Modales** - Formulaires et détails en overlay

## 💾 Stockage des Données

Les films sont automatiquement sauvegardés dans le **localStorage** de votre navigateur. Cela signifie:

- ✅ Les données persistent après fermeture du navigateur
- ✅ Pas besoin de connexion internet pour utiliser l'app
- ✅ Pas de serveur requis
- ⚠️ Les données sont locales à votre appareil et ce navigateur

**Pour exporter vos données**: Ouvrez la console du navigateur (F12) et exécutez:
```javascript
console.log(JSON.parse(localStorage.getItem('movies')))
```

## 📂 Structure du Projet

```
movie-classifier/
├── index.html       # Structure HTML
├── styles.css       # Styles et design
├── script.js        # Logique JavaScript
└── README.md        # Documentation
```

## 🔧 Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Design responsive et moderne
- **JavaScript (ES6+)** - Logique de l'application
- **LocalStorage API** - Persistance des données

## 🌐 Genres Disponibles

- Action
- Comédie
- Drame
- Science-fiction
- Horreur
- Romance
- Thriller
- Animation
- Documentaire
- *(Vous pouvez en ajouter d'autres)*

## 📂 Catégories Disponibles

- Cinéma
- Série
- Film court
- Documentaire
- *(Vous pouvez en ajouter d'autres)*

## 📱 Compatibilité

L'application fonctionne sur:
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Navigateurs mobiles (iOS Safari, Chrome Mobile, etc.)

**Résolution minimale recommandée**: 320px (responsive)

## 🚀 Optimisations Futures

- [ ] Export/Import de données (JSON, CSV)
- [ ] Intégration API OMDB pour récupérer les affiches
- [ ] Notation par étoiles interactives
- [ ] Système de tags personnalisés
- [ ] Historique de visionnage
- [ ] Recommandations basées sur l'IA
- [ ] Synchronisation cloud
- [ ] Mode sombre/clair

## 📝 Exemples de Films

L'application est livrée avec 6 films d'exemple:

1. **Inception** (2010) - Science-fiction, 8.8/10
2. **The Dark Knight** (2008) - Action, 9.0/10
3. **Interstellar** (2014) - Science-fiction, 8.6/10
4. **La La Land** (2016) - Romance, 8.0/10
5. **Pulp Fiction** (1994) - Thriller, 8.9/10
6. **Toy Story** (1995) - Animation, 8.3/10

Vous pouvez les supprimer et ajouter vos propres films!

## 🐛 Dépannage

### Les données ne sont pas sauvegardées
- Vérifiez que le localStorage n'est pas désactivé dans votre navigateur
- Vérifiez que vous n'êtes pas en mode navigation privée/incognito

### Les images ne s'affichent pas
- Assurez-vous que l'URL de l'image est valide et accessible
- Vérifiez votre connexion internet
- Utilisez des URLs HTTPS si possible

### L'application est lente
- Videz le cache de votre navigateur
- Réduisez le nombre de films (localStorage a une limite)
- Fermez les autres onglets

## 📄 Licence

Ce projet est gratuit et open source. Utilisez-le librement!

## 🤝 Contribution

Les contributions sont bienvenues! Vous pouvez:
- Signaler des bugs
- Proposer des améliorations
- Soumettre des pull requests

## 📧 Support

Pour toute question ou suggestion, ouvrez une issue sur GitHub ou contactez le développeur.

---

**Profitez de votre expérience avec FilmHub! 🍿🎬**
