import type { Character, CharacterStats, Spell } from "@/types/character";
import type { AbilityName } from "@/types/character";
import { getSkillNameRu, getAbilityNameRu } from "@/data/translations/ru";
import { getFeatByName } from "@/data/phb2024/feats";

function formatMod(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

// Полные названия характеристик
const ABILITY_FULL_NAMES: Record<string, string> = {
  strength: "СИЛ",
  dexterity: "ЛОВ",
  constitution: "ТЕЛ",
  intelligence: "ИНТ",
  wisdom: "МУД",
  charisma: "ХАР",
};

// Типы урона на русском
const DAMAGE_TYPES_RU: Record<string, string> = {
  slashing: "рубящий",
  piercing: "колющий",
  bludgeoning: "дробящий",
  fire: "огонь",
  cold: "холод",
  lightning: "электричество",
  thunder: "звук",
  poison: "яд",
  acid: "кислота",
  necrotic: "некротический",
  radiant: "излучение",
  force: "силовое поле",
  psychic: "психический",
};

// Компактная карточка заклинания
function generateCompactSpellCard(spell: Spell): string {
  const levelText = spell.level === 0 ? "Заговор" : `${spell.level} круг`;
  return `
    <div class="spell-card">
      <div class="spell-header">
        <span class="spell-name">${spell.nameRu}</span>
        <span class="spell-level">${levelText}</span>
      </div>
      <div class="spell-meta">
        <span>⏱ ${spell.castingTime}</span>
        <span>📏 ${spell.range}</span>
        <span>⏳ ${spell.duration}</span>
      </div>
      <div class="spell-components">📦 ${spell.components}</div>
      <div class="spell-desc">${spell.description}</div>
    </div>
  `;
}

export function generateCharacterPDF(
  character: Character,
  stats: CharacterStats,
): void {
  const ABILITIES: AbilityName[] = [
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "wisdom",
    "charisma",
  ];

  // Собираем снаряжение
  const weapons = character.equipment.filter(
    (e) => e.category === "weapon" && e.damage,
  );
  const armor = character.equipment.filter((e) => e.category === "armor");
  const gear = character.equipment.filter(
    (e) => e.category === "gear" || e.category === "pack",
  );

  // Черта от предыстории
  const feat = character.background?.originFeat
    ? getFeatByName(character.background.originFeat)
    : null;

  // Все заклинания
  const hasSpells =
    character.cantripsKnown.length > 0 || character.spellsKnown.length > 0;

  // Собираем всё снаряжение текстом
  const allEquipment: string[] = [];
  if (character.background?.equipment) {
    allEquipment.push(...character.background.equipment);
  }
  gear.forEach((g) => allEquipment.push(g.nameRu));
  weapons.forEach((w) => allEquipment.push(w.nameRu));
  armor.forEach((a) => allEquipment.push(a.nameRu));

  // Особенности класса 1 уровня
  const classFeatures =
    character.class?.features.filter((f) => f.level <= character.level) || [];

  // HTML для PDF
  const html = `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>${character.name || "Персонаж"} - D&D 2024</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
    
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    @page { size: A4; margin: 6mm; }
    
    body {
      font-family: 'Plus Jakarta Sans', Arial, sans-serif;
      font-size: 7pt;
      line-height: 1.25;
      color: #1a1a1a;
      background: white;
    }
    
    .page {
      width: 100%;
      min-height: 280mm;
      padding: 3px;
      page-break-after: always;
    }
    
    .page:last-child { page-break-after: auto; }
    
    /* === ШАПКА === */
    .header {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      color: white;
      padding: 6px 10px;
      border-radius: 6px;
      margin-bottom: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .header-left h1 {
      font-size: 14pt;
      font-weight: 700;
      margin-bottom: 1px;
    }
    
    .header-subtitle { font-size: 7pt; opacity: 0.9; }
    
    .header-stats {
      display: flex;
      gap: 6px;
    }
    
    .stat-box {
      text-align: center;
      background: rgba(255,255,255,0.15);
      border-radius: 4px;
      padding: 3px 6px;
      min-width: 45px;
    }
    
    .stat-box .value { font-size: 12pt; font-weight: bold; display: block; }
    .stat-box .label { font-size: 5pt; text-transform: uppercase; opacity: 0.8; }
    
    /* === ОСНОВНОЙ ГРИД === */
    .main-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px;
    }
    
    .full-width {
      grid-column: 1 / -1;
    }
    
    .section {
      background: #fafafa;
      border-radius: 4px;
      padding: 4px;
      border: 1px solid #e5e5e5;
    }
    
    .section-title {
      font-size: 7pt;
      font-weight: 700;
      color: #4f46e5;
      margin-bottom: 3px;
      padding-bottom: 1px;
      border-bottom: 1px solid #a5b4fc;
      text-transform: uppercase;
    }
    
    /* === ХАРАКТЕРИСТИКИ === */
    .abilities-row {
      display: flex;
      gap: 3px;
      justify-content: space-between;
    }
    
    .ability-block {
      text-align: center;
      background: linear-gradient(to bottom, #eef2ff, #e0e7ff);
      border: 1px solid #a5b4fc;
      border-radius: 4px;
      padding: 3px 4px;
      flex: 1;
    }
    
    .ability-name { font-size: 6pt; font-weight: 700; color: #4338ca; }
    .ability-mod { font-size: 12pt; font-weight: bold; color: #1e1b4b; }
    .ability-score { font-size: 6pt; color: #6366f1; }
    .ability-save { font-size: 5pt; color: #64748b; }
    .ability-save.proficient { color: #059669; font-weight: bold; }
    
    /* === НАВЫКИ === */
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1px;
      font-size: 6pt;
    }
    
    .skill-item {
      display: flex;
      justify-content: space-between;
      padding: 1px 2px;
      border-radius: 2px;
    }
    
    .skill-item.proficient { background: #dcfce7; font-weight: 600; }
    .skill-bonus { color: #4f46e5; font-weight: bold; }
    
    /* === ОРУЖИЕ === */
    .weapons-grid {
      display: grid;
      gap: 2px;
    }
    
    .weapon-card {
      background: white;
      border: 1px solid #e5e5e5;
      border-radius: 3px;
      padding: 2px 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .weapon-name { font-weight: 600; font-size: 7pt; }
    .weapon-details { font-size: 6pt; color: #64748b; }
    .weapon-attack {
      background: #ef4444;
      color: white;
      padding: 1px 4px;
      border-radius: 8px;
      font-size: 6pt;
      font-weight: bold;
    }
    .weapon-damage { font-size: 8pt; font-weight: bold; }
    
    /* === КОШЕЛЁК === */
    .wallet-row {
      display: flex;
      justify-content: space-between;
      gap: 2px;
    }
    
    .wallet-item {
      flex: 1;
      text-align: center;
      padding: 2px;
      border-radius: 3px;
      font-size: 6pt;
    }
    
    .wallet-item.pp { background: #e5e7eb; }
    .wallet-item.gp { background: #fef08a; }
    .wallet-item.ep { background: #dbeafe; }
    .wallet-item.sp { background: #f3f4f6; }
    .wallet-item.cp { background: #fed7aa; }
    
    .wallet-value { font-size: 9pt; font-weight: bold; }
    .wallet-label { font-size: 5pt; color: #57534e; }
    
    /* === ЧЕРТА === */
    .feat-box {
      background: linear-gradient(to right, #fef3c7, #fde68a);
      border: 1px solid #fbbf24;
      border-radius: 4px;
      padding: 4px;
    }
    
    .feat-title { font-weight: 700; color: #92400e; font-size: 7pt; margin-bottom: 1px; }
    .feat-desc { font-size: 6pt; color: #78716c; margin-bottom: 2px; }
    .feat-benefits { font-size: 6pt; padding-left: 10px; }
    .feat-benefits li { margin-bottom: 1px; }
    
    /* === ОСОБЕННОСТИ === */
    .traits-list { font-size: 6pt; }
    .trait-item { margin-bottom: 2px; }
    .trait-name { font-weight: 600; color: #4f46e5; }
    .trait-desc { color: #57534e; }
    
    /* === СНАРЯЖЕНИЕ === */
    .equipment-text { font-size: 6pt; color: #57534e; line-height: 1.3; }
    
    /* === ОСОБЕННОСТИ КЛАССА === */
    .feature-item {
      margin-bottom: 3px;
      padding: 2px 4px;
      background: #f8fafc;
      border-radius: 3px;
      border-left: 2px solid #4f46e5;
    }
    .feature-name { font-weight: 600; color: #1e1b4b; font-size: 6.5pt; }
    .feature-desc { font-size: 6pt; color: #475569; margin-top: 1px; }
    
    /* === ЛИЧНОСТЬ === */
    .personality-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3px;
    }
    .personality-item {
      background: #f0fdf4;
      border: 1px solid #86efac;
      border-radius: 3px;
      padding: 3px;
    }
    .personality-label { font-size: 5pt; color: #166534; font-weight: 600; text-transform: uppercase; }
    .personality-text { font-size: 6pt; color: #15803d; font-style: italic; margin-top: 1px; }
    
    /* === ИНФО БЛОКИ === */
    .info-row {
      display: flex;
      gap: 3px;
      margin-top: 3px;
    }
    
    .info-box {
      flex: 1;
      background: #f5f5f5;
      border-radius: 3px;
      padding: 2px;
      text-align: center;
    }
    
    .info-label { font-size: 5pt; color: #78716c; text-transform: uppercase; }
    .info-value { font-size: 9pt; font-weight: bold; }
    
    /* === ДОСПЕХИ === */
    .armor-info {
      background: #dbeafe;
      border: 1px solid #3b82f6;
      border-radius: 3px;
      padding: 2px 4px;
      font-size: 6pt;
    }
    
    /* Владения */
    .proficiencies-text { font-size: 6pt; color: #57534e; margin-top: 2px; }
    
    /* === СТРАНИЦА 2: ЗАКЛИНАНИЯ === */
    .spells-header {
      background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      margin-bottom: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .spells-header h2 { font-size: 12pt; }
    
    .spellcasting-stats {
      display: flex;
      gap: 12px;
      font-size: 7pt;
    }
    
    .spell-stat { text-align: center; }
    .spell-stat .label { font-size: 5pt; opacity: 0.8; }
    .spell-stat .value { font-size: 10pt; font-weight: bold; }
    
    /* Ячейки заклинаний */
    .spell-slots-row {
      display: flex;
      gap: 3px;
      margin-bottom: 4px;
      justify-content: center;
    }
    
    .slot-box {
      text-align: center;
      padding: 2px 4px;
      border-radius: 3px;
      background: #f3e8ff;
      border: 1px solid #c4b5fd;
      min-width: 38px;
    }
    
    .slot-box.empty { background: #f5f5f4; border-color: #d6d3d1; opacity: 0.5; }
    .slot-level { font-size: 5pt; color: #7c3aed; }
    .slot-count { font-size: 9pt; font-weight: bold; color: #5b21b6; }
    .slot-box.empty .slot-count { color: #a8a29e; }
    
    /* Карточки заклинаний */
    .spells-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 3px;
    }
    
    .spell-card {
      background: white;
      border: 1px solid #c4b5fd;
      border-radius: 3px;
      padding: 3px 4px;
      font-size: 6pt;
    }
    
    .spell-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1px;
    }
    
    .spell-name { font-weight: 700; color: #5b21b6; font-size: 7pt; }
    .spell-level { font-size: 5pt; color: #7c3aed; background: #f3e8ff; padding: 1px 3px; border-radius: 2px; }
    
    .spell-meta {
      display: flex;
      gap: 4px;
      color: #6b7280;
      font-size: 5pt;
      margin-bottom: 1px;
    }
    
    .spell-components { font-size: 5pt; color: #9ca3af; margin-bottom: 1px; }
    
    .spell-desc {
      font-size: 5.5pt;
      color: #374151;
      line-height: 1.2;
      border-left: 2px solid #a855f7;
      padding-left: 3px;
      background: #faf5ff;
      padding: 2px 3px;
      border-radius: 2px;
    }
    
    .cantrips-section, .spells-section { margin-bottom: 4px; }
    
    .spells-section-title {
      font-size: 8pt;
      font-weight: 700;
      color: #7c3aed;
      margin-bottom: 3px;
      padding-bottom: 1px;
      border-bottom: 1px solid #d8b4fe;
    }
    
    /* Футер */
    .footer {
      text-align: center;
      font-size: 5pt;
      color: #a8a29e;
      margin-top: 3px;
    }
    
    /* Описание предыстории */
    .background-desc {
      font-size: 6pt;
      color: #64748b;
      background: #f8fafc;
      padding: 3px;
      border-radius: 3px;
      margin-bottom: 3px;
      border-left: 2px solid #94a3b8;
    }
    
    @media print {
      body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      .page { padding: 0; }
    }
  </style>
</head>
<body>
  <!-- ==================== СТРАНИЦА 1 ==================== -->
  <div class="page">
    <!-- Шапка -->
    <div class="header">
      <div class="header-left">
        <h1>${character.name || "Безымянный герой"}</h1>
        <div class="header-subtitle">
          ${character.race?.nameRu || ""} • ${character.class?.nameRu || ""} ${character.level} ур.
          ${character.subclass ? ` • ${character.subclass.nameRu}` : ""}
          ${character.background ? ` • ${character.background.nameRu}` : ""}
        </div>
      </div>
      <div class="header-stats">
        <div class="stat-box">
          <span class="value">${stats.hitPointMaximum}</span>
          <span class="label">Хиты</span>
        </div>
        <div class="stat-box">
          <span class="value">${stats.armorClass}</span>
          <span class="label">КД</span>
        </div>
        <div class="stat-box">
          <span class="value">${stats.speed}</span>
          <span class="label">Скорость</span>
        </div>
        <div class="stat-box">
          <span class="value">+${stats.proficiencyBonus}</span>
          <span class="label">Маст.</span>
        </div>
        <div class="stat-box">
          <span class="value">${formatMod(stats.initiative)}</span>
          <span class="label">Иниц.</span>
        </div>
      </div>
    </div>
    
    <!-- Характеристики -->
    <div class="section full-width" style="margin-bottom: 4px;">
      <div class="abilities-row">
        ${ABILITIES.map((ability) => {
          const score =
            character.abilityScores[ability] +
            (character.abilityScoreIncreases?.[ability] || 0);
          const mod = stats.abilityModifiers[ability];
          const save = stats.savingThrows[ability];
          const hasSaveProf = character.class?.savingThrows.includes(ability);
          return `
            <div class="ability-block">
              <div class="ability-name">${ABILITY_FULL_NAMES[ability]}</div>
              <div class="ability-mod">${formatMod(mod)}</div>
              <div class="ability-score">${score}</div>
              <div class="ability-save ${hasSaveProf ? "proficient" : ""}">
                Спас: ${formatMod(save)}${hasSaveProf ? " ✓" : ""}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
    
    <div class="main-grid">
      <!-- Левая колонка -->
      <div>
        <!-- Навыки -->
        <div class="section">
          <div class="section-title">Навыки</div>
          <div class="skills-grid">
            ${Object.entries(stats.skills)
              .map(([skill, bonus]) => {
                const isProficient =
                  character.skillProficiencies.includes(skill);
                return `
              <div class="skill-item ${isProficient ? "proficient" : ""}">
                <span>${isProficient ? "●" : "○"} ${getSkillNameRu(skill)}</span>
                <span class="skill-bonus">${formatMod(bonus)}</span>
              </div>
            `;
              })
              .join("")}
          </div>
        </div>
        
        <!-- Оружие -->
        ${
          weapons.length > 0
            ? `
          <div class="section">
            <div class="section-title">Оружие</div>
            <div class="weapons-grid">
              ${weapons
                .map((weapon) => {
                  const isRanged = weapon.properties?.some((p) =>
                    p.toLowerCase().includes("дистанция"),
                  );
                  const isFinesse = weapon.properties?.some((p) =>
                    p.toLowerCase().includes("фехтовальное"),
                  );
                  let atkMod: number, dmgMod: number;
                  if (isFinesse) {
                    const bestMod = Math.max(
                      stats.abilityModifiers.strength,
                      stats.abilityModifiers.dexterity,
                    );
                    atkMod = bestMod + stats.proficiencyBonus;
                    dmgMod = bestMod;
                  } else if (isRanged) {
                    atkMod =
                      stats.abilityModifiers.dexterity + stats.proficiencyBonus;
                    dmgMod = stats.abilityModifiers.dexterity;
                  } else {
                    atkMod =
                      stats.abilityModifiers.strength + stats.proficiencyBonus;
                    dmgMod = stats.abilityModifiers.strength;
                  }
                  const damageTypeRu = weapon.damage?.type
                    ? DAMAGE_TYPES_RU[weapon.damage.type.toLowerCase()] ||
                      weapon.damage.type
                    : "";
                  return `
                  <div class="weapon-card">
                    <div>
                      <div class="weapon-name">${weapon.nameRu}</div>
                      <div class="weapon-details">${damageTypeRu}</div>
                    </div>
                    <div style="text-align: right;">
                      <span class="weapon-attack">${formatMod(atkMod)}</span>
                      <div class="weapon-damage">${weapon.damage?.dice}${dmgMod !== 0 ? formatMod(dmgMod) : ""}</div>
                    </div>
                  </div>
                `;
                })
                .join("")}
            </div>
          </div>
        `
            : ""
        }
        
        <!-- Доспехи -->
        ${
          armor.length > 0
            ? `
          <div class="section">
            <div class="section-title">Защита</div>
            <div class="armor-info">
              ${armor.map((a) => `<strong>${a.nameRu}</strong> (КД ${a.armorClass}${a.id === "shield" ? " бонус" : ""})`).join(", ")}
            </div>
          </div>
        `
            : ""
        }
        
        <!-- Кошелёк -->
        <div class="section">
          <div class="section-title">Кошелёк</div>
          <div class="wallet-row">
            <div class="wallet-item pp"><div class="wallet-value">${stats.wallet.platinum}</div><div class="wallet-label">ПМ</div></div>
            <div class="wallet-item gp"><div class="wallet-value">${stats.wallet.gold}</div><div class="wallet-label">ЗМ</div></div>
            <div class="wallet-item ep"><div class="wallet-value">${stats.wallet.electrum}</div><div class="wallet-label">ЭМ</div></div>
            <div class="wallet-item sp"><div class="wallet-value">${stats.wallet.silver}</div><div class="wallet-label">СМ</div></div>
            <div class="wallet-item cp"><div class="wallet-value">${stats.wallet.copper}</div><div class="wallet-label">ММ</div></div>
          </div>
        </div>
        
        <!-- Снаряжение -->
        <div class="section">
          <div class="section-title">Снаряжение</div>
          <div class="equipment-text">${allEquipment.join(", ") || "—"}</div>
        </div>
      </div>
      
      <!-- Правая колонка -->
      <div>
        <!-- Черта от предыстории -->
        ${
          feat
            ? `
          <div class="section" style="padding: 0;">
            <div class="feat-box">
              <div class="feat-title">★ ${feat.nameRu}</div>
              <div class="feat-desc">${feat.description}</div>
              <ul class="feat-benefits">
                ${feat.benefits.map((b) => `<li>${b}</li>`).join("")}
              </ul>
            </div>
          </div>
        `
            : ""
        }
        
        <!-- Особенности расы -->
        ${
          character.race?.traits && character.race.traits.length > 0
            ? `
          <div class="section">
            <div class="section-title">Особенности: ${character.race.nameRu}</div>
            <div class="traits-list">
              ${character.race.traits
                .map(
                  (trait) => `
                <div class="trait-item">
                  <span class="trait-name">${trait.nameRu}:</span>
                  <span class="trait-desc">${trait.description}</span>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
        `
            : ""
        }
        
        <!-- Умения класса -->
        ${
          classFeatures.length > 0
            ? `
          <div class="section">
            <div class="section-title">Умения класса: ${character.class?.nameRu}</div>
            ${classFeatures
              .map(
                (f) => `
              <div class="feature-item">
                <div class="feature-name">${f.nameRu}</div>
                <div class="feature-desc">${f.description}</div>
              </div>
            `,
              )
              .join("")}
          </div>
        `
            : ""
        }
        
        <!-- Доп. инфо -->
        <div class="info-row">
          <div class="info-box">
            <div class="info-label">Пасс. восприятие</div>
            <div class="info-value">${stats.passivePerception}</div>
          </div>
          <div class="info-box">
            <div class="info-label">Кости хитов</div>
            <div class="info-value">${stats.hitDice}</div>
          </div>
          <div class="info-box">
            <div class="info-label">Размер</div>
            <div class="info-value">${character.race?.size === "Small" ? "S" : "M"}</div>
          </div>
        </div>
        
        <!-- Владения -->
        <div class="proficiencies-text">
          ${character.languages.length > 0 ? `<strong>Языки:</strong> ${character.languages.join(", ")}<br>` : ""}
          ${character.class?.armorProficiencies?.length ? `<strong>Доспехи:</strong> ${character.class.armorProficiencies.join(", ")}<br>` : ""}
          ${character.class?.weaponProficiencies?.length ? `<strong>Оружие:</strong> ${character.class.weaponProficiencies.join(", ")}` : ""}
        </div>
      </div>
    </div>
    
    <!-- Личность (если заполнена) -->
    ${
      character.personalityTraits ||
      character.ideals ||
      character.bonds ||
      character.flaws
        ? `
      <div class="section full-width" style="margin-top: 4px;">
        <div class="section-title">Личность и история</div>
        ${character.background?.description ? `<div class="background-desc">${character.background.description}</div>` : ""}
        <div class="personality-grid">
          ${character.personalityTraits ? `<div class="personality-item"><div class="personality-label">Черты характера</div><div class="personality-text">"${character.personalityTraits}"</div></div>` : ""}
          ${character.ideals ? `<div class="personality-item"><div class="personality-label">Идеалы</div><div class="personality-text">"${character.ideals}"</div></div>` : ""}
          ${character.bonds ? `<div class="personality-item"><div class="personality-label">Привязанности</div><div class="personality-text">"${character.bonds}"</div></div>` : ""}
          ${character.flaws ? `<div class="personality-item"><div class="personality-label">Слабости</div><div class="personality-text">"${character.flaws}"</div></div>` : ""}
        </div>
      </div>
    `
        : ""
    }
    
    <div class="footer">D&D 5e PHB 2024 • ${new Date().toLocaleDateString("ru-RU")}</div>
  </div>
  
  ${
    hasSpells
      ? `
  <!-- ==================== СТРАНИЦА 2: ЗАКЛИНАНИЯ ==================== -->
  <div class="page">
    <!-- Шапка заклинаний -->
    <div class="spells-header">
      <h2>✨ Заклинания: ${character.class?.nameRu}</h2>
      <div class="spellcasting-stats">
        ${
          stats.spellcasting
            ? `
          <div class="spell-stat">
            <div class="label">Характеристика</div>
            <div class="value">${stats.spellcasting.ability ? getAbilityNameRu(stats.spellcasting.ability) : "—"}</div>
          </div>
          <div class="spell-stat">
            <div class="label">СЛ спасброска</div>
            <div class="value">${stats.spellcasting.spellSaveDC}</div>
          </div>
          <div class="spell-stat">
            <div class="label">Бонус атаки</div>
            <div class="value">${formatMod(stats.spellcasting.spellAttackBonus)}</div>
          </div>
        `
            : ""
        }
      </div>
    </div>
    
    <!-- Пояснение -->
    <div class="section full-width" style="margin-bottom: 4px; background: #fef3c7; border-color: #fbbf24;">
      <div style="font-size: 6pt; color: #92400e;">
        <strong>Как использовать:</strong> 
        СЛ ${stats.spellcasting?.spellSaveDC || 10} = 8 + ${stats.proficiencyBonus} (мастерство) + ${stats.spellcasting?.abilityModifier || 0} (мод. ${stats.spellcasting?.ability ? getAbilityNameRu(stats.spellcasting.ability) : ""}) • 
        Бонус атаки ${formatMod(stats.spellcasting?.spellAttackBonus || 0)} = ${stats.proficiencyBonus} + ${stats.spellcasting?.abilityModifier || 0} • 
        Заговоры используются неограниченно • Заклинания тратят ячейки
      </div>
    </div>
    
    ${
      stats.spellcasting
        ? `
      <!-- Ячейки заклинаний -->
      <div class="spell-slots-row">
        ${[1, 2, 3, 4, 5, 6, 7, 8, 9]
          .map((level) => {
            const key =
              `level${level}` as keyof typeof stats.spellcasting.spellSlots;
            const count = stats.spellcasting!.spellSlots[key];
            return `
            <div class="slot-box ${count === 0 ? "empty" : ""}">
              <div class="slot-level">${level} круг</div>
              <div class="slot-count">${count > 0 ? count : "—"}</div>
            </div>
          `;
          })
          .join("")}
      </div>
    `
        : ""
    }
    
    ${
      character.cantripsKnown.length > 0
        ? `
      <div class="cantrips-section">
        <div class="spells-section-title">Заговоры (${character.cantripsKnown.length} шт.) — используются неограниченно</div>
        <div class="spells-grid">
          ${character.cantripsKnown.map((spell) => generateCompactSpellCard(spell)).join("")}
        </div>
      </div>
    `
        : ""
    }
    
    ${
      character.spellsKnown.length > 0
        ? `
      <div class="spells-section">
        <div class="spells-section-title">Заклинания 1-го круга (${character.spellsKnown.length} шт.) — требуют ячейку</div>
        <div class="spells-grid">
          ${character.spellsKnown.map((spell) => generateCompactSpellCard(spell)).join("")}
        </div>
      </div>
    `
        : ""
    }
    
    <div class="footer">
      Ячейки заклинаний восстанавливаются после длинного отдыха${character.class?.id === "warlock" ? " (Колдун: после короткого отдыха)" : ""} • 
      D&D 5e PHB 2024 • ${new Date().toLocaleDateString("ru-RU")}
    </div>
  </div>
  `
      : ""
  }
</body>
</html>
  `;

  // Открываем для печати
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.onload = () => {
      setTimeout(() => printWindow.print(), 500);
    };
  }
}
