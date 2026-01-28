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

  // HTML для PDF
  const html = `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>${character.name || "Персонаж"} - D&D 2024</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Roboto+Condensed:wght@400;700&display=swap');
    
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    @page { size: A4; margin: 8mm; }
    
    body {
      font-family: 'Roboto', Arial, sans-serif;
      font-size: 8pt;
      line-height: 1.3;
      color: #1a1a1a;
      background: white;
    }
    
    .page {
      width: 100%;
      height: 277mm;
      padding: 5px;
      page-break-after: always;
      overflow: hidden;
    }
    
    .page:last-child { page-break-after: auto; }
    
    /* === ШАПКА === */
    .header {
      background: linear-gradient(135deg, #5c3317 0%, #8b4513 100%);
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .header-left h1 {
      font-size: 16pt;
      font-weight: 700;
      margin-bottom: 2px;
    }
    
    .header-subtitle { font-size: 8pt; opacity: 0.9; }
    
    .header-stats {
      display: flex;
      gap: 8px;
    }
    
    .stat-box {
      text-align: center;
      background: rgba(255,255,255,0.15);
      border-radius: 6px;
      padding: 4px 8px;
      min-width: 55px;
    }
    
    .stat-box .value { font-size: 14pt; font-weight: bold; display: block; }
    .stat-box .label { font-size: 6pt; text-transform: uppercase; opacity: 0.8; }
    
    /* === ОСНОВНОЙ ГРИД === */
    .main-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
    }
    
    .section {
      background: #fafaf9;
      border-radius: 6px;
      padding: 6px;
      border: 1px solid #e7e5e4;
    }
    
    .section-title {
      font-size: 8pt;
      font-weight: 700;
      color: #5c3317;
      margin-bottom: 4px;
      padding-bottom: 2px;
      border-bottom: 1px solid #d97706;
      text-transform: uppercase;
    }
    
    /* === ХАРАКТЕРИСТИКИ === */
    .abilities-row {
      display: flex;
      gap: 4px;
      justify-content: space-between;
    }
    
    .ability-block {
      text-align: center;
      background: linear-gradient(to bottom, #fef3c7, #fde68a);
      border: 1px solid #d97706;
      border-radius: 6px;
      padding: 4px 6px;
      flex: 1;
    }
    
    .ability-name { font-size: 7pt; font-weight: 700; color: #92400e; }
    .ability-mod { font-size: 14pt; font-weight: bold; color: #1c1917; }
    .ability-score { font-size: 7pt; color: #78716c; }
    .ability-save { font-size: 6pt; color: #78716c; }
    .ability-save.proficient { color: #059669; font-weight: bold; }
    
    /* === НАВЫКИ === */
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2px;
      font-size: 7pt;
    }
    
    .skill-item {
      display: flex;
      justify-content: space-between;
      padding: 1px 3px;
      border-radius: 2px;
    }
    
    .skill-item.proficient { background: #dcfce7; font-weight: 600; }
    .skill-bonus { color: #5c3317; font-weight: bold; }
    
    /* === ОРУЖИЕ === */
    .weapons-grid {
      display: grid;
      gap: 4px;
    }
    
    .weapon-card {
      background: white;
      border: 1px solid #d6d3d1;
      border-radius: 4px;
      padding: 4px 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .weapon-info { flex: 1; }
    .weapon-name { font-weight: 600; font-size: 8pt; }
    .weapon-details { font-size: 7pt; color: #78716c; }
    .weapon-stats {
      text-align: right;
    }
    .weapon-attack {
      background: #dc2626;
      color: white;
      padding: 1px 6px;
      border-radius: 10px;
      font-size: 7pt;
      font-weight: bold;
    }
    .weapon-damage {
      font-size: 9pt;
      font-weight: bold;
      color: #1c1917;
    }
    
    /* === КОШЕЛЁК === */
    .wallet-row {
      display: flex;
      justify-content: space-between;
      gap: 4px;
    }
    
    .wallet-item {
      flex: 1;
      text-align: center;
      padding: 3px;
      border-radius: 4px;
      font-size: 7pt;
    }
    
    .wallet-item.pp { background: #e5e7eb; }
    .wallet-item.gp { background: #fef08a; }
    .wallet-item.ep { background: #e0f2fe; }
    .wallet-item.sp { background: #f3f4f6; }
    .wallet-item.cp { background: #fed7aa; }
    
    .wallet-value { font-size: 11pt; font-weight: bold; }
    .wallet-label { font-size: 6pt; color: #57534e; }
    
    /* === ЧЕРТА === */
    .feat-box {
      background: linear-gradient(to right, #fef9c3, #fef3c7);
      border: 1px solid #eab308;
      border-radius: 6px;
      padding: 6px;
    }
    
    .feat-title { font-weight: 700; color: #854d0e; font-size: 8pt; margin-bottom: 2px; }
    .feat-desc { font-size: 7pt; color: #78716c; margin-bottom: 4px; }
    .feat-benefits { font-size: 7pt; padding-left: 12px; }
    .feat-benefits li { margin-bottom: 1px; }
    
    /* === ОСОБЕННОСТИ === */
    .traits-list { font-size: 7pt; }
    .trait-item { margin-bottom: 3px; }
    .trait-name { font-weight: 600; color: #5c3317; }
    .trait-desc { color: #57534e; }
    
    /* === СНАРЯЖЕНИЕ === */
    .equipment-text { font-size: 7pt; color: #57534e; line-height: 1.4; }
    
    /* === ИНФО-БЛОКИ === */
    .info-row {
      display: flex;
      gap: 4px;
      margin-top: 4px;
    }
    
    .info-box {
      flex: 1;
      background: #f5f5f4;
      border-radius: 4px;
      padding: 4px;
      text-align: center;
    }
    
    .info-label { font-size: 6pt; color: #78716c; text-transform: uppercase; }
    .info-value { font-size: 10pt; font-weight: bold; }
    
    /* === ДОСПЕХИ === */
    .armor-info {
      background: linear-gradient(to right, #dbeafe, #eff6ff);
      border: 1px solid #3b82f6;
      border-radius: 4px;
      padding: 4px 6px;
      font-size: 7pt;
    }
    
    /* === СТРАНИЦА 2: ЗАКЛИНАНИЯ === */
    .spells-header {
      background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
      color: white;
      padding: 6px 12px;
      border-radius: 6px;
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .spells-header h2 { font-size: 14pt; }
    
    .spellcasting-stats {
      display: flex;
      gap: 15px;
      font-size: 8pt;
    }
    
    .spell-stat { text-align: center; }
    .spell-stat .label { font-size: 6pt; opacity: 0.8; }
    .spell-stat .value { font-size: 12pt; font-weight: bold; }
    
    /* Ячейки заклинаний */
    .spell-slots-row {
      display: flex;
      gap: 4px;
      margin-bottom: 6px;
      justify-content: center;
    }
    
    .slot-box {
      text-align: center;
      padding: 3px 6px;
      border-radius: 4px;
      background: #f3e8ff;
      border: 1px solid #c4b5fd;
      min-width: 45px;
    }
    
    .slot-box.empty { background: #f5f5f4; border-color: #d6d3d1; opacity: 0.5; }
    .slot-level { font-size: 6pt; color: #7c3aed; }
    .slot-count { font-size: 11pt; font-weight: bold; color: #5b21b6; }
    .slot-box.empty .slot-count { color: #a8a29e; }
    
    /* Карточки заклинаний */
    .spells-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 4px;
    }
    
    .spell-card {
      background: white;
      border: 1px solid #c4b5fd;
      border-radius: 4px;
      padding: 4px 6px;
      font-size: 7pt;
    }
    
    .spell-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
    }
    
    .spell-name { font-weight: 700; color: #5b21b6; font-size: 8pt; }
    .spell-level { font-size: 6pt; color: #7c3aed; background: #f3e8ff; padding: 1px 4px; border-radius: 3px; }
    
    .spell-meta {
      display: flex;
      gap: 6px;
      color: #6b7280;
      font-size: 6pt;
      margin-bottom: 2px;
    }
    
    .spell-components { font-size: 6pt; color: #9ca3af; margin-bottom: 2px; }
    
    .spell-desc {
      font-size: 6.5pt;
      color: #374151;
      line-height: 1.3;
      border-left: 2px solid #a855f7;
      padding-left: 4px;
      background: #faf5ff;
      padding: 2px 4px;
      border-radius: 2px;
    }
    
    .cantrips-section, .spells-section {
      margin-bottom: 6px;
    }
    
    .spells-section-title {
      font-size: 9pt;
      font-weight: 700;
      color: #7c3aed;
      margin-bottom: 4px;
      padding-bottom: 2px;
      border-bottom: 1px solid #d8b4fe;
    }
    
    /* Футер */
    .footer {
      text-align: center;
      font-size: 6pt;
      color: #a8a29e;
      margin-top: 4px;
    }
    
    /* Языки и владения */
    .proficiencies-text { font-size: 7pt; color: #57534e; margin-top: 4px; }
    
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
          <span class="label">Мастерство</span>
        </div>
        <div class="stat-box">
          <span class="value">${formatMod(stats.initiative)}</span>
          <span class="label">Инициатива</span>
        </div>
      </div>
    </div>
    
    <!-- Характеристики -->
    <div class="section">
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
                Спас: ${formatMod(save)}${hasSaveProf ? "✓" : ""}
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
                    <div class="weapon-info">
                      <div class="weapon-name">${weapon.nameRu}</div>
                      <div class="weapon-details">${damageTypeRu}${weapon.properties?.length ? " • " + weapon.properties.slice(0, 2).join(", ") : ""}</div>
                    </div>
                    <div class="weapon-stats">
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
            <div class="wallet-item pp">
              <div class="wallet-value">${stats.wallet.platinum}</div>
              <div class="wallet-label">ПМ</div>
            </div>
            <div class="wallet-item gp">
              <div class="wallet-value">${stats.wallet.gold}</div>
              <div class="wallet-label">ЗМ</div>
            </div>
            <div class="wallet-item ep">
              <div class="wallet-value">${stats.wallet.electrum}</div>
              <div class="wallet-label">ЭМ</div>
            </div>
            <div class="wallet-item sp">
              <div class="wallet-value">${stats.wallet.silver}</div>
              <div class="wallet-label">СМ</div>
            </div>
            <div class="wallet-item cp">
              <div class="wallet-value">${stats.wallet.copper}</div>
              <div class="wallet-label">ММ</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Правая колонка -->
      <div>
        <!-- Черта -->
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
        
        <!-- Снаряжение -->
        <div class="section">
          <div class="section-title">Снаряжение</div>
          <div class="equipment-text">${allEquipment.join(", ") || "—"}</div>
        </div>
        
        <!-- Доп. инфо -->
        <div class="info-row">
          <div class="info-box">
            <div class="info-label">Пассивное восприятие</div>
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
        
        <!-- Языки и владения -->
        <div class="proficiencies-text">
          ${character.languages.length > 0 ? `<strong>Языки:</strong> ${character.languages.join(", ")}<br>` : ""}
          ${character.class?.armorProficiencies?.length ? `<strong>Доспехи:</strong> ${character.class.armorProficiencies.join(", ")}<br>` : ""}
          ${character.class?.weaponProficiencies?.length ? `<strong>Оружие:</strong> ${character.class.weaponProficiencies.join(", ")}` : ""}
        </div>
      </div>
    </div>
    
    <div class="footer">D&D 5e (2024) • ${new Date().toLocaleDateString("ru-RU")}</div>
  </div>
  
  ${
    hasSpells
      ? `
  <!-- ==================== СТРАНИЦА 2: ЗАКЛИНАНИЯ ==================== -->
  <div class="page">
    <!-- Шапка заклинаний -->
    <div class="spells-header">
      <h2>✨ Заклинания</h2>
      <div class="spellcasting-stats">
        ${
          stats.spellcasting
            ? `
          <div class="spell-stat">
            <div class="label">Характеристика</div>
            <div class="value">${stats.spellcasting.ability ? getAbilityNameRu(stats.spellcasting.ability) : "—"}</div>
          </div>
          <div class="spell-stat">
            <div class="label">Сложность спасброска</div>
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
        <div class="spells-section-title">Заговоры (неограниченно)</div>
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
        <div class="spells-section-title">Заклинания 1-го круга</div>
        <div class="spells-grid">
          ${character.spellsKnown.map((spell) => generateCompactSpellCard(spell)).join("")}
        </div>
      </div>
    `
        : ""
    }
    
    <div class="footer">
      Формулы: Сложность спасброска = 8 + бонус мастерства + модификатор ${stats.spellcasting?.ability ? getAbilityNameRu(stats.spellcasting.ability) : "характеристики"} • 
      Бонус атаки = бонус мастерства + модификатор ${stats.spellcasting?.ability ? getAbilityNameRu(stats.spellcasting.ability) : "характеристики"}<br>
      D&D 5e (2024) • ${new Date().toLocaleDateString("ru-RU")}
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
