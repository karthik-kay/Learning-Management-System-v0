import { Accordion } from "@/components/ui/accordion";
import { FAQItem } from "./FAQItem";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQ[];
  multiple?: boolean;
}

export function FAQAccordion({
  items,
  multiple = false,
}: FAQAccordionProps) {
  const content = items.map((item) => (
    <FAQItem
      key={item.question}
      question={item.question}
      answer={item.answer}
    />
  ));

  if (multiple) {
    return <Accordion type="multiple">{content}</Accordion>;
  }

  return <Accordion type="single" collapsible>{content}</Accordion>;
}
