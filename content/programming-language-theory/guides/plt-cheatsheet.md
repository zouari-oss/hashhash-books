# PLT Cheatsheet

## Définitions de base

| Concept  | Définition                    |
| -------- | ----------------------------- |
| Alphabet | ensemble fini de symboles (Σ) |
| Mot      | suite finie de symboles (w)   |
| Mot vide | ε                             |
| Longueur | \| w \|                       |
| Σ\*      | ensemble de tous les mots     |
| Langage  | sous-ensemble de Σ\*          |

## Opérations sur les langages

| Opération      | Symbole | Description            |
| -------------- | ------- | ---------------------- |
| Union          | L1 ∪ L2 | mots dans L1 ou L2     |
| Intersection   | L1 ∩ L2 | mots communs           |
| Différence     | L1 − L2 | mots de L1 seulement   |
| Complémentaire | L̅       | mots de Σ\* pas dans L |
| Concaténation  | L1L2    | coller les mots        |
| Puissance      | L^n     | concaténation n fois   |
| Kleene Star    | L\*     | répétition avec ε      |
| Kleene Plus    | L+      | répétition sans ε      |

> Un **langage** est simplement un **sous-ensemble de Σ\***.

## Expressions Régulières (Regex) – Théorie

| Concept             | Notation | Description                        |
| ------------------- | -------- | ---------------------------------- |
| Expression vide     | ∅        | Langage vide                       |
| Mot vide            | ε        | Contient uniquement le mot vide    |
| Symbole             | a ∈ Σ    | Contient uniquement le symbole `a` |
| Union / Alternation | R \| S   | Mots dans R ou S                   |
| Concaténation       | RS       | Mots de R suivis de mots de S      |
| Étoile de Kleene    | R\*      | Zéro ou plusieurs répétitions de R |
| Plus de Kleene      | R+       | Une ou plusieurs répétitions de R  |
| Optionnel           | R?       | Zéro ou une occurrence de R        |
| Intervalle / Classe | [a-b]    | Tous les symboles de `a` à `b`     |
| Négation de classe  | [^a-b]   | Tous les symboles sauf `a` à `b`   |
| Répétition fixe     | R{n}     | Exactement n répétitions de R      |
| Répétition min      | R{n,}    | Au moins n répétitions             |
| Répétition min-max  | R{n,m}   | Entre n et m répétitions           |

### Priorités des opérateurs

| Priorité       | Opérateur / Notation                  | Description                        | Exemple    | Interprétation                      |
| -------------- | ------------------------------------- | ---------------------------------- | ---------- | ----------------------------------- |
| 1 (plus haute) | `( )`                                 | Regroupement                       | `(ab)+`    | répéter le groupe `ab`              |
| 2              | `*`, `+`, `?`, `{n}`, `{n,}`, `{n,m}` | Quantificateurs                    | `a+`       | une ou plusieurs occurrences de `a` |
| 3              | Concaténation                         | éléments placés l’un après l’autre | `ab`       | `a` suivi de `b`                    |
| 4 (plus basse) | `\|`                                  | Union / alternation                | `ab \| cd` | `ab` ou `cd`                        |

> Règle générale: ( ) > quantificateurs (\* + ? { }) > concaténation > |

## Les automates finis

Un automate fini `A = (Q, Σ, δ, q0, F)`

| Symbole | Signification             |
| ------- | ------------------------- |
| Q       | ensemble fini d’états     |
| Σ       | alphabet                  |
| δ       | fonction de transition    |
| q0      | état initial              |
| F       | ensemble des états finaux |

### Résumé transformations

```text
Expressions régulières
        ↓
     Thompson
        ↓
       AFN
        ↓
 subset construction
        ↓
       AFD
        ↓
    minimisation
        ↓
    AFD minimal
```
