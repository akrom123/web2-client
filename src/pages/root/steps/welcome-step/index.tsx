import { useEffect, useState } from "react";
import { useTonConnectUI } from "@tonconnect/ui-react";

import { Button } from "~/shared/ui/button";
import { useAuth } from "~/shared/services/auth";

type WelcomeStepProps = {
  nextStep(): void;
};

export const WelcomeStep = ({ nextStep }: WelcomeStepProps) => {
  const [tonConnectUI] = useTonConnectUI();
  const [isLoaded, setLoaded] = useState(false);

  console.log("💩💩💩 enter WelcomeStep");

  const auth = useAuth();

  console.log("💩💩💩 after useAuth");

  const handleNextClick = async () => {
    await tonConnectUI.openModal();
    await auth.mutateAsync();
  };

  useEffect(() => {
    if (tonConnectUI.connected) {
      auth.mutateAsync().then(() => nextStep());
    }
  }, [tonConnectUI.connected]);

  // useEffect(() => {
  //   const first = setTimeout(async () => {
  //     console.log("💩💩💩 call auth");
  //     await auth.mutateAsync();
  //   }, 1000);
  //
  //   const second = setTimeout(() => {
  //     setLoaded(true);
  //
  //     if (tonConnectUI.connected) {
  //       nextStep();
  //     }
  //   }, 4000);
  //
  //   return () => {
  //     clearTimeout(first);
  //     clearTimeout(second);
  //   };
  // }, [tonConnectUI.connected]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true)
    }, 5000);

    return () => {
      clearTimeout(timeout);
    }
  }, []);

  if (!isLoaded) {
    return (
      <section
        className={"relative flex h-[100vh] items-center justify-center"}
      >
        <img alt={"splash"} className={"mb-20 h-[400px]"} src={"/splash.gif"} />
      </section>
    );
  }

  return (
    <section className={"mt-4 flex flex-col px-4"}>
      <div className={"flex items-center justify-center"}>
        <img
          alt={"splash"}
          className={" w-full shrink-0"}
          src={"/splash.gif"}
        />
      </div>

      <div className={"flex gap-2 text-sm"}>
        <span>/ Добро пожаловать в MY</span>

        <div className={"flex items-center gap-0"}>
          <span>[</span>
          <div className={"mb-0.5 h-3 w-3 rounded-full bg-primary"} />
          <span>]:</span>
        </div>
      </div>

      <div className={"mt-2"}>
        <p className={"text-sm"}>
          децентрализованную систему монетизации контента. для продолжения
          необходимо подключить криптокошелек TON
        </p>
      </div>

      <Button
        className={"mt-[30px]"}
        label={"Подключить криптокошелёк TON"}
        includeArrows={true}
        isLoading={auth.isLoading}
        onClick={handleNextClick}
      />
    </section>
  );
};
