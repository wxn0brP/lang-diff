export const ext = "yaml";
export default (data: string) => Bun.YAML.parse(data);
