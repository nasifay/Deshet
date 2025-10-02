import Section from "~/components/ui/Section";
import Container from "~/components/ui/Container";
import Button from "~/components/ui/Button";

export default function Page() {
  return (
    <Section>
      <Container className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-2">Donate</h1>
        <p className="text-gray-600 mb-4">Support our mission. Choose an amount to donate.</p>
        <div className="flex gap-3">
          <Button intent="primary">Donate $25</Button>
          <Button intent="primary" variant="outline">Donate $50</Button>
          <Button intent="primary" variant="ghost">Custom</Button>
        </div>
      </Container>
    </Section>
  );
}