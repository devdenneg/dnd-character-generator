// PHB 2024 Data exports
export { phb2024Races, getRaceById, getAllRaces } from "./races";
export { phb2024Classes, getClassById, getAllClasses } from "./classes";
export {
  phb2024Backgrounds,
  getBackgroundById,
  getAllBackgrounds,
} from "./backgrounds";
export {
  cantrips,
  level1Spells,
  level2Spells,
  allSpells,
  getSpellsByClass,
  getSpellsByLevel,
  getCantrips,
  getSpellById,
} from "./spells";
export {
  weaponProperties,
  armorProperties,
  conditions,
  combatActions,
  generalTerms,
  allGlossaryEntries,
  getGlossaryEntry,
  getGlossaryByCategory,
  searchGlossary,
} from "./glossary";
export type { GlossaryEntry } from "./glossary";
