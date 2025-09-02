import { load, save } from '../utils/storage'

export function ensureSeed() {
  const seeded = load('__seeded__', false)
  if (seeded) return

  const users = [
    { id: crypto.randomUUID(), username: 'admin', password: 'admin123', fullName: 'Administrator', role: 'admin' },
    { id: crypto.randomUUID(), username: 'user', password: 'user123', fullName: 'User Biasa', role: 'user' }
  ]
  
  const tests = [
    {
      id: crypto.randomUUID(),
      title: 'Tes Kognitif Programmer',
      category: 'Kognitif',
      questions: [
        { 
          id: crypto.randomUUID(), 
          text: 'Jika sebuah algoritma sorting membutuhkan waktu O(n log n) untuk mengurutkan 1000 data, berapa perkiraan waktu yang dibutuhkan untuk 8000 data?', 
          options: ['8 kali lebih lama', '24 kali lebih lama', '64 kali lebih lama', '16 kali lebih lama'], 
          answer: 1 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Dalam binary tree dengan 7 node, berapa maksimal tinggi tree tersebut?', 
          options: ['3', '6', '7', '4'], 
          answer: 1 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Jika variabel A = 5, B = 3, maka hasil dari ((A << 1) | B) & 7 adalah:', 
          options: ['11', '3', '7', '5'], 
          answer: 0 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Dalam database dengan 1 juta record, index B-tree dengan fanout 100 akan memiliki maksimal berapa level?', 
          options: ['3', '4', '5', '6'], 
          answer: 0 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Kompleksitas waktu untuk mencari elemen dalam hash table dengan perfect hashing adalah:', 
          options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'], 
          answer: 2 
        }
      ]
    },
    {
      id: crypto.randomUUID(),
      title: 'Tes Kepribadian Programmer',
      category: 'Kepribadian',
      questions: [
        { 
          id: crypto.randomUUID(), 
          text: 'Ketika menghadapi deadline ketat untuk project, Anda lebih cenderung:', 
          options: [
            'Bekerja sendirian hingga larut malam untuk memastikan kualitas',
            'Membagi tugas dengan tim dan sering berkomunikasi',
            'Fokus pada fitur utama dan menunda optimisasi',
            'Meminta perpanjangan waktu untuk hasil maksimal'
          ], 
          answer: -1 // Personality questions don't have right/wrong answers
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Dalam code review, jika rekan kerja mengkritik kode Anda, reaksi pertama Anda:', 
          options: [
            'Merasa tersinggung dan membela implementasi Anda',
            'Langsung menerima dan mengubah sesuai saran',
            'Bertanya detail tentang alasan kritik tersebut',
            'Mencari pendapat programmer lain sebagai pembanding'
          ], 
          answer: -1 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Ketika harus mempelajari teknologi baru untuk project, Anda:', 
          options: [
            'Membaca dokumentasi lengkap sebelum mulai coding',
            'Langsung hands-on dengan tutorial praktis',
            'Mencari mentor yang sudah berpengalaman',
            'Menunda hingga ada training formal dari perusahaan'
          ], 
          answer: -1 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Dalam situasi debugging yang rumit, pendekatan Anda:', 
          options: [
            'Metodis step-by-step menggunakan debugger',
            'Menambahkan banyak log untuk tracking',
            'Diskusi dengan senior developer',
            'Mencari solusi serupa di Stack Overflow'
          ], 
          answer: -1 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Ketika diminta memimpin tim kecil untuk project baru:', 
          options: [
            'Merasa excited dengan tanggung jawab tambahan',
            'Khawatir akan mengganggu produktivitas coding',
            'Menerima dengan syarat tetap bisa hands-on coding',
            'Menolak karena lebih suka fokus pada technical skill'
          ], 
          answer: -1 
        }
      ]
    },
    {
      id: crypto.randomUUID(),
      title: 'Tes Logika Programmer',
      category: 'Logika',
      questions: [
        { 
          id: crypto.randomUUID(), 
          text: 'Jika "Semua programmer yang baik memahami algoritma" dan "John adalah programmer yang baik", maka:', 
          options: [
            'John pasti memahami semua algoritma',
            'John memahami algoritma',
            'John mungkin memahami algoritma',
            'Tidak dapat disimpulkan'
          ], 
          answer: 1 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Dalam conditional: if (A && B || C && !D), kondisi true terjadi ketika:', 
          options: [
            'A=true, B=false, C=true, D=false',
            'A=false, B=true, C=false, D=true',
            'A=true, B=true, C=false, D=true',
            'A=false, B=false, C=true, D=true'
          ], 
          answer: 2 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Jika sistem A bergantung pada sistem B, dan sistem B bergantung pada sistem C, maka ketika sistem C down:', 
          options: [
            'Hanya sistem C yang bermasalah',
            'Sistem B dan C bermasalah',
            'Semua sistem bermasalah',
            'Sistem A tetap berjalan normal'
          ], 
          answer: 2 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Dalam loop: for(i=0; i<5; i++) { if(i==2) continue; print(i); }, output yang dihasilkan:', 
          options: [
            '0,1,3,4',
            '0,1,2,3,4',
            '1,2,3,4',
            '0,1,3,4,5'
          ], 
          answer: 0 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Jika API rate limit adalah 100 request/menit dan Anda perlu mengirim 500 request, strategi optimal:', 
          options: [
            'Kirim semua sekaligus dan handle error',
            'Bagi menjadi 5 batch dengan jeda 1 menit',
            'Implementasi exponential backoff',
            'Gunakan multiple API key'
          ], 
          answer: 1 
        }
      ]
    },
    {
      id: crypto.randomUUID(),
      title: 'Tes Numerik Programmer',
      category: 'Numerik',
      questions: [
        { 
          id: crypto.randomUUID(), 
          text: 'Sebuah server dapat menangani 1000 concurrent users dengan CPU usage 70%. Berapa maksimal users yang dapat ditangani sebelum CPU mencapai 90%?', 
          options: ['1200', '1285', '1400', '1500'], 
          answer: 1 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Jika database query membutuhkan 2ms untuk 100 records dengan kompleksitas O(n²), berapa waktu untuk 500 records?', 
          options: ['10ms', '25ms', '50ms', '100ms'], 
          answer: 2 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Memory usage aplikasi meningkat 15% setiap hari. Jika saat ini 400MB, berapa hari lagi mencapai 1GB?', 
          options: ['5 hari', '6 hari', '7 hari', '8 hari'], 
          answer: 2 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Dalam binary representation, berapa nilai decimal dari 10110101?', 
          options: ['181', '185', '189', '193'], 
          answer: 0 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Jika hash function menghasilkan collision rate 0.02 untuk 10000 data, berapa expected collision?', 
          options: ['20', '200', '2000', '100'], 
          answer: 1 
        }
      ]
    },
    {
      id: crypto.randomUUID(),
      title: 'Tes Verbal Programmer',
      category: 'Verbal',
      questions: [
        { 
          id: crypto.randomUUID(), 
          text: 'Istilah "refactoring" dalam programming paling tepat diartikan sebagai:', 
          options: [
            'Menulis ulang kode dari awal',
            'Memperbaiki bug dalam kode',
            'Mengubah struktur kode tanpa mengubah fungsionalitas',
            'Menambahkan fitur baru ke dalam kode'
          ], 
          answer: 2 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Dalam konteks software architecture, kata "coupling" merujuk pada:', 
          options: [
            'Kecepatan komunikasi antar komponen',
            'Tingkat ketergantungan antar komponen',
            'Jumlah komponen dalam sistem',
            'Kompleksitas implementasi komponen'
          ], 
          answer: 1 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Istilah "technical debt" dalam development team berarti:', 
          options: [
            'Biaya untuk membeli lisensi software',
            'Gaji programmer yang belum dibayar',
            'Konsekuensi dari pengambilan shortcut dalam coding',
            'Investasi untuk training teknis'
          ], 
          answer: 2 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Dalam agile methodology, "sprint retrospective" adalah:', 
          options: [
            'Review kode yang ditulis selama sprint',
            'Evaluasi performa tim setelah sprint',
            'Planning untuk sprint berikutnya',
            'Demo produk ke stakeholder'
          ], 
          answer: 1 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Konsep "idempotent" dalam API design berarti:', 
          options: [
            'API yang selalu mengembalikan response sama',
            'API yang dapat dipanggil berkali-kali dengan hasil konsisten',
            'API yang membutuhkan authentication',
            'API yang memiliki rate limiting'
          ], 
          answer: 1 
        }
      ]
    },
    {
      id: crypto.randomUUID(),
      title: 'Tes Emosional Programmer',
      category: 'Emosional',
      questions: [
        { 
          id: crypto.randomUUID(), 
          text: 'Ketika kode Anda menyebabkan bug critical di production, perasaan pertama Anda:', 
          options: [
            'Panik dan stress berat',
            'Menyesal tapi langsung fokus mencari solusi',
            'Menyalahkan proses testing yang kurang baik',
            'Tenang karena ini hal normal dalam development'
          ], 
          answer: -1 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Saat junior developer bertanya hal basic yang sudah Anda jelaskan sebelumnya:', 
          options: [
            'Merasa sedikit kesal tapi tetap menjelaskan',
            'Menyuruhnya membaca dokumentasi dulu',
            'Dengan sabar menjelaskan dengan cara berbeda',
            'Meminta senior lain yang menjelaskan'
          ], 
          answer: -1 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Ketika diminta menggunakan teknologi yang tidak Anda sukai untuk project penting:', 
          options: [
            'Menolak dan menyarankan alternatif yang Anda kuasai',
            'Menerima dengan berat hati dan minimal effort',
            'Enthusiastic melihatnya sebagai kesempatan belajar',
            'Menerima tapi terus complain tentang teknologi tersebut'
          ], 
          answer: -1 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Saat presentasi demo dan ada bug yang muncul di depan client:', 
          options: [
            'Sangat embarrassed dan sulit melanjutkan',
            'Gugup tapi tetap mencoba explain dan fix',
            'Tenang, acknowledge bug dan fokus pada fitur lain',
            'Menyalahkan environment atau faktor eksternal'
          ], 
          answer: -1 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Ketika harus bekerja dengan programmer yang gaya codingnya berbeda dari Anda:', 
          options: [
            'Frustasi dan prefer bekerja sendiri',
            'Mencoba adaptasi tapi sering conflict',
            'Melihatnya sebagai kesempatan saling belajar',
            'Toleran tapi tetap mempertahankan gaya sendiri'
          ], 
          answer: -1 
        }
      ]
    },
    {
      id: crypto.randomUUID(),
      title: 'Tes Minat Bakat Programmer',
      category: 'Minat Bakat',
      questions: [
        { 
          id: crypto.randomUUID(), 
          text: 'Dalam waktu luang, aktivitas yang paling Anda nikmati:', 
          options: [
            'Berkontribusi pada open source project',
            'Gaming dan eksplorasi teknologi terbaru',
            'Membaca artikel teknis dan research paper',
            'Mengajarkan programming kepada orang lain'
          ], 
          answer: -1 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Jika ada kesempatan untuk spesialisasi, Anda paling tertarik dengan:', 
          options: [
            'AI/Machine Learning dan data science',
            'System architecture dan performance optimization',
            'UI/UX design dan frontend development',
            'DevOps dan infrastructure automation'
          ], 
          answer: -1 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Ketika ada conference atau tech meetup, Anda:', 
          options: [
            'Selalu berusaha hadir untuk networking',
            'Hadir jika topiknya relevan dengan pekerjaan',
            'Prefer menonton recording-nya nanti',
            'Jarang tertarik, lebih suka belajar mandiri'
          ], 
          answer: -1 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Dalam project personal, Anda lebih suka:', 
          options: [
            'Build aplikasi yang solve real-world problem',
            'Eksperimen dengan algorithm dan data structure',
            'Membuat tools untuk meningkatkan produktivitas',
            'Contribute pada project yang sudah ada'
          ], 
          answer: -1 
        },
        { 
          id: crypto.randomUUID(), 
          text: 'Aspek programming yang paling membuat Anda excited:', 
          options: [
            'Menyelesaikan complex problem solving',
            'Melihat impact nyata dari aplikasi yang dibuat',
            'Menulis clean, elegant code',
            'Berkolaborasi dengan tim dalam big project'
          ], 
          answer: -1 
        }
      ]
    }
  ]

  save('users', users)
  save('tests', tests)
  save('results', [])
  save('__seeded__', true)
}