import { HeroSection } from '@/components/features/landing/HeroSection';
import { DreamSubmissionForm } from '@/components/features/landing/DreamSubmissionForm';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <DreamSubmissionForm />
    </main>
  );
} 