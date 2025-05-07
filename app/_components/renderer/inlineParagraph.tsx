
import Text from '@/app/_components/renderer/text';
import { RichText } from '@/app/_components/utility/types';
import { i } from 'framer-motion/client';

type InlineParagraphProps = {
  richText: RichText[];
  className?: string;
};

export default function InlineParagraph({ richText, className }: InlineParagraphProps) {
  if (!richText){
    return <span className={className}></span>;
  }


  return (
    <span className={`text-lg text-gray-800 dark:text-gray-200 ${className}`}>
      {richText.map((text, index) => {
        // check if it has link
        if (text.href) {
          return (
            <a
              key={index}
              href={text.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              <Text text={text.text} annotations={text.annotations} />
            </a>
          );
        } else {
          return <Text key={index} text={text.text} annotations={text.annotations} />;
        }
      })}
    </span>
  );
}