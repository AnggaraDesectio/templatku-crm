import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { ToneBadge, type Tone, type ToneLabel, toneClassOf } from '@/components/tone-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Stage {
    key: string;
    label: string;
    tone: Tone;
}

interface Deal {
    id: number;
    judul: string;
    perusahaan: string;
    kontak: string;
    nilai_rp: string;
    stage: string;
    stage_label: ToneLabel;
    owner: string;
    estimasi: string;
}

export default function CrmPipeline({
    stages,
    deals,
}: {
    stages: Stage[];
    deals: Record<string, any>[];
}) {
    const rows: Deal[] = deals.map((d) => ({
        id: Number(d.id),
        judul: String(d.judul),
        perusahaan: String(d.perusahaan),
        kontak: String(d.kontak),
        nilai_rp: String(d.nilai_rp),
        stage: String(d.stage),
        stage_label: d.stage_label as ToneLabel,
        owner: String(d.owner),
        estimasi: String(d.estimasi),
    }));

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Pipeline"
                description="Deals dikelompokkan per tahap penjualan."
                breadcrumbs={[{ label: 'CRM', href: '/crm' }, { label: 'Pipeline' }]}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
                {stages.map((s) => {
                    const items = rows.filter((d) => d.stage === s.key);
                    return (
                        <Card key={s.key} className={cn('shadow-sm', toneClassOf(s.tone), 'border-0')}>
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm">{s.label}</CardTitle>
                                    <span className="tnum text-muted-foreground text-xs font-semibold">
                                        {items.length}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {items.length === 0 && (
                                    <p className="text-muted-foreground py-4 text-center text-xs">
                                        Belum ada deal di tahap ini.
                                    </p>
                                )}
                                {items.map((d) => (
                                    <div
                                        key={d.id}
                                        className="bg-card rounded-lg border p-3 shadow-xs"
                                    >
                                        <p className="text-sm leading-snug font-medium">{d.judul}</p>
                                        <p className="text-muted-foreground mt-1 text-xs">{d.perusahaan}</p>
                                        <p className="tnum mt-2 text-sm font-bold">{d.nilai_rp}</p>
                                        <div className="mt-2 flex items-center justify-between">
                                            <ToneBadge label={d.stage_label.label} tone={d.stage_label.tone} />
                                            <span className="text-muted-foreground text-xs">{d.estimasi}</span>
                                        </div>
                                        <p className="text-muted-foreground mt-1 text-xs">
                                            {d.kontak} · {d.owner}
                                        </p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </AuthenticatedLayout>
    );
}
