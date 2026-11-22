# Flex (Lex) – Compilateur

## Structure d’un fichier Flex

Un fichier `lexer.l` se compose de **3 sections** séparées par `%%` :

```c
%{
/* Code C à inclure, headers, prototypes */
#include <stdio.h>
%}

%%

/* Règles Lex : expressions régulières et actions */
[0-9]+      { printf("NUMBER\n"); }
[a-zA-Z]+   { printf("WORD\n"); }

%%

/* Code C additionnel (fonctions, main, yywrap) */
int yywrap() { return 1; }
```

## Commandes de base

```bash
lex lexer.l        # génère lex.yy.c
flex lexer.l       # alternative moderne à lex
gcc lex.yy.c -o lexer -lfl  # compile
./lexer            # exécute le lexer
```

## Expressions régulières courantes

| Regex | Signification                               |                  |
| ----- | ------------------------------------------- | ---------------- |
| `.`   | n’importe quel caractère                    |                  |
| `*`   | 0 ou plusieurs répétitions                  |                  |
| `+`   | 1 ou plusieurs répétitions                  |                  |
| `?`   | 0 ou 1 occurrence                           |                  |
| `[]`  | classe de caractères `[a-z]`                |                  |
| `()`  | grouper plusieurs caractères                |                  |
| `^`   | début de ligne (ou complément si dans `[]`) |                  |
| `$`   | fin de ligne                                |                  |
| `     | `                                           | alternative (OU) |
| `\n`  | saut de ligne                               |                  |
| `\t`  | tabulation                                  |                  |

## Actions

- Les actions sont **du code C** entre `{ }`.
- `yytext` contient le mot reconnu.
- `yyleng` contient la longueur du mot.

```c
[0-9]+      { printf("Found number: %s\n", yytext); }
[a-z]+      { printf("Found word: %s\n", yytext); }
```

## Fonctions utiles

| Fonction   | Usage                                                   |
| ---------- | ------------------------------------------------------- |
| `yywrap()` | Appelée à la fin de l’entrée. Retourne 1 pour terminer. |
| `yylex()`  | Fonction générée par Flex qui lit le prochain token.    |
| `yytext`   | Mot courant reconnu par Flex.                           |
| `yyleng`   | Longueur de `yytext`.                                   |

## Options Flex

- `%option noyywrap` : pour éviter de définir `yywrap()`.
- `%option case-insensitive` : ignore la casse.
- `%option outfile="nom.c"` : change le fichier généré.

## Exemple complet minimal

```c
%{
#include <stdio.h>
%}

%%

[0-9]+      { printf("NUMBER: %s\n", yytext); }
[a-zA-Z]+   { printf("WORD: %s\n", yytext); }
[ \t\n]+    { /* ignore whitespace */ }

%%

int yywrap() { return 1; }

int main() {
    yylex();
    return 0;
}
```

## Compilation et exécution

```bash
flex lexer.l
gcc lex.yy.c -o lexer -lfl
./lexer < input.txt
```

## Astuces & warnings courants

- **Erreur `fileno`** : inclure `<unistd.h>` dans `%{ ... %}`.
- **Warning `yywrap`** : définir `int yywrap() { return 1; }`.
- Pour ignorer les warnings inutilisés (`input`, `yyunput`) : compiler avec `-w` ou ignorer.
- Toujours utiliser `-lfl` ou `-ll` pour lier la bibliothèque lex/flex.

## Raccourcis Lexiques

| Mot-clé Flex | Signification                         |
| ------------ | ------------------------------------- |
| `%{ ... %}`  | Code C à inclure                      |
| `%%`         | Séparateur de sections                |
| `yytext`     | Chaîne courante reconnue              |
| `yyleng`     | Longueur de `yytext`                  |
| `yylex()`    | Fonction générée pour scanner l’input |
| `yywrap()`   | Fin de fichier / terminaison          |
