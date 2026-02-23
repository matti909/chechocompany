import { genetics } from '#site/content';
import { Footer } from '../components/footer';
import { GeneticsClient } from './genetics-client';

export default function GeneticsPage() {
  return (
    <div className="min-h-screen bg-[#080f08]">
      <GeneticsClient genetics={genetics} />
      <Footer />
    </div>
  );
}
