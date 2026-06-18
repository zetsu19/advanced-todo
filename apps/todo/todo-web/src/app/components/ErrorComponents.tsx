type ErrorComponentProps = {
  error?: Error | null;
  Id?: string | string[];
};

export default function ErrorComponent({ error, Id }: ErrorComponentProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <p className="text-xs text-gray-400">
        {!Id ? 'Missing user ID.' : error?.message || 'An error occurred.'}
      </p>
    </div>
  );
}
