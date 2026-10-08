<?php

use App\Http\Controllers\Web\CrmController;
use Illuminate\Support\Facades\Route;

Route::prefix('crm')->name('crm.')->group(function () {
    Route::get('/', [CrmController::class, 'index'])->name('index');
    Route::get('/kontak', [CrmController::class, 'kontak'])->name('kontak');
    Route::get('/perusahaan', [CrmController::class, 'perusahaan'])->name('perusahaan');
    Route::get('/pipeline', [CrmController::class, 'pipeline'])->name('pipeline');
    Route::get('/aktivitas', [CrmController::class, 'aktivitas'])->name('aktivitas');
    Route::get('/laporan', [CrmController::class, 'laporan'])->name('laporan');
});
