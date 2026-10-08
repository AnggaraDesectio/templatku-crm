import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { EmptyState } from '@/components/empty-state';
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
import { Building2, MapPin, Plus, Users } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Perusahaan {
    id: number;
    nama: string;
    industri: string;
    kota: string;
    karyawan: number;
    kontak: number;
    deal_terbuka: number;
    nilai_pipeline_rp: string;
}

const emptyForm = { nama: '', industri: '', kota: '' };

export default function CrmPerusahaan({
    perusahaans,
}: {
    perusahaans: Perusahaan[];
}) {
    const [rows, setRows] = useState<Perusahaan[]>(perusahaans);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState(emptyForm);

    const save = () => {
        const id = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
        setRows((prev) => [
            ...prev,
            {
                id,
                nama: form.nama,
                industri: form.industri || 'Umum',
                kota: form.kota || '-',
                karyawan: 0,
                kontak: 0,
                deal_terbuka: 0,
                nilai_pipeline_rp: 'Rp 0',
            },
        ]);
        toast.success(`Perusahaan ${form.nama} ditambahkan.`);
        setForm(emptyForm);
        setOpen(false);
    };

    const set = (key: keyof typeof emptyForm) => (e: { target: { value: string } }) =>
        setForm((f) => ({ ...f, [key]: e.target.value }));

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Perusahaan"
                description="Perusahaan klien beserta pipeline yang berjalan."
                breadcrumbs={[{ label: 'CRM', href: '/crm' }, { label: 'Perusahaan' }]}
                actions={
                    <Button size="sm" onClick={() => setOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Tambah Perusahaan
                    </Button>
                }
            />
            {rows.length === 0 ? (
                <EmptyState
                    icon={<Building2 className="h-8 w-8" />}
                    title="Belum ada perusahaan klien"
                    description="Tambahkan perusahaan pertama Anda agar deal, kontak, dan pipeline punya tempat bernaung."
                    action={{ label: 'Tambah Perusahaan', onClick: () => setOpen(true) }}
                />
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {rows.map((p) => (
                        <Card key={p.id} className="shadow-sm">
                            <CardHeader className="pb-2">
                                <div className="flex items-start gap-3">
                                    <div className="bg-primary/10 text-primary shrink-0 rounded-xl p-2.5">
                                        <Building2 className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <CardTitle className="truncate text-base">{p.nama}</CardTitle>
                                        <p className="text-muted-foreground text-xs">{p.industri}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                                    <MapPin className="h-3.5 w-3.5" /> {p.kota} · {p.karyawan} karyawan
                                </p>
                                <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                                    <Users className="h-3.5 w-3.5" /> {p.kontak} kontak · {p.deal_terbuka} deal terbuka
                                </p>
                                <div className="border-t pt-2">
                                    <p className="text-muted-foreground text-xs">Nilai pipeline</p>
                                    <p className="tnum text-lg font-bold">{p.nilai_pipeline_rp}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tambah Perusahaan</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                        <div className="grid gap-2">
                            <Label htmlFor="nama">Nama perusahaan</Label>
                            <Input id="nama" value={form.nama} onChange={set('nama')} placeholder="cth: PT Maju Jaya Abadi" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="industri">Industri</Label>
                                <Input id="industri" value={form.industri} onChange={set('industri')} placeholder="cth: Manufaktur" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="kota">Kota</Label>
                                <Input id="kota" value={form.kota} onChange={set('kota')} placeholder="cth: Surabaya" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setOpen(false)}>
                            Batal
                        </Button>
                        <Button onClick={save} disabled={!form.nama.trim()}>
                            Simpan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
