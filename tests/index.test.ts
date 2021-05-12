import test from "ava";
import fs from "fs";
import mock from "mock-fs";

import VersionPlugin from "../src";

test.beforeEach(() => {
  mock({
    "/dir/repo": {},
    "/dir/nextjs": {
      ".next": {},
    },
  });
});

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

test("apply()", (t) => {
  const plugin01 = new VersionPlugin({
    data: { 1: "demo01", b: "demo02" },
  });

  t.is(plugin01.options.output, "__version.json");
  t.deepEqual(plugin01.options.data, { 1: "demo01", b: "demo02" });

  t.is(fs.existsSync("/dir/repo01/__version.json"), false);

  plugin01.apply({ options: { output: { path: "/dir/repo01" } } } as any);

  t.is(fs.existsSync("/dir/repo01/__version.json"), true);

  const plugin02 = new VersionPlugin({
    output: "/version/index.txt",
    absolute: true,
    data: { 1: "demo01", b: "demo02" },
  });

  t.is(plugin02.options.output, "/version/index.txt");
  t.deepEqual(plugin02.options.data, { 1: "demo01", b: "demo02" });

  t.is(fs.existsSync("/dir/repo02/version/index.txt"), false);
  t.is(fs.existsSync("/version/index.txt"), false);

  plugin02.apply({ options: { output: { path: "/dir/repo02" } } } as any);

  t.is(fs.existsSync("/dir/repo02/version/index.txt"), false);
  t.is(fs.existsSync("/version/index.txt"), true);
});

test("nextjs config", (t) => {
  const plugin = new VersionPlugin({});

  t.is(fs.existsSync("/dir/nextjs/public/__version.json"), false);

  plugin.apply({ options: { output: { path: "/dir/nextjs/.next" } } } as any);

  t.is(fs.existsSync("/dir/nextjs/public/__version.json"), true);
});
