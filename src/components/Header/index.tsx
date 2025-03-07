import * as S from "./styles";
import logoImg from "../../assets/logo.svg";

export const Header = () => {
  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <img src={logoImg} />
        <S.NewTransactionButton>Nova transação</S.NewTransactionButton>
      </S.HeaderContent>
    </S.HeaderContainer>
  );
};
