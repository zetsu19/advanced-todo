import { Loader2 } from 'lucide-react';

export default function LoadingComponent() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4">
      <div className="flex items-center gap-2.5 text-sm text-gray-400 font-light tracking-wide">
        <Loader2 className="w-4 h-4 animate-spin text-gray-300" />
        Loading…
      </div>
    </div>
  );
}
