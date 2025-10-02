import Section from "~/components/ui/Section";
import Container from "~/components/ui/Container";

export default function Page() {
  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-bold mb-2">News</h1>
        <p className="text-gray-600">News listing will appear here.</p>
      </Container>
    </Section>
  );
}