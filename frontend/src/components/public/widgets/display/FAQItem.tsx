import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <AccordionItem
      value={question}
      className="mb-3 rounded-xl border border-border bg-white px-5 last:mb-0 [&:last-child]:border-b"
    >
      <AccordionTrigger className="py-4 text-sm font-semibold hover:no-underline [&>svg]:hidden [&[data-state=open]_.faq-plus]:rotate-45">
        <span>{question}</span>
        <span className="faq-plus shrink-0 transition-transform duration-200">
          <Plus className="h-4 w-4 text-muted-foreground" />
        </span>
      </AccordionTrigger>

      <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground [&_a]:font-semibold [&_a]:text-[#22577A] [&_a]:underline-offset-4 hover:[&_a]:underline [&_p]:leading-7">
        <ReactMarkdown>{answer}</ReactMarkdown>
      </AccordionContent>
    </AccordionItem>
  );
}
