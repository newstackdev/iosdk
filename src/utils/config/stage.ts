export const stageDomainsFromList = (list: string, stage: string) =>
  (list || "").split(/,/).reduce((r, c, o) => ({ ...r, [c]: stage }), {});
