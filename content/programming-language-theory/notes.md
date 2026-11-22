# PLT Notes

> PLT: **P**rogramming **L**anguage **T**heory

## Définitions de base

### 1. Alphabet

Un **alphabet** est un **ensemble fini et non vide de symboles**.

Notation :
Σ

Exemples :

- Σ = {a, b}
- Σ = {0, 1}
- Σ = {a, b, c}

### 2. Mot (ou chaîne)

Un **mot** est une **suite finie de symboles de l’alphabet Σ**.

Exemples si Σ = {a, b} :

- a
- ab
- bba
- aaab

#### Mot vide

Le **mot vide** est noté :

ε

Il contient **0 symbole**.

### 3. Longueur d’un mot

La **longueur** d’un mot w est le nombre de symboles qu’il contient.

Notation :

|w|

Exemples :

- w = aba → |w| = 3
- w = b → |w| = 1
- |ε| = 0

### 4. Ensemble des mots Σ\*

Σ\* est **l’ensemble de tous les mots possibles** formés avec les symboles de Σ (y compris ε).

Exemple si Σ = {a, b} :

Σ\* = {ε, a, b, aa, ab, ba, bb, aaa, ...}

### 5. Langage

Un **langage** est **un ensemble de mots sur un alphabet Σ**.

Notation :

L ⊆ Σ\*

Exemple :

L = {a, ab, aab}

Cela signifie que **L est un sous-ensemble de Σ\***.

## Opérations sur les langages

En **théorie des langages formels**, soit :

- Σ : un alphabet
- L, L1, L2 ⊆ Σ\* : des langages

### 1. Union

Ensemble des mots appartenant à **L1 ou L2**.

L1 ∪ L2 = { w | w ∈ L1 ou w ∈ L2 }

### 2. Intersection

Ensemble des mots **communs** aux deux langages.

L1 ∩ L2 = { w | w ∈ L1 et w ∈ L2 }

### 3. Différence

Mots qui sont dans **L1 mais pas dans L2**.

L1 − L2 = { w | w ∈ L1 et w ∉ L2 }

### 4. Complémentaire

Tous les mots de **Σ\*** qui **ne sont pas dans L**.

L̅ = Σ\* − L

### 5. Concaténation

On concatène chaque mot de **L1** avec chaque mot de **L2**.

L1L2 = { xy | x ∈ L1 et y ∈ L2 }

### 6. Puissance d’un langage

L^0 = {ε}

L^1 = L

L^n = L · L · ... · L (n fois)

### 7. Étoile de Kleene

Toutes les répétitions possibles de **L**, y compris **ε**.

L\* = ⋃(n=0 → ∞) L^n

### 8. Plus de Kleene

Toutes les répétitions **sans ε**.

L+ = ⋃(n=1 → ∞) L^n = LL\*

Parfait ! Voici une **section Regex théorique** prête à ajouter à votre cheatsheet Markdown existante :

## Expressions Régulières (Regex) – Théorie

- Tout langage fini (meme le vide, ε) est régulier

### Priorité des opérateurs

1. `*`, `+`, `?` – plus haute priorité
2. Concaténation (RS)
3. Union `|` – plus faible
4. Parenthèses `( )` pour regrouper et changer la priorité

Si r et s sont des ER, alors on peut construire d’autres ER avec les règles suivantes :

| Expression      | Langage associé | Signification                                             |
| --------------- | --------------- | --------------------------------------------------------- |
| `r \| s`        | (L(r) ∪ L(s))   | Union : mots dans **r** ou **s**                          |
| `r.s` (ou `rs`) | (L(r)L(s))      | Concaténation : mot de **r** suivi d’un mot de **s**      |
| `r*`            | (L(r)\*)        | Étoile de Kleene : 0, 1 ou plusieurs répétitions de **r** |

### Exemples Théoriques

| Regex      | Langage généré                    |
| ---------- | --------------------------------- |
| a\*        | {ε, "a", "aa", "aaa", …}          |
| a \| b     | {"a", "b"}                        |
| (ab)\*     | {"", "ab", "abab", "ababab", …}   |
| (a \| b)\* | Tous les mots possibles sur {a,b} |

Voici un **cheat-sheet clair et compact** pour réviser les **automates finis déterministes et non déterministes** en **Langages formels** et **Théorie des automates**.

## Les Automates Finis (AF)

Un **automate fini** est une machine mathématique qui reconnaît un **langage régulier**.

### 1. Définition formelle

Un automate fini est un **quintuplet** :

```
A = (Q, Σ, δ, q0, F)
```

| Symbole | Signification             |
| ------- | ------------------------- |
| Q       | ensemble fini d’états     |
| Σ       | alphabet                  |
| δ       | fonction de transition    |
| q0      | état initial              |
| F       | ensemble des états finaux |

Un mot **w** est accepté si la lecture de **w** mène à un état final.

### 2. Automate Fini Déterministe (AFD)

#### Définition

Dans un **AFD**, pour **chaque état et chaque symbole**, il existe **une seule transition possible**.

#### Fonction de transition

```
δ : Q × Σ → Q
```

#### Propriétés

- Une seule transition possible
- Pas de transitions ε
- Machine entièrement déterminée

#### Exemple

Alphabet :

```
Σ = {a, b}
```

Transitions :

```
δ(q0, a) = q1
δ(q1, b) = q2
```

### 3. Automate Fini Non Déterministe (AFN)

#### Définition

Dans un **AFN**, plusieurs transitions sont possibles pour un même symbole.

#### Fonction de transition

```
δ : Q × Σ → P(Q)
```

P(Q) = ensemble des parties de Q.

Donc :

```
δ(q, a) = {q1, q2}
```

#### Caractéristiques

- Plusieurs transitions possibles
- Possibilité de choix
- Le mot est accepté **si au moins un chemin mène à un état final**

### 4. AFN avec transitions ε

On peut aussi avoir des transitions **sans lire de symbole**.

```
δ : Q × (Σ ∪ {ε}) → P(Q)
```

Exemple :

```
q0 --ε--> q1
```

L’automate change d’état **sans lire de caractère**.

### 5. Équivalence AFN et AFD

Propriété fondamentale :

```
AFN ≡ AFD
```

Tout **AFN** peut être transformé en **AFD**.

Méthode :

```
Construction par sous-ensembles
```

États du nouvel AFD = **ensembles d’états de l’AFN**.

### 6. Lien avec les Expressions Régulières

En **langages formels** :

```
Expressions régulières ⇔ Automates finis
```

Relations :

| Conversion | Méthode                         |
| ---------- | ------------------------------- |
| ER → AFN   | Construction de Thompson        |
| AFN → AFD  | Construction des sous-ensembles |
| AFD → ER   | Élimination d’états             |

### 7. Tableau comparatif

| Propriété           | AFD                                           | AFN                               |
| ------------------- | --------------------------------------------- | --------------------------------- |
| Transitions         | une seule                                     | plusieurs possibles               |
| ε transitions       | non                                           | oui possible                      |
| Fonction δ          | Q × Σ → Q                                     | Q × Σ → P(Q)                      |
| Complexité          | plus simple à exécuter                        | plus simple à construire          |
| Validation des mots | **plus rapide**                               | peut nécessiter plusieurs chemins |
| Implémentation      | **plus volumineuse** (plus d’états possibles) | souvent **plus compacte**         |

### 8. Processus d’acceptation d’un mot

Pour un mot :

```
w = a1 a2 ... an
```

On calcule :

```
δ*(q0, w)
```

Si :

```
δ*(q0, w) ∈ F
```

alors **w est accepté**.

## Table de transitions

Une **table de transitions** représente la fonction de transition **δ** d’un automate sous forme de tableau.

- **Lignes** → états
- **Colonnes** → symboles de l’alphabet
- **Cellule** → état(s) atteint(s)

### 1. Table de transitions d’un AFD

Exemple :

Alphabet

```
Σ = {a, b}
```

États

```
Q = {q0, q1, q2}
```

| État  | a   | b   |
| ----- | --- | --- |
| → q0  | q1  | q0  |
| q1    | q1  | q2  |
| \* q2 | q2  | q2  |

Légende

- **→** : état initial
- **\*** : état final

Exemples de transitions :

```
δ(q0, a) = q1
δ(q1, b) = q2
```

### 2. Table de transitions d’un AFN

Dans un **AFN**, une cellule peut contenir **plusieurs états**.

Alphabet

```
Σ = {a, b}
```

| État  | a       | b    |
| ----- | ------- | ---- |
| → q0  | {q0,q1} | {q0} |
| q1    | ∅       | {q2} |
| \* q2 | ∅       | ∅    |

Exemple :

```
δ(q0,a) = {q0,q1}
```

### 3. Table de transitions avec ε

Si l’automate possède des **ε-transitions**, on ajoute une colonne.

| État  | a    | b    | ε    |
| ----- | ---- | ---- | ---- |
| → q0  | {q1} | ∅    | {q2} |
| q1    | {q1} | {q2} | ∅    |
| \* q2 | ∅    | ∅    | ∅    |

Exemple :

```
δ(q0, ε) = {q2}
```

## Construction d’un AFD à partir d’un AFN avec ε-transitions

### Principe

Chaque **état du nouvel AFD** correspond à **un ensemble d’états de l’AFN**.
Comme il y a des **transitions ε**, il faut calculer **ε-closure** pour inclure tous les états accessibles gratuitement avant de lire un symbole.

### Étape 1 : Calculer les ε-closures

Pour chaque état `q` de l’AFN :

```id="ecl1"
ε-closure(q) = {q} ∪ tous les états atteignables par ε}
```

- L’état initial du DAF = **ε-closure(q0_AFN)**

### Étape 2 : Créer le nouvel état initial

Exemple :

```id="d1f2q3"
q0_DAF = ε-closure(q0_AFN)
```

### Étape 3 : Calculer les transitions

Pour chaque **ensemble d’états T** du DAF et chaque symbole `a ∈ Σ` :

1. Calculer l’ensemble des états atteignables depuis **tous les états de T** avec le symbole `a` :

```id="dmove"
move(T, a) = ⋃ δ(q, a) pour q ∈ T
```

1. Appliquer **ε-closure** sur le résultat :

```id="dclosure"
ε-closure(move(T, a)) → nouvel état du DAF
```

1. Ajouter ce nouvel état au DAF si ce n’est pas déjà créé.

### Étape 4 : Répéter jusqu’à stabilisation

- Répéter l’étape 3 pour **tous les nouveaux états** ajoutés au DAF.
- Terminer lorsque **aucun nouvel état n’apparaît**.

### Étape 5 : Identifier les états finaux

- Un état du DAF est **final** si **il contient au moins un état final de l’AFN**.

### Exemple concret

#### AFN donné

Alphabet : Σ = {a, b}
États : Q = {q0, q1, q2}
État initial : q0
États finaux : F = {q2}

Transitions δ :

| État | a    | b    | ε    |
| ---- | ---- | ---- | ---- |
| q0   | {q0} | {q0} | {q1} |
| q1   | ∅    | {q2} | ∅    |
| q2   | ∅    | ∅    | ∅    |

#### Étape 1 : ε-closures

- ε-closure(q0) = {q0,q1}
- ε-closure(q1) = {q1}
- ε-closure(q2) = {q2}

#### Étape 2 : Nouvel état initial du DAF

```id="stateinit"
q0_DAF = {q0,q1}
```

#### Étape 3 : Calcul des transitions

1. Pour {q0,q1} :

- a → δ(q0,a) ∪ δ(q1,a) = {q0} ∪ ∅ = {q0} → ε-closure({q0}) = {q0,q1}
- b → δ(q0,b) ∪ δ(q1,b) = {q0} ∪ {q2} = {q0,q2} → ε-closure({q0,q2}) = {q0,q1,q2}

1. Pour {q0,q1,q2} :

- a → δ(q0,a) ∪ δ(q1,a) ∪ δ(q2,a) = {q0} ∪ ∅ ∪ ∅ = {q0} → ε-closure({q0}) = {q0,q1}
- b → δ(q0,b) ∪ δ(q1,b) ∪ δ(q2,b) = {q0} ∪ {q2} ∪ ∅ = {q0,q2} → ε-closure({q0,q2}) = {q0,q1,q2}

#### Étape 4 : Identifier les états finaux

- {q0,q1} → non
- {q0,q1,q2} → **final** (contient q2)

#### Étape 5 : Table de transitions du DAF

| État DAF      | a       | b          | Final |
| ------------- | ------- | ---------- | ----- |
| → {q0,q1}     | {q0,q1} | {q0,q1,q2} | non   |
| \* {q0,q1,q2} | {q0,q1} | {q0,q1,q2} | oui   |

> Résultat : l’AFD reconnaît **exactement le même langage** que l’AFN avec ε-transitions.
