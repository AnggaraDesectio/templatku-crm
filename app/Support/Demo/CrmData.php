<?php

namespace App\Support\Demo;

/**
 * Data demo CRM: perusahaan, kontak, deals, tahap pipeline, aktivitas.
 * Semua angka ditulis eksplisit supaya total konsisten antar halaman.
 * Kontrak status/stage: ['label' => .., 'tone' => ..] tanpa HTML,
 * tone ∈ success | warning | destructive | info.
 */
class CrmData
{
    private static function rp(int $value): string
    {
        return 'Rp'.number_format($value, 0, ',', '.');
    }

    private static function jt(int $value): int
    {
        return (int) round($value / 1000000);
    }

    /** Baris mentah perusahaan (tanpa agregat), dipakai internal agar tidak rekursi. */
    private static function perusahaanRows(): array
    {
        return [
            ['id' => 1, 'nama' => 'PT Nusantara Makmur', 'industri' => 'Manufaktur',  'kota' => 'Jakarta',    'karyawan' => 120],
            ['id' => 2, 'nama' => 'PT Sinar Abadi',      'industri' => 'Ritel',       'kota' => 'Surabaya',   'karyawan' => 85],
            ['id' => 3, 'nama' => 'CV Berkah Jaya',      'industri' => 'Kuliner',     'kota' => 'Bandung',    'karyawan' => 45],
            ['id' => 4, 'nama' => 'PT Wira Karya Digital','industri' => 'Teknologi',  'kota' => 'Jakarta',    'karyawan' => 60],
            ['id' => 5, 'nama' => 'PT Lestari Foods',    'industri' => 'Distribusi F&B','kota' => 'Semarang','karyawan' => 95],
            ['id' => 6, 'nama' => 'PT Prima Cipta',      'industri' => 'Konstruksi',  'kota' => 'Medan',      'karyawan' => 150],
            ['id' => 7, 'nama' => 'UD Maju Bersama',     'industri' => 'Grosir',      'kota' => 'Yogyakarta', 'karyawan' => 30],
            ['id' => 8, 'nama' => 'PT Artha Graha',      'industri' => 'Properti',    'kota' => 'Jakarta',    'karyawan' => 70],
        ];
    }

    /** Perusahaan klien (B2B). */
    public static function perusahaans(): array
    {
        $rows = self::perusahaanRows();

        foreach ($rows as &$p) {
            $p['deal_terbuka']   = 0;
            $p['nilai_pipeline']  = 0;
            $p['kontak']          = 0;
        }
        unset($p);

        foreach (self::kontaks() as $k) {
            $rows[$k['perusahaan_id'] - 1]['kontak']++;
        }
        foreach (self::deals() as $d) {
            if (! in_array($d['stage'], ['menang', 'kalah'], true)) {
                $rows[$d['perusahaan_id'] - 1]['deal_terbuka']++;
                $rows[$d['perusahaan_id'] - 1]['nilai_pipeline'] += $d['nilai'];
            }
        }
        foreach ($rows as &$p) {
            $p['nilai_pipeline_rp'] = self::rp($p['nilai_pipeline']);
        }
        unset($p);

        return $rows;
    }

    /** Kontak person di tiap perusahaan. */
    public static function kontaks(): array
    {
        return [
            ['id' => 1,  'nama' => 'Budi Santoso',   'jabatan' => 'Direktur Operasional', 'perusahaan_id' => 1, 'perusahaan' => 'PT Nusantara Makmur',  'email' => 'budi.santoso@nusantaramakmur.co.id', 'telepon' => '0812-3456-7890', 'status' => ['label' => 'Aktif', 'tone' => 'success']],
            ['id' => 2,  'nama' => 'Siti Aminah',    'jabatan' => 'Head of IT',           'perusahaan_id' => 2, 'perusahaan' => 'PT Sinar Abadi',       'email' => 'siti.aminah@sinarabadi.co.id',      'telepon' => '0813-2345-6789', 'status' => ['label' => 'Aktif', 'tone' => 'success']],
            ['id' => 3,  'nama' => 'Agus Wijaya',    'jabatan' => 'Purchasing Manager',   'perusahaan_id' => 1, 'perusahaan' => 'PT Nusantara Makmur',  'email' => 'agus.wijaya@nusantaramakmur.co.id',  'telepon' => '0812-9876-5432', 'status' => ['label' => 'Baru', 'tone' => 'info']],
            ['id' => 4,  'nama' => 'Dewi Lestari',   'jabatan' => 'HR Manager',           'perusahaan_id' => 4, 'perusahaan' => 'PT Wira Karya Digital','email' => 'dewi.lestari@wirakarya.id',         'telepon' => '0815-6789-0123', 'status' => ['label' => 'Aktif', 'tone' => 'success']],
            ['id' => 5,  'nama' => 'Rudi Hartono',   'jabatan' => 'Project Manager',      'perusahaan_id' => 6, 'perusahaan' => 'PT Prima Cipta',       'email' => 'rudi.hartono@primacipta.co.id',      'telepon' => '0816-5432-1098', 'status' => ['label' => 'Aktif', 'tone' => 'success']],
            ['id' => 6,  'nama' => 'Maya Putri',     'jabatan' => 'Finance Manager',      'perusahaan_id' => 5, 'perusahaan' => 'PT Lestari Foods',     'email' => 'maya.putri@lestarifoods.co.id',      'telepon' => '0817-1234-5678', 'status' => ['label' => 'Aktif', 'tone' => 'success']],
            ['id' => 7,  'nama' => 'Joko Prasetyo',  'jabatan' => 'IT Manager',           'perusahaan_id' => 8, 'perusahaan' => 'PT Artha Graha',       'email' => 'joko.prasetyo@arthagraha.co.id',    'telepon' => '0818-8765-4321', 'status' => ['label' => 'Baru', 'tone' => 'info']],
            ['id' => 8,  'nama' => 'Rina Wulandari', 'jabatan' => 'Owner',                'perusahaan_id' => 3, 'perusahaan' => 'CV Berkah Jaya',       'email' => 'rina@berkahjaya.id',                 'telepon' => '0819-3456-1234', 'status' => ['label' => 'Aktif', 'tone' => 'success']],
            ['id' => 9,  'nama' => 'Dedi Kurniawan', 'jabatan' => 'Direktur',             'perusahaan_id' => 7, 'perusahaan' => 'UD Maju Bersama',      'email' => 'dedi@majubersama.id',                'telepon' => '0821-2345-9876', 'status' => ['label' => 'Tidak Aktif', 'tone' => 'warning']],
            ['id' => 10, 'nama' => 'Fitri Handayani','jabatan' => 'Admin Procurement',    'perusahaan_id' => 2, 'perusahaan' => 'PT Sinar Abadi',       'email' => 'fitri.handayani@sinarabadi.co.id',   'telepon' => '0822-5678-1234', 'status' => ['label' => 'Aktif', 'tone' => 'success']],
            ['id' => 11, 'nama' => 'Hendra Gunawan', 'jabatan' => 'General Manager',      'perusahaan_id' => 6, 'perusahaan' => 'PT Prima Cipta',       'email' => 'hendra.gunawan@primacipta.co.id',    'telepon' => '0823-7890-4567', 'status' => ['label' => 'Aktif', 'tone' => 'success']],
            ['id' => 12, 'nama' => 'Nina Marlina',   'jabatan' => 'Marketing Manager',    'perusahaan_id' => 4, 'perusahaan' => 'PT Wira Karya Digital','email' => 'nina.marlina@wirakarya.id',        'telepon' => '0821-9087-6543', 'status' => ['label' => 'Baru', 'tone' => 'info']],
        ];
    }

    /** Tahap pipeline penjualan. */
    public static function pipelineStages(): array
    {
        return [
            ['key' => 'prospek',    'label' => 'Prospek',    'tone' => 'info'],
            ['key' => 'kualifikasi','label' => 'Kualifikasi','tone' => 'info'],
            ['key' => 'proposal',   'label' => 'Proposal',   'tone' => 'warning'],
            ['key' => 'negosiasi',  'label' => 'Negosiasi',  'tone' => 'warning'],
            ['key' => 'menang',     'label' => 'Menang',     'tone' => 'success'],
            ['key' => 'kalah',      'label' => 'Kalah',      'tone' => 'destructive'],
        ];
    }

    private static function stage(string $key): array
    {
        foreach (self::pipelineStages() as $s) {
            if ($s['key'] === $key) {
                return ['label' => $s['label'], 'tone' => $s['tone']];
            }
        }
        return ['label' => $key, 'tone' => 'info'];
    }

    /**
     * 12 deals: 8 terbuka (Rp4.110.000.000), 3 menang (Rp350.000.000),
     * 1 kalah. Setiap deal terikat perusahaan + kontak + owner karyawan.
     */
    public static function deals(): array
    {
        $raw = [
            ['id' => 1,  'judul' => 'Pengadaan ERP 120 lisensi',   'perusahaan_id' => 1, 'kontak_id' => 1, 'owner' => 'Agus Wijaya',    'stage' => 'proposal',    'nilai' => 850000000,  'estimasi' => '28 Okt 2026'],
            ['id' => 2,  'judul' => 'Langganan SaaS tahunan',      'perusahaan_id' => 2, 'kontak_id' => 2, 'owner' => 'Dedi Kurniawan', 'stage' => 'kualifikasi', 'nilai' => 240000000,  'estimasi' => '15 Nov 2026'],
            ['id' => 3,  'judul' => 'Kontrak katering korporat',   'perusahaan_id' => 4, 'kontak_id' => 4, 'owner' => 'Maya Putri',     'stage' => 'negosiasi',   'nilai' => 480000000,  'estimasi' => '05 Nov 2026'],
            ['id' => 4,  'judul' => 'Renovasi gudang',             'perusahaan_id' => 6, 'kontak_id' => 5, 'owner' => 'Hendra Gunawan', 'stage' => 'prospek',     'nilai' => 1200000000, 'estimasi' => '20 Des 2026'],
            ['id' => 5,  'judul' => 'Dashboard supply chain',      'perusahaan_id' => 5, 'kontak_id' => 6, 'owner' => 'Agus Wijaya',    'stage' => 'proposal',    'nilai' => 320000000,  'estimasi' => '10 Nov 2026'],
            ['id' => 6,  'judul' => 'Pengadaan 50 unit laptop',    'perusahaan_id' => 8, 'kontak_id' => 7, 'owner' => 'Dedi Kurniawan', 'stage' => 'kualifikasi', 'nilai' => 675000000,  'estimasi' => '25 Nov 2026'],
            ['id' => 7,  'judul' => 'Sistem kasir 30 outlet',      'perusahaan_id' => 3, 'kontak_id' => 8, 'owner' => 'Maya Putri',     'stage' => 'negosiasi',   'nilai' => 195000000,  'estimasi' => '02 Nov 2026'],
            ['id' => 8,  'judul' => 'Kontrak distribusi grosir',   'perusahaan_id' => 7, 'kontak_id' => 9, 'owner' => 'Hendra Gunawan', 'stage' => 'prospek',     'nilai' => 150000000,  'estimasi' => '12 Des 2026'],
            ['id' => 9,  'judul' => 'Aplikasi absensi karyawan',   'perusahaan_id' => 1, 'kontak_id' => 1, 'owner' => 'Agus Wijaya',    'stage' => 'menang',      'nilai' => 145000000,  'estimasi' => '30 Sep 2026'],
            ['id' => 10, 'judul' => 'Website company profile',     'perusahaan_id' => 2, 'kontak_id' => 2, 'owner' => 'Maya Putri',     'stage' => 'menang',      'nilai' => 85000000,   'estimasi' => '22 Sep 2026'],
            ['id' => 11, 'judul' => 'Maintenance server tahunan',  'perusahaan_id' => 6, 'kontak_id' => 5, 'owner' => 'Dedi Kurniawan', 'stage' => 'kalah',       'nilai' => 210000000,  'estimasi' => '18 Sep 2026'],
            ['id' => 12, 'judul' => 'Pelatihan karyawan',          'perusahaan_id' => 5, 'kontak_id' => 6, 'owner' => 'Hendra Gunawan', 'stage' => 'menang',      'nilai' => 120000000,  'estimasi' => '25 Sep 2026'],
        ];

        $kontaks = [];
        foreach (self::kontaks() as $k) {
            $kontaks[$k['id']] = $k;
        }
        $perusahaans = [];
        foreach (self::perusahaanRows() as $p) {
            $perusahaans[$p['id']] = $p;
        }

        return array_map(function ($d) use ($kontaks, $perusahaans) {
            $d['perusahaan'] = $perusahaans[$d['perusahaan_id']]['nama'];
            $d['kontak']     = $kontaks[$d['kontak_id']]['nama'];
            $d['stage_label'] = self::stage($d['stage']);
            $d['nilai_rp']   = self::rp($d['nilai']);
            return $d;
        }, $raw);
    }

    /** Aktivitas terbaru tim sales. */
    public static function aktivitases(): array
    {
        return [
            ['id' => 1,  'tipe' => ['label' => 'Panggilan', 'tone' => 'info'],        'judul' => 'Agus Wijaya menelepon Budi Santoso',        'deskripsi' => 'Follow-up proposal ERP 120 lisensi, PT Nusantara Makmur', 'waktu' => '2 jam lalu'],
            ['id' => 2,  'tipe' => ['label' => 'Email', 'tone' => 'info'],            'judul' => 'Maya Putri mengirim email ke Dewi Lestari', 'deskripsi' => 'Rincian kontrak katering korporat, PT Wira Karya Digital',  'waktu' => '3 jam lalu'],
            ['id' => 3,  'tipe' => ['label' => 'Rapat', 'tone' => 'warning'],         'judul' => 'Hendra Gunawan rapat dengan Rudi Hartono',  'deskripsi' => 'Survei lokasi renovasi gudang, PT Prima Cipta',               'waktu' => '5 jam lalu'],
            ['id' => 4,  'tipe' => ['label' => 'Deal menang', 'tone' => 'success'],   'judul' => 'Kontrak aplikasi absensi ditandatangani',   'deskripsi' => 'PT Nusantara Makmur, Rp145.000.000',                             'waktu' => 'Kemarin'],
            ['id' => 5,  'tipe' => ['label' => 'Penawaran', 'tone' => 'success'],      'judul' => 'Proposal dashboard supply chain dikirim',   'deskripsi' => 'PT Lestari Foods, Rp320.000.000',                                    'waktu' => 'Kemarin'],
            ['id' => 6,  'tipe' => ['label' => 'Panggilan', 'tone' => 'info'],        'judul' => 'Dedi Kurniawan menelepon Siti Aminah',       'deskripsi' => 'Kualifikasi kebutuhan langganan SaaS, PT Sinar Abadi',              'waktu' => 'Kemarin'],
            ['id' => 7,  'tipe' => ['label' => 'Deal kalah', 'tone' => 'destructive'],'judul' => 'Tender maintenance server gagal',           'deskripsi' => 'PT Prima Cipta memilih kompetitor, Rp210.000.000',                  'waktu' => '2 hari lalu'],
            ['id' => 8,  'tipe' => ['label' => 'Catatan', 'tone' => 'info'],          'judul' => 'Maya Putri menambahkan catatan',            'deskripsi' => 'CV Berkah Jaya meminta demo sistem kasir minggu depan',               'waktu' => '2 hari lalu'],
            ['id' => 9,  'tipe' => ['label' => 'Email', 'tone' => 'info'],            'judul' => 'Agus Wijaya mengirim email ke Maya Putri',  'deskripsi' => 'Materi pelatihan karyawan, PT Lestari Foods',                       'waktu' => '3 hari lalu'],
            ['id' => 10, 'tipe' => ['label' => 'Rapat', 'tone' => 'warning'],         'judul' => 'Dedi Kurniawan rapat dengan Joko Prasetyo', 'deskripsi' => 'Negosiasi pengadaan 50 unit laptop, PT Artha Graha',                 'waktu' => '3 hari lalu'],
        ];
    }

    /** Ringkasan angka untuk kartu statistik (dihitung dari data). */
    public static function ringkasan(): array
    {
        $deals    = self::deals();
        $terbuka  = array_filter($deals, fn ($d) => ! in_array($d['stage'], ['menang', 'kalah'], true));
        $menang   = array_filter($deals, fn ($d) => $d['stage'] === 'menang');
        $kalah    = array_filter($deals, fn ($d) => $d['stage'] === 'kalah');
        $nilaiPipeline = array_sum(array_column($terbuka, 'nilai'));
        $nilaiMenang   = array_sum(array_column($menang, 'nilai'));
        $selesai  = count($menang) + count($kalah);
        $winRate  = $selesai > 0 ? round(count($menang) / $selesai * 100) : 0;

        return [
            'total_kontak'     => count(self::kontaks()),
            'total_perusahaan' => count(self::perusahaans()),
            'deal_terbuka'     => count($terbuka),
            'nilai_pipeline'   => $nilaiPipeline,
            'nilai_pipeline_rp'=> self::rp($nilaiPipeline),
            'deal_menang'      => count($menang),
            'nilai_menang_rp'  => self::rp($nilaiMenang),
            'win_rate'         => $winRate,
        ];
    }

    /** Nilai pipeline per tahap (juta Rp) untuk bar chart. */
    public static function pipelineChart(): array
    {
        $labels = [];
        $data   = [];
        foreach (self::pipelineStages() as $s) {
            $labels[] = $s['label'];
            $total = 0;
            foreach (self::deals() as $d) {
                if ($d['stage'] === $s['key']) {
                    $total += $d['nilai'];
                }
            }
            $data[] = self::jt($total);
        }

        return [
            'labels'   => $labels,
            'datasets' => [['label' => 'Nilai (juta Rp)', 'data' => $data]],
        ];
    }

    /** Jumlah deal per tahap untuk donut chart. */
    public static function distribusiStage(): array
    {
        $labels = [];
        $data   = [];
        foreach (self::pipelineStages() as $s) {
            $labels[] = $s['label'];
            $data[]   = count(array_filter(self::deals(), fn ($d) => $d['stage'] === $s['key']));
        }

        return [
            'labels'   => $labels,
            'datasets' => [['label' => 'Deal', 'data' => $data]],
        ];
    }

    /** Nilai deal menang per bulan (juta Rp) untuk area chart. */
    public static function nilaiMenangPerBulan(): array
    {
        return [
            'labels'   => ['Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt'],
            'datasets' => [['label' => 'Nilai menang (juta Rp)', 'data' => [95, 130, 175, 145, 220, 265]]],
        ];
    }

    /** Papan peringkat owner berdasarkan nilai deal menang. */
    public static function ownerLeaderboard(): array
    {
        $agg = [];
        foreach (self::deals() as $d) {
            $o = $d['owner'];
            $agg[$o] ??= ['owner' => $o, 'deal_menang' => 0, 'nilai' => 0];
            if ($d['stage'] === 'menang') {
                $agg[$o]['deal_menang']++;
                $agg[$o]['nilai'] += $d['nilai'];
            }
        }
        usort($agg, fn ($a, $b) => $b['nilai'] <=> $a['nilai']);

        return array_map(fn ($r) => [
            'owner'       => $r['owner'],
            'deal_menang' => $r['deal_menang'],
            'nilai_rp'    => self::rp($r['nilai']),
        ], array_values($agg));
    }
}
