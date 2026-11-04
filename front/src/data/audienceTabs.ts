import type { LucideIcon } from "lucide-react";
import {
  Scale, UserSearch, PackageSearch, FileCheck, Ban, MessageSquare,
  ShieldAlert, UserCog, Handshake, BadgeCheck, Search, MapPin, FileText,
  TriangleAlert, FileSearch, Lock, Users, Briefcase,
} from "lucide-react";

/**
 * Services page tabs (VESTIGE content document, sections 2 to 5).
 * `id` is used in the URL hash (/service#entreprises),
 * `key` points to the texts in i18n: services.tabs.<key>
 */
export interface AudienceTab {
  id: string;
  key: string;
  cards: { key: string; icon: LucideIcon }[];
}

export const AUDIENCE_TABS: AudienceTab[] = [
  {
    id: "particuliers",
    key: "individuals",
    cards: [
      { key: "disputes", icon: Scale },
      { key: "people", icon: UserSearch },
      { key: "assets", icon: PackageSearch },
      { key: "facts", icon: FileCheck },
      { key: "limits", icon: Ban },
      { key: "contact", icon: MessageSquare },
    ],
  },
  {
    id: "entreprises",
    key: "companies",
    cards: [
      { key: "fraud", icon: ShieldAlert },
      { key: "employee", icon: UserCog },
      { key: "commercial", icon: Handshake },
      { key: "partners", icon: BadgeCheck },
      { key: "research", icon: Search },
      { key: "field", icon: MapPin },
      { key: "report", icon: FileText },
    ],
  },
  {
    id: "assurances",
    key: "insurers",
    cards: [
      { key: "fraud", icon: TriangleAlert },
      { key: "documents", icon: FileSearch },
      { key: "field", icon: MapPin },
      { key: "sensitive", icon: Lock },
      { key: "report", icon: FileText },
    ],
  },
  {
    id: "professionnels",
    key: "professionals",
    cards: [
      { key: "lawyers", icon: Scale },
      { key: "peers", icon: Users },
      { key: "others", icon: Briefcase },
    ],
  },
];

export const isAudienceTabId = (id: string) =>
  AUDIENCE_TABS.some((tab) => tab.id === id);
