import { PropsWithChildren, ReactNode } from "react";

export type TConditionalWrapProps = PropsWithChildren<{
  condition: boolean;
  wrapper: (children: ReactNode) => ReactNode;
}>;
