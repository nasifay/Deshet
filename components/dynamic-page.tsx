import React from "react";
import { Card, CardContent } from "./ui/Card";

interface DynamicPageProps {
  title: string;
  content: string;
  image?: string;
  sections?: Array<{
    title: string;
    content: string;
    image?: string;
  }>;
}

export default function DynamicPage({ title, content, image, sections }: DynamicPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#128341] mb-6">{title}</h1>
          {image && (
            <img
              src={image}
              alt={title}
              className="w-full max-w-4xl mx-auto h-64 object-cover rounded-lg mb-6"
            />
          )}
          <div className="max-w-4xl mx-auto text-left">
            <p className="text-lg text-gray-700 leading-relaxed">{content}</p>
          </div>
        </section>

        {/* Additional Sections */}
        {sections && sections.map((section, index) => (
          <Card key={index} className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-[#128341] mb-4">{section.title}</h2>
              {section.image && (
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <p className="text-gray-700 leading-relaxed">{section.content}</p>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
}