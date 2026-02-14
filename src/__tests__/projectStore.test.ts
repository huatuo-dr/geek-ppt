import { describe, it, expect, beforeEach } from "vitest";
import { useProjectStore } from "@/modules/projectStore";

describe("projectStore", () => {
  beforeEach(() => {
    useProjectStore.getState().newProject();
  });

  it("should create a default project with one slide", () => {
    const { project } = useProjectStore.getState();
    expect(project.slides).toHaveLength(1);
    expect(project.slides[0]?.title).toBe("封面");
    expect(project.formatVersion).toBe(1);
  });

  it("should mark dirty when content changes", () => {
    expect(useProjectStore.getState().dirty).toBe(false);
    useProjectStore.getState().updateSlideContent(0, "# Hello");
    expect(useProjectStore.getState().dirty).toBe(true);
  });

  it("should add and delete slides", () => {
    useProjectStore.getState().addSlide(0);
    expect(useProjectStore.getState().project.slides).toHaveLength(2);

    useProjectStore.getState().deleteSlide(1);
    expect(useProjectStore.getState().project.slides).toHaveLength(1);
  });

  it("should not delete the last slide", () => {
    useProjectStore.getState().deleteSlide(0);
    expect(useProjectStore.getState().project.slides).toHaveLength(1);
  });

  it("should reorder slides correctly", () => {
    useProjectStore.getState().addSlide(0);
    useProjectStore.getState().addSlide(1);
    // Now 3 slides: [0, 1, 2]
    useProjectStore.getState().moveSlide(2, 0);
    const orders = useProjectStore.getState().project.slides.map((s) => s.order);
    expect(orders).toEqual([0, 1, 2]);
  });

  it("should update slide size", () => {
    useProjectStore.getState().setSlideSize({ width: 1024, height: 768, label: "4:3" });
    expect(useProjectStore.getState().project.slideSize.label).toBe("4:3");
  });

  it("should update plugin config", () => {
    useProjectStore.getState().setPluginConfig({ activePluginId: "cool-renderer" });
    expect(useProjectStore.getState().project.pluginConfig.activePluginId).toBe("cool-renderer");
  });

  it("should mark saved and reset dirty", () => {
    useProjectStore.getState().updateSlideContent(0, "changed");
    expect(useProjectStore.getState().dirty).toBe(true);
    useProjectStore.getState().markSaved();
    expect(useProjectStore.getState().dirty).toBe(false);
  });
});
