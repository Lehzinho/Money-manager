import { useSummary } from "../../hooks/useSummary";
import { priceFormatter } from "../../util/formatter";
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import * as S from "./styles";

export const Summary = () => {
  const summary = useSummary();

  return (
    <S.SummaryContainer>
      <S.SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong>{priceFormatter.format(summary.income)}</strong>
      </S.SummaryCard>
      <S.SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>
        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </S.SummaryCard>
      <S.SummaryCard $variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>
        <strong>{priceFormatter.format(summary.total)}</strong>
      </S.SummaryCard>
    </S.SummaryContainer>
  );
};
