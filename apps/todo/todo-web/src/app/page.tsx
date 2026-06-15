'use client';

import { Button } from '@advanced-monorepo/shadcn';
import { Input } from '@advanced-monorepo/shadcn';
import { useMutation, useQuery } from '@apollo/client/react';
import gql from 'graphql-tag';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const CREATE_USER = gql`
  mutation CreateUser($name: String!) {
    createUser(name: $name) {
      message
    }
  }
`;

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

export default function LoginPage() {
  const [name, setName] = useState('');
  const [createUser, { loading }] = useMutation(CREATE_USER);

  const newUser = async () => {
    if (!name.trim()) return;
    try {
      const res = await createUser({
        variables: { name },
      });
      if (res) {
        toast.success('Identity registered', {
          className:
            'bg-[#18181b] border border-[#27272a] text-[#a1a1aa] font-mono text-xs',
        });
        setName('');
      }
    } catch (error) {
      toast.error('System bypass failed', {
        className:
          'bg-[#18181b] border border-[#27272a] text-[#e4e4e7] font-mono text-xs',
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#09090b] text-[#e4e4e7] flex items-center justify-center font-mono p-4 antialiased">
      <div className="relative w-full max-w-sm border border-[#27272a] bg-[#09090b] p-8 shadow-sm">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#52525b]" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#52525b]" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#52525b]" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#52525b]" />

        <div className="mb-8 space-y-1">
          <div className="text-[10px] text-[#71717a] tracking-[0.2em] uppercase">
            // ZETSU.AUTH_v4.0
          </div>
          <h1 className="text-base font-light tracking-widest text-[#f4f4f5] uppercase">
            Initialize Core
          </h1>
        </div>

        <div className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[9px] tracking-wider text-[#71717a] uppercase pl-0.5">
              User Designation
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              placeholder="ENTER NICKNAME..."
              className="w-full bg-[#18181b]/30 border-[#27272a] text-[#e4e4e7] placeholder:text-[#3f3f46] font-mono text-xs tracking-wider focus:border-[#52525b] focus:ring-0 rounded-none h-11"
            />
          </div>

          <Button
            onClick={newUser}
            disabled={loading || !name.trim()}
            className="w-full bg-[#18181b] text-[#a1a1aa] border border-[#27272a] hover:bg-[#27272a] hover:text-[#f4f4f5] rounded-none transition-all duration-150 h-11 font-mono text-xs tracking-widest uppercase disabled:opacity-20"
          >
            {loading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin mx-auto text-[#71717a]" />
            ) : (
              <span className="flex items-center justify-center gap-2">
                Execute Sync <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </span>
            )}
          </Button>
        </div>

        <div className="mt-8 flex items-center justify-between text-[9px] text-[#52525b] border-t border-[#18181b] pt-4 tracking-wider uppercase">
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#3f3f46]" />
            Standby
          </span>
          <span>Node // 2026</span>
        </div>
      </div>
    </div>
  );
}
