export interface TKDBRadical {
  id: string;
  literal: string;
  kradReference?: string | undefined;
  kvgReference?: string | undefined;
  strokecount: number;
  number?: number | undefined;
  meanings?: string[] | undefined;
  readings?: string[] | undefined;
  readingsRomaji?: string[] | undefined;
  variants?: string[] | undefined;
  variantOf?: string | undefined;
  keyword?: string | undefined;
  mnemonic?: string | undefined;
}
