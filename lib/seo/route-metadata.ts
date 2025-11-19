import { Metadata } from "next";
import { BASE_URL, ORGANIZATION, DEFAULT_OG_IMAGE, PAGE_METADATA, generatePageMetadata } from "./metadata-config";
import type { Locale } from "~/lib/i18n/config";

/**
 * Complete Route Metadata Configuration
 * This file contains comprehensive SEO metadata for ALL routes in the application
 */

/**
 * Get metadata for a specific route
 * @param route - The route path (e.g., "/", "/who-we-are", "/news")
 * @param locale - The locale ("en" or "am")
 * @returns Metadata object for the route
 */
export function getRouteMetadata(route: string, locale: Locale = "en"): Metadata {
  // Use the locale-aware metadata generator
  return generatePageMetadata(route, locale);
}

/**
 * Generate default metadata for routes without explicit configuration
 * @deprecated Use generatePageMetadata instead
 */
function generateDefaultMetadata(route: string, locale: Locale = "en"): Metadata {
  return generatePageMetadata(route, locale);
}

/**
 * Route-to-Metadata mapping
 * Maps all application routes to their respective metadata keys
 */
export const ROUTE_MAP: Record<string, string> = {
  "/": "home",
  "/who-we-are": "who-we-are",
  "/programs": "programs",
  "/news": "news",
  "/gallery": "gallery",
  "/history": "history",
  "/volunteer": "volunteer",
  "/donate": "donate",
  "/contact-us": "contact-us",
} as const;

/**
 * Get all static routes with their metadata
 * Useful for sitemap generation and SEO audits
 * @param locale - The locale ("en" or "am")
 */
export function getAllRouteMetadata(locale: Locale = "en"): Array<{
  route: string;
  metadata: Metadata;
}> {
  return Object.keys(ROUTE_MAP).map((route) => ({
    route,
    metadata: getRouteMetadata(route, locale),
  }));
}

/**
 * SEO Priority Configuration
 * Defines the importance of each route for search engines
 */
export const SEO_PRIORITIES: Record<string, number> = {
  "/": 1.0,
  "/who-we-are": 0.9,
  "/programs": 0.9,
  "/news": 0.8,
  "/gallery": 0.7,
  "/history": 0.7,
  "/volunteer": 0.8,
  "/donate": 0.9,
  "/contact-us": 0.8,
};

/**
 * Change frequency for sitemap
 */
export const CHANGE_FREQUENCIES: Record<
  string,
  "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
> = {
  "/": "weekly",
  "/who-we-are": "monthly",
  "/programs": "monthly",
  "/news": "daily",
  "/gallery": "weekly",
  "/history": "yearly",
  "/volunteer": "monthly",
  "/donate": "monthly",
  "/contact-us": "yearly",
};

