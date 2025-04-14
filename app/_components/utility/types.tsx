import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

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


type SelectColor =
| "default"
| "gray"
| "brown"
| "orange"
| "yellow"
| "green"
| "blue"
| "purple"
| "pink"
| "red"
  
export type PartialSelectResponse = { id: string; name: string; color: SelectColor }
  
export type PropertyObjectType = 
    | string 
    | number 
    | boolean 
    | null 
    | undefined 
    | RichText[] 
    | RichTextItemResponse[]
    | PartialSelectResponse[]
    | string[]

export type PropertyObjectMap = {
      [key: string]: PropertyObjectType;
    };