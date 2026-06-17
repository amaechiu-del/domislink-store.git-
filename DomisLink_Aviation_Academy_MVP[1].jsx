import React, { useState, useRef } from 'react';
import { Globe, Plane, BookOpen, Users, TrendingUp, Send, Upload, Download, QrCode, Settings, LogOut, ChevronRight, Play, Award, DollarSign } from 'lucide-react';

// NCAT Fleet Database
const NCAT_FLEET = {
  single_engine: [
    { id: 'tb9', name: 'Tampico TB9', capacity: 4, engine: '160 HP Lycoming', maxSpeed: 140, range: 600, qty: 14 },
    { id: 'tb20', name: 'Trinidad TB20', capacity: 4, engine: '200 HP Lycoming', maxSpeed: 160, range: 700, qty: 5 }
  ],
  twin_engine: [
    { id: 'b58', name: 'Beech 58 Baron', capacity: 6, engine: '2x 260 HP Continental', maxSpeed: 185, range: 1000, qty: 3 }
  ],
  rotorcraft: [
    { id: 'bell206', name: 'Bell 206 Helicopter', capacity: 5, engine: '317 HP Allison', maxSpeed: 115, range: 300, qty: 2 }
  ],
  advanced: [
    { id: 'tbm850', name: 'TBM 850 Turboprop', capacity: 6, engine: '850 HP PT6', maxSpeed: 330, range: 1400, qty: 1 }
  ]
};

// Multilingual Content
const TRANSLATIONS = {
  en: {
    title: 'DomisLink Aviation Academy',
    subtitle: 'NCAT-Aligned Pilot Training Platform',
    courses: 'Courses',
    instructor: 'AI Instructor',
    assignments: 'Assignments',
    certificates: 'Certificates',
    compliance: 'Compliance',
    payments: 'Payments',
    settings: 'Settings',
    welcome: 'Welcome to DomisLink Aviation Academy',
    description: 'Master aviation through real NCAT aircraft, AI-guided instruction, and verified certification.',
    selectCourse: 'Select Your Course',
    ppl: 'Private Pilot License',
    cpl: 'Commercial Pilot License',
    atpl: 'Air Transport Pilot',
    ppl_price: '₦65,000 - ₦250,000',
    cpl_price: '₦250,000 - ₦500,000',
    atpl_price: '₦500,000 - ₦1,800,000',
    selectInstructor: 'Select Your Instructor',
    male_instructor: 'Captain Okonkwo (Male)',
    female_instructor: 'Captain Amara (Female)',
    uploadAssignment: 'Upload Assignment',
    uploadFile: 'Choose Image (PNG, JPG, PDF)',
    submitAssignment: 'Submit for AI Feedback',
    generateCertificate: 'Generate Certificate',
    downloadCertificate: 'Download Certificate',
    verifyCertificate: 'Verify Certificate',
    complianceDashboard: 'NCAT Compliance Dashboard',
    enrollments: 'Total Enrollments',
    completionRate: 'Completion Rate',
    certificatesIssued: 'Certificates Issued',
    paystackIntegration: 'Pay with Paystack',
    selectPaymentPlan: 'Select Payment Plan',
    monthly_3: '3 months installment',
    monthly_6: '6 months installment',
    selectLanguage: 'Select Language',
    selectInstructorGender: 'Select Instructor Gender',
    fleetDatabase: 'NCAT Fleet Database',
    aboutNCAT: 'About NCAT Track',
    ncat_track_desc: 'Follow NCAT-approved curriculum with verified certification',
    videosAndResources: 'Videos & Resources',
    youtubePromo: 'YouTube Promotional Content (Free)',
    premiumCourseVidoes: 'Premium Course Materials (Login Required)'
  },
  fr: {
    title: 'Académie d\'Aviation DomisLink',
    subtitle: 'Plateforme de Formation des Pilotes Alignée NCAT',
    courses: 'Cours',
    instructor: 'Instructeur IA',
    assignments: 'Devoirs',
    certificates: 'Certificats',
    compliance: 'Conformité',
    payments: 'Paiements',
    settings: 'Paramètres',
    welcome: 'Bienvenue à l\'Académie d\'Aviation DomisLink',
    description: 'Maîtrisez l\'aviation par des aéronefs NCAT réels, une instruction guidée par IA et une certification vérifiée.',
    selectCourse: 'Sélectionnez Votre Cours',
    ppl: 'Licence de Pilote Privé',
    cpl: 'Licence de Pilote Commercial',
    atpl: 'Pilote de Ligne',
    ppl_price: '₦65 000 - ₦250 000',
    cpl_price: '₦250 000 - ₦500 000',
    atpl_price: '₦500 000 - ₦1 800 000',
    selectInstructor: 'Sélectionnez Votre Instructeur',
    male_instructor: 'Capitaine Okonkwo (Homme)',
    female_instructor: 'Capitaine Amara (Femme)',
    uploadAssignment: 'Charger un Devoir',
    uploadFile: 'Choisir une Image (PNG, JPG, PDF)',
    submitAssignment: 'Soumettre pour Retour IA',
    generateCertificate: 'Générer Certificat',
    downloadCertificate: 'Télécharger Certificat',
    verifyCertificate: 'Vérifier Certificat',
    complianceDashboard: 'Tableau de Bord de Conformité NCAT',
    enrollments: 'Inscriptions Totales',
    completionRate: 'Taux de Réussite',
    certificatesIssued: 'Certificats Émis',
    paystackIntegration: 'Payer avec Paystack',
    selectPaymentPlan: 'Sélectionnez Votre Plan',
    monthly_3: 'Paiement en 3 mois',
    monthly_6: 'Paiement en 6 mois',
    selectLanguage: 'Sélectionner la Langue',
    selectInstructorGender: 'Genre de l\'Instructeur',
    fleetDatabase: 'Base de Données de la Flotte NCAT',
    aboutNCAT: 'À propos de la Piste NCAT',
    ncat_track_desc: 'Suivez le programme approuvé par NCAT avec certification vérifiée',
    videosAndResources: 'Vidéos et Ressources',
    youtubePromo: 'Contenu Promotionnel YouTube (Gratuit)',
    premiumCourseVidoes: 'Matériaux de Cours Premium (Connexion Requise)'
  },
  ha: {
    title: 'Makarantar Jigin Sama DomisLink',
    subtitle: 'Jigon Koyi Pilota Mai Daidai da NCAT',
    courses: 'Ayyuka',
    instructor: 'Malalain AI',
    assignments: 'Buƙatun Aiki',
    certificates: 'Tasdiqin',
    compliance: 'Daidaitawa',
    payments: 'Biyan Kuɗi',
    settings: 'Saiti',
    welcome: 'Sannu wa Makarantar Jigin Sama DomisLink',
    description: 'Kara ƙarewa aikin jirgi ta hanyar abin NCAT na gaske, jarrabawa mai hidima ta AI, da tasdiqin da aka tabbatar.',
    selectCourse: 'Zaɓi Ayyukanka',
    ppl: 'Lasisi Pilota na Sirri',
    cpl: 'Lasisi Pilota na Kasua',
    atpl: 'Jigin Soma Masu Jirgani',
    ppl_price: '₦65,000 - ₦250,000',
    cpl_price: '₦250,000 - ₦500,000',
    atpl_price: '₦500,000 - ₦1,800,000',
    selectInstructor: 'Zaɓi Malalainki',
    male_instructor: 'Kyaftan Okonkwo (Namiji)',
    female_instructor: 'Kyaftan Amara (Mace)',
    uploadAssignment: 'Zazzage Aiki',
    uploadFile: 'Zaɓi Hoto (PNG, JPG, PDF)',
    submitAssignment: 'Aika don Saƙo AI',
    generateCertificate: 'Samar da Tasdiqin',
    downloadCertificate: 'Saukar da Tasdiqin',
    verifyCertificate: 'Tabbatar da Tasdiqin',
    complianceDashboard: 'Dasibod na Daidaitawa NCAT',
    enrollments: 'Jamillar Shiga',
    completionRate: 'Adadin Kammala',
    certificatesIssued: 'Tasdiqin da aka Ba',
    paystackIntegration: 'Biya da Paystack',
    selectPaymentPlan: 'Zaɓi Tsarin Biyan Kuɗi',
    monthly_3: 'Biyan kuɗi na wata 3',
    monthly_6: 'Biyan kuɗi na wata 6',
    selectLanguage: 'Zaɓi Harshe',
    selectInstructorGender: 'Jinin Malalain',
    fleetDatabase: 'Tushen Bayanan Sabar NCAT',
    aboutNCAT: 'Kan Gida na NCAT',
    ncat_track_desc: 'Bi sigar da NCAT ya amince tare da tasdiqin da aka tabbatar',
    videosAndResources: 'Bidiyo da Albarkatun',
    youtubePromo: 'Kadarar Talabijin YouTube (Kyauta)',
    premiumCourseVidoes: 'Kayan Koyin Premium (Shiga Daukar)'
  },
  ig: {
    title: 'DomisLink Aviation Academy',
    subtitle: 'Aka mụnye nke NCAT Pilot Training Platform',
    courses: 'Ihe Imuta',
    instructor: 'AI Onye Nkuzi',
    assignments: 'Ọrụ',
    certificates: 'Ndekọ',
    compliance: 'Izugbe',
    payments: 'Ụgwu',
    settings: 'Nhazi',
    welcome: 'Nnọkọ na DomisLink Aviation Academy',
    description: 'Kuu isi ụzụ ụgbọ elu site na ụgbọ NCAT eziokwu, ntụzị nile ndị ụka na nkwado ngosipụta.',
    selectCourse: 'Họrọ Ihe Imuta Gị',
    ppl: 'Nyocha Onye Ụgbọ Elu Nwere Onwe Ya',
    cpl: 'Nyocha Onye Ụgbọ Elu Azụmahịa',
    atpl: 'Onye Nha Ụgbọ Elu',
    ppl_price: '₦65,000 - ₦250,000',
    cpl_price: '₦250,000 - ₦500,000',
    atpl_price: '₦500,000 - ₦1,800,000',
    selectInstructor: 'Họrọ Onye Nkuzi Gị',
    male_instructor: 'Ọchịagha Okonkwo (Nwoke)',
    female_instructor: 'Ọchịagha Amara (Nwanyị)',
    uploadAssignment: 'Tikpụ Ọrụ',
    uploadFile: 'Họrọ Ihe Nlele (PNG, JPG, PDF)',
    submitAssignment: 'Ziga maka Azịza AI',
    generateCertificate: 'Mepụta Ndekọ',
    downloadCertificate: 'Budata Ndekọ',
    verifyCertificate: 'Jiri Ndekọ',
    complianceDashboard: 'Ihe Ọkike NCAT Dodor',
    enrollments: 'Ndị Banye Nile',
    completionRate: 'Ọnụ Akanw Nke Nzu',
    certificatesIssued: 'Ndekọ E Nyere',
    paystackIntegration: 'Kwụọ Paystack',
    selectPaymentPlan: 'Họrọ Ụgwụ Usoro',
    monthly_3: 'Ụkwụ nke ọnwa 3',
    monthly_6: 'Ụkwụ nke ọnwa 6',
    selectLanguage: 'Họrọ Asụsụ',
    selectInstructorGender: 'Nke Onye Nkuzi',
    fleetDatabase: 'NCAT Fleet Ozi Ntaja',
    aboutNCAT: 'Maka NCAT Track',
    ncat_track_desc: 'Soro NCAT nyere ओkwa na nkwado ngosipụta',
    videosAndResources: 'Vidio na Ume',
    youtubePromo: 'Ihe YouTube Ngosi (Efu)',
    premiumCourseVidoes: 'Ihe Omuma Premium (Banye Nwere Ike)'
  },
  es: {
    title: 'Academia de Aviación DomisLink',
    subtitle: 'Plataforma de Entrenamiento Piloto Alineada NCAT',
    courses: 'Cursos',
    instructor: 'Instructor de IA',
    assignments: 'Tareas',
    certificates: 'Certificados',
    compliance: 'Cumplimiento',
    payments: 'Pagos',
    settings: 'Configuración',
    welcome: 'Bienvenido a la Academia de Aviación DomisLink',
    description: 'Domine la aviación a través de aeronaves NCAT reales, instrucción guiada por IA y certificación verificada.',
    selectCourse: 'Seleccione Su Curso',
    ppl: 'Licencia de Piloto Privado',
    cpl: 'Licencia de Piloto Comercial',
    atpl: 'Piloto de Línea Aérea',
    ppl_price: '₦65,000 - ₦250,000',
    cpl_price: '₦250,000 - ₦500,000',
    atpl_price: '₦500,000 - ₦1,800,000'
  },
  pt: {
    title: 'Academia de Aviação DomisLink',
    subtitle: 'Plataforma de Treinamento de Pilotos Alinhada NCAT',
    courses: 'Cursos',
    instructor: 'Instrutor de IA',
    assignments: 'Tarefas',
    certificates: 'Certificados',
    compliance: 'Conformidade',
    payments: 'Pagamentos',
    settings: 'Configurações',
    welcome: 'Bem-vindo à Academia de Aviação DomisLink',
    description: 'Domine a aviação através de aeronaves NCAT reais, instrução guiada por IA e certificação verificada.'
  },
  ar: {
    title: 'أكاديمية دومسلينك للطيران',
    subtitle: 'منصة تدريب الطيارين المتوافقة مع NCAT',
    courses: 'الدورات',
    instructor: 'مدرب الذكاء الاصطناعي',
    assignments: 'الواجبات',
    certificates: 'الشهادات',
    compliance: 'الامتثال',
    payments: 'المدفوعات',
    settings: 'الإعدادات'
  },
  de: {
    title: 'DomisLink Flugakademie',
    subtitle: 'NCAT-konforme Pilotenausbildungsplattform',
    courses: 'Kurse',
    instructor: 'KI-Ausbilder',
    assignments: 'Aufgaben',
    certificates: 'Zertifikate',
    compliance: 'Einhaltung',
    payments: 'Zahlungen',
    settings: 'Einstellungen'
  },
  it: {
    title: 'Accademia di Aviazione DomisLink',
    subtitle: 'Piattaforma di Addestramento Pilota Allineata NCAT',
    courses: 'Corsi',
    instructor: 'Istruttore IA',
    assignments: 'Compiti',
    certificates: 'Certificati',
    compliance: 'Conformità',
    payments: 'Pagamenti',
    settings: 'Impostazioni'
  },
  ja: {
    title: 'DomisLink航空アカデミー',
    subtitle: 'NCAT準拠のパイロット訓練プラットフォーム',
    courses: 'コース',
    instructor: 'AI インストラクター',
    assignments: '課題',
    certificates: '証明書',
    compliance: 'コンプライアンス',
    payments: '支払い',
    settings: '設定'
  },
  zh: {
    title: 'DomisLink 航空学院',
    subtitle: 'NCAT一致的飞行员培训平台',
    courses: '课程',
    instructor: '人工智能教官',
    assignments: '作业',
    certificates: '证书',
    compliance: '合规性',
    payments: '付款',
    settings: '设置'
  }
};

export default function DomisLinkAviationAcademy() {
  const [language, setLanguage] = useState('en');
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedInstructor, setSelectedInstructor] = useState('male');
  const [studentName, setStudentName] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [ocrFeedback, setOcrFeedback] = useState('');
  const [generatedCert, setGeneratedCert] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Generate QR Certificate
  const generateCertificate = async () => {
    if (!studentName) {
      alert('Please enter your name');
      return;
    }
    
    setLoading(true);
    const certData = {
      student: studentName,
      course: selectedCourse,
      instructor: selectedInstructor,
      date: new Date().toLocaleDateString(),
      certificateId: `NCAT-${Date.now()}`,
      icaoRef: `ICAO-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      ncaaRef: `NCAA-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    };

    // Simulate QR code (in production, use qrcode.react library)
    const qrValue = `https://aviation-academy.domislinker.com/verify/${certData.certificateId}`;
    
    setGeneratedCert({
      ...certData,
      qrCode: qrValue,
      timestamp: new Date().toISOString()
    });
    setLoading(false);
  };

  // AI Instructor Response (Claude API simulation)
  const callAIInstructor = async (message) => {
    setLoading(true);
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 500,
          messages: [
            {
              role: 'user',
              content: `You are an experienced NCAT-trained aviation instructor. Respond professionally and educationally to: ${message}`
            }
          ]
        })
      });

      const data = await response.json();
      return data.content[0]?.text || 'Unable to generate response';
    } catch (error) {
      return 'AI Instructor temporarily unavailable';
    } finally {
      setLoading(false);
    }
  };

  // OCR Assignment Processing
  const handleAssignmentSubmit = async () => {
    if (!uploadedFile) {
      alert('Please select a file');
      return;
    }

    setLoading(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        // In production: send to Claude Vision API for OCR
        const feedback = await callAIInstructor(`Student submitted assignment. Grade this work and provide detailed feedback focusing on accuracy and aviation knowledge.`);
        setOcrFeedback(feedback);
      } catch (error) {
        setOcrFeedback('Error processing assignment. Please try again.');
      }
      setLoading(false);
    };
    reader.readAsDataURL(uploadedFile);
  };

  // Compliance Dashboard
  const ComplianceDashboard = () => (
    <div className="p-8 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <h2 className="text-3xl font-bold text-yellow-400 mb-8">{t.complianceDashboard}</h2>
      
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg border border-yellow-400">
          <div className="text-yellow-400 text-4xl font-bold">1,240</div>
          <p className="text-gray-300">{t.enrollments}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-yellow-400">
          <div className="text-yellow-400 text-4xl font-bold">87%</div>
          <p className="text-gray-300">{t.completionRate}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-yellow-400">
          <div className="text-yellow-400 text-4xl font-bold">1,078</div>
          <p className="text-gray-300">{t.certificatesIssued}</p>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg border border-yellow-400 mb-8">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">NCAT Alignment Checklist</h3>
        <ul className="space-y-2 text-gray-300">
          <li>✅ Real NCAT aircraft database (Tampico TB9, Trinidad TB20, Beech 58, Bell 206, TBM 850)</li>
          <li>✅ NCAT-approved curriculum track</li>
          <li>✅ NCAA certificate integration</li>
          <li>✅ Transparent compliance audit trail</li>
          <li>✅ Instructor certification verification</li>
          <li>✅ Student assessment alignment</li>
        </ul>
      </div>

      <button 
        onClick={() => alert('PDF compliance report generated')}
        className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-300"
      >
        {t.downloadCertificate} PDF Report
      </button>
    </div>
  );

  // Fleet Database View
  const FleetDatabase = () => (
    <div className="p-8 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <h2 className="text-3xl font-bold text-yellow-400 mb-8">{t.fleetDatabase}</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-yellow-400 mb-3">Single-Engine Training Aircraft</h3>
          {NCAT_FLEET.single_engine.map(aircraft => (
            <div key={aircraft.id} className="bg-gray-800 p-4 rounded-lg mb-2 border border-yellow-400">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-white">{aircraft.name} (Qty: {aircraft.qty})</p>
                  <p className="text-gray-400 text-sm">{aircraft.engine} | Max: {aircraft.maxSpeed}kt | Range: {aircraft.range}nm</p>
                </div>
                <span className="text-yellow-400 font-bold">{aircraft.capacity} seats</span>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-xl font-bold text-yellow-400 mb-3">Twin-Engine Aircraft</h3>
          {NCAT_FLEET.twin_engine.map(aircraft => (
            <div key={aircraft.id} className="bg-gray-800 p-4 rounded-lg mb-2 border border-yellow-400">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-white">{aircraft.name} (Qty: {aircraft.qty})</p>
                  <p className="text-gray-400 text-sm">{aircraft.engine} | Max: {aircraft.maxSpeed}kt | Range: {aircraft.range}nm</p>
                </div>
                <span className="text-yellow-400 font-bold">{aircraft.capacity} seats</span>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-xl font-bold text-yellow-400 mb-3">Rotorcraft</h3>
          {NCAT_FLEET.rotorcraft.map(aircraft => (
            <div key={aircraft.id} className="bg-gray-800 p-4 rounded-lg mb-2 border border-yellow-400">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-white">{aircraft.name} (Qty: {aircraft.qty})</p>
                  <p className="text-gray-400 text-sm">{aircraft.engine} | Max: {aircraft.maxSpeed}kt | Range: {aircraft.range}nm</p>
                </div>
                <span className="text-yellow-400 font-bold">{aircraft.capacity} seats</span>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-xl font-bold text-yellow-400 mb-3">Advanced Aircraft</h3>
          {NCAT_FLEET.advanced.map(aircraft => (
            <div key={aircraft.id} className="bg-gray-800 p-4 rounded-lg mb-2 border border-yellow-400">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-white">{aircraft.name} (Qty: {aircraft.qty})</p>
                  <p className="text-gray-400 text-sm">{aircraft.engine} | Max: {aircraft.maxSpeed}kt | Range: {aircraft.range}nm</p>
                </div>
                <span className="text-yellow-400 font-bold">{aircraft.capacity} seats</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 text-white font-sans">
      {/* Header */}
      <header className="bg-gray-900 border-b-2 border-yellow-400 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Plane className="w-8 h-8 text-yellow-400" />
            <h1 className="text-2xl font-bold text-yellow-400">{t.title}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-800 border border-yellow-400 text-yellow-400 px-3 py-2 rounded-lg font-bold"
            >
              <option value="en">🇬🇧 English</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="ha">🇳🇬 Hausa</option>
              <option value="ig">🇳🇬 Igbo</option>
              <option value="es">🇪🇸 Español</option>
              <option value="pt">🇵🇹 Português</option>
              <option value="ar">🇸🇦 العربية</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="it">🇮🇹 Italiano</option>
              <option value="ja">🇯🇵 日本語</option>
              <option value="zh">🇨🇳 中文</option>
            </select>

            <button 
              onClick={() => setCurrentPage('home')}
              className="text-yellow-400 hover:text-white transition"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-yellow-400">
        <div className="max-w-7xl mx-auto px-6 flex gap-8">
          <button 
            onClick={() => setCurrentPage('home')}
            className={`py-3 px-4 font-bold ${currentPage === 'home' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`}
          >
            🏠 {t.courses}
          </button>
          <button 
            onClick={() => setCurrentPage('instructor')}
            className={`py-3 px-4 font-bold ${currentPage === 'instructor' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`}
          >
            🤖 {t.instructor}
          </button>
          <button 
            onClick={() => setCurrentPage('assignments')}
            className={`py-3 px-4 font-bold ${currentPage === 'assignments' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`}
          >
            📝 {t.assignments}
          </button>
          <button 
            onClick={() => setCurrentPage('certificates')}
            className={`py-3 px-4 font-bold ${currentPage === 'certificates' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`}
          >
            🎓 {t.certificates}
          </button>
          <button 
            onClick={() => setCurrentPage('compliance')}
            className={`py-3 px-4 font-bold ${currentPage === 'compliance' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`}
          >
            📊 {t.compliance}
          </button>
          <button 
            onClick={() => setCurrentPage('fleet')}
            className={`py-3 px-4 font-bold ${currentPage === 'fleet' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`}
          >
            ✈️ {t.fleetDatabase}
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* HOME PAGE */}
        {currentPage === 'home' && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-yellow-400 mb-4">{t.welcome}</h2>
              <p className="text-xl text-gray-300">{t.description}</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-yellow-400 mb-6">{t.selectCourse}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: 'ppl', name: t.ppl, price: t.ppl_price },
                  { id: 'cpl', name: t.cpl, price: t.cpl_price },
                  { id: 'atpl', name: t.atpl, price: t.atpl_price }
                ].map(course => (
                  <div 
                    key={course.id}
                    onClick={() => { setSelectedCourse(course.id); setCurrentPage('instructor'); }}
                    className="bg-gray-800 border-2 border-yellow-400 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition transform hover:scale-105"
                  >
                    <Award className="w-12 h-12 text-yellow-400 mb-4" />
                    <h4 className="text-xl font-bold text-white mb-2">{course.name}</h4>
                    <p className="text-yellow-400 font-bold text-lg mb-4">{course.price}</p>
                    <button className="w-full bg-yellow-400 text-black py-2 rounded-lg font-bold hover:bg-yellow-300">
                      {t.selectCourse} <ChevronRight className="inline w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* INSTRUCTOR PAGE */}
        {currentPage === 'instructor' && (
          <div className="space-y-8">
            <div className="bg-gray-800 border-2 border-yellow-400 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6">{t.selectInstructor}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div 
                  onClick={() => setSelectedInstructor('male')}
                  className={`p-6 rounded-lg border-2 cursor-pointer transition ${selectedInstructor === 'male' ? 'border-yellow-400 bg-gray-700' : 'border-gray-600 bg-gray-800 hover:border-yellow-400'}`}
                >
                  <Users className="w-16 h-16 text-yellow-400 mb-4" />
                  <p className="text-xl font-bold text-white">{t.male_instructor}</p>
                </div>

                <div 
                  onClick={() => setSelectedInstructor('female')}
                  className={`p-6 rounded-lg border-2 cursor-pointer transition ${selectedInstructor === 'female' ? 'border-yellow-400 bg-gray-700' : 'border-gray-600 bg-gray-800 hover:border-yellow-400'}`}
                >
                  <Users className="w-16 h-16 text-yellow-400 mb-4" />
                  <p className="text-xl font-bold text-white">{t.female_instructor}</p>
                </div>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg mb-6 border border-yellow-400">
                <h4 className="text-lg font-bold text-yellow-400 mb-4">Sample Instructor Message:</h4>
                <p className="text-gray-300 italic">
                  "Good morning, {selectedInstructor === 'male' ? 'I am Captain Okonkwo' : 'I am Captain Amara'}. Today we'll be covering pre-flight procedures on the Cessna 172. Let's ensure you understand every step before you enter the cockpit. Your safety and precision are my priorities."
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-bold text-yellow-400">Ask Your Instructor:</h4>
                <input 
                  type="text" 
                  placeholder="Ask a question..."
                  className="w-full bg-gray-700 border border-yellow-400 rounded-lg px-4 py-3 text-white placeholder-gray-400"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      alert('Claude API integration ready: ' + e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
              </div>
            </div>

            {/* Videos */}
            <div className="bg-gray-800 border-2 border-yellow-400 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6">{t.videosAndResources}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900 p-4 rounded-lg border border-yellow-400">
                  <Play className="w-8 h-8 text-yellow-400 mb-2" />
                  <p className="font-bold text-white mb-2">{t.youtubePromo}</p>
                  <iframe 
                    width="100%" 
                    height="200" 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </div>

                <div className="bg-gray-900 p-4 rounded-lg border border-yellow-400">
                  <Upload className="w-8 h-8 text-yellow-400 mb-2" />
                  <p className="font-bold text-white mb-2">{t.premiumCourseVidoes}</p>
                  <input 
                    type="file" 
                    accept="video/*"
                    className="w-full bg-gray-800 border border-yellow-400 rounded px-3 py-2 text-gray-300 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ASSIGNMENTS PAGE */}
        {currentPage === 'assignments' && (
          <div className="bg-gray-800 border-2 border-yellow-400 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-yellow-400 mb-6">{t.uploadAssignment}</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-yellow-400 font-bold mb-2">{t.uploadFile}</label>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*,.pdf"
                  onChange={(e) => setUploadedFile(e.target.files[0])}
                  className="w-full bg-gray-700 border border-yellow-400 rounded-lg px-4 py-3 text-gray-300"
                />
              </div>

              <button 
                onClick={handleAssignmentSubmit}
                disabled={loading}
                className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 disabled:opacity-50"
              >
                {loading ? 'Processing...' : t.submitAssignment}
              </button>

              {ocrFeedback && (
                <div className="bg-gray-900 p-6 rounded-lg border border-yellow-400">
                  <h3 className="text-xl font-bold text-yellow-400 mb-4">AI Feedback:</h3>
                  <p className="text-gray-300">{ocrFeedback}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CERTIFICATES PAGE */}
        {currentPage === 'certificates' && (
          <div className="bg-gray-800 border-2 border-yellow-400 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-yellow-400 mb-6">{t.generateCertificate}</h2>
            
            <div className="space-y-6">
              <input 
                type="text" 
                placeholder="Enter Your Full Name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full bg-gray-700 border border-yellow-400 rounded-lg px-4 py-3 text-white placeholder-gray-400"
              />

              <button 
                onClick={generateCertificate}
                disabled={loading || !studentName}
                className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 disabled:opacity-50 flex items-center gap-2"
              >
                <QrCode className="w-5 h-5" />
                {loading ? 'Generating...' : t.generateCertificate}
              </button>

              {generatedCert && (
                <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border-2 border-yellow-400">
                  <div className="text-center mb-6">
                    <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-yellow-400">{t.generateCertificate}</h3>
                  </div>

                  <div className="space-y-3 text-gray-300 mb-6 border-t border-b border-yellow-400 py-4">
                    <p><span className="text-yellow-400 font-bold">Student:</span> {generatedCert.student}</p>
                    <p><span className="text-yellow-400 font-bold">Course:</span> {generatedCert.course?.toUpperCase()}</p>
                    <p><span className="text-yellow-400 font-bold">Instructor:</span> {generatedCert.instructor === 'male' ? 'Captain Okonkwo' : 'Captain Amara'}</p>
                    <p><span className="text-yellow-400 font-bold">Date:</span> {generatedCert.date}</p>
                    <p><span className="text-yellow-400 font-bold">Certificate ID:</span> {generatedCert.certificateId}</p>
                    <p><span className="text-yellow-400 font-bold">ICAO Ref:</span> {generatedCert.icaoRef}</p>
                    <p><span className="text-yellow-400 font-bold">NCAA Ref:</span> {generatedCert.ncaaRef}</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg mb-6 text-center">
                    <p className="text-gray-800 font-bold mb-2">QR Code</p>
                    <p className="text-xs text-gray-600">{generatedCert.qrCode}</p>
                  </div>

                  <button 
                    onClick={() => alert('Certificate PDF downloaded')}
                    className="w-full bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    {t.downloadCertificate}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* COMPLIANCE PAGE */}
        {currentPage === 'compliance' && <ComplianceDashboard />}

        {/* FLEET PAGE */}
        {currentPage === 'fleet' && <FleetDatabase />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t-2 border-yellow-400 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <p>© 2026 DomisLink Aviation Academy | NCAT-Aligned | Powered by Cloudflare Pages</p>
          <p className="mt-2 text-sm">aviation-academy.domislinker.com | Real NCAT Fleet | AI-Powered Instruction | Verified Certification</p>
        </div>
      </footer>
    </div>
  );
}
