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
