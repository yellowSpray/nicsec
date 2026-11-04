/**
 * Legal information shown in the footer (VESTIGE content document, section 10.1).
 * Replace the [placeholders] with the real administrative data before launch.
 */
export const LEGAL_INFO = {
  legalName: "[Nom légal de l'entreprise / personne physique]",
  bce: "[numéro]",
  vat: "BE[numéro]",
  address: "[Adresse professionnelle ou mentions autorisées]",
  email: "[adresse]",
  phone: "[numéro]",
  /**
   * Licence number from the FPS Home Affairs.
   * Keep null until the licence is actually granted: the line is then hidden.
   * Never put a fake or temporary number (content document section 11, art. 7 LRP).
   */
  authorizationNumber: null as string | null,
};
