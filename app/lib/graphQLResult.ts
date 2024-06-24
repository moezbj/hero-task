export default function graphQLResult<T>(data: Record<any, T>): T {
  return Object.values(data)[0];
}
