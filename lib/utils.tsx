export function processProperties(prop: any) {
    const properties: any = {};
    for (const key in prop) {
        const value = prop[key];
        if (value.type === "rich_text") {
            properties[key] = processRichText(value.rich_text);
        } else if (value.type === "title") {
            properties[key] = value.title.map((text: any) => text.plain_text).join("");
        } else if (value.type === "select") {
            properties[key] = value.select.name;
        } else if (value.type === "multi_select") {
            properties[key] = value.multi_select.map((text: any) => text.name);
        } else if (value.type === "checkbox") {
            properties[key] = value.checkbox;
        } else if (value.type === "number") {
            properties[key] = value.number;
        } else if (value.type === "date") {
            properties[key] = value.date.start;
        }
    }
    return properties;
}

export function processRichText(richText: any) {
    return richText.map((text: any) => {
        return {
            text: text.plain_text,
            annotations: text.annotations,
            href: text.href,
        }
    });
}