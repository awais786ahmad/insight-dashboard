import * as React from "react";
import { CalendarClock, CheckCircle2, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConfirmDialog, DetailDrawer, RecordFormModal } from "@/components/dashboard/crud";
import { FieldRow, SettingsHeader } from "@/components/settings/settings-header";
import {
  crmAgents,
  crmCampaigns,
  leadSeed,
  taskPriorities,
  taskSeed,
  taskStatuses,
  type Task,
} from "@/data/crm";

const statusTone: Record<Task["status"], string> = {
  Pending: "bg-sky-500/15 text-sky-600 border-sky-500/30",
  Active: "bg-amber-500/15 text-amber-600 border-amber-500/30",
  Overdue: "bg-rose-500/15 text-rose-600 border-rose-500/30",
  Completed: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
};

const priorityTone: Record<Task["priority"], string> = {
  Low: "text-muted-foreground",
  Medium: "text-amber-600",
  High: "text-rose-600",
};

const emptyForm = {
  title: "",
  description: "",
  priority: "Medium" as Task["priority"],
  assignee: crmAgents[0]!,
  dueDate: "",
  relatedLead: leadSeed[0]!.name,
  relatedCampaign: crmCampaigns[0]!,
  reason: "",
};

export function TasksPage() {
  const [list, setList] = React.useState<Task[]>(taskSeed);
  const [query, setQuery] = React.useState("");
  const [tab, setTab] = React.useState<"All" | Task["status"]>("All");
  const [formOpen, setFormOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Task | null>(null);
  const [active, setActive] = React.useState<Task | null>(null);
  const [deleting, setDeleting] = React.useState<Task | null>(null);
  const [form, setForm] = React.useState(emptyForm);

  const filtered = list.filter(
    (t) =>
      (tab === "All" || t.status === tab) &&
      (t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.assignee.toLowerCase().includes(query.toLowerCase())),
  );

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditing(task);
    setForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      assignee: task.assignee,
      dueDate: task.dueDate,
      relatedLead: task.relatedLead,
      relatedCampaign: task.relatedCampaign,
      reason: task.reason,
    });
    setFormOpen(true);
  };

  const save = () => {
    if (!form.title.trim()) {
      toast.error("Task title is required");
      return;
    }
    if (editing) {
      const next = { ...editing, ...form, title: form.title.trim() };
      setList((l) => l.map((t) => (t.id === editing.id ? next : t)));
      setActive((a) => (a && a.id === editing.id ? next : a));
      toast.success("Task updated");
      return;
    }
    setList((l) => [
      {
        id: crypto.randomUUID(),
        ...form,
        title: form.title.trim(),
        status: "Pending",
        createdBy: "You",
        dueDate: form.dueDate || "No due date",
        reason: form.reason || "Created manually.",
        activity: [{ id: "a1", when: "just now", text: "Task created manually" }],
      },
      ...l,
    ]);
    toast.success("Task created");
  };

  const complete = (task: Task) => {
    const next: Task = {
      ...task,
      status: "Completed",
      activity: [{ id: crypto.randomUUID(), when: "just now", text: "Marked complete" }, ...task.activity],
    };
    setList((l) => l.map((t) => (t.id === task.id ? next : t)));
    setActive((a) => (a && a.id === task.id ? next : a));
    toast.success("Task completed");
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <SettingsHeader
        title="Tasks"
        description="Follow-ups and callbacks created by you, your team, automations or the AI agent after a call."
        actions={
          <Button onClick={openCreate}>
            <Plus className="mr-2 size-4" />
            New task
          </Button>
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
          <TabsList>
            <TabsTrigger value="All">All</TabsTrigger>
            {taskStatuses.map((s) => (
              <TabsTrigger key={s} value={s}>
                {s}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tasks or assignee" className="pl-9" />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Due</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((task) => (
                <TableRow key={task.id} className="cursor-pointer" onClick={() => setActive(task)}>
                  <TableCell>
                    <div className="font-medium">{task.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {task.relatedLead} · {task.relatedCampaign}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusTone[task.status]}`}>
                      {task.status}
                    </span>
                  </TableCell>
                  <TableCell className={`text-sm font-medium ${priorityTone[task.priority]}`}>{task.priority}</TableCell>
                  <TableCell className="text-sm">{task.assignee}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarClock className="size-3.5" />
                      {task.dueDate}
                    </span>
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={task.status === "Completed"}
                        onClick={() => complete(task)}
                        aria-label="Complete task"
                      >
                        <CheckCircle2 className="size-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleting(task)} aria-label="Delete task">
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {!filtered.length ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                    Nothing here. Tasks appear as your team and AI agents work leads.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <RecordFormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        title={editing ? "Edit task" : "New task"}
        description="Tasks can be linked to a lead and a campaign so the whole context travels with them."
        mode={editing ? "edit" : "create"}
        onSubmit={save}
        {...(editing ? {} : { onSaveDraft: () => toast.info("Task saved as draft") })}
      >
        <div className="space-y-2">
          <Label htmlFor="task-title">Title</Label>
          <Input
            id="task-title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="e.g. Call back Ali Raza"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="task-desc">Description</Label>
          <Textarea
            id="task-desc"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Priority</Label>
            <Select value={form.priority} onValueChange={(v) => setForm((f) => ({ ...f, priority: v as Task["priority"] }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {taskPriorities.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Assignee</Label>
            <Select value={form.assignee} onValueChange={(v) => setForm((f) => ({ ...f, assignee: v }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {crmAgents.map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Related lead</Label>
            <Select value={form.relatedLead} onValueChange={(v) => setForm((f) => ({ ...f, relatedLead: v }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {leadSeed.map((l) => (
                  <SelectItem key={l.id} value={l.name}>
                    {l.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Campaign</Label>
            <Select value={form.relatedCampaign} onValueChange={(v) => setForm((f) => ({ ...f, relatedCampaign: v }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {crmCampaigns.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="task-due">Due</Label>
          <Input
            id="task-due"
            value={form.dueDate}
            onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
            placeholder="e.g. Tomorrow, 12:00"
          />
        </div>
      </RecordFormModal>

      <DetailDrawer
        open={!!active}
        onOpenChange={(v) => !v && setActive(null)}
        title={active?.title ?? ""}
        description={active?.description ?? ""}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => active && openEdit(active)}>
              Edit task
            </Button>
            <Button disabled={active?.status === "Completed"} onClick={() => active && complete(active)}>
              Mark complete
            </Button>
          </div>
        }
      >
        {active ? (
          <div className="space-y-6 pt-4">
            <div className="rounded-xl border border-border p-4">
              <FieldRow
                label="Status"
                value={
                  <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusTone[active.status]}`}>
                    {active.status}
                  </span>
                }
              />
              <FieldRow label="Priority" value={active.priority} />
              <FieldRow label="Assignee" value={active.assignee} />
              <FieldRow label="Created by" value={active.createdBy} />
              <FieldRow label="Due" value={active.dueDate} />
              <FieldRow label="Lead" value={active.relatedLead} />
              <FieldRow label="Campaign" value={<Badge variant="outline">{active.relatedCampaign}</Badge>} />
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium">Why this task exists</h3>
              <p className="rounded-xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">{active.reason}</p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium">Activity</h3>
              <ol className="space-y-3 border-l border-border pl-4">
                {active.activity.map((a) => (
                  <li key={a.id} className="relative text-sm">
                    <span className="absolute -left-[21px] top-1.5 size-2 rounded-full bg-accent" />
                    <div>{a.text}</div>
                    <div className="text-xs text-muted-foreground">{a.when}</div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ) : null}
      </DetailDrawer>

      <ConfirmDialog
        open={!!deleting}
        onOpenChange={(v) => !v && setDeleting(null)}
        title={`Delete "${deleting?.title}"?`}
        description="The task and its activity history are removed permanently."
        confirmLabel="Delete task"
        destructive
        onConfirm={() => {
          setList((l) => l.filter((t) => t.id !== deleting?.id));
          setActive(null);
          setDeleting(null);
          toast.success("Task deleted");
        }}
      />
    </div>
  );
}
