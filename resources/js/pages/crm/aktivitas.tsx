import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { Timeline, type TimelineItem } from '@/components/timeline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, NotebookPen, Phone, Trophy, XCircle } from 'lucide-react';

interface Aktivitas {
    id: number;
    tipe: { label: string; tone: string };
    judul: string;
    deskripsi: string;
    waktu: string;
}

const iconFor = (tipe: string) => {
    switch (tipe) {
        case 'Panggilan':
            return Phone;
        case 'Email':
            return Mail;
        case 'Catatan':
            return NotebookPen;
        case 'Deal menang':
        case 'Penawaran':
            return Trophy;
        case 'Deal kalah':
            return XCircle;
        default:
            return NotebookPen;
    }
};

export default function CrmAktivitas({ aktivitas }: { aktivitas: Aktivitas[] }) {
    const items: TimelineItem[] = aktivitas.map((a) => ({
        id: a.id,
        title: a.judul,
        description: `${a.tipe.label} · ${a.deskripsi}`,
        time: a.waktu,
        icon: iconFor(a.tipe.label),
        tone: a.tipe.tone as TimelineItem['tone'],
    }));

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Aktivitas"
                description="Jejak aktivitas tim sales: panggilan, email, rapat, dan perubahan deal."
                breadcrumbs={[{ label: 'CRM', href: '/crm' }, { label: 'Aktivitas' }]}
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Linimasa Aktivitas</CardTitle>
                    <p className="text-muted-foreground text-sm">Urut dari yang terbaru.</p>
                </CardHeader>
                <CardContent>
                    <Timeline items={items} />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
