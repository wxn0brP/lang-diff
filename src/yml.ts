export const ext = "yml";
export default (data: string) => Bun.YAML.parse(data);
