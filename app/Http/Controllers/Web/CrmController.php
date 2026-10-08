<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Support\Demo\CrmData;
use Inertia\Inertia;
use Inertia\Response;

/** Halaman-halaman CRM (Inertia). */
class CrmController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('crm/index', [
            'ringkasan'   => CrmData::ringkasan(),
            'pipeline'    => CrmData::pipelineChart(),
            'aktivitas'   => array_slice(CrmData::aktivitases(), 0, 6),
            'deals'       => array_slice(CrmData::deals(), 0, 6),
        ]);
    }

    public function kontak(): Response
    {
        return Inertia::render('crm/kontak', [
            'kontaks' => CrmData::kontaks(),
        ]);
    }

    public function perusahaan(): Response
    {
        return Inertia::render('crm/perusahaan', [
            'perusahaans' => CrmData::perusahaans(),
        ]);
    }

    public function pipeline(): Response
    {
        return Inertia::render('crm/pipeline', [
            'stages' => CrmData::pipelineStages(),
            'deals'  => CrmData::deals(),
        ]);
    }

    public function aktivitas(): Response
    {
        return Inertia::render('crm/aktivitas', [
            'aktivitas' => CrmData::aktivitases(),
        ]);
    }

    public function laporan(): Response
    {
        return Inertia::render('crm/laporan', [
            'ringkasan'   => CrmData::ringkasan(),
            'pipeline'    => CrmData::pipelineChart(),
            'distribusi'  => CrmData::distribusiStage(),
            'perBulan'    => CrmData::nilaiMenangPerBulan(),
            'leaderboard' => CrmData::ownerLeaderboard(),
        ]);
    }
}
