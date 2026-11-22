# Interpolation Polynomiale Resume

## Introduction

Soient $(n + 1)$ points $(x_0, y_0), (x_1, y_1), \cdots, (x_n, y_n)$ d’abscisses deux à deux distinctes.
**L’interpolation polynomiale** de ces points consiste à déterminer un polynôme $P \in \mathbb{R}_n[X]$
tel que

$$
P(x_i) = y_i \quad \forall i \in \{0, \cdots, n\}
$$

Les abscisses $x_i$ $(i \in \{0, \cdots, n\})$ $\longrightarrow$ Les points d’interpolation. $\\$
Les ordonnées $y_i$ $(i \in \{0, \cdots, n\})$ $\longrightarrow$ Les valeurs d’interpolation.

## Méthode d’interpolation de Lagrange

Soient $n + 1$ points de coordonnées $(x_i, y_i)_{0 \le i \le n}$ tels que $x_i \neq x_j,  \quad  \forall  0 \le i,j \le n, \quad i \neq j.$

Il existe un unique polynôme d’interpolation de Lagrange $P_n \in \mathbb{R}_n[X]$ vérifiant

$$
P_n(x_i) = y_i, \quad \forall i \in \{0, \cdots, n\}
$$

Le polynôme $P_n$ s’exprime comme suit:

$$
\fbox{$
P_n(x) = \sum_{i=0}^{n} y_i L_i(x), \quad x \in \mathbb{R}
$}
$$

où

$$
\fbox{$
L_i(x) = \prod_{\substack{j=0 \ j \ne i}}^{n} \frac{x - x_j}{x_i - x_j}
$}
$$

La famille de polynômes de Lagrange $\{L_0, L_1, \cdots, L_n\}$ associés aux points $(x_i, y_i)$, $i \in \{0, \cdots, n\}$, est une base de l’espace vectoriel $\mathbb{R}_n[X]$.

```{.python .numberLines}
from numpy.polynomial import Polynomial

def base_lagrange(X, i):
    L = Polynomial([1]) # Start with 1
    xi = X[i, 0]
    for j in range(len(X)):
        if j == i:
            continue
        xj = X[j, 0]
        L *= Polynomial([-xj / (xi - xj), 1 / (xi - xj)])
    return L

def polynome_lagrange(X, Y):
    P = Polynomial([0]) # Start with 0
    for i in range(len(X)):
        yi = Y[i, 0]
        P += yi * base_lagrange(X, i)
    return P
```

### Inconvénient majeur de la méthode d’interpolation de Lagrange

- Un inconvénient majeur de la méthode d’interpolation par les polynômes de Lagrange réside dans l’ajout d’un nouveau point $(x_{n+1}, y_{n+1})$ à un ensemble de $n$ points d’interpolation.
- Dans ce cas, il n’est pas numériquement simple de déduire $P_{n+1}$ à partir de $P_n$. En effet, **tous les calculs doivent être refaits depuis le début**.
- Pour pallier cette difficulté, on peut utiliser **la méthode d’interpolation de Newton**, qui permet une mise à jour progressive du polynôme.

## Méthode d’interpolation de Newton

Soient $n + 1$ points de coordonnées $(x_i, y_i)_{0 \le i \le n}$ tels que

$$
x_i \neq x_j, \quad \forall\, i,j \in \{0, \cdots, n\},\; i \neq j.
$$

Il existe un unique polynôme d’interpolation de Newton $P_n \in \mathbb{R}_n[X]$ vérifiant

$$
P_n(x_i) = y_i, \quad \forall i \in \{0, \cdots, n\}.
$$

Le polynôme Pn s’exprime comme suit:

$$
\fbox{$
P_n(x) =
\sum_{i=0}^{n} \beta_i \omega_i(x), \quad x \in \mathbb{R}
$}
$$

$$
= \beta_0 \underbrace{1}_{\omega_0}
+ \beta_1 \underbrace{(x - x_0)}_{\omega_1}
+ \beta_2 \underbrace{(x - x_0)(x - x_1)}_{\omega_2}
+ \cdots
+ \beta_n \underbrace{(x - x_0)(x - x_1)\cdots(x - x_{n-1})}_{\omega_n}
$$

où

$$
\fbox{$
\omega_i(x)=\prod_{j=0}^{i-1}(x-x_j),\quad \forall i \in \{1,\ldots,n\}
\quad \text{et} \quad
\omega_0(x)=1
$}
$$

```{.python .numberLines}
from numpy.polynomial import Polynomial

def base_newton(X, i):
    W = Polynomial([1]) # Start with 1
    for j in range(i):
        xj = X[j]
        W *= Polynomial([-xj, 1])  # (x - xj)
    return W

def polynome_newton(X, Y):
    P = Polynomial([0]) # Start with 0
    beta = differences_divisees(X, Y)
    for i in range(len(X)):
        P += beta[i] * base_newton(X, i)
    return P
```

La famille de polynômes de Newton $\{\omega_0, \omega_1, \cdots, \omega_n\}$ associés aux points $(x_i, y_i)$,  
$i \in \{0, \cdots, n\}$, est une base de l’espace vectoriel $\mathbb{R}_n[X]$.

Les coefficients de Newton $\beta_i$ $(i \in \{0, \cdots, n\})$ peuvent être déterminés en utilisant la méthode des différences divisées, qui seront définies ci-dessous, comme suit :

$$
\beta_i = [y_0, \cdots, y_i].
$$

### Détermination des coefficients de Newton

On considère $(n + 1)$ points $(x_i, y_i)_{0 \le i \le n}$ tels que

$$
x_i \neq x_j,\quad \forall\, i,j \in \{0, \cdots, n\},\; i \neq j
$$

1. La différence divisée d’ordre 0 de $x_i$ $(0 \le i \le n)$ est donnée par :

   $$
   [y_i] = y_i
   $$

2. La différence divisée d’ordre 1 de $x_{i-1}$ et $x_i$ $(0 < i \le n)$ est donnée par :

   $$
   [y_{i-1}, y_i] = \frac{y_i - y_{i-1}}{x_i - x_{i-1}}
   $$

3. La différence divisée d’ordre $n$ des $(n+1)$ points est définie par récurrence entre deux différences divisées d’ordre $n$ comme suit:

   $$
   [y_0, y_1, \cdots, y_n] = \frac{[y_1, \cdots, y_n] - [y_0, y_1, \cdots, y_{n-1}]}{x_n - x_0}
   $$

$$
\boxed{
\beta_i =
\frac{[y_1,\ldots,y_i]-[y_0,\ldots,y_{i-1}]}{x_i-x_0} =
[y_0,\ldots,y_i]
\quad \text{: une différence divisée d’ordre } i
}
$$

```{.python .numberLines}
import numpy as np

def differences_divisees(X, Y):
    n = len(X)
    table = np.zeros((n, n))
    table[:, 0] = Y       # First column = Y values
    for j in range(1, n): # Fill the table
        for i in range(j, n):
            numerator = table[i, j-1] - table[i-1, j-1]
            denominator = X[i] - X[i-j]
            table[i, j] = numerator / denominator
    return np.diag(table) # Return diagonal (coefficients)
```

### Avantage de la méthode de Newton

Un des avantages de la méthode de Newton pour l’interpolation des points $(x_i, y_i)_{0 \le i \le n}$ tels que $x_i \neq x_j,\ \forall i,j \in \{0,\ldots,n\},\ i \neq j$ est le suivant:

Si on note par $P_k$ le polynôme d’interpolation tronqué (le polynôme de degré inférieur ou égal à $k$, $0 \le k < n$, qui n’interpole que les points $(x_i, y_i)_{0 \le i \le k}$), exprimé dans la base des polynômes de Newton $\{\omega_0, \cdots, \omega_k\}$, alors:

$$
P_k(x) =
\beta_0 \underbrace{1}_{\omega_0}
+
\beta_1 \underbrace{(x - x_0)}_{\omega_1}
+
\beta_2 \underbrace{(x - x_0)(x - x_1)}_{\omega_2}
+
\cdots
+
\beta_k \underbrace{(x - x_0)(x - x_1)\cdots(x - x_{k-1})}_{\omega_k}
$$

Alors $P_{k+1}$, le polynôme tronqué de degré inférieur ou égal à $k+1$ interpolant les points $(x_i, y_i)_{0 \le i \le k+1}$, s’exprime en fonction de $P_k$ comme suit:

$$
P_{k+1}(x) = P_k(x) + \beta_{k+1}\underbrace{(x - x_0)(x - x_1)\cdots(x - x_k)}_{\omega_{k+1}}
$$

Par conséquent, en considérant un polynôme $P_n$ qui interpole les $(n+1)$ points $(x_i, y_i)_{0 \le i \le n}$, et en ajoutant un autre point $(x_{n+1}, y_{n+1})$, alors le polynôme $P_{n+1}$ interpolant les $n+2$ points peut être déduit de $P_n$ comme suit:

$$
P_{n+1}(x) = P_n(x) + \beta_{n+1} \underbrace{(x - x_0)(x - x_1)\cdots(x - x_n)}_{\omega_{n+1}}
$$

## Estimation de l’erreur d’interpolation

Dans le cas où les points $(x_i, y_i)$, $i \in \{0, \cdots, n\}$ sont définis à partir d’une fonction $f$ (avec $f(x_i) = y_i$), le résultat suivant permet d’estimer l’erreur d’interpolation en un point quelconque.

Soient $x_0 < x_1 < \cdots < x_n$ des nombres réels, $f$ une fonction de classe $C^{n+1}$ sur $[x_0, x_n]$, et $P_n$ le polynôme d’interpolation des points $(x_i, y_i)$, $i \in \{0, \cdots, n\}$ avec $f(x_i) = y_i$.

L’erreur d’interpolation $E_n(x) = |f(x) - P_n(x)|$ en $x \in [x_0, x_n]$ vérifie:

$$
E_n(x) \le \frac{\max\limits_{t \in [x_0, x_n]} \left| f^{(n+1)}(t) \right|}{(n+1)!}
\prod_{i=0}^{n} |x - x_i|
$$
