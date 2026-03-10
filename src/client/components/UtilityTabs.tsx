import { atom, useAtom, useAtomValue } from "jotai";
import { ImportMapFilter } from "./ImportMapFilter";
import { ImportMapSort } from "./ImportMapSort";
import { SelectionBar } from "./SelectionBar";

const tabContentStyles =
  "tab-content rounded-box bg-base-100 border-base-300 p-5";

const activeTabAtom = atom(2);

function Tab({ children, id }: { children: string; id: number }) {
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);
  const isActive = activeTab === id;

  const handleTabChange = () => {
    setActiveTab(id);
  };

  return (
    <a
      role="tab"
      className={`tab ${isActive ? "tab-active" : ""}`}
      onClick={handleTabChange}
    >
      {children}
    </a>
  );
}

export function UtilityTabs() {
  const activeTab = useAtomValue(activeTabAtom);

  return (
    <div role="tablist" className="tabs tabs-border w-80">
      <Tab id={0}>Config</Tab>
      {activeTab === 0 && (
        <section className={tabContentStyles}>Config</section>
      )}

      <Tab id={1}>Sort/Filter</Tab>
      {activeTab === 1 && (
        <section className={tabContentStyles}>
          <ImportMapSort />
          <ImportMapFilter />
          <SelectionBar />
        </section>
      )}

      <Tab id={2}>Export</Tab>
      {activeTab === 2 && (
        <section className={tabContentStyles}>Export</section>
      )}
    </div>
  );
}
