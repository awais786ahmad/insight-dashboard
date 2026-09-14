import * as React from "react";
import { Plus, Table2, Trash2, X } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ConfirmDialog, RecordFormModal } from "@/components/dashboard/crud";
import { SettingsHeader } from "@/components/settings/settings-header";
import { crmCampaigns, dataTableSeed, type ColumnType, type DataColumn, type DataTable } from "@/data/crm";

const columnTypes: ColumnType[] = ["Text", "Number", "Date", "Yes/No"];

const slug = (name: string, i: number) =>
  `${name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") || "col"}_${i}`;

type DraftColumn = { name: string; type: ColumnType; defaultValue: string };

const emptyTableForm = {
  name: "",
  campaign: crmCampaigns[0]!,
  columns: [{ name: "", type: "Text" as ColumnType, defaultValue: "" }] as DraftColumn[],
};

export function DataTablesPage() {
  const [tables, setTables] = React.useState<DataTable[]>(dataTableSeed);
  const [activeId, setActiveId] = React.useState<string>(dataTableSeed[0]?.id ?? "");
  const [formOpen, setFormOpen] = React.useState(false);
  const [form, setForm] = React.useState(emptyTableForm);
  const [deletingRow, setDeletingRow] = React.useState<{ tableId: string; rowId: string } | null>(null);
  const [deletingTable, setDeletingTable] = React.useState<DataTable | null>(null);
  const [newRow, setNewRow] = React.useState<Record<string, string>>({});

  const active = tables.find((t) => t.id === activeId) ?? null;

  React.useEffect(() => {
    if (!active) return;
    const seed: Record<string, string> = {};
    active.columns.forEach((c) => (seed[c.id] = c.defaultValue));
    setNewRow(seed);
  }, [activeId]); // eslint-disable-line react-hooks/exhaustive-deps

  const resetNewRow = (table: DataTable) => {
    const seed: Record<string, string> = {};
    table.columns.forEach((c) => (seed[c.id] = c.defaultValue));
    setNewRow(seed);
  };

  const addRow = () => {
    if (!active) return;
    const hasValue = active.columns.some((c) => (newRow[c.id] ?? "").trim());
    if (!hasValue) {
      toast.error("Fill at least one cell before adding the row");
      return;
    }
    const row = { id: crypto.randomUUID(), ...newRow };
    setTables((ts) => ts.map((t) => (t.id === active.id ? { ...t, rows: [...t.rows, row] } : t)));
    resetNewRow(active);
    toast.success("Row added");
  };

  const editCell = (rowId: string, colId: string, value: string) =>
    setTables((ts) =>
      ts.map((t) =>
        t.id === activeId
          ? { ...t, rows: t.rows.map((r) => (r["id"] === rowId ? { ...r, [colId]: value } : r)) }
          : t,
      ),
    );

  const updateColumn = (i: number, patch: Partial<DraftColumn>) =>
    setForm((f) => ({ ...f, columns: f.columns.map((c, idx) => (idx === i ? { ...c, ...patch } : c)) }));

  const createTable = () => {
    const name = form.name.trim();
    const cols = form.columns.filter((c) => c.name.trim());
    if (!name || !cols.length) {
      toast.error("A table needs a name and at least one column");
      return;
    }
    const columns: DataColumn[] = cols.map((c, i) => ({
      id: slug(c.name, i),
      name: c.name.trim(),
      type: c.type,
      defaultValue: c.defaultValue,
    }));
    const table: DataTable = {
      id: crypto.randomUUID(),
      name,
      campaign: form.campaign,
      createdAt: "Today",
      columns,
      rows: [],
    };
    setTables((ts) => [table, ...ts]);
    setActiveId(table.id);
    setForm(emptyTableForm);
    toast.success("Table created");
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <SettingsHeader
        title="Data tables"
        description="Spreadsheet-style datasets your campaigns and AI agents can read from."
      />

      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <Card className="h-fit">
          <CardContent className="space-y-1 p-3">
            <Button
              className="mb-2 w-full justify-start"
              variant="outline"
              onClick={() => {
                setForm(emptyTableForm);
                setFormOpen(true);
              }}
            >
              <Plus className="mr-2 size-4" />
              Create new table
            </Button>
            {tables.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveId(t.id)}
                className={`flex w-full items-start gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  t.id === activeId ? "bg-accent-soft text-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Table2 className="mt-0.5 size-4 shrink-0" />
                <span className="min-w-0">
                  <span className="block truncate font-medium">{t.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">{t.rows.length} rows</span>
                </span>
              </button>
            ))}
          </CardContent>
        </Card>

        {active ? (
          <Card>
            <CardContent className="p-0">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
                <div>
                  <h2 className="text-base font-medium">{active.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    Created {active.createdAt} · {active.columns.length} columns
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{active.campaign}</Badge>
                  <Button variant="ghost" size="icon" aria-label="Delete table" onClick={() => setDeletingTable(active)}>
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12" />
                      {active.columns.map((c) => (
                        <TableHead key={c.id} className="min-w-40">
                          {c.name}
                          <span className="ml-2 text-xs font-normal text-muted-foreground">{c.type}</span>
                        </TableHead>
                      ))}
                      <TableHead className="w-12" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-muted/40">
                      <TableCell>
                        <Button size="icon" variant="ghost" aria-label="Add row" onClick={addRow}>
                          <Plus className="size-4" />
                        </Button>
                      </TableCell>
                      {active.columns.map((c) => (
                        <TableCell key={c.id}>
                          <Input
                            value={newRow[c.id] ?? ""}
                            onChange={(e) => setNewRow((r) => ({ ...r, [c.id]: e.target.value }))}
                            onKeyDown={(e) => e.key === "Enter" && addRow()}
                            placeholder={c.name}
                            type={c.type === "Number" ? "number" : c.type === "Date" ? "date" : "text"}
                            className="h-8 border-transparent bg-background"
                          />
                        </TableCell>
                      ))}
                      <TableCell />
                    </TableRow>
                    {active.rows.map((row) => (
                      <TableRow key={row["id"]}>
                        <TableCell className="text-xs text-muted-foreground">•</TableCell>
                        {active.columns.map((c) => (
                          <TableCell key={c.id}>
                            <Input
                              value={row[c.id] ?? ""}
                              onChange={(e) => editCell(row["id"]!, c.id, e.target.value)}
                              type={c.type === "Number" ? "number" : c.type === "Date" ? "date" : "text"}
                              className="h-8 border-transparent bg-transparent hover:border-border focus:border-ring"
                            />
                          </TableCell>
                        ))}
                        <TableCell>
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label="Delete row"
                            onClick={() => setDeletingRow({ tableId: active.id, rowId: row["id"]! })}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {!active.rows.length ? (
                      <TableRow>
                        <TableCell
                          colSpan={active.columns.length + 2}
                          className="py-10 text-center text-sm text-muted-foreground"
                        >
                          No rows yet — fill the row above and press the plus button.
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="py-16 text-center text-sm text-muted-foreground">
              Create a table to get started.
            </CardContent>
          </Card>
        )}
      </div>

      <RecordFormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        title="New data table"
        description="Define the columns, their data type and an optional default value."
        mode="create"
        onSubmit={createTable}
        onSaveDraft={() => toast.info("Table saved as draft")}
      >
        <div className="space-y-2">
          <Label htmlFor="dt-name">Table name</Label>
          <Input id="dt-name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <Label>Campaign</Label>
          <Select value={form.campaign} onValueChange={(v) => setForm((f) => ({ ...f, campaign: v }))}>
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
        <div className="space-y-3">
          <Label>Columns</Label>
          {form.columns.map((c, i) => (
            <div key={i} className="flex flex-wrap items-center gap-2">
              <Input
                value={c.name}
                onChange={(e) => updateColumn(i, { name: e.target.value })}
                placeholder="Column name"
                className="min-w-32 flex-1"
              />
              <Select value={c.type} onValueChange={(v) => updateColumn(i, { type: v as ColumnType })}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {columnTypes.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                value={c.defaultValue}
                onChange={(e) => updateColumn(i, { defaultValue: e.target.value })}
                placeholder="Default"
                className="w-28"
              />
              <Button
                variant="ghost"
                size="icon"
                aria-label="Remove column"
                onClick={() => setForm((f) => ({ ...f, columns: f.columns.filter((_, idx) => idx !== i) }))}
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setForm((f) => ({ ...f, columns: [...f.columns, { name: "", type: "Text", defaultValue: "" }] }))}
          >
            <Plus className="mr-2 size-4" />
            Add column
          </Button>
        </div>
      </RecordFormModal>

      <ConfirmDialog
        open={!!deletingRow}
        onOpenChange={(v) => !v && setDeletingRow(null)}
        title="Delete this row?"
        description="The row will be removed from the table."
        confirmLabel="Delete row"
        destructive
        onConfirm={() => {
          setTables((ts) =>
            ts.map((t) =>
              t.id === deletingRow?.tableId ? { ...t, rows: t.rows.filter((r) => r["id"] !== deletingRow.rowId) } : t,
            ),
          );
          setDeletingRow(null);
          toast.success("Row deleted");
        }}
      />

      <ConfirmDialog
        open={!!deletingTable}
        onOpenChange={(v) => !v && setDeletingTable(null)}
        title={`Delete "${deletingTable?.name}"?`}
        description="All rows in this table will be permanently removed."
        confirmLabel="Delete table"
        destructive
        onConfirm={() => {
          const rest = tables.filter((t) => t.id !== deletingTable?.id);
          setTables(rest);
          setActiveId(rest[0]?.id ?? "");
          setDeletingTable(null);
          toast.success("Table deleted");
        }}
      />
    </div>
  );
}
