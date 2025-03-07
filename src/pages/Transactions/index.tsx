import { Header } from "../../components/Header";
import { SearchForm } from "./components/SearchForm";
import * as S from "./styles";
import { useTransactions } from "../../contexts/TransactionsContext";
import { Summary } from "../../components/Summary";
import { dateFormatter, priceFormatter } from "../../util/formatter";

export const Transactions = () => {
  const { transactions } = useTransactions();
  return (
    <div>
      <Header />
      <Summary />
      <S.TransactionsContainer>
        <SearchForm />
        <S.TransactionsTable>
          <tbody>
            {transactions.map(
              ({ category, createdAt, description, id, price, type }) => (
                <tr key={id}>
                  <td width="40%">{description}</td>
                  <td>
                    <S.PriceHighlight $variant={type}>
                      {type === "outcome" && "- "}
                      {priceFormatter.format(price)}
                    </S.PriceHighlight>
                  </td>
                  <td>{category}</td>
                  <td>{dateFormatter.format(new Date(createdAt))}</td>
                </tr>
              )
            )}
          </tbody>
        </S.TransactionsTable>
      </S.TransactionsContainer>
    </div>
  );
};
