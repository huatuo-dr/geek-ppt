/**
 * PluginRegistry — manages available renderer plugins.
 * Provides registration, lookup, and listing.
 */

import type { RendererPlugin } from "@/types";

/** All registered plugins, keyed by pluginId */
const registry = new Map<string, RendererPlugin>();

/** Register a renderer plugin */
export function registerPlugin(plugin: RendererPlugin): void {
  if (registry.has(plugin.pluginId)) {
    console.warn(`[PluginRegistry] plugin "${plugin.pluginId}" already registered, overwriting.`);
  }
  registry.set(plugin.pluginId, plugin);
}

/** Get a plugin by ID, returns undefined if not found */
export function getPlugin(pluginId: string): RendererPlugin | undefined {
  return registry.get(pluginId);
}

/** Get all registered plugins */
export function getAllPlugins(): RendererPlugin[] {
  return Array.from(registry.values());
}

/** Check if a plugin is registered */
export function hasPlugin(pluginId: string): boolean {
  return registry.has(pluginId);
}
