# Questions ouvertes pour Nate

- [ ] Moteur des rendus HD : rendu GPU maison ou service tiers ? Délai cible par image ?
- [ ] Lecture du plan : quel fournisseur ou modèle, et quelle précision accepter avant correction manuelle ?
- [ ] Catalogue : quels marchands partenaires et d'où viennent les modèles 3D des meubles ?
- [ ] Prix 39 € TVA comprise ? Procédure exacte du remboursement sous 14 jours ?
- [ ] Langues : français seul en v1, ou néerlandais dès le lancement à Bruxelles ?
- [ ] Édition 3D sur mobile : hors v1 comme proposé, ou nécessaire au lancement ?

## Kit UI (phase 1)

- [ ] Contours des contrôles : le handoff (« Accessibilité ») veut un contour --border-strong, ou un fond --bg-raised, pour les champs, chips et interrupteurs, jamais le filet seul ; Figma dessine pourtant Chip (Default), Input et Switch (inactif) avec le filet. Choix provisoire : Chip garde le filet de Figma et prend --border-strong au survol ; Input prend le fond --bg-raised du champ de l'écran 11 ; Switch inactif passe sur --bg-stone (presque identique au filet en Jour, encore visible en Nuit). On garde ?
- [ ] Badge du Nav item (prop `badge`) : pas dessiné dans Figma. Rendu provisoire : pastille --bg-brand, chiffre en Label Small. À dessiner ?
- [ ] Chip : pas d'état de survol dans Figma. Rendu provisoire : filet --border-strong et texte --text-primary. OK ?

## Coquille, 01 Bienvenue, 02 Tableau de bord (phase 2)

- [ ] Bandeau « rendu prêt » : le PNG de l'écran 02 le montre noir, mais le cadre Figma (27:134) et le handoff utilisent --bg-brand (noyer). Rendu provisoire : noyer. Lequel garder ?
- [ ] Barre latérale « Inspirations » et « Rendus » : aucun écran dédié dans les maquettes. Cibles provisoires : Inspirations → section « Inspirations de la semaine » de /projets ; Rendus → Studio du projet en cours, vue Rendus. Faut-il des pages à part ?
- [ ] Chiffres du résumé : le PNG affiche 31 meubles sélectionnés et 12 pièces gardées ; l'app les calcule depuis les données démo (8 et 3 ; le budget 6 840 € concorde). On garde le calcul ?
- [ ] Salutation de 02 : le PNG dit « Bonjour » avec une date fixe ; l'app met la date du jour et « Bonsoir » à partir de 18 h. OK ?
- [ ] État vide de 02 : pas dessiné. Rendu provisoire : seule la carte « Nouveau projet », 3 inspirations, ni bandeau ni chiffres, et ni recherche ni tri (rien à chercher). À dessiner ?
- [ ] Tailles hors échelle typographique, reprises de Figma telles quelles : salutation 56 px (02), « Bonjour Nate. » 76 px (01), chiffres du résumé 48 px, noms des inspirations en Bodoni italique 22 px. Les ajouter comme styles de texte, ou les ramener aux styles existants (Serif L 72, Stat 64, Serif I M 28) ?
