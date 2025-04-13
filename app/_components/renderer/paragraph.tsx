import Text from "@/app/_components/renderer/text";

export default function Paragraph({ richText }: { richText: any[] }) {
    console.log("richText", richText);
  return (
    <p className="text-lg text-gray-800 dark:text-gray-200 mb-4">
        {richText.map((text, index) => {
            console.log("text", text.text);
            return <Text key={index} text={text.text} annotations={text.annotations} />;
        })}
    </p>
  );
}