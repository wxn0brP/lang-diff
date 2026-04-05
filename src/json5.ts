export const ext = "json5";
export default (data: string) => Bun.JSON5.parse(data);
