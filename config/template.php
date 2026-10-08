<?php

// Di-generate oleh php artisan template:zip - hanya berisi flavor "crm".
// Ganti brand/warna di bawah, atau set TEMPLATE_FLAVOR di .env.

return [
    'flavor' => env('TEMPLATE_FLAVOR', 'crm'),

    'flavors' => array (
  'crm' => 
  array (
    'label' => 'CRM',
    'brand_name' => 'CRM',
    'brand_tagline' => 'Kelola relasi pelanggan',
    'brand_initials' => 'CR',
    'accent' => '#1e40af',
    'category' => 'bisnis',
    'home' => 'crm.index',
    'nav' => 
    array (
      'sections' => 
      array (
        0 => 
        array (
          'label' => 'CRM',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Dashboard',
              'to' => '/crm',
              'icon' => 'LayoutDashboard',
            ),
            1 => 
            array (
              'label' => 'Kontak',
              'to' => '/crm/kontak',
              'icon' => 'Users',
            ),
            2 => 
            array (
              'label' => 'Perusahaan',
              'to' => '/crm/perusahaan',
              'icon' => 'Building2',
            ),
            3 => 
            array (
              'label' => 'Pipeline',
              'to' => '/crm/pipeline',
              'icon' => 'Filter',
            ),
            4 => 
            array (
              'label' => 'Aktivitas',
              'to' => '/crm/aktivitas',
              'icon' => 'ListChecks',
            ),
            5 => 
            array (
              'label' => 'Laporan',
              'to' => '/crm/laporan',
              'icon' => 'ChartLine',
            ),
          ),
        ),
        1 => 
        array (
          'label' => 'Umum',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Pengguna',
              'to' => '/users',
              'icon' => 'Users',
            ),
            1 => 
            array (
              'label' => 'Peran',
              'to' => '/roles',
              'icon' => 'ShieldCheck',
            ),
            2 => 
            array (
              'label' => 'Pengaturan',
              'to' => '/settings',
              'icon' => 'Settings',
            ),
            3 => 
            array (
              'label' => 'Profil',
              'to' => '/profile',
              'icon' => 'User',
            ),
          ),
        ),
      ),
    ),
  ),
),
];
