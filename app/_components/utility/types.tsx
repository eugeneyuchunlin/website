export type RichText = {
    text: string;
    annotations: {
      bold: boolean;
      italic: boolean;
      underline: boolean;
      strikethrough: boolean;
      code: boolean;
      color: string;
    };
    href: string | null;
  };
  
export type Block = {
  id: string;
  type: string;
  rich_text: RichText[];
};