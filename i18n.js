// i18n.js — 四语言切换系统 (zh/en/fr/ru)
function switchLang(lang){
  document.getElementById('langDrop').classList.remove('open');
  if(lang==='zh'){sessionStorage.removeItem('i18n_lang');location.reload();return;}
  sessionStorage.setItem('i18n_lang',lang);
  location.reload();
}
// 页面加载时，如果有待切换语言则自动应用
(function(){
  var saved=sessionStorage.getItem('i18n_lang');
  if(saved&&saved!=='zh'){
    sessionStorage.removeItem('i18n_lang');
    document.getElementById('langBtn').textContent={'en':'EN','fr':'FR','ru':'RU'}[saved]||saved;
    applyLang(saved);
  }
})();
// 下拉菜单事件委托
document.getElementById('langMenu').addEventListener('click',function(e){
  var lang=e.target.getAttribute('data-lang');
  if(lang)switchLang(lang);
});
// 点击外部关闭下拉
document.addEventListener('click',function(e){
  var d=document.getElementById('langDrop');
  if(d&&!d.contains(e.target))d.classList.remove('open');
});
function applyLang(L){
  document.documentElement.lang=L;
  document.title={en:'E-Cig Selection Guide',fr:'Guide de S\u00e9lection E-Cig',ru:'\u0413\u0438\u0434 \u043f\u043e \u0432\u044b\u0431\u043e\u0440\u0443 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u044b\u0445 \u0441\u0438\u0433\u0430\u0440\u0435\u0442'}[L]||'E-Cig Selection Guide';

  // === 1. data-i18n 字典 ===
  var D={
  en:{brand:'National Standard E-Cig Guide',nav_guide:'Guide',nav_pods:'Pods',nav_disposable:'Disposable',nav_devices:'Devices',nav_contact:'Contact',
  sec_guide:'Quick Shopping Guide',sec_guide_sub:'50+ National Standard Pods \u00b7 Find Your Match',
  guide1_title:'Fruity Alternative',guide1_sub:'Miss fruit flavors?',
  guide2_title:'Strong Throat Hit',guide2_sub:'Like a real cigarette',
  guide3_title:'Budget Guide',guide3_sub:'For every budget',
  sec_combo:'Recommended Combos',combo1_label:'Entry',combo1_cfg:'Qingyu+Qingyu Pods',
  combo2_label:'Classic',combo2_cfg:'Phantom 5+Phantom Pods',combo3_label:'Upgrade',combo3_cfg:'Yuying S+Phantom Pods',
  combo4_label:'Strong Hit',combo4_cfg:'Daqian+Daqian Pods',combo5_label:'Flagship',combo5_cfg:'Zeus+Zeus Pods',
  sec_device_table:'Device Quick Look',tbl_model:'Model',tbl_price:'Price',tbl_battery:'Battery',tbl_compat:'Compatible',tbl_color:'Colors',
  tbl_rec_need:'Need',tbl_rec_pick:'Pick',tbl_rec_price:'Price',tbl_rec_feat:'Feature',
  sec_dispo_rec:'Disposable Picks',sec_highlight_title:'Meishenwei Artisan-01 / Artisan-02 ',
  sec_highlight_title2:'Meishenwei Artisan-01 / Artisan-02 ',
  trust1_label:'Authentic',trust1_desc:'National standard, authorized channels',
  trust2_label:'Nationwide',trust2_desc:'SF Express, fast delivery',
  trust3_label:'Warranty',trust3_desc:'Factory-direct after-sales support',
  sec_pods:'Pods \u00b7 Flavor Guide',sec_pods_sub:'Phantom Pro \u00a5129 \u00b7 Phantom \u00a5119 \u00b7 Qingyu \u00a599',
  sec_pro:'Phantom Pro \u00b7 Gen 6 \u00b7 3 Power Modes',sec_phantom:'Phantom \u00b7 Gen 5/6 \u00b7 Widest Variety',
  sec_qingyu:'Qingyu \u00b7 \u00a599 \u00b7 Best Value',sec_daqian:'Daqian \u00b7 10ml Mega \u00b7 1 Pod = 5',sec_daqian_sub:'\u00a5109-129',
  sec_zeus:'Zeus \u00b7 Premium Flagship',sec_niche:'Niche Picks \u00b7 RELX Compatible',
  sec_disposable:'Disposables \u00b7 Flavor Guide',sec_disposable_sub:'Ready to use, no charging',
  sec_devices:'Devices \u00b7 Color Gallery',sec_devices_sub:'Every color \u00b7 Sorted by price',
  dev_qingyu:'Qingyu \u00b7 \u00a5218 \u00b7 Entry Pick',dev_daqian:'Daqian \u00b7 \u00a5258 \u00b7 Battery King',
  dev_h5:'Phantom 5 \u00b7 \u00a5328 \u00b7 Classic',dev_yuying:'Yuying S \u00b7 \u00a5368 \u00b7 Pro-Level Value',
  dev_pro:'Phantom Pro \u00b7 \u00a5428 \u00b7 Flagship',dev_zeus:'Zeus \u00b7 \u00a5888 \u00b7 Ultimate',
  sec_contact:'Contact Us',contact_addr:'189 Changshou Rd Shopping Center',contact_auth:'China Tobacco Authorized Store',
  contact_qr:'Scan for WeCom',footer:'Authentic \u00b7 Nationwide SF Shipping \u00b7 Factory Warranty',
  tip_adapter:'Free adapter with Daqian/Zeus \u00b7 Compatible with Qingyu/Phantom/Pro',
  tip_yuying:'Recommend Yuying S \u2014 Pro-level features (\u00a5428) for just \u00a5368',
  disp_relx:'RELX \u00b7 \u00a5139 \u00b7 9.6ml',disp_poolan:'POOLAN \u00b7 \u00a5139 \u00b7 10.5ml',disp_mirui:'MIRUI \u00b7 \u00a5129 \u00b7 10ml',
  disp_other:'Voopoo \u00b7 Meishenwei \u00b7 HQD',yuying_why:'Why Yuying S?',
  yuying_note:'Phantom Pro features (3 modes + screen + counter), only \u00a5368',zeus_spec:'Zeus 2.85ml \u00b7 Adapter for cross-series'},
  fr:{brand:'Guide S\u00e9lection E-Cig',nav_guide:'Guide',nav_pods:'Pods',nav_disposable:'Jetables',nav_devices:'Appareils',nav_contact:'Contact',
  sec_guide:'Guide d\u2019Achat Rapide',sec_guide_sub:'50+ Pods Standard National \u00b7 Trouvez Votre Match',
  guide1_title:'Alternative Fruit\u00e9e',guide1_sub:'Les saveurs fruit\u00e9es vous manquent?',
  guide2_title:'Hit Puissant',guide2_sub:'Comme une vraie cigarette',
  guide3_title:'Guide Budget',guide3_sub:'Pour tous les budgets',
  sec_combo:'Combos Recommand\u00e9s',combo1_label:'Entr\u00e9e',combo1_cfg:'Qingyu+Pods Qingyu',
  combo2_label:'Classique',combo2_cfg:'Phantom 5+Pods Phantom',combo3_label:'Avanc\u00e9',combo3_cfg:'Yuying S+Pods Phantom',
  combo4_label:'Hit Fort',combo4_cfg:'Daqian+Pods Daqian',combo5_label:'Premium',combo5_cfg:'Zeus+Pods Zeus',
  sec_device_table:'Aper\u00e7u Appareils',tbl_model:'Mod\u00e8le',tbl_price:'Prix',tbl_battery:'Batterie',tbl_compat:'Compatible',tbl_color:'Couleurs',
  tbl_rec_need:'Besoin',tbl_rec_pick:'Choix',tbl_rec_price:'Prix',tbl_rec_feat:'Caract\u00e9ristique',
  sec_dispo_rec:'Recommandations Jetables',sec_highlight_title:'Meishenwei Artisan-01 / Artisan-02 ',
  sec_highlight_title2:'Meishenwei Artisan-01 / Artisan-02 ',
  trust1_label:'Authentique',trust1_desc:'Norme nationale, canaux autoris\u00e9s',
  trust2_label:'National',trust2_desc:'SF Express, livraison rapide',
  trust3_label:'Garantie',trust3_desc:'SAV direct usine',
  sec_pods:'Pods \u00b7 Guide Saveurs',sec_pods_sub:'Phantom Pro \u00a5129 \u00b7 Phantom \u00a5119 \u00b7 Qingyu \u00a599',
  sec_pro:'Phantom Pro \u00b7 Gen 6 \u00b7 3 Modes',sec_phantom:'Phantom \u00b7 Gen 5/6 \u00b7 Plus de Choix',
  sec_qingyu:'Qingyu \u00b7 \u00a599 \u00b7 Meilleur Rapport',sec_daqian:'Daqian \u00b7 10ml Mega \u00b7 1=5',sec_daqian_sub:'\u00a5109-129',
  sec_zeus:'Zeus \u00b7 Premium',sec_niche:'S\u00e9lection \u00b7 Compatible RELX',
  sec_disposable:'Jetables \u00b7 Guide Saveurs',sec_disposable_sub:'Pr\u00eat \u00e0 l\u2019emploi, sans recharge',
  sec_devices:'Appareils \u00b7 Galerie',sec_devices_sub:'Toutes les couleurs \u00b7 Par prix',
  dev_qingyu:'Qingyu \u00b7 \u00a5218 \u00b7 Entr\u00e9e',dev_daqian:'Daqian \u00b7 \u00a5258 \u00b7 Autonomie',
  dev_h5:'Phantom 5 \u00b7 \u00a5328 \u00b7 Classique',dev_yuying:'Yuying S \u00b7 \u00a5368 \u00b7 Excellent Rapport',
  dev_pro:'Phantom Pro \u00b7 \u00a5428 \u00b7 Premium',dev_zeus:'Zeus \u00b7 \u00a5888 \u00b7 Ultime',
  sec_contact:'Contact',contact_addr:'189 Changshou Rd Centre Commercial',contact_auth:'Bureau de Tabac Agréé de Chine',
  contact_qr:'Scanner pour WeCom',footer:'Authentique \u00b7 Livraison Nationale SF \u00b7 Garantie Usine',
  tip_adapter:'Adaptateur gratuit avec Daqian/Zeus \u00b7 Compatible Qingyu/Phantom/Pro',
  tip_yuying:'Nous recommandons Yuying S \u2014 Performances Pro (\u00a5428) pour \u00a5368',
  disp_relx:'RELX \u00b7 \u00a5139 \u00b7 9.6ml',disp_poolan:'POOLAN \u00b7 \u00a5139 \u00b7 10.5ml',disp_mirui:'MIRUI \u00b7 \u00a5129 \u00b7 10ml',
  disp_other:'Voopoo \u00b7 Meishenwei \u00b7 HQD',yuying_why:'Pourquoi Yuying S?',
  yuying_note:'Fonctions Pro (3 modes + \u00e9cran + compteur), seulement \u00a5368',zeus_spec:'Zeus 2.85ml \u00b7 Adaptateur multi-s\u00e9ries'},
  ru:{brand:'\u0413\u0438\u0434 \u043f\u043e \u0432\u044b\u0431\u043e\u0440\u0443',nav_guide:'\u0413\u0438\u0434',nav_pods:'Pods',nav_disposable:'\u041e\u0434\u043d\u043e\u0440\u0430\u0437\u043e\u0432\u044b\u0435',nav_devices:'\u0423\u0441\u0442\u0440\u043e\u0439\u0441\u0442\u0432\u0430',nav_contact:'\u041a\u043e\u043d\u0442\u0430\u043a\u0442',
  sec_guide:'\u0411\u044b\u0441\u0442\u0440\u044b\u0439 \u0433\u0438\u0434',sec_guide_sub:'50+ \u043d\u0430\u0446\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0445 \u0441\u0442\u0430\u043d\u0434\u0430\u0440\u0442\u043e\u0432 \u00b7 \u041d\u0430\u0439\u0434\u0438\u0442\u0435 \u0441\u0432\u043e\u0439',
  guide1_title:'\u0424\u0440\u0443\u043a\u0442\u043e\u0432\u0430\u044f \u0430\u043b\u044c\u0442\u0435\u0440\u043d\u0430\u0442\u0438\u0432\u0430',guide1_sub:'\u0421\u043a\u0443\u0447\u0430\u0435\u0442\u0435 \u043f\u043e \u0444\u0440\u0443\u043a\u0442\u0430\u043c?',
  guide2_title:'\u0421\u0438\u043b\u044c\u043d\u044b\u0439 \u0443\u0434\u0430\u0440',guide2_sub:'\u041a\u0430\u043a \u043d\u0430\u0441\u0442\u043e\u044f\u0449\u0430\u044f \u0441\u0438\u0433\u0430\u0440\u0435\u0442\u0430',
  guide3_title:'\u0411\u044e\u0434\u0436\u0435\u0442',guide3_sub:'\u0414\u043b\u044f \u043b\u044e\u0431\u043e\u0433\u043e \u0431\u044e\u0434\u0436\u0435\u0442\u0430',
  sec_combo:'\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0430\u0446\u0438\u0438',combo1_label:'\u041d\u0430\u0447\u0430\u043b\u044c\u043d\u044b\u0439',combo1_cfg:'Qingyu+Pods Qingyu',
  combo2_label:'\u041a\u043b\u0430\u0441\u0441\u0438\u043a\u0430',combo2_cfg:'Phantom 5+Pods Phantom',combo3_label:'\u041f\u0440\u043e\u0434\u0432\u0438\u043d\u0443\u0442\u044b\u0439',combo3_cfg:'Yuying S+Pods Phantom',
  combo4_label:'\u0421\u0438\u043b\u044c\u043d\u044b\u0439',combo4_cfg:'Daqian+Pods Daqian',combo5_label:'\u0424\u043b\u0430\u0433\u043c\u0430\u043d',combo5_cfg:'Zeus+Pods Zeus',
  sec_device_table:'\u041e\u0431\u0437\u043e\u0440 \u0443\u0441\u0442\u0440\u043e\u0439\u0441\u0442\u0432',tbl_model:'\u041c\u043e\u0434\u0435\u043b\u044c',tbl_price:'\u0426\u0435\u043d\u0430',tbl_battery:'\u0411\u0430\u0442\u0430\u0440\u0435\u044f',tbl_compat:'\u0421\u043e\u0432\u043c\u0435\u0441\u0442\u0438\u043c\u043e\u0441\u0442\u044c',tbl_color:'\u0426\u0432\u0435\u0442\u0430',
  tbl_rec_need:'\u041d\u0443\u0436\u0434\u0430',tbl_rec_pick:'\u0412\u044b\u0431\u043e\u0440',tbl_rec_price:'\u0426\u0435\u043d\u0430',tbl_rec_feat:'\u041e\u0441\u043e\u0431\u0435\u043d\u043d\u043e\u0441\u0442\u0438',
  sec_dispo_rec:'\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0430\u0446\u0438\u0438',sec_highlight_title:'Meishenwei Artisan-01 / Artisan-02 ',
  sec_highlight_title2:'Meishenwei Artisan-01 / Artisan-02 ',
  trust1_label:'\u041e\u0440\u0438\u0433\u0438\u043d\u0430\u043b',trust1_desc:'\u041d\u0430\u0446\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0439 \u0441\u0442\u0430\u043d\u0434\u0430\u0440\u0442, \u043e\u0444\u0438\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0435 \u043a\u0430\u043d\u0430\u043b\u044b',
  trust2_label:'\u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430',trust2_desc:'SF Express, \u0431\u044b\u0441\u0442\u0440\u0430\u044f \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0430',
  trust3_label:'\u0413\u0430\u0440\u0430\u043d\u0442\u0438\u044f',trust3_desc:'\u041f\u0440\u044f\u043c\u0430\u044f \u0433\u0430\u0440\u0430\u043d\u0442\u0438\u044f \u0437\u0430\u0432\u043e\u0434\u0430',
  sec_pods:'Pods \u00b7 \u0413\u0438\u0434 \u043f\u043e \u0432\u043a\u0443\u0441\u0430\u043c',sec_pods_sub:'Phantom Pro \u00a5129 \u00b7 Phantom \u00a5119 \u00b7 Qingyu \u00a599',
  sec_pro:'Phantom Pro \u00b7 Gen 6 \u00b7 3 \u0440\u0435\u0436\u0438\u043c\u0430',sec_phantom:'Phantom \u00b7 Gen 5/6 \u00b7 \u0411\u043e\u043b\u044c\u0448\u0435 \u0432\u044b\u0431\u043e\u0440\u0430',
  sec_qingyu:'Qingyu \u00b7 \u00a599 \u00b7 \u041b\u0443\u0447\u0448\u0430\u044f \u0446\u0435\u043d\u0430',sec_daqian:'Daqian \u00b7 10ml \u00b7 1=5',sec_daqian_sub:'\u00a5109-129',
  sec_zeus:'Zeus \u00b7 \u041f\u0440\u0435\u043c\u0438\u0443\u043c',sec_niche:'\u0418\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435 \u00b7 \u0421\u043e\u0432\u043c\u0435\u0441\u0442\u0438\u043c\u043e \u0441 RELX',
  sec_disposable:'\u041e\u0434\u043d\u043e\u0440\u0430\u0437\u043e\u0432\u044b\u0435 \u00b7 \u0413\u0438\u0434',sec_disposable_sub:'\u0413\u043e\u0442\u043e\u0432\u044b \u043a \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u0438\u044e',
  sec_devices:'\u0423\u0441\u0442\u0440\u043e\u0439\u0441\u0442\u0432\u0430 \u00b7 \u0413\u0430\u043b\u0435\u0440\u0435\u044f',sec_devices_sub:'\u0412\u0441\u0435 \u0446\u0432\u0435\u0442\u0430 \u00b7 \u041f\u043e \u0446\u0435\u043d\u0435',
  dev_qingyu:'Qingyu \u00b7 \u00a5218 \u00b7 \u041d\u0430\u0447\u0430\u043b\u044c\u043d\u044b\u0439',dev_daqian:'Daqian \u00b7 \u00a5258 \u00b7 \u0411\u0430\u0442\u0430\u0440\u0435\u044f',
  dev_h5:'Phantom 5 \u00b7 \u00a5328 \u00b7 \u041a\u043b\u0430\u0441\u0441\u0438\u043a\u0430',dev_yuying:'Yuying S \u00b7 \u00a5368 \u00b7 \u041e\u0442\u043b\u0438\u0447\u043d\u043e\u0435 \u0441\u043e\u043e\u0442\u043d\u043e\u0448\u0435\u043d\u0438\u0435',
  dev_pro:'Phantom Pro \u00b7 \u00a5428 \u00b7 \u041f\u0440\u0435\u043c\u0438\u0443\u043c',dev_zeus:'Zeus \u00b7 \u00a5888 \u00b7 \u0423\u043b\u044c\u0442\u0438\u043c\u0430\u0442\u0438\u0432\u043d\u044b\u0439',
  sec_contact:'\u041a\u043e\u043d\u0442\u0430\u043a\u0442',contact_addr:'189 Changshou Rd, \u0422\u043e\u0440\u0433\u043e\u0432\u044b\u0439 \u0446\u0435\u043d\u0442\u0440',contact_auth:'\u041b\u0438\u0446\u0435\u043d\u0437\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u0442\u0430\u0431\u0430\u0447\u043d\u044b\u0439 \u043c\u0430\u0433\u0430\u0437\u0438\u043d \u041a\u0438\u0442\u0430\u044f',
  contact_qr:'\u0421\u043a\u0430\u043d\u0438\u0440\u0443\u0439\u0442\u0435 \u0434\u043b\u044f WeCom',footer:'\u041e\u0440\u0438\u0433\u0438\u043d\u0430\u043b \u00b7 \u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430 SF \u00b7 \u0413\u0430\u0440\u0430\u043d\u0442\u0438\u044f',
  tip_adapter:'\u0411\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u044b\u0439 \u0430\u0434\u0430\u043f\u0442\u0435\u0440 \u0441 Daqian/Zeus \u00b7 \u0421\u043e\u0432\u043c\u0435\u0441\u0442\u0438\u043c \u0441 Qingyu/Phantom/Pro',
  tip_yuying:'\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0443\u0435\u043c Yuying S \u2014 \u0444\u0443\u043d\u043a\u0446\u0438\u0438 Pro (\u00a5428) \u0437\u0430 \u00a5368',
  disp_relx:'RELX \u00b7 \u00a5139 \u00b7 9.6ml',disp_poolan:'POOLAN \u00b7 \u00a5139 \u00b7 10.5ml',disp_mirui:'MIRUI \u00b7 \u00a5129 \u00b7 10ml',
  disp_other:'Voopoo \u00b7 Meishenwei \u00b7 HQD',yuying_why:'\u041f\u043e\u0447\u0435\u043c\u0443 Yuying S?',
  yuying_note:'\u0424\u0443\u043d\u043a\u0446\u0438\u0438 Pro (3 \u0440\u0435\u0436\u0438\u043c\u0430 + \u044d\u043a\u0440\u0430\u043d + \u0441\u0447\u0435\u0442\u0447\u0438\u043a), \u0432\u0441\u0435\u0433\u043e \u00a5368',zeus_spec:'Zeus 2.85ml \u00b7 \u0410\u0434\u0430\u043f\u0442\u0435\u0440 \u0434\u043b\u044f \u0441\u043e\u0432\u043c\u0435\u0441\u0442\u0438\u043c\u043e\u0441\u0442\u0438'}
  };
  var dict=D[L];
  if(!dict)return;
  var els=document.querySelectorAll('[data-i18n]');
  for(var i=0;i<els.length;i++){var el=els[i],k=el.getAttribute('data-i18n');if(!k||!dict[k])continue;
  if(el.children.length===0)el.textContent=dict[k];
  else{var c=el.childNodes;for(var j=0;j<c.length;j++)if(c[j].nodeType===3){c[j].nodeValue=dict[k];break;}}}

  // === 2. 产品标签 & 风格 ===
  var TAG={
  en:{'爆款':'Hot','解瘾强':'Strong Hit','果味过渡':'Fruity','凉感推荐':'Cool Mint','果甜清爽':'Sweet & Fresh','新品上市':'New','性价比':'Best Value','女生首选':'Ladies Pick','茶系推荐':'Tea Lover','层次丰富':'Deep Layers','层次王者':'Layer King','雪茄醇厚':'Cigar Rich','焦糖甜香':'Caramel Sweet','IQOS替代':'IQOS Alt','万宝路替代':'Marlboro Alt','中南海替代':'Zhongnanhai Alt','硬中华口感':'Hard Chunghwa','软中华风格':'Soft Chunghwa','外烟替代':'Camel Style','蓝莓替代':'Blueberry Alt','凤梨果香':'Pineapple','荔枝茶':'Lychee Tea','酸甜丝滑':'Sweet & Tangy','话梅奶香':'Plum Creamy','青苹果清爽':'Green Apple','柠檬茶':'Lemon Tea','茉莉花茶':'Jasmine Tea','菊花清甜':'Chrysanthemum','花香清雅':'Floral','酒香独特':'Brandy Note','桂圆甜润':'Longan Sweet','红枣蜜香':'Jujube Honey','拿铁温润':'Latte Mild','清爽草本':'Herbal Fresh','檀香高级':'Sandalwood','松针草本':'Pine Herbal','清透干净':'Clean & Pure','淡雅中式':'Chinese Light','全天口粮':'All-Day Vape','长期口粮':'Daily Driver','2颗装':'2-Pack','超大容量':'Mega Capacity','四重层次':'4-Layer','新手友好':'Beginner OK','雪茄+柑橘':'Cigar+Citrus','香槟气泡':'Champagne','冰糖雪梨':'Pear Sweet','焦香烤烟':'Roasted Tobacco','草本清香':'Herbal Clean','蓝莓烤烟':'Blueberry Roast','花茶清雅':'Floral Tea','清新自然':'Fresh & Natural'},
  fr:{'爆款':'Populaire','解瘾强':'Hit Fort','果味过渡':'Fruit\u00e9','凉感推荐':'Menthe Fra\u00eeche','果甜清爽':'Doux & Frais','新品上市':'Nouveau','性价比':'Bon Rapport','女生首选':'Pour Elles','茶系推荐':'Th\u00e9','层次丰富':'Profond','层次王者':'Roi des Couches','雪茄醇厚':'Cigar Riche','焦糖甜香':'Caramel Doux','IQOS替代':'Alt IQOS','万宝路替代':'Alt Marlboro','中南海替代':'Alt Zhongnanhai','硬中华口感':'Hard Chunghwa','软中华风格':'Soft Chunghwa','外烟替代':'Style Camel','蓝莓替代':'Alt Myrtille','凤梨果香':'Ananas','荔枝茶':'Th\u00e9 Litchi','酸甜丝滑':'Aigre-Doux','话梅奶香':'Prune Cr\u00e9meuse','青苹果清爽':'Pomme Verte','柠檬茶':'Th\u00e9 Citron','茉莉花茶':'Th\u00e9 Jasmin','菊花清甜':'Chrysanth\u00e8me','花香清雅':'Floral','酒香独特':'Note Cognac','桂圆甜润':'Longane Doux','红枣蜜香':'Jujube Miel','拿铁温润':'Latte Doux','清爽草本':'Herbes Fra\u00eeches','檀香高级':'Santal','松针草本':'Pin','清透干净':'Pur & Propre','淡雅中式':'Style Chinois L\u00e9ger','全天口粮':'Quotidien','长期口粮':'Long Terme','2颗装':'Pack 2','超大容量':'M\u00e9ga Capacit\u00e9','四重层次':'4 Couches','新手友好':'D\u00e9butant OK','雪茄+柑橘':'Cigar+Agrumes','香槟气泡':'Champagne','冰糖雪梨':'Poire Sucr\u00e9e','焦香烤烟':'Tabac R\u00f4ti','草本清香':'Herbes Propres','蓝莓烤烟':'Myrtille R\u00f4tie','花茶清雅':'Th\u00e9 Floral','清新自然':'Frais & Naturel'},
  ru:{'爆款':'Хит','解瘾强':'Сильный удар','果味过渡':'Фруктовый','凉感推荐':'Мятный','果甜清爽':'Сладкий & Свежий','新品上市':'Новинка','性价比':'Выгодно','女生首选':'Для девушек','茶系推荐':'Чай','层次丰富':'Глубокий','层次王者':'Многослойный','雪茄醇厚':'Сигарный','焦糖甜香':'Карамель','IQOS替代':'Альт IQOS','万宝路替代':'Альт Marlboro','中南海替代':'Альт Zhongnanhai','硬中华口感':'Hard Chunghwa','软中华风格':'Soft Chunghwa','外烟替代':'Стиль Camel','蓝莓替代':'Альт Черника','凤梨果香':'Ананас','荔枝茶':'Чай Личи','酸甜丝滑':'Кисло-сладкий','话梅奶香':'Сливки Слива','青苹果清爽':'Зеленое яблоко','柠檬茶':'Чай Лимон','茉莉花茶':'Чай Жасмин','菊花清甜':'Хризантема','花香清雅':'Цветочный','酒香独特':'Коньяк','桂圆甜润':'Лонган','红枣蜜香':'Финик Мед','拿铁温润':'Латте','清爽草本':'Травы','檀香高级':'Сандал','松针草本':'Хвоя','清透干净':'Чистый','淡雅中式':'Китайский легкий','全天口粮':'На весь день','长期口粮':'Ежедневный','2颗装':'2 шт','超大容量':'Мега объем','四重层次':'4 слоя','新手友好':'Новичкам','雪茄+柑橘':'Сигара+Цитрус','香槟气泡':'Шампанское','冰糖雪梨':'Груша','焦香烤烟':'Жареный табак','草本清香':'Травы чистые','蓝莓烤烟':'Черника табак','花茶清雅':'Цветочный чай','清新自然':'Свежий'}
  };
  var STYLE={en:{'清淡':'Mild','适中':'Medium','偏浓':'Rich','偏淡':'Light'},fr:{'清淡':'L\u00e9ger','适中':'Moyen','偏浓':'Riche','偏淡':'Doux'},ru:{'清淡':'Мягкий','适中':'Средний','偏浓':'Крепкий','偏淡':'Легкий'}};
  var sp=document.querySelectorAll('.tag, .p-style');
  for(var s=0;s<sp.length;s++){var t=sp[s].textContent.trim(),m=sp[s].classList.contains('p-style')?STYLE[L]:TAG[L];if(m&&m[t])sp[s].textContent=m[t];}

  // === 3. Badge ===
  var bd=document.querySelectorAll('.badge');
  var BL={en:'\u00a5149 Featured',fr:'\u00a5149 Vedette',ru:'\u00a5149 \u0425\u0438\u0442'};
  for(var b=0;b<bd.length;b++)bd[b].textContent=BL[L]||'\u00a5149 Featured';

  // === 4. 全局文本映射 ===
  var MAP={
  en:{'翠川苍':'Cuichuan Cang','柏芬':'Baifen','隋和':'Suihe','旭日凌云':'Xuri Lingyun','金光奕奕':'Jinguang Yiyi','白岸':'Baian','夏幕':'Xiamu','群玉山见':'Qunyu Shanjian','红运滚滚':'Hongyun Gungun','甘泽':'Ganze','广厦间':'Guangshajian','山雾秋':'Shanwuqiu','匠造者-02':'Artisan-02','青羽':'Qingyu','大千':'Daqian','幻影五代':'Phantom 5','幻影Pro':'Phantom Pro','宙斯':'Zeus','敬亭山·念关山':'Jingtingshan & Nian Guanshan','夏幕·霜月':'Xiamu & Shuangyue','甜豆+坚果+咖啡+蛋糕 四重层次':'Sweet bean + nut + coffee + cake, 4 layers','浓香烟草+可可+生巧 解瘾首选':'Rich tobacco + cocoa + dark choc, strong hit','凤梨果香 \u00b7 悦刻原厂':'Pineapple \u00b7 RELX OEM','木质清香':'Woody fragrance','莓果温润':'Berry smooth','果味过渡':'Fruity Alt','解瘾强':'Strong Hit','国风雅致':'Classic Chinese','蓝莓替代':'Blueberry Alt','入门之选':'Entry Level','经典搭配':'Classic Combo','进阶升级':'Upgrade','解瘾首选':'Strong Hit','顶配旗舰':'Flagship','13ml超大油':'13ml Mega Oil','可视油仓':'Visible Tank','可调输出功率':'Adj. Power','可调功率':'Adj. Power','吸阻调节':'Airflow Control','电量显示':'Battery Display','600mAh大电池':'600mAh Battery','电量实时显示':'Battery Display','3档功率调节':'3-Level Power','口数精准记录':'Puff Counter','Type-C充电':'Type-C Charging','黑\u00b7银':'Black \u00b7 Silver','嫩绿\u00b7银\u00b7黑\u00b7渐变粉紫\u00b7渐变金粉':'Green \u00b7 Silver \u00b7 Black \u00b7 Purple Grad \u00b7 Gold Grad','银\u00b7白\u00b7粉\u00b7黑':'Silver \u00b7 White \u00b7 Pink \u00b7 Black','黑':'Black','银':'Silver','白':'White','粉':'Pink','嫩绿':'Green','雅灰':'Warm Grey','渐变紫':'Purple Grad','渐变金':'Gold Grad','渐变粉紫':'Purple Grad','渐变金粉':'Gold Grad','青羽/幻影/小众':'Qingyu/Phantom/Niche','大千系列专属':'Daqian Only','Pro/幻影/青羽':'Pro/Phantom/Qingyu','幻影系+铂岚':'Phantom+Poolan','宙斯专属+转接':'Zeus+Adapter','蓝田暖阳':'Lantian Nuanyang','森林复兴':'Senlin Fuxing','传家宝藏':'Chuanjia Baozang','红运滚滚':'Hongyun Gungun','日出沧海':'Richu Canghai','金风习习':'Jinfeng Xixi','绿扇盈盈':'Lvshan Yingying','兰亭煮雪':'Lanting Zhuxue','竹仗胜马':'Zhuzhang Shengma','绕指轻舞':'Raozhi Qingwu','浩海潮升':'Haohai Chaosheng','柳暗花明':'Liuan Huaming','群玉山见':'Qunyu Shanjian','忘江有径':'Wangjiang Youjing','旭日凌云':'Xuri Lingyun','点点灵犀':'Diandian Lingxi','晨光入林':'Chenguang Rulin','佳人佳期':'Jiaren Jiaqi','暖夕穿林':'Nuanxi Chuanlin','柔情牛仔':'Rouqing Niuzai','春鸣':'Chunming','柏芬':'Baifen','知夏':'Zhixia','悠岚':'Youlan','甘泽':'Ganze','隋和':'Suihe','太霄':'Taixiao','拂柳风':'Fuliufeng','广厦间':'Guangshajian','云岭松风':'Yunling Songfeng','碧海澄空':'Bihai Chengkong','金丝露':'Jinsi Lu','冷烟月':'Lengyanyue','兰亭雅集':'Lanting Yaji','满园茵茵':'Manyuan Yinyin','金光奕奕':'Jinguang Yiyi','飞马环游':'Feima Huanyou','敬亭山':'Jingtingshan','念关山':'Nian Guanshan','夏幕':'Xiamu','金缕':'Jinlv','见山':'Jianshan','山雾秋':'Shanwuqiu','匠造者-01':'Artisan-01','霜月':'Shuangyue'},
  fr:{'翠川苍':'Cuichuan Cang','柏芬':'Baifen','隋和':'Suihe','旭日凌云':'Xuri Lingyun','金光奕奕':'Jinguang Yiyi','白岸':'Baian','夏幕':'Xiamu','群玉山见':'Qunyu Shanjian','红运滚滚':'Hongyun Gungun','甘泽':'Ganze','广厦间':'Guangshajian','山雾秋':'Shanwuqiu','匠造者-02':'Artisan-02','青羽':'Qingyu','大千':'Daqian','幻影五代':'Phantom 5','幻影Pro':'Phantom Pro','宙斯':'Zeus','敬亭山·念关山':'Jingtingshan & Nian Guanshan','夏幕·霜月':'Xiamu & Shuangyue','甜豆+坚果+咖啡+蛋糕 四重层次':'F\u00e8ve sucr\u00e9e + noix + caf\u00e9 + g\u00e2teau, 4 couches','浓香烟草+可可+生巧 解瘾首选':'Tabac riche + cacao + chocolat noir, hit fort','凤梨果香 \u00b7 悦刻原厂':'Ananas \u00b7 RELX OEM','木质清香':'Bois\u00e9','莓果温润':'Baies douces','果味过渡':'Alternative Fruit\u00e9e','解瘾强':'Hit Fort','国风雅致':'\u00c9l\u00e9gance Chinoise','蓝莓替代':'Alternative Myrtille','入门之选':'Entr\u00e9e','经典搭配':'Classique','进阶升级':'Avanc\u00e9','解瘾首选':'Hit Fort','顶配旗舰':'Premium','13ml超大油':'13ml M\u00e9ga','可视油仓':'R\u00e9servoir Visible','可调输出功率':'Puissance R\u00e9glable','可调功率':'Puissance R\u00e9glable','吸阻调节':'Airflow R\u00e9glable','电量显示':'Batterie Visible','600mAh大电池':'Batterie 600mAh','电量实时显示':'Batterie Visible','3档功率调节':'3 Niveaux','口数精准记录':'Compteur','Type-C充电':'Charge Type-C','黑\u00b7银':'Noir \u00b7 Argent','嫩绿\u00b7银\u00b7黑\u00b7渐变粉紫\u00b7渐变金粉':'Vert \u00b7 Argent \u00b7 Noir \u00b7 Violet \u00b7 Or','银\u00b7白\u00b7粉\u00b7黑':'Argent \u00b7 Blanc \u00b7 Rose \u00b7 Noir','黑':'Noir','银':'Argent','白':'Blanc','粉':'Rose','嫩绿':'Vert','雅灰':'Gris Chaud','渐变紫':'Violet','渐变金':'Or','渐变粉紫':'Violet','渐变金粉':'Or','青羽/幻影/小众':'Qingyu/Phantom/Niche','大千系列专属':'Daqian Exclusif','Pro/幻影/青羽':'Pro/Phantom/Qingyu','幻影系+铂岚':'Phantom+Poolan','宙斯专属+转接':'Zeus+Adaptateur','蓝田暖阳':'Lantian Nuanyang','森林复兴':'Senlin Fuxing','传家宝藏':'Chuanjia Baozang','红运滚滚':'Hongyun Gungun','日出沧海':'Richu Canghai','金风习习':'Jinfeng Xixi','绿扇盈盈':'Lvshan Yingying','兰亭煮雪':'Lanting Zhuxue','竹仗胜马':'Zhuzhang Shengma','绕指轻舞':'Raozhi Qingwu','浩海潮升':'Haohai Chaosheng','柳暗花明':'Liuan Huaming','群玉山见':'Qunyu Shanjian','忘江有径':'Wangjiang Youjing','旭日凌云':'Xuri Lingyun','点点灵犀':'Diandian Lingxi','晨光入林':'Chenguang Rulin','佳人佳期':'Jiaren Jiaqi','暖夕穿林':'Nuanxi Chuanlin','柔情牛仔':'Rouqing Niuzai','春鸣':'Chunming','知夏':'Zhixia','悠岚':'Youlan','甘泽':'Ganze','隋和':'Suihe','太霄':'Taixiao','拂柳风':'Fuliufeng','广厦间':'Guangshajian','云岭松风':'Yunling Songfeng','碧海澄空':'Bihai Chengkong','金丝露':'Jinsi Lu','冷烟月':'Lengyanyue','兰亭雅集':'Lanting Yaji','满园茵茵':'Manyuan Yinyin','金光奕奕':'Jinguang Yiyi','飞马环游':'Feima Huanyou','敬亭山':'Jingtingshan','念关山':'Nian Guanshan','夏幕':'Xiamu','金缕':'Jinlv','见山':'Jianshan','山雾秋':'Shanwuqiu','匠造者-01':'Artisan-01','霜月':'Shuangyue'},
  ru:{'翠川苍':'Cuichuan Cang','柏芬':'Baifen','隋和':'Suihe','旭日凌云':'Xuri Lingyun','金光奕奕':'Jinguang Yiyi','白岸':'Baian','夏幕':'Xiamu','群玉山见':'Qunyu Shanjian','红运滚滚':'Hongyun Gungun','甘泽':'Ganze','广厦间':'Guangshajian','山雾秋':'Shanwuqiu','匠造者-02':'Artisan-02','青羽':'Qingyu','大千':'Daqian','幻影五代':'Phantom 5','幻影Pro':'Phantom Pro','宙斯':'Zeus','敬亭山·念关山':'Jingtingshan & Nian Guanshan','夏幕·霜月':'Xiamu & Shuangyue','甜豆+坚果+咖啡+蛋糕 四重层次':'Бобы + орехи + кофе + торт, 4 слоя','浓香烟草+可可+生巧 解瘾首选':'Табак + какао + шоколад, сильный','凤梨果香 \u00b7 悦刻原厂':'Ананас \u00b7 RELX OEM','木质清香':'Древесный','莓果温润':'Ягодный мягкий','果味过渡':'Фруктовый','解瘾强':'Сильный','国风雅致':'Китайский стиль','蓝莓替代':'Черника','入门之选':'Начальный','经典搭配':'Классика','进阶升级':'Продвинутый','解瘾首选':'Сильный','顶配旗舰':'Флагман','13ml超大油':'13ml Мега','可视油仓':'Видимый бак','可调输出功率':'Мощность','可调功率':'Мощность','吸阻调节':'Затяжка','电量显示':'Батарея','600mAh大电池':'600mAh','电量实时显示':'Батарея','3档功率调节':'3 уровня','口数精准记录':'Счетчик','Type-C充电':'Type-C','黑\u00b7银':'Черный \u00b7 Серебро','嫩绿\u00b7银\u00b7黑\u00b7渐变粉紫\u00b7渐变金粉':'Зеленый \u00b7 Серебро \u00b7 Черный \u00b7 Фиолет \u00b7 Золото','银\u00b7白\u00b7粉\u00b7黑':'Серебро \u00b7 Белый \u00b7 Розовый \u00b7 Черный','黑':'Черный','银':'Серебро','白':'Белый','粉':'Розовый','嫩绿':'Зеленый','雅灰':'Серый','渐变紫':'Фиолет','渐变金':'Золото','渐变粉紫':'Фиолет','渐变金粉':'Золото','青羽/幻影/小众':'Qingyu/Phantom/Niche','大千系列专属':'Daqian','Pro/幻影/青羽':'Pro/Phantom/Qingyu','幻影系+铂岚':'Phantom+Poolan','宙斯专属+转接':'Zeus+Адаптер','蓝田暖阳':'Lantian Nuanyang','森林复兴':'Senlin Fuxing','传家宝藏':'Chuanjia Baozang','红运滚滚':'Hongyun Gungun','日出沧海':'Richu Canghai','金风习习':'Jinfeng Xixi','绿扇盈盈':'Lvshan Yingying','兰亭煮雪':'Lanting Zhuxue','竹仗胜马':'Zhuzhang Shengma','绕指轻舞':'Raozhi Qingwu','浩海潮升':'Haohai Chaosheng','柳暗花明':'Liuan Huaming','群玉山见':'Qunyu Shanjian','忘江有径':'Wangjiang Youjing','旭日凌云':'Xuri Lingyun','点点灵犀':'Diandian Lingxi','晨光入林':'Chenguang Rulin','佳人佳期':'Jiaren Jiaqi','暖夕穿林':'Nuanxi Chuanlin','柔情牛仔':'Rouqing Niuzai','春鸣':'Chunming','知夏':'Zhixia','悠岚':'Youlan','甘泽':'Ganze','隋和':'Suihe','太霄':'Taixiao','拂柳风':'Fuliufeng','广厦间':'Guangshajian','云岭松风':'Yunling Songfeng','碧海澄空':'Bihai Chengkong','金丝露':'Jinsi Lu','冷烟月':'Lengyanyue','兰亭雅集':'Lanting Yaji','满园茵茵':'Manyuan Yinyin','金光奕奕':'Jinguang Yiyi','飞马环游':'Feima Huanyou','敬亭山':'Jingtingshan','念关山':'Nian Guanshan','夏幕':'Xiamu','金缕':'Jinlv','见山':'Jianshan','山雾秋':'Shanwuqiu','匠造者-01':'Artisan-01','霜月':'Shuangyue'}
  };
  var mdict=MAP[L];
  // DESCS
  var DESCS={
  en:{'清雅烤烟香 \u00b7 淡雅中式 回味干净':'Mellow roasted tobacco, light Chinese style','草木草本香 \u00b7 凉茶草本 清爽不腻':'Herbal freshness, cooling tea notes','清透烤烟香 \u00b7 清透干净 无杂味':'Pure roasted tobacco, clean no off-notes','焦甜甘草香 \u00b7 焦糖甜香 浓厚烤烟':'Caramel licorice, rich sweet tobacco','清润海盐烤烟 \u00b7 海盐清爽 微甜回甘':'Sea salt roasted, fresh sweet finish','冰糖菊花茶 \u00b7 菊花清甜':'Rock sugar chrysanthemum, floral sweet','淡豆香烟草 \u00b7 万宝路淡香':'Light bean aroma, Marlboro alternative','甘草甜烤烟 \u00b7 冰糖雪梨':'Licorice sweet tobacco, pear sweetness','草木花茶烤烟 \u00b7 茉莉花茶':'Herbal floral tobacco, jasmine tea','清逸烤烟 \u00b7 轻盈不压喉 女生首选':'Light roasted, gentle on throat','清甜烤烟 \u00b7 青苹果淡香 夏季口粮':'Sweet roasted, green apple, summer vape','红枣蜜香烤烟 \u00b7 温润绵长 秋冬':'Jujube honey tobacco, warm & smooth','焦甜木甘草香 \u00b7 雪茄醇厚 解瘾':'Caramel wood licorice, cigar richness','草本桂圆甜香 \u00b7 桂圆甜润':'Herbal longan sweetness, smooth & sweet','清瓜香甜 \u00b7 青瓜清爽 最佳果味过渡':'Cucumber sweet, best fruity alternative','苔香豆甜烤烟 \u00b7 烟劲饱满':'Mossy bean tobacco, full-bodied hit','清浅烤烟香 \u00b7 余味干净 全天口粮':'Light roasted, clean finish, all-day vape','酒香烤烟香 \u00b7 白兰地淡香':'Brandy tobacco, light cognac note','淡甜草木烤烟 \u00b7 温婉不刺激 女生':'Sweet herbal tobacco, gentle & mild','草本果香回甜 \u00b7 层次丰富 口碑佳':'Herbal fruity sweet, rich layers','异域烟草香 \u00b7 骆驼风格 外烟替代':'Exotic tobacco, camel-style alternative','凉感柔和烟草 \u00b7 薄荷烟草 新手友好':'Cool mild tobacco, beginner friendly','奶油话梅香 \u00b7 酸甜丝滑 以前果味':'Creamy plum, sweet & tangy throwback','醇香雪茄+柑橘 \u00b7 雪茄带柑橘清新':'Rich cigar + citrus, bold & fresh','清雅干草甜香 \u00b7 中南海淡香 首选':'Clean hay sweetness, Zhongnanhai alt','茴甜\u2192木香\u2192烤烟 \u00b7 三段式层次':'Anise, Wood, Tobacco, 3-stage','蜜香荔枝茶 \u00b7 以前荔枝味电子烟':'Honey lychee tea, lychee throwback','清香乌龙 \u00b7 铁观音回甘 茶系首选':'Oolong, Tieguanyin finish, tea lovers pick','淡豆香烟草 \u00b7 IQOS醇厚感 2.85ml':'Light bean, IQOS richness, 2.85ml','中式烤烟+清雅木香 \u00b7 软中华淡雅 3ml':'Chinese roast + wood, Soft Chunghwa, 3ml','醇厚烤烟香 \u00b7 硬中华满足感 3ml':'Rich roasted, Hard Chunghwa, 3ml','淡雅果甜烤烟 \u00b7 清新不突兀':'Light fruity tobacco, fresh & subtle','松针草本香 \u00b7 国风意境':'Pine needle herbal, classical elegance','海盐+薄荷+果香 \u00b7 以前薄荷水果':'Sea salt + mint + fruit, menthol fruit','焦香烤烟 \u00b7 纯正 老烟民最爱':'Roasted tobacco, pure, veteran favorite','草本清香 \u00b7 干净利落':'Herbal clean, crisp & no-frills','蜂蜜紫罗兰香 \u00b7 以前花香味':'Honey violet, floral throwback','烤烟可可奶香 \u00b7 拿铁温润':'Roasted cocoa, latte smoothness','凤梨果香+烤烟 \u00b7 果味过渡':'Pineapple + tobacco, fruity alternative','木质沉香 \u00b7 檀香高级':'Woody aloeswood, premium sandalwood','木质清香 \u00b7 品茶雅致':'Woody fragrance, tea ceremony elegance','清甜香槟 \u00b7 气泡轻盈':'Sweet champagne, light & bubbly','莓果+烟草 \u00b7 蓝莓替代':'Berry + tobacco, blueberry alternative','玫瑰茉莉 \u00b7 花茶清雅':'Rose jasmine, floral tea elegance','清新自然 \u00b7 不腻不燥':'Fresh & natural, never heavy','柑橘乌龙+凉 \u00b7 柠檬茶':'Citrus oolong + cool, lemon tea','花香果香 层次丰富':'Floral fruity, rich layers','豆香坚果咖啡蛋糕 四重层次 13ml':'Bean nut coffee cake, 4-layer, 13ml','浓香烟草+可可+生巧 黑森林 13ml':'Rich tobacco + cocoa + dark chocolate, 13ml','蓝莓烤烟 \u00b7 温润不燥':'Blueberry roast, warm & mellow'},
  fr:{'清雅烤烟香 \u00b7 淡雅中式 回味干净':'Tabac r\u00f4ti doux, style chinois l\u00e9ger','草木草本香 \u00b7 凉茶草本 清爽不腻':'Fra\u00eecheur herbac\u00e9e, notes de th\u00e9 frais','清透烤烟香 \u00b7 清透干净 无杂味':'Tabac r\u00f4ti pur, propre sans arri\u00e8re-go\u00fbt','焦甜甘草香 \u00b7 焦糖甜香 浓厚烤烟':'Caramel r\u00e9glisse, tabac riche et sucr\u00e9','清润海盐烤烟 \u00b7 海盐清爽 微甜回甘':'Tabac sel marin, frais avec finition sucr\u00e9e','冰糖菊花茶 \u00b7 菊花清甜':'Chrysanth\u00e8me sucre roche, douceur florale','淡豆香烟草 \u00b7 万宝路淡香':'Tabac haricot l\u00e9ger, alternative Marlboro','甘草甜烤烟 \u00b7 冰糖雪梨':'Tabac r\u00e9glisse, douceur de poire','草木花茶烤烟 \u00b7 茉莉花茶':'Tabac floral herbac\u00e9, th\u00e9 au jasmin','清逸烤烟 \u00b7 轻盈不压喉 女生首选':'Tabac l\u00e9ger, doux pour la gorge','清甜烤烟 \u00b7 青苹果淡香 夏季口粮':'Tabac sucr\u00e9, pomme verte, vape d\u2019\u00e9t\u00e9','红枣蜜香烤烟 \u00b7 温润绵长 秋冬':'Tabac jujube miel, chaud & doux','焦甜木甘草香 \u00b7 雪茄醇厚 解瘾':'Bois caram\u00e9lis\u00e9, richesse de cigare','草本桂圆甜香 \u00b7 桂圆甜润':'Longane herbac\u00e9, doux & onctueux','清瓜香甜 \u00b7 青瓜清爽 最佳果味过渡':'Concombre sucr\u00e9, meilleure alternative fruit\u00e9e','苔香豆甜烤烟 \u00b7 烟劲饱满':'Tabac mousseux, hit cors\u00e9','清浅烤烟香 \u00b7 余味干净 全天口粮':'Tabac l\u00e9ger, finition propre, quotidien','酒香烤烟香 \u00b7 白兰地淡香':'Tabac cognac, note l\u00e9g\u00e8re','淡甜草木烤烟 \u00b7 温婉不刺激 女生':'Tabac herbac\u00e9 doux, doux & discret','草本果香回甜 \u00b7 层次丰富 口碑佳':'Herbes fruit\u00e9es sucr\u00e9es, couches riches','异域烟草香 \u00b7 骆驼风格 外烟替代':'Tabac exotique, style Camel','凉感柔和烟草 \u00b7 薄荷烟草 新手友好':'Tabac menthe doux, d\u00e9butant OK','奶油话梅香 \u00b7 酸甜丝滑 以前果味':'Prune cr\u00e9meuse, aigre-doux nostalgique','醇香雪茄+柑橘 \u00b7 雪茄带柑橘清新':'Cigar riche + agrumes, audacieux & frais','清雅干草甜香 \u00b7 中南海淡香 首选':'Foin propre sucr\u00e9, alternative Zhongnanhai','茴甜\u2192木香\u2192烤烟 \u00b7 三段式层次':'Anis, Bois, Tabac, 3 \u00e9tapes','蜜香荔枝茶 \u00b7 以前荔枝味电子烟':'Th\u00e9 litchi miel, nostalgique','清香乌龙 \u00b7 铁观音回甘 茶系首选':'Oolong, finale Tieguanyin, pour amateurs de th\u00e9','淡豆香烟草 \u00b7 IQOS醇厚感 2.85ml':'Haricot l\u00e9ger, richesse IQOS, 2.85ml','中式烤烟+清雅木香 \u00b7 软中华淡雅 3ml':'R\u00f4ti chinois + bois, Soft Chunghwa, 3ml','醇厚烤烟香 \u00b7 硬中华满足感 3ml':'R\u00f4ti riche, Hard Chunghwa, 3ml','淡雅果甜烤烟 \u00b7 清新不突兀':'Tabac fruit\u00e9 l\u00e9ger, frais & subtil','松针草本香 \u00b7 国风意境':'Aiguille de pin, \u00e9l\u00e9gance classique','海盐+薄荷+果香 \u00b7 以前薄荷水果':'Sel marin + menthe + fruit, menthe fruit\u00e9e','焦香烤烟 \u00b7 纯正 老烟民最爱':'Tabac r\u00f4ti, pur, favori des v\u00e9t\u00e9rans','草本清香 \u00b7 干净利落':'Herbes propres, net & sans fioritures','蜂蜜紫罗兰香 \u00b7 以前花香味':'Violette miel, floral nostalgique','烤烟可可奶香 \u00b7 拿铁温润':'Cacao r\u00f4ti, douceur latte','凤梨果香+烤烟 \u00b7 果味过渡':'Ananas + tabac, alternative fruit\u00e9e','木质沉香 \u00b7 檀香高级':'Bois d\u2019alo\u00e8s, santal premium','木质清香 \u00b7 品茶雅致':'Bois\u00e9, \u00e9l\u00e9gance du th\u00e9','清甜香槟 \u00b7 气泡轻盈':'Champagne doux, l\u00e9ger & p\u00e9tillant','莓果+烟草 \u00b7 蓝莓替代':'Baies + tabac, alternative myrtille','玫瑰茉莉 \u00b7 花茶清雅':'Rose jasmin, \u00e9l\u00e9gance florale','清新自然 \u00b7 不腻不燥':'Frais & naturel, jamais lourd','柑橘乌龙+凉 \u00b7 柠檬茶':'Agrumes oolong + frais, th\u00e9 citron','花香果香 层次丰富':'Floral fruit\u00e9, couches riches','豆香坚果咖啡蛋糕 四重层次 13ml':'F\u00e8ve noix caf\u00e9 g\u00e2teau, 4 couches, 13ml','浓香烟草+可可+生巧 黑森林 13ml':'Tabac riche + cacao + chocolat, 13ml','蓝莓烤烟 \u00b7 温润不燥':'Myrtille r\u00f4tie, chaud & doux'},
  ru:{'清雅烤烟香 \u00b7 淡雅中式 回味干净':'Мягкий табак, легкий китайский стиль','草木草本香 \u00b7 凉茶草本 清爽不腻':'Травяная свежесть, охлаждающий чай','清透烤烟香 \u00b7 清透干净 无杂味':'Чистый табак, без привкуса','焦甜甘草香 \u00b7 焦糖甜香 浓厚烤烟':'Карамель лакрица, насыщенный табак','清润海盐烤烟 \u00b7 海盐清爽 微甜回甘':'Морская соль, свежий сладкий финиш','冰糖菊花茶 \u00b7 菊花清甜':'Хризантема, цветочная сладость','淡豆香烟草 \u00b7 万宝路淡香':'Легкий бобовый, альт Marlboro','甘草甜烤烟 \u00b7 冰糖雪梨':'Лакрица табак, грушевая сладость','草木花茶烤烟 \u00b7 茉莉花茶':'Цветочный травяной, жасминовый чай','清逸烤烟 \u00b7 轻盈不压喉 女生首选':'Легкий табак, мягкий для горла','清甜烤烟 \u00b7 青苹果淡香 夏季口粮':'Сладкий табак, зеленое яблоко','红枣蜜香烤烟 \u00b7 温润绵长 秋冬':'Финик мед, теплый & мягкий','焦甜木甘草香 \u00b7 雪茄醇厚 解瘾':'Карамель дерево, сигарная насыщенность','草本桂圆甜香 \u00b7 桂圆甜润':'Травяной лонган, сладкий & мягкий','清瓜香甜 \u00b7 青瓜清爽 最佳果味过渡':'Огурец сладкий, фруктовая альтернатива','苔香豆甜烤烟 \u00b7 烟劲饱满':'Мшистый табак, полный удар','清浅烤烟香 \u00b7 余味干净 全天口粮':'Легкий табак, чистый финиш','酒香烤烟香 \u00b7 白兰地淡香':'Коньячный табак, легкая нотка','淡甜草木烤烟 \u00b7 温婉不刺激 女生':'Сладкий травяной, мягкий','草本果香回甜 \u00b7 层次丰富 口碑佳':'Травяной фруктовый, богатые слои','异域烟草香 \u00b7 骆驼风格 外烟替代':'Экзотический табак, стиль Camel','凉感柔和烟草 \u00b7 薄荷烟草 新手友好':'Мятный табак, для начинающих','奶油话梅香 \u00b7 酸甜丝滑 以前果味':'Сливки слива, кисло-сладкий','醇香雪茄+柑橘 \u00b7 雪茄带柑橘清新':'Сигара + цитрус, смелый & свежий','清雅干草甜香 \u00b7 中南海淡香 首选':'Сено сладкое, альт Zhongnanhai','茴甜\u2192木香\u2192烤烟 \u00b7 三段式层次':'Анис, Дерево, Табак, 3 этапа','蜜香荔枝茶 \u00b7 以前荔枝味电子烟':'Мед личи чай, ностальгия','清香乌龙 \u00b7 铁观音回甘 茶系首选':'Улун, финиш Тегуаньинь','淡豆香烟草 \u00b7 IQOS醇厚感 2.85ml':'Легкий бобовый, насыщенность IQOS','中式烤烟+清雅木香 \u00b7 软中华淡雅 3ml':'Китайский + дерево, Soft Chunghwa','醇厚烤烟香 \u00b7 硬中华满足感 3ml':'Насыщенный, Hard Chunghwa, 3ml','淡雅果甜烤烟 \u00b7 清新不突兀':'Фруктовый легкий, свежий','松针草本香 \u00b7 国风意境':'Хвоя, классическая элегантность','海盐+薄荷+果香 \u00b7 以前薄荷水果':'Морская соль + мята + фрукты','焦香烤烟 \u00b7 纯正 老烟民最爱':'Жареный табак, чистый, для опытных','草本清香 \u00b7 干净利落':'Травы чистые, без лишнего','蜂蜜紫罗兰香 \u00b7 以前花香味':'Мед фиалка, цветочный','烤烟可可奶香 \u00b7 拿铁温润':'Какао табак, латте мягкий','凤梨果香+烤烟 \u00b7 果味过渡':'Ананас + табак, фруктовый','木质沉香 \u00b7 檀香高级':'Алоэ дерево, сандал премиум','木质清香 \u00b7 品茶雅致':'Древесный, чайная элегантность','清甜香槟 \u00b7 气泡轻盈':'Шампанское, легкое & игристое','莓果+烟草 \u00b7 蓝莓替代':'Ягоды + табак, альт черника','玫瑰茉莉 \u00b7 花茶清雅':'Роза жасмин, цветочный чай','清新自然 \u00b7 不腻不燥':'Свежий & натуральный','柑橘乌龙+凉 \u00b7 柠檬茶':'Цитрус улун + мята, лимонный чай','花香果香 层次丰富':'Цветочный фруктовый, богатые слои','豆香坚果咖啡蛋糕 四重层次 13ml':'Бобы орехи кофе торт, 4 слоя, 13ml','浓香烟草+可可+生巧 黑森林 13ml':'Табак + какао + шоколад, 13ml','蓝莓烤烟 \u00b7 温润不燥':'Черника табак, теплый & мягкий'}
  };
  var ddict=DESCS[L];

  // === 5. 递归收集+翻译所有中文文本节点 ===
  var pool=[];
  (function c(n){if(n.nodeType===3){if(/[\u4e00-\u9fff]/.test(n.nodeValue))pool.push(n);}
  else{for(var i=0;i<n.childNodes.length;i++)c(n.childNodes[i]);}})(document.body);
  for(var pi=0;pi<pool.length;pi++){
    var tn=pool[pi],p=tn.parentNode;
    if(p&&p.nodeType===1&&p.hasAttribute&&p.hasAttribute('data-i18n'))continue;
    var orig=tn.nodeValue,v=orig,tv=v.trim();
    if(mdict[tv]){v=v.replace(tv,mdict[tv]);}
    else if(ddict[tv]){v=v.replace(tv,ddict[tv]);}
    else{for(var mk in mdict){if(mdict.hasOwnProperty(mk)&&v.indexOf(mk)!==-1)v=v.split(mk).join(mdict[mk]);}
      for(var dk in ddict){if(ddict.hasOwnProperty(dk)&&v.indexOf(dk)!==-1)v=v.split(dk).join(ddict[dk]);}}
    if(v!==orig)tn.nodeValue=v;
  }

  // === 6. 表格 nc 列 ===
  var NCM={
  en:{'青羽':'Qingyu','大千':'Daqian','幻影五代':'Phantom 5','御影S \ud83d\udd25推荐':'Yuying S \ud83d\udd25Rec','幻影Pro':'Phantom Pro','宙斯':'Zeus','果味过渡':'Fruity Alt','解瘾强':'Strong Hit','国风雅致':'Classic Chinese','蓝莓替代':'Blueberry Alt'},
  fr:{'青羽':'Qingyu','大千':'Daqian','幻影五代':'Phantom 5','御影S \ud83d\udd25推荐':'Yuying S \ud83d\udd25Rec','幻影Pro':'Phantom Pro','宙斯':'Zeus','果味过渡':'Alternative Fruit\u00e9e','解瘾强':'Hit Fort','国风雅致':'\u00c9l\u00e9gance Chinoise','蓝莓替代':'Alternative Myrtille'},
  ru:{'青羽':'Qingyu','大千':'Daqian','幻影五代':'Phantom 5','御影S \ud83d\udd25推荐':'Yuying S \ud83d\udd25Rec','幻影Pro':'Phantom Pro','宙斯':'Zeus','果味过渡':'Фруктовый','解瘾强':'Сильный','国风雅致':'Китайский','蓝莓替代':'Черника'}
  };
  var ncm=NCM[L];
  if(ncm){
    var ncs=document.querySelectorAll('td.nc');
    for(var ni=0;ni<ncs.length;ni++){var nct=ncs[ni].textContent.trim();if(ncm[nct])ncs[ni].textContent=ncm[nct];}
  }
}
