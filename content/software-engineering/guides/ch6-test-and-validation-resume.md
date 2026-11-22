# Test & Validation

## Définition du test logiciel

Le **test logiciel** est un processus qui consiste à exécuter un programme ou une application afin de vérifier s’il fonctionne correctement et s’il répond aux exigences spécifiées.

Il permet de :

- Détecter les erreurs (bugs)
- Vérifier la conformité aux besoins
- Améliorer la qualité du logiciel
- Réduire les risques de défaillance

## Différence entre vérification et validation

### Vérification

La vérification répond à la question :
**“Est-ce que le logiciel est construit correctement ?”**

- Vérifie la conformité avec les spécifications
- Activité statique (sans exécution du code)
- Exemples : revue de code, inspection, analyse de documents

### Validation

La validation répond à la question :
**“Est-ce que le bon logiciel est construit ?”**

- Vérifie que le logiciel répond aux besoins de l’utilisateur
- Activité dynamique (avec exécution du logiciel)
- Exemples : tests fonctionnels, tests utilisateurs

## Principes du test logiciel

Les principaux principes de test sont :

1. Le test montre la présence de défauts, pas leur absence
2. Le test exhaustif est impossible
3. Tester tôt permet de réduire les coûts
4. Les défauts se regroupent souvent dans certaines zones
5. Les tests doivent évoluer avec le logiciel
6. Les tests dépendent du contexte
7. L’absence d’erreurs ne garantit pas la qualité si le logiciel ne répond pas aux besoins

## Méthodes de test

### Méthodes de test

| Méthode            | Description                                        | Caractéristiques                                                                  |
| ------------------ | -------------------------------------------------- | --------------------------------------------------------------------------------- |
| Test boîte noire   | Basé sur les entrées et sorties du système         | - Sans connaissance du code interne<br>- Test fonctionnel                         |
| Test boîte blanche | Basé sur la structure interne du code              | - Analyse des branches, conditions, boucles<br>- Nécessite l’accès au code source |
| Test boîte grise   | Combinaison des tests boîte noire et boîte blanche | - Connaissance partielle du système                                               |

### Types de tests

| Type de test                      | Description                                                       | Objectif                                                  |
| --------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------- |
| Tests unitaires                   | Testent les plus petites unités du logiciel (fonctions, méthodes) | Vérifier le bon fonctionnement de chaque composant isolé  |
| Tests d’intégration               | Vérifient l’interaction entre plusieurs modules                   | Détecter les problèmes d’interface entre composants       |
| Tests système                     | Testent le système complet                                        | Vérifier la conformité aux exigences globales             |
| Tests de validation (acceptation) | Réalisés par le client ou utilisateur                             | Valider que le système répond aux besoins                 |
| Tests de régression               | Vérifient les fonctionnalités après modifications                 | S’assurer qu’aucune fonctionnalité existante n’est cassée |
| Tests de performance              | Mesurent la rapidité, la stabilité et la charge                   | Évaluer les performances du système                       |
| Tests de sécurité                 | Vérifient la protection contre les attaques et failles            | Garantir la sécurité du système                           |

## Métiers et rôles QA

| Métier                      | Rôles / Responsabilités                                                                                               |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Analyste de test            | Analyse des besoins, rédaction des cas de test, préparation des données, validation fonctionnelle, couverture de test |
| Analyste technique          | Analyse technique, étude des APIs et bases de données, support technique QA, analyse des impacts techniques           |
| Gestionnaire des événements | Supervision des alertes, gestion des incidents, escalade, suivi des SLA, coordination des interventions               |
| Architecte de test          | Définition de la stratégie QA, conception des frameworks de test, choix des outils, architecture d’automatisation     |
| Chef de projet de test      | Pilotage des campagnes de test, gestion d’équipe QA, suivi des risques, reporting, coordination projet                |
| Testeur                     | Exécution des tests, détection des anomalies, déclaration des bugs, validation des corrections, tests de régression   |

## Les anomalies

| Terme                   | Définition                                                                                               |
| ----------------------- | -------------------------------------------------------------------------------------------------------- |
| Bug                     | Erreur ou défaut dans un logiciel provoquant un comportement inattendu ou incorrect.                     |
| Crash applicatif        | Arrêt brutal ou fermeture inattendue d’une application.                                                  |
| Faute de mémoire        | Problème lié à la gestion de la mémoire (mémoire insuffisante, accès invalide, fuite mémoire…).          |
| Vulnérabilité           | Faiblesse de sécurité pouvant être exploitée par un attaquant.                                           |
| Faute de segmentation   | Erreur causée par un accès interdit à une zone mémoire (`Segmentation Fault`).                           |
| Buffer Overflow         | Dépassement de capacité d’un buffer mémoire pouvant écraser des données ou exécuter du code malveillant. |
| Deadlock / Interblocage | Situation où plusieurs processus se bloquent mutuellement et ne peuvent plus continuer.                  |
| Timeout                 | Dépassement du temps maximal d’attente pour une opération ou une réponse système.                        |

## Conclusion

Le test logiciel est une étape essentielle du développement qui permet d’assurer la **qualité**, la **fiabilité** et la **conformité** d’un système informatique à ses exigences.
