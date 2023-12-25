export type TConditionalWrapProps = {
  children: JSX.Element;
  condition: boolean;
  wrapper: (children: JSX.Element) => JSX.Element;
};
