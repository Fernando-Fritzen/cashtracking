import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Font } from '@react-email/font';
import { Head } from '@react-email/head';
import { Html } from '@react-email/html';
import { Img } from '@react-email/img';
import { Section } from '@react-email/section';
import { Tailwind } from '@react-email/tailwind';
import { Text } from '@react-email/text';

interface Props {
  name: string;
  verify_url: string;
  app_url: string;
}

export default function PasswordRecover({
  name = 'Vinicios',
  verify_url,
  app_url = 'http://localhost:3000',
}: Props) {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: '#B284ED',
              button: '#B284ED',
              title: '#3D3D3D',
              white: '#F1F1F1',
            },
          },
        },
      }}
    >
      <Html>
        <Head>
          <Font
            fontFamily="Sora"
            fallbackFontFamily="Verdana"
            webFont={{
              url: 'https://github.com/sora-xor/sora-font/raw/master/fonts/woff2/Sora-Regular.woff2',
              format: 'woff2',
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Container className="bg-white p-16 rounded-xl justify-items-center">
          <Section className="flex my-9 justify-center">
            <Img
              src={`${app_url}/assets/logo-default.png`}
              alt="logo-cashtracking"
              width="198"
              height="26"
            />
          </Section>

          <Text className="text-title text-base">
            Prezado(a) <b>{name},</b>
          </Text>

          <Text className="text-title text-sm">
            Recebemos uma solicitação de recuperação de senha para a sua conta
            no Cashtracking. Entendemos o quão importante é ter acesso à sua
            conta e estamos aqui para ajudá-lo(a) a recuperar o acesso.
          </Text>

          <Text className="text-title text-sm">
            Para redefinir sua senha, clique no link abaixo e siga as instruções
            fornecidas na página de recuperação de senha:
          </Text>

          <Section className="flex justify-center m-6">
            <Button
              href={verify_url}
              className="bg-button text-white py-4 px-10 rounded-xl cursor-pointer"
            >
              Alterar sua senha
            </Button>
          </Section>

          <Text className="text-title text-sm">
            Se você não solicitou essa recuperação de senha, pode ignorar este
            e-mail com segurança. Nenhuma alteração será feita em sua conta, e
            suas informações permanecerão protegidas. Lembre-se de criar uma
            senha forte e única para garantir a segurança de sua conta.
          </Text>

          <Text className="text-title text-sm">
            Caso tenha alguma dificuldade ou precise de suporte adicional,
            sinta-se à vontade para entrar em contato conosco através do e-mail
            contato@viniengelage.com.
          </Text>

          <Text className="text-title text-sm">
            Agradecemos a confiança em nosso projeto e estamos comprometidos em
            proporcionar a você a melhor experiência em gestão financeira
            pessoal.
          </Text>

          <Text className="text-title text-sm m-0">Atenciosamente,</Text>
          <Text className="text-title font-semibold text-sm m-0">
            Equipe Cashtracking
          </Text>
        </Container>
      </Html>
    </Tailwind>
  );
}
