import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column, type FilterOption } from '@/components/data-table';
import { ToneBadge, type Tone, type ToneLabel } from '@/components/tone-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Kontak {
    id: number;
    nama: string;
    jabatan: string;
    perusahaan: string;
    email: string;
    telepon: string;
    status: ToneLabel;
}

const STATUS_OPTIONS: { value: string; tone: Tone }[] = [
    { value: 'Aktif', tone: 'success' },
    { value: 'Baru', tone: 'info' },
    { value: 'Tidak Aktif', tone: 'warning' },
];

const emptyForm = { nama: '', jabatan: '', perusahaan: '', email: '', telepon: '', status: 'Baru' };

export default function CrmKontak({ kontaks }: { kontaks: Record<string, any>[] }) {
    const [rows, setRows] = useState<Kontak[]>(() =>
        kontaks.map((k) => ({
            id: Number(k.id),
            nama: String(k.nama),
            jabatan: String(k.jabatan),
            perusahaan: String(k.perusahaan),
            email: String(k.email),
            telepon: String(k.telepon),
            status: k.status as ToneLabel,
        })),
    );
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Kontak | null>(null);
    const [form, setForm] = useState(emptyForm);

    const openAdd = () => {
        setEditing(null);
        setForm(emptyForm);
        setOpen(true);
    };

    const openEdit = (row: Kontak) => {
        setEditing(row);
        setForm({
            nama: row.nama,
            jabatan: row.jabatan,
            perusahaan: row.perusahaan,
            email: row.email,
            telepon: row.telepon,
            status: row.status.label,
        });
        setOpen(true);
    };

    const save = () => {
        const status = STATUS_OPTIONS.find((s) => s.value === form.status) ?? STATUS_OPTIONS[1];
        if (editing) {
            setRows((prev) =>
                prev.map((r) =>
                    r.id === editing.id
                        ? { ...r, ...form, status: { label: status.value, tone: status.tone } }
                        : r,
                ),
            );
            toast.success(`Kontak ${form.nama} diperbarui.`);
        } else {
            const id = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
            setRows((prev) => [
                ...prev,
                { id, ...form, status: { label: status.value, tone: status.tone } },
            ]);
            toast.success(`Kontak ${form.nama} ditambahkan.`);
        }
        setOpen(false);
    };

    const set = (key: keyof typeof emptyForm) => (e: { target: { value: string } }) =>
        setForm((f) => ({ ...f, [key]: e.target.value }));

    const columns: Column<Kontak>[] = [
        { key: 'nama', header: 'Nama', sortValue: (r) => r.nama },
        { key: 'jabatan', header: 'Jabatan', mobileHidden: true, sortValue: (r) => r.jabatan },
        { key: 'perusahaan', header: 'Perusahaan', sortValue: (r) => r.perusahaan },
        { key: 'email', header: 'Email', mobileHidden: true },
        { key: 'telepon', header: 'Telepon', mobileHidden: true },
        {
            key: 'status',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
    ];

    const filters: FilterOption[] = [
        {
            key: 'status',
            label: 'Status',
            options: STATUS_OPTIONS.map((s) => ({ value: s.value, label: s.value })),
            match: (row: any, value: string) => row.status.label === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Kontak"
                description="Semua orang yang bisa Anda hubungi di perusahaan klien."
                breadcrumbs={[{ label: 'CRM', href: '/crm' }, { label: 'Kontak' }]}
                actions={
                    <Button size="sm" onClick={openAdd}>
                        <Plus className="mr-2 h-4 w-4" /> Tambah Kontak
                    </Button>
                }
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Semua Kontak</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['nama', 'perusahaan', 'email']}
                        filters={filters}
                        pageSize={10}
                        onEdit={openEdit}
                        emptyTitle="Belum ada kontak"
                        emptyDescription="Tambahkan kontak pertama Anda, misalnya PIC pengadaan di perusahaan klien, lewat tombol Tambah Kontak di atas."
                    />
                </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editing ? 'Ubah Kontak' : 'Tambah Kontak'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                        <div className="grid gap-2">
                            <Label htmlFor="nama">Nama</Label>
                            <Input id="nama" value={form.nama} onChange={set('nama')} placeholder="cth: Budi Santoso" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="perusahaan">Perusahaan</Label>
                                <Input id="perusahaan" value={form.perusahaan} onChange={set('perusahaan')} placeholder="cth: PT Maju Jaya" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="jabatan">Jabatan</Label>
                                <Input id="jabatan" value={form.jabatan} onChange={set('jabatan')} placeholder="cth: Manager Pengadaan" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={form.email} onChange={set('email')} placeholder="nama@perusahaan.com" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="telepon">Telepon</Label>
                                <Input id="telepon" value={form.telepon} onChange={set('telepon')} placeholder="08xx-xxxx-xxxx" />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>Status</Label>
                            <Select value={form.status} onValueChange={(v) => setForm((f) => ({ ...f, status: v }))}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {STATUS_OPTIONS.map((s) => (
                                        <SelectItem key={s.value} value={s.value}>
                                            {s.value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setOpen(false)}>
                            Batal
                        </Button>
                        <Button onClick={save} disabled={!form.nama.trim() || !form.perusahaan.trim()}>
                            Simpan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
