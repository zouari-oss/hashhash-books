# Gestion de Configuration Logicielle (GCL)

## Services offerts par un GCL

La GCL permet de contrôler et organiser l’évolution d’un logiciel

### Services principaux

- gestion des versions du code
- gestion des modifications
- suivi et traçabilité des changements
- gestion des builds et des livraisons
- travail collaboratif entre développeurs
- archivage et sauvegarde des versions
- audit et vérification des configurations

## Architectures d’un GCL

### Architecture centralisée

Dans cette architecture, un serveur central contient toutes les versions du projet

| Élément               | Description                                                                            |
| --------------------- | -------------------------------------------------------------------------------------- |
| **Avantages**         | • Administration simple <br> • Contrôle centralisé <br> • Sauvegarde unique            |
| **Inconvénients**     | • Dépendance au serveur <br> • Travail hors ligne limité <br> • Risque de panne unique |
| **Exemples d’outils** | • Subversion <br> • CVS                                                                |

### Architecture décentralisée (distribuée)

Chaque développeur possède une copie complète du dépôt

| Élément               | Description                                                                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Avantages**         | • Travail possible hors ligne <br> • Meilleure rapidité <br> • Sécurité renforcée grâce aux copies locales <br> • Collaboration flexible |
| **Inconvénients**     | • Gestion plus complexe <br> • Risque de conflits lors des fusions                                                                       |
| **Exemples d’outils** | • Git <br> • Mercurial                                                                                                                   |

#### Principe de base: la journalisation

Elle permet de

- Suivre l’historique des changements
- Identifier l’auteur d’une modification
- Connaître la date et la raison du changement
- Revenir à une ancienne version si nécessaire

## Principes de base de la gestion des versions

| Concept              | Description                                                                                                      |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Tronc (Trunk)**    | Branche principale du projet contenant la version stable ou principale du développement.                         |
| **Branche (Branch)** | Copie parallèle du projet utilisée pour développer une fonctionnalité ou corriger un bug sans modifier le tronc. |
| **Fusion (Merge)**   | Opération qui consiste à réunir les modifications d’une branche avec une autre.                                  |
| **Tag**              | Étiquette utilisée pour marquer une version importante du projet (exemple : version finale ou release).          |
