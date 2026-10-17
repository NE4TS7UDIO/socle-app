# Questions ouvertes pour Nate

Réponses de Nate du 17 octobre 2026 notées après chaque question (→). Les cases vides restent à trancher.

## Produit

- [x] Moteur des rendus HD : rendu GPU maison ou service tiers ? → Service tiers (API de rendu externe).
- [ ] Rendus HD : délai cible par image ? Quel service ?
- [x] Lecture du plan : qu'est-ce qui transforme la photo du plan en pièces et en murs ? → Une API spécialisée dans la reconnaissance de plans ; l'écran 05 sert à corriger.
- [ ] Lecture du plan : quel fournisseur, et quelle précision accepter avant correction manuelle ?
- [x] Catalogue : d'où viennent les meubles et leurs modèles 3D ? → Des flux des marchands partenaires (données produit et modèles 3D).
- [ ] Catalogue : quels marchands partenaires ?
- [x] Prix 39 € TVA comprise ? Remboursement ? → 39 € TVA comprise ; remboursé sur demande dans les 14 jours (lien dans l'e-mail de reçu). Phase 8.
- [x] Langues : français seul en v1, ou néerlandais dès le lancement ? → Français, néerlandais et anglais au lancement. Mise en place en phase 9 : pas de préfixe dans les adresses (/projets), langue du navigateur puis préférence du compte ; Claude rédige le néerlandais et l'anglais à partir du français (ton « tu » : jij, you), Nate ou un natif relit avant le lancement.
- [x] Édition 3D sur mobile : hors v1, ou nécessaire au lancement ? → Hors v1 : sur téléphone, la vue partagée (13) et la consultation seulement.

## Kit UI (phase 1)

- [x] Contours des contrôles (handoff : jamais le filet seul ; Figma : filet sur Chip, Input, Switch inactif) → On garde le compromis : Chip garde le filet et prend --border-strong au survol, Input a le fond --bg-raised, Switch inactif passe sur --bg-stone.
- [x] Badge du Nav item (pas dessiné dans Figma) → On garde la pastille --bg-brand avec le chiffre en Label Small. À reporter dans Figma.
- [x] Chip : état de survol (absent de Figma) → On garde : filet --border-strong et texte --text-primary.

## Coquille, 01 Bienvenue, 02 Tableau de bord (phase 2)

- [x] Bandeau « rendu prêt » : noir (PNG) ou noyer (Figma 27:134, handoff) ? → Noyer (--bg-brand). Le PNG est à mettre à jour.
- [x] Barre latérale « Inspirations » et « Rendus » sans écran dédié → On garde les cibles actuelles (section « Inspirations de la semaine » de /projets ; Studio du projet en cours, vue Rendus) en attendant des pages dédiées.
- [ ] Pages /inspirations et /rendus : à dessiner dans Figma.
- [x] Chiffres du résumé : 31 / 12 (PNG) ou calculés (8 / 3) ? → On garde le calcul depuis les données.
- [x] Salutation de 02 : date fixe et « Bonjour » (PNG) ? → On garde la date du jour et « Bonsoir » de 18 h à 5 h.
- [x] État vide de 02 → Mot d'accueil au-dessus de la carte « Nouveau projet » : « Ton premier projet t’attend. » / « Une photo du plan, deux questions, et ton intérieur prend forme en 3D. » (aperçu : /dev/projets-vide). À reporter dans Figma.
- [x] Tailles hors échelle typographique → Ajoutées comme styles de texte dans globals.css : Serif Welcome 76 (01), Serif Greeting 56 (02), Stat S 48 (résumé), Serif I S 22 (inspirations, italique). À créer aussi dans Figma.

## Assistant 03 → 07 (phase 3)

- [x] 03 « Prendre une photo » → Ouvre l'appareil photo sur téléphone et tablette ; sur ordinateur, le sélecteur de fichiers.
- [x] Messages d'erreur (non dessinés) → Mauvais format : « Ce fichier n’est pas un JPG, un PNG ou un PDF. » ; trop lourd : « Ce fichier fait 32 Mo : la limite est de 25 Mo. » ; plan illisible (retour 03) : « On n’a pas pu lire ce plan. » + un conseil : « La photo est trop sombre : reprends-la à la lumière du jour, sans ombre. » ou « Le plan est de biais : prends-le bien droit, vu du dessus. » ; pièce sans type (05) : sélecteur « Type ? » et « Choisis un type pour chaque pièce. » sous la liste.
- [x] 04 : quel plan montrer après l'import ? → Toujours le plan de démo de l'Appartement 2.3 (le fichier importé n'est pas gardé avant la phase 8).
- [x] Durées simulées → 04 avance après 3,5 s, 07 après 8 s ; les estimations à l'écran (« Environ 20 secondes », « Environ 40 secondes ») restent comme dessinées.
- [x] 05 barre d'outils du plan → Zoom et annuler fonctionnent ; « Déplacer un mur », « Porte » et « Mesurer » sont affichés mais inactifs.
- [ ] 05 outils « Déplacer un mur », « Porte », « Mesurer » : à construire dans une phase ultérieure.
- [x] 05 « Où se lève le soleil ? » → Les étiquettes « Est · lever du soleil » et « Ouest · soirée » échangent leur place sur le plan, avec un léger dégradé de lumière depuis le côté du lever ; le choix sert à la lumière 3D (phase 5).
- [x] Nom du hall (« Hall » sur 05, « Entrée » sur 08) → « Entrée » partout.
- [x] 06 « Je garde » (PNG : lit, table, télé) → Comme les données : lit, télé et bureaux gardés, « Table 8 personnes » affichée non cochée (3 meubles gardés, budget 6 840 €).
- [x] 06 « + Ajouter » → Le chip devient un petit champ ; Entrée ajoute un chip coché, Échap annule (gardé le temps de la session avant la phase 8).
- [x] 06 « Aperçu → » → Photo de l'ambiance en plein écran, thème Nuit, avec nom, matières et palette ; Échap ou clic à côté ferme.
- [x] 07 phrases d'attente → Les trois phrases de Figma (32:280) : « Le canapé face à la lumière du soir… », « Le lit 180 sous la fenêtre de la chambre… », « Deux bureaux assis-debout dans le dressing… ».
- [x] 07 « N meubles placés » (31 sur le PNG) → Compté depuis les données, comme le résumé de 02.
- [x] Studio avant la phase 4 → Page Studio provisoire (rendu fixe, thème Nuit, « Retour aux projets ») pour parcourir tout le flux ; remplacée en phase 4.
- [ ] Styles de texte de l'assistant, repris de Figma et ajoutés à globals.css comme pour la phase 2 : Serif Generation 64 (07), Serif Reading 56 (04), Serif Step 48 (05, 06), Serif I Status 26 italique (07). À créer aussi dans Figma.
- [ ] 05 : les outils inactifs sont affichés en --text-muted, sans l'état choisi que Figma met sur « Déplacer un mur ». Les teintes du plan suivent le PNG (pièce choisie : noyer à 12 % ; terrasses : pierre à 25 %), l'export Figma ne donnant pas ces opacités. OK ?
- [ ] 06 « Aperçu » : fenêtre non dessinée (photo 3:2, nom, matières, palette en grand). À dessiner ?
