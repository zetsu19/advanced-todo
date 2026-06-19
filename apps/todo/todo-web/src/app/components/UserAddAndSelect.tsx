'use client';

import * as React from 'react';
import { Loader2, Plus, ArrowRight, Trash2 } from 'lucide-react';
import {
  Button,
  Input,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@advanced-monorepo/shadcn';
import useGetUser from '../hooks/useGetUser';
import useCreateUser from '../hooks/useCreateUser';
import { useRouter } from 'next/navigation';
import LoadingComponent from './Loading';
import useDeleteUserById from '../hooks/useDeleteUserById';

// ── XP helpers ────────────────────────────────────────────────────────────────
const xpForLevel = (level: number) => (100 * level * (level - 1)) / 2;
const getLevel = (totalXp: number) => {
  let level = 1;
  while (xpForLevel(level + 1) <= totalXp) level++;
  return level;
};
const xpWithinLevel = (totalXp: number) => {
  const level = getLevel(totalXp);
  const current = totalXp - xpForLevel(level);
  const needed = xpForLevel(level + 1) - xpForLevel(level);
  return { current, needed, level };
};
// ─────────────────────────────────────────────────────────────────────────────

export default function Page() {
  const { data, loading, refetch } = useGetUser();
  const { handleCreateUser, creatingLoading } = useCreateUser();
  const { handleDeleteUserById, deletingUser } = useDeleteUserById();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const router = useRouter();

  if (loading) return <LoadingComponent />;

  const onCreateUser = async () => {
    if (!name.trim()) return;
    try {
      await handleCreateUser(name);
      setName('');
      setOpen(false);
      refetch();
    } catch (err) {
      console.error('Failed to create user:', err);
    }
  };

  const onDeleteUser = async (id: string) => {
    setDeletingId(id);
    try {
      await handleDeleteUserById(id);
      refetch();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50/40 flex flex-col items-center justify-start p-6 font-sans antialiased">
      <div className="w-full max-w-md space-y-4 mt-12">
        {/* Header */}
        <div className="flex items-center justify-between px-1">
          <h1 className="text-sm font-semibold text-gray-800">Profiles</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="h-8 px-3 text-xs text-white bg-gray-900 rounded-xl hover:bg-gray-800 flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
              <DialogHeader className="text-left space-y-1">
                <DialogTitle className="text-sm font-semibold">
                  New Profile
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={creatingLoading}
                  placeholder="Enter name..."
                  className="h-9 px-3 rounded-xl border-gray-200 text-sm focus:border-gray-300 focus:ring-0"
                />
                <Button
                  onClick={onCreateUser}
                  disabled={creatingLoading || !name.trim()}
                  className="w-full h-9 text-xs bg-gray-900 text-white rounded-xl flex items-center justify-center gap-1.5"
                >
                  {creatingLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>
                      Create Profile <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* User list */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden divide-y divide-gray-100">
          {data?.getUsers.map((user) => {
            const { current, needed, level } = xpWithinLevel(user.xp ?? 0);
            const pct = Math.min((current / needed) * 100, 100);

            return (
              <div
                key={user.id}
                className="group flex items-center justify-between px-4 py-3.5 hover:bg-gray-50/80 transition-colors gap-4"
              >
                {/* Name + XP bar */}
                <div
                  className="min-w-0 flex-1 cursor-pointer space-y-1.5"
                  onClick={() => router.push(`/users/${user.id}`)}
                >
                  <div className="text-sm font-medium text-gray-800 truncate">
                    {user.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1 flex-1 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-800 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 tabular-nums shrink-0">
                      {current}/{needed} XP
                    </span>
                  </div>
                </div>

                {/* Level + delete */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-center">
                    <div className="text-[10px] uppercase text-gray-400">
                      Lvl
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      {level}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    onClick={() => onDeleteUser(user.id)}
                    disabled={deletingUser}
                  >
                    {deletingId === user.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </Button>
                </div>
              </div>
            );
          })}

          {data?.getUsers.length === 0 && (
            <div className="py-12 text-center text-xs text-gray-400">
              No profiles yet. Click "Add User" to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
