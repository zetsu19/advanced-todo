'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client/react';
import gql from 'graphql-tag';
import { Loader2, ShieldAlert, Layers } from 'lucide-react';

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      xp
      level
    }
  }
`;

interface User {
  id: string;
  name: string;
  xp: number;
  level: number;
}

const Page = () => {
  const router = useRouter();

  const { data, loading, error } = useQuery<{
    getUsers: User[];
  }>(GET_USERS);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#09090b] flex items-center justify-center font-mono p-4">
        <div className="flex items-center gap-3 text-xs tracking-widest text-[#71717a] uppercase">
          <Loader2 className="w-4 h-4 animate-spin text-[#52525b]" />
          Fetching Registry Grid...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-[#09090b] flex items-center justify-center font-mono p-4">
        <div className="border border-[#27272a] bg-[#09090b] p-6 max-w-sm w-full relative">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-[#71717a] mt-0.5" />
            <div>
              <div className="text-[10px] text-[#71717a] tracking-[0.2em] uppercase">
                // CRITICAL_ERR
              </div>
              <p className="text-xs text-[#e4e4e7] break-all">
                {error.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const users = data?.getUsers ?? [];

  return (
    <div className="min-h-screen w-full bg-[#09090b] text-[#e4e4e7] flex items-center justify-center font-mono p-4">
      <div className="relative w-full max-w-md border border-[#27272a] bg-[#09090b] p-8">
        <div className="mb-8 flex items-center justify-between border-b border-[#18181b] pb-4">
          <div>
            <div className="text-[10px] text-[#71717a] tracking-[0.2em] uppercase">
              // DATA.QUERY_v4.0
            </div>
            <h1 className="text-base font-light tracking-widest uppercase">
              Active Cores
            </h1>
          </div>

          <Layers className="w-4 h-4 text-[#3f3f3f]" />
        </div>

        <div className="space-y-2">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => router.push(`/users/${user.id}`)}
              className="w-full text-left group relative flex items-center justify-between border border-[#18181b] bg-[#18181b]/20 p-3 hover:border-[#27272a] transition-all duration-150 cursor-pointer"
            >
              <div>
                <div className="text-xs tracking-wider text-[#e4e4e7] group-hover:text-white">
                  {user.name}
                </div>

                <div className="text-[9px] text-[#52525b]">
                  ID: <span className="text-[#71717a]">{user.id}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <div className="text-[9px] tracking-widest text-[#71717a] uppercase">
                    XP
                  </div>
                  <div className="text-xs">{user.xp ?? 0}</div>
                </div>

                <div className="border-l border-[#27272a] pl-4">
                  <div className="text-[9px] tracking-widest text-[#71717a] uppercase">
                    LVL
                  </div>
                  <div className="text-xs">{user.level ?? 1}</div>
                </div>
              </div>
            </button>
          ))}

          {users.length === 0 && (
            <div className="text-center py-8 text-xs text-[#52525b] uppercase border border-dashed border-[#18181b]">
              No identities initialized
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between text-[9px] text-[#52525b] border-t border-[#18181b] pt-4 uppercase">
          <span>Grid Synced</span>
          <span>Records // {users.length}</span>
        </div>
      </div>
    </div>
  );
};

export default Page;
