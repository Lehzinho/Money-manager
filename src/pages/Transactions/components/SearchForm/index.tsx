import { MagnifyingGlass } from "phosphor-react";
import * as S from "./styels";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContextSelector } from "use-context-selector";
import { TransactionContext } from "../../../../contexts/TransactionsContext";

const searchFromSchema = z.object({
  query: z.string(),
});

type searchFormInputs = z.infer<typeof searchFromSchema>;

export const SearchForm = () => {
  const fetchTransactions = useContextSelector(
    TransactionContext,
    (context) => {
      return context.fetchTransactions;
    }
  );
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<searchFormInputs>({
    resolver: zodResolver(searchFromSchema),
  });
  const handleSearchTransactions = async ({ query }: searchFormInputs) => {
    await fetchTransactions(query);
  };
  return (
    <S.SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input placeholder="Busque por transações" {...register("query")} />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </S.SearchFormContainer>
  );
};
