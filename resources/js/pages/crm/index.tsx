import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { BarChartCard, type ChartData } from '@/components/charts';
import { DataTable, type Column } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { Handshake, Percent, Trophy, Users } from 'lucide-react';

interface Deal {
    id: number;
    judul: string;
    perusahaan: string;
    nilai_rp: string;
    stage_label: ToneLabel;
    owner: string;
}

interface Aktivitas {
    id: number;
    judul: string;
    deskripsi: string;
    waktu: string;
}

interface Ringkasan {
    total_kontak: number;
    total_perusahaan: number;
    deal_terbuka: number;
    nilai_pipeline_rp: string;
    deal_menang: number;
    nilai_menang_rp: string;
    win_rate: number;
}

export default function CrmIndex({
    ringkasan,
    pipeline,
    aktivitas,
    deals,
}: {
    ringkasan: Ringkasan;
    pipeline: ChartData;
    aktivitas: Aktivitas[];
    deals: Record<string, any>[];
}) {
    const rows: Deal[] = deals.map((d) => ({
        id: Number(d.id),
        judul: String(d.judul),
        perusahaan: String(d.perusahaan),
        nilai_rp: String(d.nilai_rp),
        stage_label: d.stage_label as ToneLabel,
        owner: String(d.owner),
    }));

    const columns: Column<Deal>[] = [
        { key: 'judul', header: 'Deal', sortValue: (r) => r.judul },
        { key: 'perusahaan', header: 'Perusahaan', sortValue: (r) => r.perusahaan },
        {
            key: 'nilai_rp',
            header: 'Nilai',
            render: (r) => <span className="tnum font-medium">{r.nilai_rp}</span>,
            sortValue: (r) => r.nilai_rp,
        },
        {
            key: 'stage_label',
            header: 'Tahap',
            render: (r) => <ToneBadge label={r.stage_label.label} tone={r.stage_label.tone} />,
        },
        { key: 'owner', header: 'Owner', mobileHidden: true, sortValue: (r) => r.owner },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="CRM"
                description="Pantau pipeline dan aktivitas tim sales hari ini."
                breadcrumbs={[{ label: 'CRM' }]}
                actions={
                    <Button size="sm" asChild>
                        <Link href="/crm/pipeline">Kelola Pipeline</Link>
                    </Button>
                }
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Deal Terbuka"
                    value={String(ringkasan.deal_terbuka)}
                    delta={`${ringkasan.nilai_pipeline_rp} pipeline`}
                    trend="flat"
                    icon={Handshake}
                    hint="Deal yang masih dinegosiasikan dan belum menang atau kalah."
                />
                <StatCard
                    label="Deal Menang"
                    value={String(ringkasan.deal_menang)}
                    delta={ringkasan.nilai_menang_rp}
                    trend="up"
                    icon={Trophy}
                    hint="Deal yang berhasil ditutup dan jadi pendapatan periode ini."
                />
                <StatCard
                    label="Win Rate"
                    value={`${ringkasan.win_rate}%`}
                    delta={`${ringkasan.deal_menang} deal dimenangkan`}
                    trend="up"
                    icon={Percent}
                    hint="Porsi deal selesai yang berakhir menang, makin tinggi makin efektif."
                />
                <StatCard
                    label="Kontak"
                    value={String(ringkasan.total_kontak)}
                    delta={`${ringkasan.total_perusahaan} perusahaan`}
                    trend="flat"
                    icon={Users}
                    hint="Kontak person aktif di seluruh perusahaan klien Anda."
                />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
                <Card className="shadow-sm xl:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-base">Nilai Pipeline per Tahap</CardTitle>
                        <p className="text-muted-foreground text-sm">Nilai deals dalam juta rupiah.</p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={pipeline} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Aktivitas Terakhir</CardTitle>
                        <p className="text-muted-foreground text-sm">Apa yang dikerjakan tim sales.</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {aktivitas.map((a) => (
                            <div key={a.id} className="flex items-start gap-3">
                                <Avatar className="h-8 w-8 shrink-0">
                                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                        {a.judul.split(' ').slice(0, 2).map((n) => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium">{a.judul}</p>
                                    <p className="text-muted-foreground truncate text-xs">{a.deskripsi}</p>
                                    <p className="text-muted-foreground text-xs">{a.waktu}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    rows={rows}
                    searchKeys={['judul', 'perusahaan', 'owner']}
                    emptyTitle="Belum ada deal"
                    emptyDescription="Deal baru akan muncul di sini setelah Anda menambahkannya dari halaman Pipeline."
                />
            </div>
        </AuthenticatedLayout>
    );
}
