import type { RichText, PropertyObjectType, PartialSelectResponse } from "@/app/_components/utility/types";
import { RichTextItemResponse, PageObjectResponse} from "@notionhq/client/build/src/api-endpoints";



export function processProperties(prop: PageObjectResponse["properties"]) {
    const properties: Record<string, PropertyObjectType> = {};

    for (const key in prop) {
        const value = prop[key];
        if (value.type === "rich_text") {
            properties[key] = processRichText(value.rich_text);
        } else if (value.type === "title") {
            properties[key] = value.title.map((text: RichTextItemResponse) => text.plain_text).join("");
        } else if (value.type === "select") {
            properties[key] = value.select?.name;
        } else if (value.type === "multi_select") {
            properties[key] = value.multi_select.map((text: PartialSelectResponse) => text.name);
        } else if (value.type === "checkbox") {
            properties[key] = value.checkbox;
        } else if (value.type === "number") {
            properties[key] = value.number;
        } else if (value.type === "date") {
            properties[key] = value.date?.start;
        }
    }
    return properties;
}

export function processRichText(richText: RichText[] | RichTextItemResponse[]) {
    return richText.map((text) => {
        const textItem = text as RichTextItemResponse;
        return {
            text: textItem.plain_text,
            annotations: textItem.annotations,
            href: textItem.href,
        }
    });
}