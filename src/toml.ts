export const ext = "toml";
export default (data: string) => Bun.TOML.parse(data);
