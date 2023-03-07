const notifiedErrors = {} as Record<string, number>;

export const maxNTimes = (_err: string | undefined, times: number = 3) => {
  // const _err =  || "";
  if (!_err) return "";

  const err = _err && notifiedErrors[_err] < times ? _err : "";

  notifiedErrors[_err] = (notifiedErrors[_err] || 0) + 1;

  return err || "";
};
