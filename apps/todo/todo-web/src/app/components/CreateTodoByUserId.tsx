'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { useParams } from 'next/navigation';
import { Loader2, CheckCircle2, Circle, Plus } from 'lucide-react';
import { Button, Input, InputGroupTextarea } from '@advanced-monorepo/shadcn';
import useGetTodo from '../hooks/useGetTodo';
import useCreateTodo from '../hooks/useCreateTodo';
import useGetUserById from '../hooks/useGetUserById';
import LoadingComponent from '../components/Loading';
import ErrorComponent from '../components/ErrorComponents';
import useDeleteTodoById from '../hooks/useDeleteTodoById';
import useDeleteUserById from '../hooks/useDeleteUserById';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@advanced-monorepo/shadcn';

const schema = z.object({
  title: z.string().min(5, 'Min 5 characters').max(32, 'Max 32 characters'),
  description: z
    .string()
    .min(20, 'Min 20 characters')
    .max(100, 'Max 100 characters'),
  xpReward: z.number().min(0),
});

const input =
  'w-full bg-white border border-gray-200 text-gray-900 text-xs rounded-xl focus:border-gray-300 focus:ring-0 transition-colors placeholder:text-gray-300';

export default function Page() {
  const params = useParams();
  const Id = params?.Id;
  const { createTodo, createTodoLoading } = useCreateTodo();
  const { todoData, refetch } = useGetTodo(Id as string);
  const { data, loading: userLoading, error } = useGetUserById(Id as string);
  const { handleDeleteTodoById, loading } = useDeleteTodoById();
  const { handleDeleteUserById, deletingUser } = useDeleteUserById(
    Id as string,
  );

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { title: '', description: '', xpReward: 0 },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await createTodo({ variables: { userId: Id, input: values } });
      form.reset();
      refetch();
    } catch {
      throw new Error('Failed to create todo. Please try again.');
    }
  };

  if (userLoading) return <LoadingComponent />;

  if (error || !Id) return <ErrorComponent error={error} Id={Id} />;

  const user = data?.getUserById;
  const todos = todoData?.getUserById?.todos ?? [];

  return (
    <div className="min-h-screen bg-gray-50/60 flex items-center justify-center p-6 antialiased font-sans">
      <div className="w-full max-w-2xl space-y-4">
        {user && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-3.5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-400 font-mono">
                {user.id.slice(0, 12)}…
              </p>
            </div>
            <div className="flex items-center gap-5 text-center">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">
                  XP
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  {user.xp ?? 0}
                </p>
              </div>
              <div className="w-px h-6 bg-gray-100" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">
                  Level
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  {user.level ?? 1}
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col gap-4">
            <p className="text-sm font-semibold text-gray-900">New Todo</p>
            <form
              id="todo-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3 flex-1"
            >
              <FieldGroup className="flex flex-col gap-3">
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field: f, fieldState }) => (
                    <Field className="space-y-1">
                      <FieldLabel className="text-xs font-medium text-gray-600">
                        Title
                      </FieldLabel>
                      <Input
                        {...f}
                        placeholder="What needs to be done?"
                        className={`${input} h-8 px-3`}
                      />
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-[11px] text-red-400"
                        />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="description"
                  control={form.control}
                  render={({ field: f, fieldState }) => (
                    <Field className="space-y-1">
                      <FieldLabel className="text-xs font-medium text-gray-600 flex items-center justify-between">
                        Description{' '}
                        <span className="text-gray-300 font-normal">
                          {f.value.length}/100
                        </span>
                      </FieldLabel>
                      <InputGroupTextarea
                        {...f}
                        placeholder="Add some context…"
                        rows={3}
                        className={`${input} p-2.5 resize-none`}
                      />
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-[11px] text-red-400"
                        />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="xpReward"
                  control={form.control}
                  render={({ field: f, fieldState }) => (
                    <Field className="space-y-1">
                      <FieldLabel className="text-xs font-medium text-gray-600">
                        XP Reward
                      </FieldLabel>
                      <Input
                        type="number"
                        placeholder="0"
                        value={f.value || ''}
                        onChange={(e) => f.onChange(Number(e.target.value))}
                        className={`${input} h-8 px-3`}
                      />
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-[11px] text-red-400"
                        />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 mt-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  className="h-7 px-3 text-xs text-gray-500 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  form="todo-form"
                  disabled={createTodoLoading}
                  className="h-7 px-3 text-xs text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-40 flex items-center gap-1.5 font-medium"
                >
                  {createTodoLoading ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <>
                      <Plus className="w-3 h-3" /> Create
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">Todos</p>
              <span className="text-xs text-gray-400">
                {todos.length} task{todos.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto max-h-72 pr-0.5">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/70 hover:bg-gray-100/60 transition-colors duration-150"
                >
                  <div className="mt-0.5 shrink-0">
                    {todo.isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-gray-300" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs font-medium truncate ${todo.isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'}`}
                    >
                      {todo.title}
                    </p>
                    <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed mt-0.5">
                      {todo.description}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      +{todo.xpReward} XP
                    </p>
                  </div>
                </div>
              ))}
              {todos.length === 0 && (
                <div className="py-14 text-center">
                  <p className="text-xs text-gray-400">No todos yet</p>
                  <p className="text-[11px] text-gray-300 mt-0.5">
                    Create one on the left
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
