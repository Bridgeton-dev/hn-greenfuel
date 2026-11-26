/* ============================================================
   HN Greenfuel — centralised site content & product catalog
   ============================================================ */

export const NAV = [
  ["Home", "/"],
  ["About", "/about"],
  ["Products", "/products"],
  ["Manufacturing", "/manufacturing"],
  ["Quality", "/quality"],
  ["Industries", "/industries"],
  ["Sustainability", "/sustainability"],
  ["Gallery", "/gallery"],
  ["FAQ", "/faq"],
  ["Raw Material Suppliers", "/raw-material-suppliers"],
  ["Contact", "/contact"],
];

export const DESKTOP_PRIMARY = [
  ["Home", "/"],
  ["About", "/about"],
  ["Products", "/products"],
  ["Manufacturing", "/manufacturing"],
  ["Industries", "/industries"],
  ["Gallery", "/gallery"],
  ["Contact", "/contact"],
];

export const DESKTOP_MORE = [
  ["Quality", "/quality"],
  ["Sustainability", "/sustainability"],
  ["FAQ", "/faq"],
  ["Raw Material Suppliers", "/raw-material-suppliers"],
];

export const DESKTOP_NAV = DESKTOP_PRIMARY;

export const MATERIALS = ["Rice husk", "Sawdust", "Groundnut shell", "Mustard stalk", "Cotton stalk", "Bagasse"];

export const STATS = [
  { from: 0, to: 4400, prefix: "3,800–", suffix: "", unit: "kcal/kg", label: "Typical calorific value", fmt: true },
  { from: 30, to: 10, prefix: "<", suffix: "%", unit: "", label: "Moisture across all grades" },
  { from: 40, to: 8, prefix: "4–", suffix: "%", unit: "", label: "Typical ash, by raw material" },
  { from: 0, to: 6, prefix: "", suffix: "", unit: "feedstocks", label: "Agro & wood residues pressed" },
];

/* Indicative comparison rows: Parameter | Briquettes | Pellets | Coal */
export const COAL_COMPARISON = [
  { p: "Calorific value (kcal/kg)", bri: "3,800–4,400", pel: "3,900–4,400", coal: "3,500–5,000" },
  { p: "Ash content", bri: "4–8%", pel: "4–8%", coal: "25–45%" },
  { p: "Moisture", bri: "Below 10%", pel: "Below 10%", coal: "Varies by grade and weather" },
  { p: "Sulphur", bri: "Very low", pel: "Very low", coal: "About 0.5%" },
  { p: "Source", bri: "Crop and wood residue", pel: "Crop and wood residue", coal: "Mined fossil fuel" },
  { p: "Renewable", bri: "Yes", pel: "Yes", coal: "No" },
  { p: "Carbon type", bri: "Biogenic", pel: "Biogenic", coal: "Fossil" },
  { p: "Ash handling", bri: "Less ash", pel: "Less ash", coal: "More ash" },
  { p: "Best suited for", bri: "Boilers and kilns", pel: "Automatic feeders and burners", coal: "Coal-fired systems" },
];

export const COMPARISON_BARS = [
  { k: "Ash content", coal: [92, "25–45%"], bri: [16, "4–8%"] },
  { k: "Calorific value", coal: [80, "3,500–5,000 kcal/kg"], bri: [74, "3,800–4,400 kcal/kg"] },
];

export const COMPARISON_BENEFITS = [
  { t: "Less ash", d: "4–8% typical ash vs. 25–45% in coal, cutting grate cleaning and disposal.", icon: "boiler" },
  { t: "Renewable source", d: "Biogenic fuel pressed without chemical binders or fossil mining.", icon: "leaf" },
  { t: "Local crop residue", d: "Made from agricultural and mill residues kept out of open field fires.", icon: "rice" },
];

/* Legacy alias kept for any existing imports */
export const COMPARE = COMPARISON_BARS;

export const STEPS = [
  {
    n: "01",
    t: "Collect",
    tag: "Raw biomass",
    d: "Rice husk, sawdust, groundnut shell, mustard and cotton stalk and bagasse are sourced from mills and farms.",
    img: "/img/raw-sm.webp",
    alt: "Raw agricultural and wood biomass feedstocks before processing",
    icon: "collect",
    illustrative: true,
  },
  {
    n: "02",
    t: "Dry",
    tag: "Moisture control",
    d: "Material is dried to a low, even moisture level.",
    img: "/img/dryer.jpg",
    alt: "Illustrative industrial biomass rotary drum dryer",
    icon: "dry",
    illustrative: true,
  },
  {
    n: "03",
    t: "Crush",
    tag: "Uniform size",
    d: "Hammer milling and screening give a consistent particle size.",
    img: "/img/pellets-sm.webp",
    alt: "Uniformly sized processed biomass feedstock and pellets",
    icon: "crush",
    illustrative: true,
  },
  {
    n: "04",
    t: "Press",
    tag: "High density",
    d: "Heat and pressure bind the biomass using its natural lignin.",
    img: "/img/press-sm.webp",
    alt: "Mechanical briquetting press extruding cylindrical briquettes",
    icon: "press",
    illustrative: true,
  },
  {
    n: "05",
    t: "Pack & deliver",
    tag: "Ready stock",
    d: "Cooled on conveyors, sorted, packed or loose-loaded, weighed and sent as per the confirmed order.",
    img: "/img/truck.jpg",
    alt: "Illustrative truck loading of bagged and stacked briquettes",
    icon: "truck",
    illustrative: true,
  },
];

export const MFG_STEPS = [
  {
    n: "01",
    t: "Collect",
    tag: "Raw biomass",
    d: "Rice husk, sawdust, groundnut shell, mustard and cotton stalk and bagasse are sourced from mills and farms.",
    img: "/img/raw.webp",
    alt: "Five raw biomass residues including rice husk, sawdust, groundnut shell, stalks and bagasse",
    icon: "collect",
    detail: "Each incoming lot is weighed and stored under dry cover to keep weather moisture out prior to processing.",
    illustrative: true,
  },
  {
    n: "02",
    t: "Dry",
    tag: "Moisture control",
    d: "Material is dried to a low, even moisture level.",
    img: "/img/dryer.jpg",
    alt: "Illustrative rotary drum dryer drying agricultural residue in an industrial shed",
    icon: "dry",
    detail: "Consistent pre-drying keeps briquette density uniform and helps maintain finished moisture below 10%.",
    illustrative: true,
  },
  {
    n: "03",
    t: "Crush",
    tag: "Uniform size",
    d: "Hammer milling and screening give a consistent particle size.",
    img: "/img/pellets-sm.webp",
    alt: "Uniformly sized processed biomass particles and pellets",
    icon: "crush",
    detail: "Uniform particle sizing ensures smooth feeding into the press die without clogging or crumbling.",
    illustrative: true,
  },
  {
    n: "04",
    t: "Press",
    tag: "High density",
    d: "Heat and pressure bind the biomass using its natural lignin.",
    img: "/img/press.webp",
    alt: "Biomass briquetting press compressing raw material into a solid cylindrical log",
    icon: "press",
    detail: "Briquettes are formed in 60 mm, 70 mm and 90 mm diameters; pellets are extruded in 6 mm and 8 mm dies.",
    illustrative: true,
  },
  {
    n: "05",
    t: "Cool",
    tag: "Stable shape",
    d: "Hot fuel cools and hardens before handling.",
    img: "/img/sizes-sm.webp",
    alt: "Cooled cylindrical biomass briquettes in 60 mm, 70 mm and 90 mm sizes",
    icon: "flame",
    detail: "Controlled cooling prevents surface cracks and excessive fines during handling and transit.",
    illustrative: true,
  },
  {
    n: "06",
    t: "Pack",
    tag: "Ready stock",
    d: "Fuel is sorted and packed or prepared for loose loading.",
    img: "/img/stack.webp",
    alt: "Finished cylindrical hollow biomass briquettes stacked neatly for dispatch",
    icon: "lab",
    detail: "Bagged or loose supply can be tailored to your unloading setup and covered storage.",
    illustrative: true,
  },
  {
    n: "07",
    t: "Dispatch",
    tag: "Delivery",
    d: "Loads are weighed and sent as per the confirmed order.",
    img: "/img/truck.jpg",
    alt: "Illustrative commercial cargo truck being loaded with bagged and loose briquettes",
    icon: "truck",
    detail: "Truckload scheduling is aligned with your boiler fuel inventory to avoid shutdowns.",
    illustrative: true,
  },
];

export const PRODUCTS = [
  {
    id: "sawdust",
    slug: "sawdust-briquettes",
    name: "Sawdust briquettes",
    shortName: "Sawdust",
    blurb: "High-density, low-ash fuel logs for boilers and thermic fluid heaters.",
    description:
      "Pressed from clean wood sawdust with zero chemical binders. Sawdust briquettes sit at the top of our calorific range (4,200–4,400 kcal/kg typical) with minimal 4–5% ash, delivering steady heat and lower clinker build-up in demanding thermal equipment.",
    img: "/img/sizes-sm.webp",
    imgLg: "/img/sizes.webp",
    alt: "Cylindrical hollow sawdust biomass briquettes in 90 mm, 70 mm and 60 mm diameters",
    sizes: ["60 mm", "70 mm", "90 mm"],
    specs: [
      ["Calorific value (typical)", "4,200–4,400 kcal/kg"],
      ["Moisture", "Below 10%"],
      ["Ash content", "4–5%"],
      ["Available diameters", "60 mm / 70 mm / 90 mm"],
      ["Binder", "None (100% natural lignin)"],
    ],
    uses: ["Steam & hot-water boilers", "Thermic fluid heaters", "Textile & dyeing plants", "Food processing", "Hospitals & hotels"],
    packing: "Supplied in HDPE/PP woven bags or loose truckload dispatch based on your unloading facility.",
    rawMaterial: "Timber mill sawdust and wood shavings",
  },
  {
    id: "husk",
    slug: "rice-husk-briquettes",
    name: "Rice husk briquettes",
    shortName: "Rice husk",
    blurb: "Economical white coal made from abundant regional paddy husk.",
    description:
      "Compacted from dried rice husk without chemical additives, offering dependable thermal output at an economical per-kilocalorie cost. Particularly well suited for rice mills, parboiling units, brick kilns and large solid-fuel boilers.",
    img: "/img/stack-sm.webp",
    imgLg: "/img/stack.webp",
    alt: "Neatly stacked hollow rice husk biomass briquettes",
    sizes: ["60 mm", "70 mm", "90 mm"],
    specs: [
      ["Calorific value (typical)", "3,800–4,000 kcal/kg"],
      ["Moisture", "Below 10%"],
      ["Ash content", "6–8%"],
      ["Available diameters", "60 mm / 70 mm / 90 mm"],
      ["Binder", "None (100% natural lignin)"],
    ],
    uses: ["Rice mills & parboiling", "Brick kilns", "Industrial steam boilers", "Drying kilns", "Distilleries & agro-processing"],
    packing: "Supplied in woven bags or loose bulk truckloads with weighbridge slip.",
    rawMaterial: "Clean paddy / rice husk sourced from local rice mills",
  },
  {
    id: "agro",
    slug: "agro-mix-briquettes",
    name: "Agro-mix briquettes",
    shortName: "Agro-mix",
    blurb: "Blended groundnut shell, mustard & cotton stalk and bagasse logs.",
    description:
      "Manufactured from screened blends of groundnut shell, mustard stalk, cotton stalk and sugarcane bagasse. Agro-mix briquettes balance steady heat output (3,900–4,200 kcal/kg typical) and moderate 5–7% ash for year-round supply reliability.",
    img: "/img/raw-sm.webp",
    imgLg: "/img/raw.webp",
    alt: "Raw agricultural feedstocks used in agro-mix biomass briquettes",
    sizes: ["60 mm", "70 mm", "90 mm"],
    specs: [
      ["Calorific value (typical)", "3,900–4,200 kcal/kg"],
      ["Moisture", "Below 10%"],
      ["Ash content", "5–7%"],
      ["Available diameters", "60 mm / 70 mm / 90 mm"],
      ["Binder", "None (100% natural lignin)"],
    ],
    uses: ["Multi-fuel industrial boilers", "Brick kilns", "Food & dairy plants", "Paper & packaging mills", "Process heating"],
    packing: "Available in bagged or loose truckloads on trial or monthly supply contracts.",
    rawMaterial: "Groundnut shell, mustard stalk, cotton stalk and sugarcane bagasse",
  },
  {
    id: "pellets",
    slug: "biomass-pellets",
    name: "Biomass pellets",
    shortName: "Pellets",
    blurb: "Dense 6 mm & 8 mm free-flowing pellets for automatic feeders and burners.",
    description:
      "Precision-extruded cylindrical pellets engineered for screw feeders, automatic pellet burners, hot-air generators and gasifiers. Low moisture (<10%) and compact sizing enable controlled dosing, cleaner combustion and reduced manual firing.",
    img: "/img/pellets-sm.webp",
    imgLg: "/img/pellets.webp",
    alt: "Close-up of dense cylindrical biomass fuel pellets",
    sizes: ["6 mm", "8 mm"],
    specs: [
      ["Calorific value (typical)", "3,900–4,400 kcal/kg"],
      ["Moisture", "Below 10%"],
      ["Ash content", "4–8%"],
      ["Available diameters", "6 mm / 8 mm"],
      ["Binder", "None (100% natural lignin)"],
    ],
    uses: ["Automatic pellet burners", "Biomass gasifiers", "Hotel & hospital water heaters", "Commercial kitchens & bakeries", "Industrial co-firing"],
    packing: "Packed in 25–30 kg moisture-resistant bags or jumbo bulk bags.",
    rawMaterial: "Graded sawdust, rice husk and agro-residue blends",
  },
];

export const INDUSTRIES = [
  {
    t: "Industrial Boilers",
    short: "Process steam for manufacturing",
    d: "Fuel for raising process steam in solid-fuel and multi-fuel boilers.",
    icon: "boiler",
    filter: "steam",
    tags: ["Process steam", "Thermic fluid heating"],
    fuel: "Sawdust or agro-mix briquettes, 60–90 mm",
    check: "Grate type, feeding system, capacity",
    slug: "industrial-boilers",
    img: "/img/flame-sm.webp",
    illustrative: true,
  },
  {
    t: "Brick Kilns",
    short: "Heat support for brick firing",
    d: "Biomass fuel to support brick firing.",
    icon: "kiln",
    filter: "direct",
    tags: ["Kiln firing", "Heat support"],
    fuel: "Rice husk or agro-mix briquettes, 70–90 mm",
    check: "Kiln design, feeding method, temperature need",
    slug: "brick-kilns",
    img: "/img/stack-sm.webp",
    illustrative: true,
  },
  {
    t: "Textile & Dyeing",
    short: "Steam for wet processing",
    d: "Boiler fuel for the steam used in wet processing.",
    icon: "textile",
    filter: "steam",
    tags: ["Dyeing", "Washing", "Drying", "Finishing"],
    fuel: "Sawdust briquettes, 60–90 mm",
    check: "Steam load and pressure",
    slug: "textile-dyeing",
    img: "/img/sizes-sm.webp",
    illustrative: true,
  },
  {
    t: "Food Processing",
    short: "Process heat for cooking and drying",
    d: "Boiler fuel for process heat.",
    icon: "food",
    filter: "steam",
    tags: ["Cooking", "Blanching", "Drying", "Sterilising"],
    fuel: "Sawdust briquettes or 6–8 mm pellets",
    check: "Boiler type and separate, dry fuel storage",
    slug: "food-processing",
    img: "/img/pellets-sm.webp",
    illustrative: true,
  },
  {
    t: "Rice Mills",
    short: "Fuel for paddy processing boilers",
    d: "Fuel for boilers serving paddy processing.",
    icon: "rice",
    filter: "steam",
    tags: ["Parboiling", "Paddy drying"],
    fuel: "Rice husk briquettes, 70–90 mm",
    check: "Current husk firing and ash handling",
    slug: "rice-mills",
    img: "/img/raw-sm.webp",
    illustrative: true,
  },
  {
    t: "Dairies",
    short: "Steam and hot water for dairy plants",
    d: "Our fuel fires the boiler; the dairy uses that steam in its plant.",
    icon: "dairy",
    filter: "hotwater",
    tags: ["Pasteurisation", "CIP cleaning", "Sterilising", "Drying"],
    fuel: "Sawdust briquettes or biomass pellets",
    check: "Daily steam load changes and boiler fit",
    slug: "dairies",
    img: "/img/dryer.jpg",
    illustrative: true,
  },
  {
    t: "Hotels",
    short: "Hot water and laundry boiler fuel",
    d: "Fuel for suitable hot water and steam boilers.",
    icon: "hotel",
    filter: "hotwater",
    tags: ["Hot water", "Laundry", "Kitchen steam"],
    fuel: "6–8 mm pellets or 60 mm briquettes",
    check: "Storage space and local emission rules",
    slug: "hotels",
    img: "/img/pellets-sm.webp",
    illustrative: true,
  },
  {
    t: "Hospitals",
    short: "Utility boiler fuel",
    d: "Fuel for suitable utility boilers.",
    icon: "hospital",
    filter: "hotwater",
    tags: ["Laundry", "Sterilisation", "Hot water"],
    fuel: "6–8 mm pellets or 60 mm sawdust briquettes",
    check: "Emission rules and backup supply plan",
    slug: "hospitals",
    img: "/img/press-sm.webp",
    illustrative: true,
  },
];

/* ILLUSTRATIVE figures for a hypothetical mid-size plant — not measured results */
export const IMPACT = [
  { v: 1000, unit: "t / year", label: "of briquettes for a mid-size boiler (illustrative example)" },
  { v: 1100, unit: "t", label: "of crop & wood residue diverted from open burning" },
  { v: 1500, unit: "t CO₂", label: "fossil CO₂ potentially displaced vs. coal" },
];

export const FAQ = [
  {
    q: "Can I use biomass briquettes in my existing coal boiler?",
    a: "In most cases, yes. Biomass briquettes work in the majority of solid-fuel and multi-fuel boilers, often requiring only minor air-draft or feed adjustments. Share your boiler type and capacity and we can advise on size and a trial load.",
  },
  {
    q: "What calorific value and moisture should I expect?",
    a: "Typical gross calorific value ranges from 3,800 to 4,400 kcal/kg depending on the raw material grade, with moisture kept below 10%. Sawdust grades sit at the upper end (4,200–4,400 kcal/kg), while rice-husk grades sit around 3,800–4,000 kcal/kg. Actual results vary by batch and should be verified on trial.",
  },
  {
    q: "Which diameter should I pick — 60, 70 or 90 mm, or 6–8 mm pellets?",
    a: "90 mm logs suit large boilers and brick kilns with manual feeding; 60 mm and 70 mm logs feed evenly in small-to-medium furnaces. 6 mm and 8 mm pellets are designed for automated screw feeders, pellet burners and gasifiers.",
  },
  {
    q: "How is pricing calculated?",
    a: "Pricing is quoted per metric tonne (INR) on request based on product grade, diameter, packing (bags or loose), monthly volume and transport distance from our plant. Long-term monthly schedules receive priority pricing.",
  },
  {
    q: "What is the minimum order quantity and can we test a trial load first?",
    a: "We supply by the truckload for bulk orders and also arrange sample/trial loads so your boiler team can evaluate combustion, steam output and ash behaviour before committing to monthly tonnage.",
  },
  {
    q: "Are chemical binders or glues used in your briquettes?",
    a: "No. High mechanical pressure and frictional heat activate the natural lignin present inside wood and agricultural fibre to bind the briquette or pellet. Zero synthetic binders or chemical additives are used.",
  },
  {
    q: "How do biomass briquettes compare to Indian thermal coal?",
    a: "Compared with typical non-coking thermal coal (which often carries 25–45% ash and measurable sulphur), briquettes typically contain 4–8% ash and negligible sulphur, reducing ash disposal cost, clinkering and stack soot while using renewable biogenic residue.",
  },
  {
    q: "How should briquettes and pellets be stored at our factory?",
    a: "Keep them under a dry roof or tarpaulin cover off damp ground so moisture stays below 10%. Bagged briquettes and pellets stack neatly in less yard space and generate far less black dust than loose coal.",
  },
  {
    q: "Do you handle delivery logistics to our plant?",
    a: "Yes. We coordinate truckload dispatches directly to your plant gate with weighbridge documentation, or you may arrange ex-works pickup with your own transport.",
  },
  {
    q: "What raw materials go into HN Greenfuel products?",
    a: "We compress sawdust, paddy/rice husk, groundnut shell, mustard stalk, cotton stalk and sugarcane bagasse sourced from regional farms and agro-processing mills.",
  },
  {
    q: "How does buying briquettes help curb stubble burning?",
    a: "By creating dependable demand for crop stalks and husks after harvest, farmers and mills earn value from agricultural residue instead of burning it in open fields.",
  },
  {
    q: "Can farmers or mill owners sell raw biomass to HN Greenfuel?",
    a: "Yes. Farmers, FPOs, sawmills and rice mills with steady volumes of dry sawdust, rice husk, stalks or shells can submit supply details on our Raw Material Suppliers page.",
  },
];

export const VALUES = [
  {
    t: "Sustainability first",
    d: "Turning agricultural and mill residues into usable industrial energy while helping reduce open crop-residue burning.",
    icon: "leaf",
  },
  {
    t: "Consistent sizing & dryness",
    d: "Focusing on moisture control below 10% and clean mechanical compaction so every load feeds reliably.",
    icon: "press",
  },
  {
    t: "Transparent specifications",
    d: "Sharing typical fuel ranges honestly and encouraging buyers to run sample boiler trials before bulk contracts.",
    icon: "lab",
  },
  {
    t: "Dependable supply",
    d: "Coordinating feedstock aggregation and scheduled truck dispatches so your boiler never runs short.",
    icon: "truck",
  },
];

export const QUALITY_CHECKS = [
  {
    param: "Moisture content",
    target: "Below 10%",
    method: "Checked across incoming feedstock, post-drying stages and finished briquette batches using moisture meters and oven-drying checks.",
    why: "Excess moisture wastes boiler heat as steam and weakens briquette structure during transport.",
    icon: "dry",
  },
  {
    param: "Ash content",
    target: "4–8% (by grade)",
    method: "Monitored by feedstock grade (sawdust 4–5%, agro-mix 5–7%, rice husk 6–8%) with screening to keep soil and silica grit out.",
    why: "Lower ash means fewer grate cleanouts, less clinkering and minimal ash disposal overhead.",
    icon: "collect",
  },
  {
    param: "Calorific value",
    target: "3,800–4,400 kcal/kg (typical)",
    method: "Tracked by raw material composition and batch verification so industrial buyers know expected thermal yield.",
    why: "Predictable GCV helps plant engineers control fuel-to-steam ratios and operating cost.",
    icon: "boiler",
  },
  {
    param: "Compaction & sizing",
    target: "60/70/90 mm & 6/8 mm",
    method: "Visual and physical checks on diameter uniformity, surface density and minimal loose fines prior to packing or loading.",
    why: "Dense, uniform logs and pellets feed smoothly and hold shape through transit and unloading.",
    icon: "press",
  },
];

export const GALLERY_CATS = ["All", "Products", "Manufacturing", "Raw Materials", "Logistics & Lab"];

export const GALLERY = [
  {
    src: "/img/sizes.webp",
    thumb: "/img/sizes-sm.webp",
    alt: "Cylindrical hollow biomass briquettes in 90 mm, 70 mm and 60 mm diameters",
    title: "Briquette diameters (60 / 70 / 90 mm)",
    cat: "Products",
    note: "Representative product photo",
  },
  {
    src: "/img/stack.webp",
    thumb: "/img/stack-sm.webp",
    alt: "Stacked hollow biomass briquettes ready for dispatch",
    title: "Stacked hollow biomass briquettes",
    cat: "Products",
    note: "Representative product photo",
  },
  {
    src: "/img/pellets.webp",
    thumb: "/img/pellets-sm.webp",
    alt: "Dense 6 mm and 8 mm cylindrical biomass fuel pellets",
    title: "Biomass fuel pellets (6 / 8 mm)",
    cat: "Products",
    note: "Representative product photo",
  },
  {
    src: "/img/flame.webp",
    thumb: "/img/flame-sm.webp",
    alt: "Biomass briquettes burning inside an industrial boiler furnace",
    title: "High-temperature boiler combustion",
    cat: "Products",
    note: "Representative combustion photo",
  },
  {
    src: "/img/press.webp",
    thumb: "/img/press-sm.webp",
    alt: "Briquetting press compressing raw biomass without chemical binders",
    title: "High-pressure briquetting press",
    cat: "Manufacturing",
    note: "Illustrative industrial process visual",
  },
  {
    src: "/img/dryer.jpg",
    thumb: "/img/dryer.jpg",
    alt: "Illustrative rotary drum biomass dryer reducing feedstock moisture",
    title: "Rotary biomass drying unit",
    cat: "Manufacturing",
    note: "Illustrative industrial process visual",
  },
  {
    src: "/img/raw.webp",
    thumb: "/img/raw-sm.webp",
    alt: "Five raw biomass materials: rice husk, sawdust, groundnut shell, stalk and bagasse",
    title: "Multi-feedstock raw biomass",
    cat: "Raw Materials",
    note: "Representative feedstock photo",
  },
  {
    src: "/img/farmers.jpg",
    thumb: "/img/farmers.jpg",
    alt: "Illustrative photo of Indian farmers bundling crop straw in fields for biomass collection",
    title: "Field residue aggregation",
    cat: "Raw Materials",
    note: "Illustrative agricultural sourcing visual",
  },
  {
    src: "/img/field.webp",
    thumb: "/img/field-sm.webp",
    alt: "Green agricultural fields supplying seasonal crop residues",
    title: "Agricultural sourcing belts",
    cat: "Raw Materials",
    note: "Representative landscape photo",
  },
  {
    src: "/img/truck.jpg",
    thumb: "/img/truck.jpg",
    alt: "Illustrative cargo truck being loaded with bagged and loose briquettes at plant bay",
    title: "Bagged & bulk truck dispatch",
    cat: "Logistics & Lab",
    note: "Illustrative dispatch & yard visual",
  },
  {
    src: "/img/lab.jpg",
    thumb: "/img/lab.jpg",
    alt: "Illustrative fuel testing bench with bomb calorimeter, moisture analyzer and furnace",
    title: "Fuel testing bench setup",
    cat: "Logistics & Lab",
    note: "Illustrative lab equipment visual",
  },
];

export const SUPPLIER_MATERIALS = [
  "Rice husk",
  "Sawdust / wood shavings",
  "Groundnut shell",
  "Mustard stalk",
  "Cotton stalk",
  "Sugarcane bagasse",
  "Other dry agro-residue",
];
