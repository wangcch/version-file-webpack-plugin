import test from "ava";

import VersionPlugin from "../src";

test("base exist", (t) => {
  const plugin = new VersionPlugin();

  t.is(typeof VersionPlugin, "function");
  t.is(typeof plugin, "object");
  t.is(typeof plugin.apply, "function");
});

test("base data", (t) => {
  const plugin = new VersionPlugin();

  t.is(plugin.options.output, "__version.json");
  t.deepEqual(plugin.options.data, {});
});

test("options", (t) => {
  const plugin = new VersionPlugin({
    output: "version/index.txt",
    data: { 1: "demo01", b: "demo02" },
  });

  t.is(plugin.options.output, "version/index.txt");
  t.deepEqual(plugin.options.data, { 1: "demo01", b: "demo02" });
});
