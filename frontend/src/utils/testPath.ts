/**
 * トレイリングスラッシュを削除
 */
export const trimTrailingSlash = (pathname: string): string => {
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
};

/**
 * 2つのパスが同じかどうかを判定
 */
export const isEqualPath = (pathname: string, _pathname: string): boolean => {
  return trimTrailingSlash(pathname) === trimTrailingSlash(_pathname);
};

/**
 * 特定のパスが他のパスのサブパスであるかどうかを判定
 * @param pathname - 比較するパス
 * @param basePath - 基準となるパス
 * @returns pathname が basePath のサブパスかどうか
 */
export const isSubPathOf = (pathname: string, basePath: string): boolean => {
  const normalizedPathname = trimTrailingSlash(pathname);
  const normalizedBasePath = trimTrailingSlash(basePath);
  return (
    normalizedPathname.startsWith(normalizedBasePath) &&
    (normalizedPathname === normalizedBasePath ||
      normalizedPathname[normalizedBasePath.length] === "/")
  );
};
