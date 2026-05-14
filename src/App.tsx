import { useState, useEffect } from 'react';

const NETWORKS = [
  {
    id: 'mtn',
    name: 'MTN',
    dot: '#f5b800',
    bundles: [
      {
        id: 1,
        size: '1GB',
        validity: '1 Day',
        price: 5,
        wholesale: 4,
        popular: false,
      },
      {
        id: 2,
        size: '2GB',
        validity: '3 Days',
        price: 9,
        wholesale: 7.5,
        popular: false,
      },
      {
        id: 3,
        size: '5GB',
        validity: '7 Days',
        price: 20,
        wholesale: 17,
        popular: true,
      },
      {
        id: 4,
        size: '10GB',
        validity: '30 Days',
        price: 38,
        wholesale: 32,
        popular: false,
      },
      {
        id: 5,
        size: '20GB',
        validity: '30 Days',
        price: 70,
        wholesale: 60,
        popular: false,
      },
      {
        id: 6,
        size: '50GB',
        validity: '30 Days',
        price: 160,
        wholesale: 138,
        popular: false,
      },
    ],
  },
  {
    id: 'telecel',
    name: 'Telecel',
    dot: '#ff1a27',
    bundles: [
      {
        id: 1,
        size: '1GB',
        validity: '1 Day',
        price: 5,
        wholesale: 4,
        popular: false,
      },
      {
        id: 2,
        size: '3GB',
        validity: '3 Days',
        price: 12,
        wholesale: 10,
        popular: false,
      },
      {
        id: 3,
        size: '5GB',
        validity: '7 Days',
        price: 20,
        wholesale: 17,
        popular: true,
      },
      {
        id: 4,
        size: '10GB',
        validity: '30 Days',
        price: 36,
        wholesale: 30,
        popular: false,
      },
      {
        id: 5,
        size: '25GB',
        validity: '30 Days',
        price: 80,
        wholesale: 68,
        popular: false,
      },
      {
        id: 6,
        size: '50GB',
        validity: '30 Days',
        price: 150,
        wholesale: 128,
        popular: false,
      },
    ],
  },
  {
    id: 'airteltigo',
    name: 'AirtelTigo',
    dot: '#ff4d38',
    bundles: [
      {
        id: 1,
        size: '1GB',
        validity: '1 Day',
        price: 4.5,
        wholesale: 3.8,
        popular: false,
      },
      {
        id: 2,
        size: '2.5GB',
        validity: '3 Days',
        price: 10,
        wholesale: 8.5,
        popular: false,
      },
      {
        id: 3,
        size: '5GB',
        validity: '7 Days',
        price: 19,
        wholesale: 16,
        popular: true,
      },
      {
        id: 4,
        size: '10GB',
        validity: '30 Days',
        price: 35,
        wholesale: 29,
        popular: false,
      },
      {
        id: 5,
        size: '20GB',
        validity: '30 Days',
        price: 65,
        wholesale: 55,
        popular: false,
      },
      {
        id: 6,
        size: '40GB',
        validity: '30 Days',
        price: 120,
        wholesale: 102,
        popular: false,
      },
    ],
  },
];

const STEPS = [
  {
    icon: '📡',
    step: '01',
    title: 'Pick Network',
    desc: 'Choose MTN, Telecel, or AirtelTigo.',
  },
  {
    icon: '📦',
    step: '02',
    title: 'Select Bundle',
    desc: 'Pick your data size and validity.',
  },
  {
    icon: '💳',
    step: '03',
    title: 'Pay Instantly',
    desc: 'MoMo or card via Paystack — secure.',
  },
  {
    icon: '⚡',
    step: '04',
    title: 'Receive Bundle',
    desc: 'Delivered to your number in seconds.',
  },
];

const FAQS = [
  {
    q: 'How fast do I receive my bundle?',
    a: 'Delivery is automatic and instant — usually within 30 seconds of payment confirmation.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept Mobile Money (MTN MoMo, Telecel Cash, AirtelTigo Money) and debit/credit cards via Paystack.',
  },
  {
    q: 'Do I need an account to buy?',
    a: 'No. You can checkout as a guest. Creating an account is optional.',
  },
  {
    q: 'How does the wholesale program work?',
    a: 'Pay a one-time GH₵50 registration fee to become a verified reseller and unlock discounted prices on all bundles.',
  },
  {
    q: "What if my bundle doesn't arrive?",
    a: 'Contact us immediately on WhatsApp or call our support line. We resolve all delivery issues within 15 minutes.',
  },
];

export default function App() {
  const [activeNet, setActiveNet] = useState('mtn');
  const [isWholesale, setIsWholesale] = useState(false);
  const [modal, setModal] = useState(null);
  const [cart, setCart] = useState(null);
  const [step, setStep] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [phone, setPhone] = useState('');
  const [recipient, setRecipient] = useState('');
  const [payMethod, setPayMethod] = useState('momo');
  const [wForm, setWForm] = useState({
    name: '',
    phone: '',
    email: '',
    network: 'mtn',
  });
  const [wSuccess, setWSuccess] = useState(false);

  const network = NETWORKS.find((n) => n.id === activeNet);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const openBuy = (bundle) => {
    setCart({ ...bundle, networkName: network.name });
    setPhone('');
    setRecipient('');
    setPayMethod('momo');
    setStep(1);
    setModal('buy');
  };

  const handlePay = () => {
    if (!phone || phone.replace(/\s/g, '').length < 9) return;
    setStep(2);
    setTimeout(() => setModal('buySuccess'), 2200);
  };

  const handleWholesale = () => {
    if (!wForm.name || wForm.phone.replace(/\s/g, '').length < 9) return;
    setWSuccess(true);
  };

  const price = (b) => (isWholesale ? b.wholesale : b.price);

  return (
    <div
      style={{
        fontFamily: "'Barlow Condensed','Arial Narrow',sans-serif",
        background: '#fff',
        overflowX: 'hidden',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        :root{--blue:#1A2FBF;--blue-d:#0B1664;--orange:#FF6B1A;--orange-l:#ff8a45;--gray:#F3F5FF;--muted:#8892c4}
        html{scroll-behavior:smooth}
        .nav{position:fixed;top:0;left:0;right:0;z-index:1000;padding:0 5%;transition:all .3s}
        .nav.solid{background:rgba(11,22,100,.97);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.07)}
        .nav-inner{height:68px;display:flex;align-items:center;justify-content:space-between}
        .logo{display:flex;align-items:center;gap:10px;cursor:pointer}
        .logo-box{width:38px;height:38px;background:var(--orange);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:900;color:#fff}
        .logo-txt{font-size:22px;font-weight:900}
        .logo-txt b{color:#fff}.logo-txt span{color:var(--orange)}
        .nav-links{display:flex;align-items:center;gap:28px}
        .nav-links a{color:rgba(255,255,255,.72);font-size:14px;font-weight:700;text-decoration:none;cursor:pointer;letter-spacing:.6px;transition:color .2s;text-transform:uppercase}
        .nav-links a:hover{color:var(--orange)}
        .nav-btn{background:var(--orange);color:#fff;border:none;padding:10px 22px;border-radius:9px;font-size:13px;font-weight:800;cursor:pointer;font-family:inherit;text-transform:uppercase;transition:all .2s}
        .nav-btn:hover{background:var(--orange-l)}
        .hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:4px}
        .hamburger span{display:block;width:24px;height:2px;background:#fff;border-radius:2px}
        .mob-menu{position:fixed;top:68px;left:0;right:0;background:var(--blue-d);z-index:999;padding:8px 5% 20px;border-bottom:1px solid rgba(255,255,255,.06)}
        .mob-menu a{display:block;color:rgba(255,255,255,.8);font-size:18px;font-weight:700;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.05);cursor:pointer;text-transform:uppercase}
        .mob-btn{width:100%;margin-top:16px;padding:14px;background:var(--orange);color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:800;cursor:pointer;font-family:inherit;text-transform:uppercase}
        .hero{min-height:100vh;background:linear-gradient(140deg,#060f4a 0%,#1A2FBF 55%,#0a1260 100%);display:flex;flex-direction:column;justify-content:center;padding:130px 5% 90px;position:relative;overflow:hidden}
        .orb{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none}
        .badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.18);color:rgba(255,255,255,.9);padding:7px 16px;border-radius:50px;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;margin-bottom:28px;width:fit-content}
        .bdot{width:7px;height:7px;border-radius:50%;background:var(--orange);animation:blink 2s infinite}
        @keyframes blink{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)}}
        .h1{font-size:clamp(56px,12vw,104px);font-weight:900;line-height:.88;letter-spacing:-1px;text-transform:uppercase;margin-bottom:26px}
        .h1 .w1{color:#fff;display:block}
        .h1 .w2{color:var(--orange);display:block}
        .h1 .w3{color:rgba(255,255,255,.18);display:block;-webkit-text-stroke:2px rgba(255,255,255,.25)}
        .h1 .w4{color:#fff;display:block}
        .hsub{color:rgba(255,255,255,.6);font-size:17px;font-weight:500;max-width:420px;line-height:1.65;margin-bottom:38px;font-family:'Barlow',sans-serif}
        .hbtns{display:flex;gap:14px;flex-wrap:wrap}
        .btn-s{background:var(--orange);color:#fff;border:none;padding:16px 32px;border-radius:12px;font-size:15px;font-weight:800;cursor:pointer;letter-spacing:.5px;transition:all .25s;font-family:inherit;text-transform:uppercase}
        .btn-s:hover{background:var(--orange-l);transform:translateY(-3px);box-shadow:0 10px 28px rgba(255,107,26,.45)}
        .btn-g{background:transparent;color:#fff;border:2px solid rgba(255,255,255,.28);padding:16px 32px;border-radius:12px;font-size:15px;font-weight:800;cursor:pointer;transition:all .25s;font-family:inherit;text-transform:uppercase}
        .btn-g:hover{border-color:#fff;background:rgba(255,255,255,.08)}
        .hstats{display:flex;gap:36px;margin-top:56px;padding-top:36px;border-top:1px solid rgba(255,255,255,.1);flex-wrap:wrap}
        .snum{font-size:34px;font-weight:900;color:var(--orange);line-height:1}
        .slbl{font-size:12px;color:rgba(255,255,255,.5);font-weight:700;letter-spacing:.5px;margin-top:4px;font-family:'Barlow',sans-serif;text-transform:uppercase}
        .sec{padding:80px 5%}
        .sec-dark{background:var(--blue-d)}
        .sec-gray{background:var(--gray)}
        .shd{font-size:clamp(30px,6vw,52px);font-weight:900;text-transform:uppercase;letter-spacing:-.5px;line-height:1}
        .shd.light{color:#fff}.shd.dark{color:var(--blue-d)}
        .ssub{font-size:16px;margin-top:10px;font-family:'Barlow',sans-serif;font-weight:500}
        .ssub.light{color:rgba(255,255,255,.5)}.ssub.dark{color:var(--muted)}
        .orange{color:var(--orange)}
        .net-tabs{display:flex;gap:10px;margin:32px 0 28px;flex-wrap:wrap}
        .ntab{display:flex;align-items:center;gap:8px;padding:11px 22px;border-radius:12px;border:2px solid rgba(255,255,255,.14);color:rgba(255,255,255,.55);font-size:14px;font-weight:800;cursor:pointer;transition:all .2s;background:transparent;font-family:inherit;letter-spacing:.5px;text-transform:uppercase}
        .ntab.on{border-color:var(--orange);color:#fff;background:rgba(255,107,26,.14)}
        .ntab:hover:not(.on){border-color:rgba(255,255,255,.3);color:rgba(255,255,255,.85)}
        .ndot{width:9px;height:9px;border-radius:50%;flex-shrink:0}
        .tier-wrap{display:inline-flex;background:rgba(255,255,255,.07);border-radius:12px;padding:4px;margin-bottom:32px;border:1px solid rgba(255,255,255,.08)}
        .tbtn{padding:10px 24px;border-radius:9px;border:none;font-size:13px;font-weight:800;cursor:pointer;letter-spacing:.5px;transition:all .22s;font-family:inherit;text-transform:uppercase;background:transparent;color:rgba(255,255,255,.5)}
        .tbtn.on{background:var(--orange);color:#fff;box-shadow:0 4px 14px rgba(255,107,26,.4)}
        .bgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px}
        .bcard{background:rgba(255,255,255,.04);border:1.5px solid rgba(255,255,255,.09);border-radius:18px;padding:24px 20px;cursor:pointer;transition:all .25s;position:relative;overflow:hidden}
        .bcard:hover{transform:translateY(-5px);background:rgba(255,255,255,.08);border-color:var(--orange);box-shadow:0 16px 40px rgba(0,0,0,.35)}
        .bcard-pop::after{content:'POPULAR';position:absolute;top:14px;right:-2px;background:var(--orange);color:#fff;font-size:9px;font-weight:900;padding:4px 12px 4px 10px;letter-spacing:1.5px;border-radius:4px 0 0 4px}
        .bsize{font-size:44px;font-weight:900;color:#fff;line-height:1;letter-spacing:-1px}
        .bvalid{font-size:12px;color:var(--muted);font-weight:600;margin:5px 0 16px;font-family:'Barlow',sans-serif;letter-spacing:.5px;text-transform:uppercase}
        .bprice{font-size:30px;font-weight:900;color:var(--orange);line-height:1}
        .bpsub{font-size:13px;color:rgba(255,255,255,.4);font-weight:600;margin-left:2px}
        .bsave{display:inline-flex;align-items:center;gap:4px;background:rgba(255,107,26,.18);color:var(--orange);font-size:10px;font-weight:800;padding:3px 9px;border-radius:6px;margin-top:8px;letter-spacing:.5px}
        .bbtn{width:100%;margin-top:20px;padding:12px;background:var(--orange);color:#fff;border:none;border-radius:10px;font-size:13px;font-weight:800;cursor:pointer;font-family:inherit;text-transform:uppercase;letter-spacing:.5px;transition:all .2s}
        .bbtn:hover{background:var(--orange-l)}
        .walert{background:rgba(255,107,26,.1);border:1px solid rgba(255,107,26,.28);border-radius:13px;padding:14px 18px;margin-bottom:26px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}
        .walert-txt{color:rgba(255,255,255,.8);font-size:14px;font-family:'Barlow',sans-serif;flex:1;line-height:1.5}
        .walert-btn{background:var(--orange);color:#fff;border:none;padding:9px 18px;border-radius:8px;font-weight:800;cursor:pointer;font-size:13px;font-family:inherit;white-space:nowrap;text-transform:uppercase}
        .sgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:20px;margin-top:44px}
        .scard{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:18px;padding:28px;transition:all .2s}
        .scard:hover{background:rgba(255,255,255,.07);transform:translateY(-3px)}
        .siw{width:52px;height:52px;background:rgba(255,107,26,.15);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:26px;margin-bottom:18px}
        .snum2{font-size:11px;font-weight:800;color:var(--orange);letter-spacing:2px;text-transform:uppercase;margin-bottom:8px}
        .stit{font-size:22px;font-weight:800;color:#fff;margin-bottom:8px}
        .sdesc{font-size:14px;color:rgba(255,255,255,.5);line-height:1.65;font-family:'Barlow',sans-serif}
        .wbanner{background:linear-gradient(135deg,#FF6B1A 0%,#d94f00 100%);border-radius:24px;padding:56px 5%;margin:0 5% 80px;display:flex;align-items:center;justify-content:space-between;gap:40px;flex-wrap:wrap;position:relative;overflow:hidden}
        .wbanner::before{content:'';position:absolute;right:-60px;top:-60px;width:240px;height:240px;border-radius:50%;background:rgba(255,255,255,.08)}
        .wleft h2{font-size:clamp(26px,5vw,46px);font-weight:900;color:#fff;text-transform:uppercase;line-height:.95}
        .wleft p{font-size:16px;color:rgba(255,255,255,.82);margin-top:14px;font-family:'Barlow',sans-serif;max-width:420px;line-height:1.6}
        .wperks{display:flex;gap:16px;margin-top:24px;flex-wrap:wrap}
        .perk{display:flex;align-items:center;gap:8px;color:#fff;font-size:14px;font-weight:700}
        .pbox{width:28px;height:28px;background:rgba(255,255,255,.2);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:13px}
        .wreg-btn{background:#fff;color:var(--orange);border:none;padding:18px 36px;border-radius:14px;font-size:16px;font-weight:900;cursor:pointer;font-family:inherit;text-transform:uppercase;transition:all .22s;flex-shrink:0;position:relative;z-index:1}
        .wreg-btn:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,0,0,.2)}
        .flist{margin-top:40px;display:flex;flex-direction:column;gap:12px;max-width:760px;margin-left:auto;margin-right:auto}
        .fitem{border:1.5px solid #dde3ff;border-radius:14px;overflow:hidden;transition:all .2s}
        .fitem.open{border-color:var(--blue);box-shadow:0 4px 20px rgba(26,47,191,.1)}
        .fq{display:flex;align-items:center;justify-content:space-between;padding:18px 22px;cursor:pointer;gap:16px}
        .fqtxt{font-size:17px;font-weight:800;color:var(--blue-d);line-height:1.3}
        .ficon{width:28px;height:28px;border-radius:8px;background:var(--gray);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;transition:all .2s;color:var(--blue)}
        .fitem.open .ficon{background:var(--blue);color:#fff;transform:rotate(45deg)}
        .fa-ans{padding:0 22px 18px;font-size:15px;color:#555;font-family:'Barlow',sans-serif;line-height:1.7}
        .footer{background:var(--blue-d);padding:60px 5% 28px}
        .fgrid{display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:40px;padding-bottom:44px;border-bottom:1px solid rgba(255,255,255,.07)}
        .flogo{display:flex;align-items:center;gap:10px;margin-bottom:14px}
        .flogo-box{width:38px;height:38px;background:var(--orange);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:900;color:#fff}
        .flogo-txt{font-size:22px;font-weight:900}
        .flogo-txt b{color:#fff}.flogo-txt span{color:var(--orange)}
        .ftagline{font-size:12px;color:rgba(255,255,255,.38);font-weight:700;letter-spacing:1.5px;text-transform:uppercase;font-family:'Barlow',sans-serif;margin-bottom:22px}
        .fwa{display:inline-flex;align-items:center;gap:8px;background:#25D366;color:#fff;padding:11px 18px;border-radius:10px;font-size:13px;font-weight:700;text-decoration:none;border:none;cursor:pointer;font-family:inherit}
        .fctit{font-size:11px;font-weight:800;color:var(--orange);letter-spacing:2px;text-transform:uppercase;margin-bottom:18px}
        .flinks{list-style:none;display:flex;flex-direction:column;gap:11px}
        .flinks li{color:rgba(255,255,255,.55);font-size:15px;font-weight:500;cursor:pointer;transition:color .2s;font-family:'Barlow',sans-serif}
        .flinks li:hover{color:#fff}
        .fbot{display:flex;align-items:center;justify-content:space-between;padding-top:22px;flex-wrap:wrap;gap:12px}
        .fcopy{font-size:13px;color:rgba(255,255,255,.35);font-family:'Barlow',sans-serif}
        .fcopy span{color:var(--orange)}
        .wafab{position:fixed;bottom:24px;right:24px;z-index:9999;background:#25D366;color:#fff;width:58px;height:58px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:28px;cursor:pointer;box-shadow:0 6px 24px rgba(37,211,102,.5);text-decoration:none;transition:all .2s}
        .wafab:hover{transform:scale(1.12)}
        .overlay{position:fixed;inset:0;background:rgba(0,0,0,.78);z-index:5000;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(5px)}
        .modal{background:#fff;border-radius:22px;padding:36px;width:100%;max-width:460px;max-height:92vh;overflow-y:auto;position:relative}
        .modal-x{position:absolute;top:16px;right:16px;background:#f0f2ff;border:none;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:15px;display:flex;align-items:center;justify-content:center;color:#555}
        .mtit{font-size:26px;font-weight:900;color:var(--blue-d);margin-bottom:4px}
        .msub{font-size:14px;color:#888;margin-bottom:26px;font-family:'Barlow',sans-serif;line-height:1.5}
        .obox{background:var(--gray);border-radius:14px;padding:20px;margin-bottom:24px}
        .orow{display:flex;justify-content:space-between;align-items:center;margin-bottom:9px}
        .orow:last-child{margin:0;border-top:1px solid #dde3ff;padding-top:12px;margin-top:6px}
        .olbl{font-size:13px;color:#999;font-family:'Barlow',sans-serif;font-weight:500}
        .oval{font-size:15px;font-weight:800;color:var(--blue-d)}
        .ototl{font-size:24px;font-weight:900;color:var(--orange)}
        .igrp{margin-bottom:16px}
        .ilbl{font-size:12px;font-weight:800;color:var(--blue-d);margin-bottom:7px;display:block;letter-spacing:.3px;text-transform:uppercase}
        .ifield{width:100%;padding:13px 16px;border:2px solid #dde3ff;border-radius:11px;font-size:15px;font-family:'Barlow',sans-serif;outline:none;transition:border-color .2s;background:#fafbff;color:#0d1340}
        .ifield:focus{border-color:var(--blue)}
        select.ifield{appearance:none;cursor:pointer}
        .payopts{display:flex;gap:10px;margin-bottom:22px}
        .popt{flex:1;padding:13px 10px;border:2px solid #dde3ff;border-radius:11px;text-align:center;cursor:pointer;transition:all .2s;font-size:13px;font-weight:800;color:#888;font-family:'Barlow',sans-serif}
        .popt.on{border-color:var(--blue);background:#f0f4ff;color:var(--blue)}
        .btnpay{width:100%;padding:16px;background:var(--blue);color:#fff;border:none;border-radius:13px;font-size:16px;font-weight:900;cursor:pointer;font-family:inherit;text-transform:uppercase;letter-spacing:.5px;transition:all .2s}
        .btnpay:hover{background:#1535d4}
        .btnpay:disabled{opacity:.4;cursor:not-allowed}
        .pbar{width:100%;height:6px;background:#e8ecff;border-radius:6px;overflow:hidden;margin:22px 0}
        .pfill{height:100%;background:linear-gradient(90deg,var(--blue),var(--orange));border-radius:6px;animation:prog 2.2s ease forwards}
        @keyframes prog{from{width:0}to{width:100%}}
        .sico{font-size:68px;text-align:center;margin:12px 0}
        .stit2{font-size:28px;font-weight:900;color:var(--blue-d);text-align:center;margin-bottom:8px}
        .sdesc2{font-size:15px;color:#777;text-align:center;font-family:'Barlow',sans-serif;line-height:1.65;margin-bottom:26px}
        @media(max-width:900px){.fgrid{grid-template-columns:1fr 1fr}.wbanner{text-align:center}.wperks{justify-content:center}.wreg-btn{width:100%}}
        @media(max-width:640px){.nav-links,.nav-btn{display:none}.hamburger{display:flex}.fgrid{grid-template-columns:1fr}.bgrid{grid-template-columns:1fr 1fr}.hstats{gap:22px}}
        @media(max-width:400px){.bgrid{grid-template-columns:1fr}}
      `}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? 'solid' : ''}`}>
        <div className="nav-inner">
          <div className="logo" onClick={() => go('hero')}>
            <div className="logo-box">U</div>
            <div className="logo-txt">
              <b>UNI</b>
              <span>MARKET</span>
            </div>
          </div>
          <div className="nav-links">
            <a onClick={() => go('bundles')}>Bundles</a>
            <a onClick={() => go('how')}>How It Works</a>
            <a onClick={() => go('wholesale')}>Resellers</a>
            <a onClick={() => go('faq')}>FAQ</a>
          </div>
          <button className="nav-btn" onClick={() => go('bundles')}>
            Buy Data →
          </button>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mob-menu">
          <a onClick={() => go('bundles')}>Bundles</a>
          <a onClick={() => go('how')}>How It Works</a>
          <a onClick={() => go('wholesale')}>Become a Reseller</a>
          <a onClick={() => go('faq')}>FAQ</a>
          <button className="mob-btn" onClick={() => go('bundles')}>
            Buy Bundle →
          </button>
        </div>
      )}

      {/* HERO */}
      <section id="hero" className="hero">
        <div
          className="orb"
          style={{
            width: 600,
            height: 600,
            background: '#FF6B1A',
            opacity: 0.18,
            top: -150,
            right: -120,
          }}
        />
        <div
          className="orb"
          style={{
            width: 400,
            height: 400,
            background: '#1A2FBF',
            opacity: 0.3,
            bottom: -80,
            left: '35%',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="badge">
            <span className="bdot" />
            NOW OPEN — SHOP DATA BUNDLES
          </div>
          <h1 className="h1">
            <span className="w1">ONE</span>
            <span className="w2">MARKET.</span>
            <span className="w3">EVERYTHING</span>
            <span className="w4">YOU NEED.</span>
          </h1>
          <p className="hsub">
            Fast, affordable data bundles for MTN, Telecel & AirtelTigo. Pay
            with MoMo or card. Delivered in seconds.
          </p>
          <div className="hbtns">
            <button className="btn-s" onClick={() => go('bundles')}>
              Start Shopping →
            </button>
            <button className="btn-g" onClick={() => go('wholesale')}>
              Become a Reseller
            </button>
          </div>
          <div className="hstats">
            <div>
              <div className="snum">3</div>
              <div className="slbl">Networks</div>
            </div>
            <div>
              <div className="snum">&lt;30s</div>
              <div className="slbl">Delivery</div>
            </div>
            <div>
              <div className="snum">24/7</div>
              <div className="slbl">Support</div>
            </div>
            <div>
              <div className="snum">🔒</div>
              <div className="slbl">Paystack Secured</div>
            </div>
          </div>
        </div>
      </section>

      {/* BUNDLES */}
      <section id="bundles" className="sec sec-dark">
        <div className="shd light">
          DATA <span className="orange">BUNDLES</span>
        </div>
        <div className="ssub light">
          Choose your network and pick the perfect plan
        </div>
        <div className="net-tabs">
          {NETWORKS.map((n) => (
            <button
              key={n.id}
              className={`ntab ${activeNet === n.id ? 'on' : ''}`}
              onClick={() => setActiveNet(n.id)}
            >
              <span className="ndot" style={{ background: n.dot }} />
              {n.name}
            </button>
          ))}
        </div>
        <div className="tier-wrap">
          <button
            className={`tbtn ${!isWholesale ? 'on' : ''}`}
            onClick={() => setIsWholesale(false)}
          >
            Retail
          </button>
          <button
            className={`tbtn ${isWholesale ? 'on' : ''}`}
            onClick={() => setIsWholesale(true)}
          >
            Wholesale 💼
          </button>
        </div>
        {isWholesale && (
          <div className="walert">
            <span style={{ fontSize: 20 }}>💼</span>
            <div className="walert-txt">
              Wholesale prices shown.{' '}
              <strong style={{ color: '#fff' }}>
                Register as a reseller (GH₵50 one-time)
              </strong>{' '}
              to access these rates.
            </div>
            <button
              className="walert-btn"
              onClick={() => setModal('wholesale')}
            >
              Register Now →
            </button>
          </div>
        )}
        <div className="bgrid">
          {network.bundles.map((b) => (
            <div key={b.id} className={`bcard ${b.popular ? 'bcard-pop' : ''}`}>
              <div className="bsize">{b.size}</div>
              <div className="bvalid">⏱ {b.validity}</div>
              <div className="bprice">
                {price(b)}
                <span className="bpsub"> GH₵</span>
              </div>
              {isWholesale && (
                <div className="bsave">
                  💰 Save GH₵{(b.price - b.wholesale).toFixed(1)}
                </div>
              )}
              <button className="bbtn" onClick={() => openBuy(b)}>
                Buy Now →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="sec sec-dark" style={{ paddingTop: 0 }}>
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,.07)',
            paddingTop: 72,
          }}
        >
          <div className="shd light">
            HOW IT <span className="orange">WORKS</span>
          </div>
          <div className="ssub light">
            Four simple steps — buy your bundle in under a minute
          </div>
          <div className="sgrid">
            {STEPS.map((s, i) => (
              <div key={i} className="scard">
                <div className="siw">{s.icon}</div>
                <div className="snum2">Step {s.step}</div>
                <div className="stit">{s.title}</div>
                <div className="sdesc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHOLESALE */}
      <div id="wholesale">
        <div className="wbanner">
          <div className="wleft" style={{ position: 'relative', zIndex: 1 }}>
            <h2>
              BECOME A<br />
              RESELLER TODAY
            </h2>
            <p>
              Pay once, earn forever. Get discounted bundle prices across all
              networks and build your own data business.
            </p>
            <div className="wperks">
              {[
                ['✅', 'Cheaper Prices'],
                ['📲', 'SMS Alerts'],
                ['🤝', 'Support'],
                ['💰', 'High Margins'],
              ].map(([ic, lbl]) => (
                <div key={lbl} className="perk">
                  <div className="pbox">{ic}</div>
                  {lbl}
                </div>
              ))}
            </div>
          </div>
          <button className="wreg-btn" onClick={() => setModal('wholesale')}>
            Register — GH₵50 →
          </button>
        </div>
      </div>

      {/* FAQ */}
      <section id="faq" className="sec sec-gray">
        <div style={{ textAlign: 'center' }}>
          <div className="shd dark">
            FREQUENTLY ASKED <span className="orange">QUESTIONS</span>
          </div>
        </div>
        <div className="flist">
          {FAQS.map((f, i) => (
            <div key={i} className={`fitem ${openFaq === i ? 'open' : ''}`}>
              <div
                className="fq"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="fqtxt">{f.q}</span>
                <span className="ficon">+</span>
              </div>
              {openFaq === i && <div className="fa-ans">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="fgrid">
          <div>
            <div className="flogo">
              <div className="flogo-box">U</div>
              <div className="flogo-txt">
                <b>UNI</b>
                <span>MARKET</span>
              </div>
            </div>
            <div className="ftagline">One Market. Everything You Need.</div>
            <a
              className="fwa"
              href="https://chat.whatsapp.com/Ih8ivypyeZ2FZa8hGjWAJs"
              target="_blank"
              rel="noreferrer"
            >
              💬 Join WhatsApp Group
            </a>
            <div
              style={{
                marginTop: 14,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <a
                href="tel:+233594520170"
                style={{
                  color: 'rgba(255,255,255,.6)',
                  fontSize: 14,
                  fontFamily: "'Barlow',sans-serif",
                  textDecoration: 'none',
                }}
              >
                📞 +233 59 452 0170
              </a>
              <a
                href="tel:+233554874227"
                style={{
                  color: 'rgba(255,255,255,.6)',
                  fontSize: 14,
                  fontFamily: "'Barlow',sans-serif",
                  textDecoration: 'none',
                }}
              >
                📞 +233 55 487 4227
              </a>
              <a
                href="mailto:unimarketelga@gmail.com"
                style={{
                  color: 'rgba(255,255,255,.6)',
                  fontSize: 14,
                  fontFamily: "'Barlow',sans-serif",
                  textDecoration: 'none',
                }}
              >
                ✉️ unimarketelga@gmail.com
              </a>
            </div>
          </div>
          <div>
            <div className="fctit">Shop</div>
            <ul className="flinks">
              {[
                'MTN Bundles',
                'Telecel Bundles',
                'AirtelTigo Bundles',
                'Wholesale',
              ].map((l) => (
                <li key={l} onClick={() => go('bundles')}>
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="fctit">Company</div>
            <ul className="flinks">
              {['About UniMarket', 'Careers', 'Press'].map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="fctit">Support</div>
            <ul className="flinks">
              <li>
                <a
                  href="https://chat.whatsapp.com/Ih8ivypyeZ2FZa8hGjWAJs"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  WhatsApp Group
                </a>
              </li>
              <li>
                <a
                  href="tel:+233594520170"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  +233 59 452 0170
                </a>
              </li>
              <li>
                <a
                  href="mailto:unimarketelga@gmail.com"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Send Email
                </a>
              </li>
              <li
                onClick={() => setModal('wholesale')}
                style={{ cursor: 'pointer' }}
              >
                Reseller Program
              </li>
            </ul>
          </div>
        </div>
        <div className="fbot">
          <div className="fcopy">
            © 2026 <span>UniMarket</span>. All rights reserved.
          </div>
          <div className="fcopy">One Market. Everything You Need.</div>
        </div>
      </footer>

      {/* WHATSAPP FAB */}
      <a
        href="https://chat.whatsapp.com/Ih8ivypyeZ2FZa8hGjWAJs"
        target="_blank"
        rel="noreferrer"
        className="wafab"
      >
        💬
      </a>

      {/* BUY MODAL */}
      {modal === 'buy' && cart && (
        <div
          className="overlay"
          onClick={(e) => e.target === e.currentTarget && setModal(null)}
        >
          <div className="modal">
            <button className="modal-x" onClick={() => setModal(null)}>
              ✕
            </button>
            {step === 1 ? (
              <>
                <div className="mtit">Complete Purchase</div>
                <div className="msub">
                  Buying {cart.size} on {cart.networkName}
                </div>
                <div className="obox">
                  <div className="orow">
                    <span className="olbl">Network</span>
                    <span className="oval">{cart.networkName}</span>
                  </div>
                  <div className="orow">
                    <span className="olbl">Bundle</span>
                    <span className="oval">{cart.size}</span>
                  </div>
                  <div className="orow">
                    <span className="olbl">Validity</span>
                    <span className="oval">{cart.validity}</span>
                  </div>
                  <div className="orow">
                    <span className="olbl">Total</span>
                    <span className="ototl">GH₵{price(cart)}</span>
                  </div>
                </div>
                <div className="igrp">
                  <label className="ilbl">📱 Your Phone Number</label>
                  <input
                    className="ifield"
                    placeholder="e.g. 024 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="igrp">
                  <label className="ilbl">📲 Recipient Number (optional)</label>
                  <input
                    className="ifield"
                    placeholder="Leave blank to send to your number"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                </div>
                <div className="igrp">
                  <label className="ilbl">💳 Payment Method</label>
                  <div className="payopts">
                    <div
                      className={`popt ${payMethod === 'momo' ? 'on' : ''}`}
                      onClick={() => setPayMethod('momo')}
                    >
                      📱 MoMo
                    </div>
                    <div
                      className={`popt ${payMethod === 'card' ? 'on' : ''}`}
                      onClick={() => setPayMethod('card')}
                    >
                      💳 Card
                    </div>
                  </div>
                </div>
                <button
                  className="btnpay"
                  onClick={handlePay}
                  disabled={!phone || phone.replace(/\s/g, '').length < 9}
                >
                  Pay GH₵{price(cart)} via Paystack →
                </button>
              </>
            ) : (
              <>
                <div className="mtit">Processing...</div>
                <div className="msub">
                  Verifying your payment and sending bundle.
                </div>
                <div className="pbar">
                  <div className="pfill" />
                </div>
                <div
                  style={{
                    textAlign: 'center',
                    color: '#aaa',
                    fontSize: 14,
                    fontFamily: "'Barlow',sans-serif",
                  }}
                >
                  Please do not close this window ⏳
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* BUY SUCCESS */}
      {modal === 'buySuccess' && (
        <div
          className="overlay"
          onClick={(e) => e.target === e.currentTarget && setModal(null)}
        >
          <div className="modal" style={{ textAlign: 'center' }}>
            <div className="sico">🎉</div>
            <div className="stit2">Bundle Sent!</div>
            <div className="sdesc2">
              Your {cart?.size} bundle has been delivered. You'll receive an SMS
              confirmation on <strong>{phone}</strong> shortly.
            </div>
            <button
              className="btnpay"
              onClick={() => {
                setModal(null);
                setCart(null);
              }}
            >
              Done ✓
            </button>
          </div>
        </div>
      )}

      {/* WHOLESALE MODAL */}
      {modal === 'wholesale' && (
        <div
          className="overlay"
          onClick={(e) => e.target === e.currentTarget && setModal(null)}
        >
          <div className="modal">
            <button className="modal-x" onClick={() => setModal(null)}>
              ✕
            </button>
            {!wSuccess ? (
              <>
                <div className="mtit">Reseller Registration</div>
                <div className="msub">
                  One-time GH₵50 fee — unlock wholesale pricing forever.
                </div>
                <div
                  style={{
                    background: '#fff8f4',
                    border: '1px solid #ffd5be',
                    borderRadius: 12,
                    padding: '14px 18px',
                    marginBottom: 22,
                    display: 'flex',
                    gap: 12,
                  }}
                >
                  <span style={{ fontSize: 22 }}>💡</span>
                  <div
                    style={{
                      fontSize: 13,
                      color: '#666',
                      fontFamily: "'Barlow',sans-serif",
                      lineHeight: 1.6,
                    }}
                  >
                    After registration, your account will be reviewed and
                    approved within <strong>24 hours</strong>. You'll get an SMS
                    once verified.
                  </div>
                </div>
                <div className="igrp">
                  <label className="ilbl">Full Name</label>
                  <input
                    className="ifield"
                    placeholder="Your full name"
                    value={wForm.name}
                    onChange={(e) =>
                      setWForm({ ...wForm, name: e.target.value })
                    }
                  />
                </div>
                <div className="igrp">
                  <label className="ilbl">Phone Number</label>
                  <input
                    className="ifield"
                    placeholder="e.g. 024 000 0000"
                    value={wForm.phone}
                    onChange={(e) =>
                      setWForm({ ...wForm, phone: e.target.value })
                    }
                  />
                </div>
                <div className="igrp">
                  <label className="ilbl">Email (optional)</label>
                  <input
                    className="ifield"
                    type="email"
                    placeholder="your@email.com"
                    value={wForm.email}
                    onChange={(e) =>
                      setWForm({ ...wForm, email: e.target.value })
                    }
                  />
                </div>
                <div className="igrp">
                  <label className="ilbl">Primary Network</label>
                  <select
                    className="ifield"
                    value={wForm.network}
                    onChange={(e) =>
                      setWForm({ ...wForm, network: e.target.value })
                    }
                  >
                    <option value="mtn">MTN</option>
                    <option value="telecel">Telecel</option>
                    <option value="airteltigo">AirtelTigo</option>
                    <option value="all">All Networks</option>
                  </select>
                </div>
                <button
                  className="btnpay"
                  onClick={handleWholesale}
                  disabled={
                    !wForm.name || wForm.phone.replace(/\s/g, '').length < 9
                  }
                >
                  Pay GH₵50 & Register →
                </button>
              </>
            ) : (
              <>
                <div className="sico">🙌</div>
                <div className="stit2">Application Submitted!</div>
                <div className="sdesc2">
                  Thank you, <strong>{wForm.name}</strong>! We'll review and
                  approve your account within <strong>24 hours</strong>. SMS
                  confirmation will be sent to <strong>{wForm.phone}</strong>.
                </div>
                <button
                  className="btnpay"
                  onClick={() => {
                    setModal(null);
                    setWSuccess(false);
                    setWForm({
                      name: '',
                      phone: '',
                      email: '',
                      network: 'mtn',
                    });
                  }}
                >
                  Back to UniMarket
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
