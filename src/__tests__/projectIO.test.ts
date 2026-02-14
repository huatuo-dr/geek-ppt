import { describe, it, expect } from "vitest";
import { packProject, unpackProject } from "@/services/projectIO";
import type { Project } from "@/types";

function createTestProject(): Project {
  return {
    projectId: "test-001",
    name: "测试项目",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
    slides: [
      {
        slideId: "s1",
        order: 0,
        title: "封面",
        markdownContent: "# Hello\n\nWorld",
        notes: "备注内容",
        template: "cover",
      },
      {
        slideId: "s2",
        order: 1,
        title: "第二页",
        markdownContent: "## Content\n\n- Item 1\n- Item 2",
        notes: "",
        template: "content",
      },
    ],
    pluginConfig: { activePluginId: "cool-renderer" },
    slideSize: { width: 1920, height: 1080, label: "16:9" },
    formatVersion: 1,
  };
}

describe("projectIO: pack/unpack roundtrip", () => {
  it("should pack and unpack a project without data loss", async () => {
    const original = createTestProject();
    const blob = await packProject(original);

    expect(blob.size).toBeGreaterThan(0);

    const restored = await unpackProject(blob);
    expect(restored.name).toBe(original.name);
    expect(restored.slides).toHaveLength(2);
    expect(restored.slides[0]?.markdownContent).toBe("# Hello\n\nWorld");
    expect(restored.slides[1]?.markdownContent).toBe("## Content\n\n- Item 1\n- Item 2");
    expect(restored.pluginConfig.activePluginId).toBe("cool-renderer");
    expect(restored.slideSize.label).toBe("16:9");
  });

  it("should preserve slide metadata", async () => {
    const original = createTestProject();
    const blob = await packProject(original);
    const restored = await unpackProject(blob);

    expect(restored.slides[0]?.title).toBe("封面");
    expect(restored.slides[0]?.notes).toBe("备注内容");
    expect(restored.slides[0]?.template).toBe("cover");
  });
});
