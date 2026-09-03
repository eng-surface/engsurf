import heroImg from "@/assets/hero.jpg";
import productShot from "@/assets/product-shot.jpg";
import screenshot2 from "@/assets/screenshot-2.jpg";
import screenshot3 from "@/assets/screenshot-3.jpg";

export type CategoryId = "catia" | "nx" | "vba" | "python";

export interface Category {
  id: CategoryId;
  name: string;
  short: string;
  description: string;
  tools: number;
}

export const categories: Category[] = [
  {
    id: "catia",
    name: "CATIA Automation",
    short: "CATIA",
    description:
      "CATScript, VBA and CAA-ready macros for drafting, assembly and part design workflows.",
    tools: 42,
  },
  {
    id: "nx",
    name: "Siemens NX Automation",
    short: "NX",
    description: "NXOpen journals and add-ins for modeling, PMI, drawings and CAM preparation.",
    tools: 31,
  },
  {
    id: "vba",
    name: "Excel VBA Automation",
    short: "Excel VBA",
    description: "Engineering calculators, BOM tooling and report generators built in Excel VBA.",
    tools: 38,
  },
  {
    id: "python",
    name: "Python Engineering Applications",
    short: "Python",
    description: "Desktop apps and scripts for tolerance analysis, data pipelines and QA checks.",
    tools: 27,
  },
];

export interface Review {
  author: string;
  role: string;
  rating: number;
  date: string;
  body: string;
}

export interface Product {
  slug: string;
  title: string;
  tagline: string;
  category: CategoryId;
  version: string;
  updated: string;
  compatibility: string[];
  price: number; // 0 = free
  rating: number;
  reviewsCount: number;
  downloads: number;
  featured: boolean;
  latest: boolean;
  image: string;
  screenshots: string[];
  description: string;
  features: string[];
  youtubeId: string;
  docs: { label: string; size: string }[];
  reviews: Review[];
  faq: { q: string; a: string }[];
  history: { version: string; date: string; notes: string }[];
}

const commonDocs = [
  { label: "Installation Guide (PDF)", size: "1.4 MB" },
  { label: "User Manual (PDF)", size: "3.8 MB" },
  { label: "API Reference (PDF)", size: "0.9 MB" },
];

const baseFaq = [
  {
    q: "Is a license required per seat?",
    a: "Paid tools include a single-seat perpetual license with 12 months of updates. Floating licenses are available on request.",
  },
  {
    q: "Do you support older software releases?",
    a: "Yes. Each release lists verified compatibility, and legacy builds stay available in the version history section.",
  },
  {
    q: "Can the tool be customized for our internal standards?",
    a: "Every tool can be adapted through the Request Custom Tool form, including branded UI and company-specific naming rules.",
  },
  {
    q: "How are updates delivered?",
    a: "Updates arrive by email with a signed installer, and the download link in your account always points at the latest build.",
  },
];

function reviews(a: Review[]): Review[] {
  return a;
}

export const products: Product[] = [
  {
    slug: "catia-drawing-automation-suite",
    title: "CATIA Drawing Automation Suite",
    tagline: "Generate production drawings, views and dimensions in a single pass.",
    category: "catia",
    version: "4.2.1",
    updated: "2026-08-14",
    compatibility: ["CATIA V5-6R2018 → R2024", "Windows 10 / 11"],
    price: 189,
    rating: 4.8,
    reviewsCount: 126,
    downloads: 18420,
    featured: true,
    latest: true,
    image: productShot,
    screenshots: [productShot, screenshot2, screenshot3],
    description:
      "The Drawing Automation Suite turns a finished CATPart or CATProduct into a fully dimensioned drawing set that follows your company template. View placement, section cuts, balloons and title-block data are driven by a rule file you control, so drafting output stays identical across teams and sites.",
    features: [
      "Rule-driven view layout with automatic scale selection",
      "Batch drawing generation for entire assemblies",
      "Title block population from CATIA properties or Excel",
      "Automatic balloon and BOM table synchronisation",
      "Standards checker for ISO, ASME and internal rules",
      "One-click export to PDF, DXF and TIFF",
    ],
    youtubeId: "ScMzIvxBSi4",
    docs: commonDocs,
    reviews: reviews([
      {
        author: "Marc Delacroix",
        role: "Senior Design Engineer, Aerospace Tier 1",
        rating: 5,
        date: "2026-07-22",
        body: "Cut our drawing release time from two days to about three hours per assembly. The standards checker alone paid for the license.",
      },
      {
        author: "Priya Nair",
        role: "CAD Methods Lead",
        rating: 5,
        date: "2026-06-02",
        body: "Rule files are readable and easy to version-control. Deployment across 40 seats was painless.",
      },
      {
        author: "Tom Brandt",
        role: "Tooling Engineer",
        rating: 4,
        date: "2026-04-11",
        body: "Excellent for standard parts. Very complex weldments still need manual cleanup, but it gets you 90% there.",
      },
    ]),
    faq: baseFaq,
    history: [
      { version: "4.2.1", date: "2026-08-14", notes: "Fixed scale rounding on A0 sheets; faster batch export." },
      { version: "4.2.0", date: "2026-05-30", notes: "Added ASME Y14.5 checker profile and DXF layer mapping." },
      { version: "4.1.0", date: "2026-02-09", notes: "CATIA R2024 support, new balloon placement engine." },
      { version: "4.0.0", date: "2025-10-18", notes: "Rewritten rule engine with Excel-driven title blocks." },
    ],
  },
  {
    slug: "nx-open-model-checker",
    title: "NX Open Model Checker",
    tagline: "Validate NX models against your quality checklist before release.",
    category: "nx",
    version: "3.0.4",
    updated: "2026-08-02",
    compatibility: ["Siemens NX 1980 → 2412", "Windows 10 / 11"],
    price: 149,
    rating: 4.7,
    reviewsCount: 84,
    downloads: 11260,
    featured: true,
    latest: true,
    image: screenshot2,
    screenshots: [screenshot2, productShot, screenshot3],
    description:
      "Model Checker runs an NXOpen journal across parts and assemblies to detect broken references, missing PMI, non-standard layers, unconstrained sketches and attribute gaps. Results are reported in an interactive panel with jump-to-object navigation and an exportable audit trail.",
    features: [
      "80+ built-in checks with severity levels",
      "Custom check authoring in Python or C#",
      "Assembly-wide batch runs with HTML report",
      "PMI and attribute completeness validation",
      "Jump-to-object navigation from every finding",
      "Teamcenter-friendly audit export",
    ],
    youtubeId: "ScMzIvxBSi4",
    docs: commonDocs,
    reviews: reviews([
      {
        author: "Elena Fischer",
        role: "PLM Administrator, Automotive OEM",
        rating: 5,
        date: "2026-07-05",
        body: "We wired it into our release gate. Rework from bad geometry dropped noticeably in the first quarter.",
      },
      {
        author: "Dan O'Reilly",
        role: "NX CAD Specialist",
        rating: 4,
        date: "2026-03-19",
        body: "Custom checks in Python are straightforward. Report styling could use more options.",
      },
    ]),
    faq: baseFaq,
    history: [
      { version: "3.0.4", date: "2026-08-02", notes: "NX 2412 compatibility, faster assembly traversal." },
      { version: "3.0.0", date: "2026-01-27", notes: "New check API and interactive results panel." },
      { version: "2.4.2", date: "2025-09-08", notes: "PMI validation improvements." },
    ],
  },
  {
    slug: "excel-bom-cost-engine",
    title: "Excel BOM & Cost Engine",
    tagline: "Turn raw BOM exports into costed, revision-aware workbooks.",
    category: "vba",
    version: "2.6.0",
    updated: "2026-07-28",
    compatibility: ["Excel 2016 → Microsoft 365", "Windows / macOS (VBA)"],
    price: 0,
    rating: 4.6,
    reviewsCount: 213,
    downloads: 40310,
    featured: true,
    latest: false,
    image: screenshot2,
    screenshots: [screenshot2, screenshot3, productShot],
    description:
      "A free VBA workbook that ingests CAD BOM exports, normalises part numbers, applies cost rules per material and process, and produces a clean rollup with revision comparison. Built for manufacturing engineers who live in Excel and need a repeatable costing method.",
    features: [
      "CSV / XLSX BOM import with column mapping",
      "Material and process cost rule tables",
      "Revision-to-revision delta report",
      "Multi-level BOM rollup with make/buy split",
      "Unlocked, commented VBA source",
    ],
    youtubeId: "ScMzIvxBSi4",
    docs: [commonDocs[0], commonDocs[1]],
    reviews: reviews([
      {
        author: "Sofia Marchetti",
        role: "Manufacturing Engineer",
        rating: 5,
        date: "2026-06-28",
        body: "Free and better than the internal tool we maintained for years. The delta report is the killer feature.",
      },
      {
        author: "Kevin Wu",
        role: "Cost Estimator",
        rating: 4,
        date: "2026-05-14",
        body: "Fast on 10k-line BOMs. Would like native Google Sheets support one day.",
      },
    ]),
    faq: baseFaq,
    history: [
      { version: "2.6.0", date: "2026-07-28", notes: "Faster rollup engine, new make/buy split." },
      { version: "2.5.0", date: "2026-02-12", notes: "Revision delta report added." },
      { version: "2.0.0", date: "2025-08-30", notes: "Rewritten import mapper." },
    ],
  },
  {
    slug: "python-tolerance-stackup",
    title: "Python Tolerance Stack-Up Studio",
    tagline: "Worst-case, RSS and Monte Carlo stack-ups with publication-ready plots.",
    category: "python",
    version: "1.9.3",
    updated: "2026-08-20",
    compatibility: ["Python 3.10+", "Windows / Linux / macOS"],
    price: 129,
    rating: 4.9,
    reviewsCount: 67,
    downloads: 8740,
    featured: true,
    latest: true,
    image: screenshot3,
    screenshots: [screenshot3, screenshot2, heroImg],
    description:
      "A desktop application for dimensional engineers. Define contributors, distributions and sensitivities, then run worst-case, RSS and Monte Carlo analyses side by side. Results export to PDF reports and CSV so they can drop straight into a design review pack.",
    features: [
      "Worst-case, RSS and Monte Carlo in one model",
      "Contributor sensitivity ranking",
      "Non-normal distributions and shifted means",
      "Capability metrics (Cp, Cpk, PPM)",
      "Batch scenario runner via CLI",
      "PDF and CSV report export",
    ],
    youtubeId: "ScMzIvxBSi4",
    docs: commonDocs,
    reviews: reviews([
      {
        author: "Hannah Berg",
        role: "Dimensional Engineer",
        rating: 5,
        date: "2026-08-01",
        body: "Replaced a fragile spreadsheet we had used for a decade. Monte Carlo runs are fast and the reports look professional.",
      },
      {
        author: "Ahmed Zaki",
        role: "Quality Engineer",
        rating: 5,
        date: "2026-06-17",
        body: "Sensitivity ranking makes design reviews far shorter — you immediately see which contributor to attack.",
      },
    ]),
    faq: baseFaq,
    history: [
      { version: "1.9.3", date: "2026-08-20", notes: "Faster Monte Carlo sampler, PDF template refresh." },
      { version: "1.8.0", date: "2026-04-04", notes: "CLI batch runner and CSV export." },
      { version: "1.5.0", date: "2025-11-21", notes: "Added capability metrics." },
    ],
  },
  {
    slug: "catia-parametric-part-generator",
    title: "CATIA Parametric Part Generator",
    tagline: "Drive families of parts from a single Excel design table.",
    category: "catia",
    version: "2.3.0",
    updated: "2026-07-09",
    compatibility: ["CATIA V5-6R2019 → R2024"],
    price: 99,
    rating: 4.5,
    reviewsCount: 58,
    downloads: 9310,
    featured: false,
    latest: true,
    image: productShot,
    screenshots: [productShot, screenshot3],
    description:
      "Feed an Excel table of parameters and generate an entire part family with correct naming, properties and save locations. Ideal for fixture components, fasteners and standard tooling elements.",
    features: [
      "Design-table driven generation",
      "Automatic naming and property assignment",
      "Batch save to structured folders",
      "Failure log with per-row diagnostics",
    ],
    youtubeId: "ScMzIvxBSi4",
    docs: [commonDocs[0], commonDocs[1]],
    reviews: reviews([
      {
        author: "Luis Ferreira",
        role: "Fixture Designer",
        rating: 5,
        date: "2026-05-22",
        body: "Generated 300 fixture variants overnight. Diagnostics log made the few failures trivial to fix.",
      },
    ]),
    faq: baseFaq,
    history: [
      { version: "2.3.0", date: "2026-07-09", notes: "Folder templating and improved diagnostics." },
      { version: "2.0.0", date: "2026-01-15", notes: "New generation engine." },
    ],
  },
  {
    slug: "nx-cam-setup-assistant",
    title: "NX CAM Setup Assistant",
    tagline: "Standardise CAM setups, tool lists and post outputs.",
    category: "nx",
    version: "1.4.2",
    updated: "2026-06-30",
    compatibility: ["Siemens NX 2007 → 2412", "NX CAM"],
    price: 219,
    rating: 4.4,
    reviewsCount: 39,
    downloads: 5120,
    featured: false,
    latest: false,
    image: screenshot2,
    screenshots: [screenshot2, productShot],
    description:
      "Automates CAM programme preparation: machine selection, WCS placement, stock definition and tool list generation from your shop tool library, followed by a validated post run.",
    features: [
      "Template-driven setup creation",
      "Tool library matching and gap report",
      "Stock and WCS automation",
      "Post-processor validation run",
    ],
    youtubeId: "ScMzIvxBSi4",
    docs: commonDocs,
    reviews: reviews([
      {
        author: "Greg Halvorsen",
        role: "CNC Programmer",
        rating: 4,
        date: "2026-04-28",
        body: "Setup prep is now minutes instead of an hour. Tool gap report is very handy.",
      },
    ]),
    faq: baseFaq,
    history: [
      { version: "1.4.2", date: "2026-06-30", notes: "Post validation fixes." },
      { version: "1.3.0", date: "2026-02-02", notes: "Tool gap report added." },
    ],
  },
  {
    slug: "vba-engineering-calc-pack",
    title: "VBA Engineering Calculation Pack",
    tagline: "60 verified calculation sheets with unit handling and audit trail.",
    category: "vba",
    version: "5.1.0",
    updated: "2026-08-11",
    compatibility: ["Excel 2016 → Microsoft 365"],
    price: 79,
    rating: 4.7,
    reviewsCount: 148,
    downloads: 26440,
    featured: false,
    latest: true,
    image: screenshot2,
    screenshots: [screenshot2, screenshot3],
    description:
      "A curated library of mechanical calculation sheets — bolted joints, press fits, beam deflection, gear sizing, thermal expansion — each with unit-aware inputs, references and a printable audit trail for design reviews.",
    features: [
      "60 verified calculation sheets",
      "Unit-aware inputs (SI and imperial)",
      "Reference citations on every sheet",
      "Printable audit trail",
      "Company branding template",
    ],
    youtubeId: "ScMzIvxBSi4",
    docs: commonDocs,
    reviews: reviews([
      {
        author: "Rita Svensson",
        role: "Mechanical Engineer",
        rating: 5,
        date: "2026-07-14",
        body: "The references on each sheet make review sign-off painless.",
      },
    ]),
    faq: baseFaq,
    history: [
      { version: "5.1.0", date: "2026-08-11", notes: "Six new sheets, imperial unit fixes." },
      { version: "5.0.0", date: "2026-03-03", notes: "New audit trail engine." },
    ],
  },
  {
    slug: "python-drawing-ocr-extractor",
    title: "Python Drawing Data Extractor",
    tagline: "Pull dimensions and title-block data from legacy PDF drawings.",
    category: "python",
    version: "0.9.5",
    updated: "2026-08-25",
    compatibility: ["Python 3.11+", "Windows / Linux"],
    price: 0,
    rating: 4.3,
    reviewsCount: 52,
    downloads: 14980,
    featured: false,
    latest: true,
    image: screenshot3,
    screenshots: [screenshot3, screenshot2],
    description:
      "An open, free extractor that reads scanned or vector PDF drawings and returns structured title-block fields plus a dimension list, ready for import into PLM or a supplier RFQ pipeline.",
    features: [
      "Vector and scanned PDF support",
      "Title-block field templates",
      "Dimension and tolerance parsing",
      "JSON / CSV output for PLM import",
    ],
    youtubeId: "ScMzIvxBSi4",
    docs: [commonDocs[0]],
    reviews: reviews([
      {
        author: "Nikolai Petrov",
        role: "Data Engineer, Industrial Group",
        rating: 4,
        date: "2026-08-05",
        body: "Handled 12,000 legacy drawings with about 92% field accuracy. Good starting point for our migration.",
      },
    ]),
    faq: baseFaq,
    history: [
      { version: "0.9.5", date: "2026-08-25", notes: "Better tolerance parsing on scanned sheets." },
      { version: "0.8.0", date: "2026-05-09", notes: "Template editor released." },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const categoryName = (id: CategoryId) =>
  categories.find((c) => c.id === id)?.name ?? id;

export const relatedProducts = (p: Product) =>
  products.filter((x) => x.slug !== p.slug && x.category === p.category).slice(0, 3);

export const formatPrice = (price: number) => (price === 0 ? "Free" : `$${price}`);
