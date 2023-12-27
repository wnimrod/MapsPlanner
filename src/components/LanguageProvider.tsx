import { TRootState } from "src/store/types";
import { useAsyncMemo } from "use-async-memo";

import { PropsWithChildren } from "react";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";

type TProps = PropsWithChildren;

export default function LanguageProvider({ children }: TProps) {
  const locale = useSelector((state: TRootState) => state.global.language);

  const messages = useAsyncMemo(
    () => import(`../lang/${locale}.json`).then((data) => data.default),
    [locale],
    {}
  );

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}
