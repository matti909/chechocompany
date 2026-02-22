import { genetics } from '#site/content';
import { Footer } from '../components/footer';
import { GeneticsClient } from './genetics-client';

export default function GeneticsPage() {
  return (
    <div className="min-h-screen bg-black">
      <GeneticsClient genetics={genetics} />
      <Footer />
    </div>
  );
}
