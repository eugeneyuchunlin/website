type AnnotationsObject = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  color?: string;
};

export default function Text({ text, annotations }: { text: string, annotations: AnnotationsObject }) {
    const {
      bold,
      italic,
      underline,
      strikethrough,
      code,
      color
    } = annotations;
  
    const className = [
      bold && "font-bold",
      italic && "italic",
      underline && "underline",
      strikethrough && "line-through",
      code && "font-mono bg-gray-100 px-1 py-0.5 rounded text-sm",
      color && color !== "default" && `text-${color.replace("_", "-")}` // Notion-like color handling
    ]
      .filter(Boolean)
      .join(" ");
  
    return <span className={className}>{text}</span>;
  }