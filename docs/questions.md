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
