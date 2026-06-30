import type { YamnaStatus } from "@/components/yamna/status-badge";

export type Candidature = {
  id: string;
  ref: string;
  name: string;
  initials: string;
  school: string;
  city: string;
  filiere: string;
  niveau: string;
  amount: number; // FCFA
  status: YamnaStatus;
  stage: KanbanStage;
  score: number; // 0-100
  updatedAt: string;
  createdAt: string;
  email: string;
  phone: string;
  avatarTone: string;
  documents: number;
  documentsRequired: number;
  referent: string;
  tags: string[];
};

export type KanbanStage =
  | "recu"
  | "eligible"
  | "instruction"
  | "comite"
  | "decision"
  | "cloture";

export const STAGES: { id: KanbanStage; label: string; description: string; tone: string }[] = [
  { id: "recu", label: "Dossier reçu", description: "Pré-contrôle automatique", tone: "info" },
  { id: "eligible", label: "Éligibilité", description: "Critères COMILOG", tone: "info" },
  { id: "instruction", label: "Instruction", description: "Analyse référent", tone: "gold" },
  { id: "comite", label: "Comité", description: "Délibération mensuelle", tone: "primary" },
  { id: "decision", label: "Décision", description: "Notification candidat", tone: "success" },
  { id: "cloture", label: "Clôturé", description: "Archivé / notifié", tone: "muted" },
];

const TONES = ["from-primary to-info", "from-success to-info", "from-gold to-warning", "from-info to-primary", "from-destructive to-gold", "from-primary to-success"];

export const CANDIDATURES: Candidature[] = [
  { id: "c1", ref: "YAM-2025-0241", name: "Nadia Ondo", initials: "NO", school: "INPTIC", city: "Libreville", filiere: "Génie logiciel", niveau: "Licence 3", amount: 1250000, status: "comite", stage: "comite", score: 87, updatedAt: "Auj. 10:24", createdAt: "12 sept.", email: "n.ondo@gmail.com", phone: "+241 06 12 34 56", avatarTone: TONES[0], documents: 7, documentsRequired: 7, referent: "Olivier B.", tags: ["Mérite", "INPTIC"] },
  { id: "c2", ref: "YAM-2025-0240", name: "Yann Mavoungou", initials: "YM", school: "USTM", city: "Franceville", filiere: "Mines & Géologie", niveau: "Master 1", amount: 1100000, status: "instruction", stage: "instruction", score: 74, updatedAt: "Auj. 09:11", createdAt: "10 sept.", email: "y.mavoungou@ustm.ga", phone: "+241 07 22 11 09", avatarTone: TONES[1], documents: 6, documentsRequired: 7, referent: "Marina N.", tags: ["Filière prioritaire"] },
  { id: "c3", ref: "YAM-2025-0239", name: "Sandrine Bivigou", initials: "SB", school: "Polytech Lyon", city: "Lyon (FR)", filiere: "Génie chimique", niveau: "Master 2", amount: 1850000, status: "accepte", stage: "decision", score: 92, updatedAt: "Hier 17:48", createdAt: "05 sept.", email: "s.bivigou@etu.univ-lyon1.fr", phone: "+33 6 11 22 33 44", avatarTone: TONES[2], documents: 8, documentsRequired: 8, referent: "Jean M.", tags: ["Excellence", "International"] },
  { id: "c4", ref: "YAM-2025-0238", name: "Théo Nguema", initials: "TN", school: "ENS Libreville", city: "Libreville", filiere: "Mathématiques", niveau: "Licence 2", amount: 950000, status: "eligible", stage: "eligible", score: 68, updatedAt: "Hier 14:02", createdAt: "01 sept.", email: "theo.nguema@ens.ga", phone: "+241 06 78 90 12", avatarTone: TONES[3], documents: 5, documentsRequired: 7, referent: "Olivier B.", tags: ["Local"] },
  { id: "c5", ref: "YAM-2025-0237", name: "Aïsha Boukandou", initials: "AB", school: "Université Laval", city: "Québec (CA)", filiere: "Génie minier", niveau: "Master 1", amount: 2100000, status: "refuse", stage: "decision", score: 58, updatedAt: "27 sept.", createdAt: "28 août", email: "a.boukandou@ulaval.ca", phone: "+1 418 555 02 11", avatarTone: TONES[4], documents: 7, documentsRequired: 8, referent: "Marina N.", tags: ["International"] },
  { id: "c6", ref: "YAM-2025-0236", name: "Léa Mouele", initials: "LM", school: "INSA Toulouse", city: "Toulouse (FR)", filiere: "Génie industriel", niveau: "Master 2", amount: 1950000, status: "attente", stage: "comite", score: 81, updatedAt: "27 sept.", createdAt: "26 août", email: "lea.mouele@insa-toulouse.fr", phone: "+33 6 55 44 33 22", avatarTone: TONES[5], documents: 7, documentsRequired: 7, referent: "Jean M.", tags: ["International", "Excellence"] },
  { id: "c7", ref: "YAM-2025-0235", name: "Brice Kombila", initials: "BK", school: "USTM", city: "Franceville", filiere: "Électromécanique", niveau: "Licence 3", amount: 1050000, status: "recu", stage: "recu", score: 0, updatedAt: "26 sept.", createdAt: "26 sept.", email: "b.kombila@ustm.ga", phone: "+241 06 44 55 66", avatarTone: TONES[0], documents: 4, documentsRequired: 7, referent: "—", tags: ["Nouveau"] },
  { id: "c8", ref: "YAM-2025-0234", name: "Karelle Issembe", initials: "KI", school: "UOB", city: "Libreville", filiere: "Droit minier", niveau: "Master 1", amount: 980000, status: "instruction", stage: "instruction", score: 71, updatedAt: "25 sept.", createdAt: "20 sept.", email: "k.issembe@uob.ga", phone: "+241 07 88 99 00", avatarTone: TONES[1], documents: 7, documentsRequired: 7, referent: "Olivier B.", tags: ["Local"] },
  { id: "c9", ref: "YAM-2025-0233", name: "Patrick Ovono", initials: "PO", school: "ENI", city: "Libreville", filiere: "Réseaux", niveau: "Licence 3", amount: 920000, status: "eligible", stage: "eligible", score: 64, updatedAt: "25 sept.", createdAt: "20 sept.", email: "p.ovono@eni.ga", phone: "+241 06 33 44 55", avatarTone: TONES[2], documents: 6, documentsRequired: 7, referent: "Marina N.", tags: ["Local"] },
  { id: "c10", ref: "YAM-2025-0232", name: "Mireille Andjoua", initials: "MA", school: "Mines ParisTech", city: "Paris (FR)", filiere: "Génie minier", niveau: "Master 2", amount: 2200000, status: "comite", stage: "comite", score: 95, updatedAt: "24 sept.", createdAt: "18 sept.", email: "m.andjoua@minesparis.psl.eu", phone: "+33 6 77 88 99 11", avatarTone: TONES[3], documents: 8, documentsRequired: 8, referent: "Jean M.", tags: ["Excellence", "International", "Prioritaire"] },
  { id: "c11", ref: "YAM-2025-0231", name: "Stéphane Loubaki", initials: "SL", school: "INPTIC", city: "Libreville", filiere: "Cybersécurité", niveau: "Master 1", amount: 1180000, status: "recu", stage: "recu", score: 0, updatedAt: "24 sept.", createdAt: "24 sept.", email: "s.loubaki@inptic.ga", phone: "+241 06 11 22 33", avatarTone: TONES[4], documents: 3, documentsRequired: 7, referent: "—", tags: ["Nouveau"] },
  { id: "c12", ref: "YAM-2025-0230", name: "Émile Boundzanga", initials: "EB", school: "USTM", city: "Franceville", filiere: "Géologie", niveau: "Master 2", amount: 1420000, status: "accepte", stage: "cloture", score: 88, updatedAt: "22 sept.", createdAt: "15 août", email: "e.boundzanga@ustm.ga", phone: "+241 07 55 66 77", avatarTone: TONES[5], documents: 8, documentsRequired: 8, referent: "Olivier B.", tags: ["Filière prioritaire"] },
];

export function fmtFcfa(n: number) {
  return new Intl.NumberFormat("fr-FR").format(n) + " FCFA";
}

export function getCandidature(id: string) {
  return CANDIDATURES.find((c) => c.id === id);
}

// ============= Étudiants =============

export type EtudiantStatut = "boursier" | "candidat" | "alumni" | "suspendu";

export type Etudiant = {
  id: string;
  matricule: string;
  name: string;
  initials: string;
  avatarTone: string;
  email: string;
  phone: string;
  birth: string;
  birthCity: string;
  gender: "F" | "M";
  school: string;
  city: string;
  country: string;
  filiere: string;
  niveau: string;
  promo: string;
  gpa: number;
  status: EtudiantStatut;
  bourseType?: string;
  montantAnnuel?: number;
  versementsRecus: number;
  versementsTotal: number;
  documents: number;
  documentsRequired: number;
  referent: string;
  tags: string[];
  lastActivity: string;
  joinedAt: string;
};

export const ETUDIANTS: Etudiant[] = [
  { id: "e1", matricule: "STD-0241", name: "Nadia Ondo", initials: "NO", avatarTone: TONES[0], email: "n.ondo@gmail.com", phone: "+241 06 12 34 56", birth: "14 mars 2002", birthCity: "Libreville", gender: "F", school: "INPTIC", city: "Libreville", country: "Gabon", filiere: "Génie logiciel", niveau: "Licence 3", promo: "2024–2025", gpa: 16.4, status: "boursier", bourseType: "Mérite Excellence", montantAnnuel: 1250000, versementsRecus: 2, versementsTotal: 4, documents: 7, documentsRequired: 7, referent: "Olivier B.", tags: ["Mérite", "Tech"], lastActivity: "il y a 2 h", joinedAt: "Sept. 2023" },
  { id: "e2", matricule: "STD-0240", name: "Yann Mavoungou", initials: "YM", avatarTone: TONES[1], email: "y.mavoungou@ustm.ga", phone: "+241 07 22 11 09", birth: "02 janv. 2001", birthCity: "Franceville", gender: "M", school: "USTM", city: "Franceville", country: "Gabon", filiere: "Mines & Géologie", niveau: "Master 1", promo: "2024–2025", gpa: 14.8, status: "boursier", bourseType: "Filière prioritaire", montantAnnuel: 1100000, versementsRecus: 3, versementsTotal: 4, documents: 6, documentsRequired: 7, referent: "Marina N.", tags: ["Mines"], lastActivity: "Hier", joinedAt: "Sept. 2022" },
  { id: "e3", matricule: "STD-0239", name: "Sandrine Bivigou", initials: "SB", avatarTone: TONES[2], email: "s.bivigou@etu.univ-lyon1.fr", phone: "+33 6 11 22 33 44", birth: "20 août 2000", birthCity: "Port-Gentil", gender: "F", school: "Polytech Lyon", city: "Lyon", country: "France", filiere: "Génie chimique", niveau: "Master 2", promo: "2024–2025", gpa: 17.1, status: "boursier", bourseType: "International Excellence", montantAnnuel: 1850000, versementsRecus: 4, versementsTotal: 4, documents: 8, documentsRequired: 8, referent: "Jean M.", tags: ["International", "Excellence"], lastActivity: "il y a 5 j", joinedAt: "Sept. 2021" },
  { id: "e4", matricule: "STD-0238", name: "Théo Nguema", initials: "TN", avatarTone: TONES[3], email: "theo.nguema@ens.ga", phone: "+241 06 78 90 12", birth: "11 mai 2003", birthCity: "Oyem", gender: "M", school: "ENS Libreville", city: "Libreville", country: "Gabon", filiere: "Mathématiques", niveau: "Licence 2", promo: "2024–2025", gpa: 13.6, status: "candidat", versementsRecus: 0, versementsTotal: 0, documents: 5, documentsRequired: 7, referent: "Olivier B.", tags: ["Local"], lastActivity: "il y a 1 j", joinedAt: "Sept. 2024" },
  { id: "e5", matricule: "STD-0237", name: "Aïsha Boukandou", initials: "AB", avatarTone: TONES[4], email: "a.boukandou@ulaval.ca", phone: "+1 418 555 02 11", birth: "30 nov. 1999", birthCity: "Libreville", gender: "F", school: "Université Laval", city: "Québec", country: "Canada", filiere: "Génie minier", niveau: "Master 1", promo: "2023–2024", gpa: 12.4, status: "suspendu", bourseType: "International", montantAnnuel: 2100000, versementsRecus: 2, versementsTotal: 4, documents: 7, documentsRequired: 8, referent: "Marina N.", tags: ["International", "Alerte"], lastActivity: "il y a 3 sem.", joinedAt: "Sept. 2022" },
  { id: "e6", matricule: "STD-0236", name: "Léa Mouele", initials: "LM", avatarTone: TONES[5], email: "lea.mouele@insa-toulouse.fr", phone: "+33 6 55 44 33 22", birth: "07 févr. 2000", birthCity: "Libreville", gender: "F", school: "INSA Toulouse", city: "Toulouse", country: "France", filiere: "Génie industriel", niveau: "Master 2", promo: "2024–2025", gpa: 15.9, status: "boursier", bourseType: "International Excellence", montantAnnuel: 1950000, versementsRecus: 3, versementsTotal: 4, documents: 7, documentsRequired: 7, referent: "Jean M.", tags: ["International", "Excellence"], lastActivity: "il y a 4 h", joinedAt: "Sept. 2022" },
  { id: "e7", matricule: "STD-0235", name: "Brice Kombila", initials: "BK", avatarTone: TONES[0], email: "b.kombila@ustm.ga", phone: "+241 06 44 55 66", birth: "19 juil. 2002", birthCity: "Mouila", gender: "M", school: "USTM", city: "Franceville", country: "Gabon", filiere: "Électromécanique", niveau: "Licence 3", promo: "2024–2025", gpa: 13.2, status: "candidat", versementsRecus: 0, versementsTotal: 0, documents: 4, documentsRequired: 7, referent: "—", tags: ["Nouveau"], lastActivity: "il y a 4 j", joinedAt: "Sept. 2024" },
  { id: "e8", matricule: "STD-0234", name: "Karelle Issembe", initials: "KI", avatarTone: TONES[1], email: "k.issembe@uob.ga", phone: "+241 07 88 99 00", birth: "25 déc. 2001", birthCity: "Libreville", gender: "F", school: "UOB", city: "Libreville", country: "Gabon", filiere: "Droit minier", niveau: "Master 1", promo: "2024–2025", gpa: 14.5, status: "boursier", bourseType: "Filière prioritaire", montantAnnuel: 980000, versementsRecus: 2, versementsTotal: 4, documents: 7, documentsRequired: 7, referent: "Olivier B.", tags: ["Local", "Droit"], lastActivity: "il y a 1 j", joinedAt: "Sept. 2023" },
  { id: "e9", matricule: "STD-0210", name: "Émile Boundzanga", initials: "EB", avatarTone: TONES[5], email: "e.boundzanga@ustm.ga", phone: "+241 07 55 66 77", birth: "12 oct. 1998", birthCity: "Lambaréné", gender: "M", school: "USTM", city: "Franceville", country: "Gabon", filiere: "Géologie", niveau: "Diplômé", promo: "2023–2024", gpa: 15.2, status: "alumni", bourseType: "Filière prioritaire", montantAnnuel: 1420000, versementsRecus: 4, versementsTotal: 4, documents: 8, documentsRequired: 8, referent: "Olivier B.", tags: ["Alumni", "Mines"], lastActivity: "il y a 2 mois", joinedAt: "Sept. 2020" },
  { id: "e10", matricule: "STD-0232", name: "Mireille Andjoua", initials: "MA", avatarTone: TONES[3], email: "m.andjoua@minesparis.psl.eu", phone: "+33 6 77 88 99 11", birth: "08 avr. 2000", birthCity: "Libreville", gender: "F", school: "Mines ParisTech", city: "Paris", country: "France", filiere: "Génie minier", niveau: "Master 2", promo: "2024–2025", gpa: 17.6, status: "boursier", bourseType: "International Excellence", montantAnnuel: 2200000, versementsRecus: 3, versementsTotal: 4, documents: 8, documentsRequired: 8, referent: "Jean M.", tags: ["Excellence", "International", "Prioritaire"], lastActivity: "il y a 1 h", joinedAt: "Sept. 2021" },
];

export function getEtudiant(id: string) {
  return ETUDIANTS.find((e) => e.id === id);
}
