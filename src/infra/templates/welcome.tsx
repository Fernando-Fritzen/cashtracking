import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import { Tailwind } from '@react-email/tailwind';
import { Font } from '@react-email/font';
import { Head } from '@react-email/head';
import { Section } from '@react-email/section';
import { Img } from '@react-email/img';

interface Props {
  name: string;
  verify_url: string;
  app_url: string;
}

export default function Welcome({
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
            Olá, <b>{name}!</b>
          </Text>

          <Text className="text-title text-sm">
            É com grande alegria que lhe damos as boas-vindas ao Cashtracking!
            jornada será um passo importante para conquistar uma vida financeira
            mais organizada, equilibrada e bem-sucedida.
          </Text>

          <Text className="text-title text-sm">
            O objetivo do Cashtracking é proporcionar as ferramentas e
            orientações necessárias para que você possa assumir o controle total
            de suas finanças pessoais. Sabemos que gerir o dinheiro pode ser
            desafiador, mas estamos aqui para ajudá-lo(a) em cada etapa do
            caminho.
          </Text>

          <Text className="text-title text-sm">
            Nossa plataforma está sendo construída cuidadosamente aos poucos, e
            você faz parte da versão beta! Como um(a) dos(as) primeiros(as)
            usuários(as), sua participação é especialmente valiosa para nós. Seu
            feedback e opinião serão fundamentais para aprimorarmos a plataforma
            e torná-la ainda mais eficiente e amigável.
          </Text>

          <Text className="text-title text-sm">
            Nesta fase inicial, algumas funcionalidades ainda estão em
            desenvolvimento, mas não se preocupe, pois estaremos constantemente
            adicionando novas ferramentas e recursos ao longo das próximas
            semanas. Seu envolvimento é crucial para que possamos aperfeiçoar o
            Cashtracking e atender cada vez melhor às suas necessidades
            financeiras.
          </Text>

          <Text className="text-title font-semibold text-sm">
            Para começar a aproveitar ao máximo o Cashtracking e receber todas
            as atualizações, pedimos que valide seu e-mail clicando no link
            abaixo:
          </Text>

          <Section className="flex justify-center m-6">
            <Button
              href={verify_url}
              className="bg-button text-white py-4 px-10 rounded-xl cursor-pointer"
            >
              Validar e-mail
            </Button>
          </Section>

          <Text className="text-title text-sm">
            Estamos ansiosos para embarcar nessa jornada junto com você e
            ajudá-lo(a) a atingir suas metas financeiras. Lembre-se de que
            estamos aqui para apoiá-lo(a) em cada passo do caminho.
          </Text>

          <Text className="text-title text-sm">
            Seja muito bem-vindo(a) ao Cashtracking. Juntos, construiremos uma
            plataforma eficaz e transformadora para alcançar a tão almejada
            estabilidade financeira e a realização de nossos objetivos.
          </Text>

          <Text className="text-title text-sm m-0">Grande abraço,</Text>
          <Text className="text-title font-semibold text-sm m-0">
            Equipe Cashtracking
          </Text>
        </Container>
      </Html>
    </Tailwind>
  );
}
