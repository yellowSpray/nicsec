import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { TiArrowDown } from "react-icons/ti";
import { Card, CardContent, CardHeader } from "../ui/card";
import Button from "../ui/button";
import Paragraphs from "../ui/paragraphs";
import { AUDIENCE_TABS, isAudienceTabId } from "@/data/audienceTabs";
import { scrollToSection } from "@/features/scrollButton";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { AudienceTab } from "@/data/audienceTabs";

/**
 * Concave rounded corner where the narrower last row meets the block above.
 * A white square hides the sharp corner of the two straight borders,
 * then a quarter-circle border is drawn on top of it.
 */
function JoinCorner({ side }: { side: "left" | "right" }) {
    const position = side === "left"
        ? "-left-[var(--radius-second)]"
        : "-right-[var(--radius-second)]";
    const arc = side === "left"
        ? "border-t border-r rounded-tr-second"
        : "border-t border-l rounded-tl-second";
    const box = `absolute top-0 ${position} w-[calc(var(--radius-second)+1px)] h-[calc(var(--radius-second)+1px)] pointer-events-none`;
    return (
        <>
            <span aria-hidden="true" className={`${box} bg-white`} />
            <span aria-hidden="true" className={`${box} ${arc} border-background`} />
        </>
    );
}

/**
 * Services page: one tab per client type (sections 2 to 5 of the
 * VESTIGE content document). Each tab: title, description, cards, CTA.
 */
export default function AudienceTabs() {
    const { t } = useTranslation();
    const { hash } = useLocation();
    const hashId = decodeURIComponent(hash.slice(1));

    const [activeId, setActiveId] = useState(() =>
        isAudienceTabId(hashId) ? hashId : AUDIENCE_TABS[0].id
    );
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // Follow the URL hash (e.g. link from the home page cards)
    useEffect(() => {
        if (isAudienceTabId(hashId)) setActiveId(hashId);
    }, [hashId]);

    const activeIndex = AUDIENCE_TABS.findIndex((tab) => tab.id === activeId);
    const activeTab = AUDIENCE_TABS[activeIndex];
    const base = `services.tabs.${activeTab.key}`;

    usePageMeta(t(`${base}.seo.title`), t(`${base}.seo.description`));

    // Same breakpoints as Tailwind: sm = 40rem (2 columns), md = 60rem (3 columns)
    const isSm = useMediaQuery("(min-width: 40rem)");
    const isMd = useMediaQuery("(min-width: 60rem)");
    const cols = isMd ? 3 : isSm ? 2 : 1;

    // Full rows go in the main block, an incomplete last row in a narrower centered block
    const cards = activeTab.cards;
    const lastCount = cards.length % cols;
    const fullCards = cards.slice(0, cards.length - lastCount);
    const lastCards = cards.slice(cards.length - lastCount);
    const fullRows = fullCards.length / cols;

    const renderCard = ({ key, icon: Icon }: AudienceTab["cards"][number], dividers: string) => (
        <Card key={key} className={`shadow-none rounded-none border-background p-4 ${dividers}`}>
            <CardHeader className="flex items-center gap-2 pt-4">
                <Icon className="size-5 shrink-0 text-second" aria-hidden="true" />
                <h4 className="w-full">{t(`${base}.cards.${key}.title`)}</h4>
            </CardHeader>
            {/* pb-4 mirrors the header's pt-4: same space above and below */}
            <CardContent className="pb-4">
                <Paragraphs text={t(`${base}.cards.${key}.text`)} />
            </CardContent>
        </Card>
    );

    const selectTab = (index: number) => {
        const tab = AUDIENCE_TABS[index];
        setActiveId(tab.id);
        // Update the URL without triggering a router navigation (no scroll jump)
        window.history.replaceState(window.history.state, "", `#${tab.id}`);
    };

    // Keyboard navigation between tabs (WAI-ARIA tabs pattern)
    const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const last = AUDIENCE_TABS.length - 1;
        const next =
            event.key === "ArrowRight" ? (activeIndex === last ? 0 : activeIndex + 1) :
            event.key === "ArrowLeft" ? (activeIndex === 0 ? last : activeIndex - 1) :
            event.key === "Home" ? 0 :
            event.key === "End" ? last :
            null;
        if (next === null) return;
        event.preventDefault();
        selectTab(next);
        tabRefs.current[next]?.focus();
    };

    return (
        <section id={activeId} className="w-full px-8 mb-16 md:mb-32 flex justify-center scroll-mt-8">
            <div className="max-w-6xl w-full space-y-12">

                <div
                    role="tablist"
                    aria-label={t("services.tabsLabel")}
                    onKeyDown={onTabKeyDown}
                    className="flex gap-2 overflow-x-auto no-scrollbar -mx-8 px-8 sm:mx-0 sm:px-0 sm:justify-center"
                >
                    {AUDIENCE_TABS.map((tab, index) => {
                        const selected = tab.id === activeId;
                        return (
                            <button
                                key={tab.id}
                                ref={(el) => { tabRefs.current[index] = el; }}
                                type="button"
                                role="tab"
                                id={`tab-${tab.id}`}
                                aria-selected={selected}
                                aria-controls={`panel-${tab.id}`}
                                tabIndex={selected ? 0 : -1}
                                onClick={() => selectTab(index)}
                                className={`shrink-0 whitespace-nowrap text-sm font-medium border transition-colors duration-200 ${
                                    selected
                                        ? "bg-main text-white border-main"
                                        : "border-zinc-300 text-main hover:bg-background"
                                }`}
                            >
                                {/* Same optical offset as ui/button: Overpass sits high in its line box */}
                                <span className="relative top-0.5">{t(`services.tabs.${tab.key}.label`)}</span>
                            </button>
                        );
                    })}
                </div>

                <div
                    key={activeId}
                    role="tabpanel"
                    id={`panel-${activeId}`}
                    aria-labelledby={`tab-${activeId}`}
                    className="space-y-8 animate-in fade-in duration-300"
                >
                    <div className="text-center space-y-8">
                        <h3>
                            <Trans i18nKey={`${base}.title`} components={{ h: <span className="text-second" /> }} />
                        </h3>
                        <p className="max-w-4xl mx-auto">
                            <Trans i18nKey={`${base}.text`} components={{ b: <span className="font-bold" /> }} />
                        </p>
                    </div>

                    <div>
                        <div
                            className="grid border-card overflow-hidden"
                            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
                        >
                            {fullCards.map((card, index) =>
                                renderCard(card, [
                                    index % cols < cols - 1 ? "border-r" : "",
                                    Math.floor(index / cols) < fullRows - 1 ? "border-b" : "",
                                ].join(" "))
                            )}
                        </div>

                        {lastCards.length > 0 && (
                            // Narrower block: shares the bottom border of the block above (-mt-px)
                            <div
                                className="relative mx-auto -mt-px"
                                style={{ width: `${(lastCards.length / cols) * 100}%` }}
                            >
                                <div
                                    className="grid border border-t-0 border-background rounded-b-second overflow-hidden"
                                    style={{ gridTemplateColumns: `repeat(${lastCards.length}, minmax(0, 1fr))` }}
                                >
                                    {lastCards.map((card, index) =>
                                        renderCard(card, index < lastCards.length - 1 ? "border-r" : "")
                                    )}
                                </div>
                                <JoinCorner side="left" />
                                <JoinCorner side="right" />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center">
                        <Button
                            buttonTxt={t(`${base}.cta`)}
                            iconeButton={<TiArrowDown size={20} />}
                            className="btn-primary"
                            onClick={() => scrollToSection()}
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
