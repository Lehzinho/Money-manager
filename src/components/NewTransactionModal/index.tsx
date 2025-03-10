import * as Dialog from "@radix-ui/react-dialog";
import * as S from "./styles";
import * as z from "zod";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContextSelector } from "use-context-selector";
import { TransactionContext } from "../../contexts/TransactionsContext";

const newTransactionFromSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"]),
});

type newTransactionFormInputs = z.infer<typeof newTransactionFromSchema>;

export const NewTransactionModal = () => {
  const  createTransactions  = useContextSelector(TransactionContext, (context) => {
    return context.createTransactions
  });
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<newTransactionFormInputs>({
    resolver: zodResolver(newTransactionFromSchema),
    defaultValues: {
      type: "income",
    },
  });

  const handleCreateNewTransaction = async (data: newTransactionFormInputs) => {
    await createTransactions(data);
    reset();
  };

  return (
    <Dialog.Portal>
      <S.Overlay>
        <S.Content>
          <Dialog.Description />
          <Dialog.Title>Nova transação</Dialog.Title>
          <S.Close>
            <X size={24} />
          </S.Close>
          <form action="" onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <input
              type="text"
              placeholder="Descrição"
              required
              {...register("description")}
            />
            <input
              type="number"
              placeholder="Preço"
              required
              {...register("price", { valueAsNumber: true })}
            />
            <input
              type="text"
              placeholder="Categoria"
              required
              {...register("category")}
            />
            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, value } }) => {
                return (
                  <S.TransactionType onValueChange={onChange} value={value}>
                    <S.TransactionTypeButton value="income" $variant="income">
                      <ArrowCircleUp size={24} />
                      Entrada
                    </S.TransactionTypeButton>
                    <S.TransactionTypeButton value="outcome" $variant="outcome">
                      <ArrowCircleDown size={24} />
                      Saida
                    </S.TransactionTypeButton>
                  </S.TransactionType>
                );
              }}
            />

            <button type="submit" disabled={isSubmitting}>
              Cadastrar
            </button>
          </form>
        </S.Content>
      </S.Overlay>
    </Dialog.Portal>
  );
};


