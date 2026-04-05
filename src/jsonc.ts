export const ext = "jsonc";
export default (data: string) => Bun.JSONC.parse(data);
