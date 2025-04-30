# Guide des commandes Docker et Scripts

Ce document fournit une documentation détaillée sur les scripts disponibles dans le fichier `package.json` pour gérer l'environnement Docker et l'application NestJS.

## Table des matières

- [Commandes Docker](#commandes-docker)
- [Commandes Base de données](#commandes-base-de-données)
- [Commandes de développement](#commandes-de-développement)
- [Commandes NestJS standard](#commandes-nestjs-standard)

## Commandes Docker

### `pnpm docker:up`

**Description**: Démarre tous les conteneurs en mode détaché (background).

**Utilisation**:

```bash
pnpm docker:up
```

**Quand l'utiliser**:

- Au début de votre session de développement
- Après avoir arrêté les conteneurs avec `docker:down`
- Pour démarrer tous les services (API, PostgreSQL, Redis)

---

### `pnpm docker:down`

**Description**: Arrête tous les conteneurs mais conserve les volumes.

**Utilisation**:

```bash
pnpm docker:down
```

**Quand l'utiliser**:

- À la fin de votre session de développement
- Pour libérer des ressources système
- Pour libérer les ports utilisés (3000, 5432, 6379)

---

### `pnpm docker:build`

**Description**: Reconstruit et démarre tous les conteneurs en mode détaché.

**Utilisation**:

```bash
pnpm docker:build
```

**Quand l'utiliser**:

- Après avoir modifié le `Dockerfile`
- Après avoir modifié `docker-compose.yml`
- Après avoir ajouté/modifié des dépendances dans `package.json`

---

### `pnpm docker:logs`

**Description**: Affiche les logs du service API en temps réel.

**Utilisation**:

```bash
pnpm docker:logs
```

**Quand l'utiliser**:

- Pour surveiller le fonctionnement de l'application
- Pour diagnostiquer des problèmes
- Pour voir les outputs de console

**Note**: Utilisez Ctrl+C pour arrêter le suivi des logs.

---

### `pnpm docker:ps`

**Description**: Affiche l'état de tous les conteneurs.

**Utilisation**:

```bash
pnpm docker:ps
```

**Quand l'utiliser**:

- Pour vérifier si tous les conteneurs sont en cours d'exécution
- Pour diagnostiquer des problèmes de démarrage
- Pour voir les ports mappés

---

### `pnpm docker:restart`

**Description**: Redémarre tous les conteneurs.

**Utilisation**:

```bash
pnpm docker:restart
```

**Quand l'utiliser**:

- Après avoir modifié des variables d'environnement
- Si un conteneur est bloqué ou ne répond plus
- Pour recharger une configuration

---

### `pnpm docker:restart:api`

**Description**: Redémarre uniquement le conteneur API.

**Utilisation**:

```bash
pnpm docker:restart:api
```

**Quand l'utiliser**:

- Pour un redémarrage plus rapide uniquement du service API
- Après une modification qui nécessite un redémarrage, mais sans toucher à la base de données

---

### `pnpm docker:clean`

**Description**: Arrête et supprime tous les conteneurs, réseaux, volumes et images non utilisés.

**Utilisation**:

```bash
pnpm docker:clean
```

**Quand l'utiliser**:

- Pour un nettoyage complet (⚠️ supprime les données de la base)
- En cas de problème persistant nécessitant une configuration propre
- Avant une nouvelle installation du projet

**⚠️ ATTENTION**: Cette commande supprime toutes les données persistantes (volumes).

## Commandes Base de données

### `pnpm db:generate <NomMigration>`

**Description**: Génère un fichier de migration TypeORM basé sur les changements détectés dans les entités.

**Utilisation**:

```bash
pnpm db:generate MaNouvelleMigration
```

**Prérequis**:

- TypeORM doit être configuré dans le projet
- `@nestjs/typeorm`, `typeorm` et `pg` doivent être installés

**Quand l'utiliser**:

- Après avoir créé ou modifié des entités
- Pour préparer des modifications structurelles à la base de données

---

### `pnpm db:migrate`

**Description**: Exécute toutes les migrations en attente pour mettre à jour le schéma de la base de données.

**Utilisation**:

```bash
pnpm db:migrate
```

**Quand l'utiliser**:

- Après avoir généré de nouvelles migrations
- Pour appliquer les changements de schéma à la base de données

---

### `pnpm db:revert`

**Description**: Annule la dernière migration appliquée.

**Utilisation**:

```bash
pnpm db:revert
```

**Quand l'utiliser**:

- Pour revenir en arrière après une migration problématique
- Pour annuler des changements de schéma récents

## Commandes de développement

### `pnpm seed`

**Description**: Remplit la base de données avec des données initiales/de test.

**Utilisation**:

```bash
pnpm seed
```

**Prérequis**:

- Le fichier `src/seeds/seed.ts` doit exister et être correctement configuré

**Quand l'utiliser**:

- Pour initialiser la base de données avec des données de test
- Pour restaurer la base de données à un état connu

---

### `pnpm dev`

**Description**: Commande tout-en-un qui construit les conteneurs et affiche les logs.

**Utilisation**:

```bash
pnpm dev
```

**Quand l'utiliser**:

- Pour commencer rapidement le développement
- Pour reconstruire et redémarrer l'environnement complet

## Commandes NestJS standard

Les commandes suivantes sont les commandes standard de NestJS :

- `pnpm build`: Compile l'application
- `pnpm start`: Démarre l'application
- `pnpm start:dev`: Démarre l'application en mode développement (hot-reload)
- `pnpm start:debug`: Démarre l'application en mode debug
- `pnpm start:prod`: Démarre l'application en mode production
- `pnpm lint`: Vérifie et corrige les erreurs de style de code
- `pnpm test`: Exécute les tests unitaires
- `pnpm test:watch`: Exécute les tests en mode watch
- `pnpm test:cov`: Génère un rapport de couverture de tests
- `pnpm test:e2e`: Exécute les tests end-to-end
