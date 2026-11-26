const P = {
  collect: <><path d="M4 20h16" /><path d="M6 20l2-9h8l2 9" /><path d="M9 11c0-3 1-5 3-7 2 2 3 4 3 7" /></>,
  dry: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19" /><path d="M5 19l1.5-1.5M17.5 6.5L19 5" /></>,
  crush: <><circle cx="8" cy="12" r="4" /><circle cx="16" cy="12" r="4" /><path d="M8 8V4M16 8V4M8 16v4M16 16v4" /></>,
  press: <><rect x="3" y="8" width="12" height="8" rx="1" /><path d="M15 12h6M18 9v6" /><path d="M7 8V5h4v3" /></>,
  truck: <><path d="M2 7h11v9H2z" /><path d="M13 10h4l3 3v3h-7" /><circle cx="6" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>,
  boiler: <><rect x="6" y="3" width="12" height="18" rx="6" /><path d="M10 15c0-2 2-3 2-5 1 2 2 3 2 5a2 2 0 0 1-4 0z" /></>,
  kiln: <><path d="M3 21V11l9-7 9 7v10z" /><path d="M9 21v-5a3 3 0 0 1 6 0v5" /></>,
  textile: <><path d="M4 6h16M4 12h16M4 18h16" /><path d="M8 3v18M16 3v18" /></>,
  food: <><path d="M4 11h16a8 8 0 0 1-16 0z" /><path d="M9 7c0-2 2-2 2-4M14 7c0-2 2-2 2-4" /></>,
  rice: <><path d="M12 22V9" /><path d="M12 9c-3 0-5-2-5-5 3 0 5 2 5 5zM12 13c3 0 5-2 5-5-3 0-5 2-5 5zM12 17c-3 0-5-2-5-5 3 0 5 2 5 5z" /></>,
  dairy: <><path d="M8 3h8v3l2 4v11H6V10l2-4z" /><path d="M6 13h12" /></>,
  hotel: <><path d="M3 21V5h12v16M15 9h6v12" /><path d="M7 9h4M7 13h4M7 17h4" /></>,
  hospital: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M12 8v8M8 12h8" /></>,
  leaf: <><path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15" /><path d="M5 19l7-7" /></>,
  flame: <><path d="M12 3c2 4 6 7 6 12a6 6 0 1 1-12 0c0-3 1.5-5.5 3-7 0 2 1 3.5 2.5 4-.5-3.5 0-6.5.5-9z" /></>,
  lab: <><path d="M9 3h6M10 3v5l-5 9a2 2 0 0 0 1.7 3h10.6A2 2 0 0 0 19 17l-5-9V3" /><path d="M7.5 14h9" /></>,
};

export default function Icon({ name, size = 28 }) {
  return (
    <svg className="ico" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {P[name] || P.flame}
    </svg>
  );
}
