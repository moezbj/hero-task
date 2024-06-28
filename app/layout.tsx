import { ApolloWrapper } from "./ApolloWrapper";
import Wrapper from "./components/layout/wrapper";
import AuthPage from "./home/page";
import { getUser } from "./lib/cookie";
import "./globals.css";
const getData = async () => {
  const getUserInfo = await getUser();
  return getUserInfo;
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getData();

  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          {!data ? <AuthPage /> : <Wrapper data={data}>{children}</Wrapper>}
        </ApolloWrapper>
      </body>
    </html>
  );
}
