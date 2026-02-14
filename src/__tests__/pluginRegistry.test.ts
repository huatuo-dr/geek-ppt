import { describe, it, expect, beforeEach } from "vitest";
import { registerPlugin, getPlugin, getAllPlugins, hasPlugin } from "@/services/pluginRegistry";
import { plainRendererPlugin } from "@/plugins/plain";
import { coolRendererPlugin } from "@/plugins/cool";

describe("pluginRegistry", () => {
  beforeEach(() => {
    // Registry is a module-level singleton, re-register for each test
    registerPlugin(plainRendererPlugin);
    registerPlugin(coolRendererPlugin);
  });

  it("should register and retrieve plugins", () => {
    expect(hasPlugin("plain-renderer")).toBe(true);
    expect(hasPlugin("cool-renderer")).toBe(true);
    expect(hasPlugin("nonexistent")).toBe(false);
  });

  it("should return plugin by id", () => {
    const plain = getPlugin("plain-renderer");
    expect(plain?.displayName).toBe("朴素渲染");
    expect(plain?.version).toBe("1.0.0");
  });

  it("should list all plugins", () => {
    const all = getAllPlugins();
    expect(all.length).toBeGreaterThanOrEqual(2);
  });

  it("plugins should support all required node types", () => {
    const requiredTypes = [
      "heading", "paragraph", "strong", "emphasis", "delete",
      "link", "image", "inlineCode", "code", "blockquote",
      "list", "listItem", "table", "thematicBreak",
    ];
    for (const plugin of getAllPlugins()) {
      for (const type of requiredTypes) {
        expect(plugin.supportedNodeTypes).toContain(type);
      }
    }
  });

  it("plugins should return non-empty CSS", () => {
    const plain = getPlugin("plain-renderer");
    const cool = getPlugin("cool-renderer");
    expect(plain?.getStyles().length).toBeGreaterThan(100);
    expect(cool?.getStyles().length).toBeGreaterThan(100);
  });
});
