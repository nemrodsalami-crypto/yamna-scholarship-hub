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

// ============= Bourses =============
export type BourseStatut = "actif" | "suspendu" | "cloture";

export type Bourse = {
  id: string;
  code: string;
  name: string;
  description: string;
  budgetAnnuel: number;
  budgetConsomme: number;
  nbrBoursiers: number;
  nbrMax: number;
  montantMoyen: number;
  statut: BourseStatut;
  filieres: string[];
  criteres: string[];
  updatedAt: string;
  createdAt: string;
};

export const BOURSES: Bourse[] = [
  { id: "b1", code: "MERIT-EXCELL", name: "Mérite Excellence", description: "Bourse pour étudiants avec mention TB ou Excellent, toutes filières confondues.", budgetAnnuel: 450000000, budgetConsomme: 312000000, nbrBoursiers: 48, nbrMax: 50, montantMoyen: 1350000, statut: "actif", filieres: ["Toutes"], criteres: ["Mention TB/Excellent", "GPA ≥ 16/20"], updatedAt: "Auj. 10:24", createdAt: "Jan. 2020" },
  { id: "b2", code: "INT-EXCELL", name: "International Excellence", description: "Accompagnement des étudiants gabonais dans des établissements étrangers Top 500 mondial.", budgetAnnuel: 680000000, budgetConsomme: 521000000, nbrBoursiers: 62, nbrMax: 70, montantMoyen: 1850000, statut: "actif", filieres: ["Toutes"], criteres: ["Établissement étranger Top 500", "GPA ≥ 14/20"], updatedAt: "Hier 14:30", createdAt: "Jan. 2019" },
  { id: "b3", code: "FIL-PRIOR", name: "Filière prioritaire COMILOG", description: "Mines, géologie, électromécanique et chimie industrielle — cœur de métier Eramet.", budgetAnnuel: 380000000, budgetConsomme: 298000000, nbrBoursiers: 85, nbrMax: 100, montantMoyen: 1100000, statut: "actif", filieres: ["Mines & Géologie", "Électromécanique", "Génie chimique"], criteres: ["Filière mines/géologie/chimie", "GPA ≥ 12/20"], updatedAt: "25 sept.", createdAt: "Mar. 2018" },
  { id: "b4", code: "RENOU", name: "Renouvellement annuel", description: "Bourses renouvelées automatiquement sous conditions de résultats et d'assiduité.", budgetAnnuel: 220000000, budgetConsomme: 88000000, nbrBoursiers: 31, nbrMax: 60, montantMoyen: 1020000, statut: "actif", filieres: ["Toutes"], criteres: ["Bourse antérieure active", "GPA ≥ 12/20", "Assiduité validée"], updatedAt: "22 sept.", createdAt: "Sept. 2021" },
  { id: "b5", code: "SOCIAL", name: "Aide sociale", description: "Soutien aux étudiants en situation économique difficile — commission spéciale.", budgetAnnuel: 120000000, budgetConsomme: 45000000, nbrBoursiers: 14, nbrMax: 20, montantMoyen: 780000, statut: "suspendu", filieres: ["Toutes"], criteres: ["Dossier social validé DRH", "Revenu familial < seuil COMILOG"], updatedAt: "01 sept.", createdAt: "Sept. 2022" },
  { id: "b6", code: "THESE", name: "Thèse de doctorat", description: "Financement des thèses en lien direct avec les activités minières de COMILOG.", budgetAnnuel: 0, budgetConsomme: 0, nbrBoursiers: 0, nbrMax: 5, montantMoyen: 2500000, statut: "cloture", filieres: ["Doctorat"], criteres: ["Inscription en thèse validée", "Lien avec COMILOG/Eramet validé"], updatedAt: "Juil. 2025", createdAt: "Jan. 2023" },
];

// ============= Paiements =============
export type PaiementStatut = "paye" | "en_attente" | "en_retard";

export type Paiement = {
  id: string;
  ref: string;
  etudiant: string;
  etudiantId: string;
  etudiantInitials: string;
  etudiantTone: string;
  bourse: string;
  trimestre: string;
  montant: number;
  methode: string;
  banque: string;
  dateProg: string;
  datePaie?: string;
  statut: PaiementStatut;
  updatedAt: string;
};

export const PAIEMENTS: Paiement[] = [
  { id: "p1", ref: "PAY-2025-0588", etudiant: "Nadia Ondo", etudiantId: "e1", etudiantInitials: "NO", etudiantTone: TONES[0], bourse: "Mérite Excellence", trimestre: "T2 2024-25", montant: 312500, methode: "Virement bancaire", banque: "BGFI Bank", dateProg: "08 déc. 2024", datePaie: "08 déc. 2024", statut: "paye", updatedAt: "08 déc. 2024" },
  { id: "p2", ref: "PAY-2025-0587", etudiant: "Sandrine Bivigou", etudiantId: "e3", etudiantInitials: "SB", etudiantTone: TONES[2], bourse: "International Excellence", trimestre: "T4 2024-25", montant: 462500, methode: "Virement SWIFT", banque: "BNP Paribas FR", dateProg: "05 oct. 2025", statut: "en_attente", updatedAt: "Auj. 09:15" },
  { id: "p3", ref: "PAY-2025-0586", etudiant: "Mireille Andjoua", etudiantId: "e10", etudiantInitials: "MA", etudiantTone: TONES[3], bourse: "International Excellence", trimestre: "T3 2024-25", montant: 550000, methode: "Virement SWIFT", banque: "Société Générale FR", dateProg: "15 sept. 2025", statut: "en_retard", updatedAt: "Hier 11:00" },
  { id: "p4", ref: "PAY-2025-0585", etudiant: "Yann Mavoungou", etudiantId: "e2", etudiantInitials: "YM", etudiantTone: TONES[1], bourse: "Filière prioritaire", trimestre: "T3 2024-25", montant: 275000, methode: "Virement bancaire", banque: "UGB", dateProg: "01 oct. 2025", statut: "en_attente", updatedAt: "Auj. 08:42" },
  { id: "p5", ref: "PAY-2025-0584", etudiant: "Karelle Issembe", etudiantId: "e8", etudiantInitials: "KI", etudiantTone: TONES[1], bourse: "Filière prioritaire", trimestre: "T2 2024-25", montant: 245000, methode: "Virement bancaire", banque: "BGFI Bank", dateProg: "12 déc. 2024", datePaie: "13 déc. 2024", statut: "paye", updatedAt: "13 déc. 2024" },
  { id: "p6", ref: "PAY-2025-0583", etudiant: "Léa Mouele", etudiantId: "e6", etudiantInitials: "LM", etudiantTone: TONES[5], bourse: "International Excellence", trimestre: "T3 2024-25", montant: 487500, methode: "Virement SWIFT", banque: "Crédit Agricole FR", dateProg: "10 oct. 2025", statut: "en_attente", updatedAt: "Hier 16:30" },
  { id: "p7", ref: "PAY-2025-0582", etudiant: "Émile Boundzanga", etudiantId: "e9", etudiantInitials: "EB", etudiantTone: TONES[5], bourse: "Filière prioritaire", trimestre: "T4 2023-24", montant: 355000, methode: "Virement bancaire", banque: "BGFI Bank", dateProg: "05 sept. 2024", datePaie: "05 sept. 2024", statut: "paye", updatedAt: "05 sept. 2024" },
  { id: "p8", ref: "PAY-2025-0579", etudiant: "Aïsha Boukandou", etudiantId: "e5", etudiantInitials: "AB", etudiantTone: TONES[4], bourse: "International Excellence", trimestre: "T2 2023-24", montant: 525000, methode: "Virement SWIFT", banque: "Banque Nationale Canada", dateProg: "01 fév. 2024", statut: "en_retard", updatedAt: "il y a 3 sem." },
  { id: "p9", ref: "PAY-2025-0571", etudiant: "Nadia Ondo", etudiantId: "e1", etudiantInitials: "NO", etudiantTone: TONES[0], bourse: "Mérite Excellence", trimestre: "T1 2024-25", montant: 312500, methode: "Virement bancaire", banque: "BGFI Bank", dateProg: "12 sept. 2024", datePaie: "12 sept. 2024", statut: "paye", updatedAt: "12 sept. 2024" },
  { id: "p10", ref: "PAY-2025-0565", etudiant: "Sandrine Bivigou", etudiantId: "e3", etudiantInitials: "SB", etudiantTone: TONES[2], bourse: "International Excellence", trimestre: "T1 2024-25", montant: 462500, methode: "Virement SWIFT", banque: "BNP Paribas FR", dateProg: "10 sept. 2024", datePaie: "11 sept. 2024", statut: "paye", updatedAt: "11 sept. 2024" },
  { id: "p11", ref: "PAY-2025-0560", etudiant: "Mireille Andjoua", etudiantId: "e10", etudiantInitials: "MA", etudiantTone: TONES[3], bourse: "International Excellence", trimestre: "T2 2024-25", montant: 550000, methode: "Virement SWIFT", banque: "Société Générale FR", dateProg: "05 déc. 2024", datePaie: "06 déc. 2024", statut: "paye", updatedAt: "06 déc. 2024" },
  { id: "p12", ref: "PAY-2025-0555", etudiant: "Léa Mouele", etudiantId: "e6", etudiantInitials: "LM", etudiantTone: TONES[5], bourse: "International Excellence", trimestre: "T2 2024-25", montant: 487500, methode: "Virement SWIFT", banque: "Crédit Agricole FR", dateProg: "08 déc. 2024", datePaie: "09 déc. 2024", statut: "paye", updatedAt: "09 déc. 2024" },
];

// ============= Documents GED =============
export type DocStatut = "valide" | "en_attente" | "rejete";
export type DocCategory = "scolarite" | "identite" | "financier" | "academique" | "rapport";

export type DocGed = {
  id: string;
  name: string;
  ext: string;
  size: string;
  owner: string;
  ownerInitials: string;
  ownerTone: string;
  etudiant?: string;
  category: DocCategory;
  statut: DocStatut;
  date: string;
  tags: string[];
};

export const DOCS_GED: DocGed[] = [
  { id: "d1", name: "Certificat de scolarité 2024-25 — Nadia Ondo", ext: "PDF", size: "142 Ko", owner: "N. Ondo", ownerInitials: "NO", ownerTone: TONES[0], etudiant: "Nadia Ondo", category: "scolarite", statut: "valide", date: "12 sept. 2024", tags: ["INPTIC", "L3"] },
  { id: "d2", name: "Relevés de notes S5 — Nadia Ondo", ext: "PDF", size: "1.2 Mo", owner: "N. Ondo", ownerInitials: "NO", ownerTone: TONES[0], etudiant: "Nadia Ondo", category: "academique", statut: "valide", date: "12 sept. 2024", tags: ["INPTIC"] },
  { id: "d3", name: "RIB BGFI Bank — Nadia Ondo", ext: "PDF", size: "88 Ko", owner: "N. Ondo", ownerInitials: "NO", ownerTone: TONES[0], etudiant: "Nadia Ondo", category: "financier", statut: "valide", date: "12 sept. 2024", tags: [] },
  { id: "d4", name: "Pièce d'identité — Sandrine Bivigou", ext: "PDF", size: "1.8 Mo", owner: "S. Bivigou", ownerInitials: "SB", ownerTone: TONES[2], etudiant: "Sandrine Bivigou", category: "identite", statut: "valide", date: "05 sept. 2024", tags: ["International"] },
  { id: "d5", name: "Attestation d'inscription Polytech Lyon", ext: "PDF", size: "412 Ko", owner: "S. Bivigou", ownerInitials: "SB", ownerTone: TONES[2], etudiant: "Sandrine Bivigou", category: "scolarite", statut: "valide", date: "26 sept. 2024", tags: ["International", "France"] },
  { id: "d6", name: "Relevé de compte BNP Paribas — S. Bivigou", ext: "PDF", size: "220 Ko", owner: "S. Bivigou", ownerInitials: "SB", ownerTone: TONES[2], etudiant: "Sandrine Bivigou", category: "financier", statut: "en_attente", date: "27 sept. 2024", tags: [] },
  { id: "d7", name: "Rapport d'activité Q3 2025", ext: "PDF", size: "3.4 Mo", owner: "Aïcha M.", ownerInitials: "AM", ownerTone: TONES[3], category: "rapport", statut: "valide", date: "27 sept. 2025", tags: ["COMILOG", "Trimestriel"] },
  { id: "d8", name: "Bilan programme 2024-2025", ext: "XLSX", size: "1.1 Mo", owner: "Aïcha M.", ownerInitials: "AM", ownerTone: TONES[3], category: "rapport", statut: "valide", date: "15 sept. 2025", tags: ["Annuel", "COMILOG"] },
  { id: "d9", name: "Justificatif de domicile — Mireille Andjoua", ext: "PDF", size: "520 Ko", owner: "M. Andjoua", ownerInitials: "MA", ownerTone: TONES[3], etudiant: "Mireille Andjoua", category: "identite", statut: "en_attente", date: "24 sept. 2024", tags: ["International"] },
  { id: "d10", name: "Lettre de motivation — Yann Mavoungou", ext: "PDF", size: "210 Ko", owner: "Y. Mavoungou", ownerInitials: "YM", ownerTone: TONES[1], etudiant: "Yann Mavoungou", category: "academique", statut: "valide", date: "10 sept. 2024", tags: ["Mines"] },
  { id: "d11", name: "Contrat de bourse signé — Léa Mouele", ext: "PDF", size: "380 Ko", owner: "Gestionnaire", ownerInitials: "GS", ownerTone: TONES[5], etudiant: "Léa Mouele", category: "financier", statut: "valide", date: "15 sept. 2024", tags: ["International"] },
  { id: "d12", name: "Procès-verbal comité octobre 2025", ext: "PDF", size: "870 Ko", owner: "Comité", ownerInitials: "CO", ownerTone: TONES[0], category: "rapport", statut: "en_attente", date: "01 oct. 2025", tags: ["Comité", "Décision"] },
  { id: "d13", name: "Acte de naissance — Karelle Issembe", ext: "PDF", size: "640 Ko", owner: "K. Issembe", ownerInitials: "KI", ownerTone: TONES[1], etudiant: "Karelle Issembe", category: "identite", statut: "valide", date: "20 sept. 2024", tags: ["Local"] },
  { id: "d14", name: "Relevé de notes M1 — Mireille Andjoua", ext: "PDF", size: "1.5 Mo", owner: "M. Andjoua", ownerInitials: "MA", ownerTone: TONES[3], etudiant: "Mireille Andjoua", category: "academique", statut: "valide", date: "18 sept. 2024", tags: ["Excellence", "Mines Paris"] },
  { id: "d15", name: "Politique de renouvellement 2025-26", ext: "PDF", size: "245 Ko", owner: "Direction COMILOG", ownerInitials: "DC", ownerTone: TONES[4], category: "rapport", statut: "valide", date: "20 sept. 2025", tags: ["Politique", "COMILOG"] },
];

// ============= Messagerie =============
export type MsgPriorite = "normal" | "haute" | "urgent";
export type MsgCategorie = "entrant" | "interne" | "envoi";

export type MsgItem = {
  who: string;
  initials: string;
  tone: string;
  time: string;
  text: string;
};

export type MessageThread = {
  id: string;
  subject: string;
  from: string;
  fromInitials: string;
  fromTone: string;
  preview: string;
  time: string;
  unread: boolean;
  categorie: MsgCategorie;
  priorite: MsgPriorite;
  messages: MsgItem[];
};

export const MSG_THREADS: MessageThread[] = [
  {
    id: "m1", subject: "Dossier de Nadia Ondo — Justificatif complémentaire",
    from: "Olivier B.", fromInitials: "OB", fromTone: TONES[0],
    preview: "Suite à l'examen du dossier, nous avons besoin d'un justificatif de domicile actualisé...",
    time: "il y a 4 min", unread: true, categorie: "entrant", priorite: "haute",
    messages: [
      { who: "Olivier B.", initials: "OB", tone: TONES[0], time: "Auj. 10:20", text: "Bonjour Aïcha, suite à l'examen du dossier de Nadia Ondo, nous avons besoin d'un justificatif de domicile actualisé (moins de 3 mois). Merci de le relancer en priorité avant le comité du 1er octobre." },
      { who: "Aïcha M.", initials: "AM", tone: TONES[3], time: "Auj. 10:24", text: "Bien reçu Olivier. Je contacte directement l'étudiante par email et SMS. Délai estimé : 48h. Je vous tiens informé dès réception." },
    ],
  },
  {
    id: "m2", subject: "Confirmation virement — PAY-2025-0588 BGFI Bank",
    from: "Système automatique", fromInitials: "SY", fromTone: TONES[1],
    preview: "Le virement vers le compte BGFI de Nadia Ondo a été initié pour 312 500 FCFA...",
    time: "il y a 22 min", unread: true, categorie: "interne", priorite: "normal",
    messages: [
      { who: "Système", initials: "SY", tone: TONES[1], time: "Auj. 10:02", text: "Le virement vers le compte BGFI de Nadia Ondo a été initié pour un montant de 312 500 FCFA. Référence : PAY-2025-0588. Confirmation attendue sous 24–48h ouvrées." },
    ],
  },
  {
    id: "m3", subject: "Ordre du jour — Comité de sélection 1er octobre 2025",
    from: "Jean M.", fromInitials: "JM", fromTone: TONES[2],
    preview: "Voici l'ordre du jour de la réunion du comité — 10 candidatures à délibérer...",
    time: "Hier 17:00", unread: true, categorie: "entrant", priorite: "urgent",
    messages: [
      { who: "Jean M.", initials: "JM", tone: TONES[2], time: "Hier 17:00", text: "Ordre du jour du comité du 1er octobre :\n\n• 10 candidatures à délibérer (dont 3 prioritaires)\n• Révision des critères d'éligibilité 2025-26\n• Budget Q4 — seuil d'alerte à 87%\n• Divers\n\nMerci de préparer les dossiers notés ≥ 80." },
      { who: "Aïcha M.", initials: "AM", tone: TONES[3], time: "Hier 17:42", text: "Bien noté Jean. Les 10 dossiers seront disponibles dans l'espace partagé demain matin avant 9h." },
    ],
  },
  {
    id: "m4", subject: "Rapport trimestriel Q3 2025 — Demande de validation DG",
    from: "Marina N.", fromInitials: "MN", fromTone: TONES[5],
    preview: "Rapport Q3 finalisé. Couvre les versements juillet–septembre, candidatures instruites...",
    time: "27 sept.", unread: false, categorie: "interne", priorite: "normal",
    messages: [
      { who: "Marina N.", initials: "MN", tone: TONES[5], time: "27 sept. 14:10", text: "Bonjour Aïcha, le rapport d'activité Q3 2025 est finalisé. Il couvre les versements de juillet à septembre, les candidatures instruites (24) et les décisions du comité de septembre." },
      { who: "Aïcha M.", initials: "AM", tone: TONES[3], time: "27 sept. 15:30", text: "Merci Marina. Je le transmets à la direction COMILOG pour validation avant publication." },
    ],
  },
  {
    id: "m5", subject: "Candidature Mireille Andjoua — Traitement prioritaire recommandé",
    from: "Jean M.", fromInitials: "JM", fromTone: TONES[2],
    preview: "Score 95/100 — dossier exceptionnel. Filière Génie minier à Mines ParisTech...",
    time: "24 sept.", unread: false, categorie: "interne", priorite: "haute",
    messages: [
      { who: "Jean M.", initials: "JM", tone: TONES[2], time: "24 sept. 09:00", text: "Score exceptionnel pour le dossier de Mireille Andjoua (95/100). Filière Génie minier à Mines ParisTech — exactement notre cible stratégique. Je recommande une approbation accélérée en comité d'octobre." },
    ],
  },
  {
    id: "m6", subject: "Mise à jour — Politique de renouvellement des bourses 2025-26",
    from: "Direction COMILOG", fromInitials: "DC", fromTone: TONES[4],
    preview: "Nouvelles conditions de renouvellement pour l'année académique 2025-26 applicables...",
    time: "20 sept.", unread: false, categorie: "entrant", priorite: "normal",
    messages: [
      { who: "Direction COMILOG", initials: "DC", tone: TONES[4], time: "20 sept. 08:00", text: "Nouvelles conditions de renouvellement pour 2025-26 :\n\n• GPA minimum : 12/20 (inchangé)\n• Obligation de rapport semestriel de progression\n• Révision des plafonds par zone géographique\n\nDocument complet disponible dans la GED." },
    ],
  },
  {
    id: "m7", subject: "Budget Q4 — Seuil d'alerte consommation à 87%",
    from: "Système automatique", fromInitials: "SY", fromTone: TONES[1],
    preview: "Le budget annuel 2024-25 a atteint 87% de consommation. Revue recommandée...",
    time: "19 sept.", unread: false, categorie: "interne", priorite: "haute",
    messages: [
      { who: "Système", initials: "SY", tone: TONES[1], time: "19 sept. 00:01", text: "Alerte automatique : le budget annuel du programme YAM'NA 2024-25 a atteint 87% de consommation (2,09 Md / 2,40 Md FCFA). Une revue budgétaire est recommandée avant tout nouveau versement." },
    ],
  },
];

// ============= Utilisateurs =============
export type UserRole = "super_admin" | "gestionnaire" | "referent" | "comite" | "lecture";
export type UserStatut = "actif" | "suspendu" | "invite";

export type Utilisateur = {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: UserRole;
  department: string;
  statut: UserStatut;
  lastLogin: string;
  joinedAt: string;
  avatarTone: string;
  nbrDossiers: number;
};

export const UTILISATEURS: Utilisateur[] = [
  { id: "u1", name: "Aïcha Mbadinga", initials: "AM", email: "a.mbadinga@comilog.com", role: "super_admin", department: "Direction Générale", statut: "actif", lastLogin: "Auj. 10:24", joinedAt: "Jan. 2020", avatarTone: TONES[3], nbrDossiers: 240 },
  { id: "u2", name: "Olivier Bouanga", initials: "OB", email: "o.bouanga@comilog.com", role: "referent", department: "DRH · INPTIC", statut: "actif", lastLogin: "Auj. 09:11", joinedAt: "Mar. 2021", avatarTone: TONES[0], nbrDossiers: 42 },
  { id: "u3", name: "Marina Ndombi", initials: "MN", email: "m.ndombi@comilog.com", role: "gestionnaire", department: "Gestion Programme", statut: "actif", lastLogin: "Hier 17:48", joinedAt: "Sept. 2021", avatarTone: TONES[5], nbrDossiers: 98 },
  { id: "u4", name: "Jean Medza", initials: "JM", email: "j.medza@comilog.com", role: "comite", department: "Comité de sélection", statut: "actif", lastLogin: "Hier 14:02", joinedAt: "Fév. 2022", avatarTone: TONES[2], nbrDossiers: 180 },
  { id: "u5", name: "Rose Ekamba", initials: "RE", email: "r.ekamba@comilog.com", role: "gestionnaire", department: "Gestion Programme", statut: "actif", lastLogin: "27 sept.", joinedAt: "Oct. 2022", avatarTone: TONES[4], nbrDossiers: 67 },
  { id: "u6", name: "Paul Nzengue", initials: "PN", email: "p.nzengue@comilog.com", role: "referent", department: "DRH · USTM", statut: "actif", lastLogin: "25 sept.", joinedAt: "Jan. 2023", avatarTone: TONES[1], nbrDossiers: 28 },
  { id: "u7", name: "Claire Koumba", initials: "CK", email: "c.koumba@comilog.com", role: "comite", department: "Comité de sélection", statut: "suspendu", lastLogin: "12 août", joinedAt: "Mar. 2023", avatarTone: TONES[2], nbrDossiers: 15 },
  { id: "u8", name: "Denis Moubamba", initials: "DM", email: "d.moubamba@eramet.com", role: "lecture", department: "Eramet Group", statut: "invite", lastLogin: "—", joinedAt: "28 sept. 2025", avatarTone: TONES[0], nbrDossiers: 0 },
];

// ============= Etablissements =============
export type EtabType = "universite" | "grande_ecole" | "ecole_superieure" | "iut";

export type Etablissement = {
  id: string;
  name: string;
  short: string;
  type: EtabType;
  city: string;
  country: string;
  nbrBoursiers: number;
  nbrCandidatures: number;
  montantTotal: number;
  statut: "actif" | "suspendu";
  contact: string;
  email: string;
  updatedAt: string;
};

export const ETABLISSEMENTS: Etablissement[] = [
  { id: "etab1", name: "Université des Sciences et Techniques de Masuku", short: "USTM", type: "universite", city: "Franceville", country: "Gabon", nbrBoursiers: 28, nbrCandidatures: 42, montantTotal: 31000000, statut: "actif", contact: "Pr. R. Nkoghe", email: "dg@ustm.ga", updatedAt: "Auj." },
  { id: "etab2", name: "Institut National Polytechnique et de Technologie", short: "INPTIC", type: "grande_ecole", city: "Libreville", country: "Gabon", nbrBoursiers: 22, nbrCandidatures: 35, montantTotal: 24500000, statut: "actif", contact: "Directeur Pédagogique", email: "direction@inptic.ga", updatedAt: "Hier" },
  { id: "etab3", name: "École Nationale Supérieure de Libreville", short: "ENS Lib.", type: "ecole_superieure", city: "Libreville", country: "Gabon", nbrBoursiers: 15, nbrCandidatures: 20, montantTotal: 14000000, statut: "actif", contact: "M. Bekale", email: "direction@ens.ga", updatedAt: "25 sept." },
  { id: "etab4", name: "Université Omar Bongo", short: "UOB", type: "universite", city: "Libreville", country: "Gabon", nbrBoursiers: 12, nbrCandidatures: 18, montantTotal: 11500000, statut: "actif", contact: "Mme Ovono", email: "rectorat@uob.ga", updatedAt: "22 sept." },
  { id: "etab5", name: "Mines Paris — PSL University", short: "Mines Paris", type: "grande_ecole", city: "Paris", country: "France", nbrBoursiers: 8, nbrCandidatures: 10, montantTotal: 18500000, statut: "actif", contact: "Relations Internationales", email: "international@minesparis.psl.eu", updatedAt: "24 sept." },
  { id: "etab6", name: "Institut National des Sciences Appliquées de Toulouse", short: "INSA Toulouse", type: "grande_ecole", city: "Toulouse", country: "France", nbrBoursiers: 9, nbrCandidatures: 12, montantTotal: 17500000, statut: "actif", contact: "Scolarité Internationale", email: "international@insa-toulouse.fr", updatedAt: "20 sept." },
  { id: "etab7", name: "Polytech Lyon — Université Claude Bernard Lyon 1", short: "Polytech Lyon", type: "grande_ecole", city: "Lyon", country: "France", nbrBoursiers: 12, nbrCandidatures: 14, montantTotal: 22000000, statut: "actif", contact: "Mme Girard", email: "rel.int@polytech-lyon.fr", updatedAt: "18 sept." },
  { id: "etab8", name: "Université Laval", short: "Laval", type: "universite", city: "Québec", country: "Canada", nbrBoursiers: 6, nbrCandidatures: 8, montantTotal: 12500000, statut: "actif", contact: "Bureau International", email: "international@ulaval.ca", updatedAt: "15 sept." },
  { id: "etab9", name: "École Nationale d'Ingénieurs de Libreville", short: "ENI", type: "ecole_superieure", city: "Libreville", country: "Gabon", nbrBoursiers: 8, nbrCandidatures: 14, montantTotal: 7400000, statut: "actif", contact: "M. Moanda", email: "contact@eni.ga", updatedAt: "10 sept." },
  { id: "etab10", name: "Institut Supérieur de Technologie de Port-Gentil", short: "IST", type: "iut", city: "Port-Gentil", country: "Gabon", nbrBoursiers: 5, nbrCandidatures: 9, montantTotal: 4500000, statut: "suspendu", contact: "Mme Sassou", email: "contact@ist.ga", updatedAt: "01 sept." },
];
