# Résolution numérique des équations non-linéaires Resume

## Équipe AN de l’UP-Mathématiques

### Théorème des valeurs intermédiaires (TVI)

Soit $f$ une fonction **continue** sur un intervalle $[a,b]\subset \mathbb{R}$ telle que $f(a)\,f(b)<0$
alors il **existe au moins** un réel $x^\ast \in ]a,b[$ tel que $f(x^\ast)=0$

### La monotonie stricte

Soit $f$ une fonction continue sur un intervalle $[a,b]\subset \mathbb{R}$ telle que $f(a)\,f(b)<0$
Si de plus $f$ est **strictement monotone** sur $[a,b]$, alors il **existe une unique solution**
$x^\ast$ de l’équation $f(x^\ast)=0$

## Méthode de dichotomie

Soit $f : \mathbb{R} \to \mathbb{R}$ une fonction continue et soit
$x^\ast \in [a,b]$ une racine de $f$

La méthode de dichotomie consiste à construire une suite
$(x_n)_{n\in\mathbb{N}}$ qui converge vers $x^\ast$

### Présentation et étapes de la méthode de dichotomie

Basée sur le théorème des valeurs intermédiaires (TVI), la méthode de dichotomie
consiste à chercher la solution d’une manière itérative.

De manière itérative, on construit trois suites
$(a_n)_{n\geq0}$, $(b_n)_{n\geq0}$ et $(x_n)_{n\geq0}$, telles que

$$
\fbox{$
x_n=\frac{a_n+b_n}{2}
$}
$$

En effet, à une étape $n$ donnée:

1. Si $f(x_n)=0,$ alors $x^\ast=x_n$ et le problème est résolu

2. Si $f(x_n)\neq0,$ on détermine le signe de $f(a_n)\,f(x_n)$
   - Si $f(a_n)\,f(x_n)<0,$ alors

     $$
     x^\ast\in]a_n,x_n[
     $$

     Dans ce cas, on considère

     $$
     a_{n+1}=a_n
     \qquad \text{et} \qquad
     b_{n+1}=x_n
     $$

   - Si $f(x_n)\,f(b_n)<0,$ alors

     $$
     x^\ast\in]x_n,b_n[
     $$

     Dans ce cas, on considère

     $$
     a_{n+1}=x_n
     \qquad \text{et} \qquad
     b_{n+1}=b_n
     $$

3. On détermine $x_{n+1}$, le milieu du nouvel intervalle
   $[a_{n+1},b_{n+1}]$, pour l’utiliser dans l’étape $n+1$:

$$
x_{n+1}=\frac{a_{n+1}+b_{n+1}}{2}
$$

### Étude de convergence de la méthode de dichotomie

Soient $f$ une fonction continue sur $[a,b]$, vérifiant $f(a)\,f(b)<0$,
et $x^\ast \in ]a,b[$ l’unique solution de l’équation $f(x)=0$

Si $(x_n)_{n\in\mathbb{N}}$ est la suite générée par l’algorithme de dichotomie, alors on a:

1. La suite $(x_n)_{n\in\mathbb{N}}$ **converge** vers $x^\ast$
2. On a l’estimation suivante:

$$
\fbox{$
|x^\ast-x_n|
\leq
\frac{b-a}{2^{\,n+1}},
\qquad n\geq0
$}
$$

La méthode de dichotomie est convergente puisque:

$$
\lim_{n\to+\infty}|x^\ast-x_n|
\leq
\lim_{n\to+\infty}\frac{b-a}{2^{\,n+1}}
=0
$$

### Test d’arrêt

En pratique, on ne peut pas faire un nombre infini d’itérations alors on utilise un
critère d’arrêt en donnant une valeur de précision (ou de tolérance) $\varepsilon$.

Ce critère d’arrêt consiste à choisir à priori une tolérance $\varepsilon$ et à arrêter le procédé
lorsque

$$
|b_n-a_n| \leq \varepsilon
\Longleftrightarrow
\frac{b-a}{2^n} \leq \varepsilon
$$

$$
$$

Pour atteindre ce critère, il suffit d’avoir \(n\) qui vérifie:

$$
\fbox{$
n
\geq
\log_2\!\left(\frac{b-a}{\varepsilon}\right), \quad \log_2(x) = \frac{\log(x)}{\log(2)}.
$}
$$

## Méthode du point fixe

### Théorème (Existence des points fixes)

Soit $g : I \subset \mathbb{R} \to \mathbb{R}$ une application continue, $I$ est un intervalle stable par $g$ (c.-à-d. $g(I) \subset I$).
Alors $g$ possède au moins un point fixe $x^\ast \in I$ tel que

$$
g(x^\ast)=x^\ast
$$

### Hypothèses sur la fonction g

Soit $g : I = [a,b] \to \mathbb{R}$ une fonction qui vérifie les hypothèses suivantes:

H1) $g$ est dérivable sur $I$  
H2) $g$ prend ses valeurs dans $I$ (c.-à-d. $I$ est stable par $g$)  
H3) $\exists M \in ]0,1[$ tel que : $\forall x \in I,\ |g'(x)| \leq M$

On dit alors que $g$ est une **contraction stricte**.

### Théorème (Existence et unicité)

Si $g$ vérifie les hypothèses (H1), (H2) et (H3), alors il existe une unique racine $c$ de
l’équation $g(x)=x$, appelée **point fixe** de $g$.

### Algorithme et estimation d’erreur

On construit la suite des itérés de la manière suivante:

on fixe un point $x_0$ quelconque de $[a,b]$, puis on définit $x_{n+1} = g(x_n)$.

Si $c$ est le point fixe de $g$, on a :

$$
|x_1 - c| = |g(x_0) - g(c)| \leq M |x_0 - c|
$$

$$
|x_2 - c| = |g(x_1) - g(c)| \leq M |x_1 - c| \leq M^2 |x_0 - c|
$$

$$
\cdots
$$

En réitérant, on voit bien qu’on s’approche de plus en plus de la racine: c’est le
principe des approximations successives.

Plus précisément, on démontre par récurrence la majoration d’erreur:

$$
\forall n \geq 0,\quad |x_n - c| \leq M^n |x_0 - c| \leq M^n |b-a|
$$

En effet, la propriété est évidemment vérifiée pour $n=0$ et si on la suppose vérifiée à
un rang $n-1$ donné, le théorème des accroissements finis implique l’existence d’un
$\xi \in ]a,b[$ tel que :

$$
|x_n - c| = |g(x_{n-1}) - g(c)| \\
\leq |g'(\xi)(x_{n-1} - c)| \\
\leq M |x_{n-1} - c| \\
\leq M \, M^{n-1} |x_0 - c| \\
\leq M^n |x_0 - c| \\
\leq M^n |b-a|
$$

Puisque $M \in ]0,1[$, alors

$$
\lim_{n \to \infty} M^n = 0.
$$

Ainsi, la suite $x_n$ converge vers $c$.

### Test d’arrêt

Fixons $\varepsilon > 0$. Pour que $x_n$ soit une valeur approchée de $c$ à $\varepsilon$ près, il suffit que

$$
M^n |b-a| \leq \varepsilon
$$

c-à-d

$$
\fbox{$
n \geq \frac{\ln \varepsilon - \ln |b-a|}{\ln M}
$}
$$

Donc on va prendre

$$
n_0 = E\!\left(\frac{\ln \varepsilon - \ln |b-a|}{\ln M}\right) + 1
$$

Une valeur approchée à $\varepsilon$ près de la racine $c$ est $x_{n_0}$.

**Remarque:**  
En pratique, il est très intéressant de bien déterminer la constante $M$ qui est le
minimum possible des majorants de $|g'(x)|$. Il s’agit donc de prendre

$$
\fbox{$
M = \max_{x \in [a,b]} |g'(x)|
$}
$$

## Méthode de Newton

### Théorème de convergence global de la méthode de Newton

Soit $f$ une fonction de classe $C^2([a,b],\mathbb{R})$, avec $[a,b]\subset\mathbb{R}$, vérifiant:

1. $f(a)\times f(b)<0 \Rightarrow$ existence d’une racine.
2. $f'(x)\neq 0$, pour tout $x\in[a,b] \Rightarrow f$ est strictement monotone, donc la racine $x^\ast$ est unique.
3. $f''(x)\neq 0$, pour tout $x\in[a,b] \Rightarrow f$ est convexe ou concave.

Alors la suite $(x_n)_{n\geq0}$ définie par :

$$
\begin{cases}
x_0\in[a,b], \quad \text{tel que } f(x_0)\times f''(x_0)>0 \\
x_{n+1}
=
x_n-\dfrac{f(x_n)}{f'(x_n)}
=
x_n-\dfrac{b-a}{f(b)-f(a)}\,f(x_n)
=
g(x_n)
\end{cases}
$$

est convergente vers l’unique racine $x^\ast$ de $f$ ($\lim_{n\to+\infty} x_n = x^\ast$).

### Test d’arrêt

Pour un $\varepsilon > 0$ donné, on peut arrêter le procédé lorsque la condition suivante est vérifiée:

$$
|f(x_n)| < \varepsilon
$$

**Remarque:**  
On peut imposer un nombre maximal $N_{\max}$ d’itérations pour arrêter le procédé.
