import { useMemo, useState } from "react";
import { sections } from "./data/sections";
import { Sidebar } from "./components/Sidebar";
import { MobileNav } from "./components/MobileNav";
import { SectionView } from "./components/SectionView";
import { Menu } from "lucide-react";

function App() {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const activeSection = useMemo(
    () => sections.find((section) => section.id === activeId) ?? sections[0],
    [activeId],
  );

  const currentIndex = sections.findIndex((section) => section.id === activeId);

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <div className="mx-auto flex min-h-screen max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        <Sidebar
          sections={sections}
          activeId={activeId}
          onSelect={(id) => {
            setActiveId(id);
            setIsMobileOpen(false);
          }}
        />

        <main className="flex-1 overflow-hidden rounded-3xl border border-border-default bg-bg-surface shadow-soft">
          <div className="flex items-center justify-between border-b border-border-default px-6 py-5 sm:px-8">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-text-muted">
                Allen & Heath SQ-6 Training
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                SQ-6 Volunteer Guide
              </h1>
            </div>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border-default bg-bg-base text-text-secondary transition hover:border-white/20 hover:text-white"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <SectionView
            section={activeSection}
            onSelect={(id) => setActiveId(id)}
            currentIndex={currentIndex}
            sections={sections}
          />
        </main>
      </div>

      <MobileNav
        sections={sections}
        activeId={activeId}
        open={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        onSelect={(id) => {
          setActiveId(id);
          setIsMobileOpen(false);
        }}
      />
    </div>
  );
}

export default App;
