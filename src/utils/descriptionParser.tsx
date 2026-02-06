import { RollButton } from "@/components/RollButton";
import type { DescriptionItem } from "@/types/character";
import React from "react";
import { Link } from "react-router-dom";

/**
 * Парсит описание снаряжения с тегами формата {@tag content}
 * и возвращает React элементы
 */

export interface ParsedElement {
  type:
    | "text"
    | "bold"
    | "italic"
    | "br"
    | "sub"
    | "roll"
    | "glossary"
    | "spell"
    | "feat"
    | "item"
    | "bestiary"
    | "link";
  content?: string | ParsedElement[]; // Может содержать вложенные элементы
  url?: string;
  label?: string;
}

/**
 * Находит закрывающую скобку с учетом вложенности
 */
export function findClosingBrace(str: string, startIndex: number): number {
  let depth = 1;
  let index = startIndex;

  while (index < str.length && depth > 0) {
    if (str[index] === "{") {
      depth++;
    } else if (str[index] === "}") {
      depth--;
    }
    index++;
  }

  return depth === 0 ? index - 1 : -1;
}

/**
 * Парсит строку с поддержкой вложенных тегов
 */
export function parseDescriptionLine(line: string): ParsedElement[] {
  const elements: ParsedElement[] = [];
  let currentIndex = 0;

  while (currentIndex < line.length) {
    // Ищем начало тега
    const tagStart = line.indexOf("{@", currentIndex);

    if (tagStart === -1) {
      // Больше тегов нет, добавляем оставшийся текст
      const remaining = line.substring(currentIndex);
      if (remaining) {
        elements.push({ type: "text", content: remaining });
      }
      break;
    }

    // Добавляем текст перед тегом
    if (tagStart > currentIndex) {
      const textBefore = line.substring(currentIndex, tagStart);
      elements.push({ type: "text", content: textBefore });
    }

    // Находим имя тега
    const tagNameMatch = line.substring(tagStart).match(/^{@([a-z]+)/);
    if (!tagNameMatch) {
      // Невалидный тег, пропускаем
      elements.push({
        type: "text",
        content: line.substring(tagStart, tagStart + 2),
      });
      currentIndex = tagStart + 2;
      continue;
    }

    const tagType = tagNameMatch[1];
    const contentStart = tagStart + tagNameMatch[0].length;

    // Для тега {@br} нет содержимого
    if (tagType === "br") {
      const brEnd = line.indexOf("}", contentStart);
      if (brEnd !== -1) {
        elements.push({ type: "br" });
        currentIndex = brEnd + 1;
      } else {
        elements.push({ type: "text", content: line.substring(tagStart) });
        break;
      }
      continue;
    }

    // Пропускаем пробелы после имени тега
    let contentStartAdjusted = contentStart;
    while (
      contentStartAdjusted < line.length &&
      line[contentStartAdjusted] === " "
    ) {
      contentStartAdjusted++;
    }

    // Находим закрывающую скобку с учетом вложенности
    const tagEnd = findClosingBrace(line, contentStartAdjusted);

    if (tagEnd === -1) {
      // Не нашли закрывающую скобку
      elements.push({ type: "text", content: line.substring(tagStart) });
      break;
    }

    // Извлекаем содержимое тега
    const tagContent = line.substring(contentStartAdjusted, tagEnd);

    // Обрабатываем разные типы тегов
    switch (tagType) {
      case "b":
        // Рекурсивно парсим содержимое для поддержки вложенных тегов
        elements.push({
          type: "bold",
          content: parseDescriptionLine(tagContent),
        });
        break;

      case "i":
        elements.push({
          type: "italic",
          content: parseDescriptionLine(tagContent),
        });
        break;

      case "sub":
        elements.push({
          type: "sub",
          content: parseDescriptionLine(tagContent),
        });
        break;

      case "roll":
        elements.push({ type: "roll", content: tagContent });
        break;

      case "glossary": {
        // Формат: {@glossary термин|url:ссылка}
        const parts = tagContent.split("|");
        const label = parts[0];
        const urlPart = parts[1];
        const url = urlPart ? urlPart.replace("url:", "") : "";
        elements.push({ type: "glossary", label, url, content: label });
        break;
      }

      case "spell": {
        // Формат: {@spell название} или {@spell название|externalId} или {@spell название|url:externalId}
        const parts = tagContent.split("|");
        const label = parts[0];
        const urlPart = parts[1] || label.toLowerCase().replace(/\s+/g, "-");
        const externalId = urlPart.replace("url:", ""); // Убираем префикс url: если есть
        elements.push({
          type: "spell",
          label,
          url: externalId,
          content: label,
        });
        break;
      }

      case "feat": {
        // Формат: {@feat название} или {@feat название|externalId} или {@feat название|url:externalId}
        const parts = tagContent.split("|");
        const label = parts[0];
        const urlPart = parts[1] || label.toLowerCase().replace(/\s+/g, "-");
        const externalId = urlPart.replace("url:", ""); // Убираем префикс url: если есть
        elements.push({
          type: "feat",
          label,
          url: externalId,
          content: label,
        });
        break;
      }

      case "item": {
        // Формат: {@item название} или {@item название|url}
        const parts = tagContent.split("|");
        const label = parts[0];
        const url = parts[1] ? parts[1].replace("url:", "") : "";
        elements.push({ type: "item", label, url, content: label });
        break;
      }

      case "bestiary":
        elements.push({ type: "bestiary", content: tagContent });
        break;

      case "link": {
        // Формат: {@link текст|url}
        const parts = tagContent.split("|");
        const label = parts[0];
        const url = parts[1] || "";
        elements.push({ type: "link", label, url, content: label });
        break;
      }

      default:
        // Неизвестный тег - оставляем как текст
        elements.push({
          type: "text",
          content: line.substring(tagStart, tagEnd + 1),
        });
    }

    currentIndex = tagEnd + 1;
  }

  return elements;
}

export interface RenderOptions {
  linkState?: any;
}

/**
 * Рендерит содержимое элемента (строка или массив вложенных элементов)
 */
export function renderContent(
  content: string | ParsedElement[] | undefined,
  options?: RenderOptions
): React.ReactNode {
  if (!content) return null;

  if (typeof content === "string") {
    return content;
  }

  // Рекурсивно рендерим вложенные элементы
  return content.map((element, index) => renderElement(element, index, options));
}

/**
 * Рендерит один элемент описания
 */
export function renderElement(element: ParsedElement, index: number, options?: RenderOptions): React.ReactNode {
  switch (element.type) {
    case "text":
      return <span key={index}>{element.content as string}</span>;

    case "bold":
      return (
        <strong key={index} className="font-semibold text-foreground">
          {renderContent(element.content, options)}
        </strong>
      );

    case "italic":
      return (
        <em key={index} className="italic">
          {renderContent(element.content, options)}
        </em>
      );

    case "br":
      return <br key={index} />;

    case "sub":
      return (
        <span key={index} className="text-xs opacity-75">
          {renderContent(element.content, options)}
        </span>
      );

    case "roll":
      return <RollButton key={index} formula={element.content as string} />;

    case "glossary":
      // Ссылка на глоссарий
      if (element.url) {
        return (
          <Link
            key={index}
            to={`/glossary#${element.url}`}
            state={options?.linkState}
            className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors cursor-help"
          >
            {element.label || renderContent(element.content, options)}
          </Link>
        );
      }
      return (
        <span
          key={index}
          className="text-indigo-400 underline decoration-dotted underline-offset-2 cursor-help"
          title="Термин из глоссария"
        >
          {element.label || renderContent(element.content, options)}
        </span>
      );

    case "feat":
      // Ссылка на черту
      if (element.url) {
        return (
          <Link
            key={index}
            to={`/feats#${element.url}`}
            state={options?.linkState}
            className="text-amber-500 hover:text-amber-400 underline underline-offset-2 transition-colors"
          >
            {element.label || renderContent(element.content, options)}
          </Link>
        );
      }
      return (
        <span
          key={index}
          className="text-amber-500 underline decoration-dotted underline-offset-2"
          title="Черта"
        >
          {element.label || renderContent(element.content, options)}
        </span>
      );

    case "spell":
      // Ссылка на заклинание
      if (element.url) {
        return (
          <Link
            key={index}
            to={`/spells#${element.url}`}
            state={options?.linkState}
            className="text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors"
          >
            {element.label || renderContent(element.content, options)}
          </Link>
        );
      }
      return (
        <span
          key={index}
          className="text-purple-400 underline decoration-dotted underline-offset-2"
          title="Заклинание"
        >
          {element.label || renderContent(element.content, options)}
        </span>
      );

    case "item":
      // Ссылка на снаряжение - ГОТОВО!
      if (element.url) {
        return (
          <Link
            key={index}
            to={`/equipment#${element.url}`}
            state={options?.linkState}
            className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
          >
            {element.label || renderContent(element.content, options)}
          </Link>
        );
      }
      return (
        <span
          key={index}
          className="text-primary underline decoration-dotted underline-offset-2"
          title="Предмет снаряжения"
        >
          {element.label || renderContent(element.content, options)}
        </span>
      );

    case "bestiary":
      // Пока без ссылки
      return (
        <span
          key={index}
          className="text-amber-400 underline decoration-dotted underline-offset-2"
          title="Существо"
        >
          {renderContent(element.content, options)}
        </span>
      );

    case "link":
      if (element.url) {
        return (
          <a
            key={index}
            href={element.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
          >
            {element.label || renderContent(element.content, options)}
          </a>
        );
      }
      return (
        <span key={index}>
          {element.label || renderContent(element.content, options)}
        </span>
      );

    default:
      return <span key={index}>{renderContent(element.content, options)}</span>;
  }
}

/**
 * Парсит и рендерит описание снаряжения
 * @param description - строка или массив строк с описанием
 * @returns React элементы для отображения
 */
export function parseEquipmentDescription(
  description: string | string[] | any[] | undefined
): React.ReactNode {
  if (!description) {
    return null;
  }

  // Преобразуем в массив, если это строка
  const lines = Array.isArray(description) ? description : [description];

  return (
    <div className="space-y-2">
      {lines.map((line, lineIndex) => {
        // Если это объект (например, список)
        if (typeof line === "object" && line !== null && "type" in line) {
          if (line.type === "list") {
            const listItems = line.content || [];
            return (
              <ul key={lineIndex} className="list-disc pl-5 space-y-1">
                {listItems.map((item: string, itemIndex: number) => (
                  <li key={itemIndex} className="text-sm text-muted-foreground leading-relaxed">
                    {renderContent(parseDescriptionLine(item))}
                  </li>
                ))}
              </ul>
            );
          }
          if (line.type === "table") {
             // Basic table support
             return (
                <div key={lineIndex} className="overflow-x-auto my-2">
                   <table className="w-full text-sm">
                      <thead>
                         <tr className="border-b border-border">
                            {line.colLabels?.map((header: string, i: number) => (
                               <th key={i} className="text-left font-medium p-2 text-muted-foreground">{renderContent(parseDescriptionLine(header))}</th>
                            ))}
                         </tr>
                      </thead>
                      <tbody>
                         {line.rows?.map((row: string[], i: number) => (
                            <tr key={i} className="border-b border-border/50">
                               {row.map((cell: string, j: number) => (
                                  <td key={j} className="p-2 text-muted-foreground">{renderContent(parseDescriptionLine(cell))}</td>
                               ))}
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             )
          }
        }

        // Если это строка
        if (typeof line === "string") {
          const elements = parseDescriptionLine(line);
          return (
            <p
              key={lineIndex}
              className="text-sm text-muted-foreground leading-relaxed"
            >
              {renderContent(elements)}
            </p>
          );
        }

        return null;
      })}
    </div>
  );
}

/**
 * Парсит описание в простой текст (без HTML/React элементов)
 * Полезно для экспорта в PDF или текстовые форматы
 */
export function parseDescriptionToPlainText(
  description: string | string[] | DescriptionItem[] | undefined
): string {
  if (!description) {
    return "";
  }

  const lines = Array.isArray(description) ? description : [description];

  return lines
    .map((item) => {
      // Если это объект (ListContent или TableContent), преобразуем в строку
      if (typeof item === "object" && item !== null) {
        if ("type" in item) {
          if (item.type === "list") {
            return item.content.join("\n");
          } else if (item.type === "table") {
            // Простое представление таблицы
            const header = item.colLabels.join(" | ");
            const rows = item.rows.map((row) => row.join(" | ")).join("\n");
            return `${header}\n${rows}`;
          }
        }
        return "";
      }

      // Обработка строки
      const line = String(item);
      // Рекурсивно удаляем все теги, оставляя только содержимое
      let result = line;
      let prevResult = "";

      // Повторяем, пока есть изменения (для обработки вложенных тегов)
      while (result !== prevResult) {
        prevResult = result;
        result = result
          .replace(/{@br\\}/g, "\n")
          .replace(/{@b\\s+([^}]+)\\}/g, "$1")
          .replace(/{@i\\s+([^}]+)\\}/g, "$1")
          .replace(/{@sub\\s+([^}]+)\\}/g, "$1")
          .replace(/{@roll\\s+([^}]+)\\}/g, "$1")
          .replace(/{@glossary\\s+([^|}]+)(?:\\|[^}]+)?\\}/g, "$1")
          .replace(/{@feat\\s+([^}]+)(?:\\|[^}]+)?\\}/g, "$1")
          .replace(/{@spell\\s+([^}]+)\\}/g, "$1")
          .replace(/{@item\\s+([^}]+)(?:\\|[^}]+)?\\}/g, "$1")
          .replace(/{@bestiary\\s+([^}]+)\\}/g, "$1")
          .replace(/{@link\\s+([^}]+)(?:\\|[^}]+)?\\}/g, "$1");
      }

      return result;
    })
    .join("\n");
}
