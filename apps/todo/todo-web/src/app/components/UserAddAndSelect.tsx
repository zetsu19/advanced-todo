'use client';

import * as React from 'react';
import { Loader2, Plus, ArrowRight } from 'lucide-react';

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

export default function Page() {
  const { data, loading } = useGetUser();
  const { handleCreateUser, creatingLoading } = useCreateUser();
  const { handleDeleteUserById } = useDeleteUserById();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const router = useRouter();

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="min-h-screen w-full bg-gray-50/40 flex flex-col items-center justify-start p-6 font-sans antialiased">
      <div className="w-full max-w-md space-y-4 mt-12">
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
                  User Profile Name
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={creatingLoading}
                    placeholder="Enter name..."
                    className={`h-9 px-3`}
                  />
                </div>
                <Button
                  onClick={() => handleCreateUser(name)}
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
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden divide-y divide-gray-100">
          {data?.getUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => router.push(`/users/${user.id}`)}
              className="w-full text-left flex items-center justify-between px-4 py-3.5 hover:bg-gray-50/80 transition-colors"
            >
              <div className="min-w-0 pr-4">
                <div className="text-sm font-medium text-gray-800 truncate">
                  {user.name}
                </div>
                <div className="text-xs text-gray-400 font-mono text-[11px] truncate">
                  {user.id}
                </div>
              </div>
              <div className="flex items-center gap-5 shrink-0">
                <div className="text-right">
                  <div className="text-[10px] uppercase text-gray-400">XP</div>
                  <div className="text-sm font-medium text-gray-700">
                    {user.xp}
                  </div>
                </div>
                <div className="text-right border-l border-gray-100 pl-5">
                  <div className="text-[10px] uppercase text-gray-400">LVL</div>
                  <div className="text-sm font-medium text-gray-700">
                    {user.level}
                  </div>
                </div>
              </div>
            </button>
          ))}
          {data?.getUsers.length === 0 && (
            <div className="py-12 text-center text-xs text-gray-400">
              No profiles found. Click "Add User" to create a new profile.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
