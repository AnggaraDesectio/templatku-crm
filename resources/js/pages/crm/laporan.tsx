import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { AreaChartCard, BarChartCard, DonutChartCard, type ChartData } from '@/components/charts';
import { DataTable, type Column } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Handshake, Percent, Target, TrendingUp } from 'lucide-react';

interface Leaderboard {
    owner: string;
    deal_menang: number;
    nilai_rp: string;
}

interface Ringkasan {
    deal_terbuka: number;
    nilai_pipeline_rp: string;
    deal_menang: number;
    nilai_menang_rp: string;
    win_rate: number;
}

export default function CrmLaporan({
    ringkasan,
    pipeline,
    distribusi,
    perBulan,
    leaderboard,
}: {
    ringkasan: Ringkasan;
    pipeline: ChartData;
    distribusi: ChartData;
    perBulan: ChartData;
    leaderboard: Leaderboard[];
}) {
    const rows = leaderboard.map((l, i) => ({ id: i + 1, ...l }));

    const columns: Column<(typeof rows)[number]>[] = [
        { key: 'owner', header: 'Sales', sortValue: (r) => r.owner },
        {
            key: 'deal_menang',
            header: 'Deal Menang',
            render: (r) => <span className="tnum">{r.deal_menang}</span>,
            sortValue: (r) => r.deal_menang,
        },
        {
            key: 'nilai_rp',
            header: 'Nilai',
            render: (r) => <span className="tnum font-medium">{r.nilai_rp}</span>,
            sortValue: (r) => r.nilai_rp,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Laporan"
                description="Kinerja penjualan: pipeline, win rate, dan peringkat sales."
                breadcrumbs={[{ label: 'CRM', href: '/crm' }, { label: 'Laporan' }]}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Nilai Pipeline"
                    value={ringkasan.nilai_pipeline_rp}
                    delta={`${ringkasan.deal_terbuka} deal terbuka`}
                    trend="flat"
                    icon={Handshake}
                    hint="Total potensi pendapatan dari semua deal yang masih berjalan."
                />
                <StatCard
                    label="Nilai Deal Menang"
                    value={ringkasan.nilai_menang_rp}
                    delta={`${ringkasan.deal_menang} deal menang`}
                    trend="up"
                    icon={Target}
                    hint="Pendapatan nyata yang sudah dikunci tim sales periode ini."
                />
                <StatCard
                    label="Win Rate"
                    value={`${ringkasan.win_rate}%`}
                    delta="+5 poin vs kuartal lalu"
                    trend="up"
                    icon={Percent}
                    hint="Porsi deal selesai yang berakhir menang, cerminan efektivitas closing."
                />
                <StatCard
                    label="Tren Menang"
                    value="Naik"
                    delta="6 bulan terakhir"
                    trend="up"
                    icon={TrendingUp}
                    hint="Arah nilai deal menang dalam setengah tahun terakhir."
                />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Nilai Pipeline per Tahap</CardTitle>
                        <p className="text-muted-foreground text-sm">Dalam juta rupiah.</p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={pipeline} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Nilai Deal Menang per Bulan</CardTitle>
                        <p className="text-muted-foreground text-sm">Dalam juta rupiah.</p>
                    </CardHeader>
                    <CardContent>
                        <AreaChartCard data={perBulan} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Distribusi Deal per Tahap</CardTitle>
                        <p className="text-muted-foreground text-sm">Jumlah deal di tiap tahap.</p>
                    </CardHeader>
                    <CardContent>
                        <DonutChartCard data={distribusi} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Peringkat Sales</CardTitle>
                        <p className="text-muted-foreground text-sm">Berdasarkan nilai deal menang.</p>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={columns}
                            rows={rows}
                            emptyTitle="Belum ada peringkat sales"
                            emptyDescription="Peringkat muncul setelah ada deal yang dimenangkan dan tercatat di sistem."
                        />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
