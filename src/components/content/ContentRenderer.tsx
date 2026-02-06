import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { ContentBlock, ContentType } from "@/types/class.types";
import {
    parseDescriptionLine,
    renderContent,
} from "@/utils/descriptionParser";
import React from "react";
import { useLocation } from "react-router-dom";

interface ContentRendererProps {
  content: ContentType | undefined;
  className?: string;
  options?: any; // Add options prop
}

export function ContentRenderer({ content, className, options }: ContentRendererProps) {
  const location = useLocation();
  const renderOptions = options || { // Use existing options or create new ones
      linkState: {
          backUrl: location.pathname + location.search + location.hash,
          backLabel: "Назад",
          scrollY: window.scrollY
      }
  };

  if (!content) return null;

  // Если это строка, парсим и рендерим
  if (typeof content === "string") {
    const parsed = parseDescriptionLine(content);
    return (
      <p className={cn("leading-relaxed mb-4", className)}>
        {renderContent(parsed, renderOptions)}
      </p>
    );
  }

  // Если это массив, рендерим каждый элемент
  if (Array.isArray(content)) {
    return (
      <div className={cn("space-y-4", className)}>
        {content.map((item, index) => (
          <ContentRenderer key={index} content={item} className={className} options={renderOptions} />
        ))}
      </div>
    );
  }

  // Если это объект, рендерим в зависимости от типа
  if (typeof content === "object") {
    return <BlockRenderer block={content as ContentBlock} options={renderOptions} />;
  }

  return null;
}

function BlockRenderer({ block, options }: { block: ContentBlock; options: any }) {
  switch (block.type) {
    case "text":
      return <span className="text-foreground">{block.text}</span>;

    case "paragraph":
      return (
        <p className="leading-relaxed mb-4 text-foreground">
          <ContentRenderer content={block.content} options={options} />
        </p>
      );

    case "doc":
      return (
        <div>
          <ContentRenderer content={block.content} options={options} />
        </div>
      );

    case "heading":
      const Level = (`h${block.attrs?.level || 3}` as any) as React.ElementType;
      return (
        <Level className="font-bold mt-6 mb-3 text-foreground tracking-tight">
          <ContentRenderer content={block.content} options={options} />
        </Level>
      );

    case "list":
      const ListTag = block.attrs?.type === "ordered" ? "ol" : "ul";
      return (
        <ListTag
          className={cn(
            "my-4 pl-6 space-y-2",
            block.attrs?.type === "ordered"
              ? "list-decimal"
              : "list-disc marker:text-primary/70"
      )}
    >
      {Array.isArray(block.content) && block.content.map((item, index) => (
            <li key={index} className="pl-1">
              <ContentRenderer content={item} className="mb-0" options={options} />
            </li>
          ))}
        </ListTag>
      );

    case "quote":
      return (
        <blockquote className="border-l-4 border-primary/30 pl-4 py-2 my-4 bg-muted/30 rounded-r-lg italic text-muted-foreground">
          <ContentRenderer content={block.content} />
        </blockquote>
      );

    case "table":
      return (
        <div className="my-6 rounded-lg border border-border overflow-hidden">
          {block.caption && (
            <div className="bg-muted/50 px-4 py-3 font-semibold text-center border-b border-border">
              {block.caption}
            </div>
          )}
          <div className="overflow-x-auto">
            <Table>
              {block.colLabels && (
                <TableHeader>
                  <TableRow>
                    {block.colLabels.map((label, index) => (
                      <TableHead
                        key={index}
                        className={cn(
                          "whitespace-nowrap",
                          block.colStyles?.[index]
                        )}
                      >
                        {label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
              )}
              <TableBody>
                {block.rows?.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {Array.isArray(row) ? (
                      row.map((cell, cellIndex) => (
                        <TableCell
                          key={cellIndex}
                          className={cn(block.colStyles?.[cellIndex])}
                        >
                          <ContentRenderer content={cell} className="mb-0" />
                        </TableCell>
                      ))
                    ) : (
                      <TableCell colSpan={block.colLabels?.length || 1}>
                        <ContentRenderer content={row} className="mb-0" />
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      );

    default:
      console.warn("Unknown block type:", block);
      return null;
  }
}
